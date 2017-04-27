d3_queue.queue()
    .defer(d3.json, "Planning_Districts2.geojson")
    .defer(d3.csv, "capacity2.csv")
    .defer(d3.csv, "buildbps.csv")
    .await(draw);

function draw(error,geo_data,data,bpsdata) {
      //if (error) throw error;
    "use strict";
    var margin = 2*75,
      width = 1.8*750- margin,
      height=1.8*620-margin,

      minimumColor = "green", 
      mediumColor = "grey", 
      maximumColor = "red";

      //scales
    var perc_extent= d3.extent(data, function(d) {
      return +d["perc_util_cap"]
    })

    var color=d3.scale.linear()
                  .domain([perc_extent[0],100,perc_extent[1]])
                  .range(['#ffeda0','#feb24c','#f03b20']);

     
    d3.select("#area2")
      .append("h2")
      .text("Evaluation Results for High-Growth Neighborhoods")
      .style("color","#283041");

   d3.select("#area2")
      .append("h4")
      .text("Mouse over points to see schools that were evaluated. Click on a school to see when the building was last renovated. Note the ten schools that received poor environmental capacity but have the capacity to be expanded. The Boston International Newcomer's Academy, for example, has had no major investments since it was built in 1922.")
      .style("color","#283041");

//create new zoom behavior
  var zoom = d3.behavior.zoom()
          .translate([0, 0])
          .scale(1)
          .scaleExtent([1, 20])
          .on("zoom", zoomed);
 

    var svg = d3.select("#area2")
      .append("svg")
      .attr("width",width+margin-500)
      .attr("height", height+margin)
      //call the zoom before the g group is made to avoid wiggle while panning
      .call(zoom) 
      .append('g')
      .attr('class','map');



//specify projection parameters, otherwise path defaults to a plain albers
    var projection = d3.geo.albers()
                      .scale( 280000 )
                      .rotate( [71.057,0] )
                      .center( [0, 42.313] )
                      .translate( [width/2,height/2] );


    //create path with our data, using our custom projection

    var path = d3.geo.path().projection(projection);

    //turn path into svg (map) which can have fills and strokes
    var rateById = {};

    data.forEach(function(d) {
    rateById[d.neighborhood] = +d.perc_util_cap;
      });

    var top_growers=['East Boston','Roxbury','Mattapan','Dorchester']
    var map = svg.selectAll('path')
                 .data(geo_data.features)
                 .enter()
                 .append('path')
                 .attr('d',path)
                 .style("fill", function(d) { 
                  if (top_growers.indexOf(d.properties.PD) > -1 )
                  return color(rateById[d.properties.PD]); 
                  else return '#b3c2ff';})
                 .style('stroke','#b4b9c1')
                 .style('stroke-width',0.8)
                 //remove popup when you click the map
                 .on("click", function() {
                        return popup.style("visibility", "hidden");
                    });

    //add text labels for neighborhoods
    svg.selectAll("text")
    .data(geo_data.features)
    .enter()
    .append("svg:text")
    .text(function(d){
        if (top_growers.indexOf(d.properties.PD) > -1 )
        if (d.properties.side!=undefined)
        return d.properties.side+" "+d.properties.PD;
        else return d.properties.PD;
    })
    .attr("x", function(d){
        if (d.properties.PD=='Central') return path.centroid(d)[0]+20; else
        if (d.properties.PD=='East Boston') return path.centroid(d)[0]-25; else
        return path.centroid(d)[0];})
     .attr("y", function(d){
        return  path.centroid(d)[1]+20; //move away from point clusters a little
    })
    .attr("text-anchor","middle")
    .attr('font-size','8pt');

                  //Adding legend for  Choropleth

  var legend = svg.selectAll("g.legend")
  .data([perc_extent[0],75,100,125,perc_extent[1]])
  .enter().append("g")
  .attr("class", "legend");
/*
  var ls_w = 20, ls_h = 40, legend_h=height-100, legend_x=width-80;
  var legend_labels=[perc_extent[0],75,100,125,perc_extent[1]]
  legend.append("rect")
  .attr("x", legend_x)
  .attr("y", function(d, i){ return legend_h - (i*ls_h) - ls_h;})
  .attr("width", ls_w)
  .attr("height", ls_h)
  .style("fill", function(d, i) { return color(d); })
  .style("opacity", 1);

  legend.append("text")
  .attr("x", legend_x+30)
  .attr("y", function(d, i){ return legend_h  -(i*ls_h) - ls_h/2 ;})
  .text(function(d, i){ return legend_labels[i]+"%"; });

  legend.append("text")
  .attr("x", legend_x)
  .attr("y",legend_h-5.5*ls_h )
  .text("Percent Full");

*/
//second legend
var filly=d3.scale.ordinal() //had to repeat, didn't find above
                  .domain(["Yes","No","NaN"])
                  .range(['#10007f','grey','none']);


  var ls_w = 35, ls_h = 35;
  var legend_labels=(['Expandable','Not Expandable']);
  legend.append("circle")
  .attr("cx", 30+width/7)
  .data(["Yes","No"]) //just two categories
  .attr("cy", function(d, i){ return height/1.1 - (i*ls_h) - ls_h;})
  .attr('r', 15)
  .style("fill", function(d) { return filly(d);}) 
  .style("opacity", 0.7);

  legend.append("text")
  .attr("x", 50+width/7)
  .attr("y", function(d, i){ return height/1.1 - (i*ls_h) - ls_h +4;})
  .text(function(d, i){ return legend_labels[i]; })
  .style('font-family','arial');

//third legend for size rad_size

  var rankings=['Poor','Fair','Not Assessed','Good','Excellent'];  
  var rad_sizes=[13,9,5,4,3]    
  var rad_size=d3.scale.ordinal()
                  .domain(rankings)
                  .range(rad_sizes); 

  var ls_w = 35, ls_h = 35;
  var legend_labels=rankings;
  legend.append("circle")
  .attr("cx", 450+width/7)
  .data(rad_sizes) //just two categories
  .attr("cy", function(d, i){ return height/1.1 - (i*ls_h) - ls_h;})
  .attr('r', function(d) { return rad_size(d);})
  .style("fill", '#10007f') 
  .style("opacity", 0.7);

  legend.append("text")
  .attr("x", 480+width/7)
  .attr("y", function(d, i){ return height/1.1 - (i*ls_h) - ls_h +4;})
  .text(function(d, i){ return legend_labels[i]; })
  .style('font-family','arial');

  legend.append("text")
  .attr("x", 450+width/7)
  .attr("y",height/1.1-200)
  .html(" Environment Evaluation");

//function to zoom in on map (svg) 
 
  function zoomed() {
  svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  //keep circle size the same
 /* schools.attr("r", function (d){
        var self = d3.select(this);
        var r = self.attr('id') / Math.pow(d3.event.scale,1);  // set radius according to scale
        return r;
    })
*/
/*
          .attr("x", function (d) { //change x position since image is anchored in top left corner
             var self = d3.select(this);
             var xmov = self.attr("height")/2;
             return -xmov})
          .attr("y", function (d) {
             var self = d3.select(this);
             var ymov = self.attr("height");
             return -ymov});
             */
  map.style("stroke-width", .8 / d3.event.scale + "px");
  
}

  var tooltip = d3.select("body")
    .append("div")
    .attr('class', 'tooltip_name')
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .text('tooltip'); 

  var popup = d3.select("body")
    .append("div")
    .attr('class', 'popup_name')
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .text('tooltip');        

  var schools= svg.append('g')
    .selectAll('.myPoint')
    .data(bpsdata)
    .enter()
    .append("circle")
    //hide schools with no students
    .attr("opacity", function(d) {if
      (+d["SMMA_FA_Enrollment_Building"]==0) return 0; else return 0.7;})
    .filter(function(d) { return (top_growers.indexOf(d.BRA_Neighborhood) > -1)  })
    .attr("transform", function (d) { 
      return "translate(" + projection([d.SMMA_longitude, d.SMMA_latitude]) + ")"; })
    .attr('r',function(d) {
      return rad_size(d.SMMA_EA_Overall_EFE_learning_environments)})


    .attr("fill",function (d) {return filly(d.SMMA_FA_building_expandable_current_site);})


    //create datum to remember initial size when scaling with scroll
    .attr('id',function (d) {
      return rad_size(d.SMMA_EA_Overall_EFE_learning_environments)
    })
    
    //see school names
    .on("mouseover", function(d) {
                        return tooltip.style("visibility", "visible"),
                            tooltip.html('<b>'+d["BPS_School_Name"]+'</b>'+  "<br/>" +d["SMMA_FA_Enrollment_Building"]+' students');
                    })
    .on("mousemove", function() {
        return tooltip.style("top", (d3.event.pageY - 10) + "px")
        .style("left", (d3.event.pageX + 10) + "px");
    })
    .on("mouseout", function() {
        return tooltip 
        .style("visibility", "hidden"); 
    })
    //see school info on click
    .on("click", function(d) {
      return popup.style("visibility", "visible")
        .style("top", (d3.event.pageY - 10) + "px")
        .style("left", (d3.event.pageX + 10) + "px")
        .html('<b>'+d["BPS_School_Name"]+'</b>'+  "<br/>" +
          'Built in: '+'<b>'+d["BPS_Year_Built"]+'</b>'+"<br/>"  +' Investments in the Last 10 Years: '+'<b>'+d["SMMA_FA_site_major_investments_10__years"]+'</b>');
       });
  
  };