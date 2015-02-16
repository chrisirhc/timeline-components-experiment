## Goals

- Try out new frameworks
- See whether componentizing charts work for building an app

## Requirements

- Timeline
- Something perhaps to wrap the timeline in?
- Timeline is extensible, other decorators should be allowed to add components of other types and other styling into the timeline
- Annotation items on the timeline
  - Use the same same scale, and lies within the margins of the timeline
  - Does it make sense for this to be part of the timeline? Maybe not.
  - Timeline maybe one way to render a contiguous set of points.
  - Perhaps each line can be its own component. Is that too much?
- Tooltips for timeline points
- Add on other types of items on the timeline besides data points

- Input will be random data generated over time. Similar to cubism's demo

- Render a ton of points, translate?


- Scale area -> put stuff into it
- Put stuff around it

## Candidates

- Web components?

- Polymer

- Pure d3? No.

- AngularJs

### ReactJs

- Wrapper provides a scale ? How to make this better?
- Scale is passed to children
- Wrapper doesn't do anything?

```
<TimeArea>
  <Timeseries scale= data=></Timeseries>
  <Annotations scale= data=></Annotations>
  <XLegend position= scale= data=></XLegend>
  <YLegend position= scale= data=><YLegend>
  <Tooltip></Tooltip>
</TimeArea>
```


- Miso d3.chart -> Not easy to enumerate inputs