/*
```
<TimeArea>
  <Timeseries scale= data=></Timeseries>
  <Annotations scale= data=></Annotations>
  <XLegend position= scale= data=></XLegend>
  <YLegend position= scale= data=><YLegend>
  <Tooltip></Tooltip>
</TimeArea>
```
 */

var TimeArea = React.createClass({
  getInitialState: function () {
    return {
      tooltip: {text: 'Hello world'},
    };
  },

  render: function() {

    var WIDTH = 400;
    var HEIGHT = 400;

    var scale = {
      x: d3.scale.linear().range([0, WIDTH]),
      y: d3.scale.linear().range([HEIGHT, 0]),
    }; // create scale
    var data = [{x: 0, y: 0}, {x: 0.5, y: 0.5}];

    return (
      <div>
        <svg width={WIDTH} height={HEIGHT}>
          <Timeline scale={scale} data={data} onTooltip={this.handleTooltip}></Timeline>
        </svg>
        <Tooltip tooltip={this.state.tooltip}></Tooltip>
      </div>
    );
  }
});


var Timeline = React.createClass({
  render: function() {
    var x = this.props.scale.x; // create scale
    var y = this.props.scale.y; // create scale

    var line = d3.svg.line()
      .x(function (d) { return x(d.x); })
      .y(function (d) { return y(d.y); })
      ;

    var path = line(this.props.data);

    return (
      <g>
        <path d={path} />
      </g>
    );
  }
});

var Tooltip = React.createClass({
  render: function() {
    var scale; // create scale

    var path = d3;

    return (
      <div>
        {this.props.tooltip.text}
      </div>
    );
  }
});

React.render(
  <TimeArea/>,
  document.getElementById('container')
);