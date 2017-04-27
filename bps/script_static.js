d3_queue.queue()
    .defer(d3.json, "Planning_Districts2.geojson")
    .defer(d3.csv, "capacity2.csv")
    .defer(d3.csv, "buildbps.csv")
    .await(draw);

function draw(error,geo_data,data) {
      //if (error) throw error;
    "use strict";
    var margin = 75,
      width = 750- margin,
      height=620-margin,

      minimumColor = "green", 
      mediumColor = "grey", 
      maximumColor = "red";

      //scales
    var perc_extent= d3.extent(data, function(d) {
      return +d["perc_util_cap"]
    })

    
    var color=d3.scale.linear()
                  .domain([30,100,175])
                  .range(['#ffeda0','#feb24c','#f03b20']);

     
    d3.select("#area1")
      .append("h2")
      .text("Current Use Capacity Model")
      .style("color","#283041");

   d3.select("#area1")
      .append("h3")
      .text("According to this model, all Boston schools are below capacity. This means that there's enough desks and classrooms to house each student.")
      .style("color","#283041");

//create new zoom behavior
 /* var zoom = d3.behavior.zoom()
          .translate([0, 0])
          .scale(1)
          .scaleExtent([1, 20])
          .on("zoom", zoomed);
 
*/
    var svg = d3.select("#area1")
      .append("svg")
      .attr("width",width+margin)
      .attr("height", height+margin)
      //call the zoom before the g group is made to avoid wiggle while panning
  //    .call(zoom) 
      .append('g')
      .attr('class','map');



//specify projection parameters, otherwise path defaults to a plain albers
    var projection = d3.geo.albers()
                      .scale( 180000 )
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

 var tooltip = d3.select("body")
    .append("div")
    .attr('class', 'tooltip_name')
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .text('tooltip')             

  
   
    var map = svg.selectAll('path')
                 .data(geo_data.features)
                 .enter()
                 .append('path')
                 .attr('d',path)
                 .style("fill", function(d) { 
                  return color(rateById[d.properties.PD]); })
                 .style('stroke','#b4b9c1')
                 .style('stroke-width',0.8)
                  .on("mouseover", function(d) {
                        return tooltip.style("visibility", "visible"),
                            tooltip.text('Capacity: '+rateById[d.properties.PD]+"%");
                    })
                    .on("mousemove", function() {
                        return tooltip.style("top", (d3.event.pageY - 10) + "px")
                        .style("left", (d3.event.pageX + 10) + "px");
                    })
                    .on("mouseout", function() {
                        return tooltip
                        .style("visibility", "hidden");
                    });

    //add text labels for neighborhoods
    svg.selectAll("text")
    .data(geo_data.features)
    .enter()
    .append("svg:text")
    .text(function(d){
        if (d.properties.side!=undefined)
        return d.properties.side+" "+d.properties.PD;
        else return d.properties.PD;
    })
    .attr("x", function(d){
        if (d.properties.PD=='Central') return path.centroid(d)[0]+20; else
        if (d.properties.PD=='East Boston') return path.centroid(d)[0]-25; else
        return path.centroid(d)[0];})
     .attr("y", function(d){
        return  path.centroid(d)[1];
    })
    .attr("text-anchor","middle")
    .attr('font-size','8pt');

                  //Adding legend for  Choropleth

  var legend = svg.selectAll("g.legend")
  .data([25,50,75,100])
  .enter().append("g")
  .attr("class", "legend");

  var ls_w = 20, ls_h = 40, legend_h=height-100, legend_x=width-180;
  var legend_labels=[25,50,75,100]
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



/*
  legend.append("text")
  .attr("x", legend_x)
  .attr("y",legend_h-5.5*ls_h )
  .text("Percent Full");

  //for looking at acreage instead of vertical drop
  var acre_extent= d3.extent(data, function(d) {
    return +d["Skiable acreage"]
  })


  var width=d3.scale.linear()
                .domain(acre_extent)
                .range([20,80]);

//function to zoom in on map (svg) 
 
  function zoomed() {
  svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  //keep mountain height the same
  mounties.attr("height", function (d){
        var self = d3.select(this);
        var r = self.attr('id') / Math.pow(d3.event.scale,1);  // set radius according to scale
        return r;
    })
          .attr("x", function (d) { //change x position since image is anchored in top left corner
             var self = d3.select(this);
             var xmov = self.attr("height")/2;
             return -xmov})
          .attr("y", function (d) {
             var self = d3.select(this);
             var ymov = self.attr("height");
             return -ymov});
  map.style("stroke-width", .8 / d3.event.scale + "px");
  
}
*/
 

  
  };