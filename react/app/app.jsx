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
      tooltipSrc: null,
    };
  },

  handleTooltip: function (tooltipObj, tooltipSrc) {
    if (!tooltipObj &&
        tooltipSrc !== this.state.tooltipSrc) {
      return;
    }

    this.setState({
      tooltip: tooltipObj,
      tooltipSrc: tooltipObj ? tooltipSrc : null,
    });
  },

  render: function() {

    var WIDTH = 400;
    var HEIGHT = 400;

    var scale = {
      x: d3.scale.linear().range([0, WIDTH]),
      y: d3.scale.linear().range([HEIGHT, 0]),
    }; // create scale
    var data = [{x: 0, y: 0}, {x: 0.5, y: 0.5}];
    var annotations = [
      {x: 0.1, l: 0.2, fill: 'green'},
      {x: 0.8, l: 1, fill: 'blue'},
    ];

    return (
      <div>
        <Tooltip tooltip={this.state.tooltip}></Tooltip>
        <svg width={WIDTH} height={HEIGHT}>
          <Timeline scale={scale} data={data} onTooltip={this.handleTooltip}></Timeline>
          <Annotation scale={scale} data={annotations} onTooltip={this.handleTooltip}></Annotation>
        </svg>
      </div>
    );
  }
});


var Timeline = React.createClass({

  handleMouseMove: function(e) {
    this.props.onTooltip({
      text: 'X: ' + e.clientX
    });
  },

  render: function() {
    var x = this.props.scale.x; // create scale
    var y = this.props.scale.y; // create scale

    var line = d3.svg.line()
      .x(function (d) { return x(d.x); })
      .y(function (d) { return y(d.y); })
      ;

    var path = line(this.props.data);

    return (
      <g onMouseMove={this.handleMouseMove} >
        {/* Rectangle for hit testing */}
        <rect x="0" y="0"
          width={this.props.scale.x.range()[1]}
          height={this.props.scale.y.range()[0]}
          fill="transparent" />
        <path d={path}/>
      </g>
    );
  },

});

var Annotation = React.createClass({

  handleMouseEnter: function(i) {
    this.props.onTooltip({
      text: 'Color: ' + this.props.data[i].fill,
    }, this);
  },

  handleMouseLeave: function(i) {
    this.props.onTooltip({}, this);
  },

  render: function() {
    var x = this.props.scale.x; // create scale
    var y = this.props.scale.y; // create scale

    return (
      <g>
        {this.props.data.map(function (d, i) {
          return (
            <rect
              key={i}
              x={x(d.x)}
              width={x(d.x + d.l)}
              y="0"
              height={this.props.scale.y.range()[0]}
              fill={d.fill}
              onMouseEnter={this.handleMouseEnter.bind(this, i)}
              onMouseLeave={this.handleMouseLeave.bind(this, i)}
              />
          );
        }, this)}
      </g>
    );
  },

});

var Tooltip = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.tooltip.text || 'Nothing'}
      </div>
    );
  }
});

React.render(
  <TimeArea/>,
  document.getElementById('container')
);