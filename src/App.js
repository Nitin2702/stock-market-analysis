import React from "react";
import "./css/App.css";
import Canvas from "./lib/canvasjs.react";
import "./css/Stats.css";
import axios from "axios";

class App extends React.Component {
  state = {
    list: [],
    company: "",
    options: null,
    loading: true,
    charts: null,
    fetchedCompanyData: {},
  };
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
    var companyNames = [];
    axios
      .get("https://graybot-server.herokuapp.com/companies")
      .then((res) => {
        companyNames = res.data.list;
        var fcd = {};
        for (var i = 0; i < companyNames.length; i++) {
          var name = companyNames[i];
          fcd[name] = null;
          var component = (
            <option value={name} key={components.length} className="App0list">
              {name}
            </option>
          );
          components.push(component);
        }
        this.setState({
          list: components,
          fetchedCompanyData: fcd,
          loading: false
        });
      })
      .catch((err)=>{alert(err)});
  }
  async process(pthname) {
    document.title = pthname;
    var bigdata = {};
    if (this.state.fetchedCompanyData[pthname] == null) {
      bigdata = await axios.get("https://graybot-server.herokuapp.com/company", {
        params: { name: pthname },
      });
      bigdata = bigdata.data["data"];
      if (bigdata != null && typeof bigdata != "undefined") {
        var fcd = this.state.fetchedCompanyData;
        fcd[pthname] = bigdata;
        this.setState({
          fetchedCompanyData: fcd,
        });
      }
    } else {
      bigdata = this.state.fetchedCompanyData[pthname];
    }
    var options = [];
    var charts = [];
    var featuristic = {};
    var technicals = Object.keys(bigdata["Technical Analysis"]);
    for (var i = 0; i < technicals.length; i++) {
      var date = technicals[i];
      var datedata = bigdata["Technical Analysis"][date];
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
          valueFormatString: "₹##0.00",
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            labelFormatter: function(e) {
              return "₹" + this.CanvasJS.formatNumber(e.value, "##0.00");
            }.bind(this),
          },
        },
        data: [
          {
            type: "area",
            xValueFormatString: "YYYY MMM DD",
            yValueFormatString: "₹##0.00",
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
      company: pthname,
    });
  }
  onSelect(event) {
    this.setState({
      loading: true,
      company: ""
    });
    this.process(event.target.value)
      .then(() => {
        this.setState({
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          loading: true,
        });
      });
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
        {this.state.company.length > 0 ? (
          this.statRender()
        ) : this.state.loading == false ? (
          <div className="noneSelected">SELECT A COMPANY</div>
        ) : (
          <div className="loading">
            <img className="loadImg" alt="loading" src={require("./assets/Ring-Loading.gif")} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
