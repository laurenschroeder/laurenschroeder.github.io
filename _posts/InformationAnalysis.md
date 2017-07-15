---
layout: post
title: "Information Analysis"
date: 2017-06-12
---
### Using principles of Jacques Bertin's 'Semiology of Graphics'

## Analysis of the Information

In planning a design, it's important to keep the infomation being shared completely separate from the final properties of a system. Information that needs to be communicated will always have two components: 

In graphic representation the translatable content of a thought will be called the INFORMATION. It is sonstituted esspentially by one or several PERTINENT CORRESPONDENCES between a finite set of variational concepts and an invariant.

Consider a stock X that's quoted at two prices on two different days.
Elements: Two components  and one invariant
The components: Price, or variation in the number of dollars
Time, or variation in the date
The stock would be the invariant, or the common ground between the elements in the information.

In creating a visual representation of this information, two visual components would usually be used to communicate the information related to the two variables.

I title will often spcify the invariant and in certain cases the drawing can provide the means of identifying the components due to the familiarity of the subject (as in cartography) or axis labels. With uncommon variables a written description of various components should be included in the title, perhaps as a subtitle.

Components should be explained or ordered according to dependencies. In looking at the percentage of working persons according to country and employment sector, the components not affected by the quantities should be placed first (country and sector).

Title components:

Usually the title consists of the invariant and all the components of the information with components ordered by dependency.  As this title can become long, a heading can be used as a summary inluding the name of the category belonging to invariants (e.g. stock X and stock Y). This allows the reader to immediately perceive the unique features and locate a given representation Typical title phrase: Population residing the the Paris area, by department of birth (not including departments constituting the Pris area). Quantities in thousands.

Suggested title:
MIGRATION TO PARIS
Residents of the Paris area born in the provinces
-absolute quantities according to department of birth

Typical: Percentage of population living in rual communes [administrative subdivision of France] where 20-39.9% of the population is agricultural.

RURAL COMMUNES, 20-40% AGRICULTURAL
Population living in rural communes where 20-39.9% of the population is agricultural
-by department
-Q per 100 persons living in all rural communes

In a homogenous series, it's important to recognize the changes components, in bold, capitals, and always in the same place.

The reader should be able to identify the original author and sources.
As a general rule, under or in each image the source, author, work, publisher, place of publication, and date should be indicated.

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