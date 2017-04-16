---
layout: post
title: "Ski Resort Map"
date: 2017-04-16
---
### A map of ski resorts across North America. Height of the mountains are proportional to their respective peak height. Inches of snow per year is represented through mountain icon attribute.

See visualization here:

https://bl.ocks.org/laurenschroeder/41e78da1ab63c8faf6e43f79a8fca4ca

## Exploratory Analysis

I took a look at what variables would be useful to use in the mountain map. I want to show the largest (highest, most land, most trails) resort with the best snow. I chose to use the peak height to represent the resort size (through image height). 

I found a strong correlation between trail number and acreage. There was also a correlation between resort acreage and peak height, with a flatter acreage range for mountains with a vertical drop under 1300 ft. Either of these variables could be used to represent height; I chose peak height because the range is more evenly distributed and the height can be very explicitly evaluated with the size of the mountain icons.

Since snowfall was unncorrelated with other variables, I chose to represent this separately through changing the amount of snow on the mountain icons for three levels.


```python
import matplotlib.pyplot as plt
graph=pd.read_csv(r'C:\Users\schro\Desktop\Projects\d3\Snowboard\resorts_df2.csv', header=0)
graph.plot.scatter('Vertical drop (ft)','Skiable acreage')
graph.plot.scatter('Avg annual snowfall (in)','Skiable acreage')
graph.plot.scatter('Total trails','Skiable acreage')
graph.plot.scatter('Vertical drop (ft)','Avg annual snowfall (in)')
plt.show()
```


![png](output_8_0.png)



![png](output_8_1.png)



![png](output_8_3.png)



![png](output_8_4.png)



![png](output_8_5.png)



![png](output_8_6.png)



```python
#look at snowfall ranges
graph.hist('Avg annual snowfall (in)')
plt.show()
```



![png](output_9_1.png)



```python

```


```python

```




Data extracted 4/13/17 from https://en.wikipedia.org/wiki/Comparison_of_North_American_ski_resorts