import React from "react";
import { companyNames } from "./module/alpha_vantage";
import "./css/App.css";
import Canvas from "./lib/canvasjs.react";
import "./css/Stats.css";

class App extends React.Component {
  state = {
    list: [],
    company: "",
    options: null,
    charts: null,
  };
  bigdata = {};
  CanvasJS = Canvas.CanvasJS;
  CanvasJSChart = Canvas.CanvasJSChart;

  constructor() {
    super();
    this.onSelect = this.onSelect.bind(this);
    this.process = this.process.bind(this);
    this.statRender = this.statRender.bind(this);
  }

  componentDidMount() {
    var components = [];
    for (var i = 0; i < companyNames.length; i++) {
      var name = companyNames[i][0];
      var exists = companyNames[i][1];
      if (exists === true) {
        var component = (
          <option value={name} key={components.length} className="App0list">
            {name}
          </option>
        );
        components.push(component);
      } else {
        var component = (
          <option
            key={components.length}
            disabled
            value={name}
            className="App1list"
          >
            {name}
          </option>
        );
        components.push(component);
      }
    }
    this.setState({
      list: components,
    });
  }
  async process(pthname) {
    this.setState({
      company: pthname,
    });
    document.title = pthname;
    this.bigdata = require(`./module/company_data/${pthname}.json`);
    var options = [];
    var charts = [];
    var featuristic = {};
    var technicals = Object.keys(this.bigdata["Technical Analysis"]);
    for (var i = 0; i < technicals.length; i++) {
      var date = technicals[i];
      var datedata = this.bigdata["Technical Analysis"][date];
      var functions = Object.keys(datedata);
      for (var j = 0; j < functions.length; j++) {
        var feature = functions[j];
        var data = datedata[feature][Object.keys(datedata[feature])[0]];
        var dat = { x: new Date(date), y: Number(data) };
        if (dat.y != null && typeof dat.y != "undefined");
        if (feature in featuristic) {
          featuristic[feature].push(dat);
        } else {
          featuristic[feature] = [dat];
        }
      }
    }
    var keys = Object.keys(featuristic);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var dataPoints = featuristic[key];
      var option = {
        animationEnabled: true,
        theme: "light2",
        title: {
          text: "TECHNICAL ANALYSIS : " + key,
        },
        axisX: {
          title: "Date",
          valueFormatString: "YYYY MMM DD",
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
          },
        },
        axisY: {
          title: key,
          includeZero: false,
          valueFormatString: "$##0.00",
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            labelFormatter: function(e) {
              return "$" + this.CanvasJS.formatNumber(e.value, "##0.00");
            }.bind(this),
          },
        },
        data: [
          {
            type: "area",
            xValueFormatString: "YYYY MMM DD",
            yValueFormatString: "$##0.00",
            dataPoints: dataPoints,
          },
        ],
      };
      options.push(option);
      var chart = (
        <this.CanvasJSChart
          className="StatsChart"
          key={charts.length}
          options={option}
        />
      );
      charts.push(chart);
    }
    this.setState({
      options: options,
      charts: charts,
    });
  }
  onSelect(event) {
    this.process(event.target.value);
    console.log(event);
    event.preventDefault();
  }
  statRender() {
    return (
      <div className="Stats0">
        <div className="h1">{this.state.company}</div>
        {this.state.charts}
      </div>
    );
  }
  render() {
    return (
      <div className="App0">
        <select onChange={this.onSelect}>{this.state.list}</select>
        {this.state.company.length > 0 ? this.statRender() : <div className="noneSelected">SELECT A COMPANY</div>}
      </div>
    );
  }
}

export default App;
