import React from 'react';
import Canvas from './lib/canvasjs.react';
import './css/Stats.css';

export default class Stats extends React.Component {
    bigdata = {};
    CanvasJS = Canvas.CanvasJS;
    CanvasJSChart = Canvas.CanvasJSChart;
    state = {
        company : "",
        options : [],
        charts: []
    }

    componentDidMount(){
        this.setState({
            company: this.props.match.params.name
        });
        document.title = this.props.match.params.name;
        this.bigdata = require(`./module/company_data/${this.props.match.params.name}.json`);
        var options = [];
        var charts = [];
        var featuristic = {};
        var technicals = Object.keys(this.bigdata["Technical Analysis"]);
        for(var i=0;i<technicals.length;i++){
            var date = technicals[i];
            var datedata = this.bigdata['Technical Analysis'][date];
            var functions = Object.keys(datedata);
            for(var j=0;j<functions.length;j++){
                var feature = functions[j];
                var data = datedata[feature][Object.keys(datedata[feature])[0]];
                var dat = {x : new Date(date),y : Number(data)};
                if(dat.y != null && typeof dat.y != 'undefined');
                if (feature in featuristic){
                    featuristic[feature].push(dat);
                }else{
                    featuristic[feature] = [dat];
                }
            }
        }
        var keys = Object.keys(featuristic);
        for(var i=0;i<keys.length;i++){
            var key = keys[i];
            var dataPoints = featuristic[key];
            var option = {
                animationEnabled: true,
                theme: "light2",
                title:{
                    text: "TECHNICAL ANALYSIS : "+key
                },
                axisX:{
                    title: "Date",
                    valueFormatString: "YYYY MMM DD",
                    crosshair: {
                        enabled: true,
                        snapToDataPoint: true
                    }
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
                        }.bind(this)
                    }
                },
                data : [{
                    type: "area",
                    xValueFormatString: "YYYY MMM DD",
                    yValueFormatString: "$##0.00",
                    dataPoints: dataPoints
                }]
            };
            options.push(option);
            var chart = <this.CanvasJSChart className="StatsChart" key={charts.length} options={option}/>;
            charts.push(chart);
        }
        this.setState({
            options:options,
            charts:charts
        });
    }

    render(){
        return(<div className="Stats0">
        <div class="h1">{this.state.company}</div>
        {this.state.charts}
        </div>);
    }
}