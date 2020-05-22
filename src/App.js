import React from "react";
import { companyNames } from "./module/alpha_vantage";
import './css/App.css';
import { Link } from 'react-router-dom';

class App extends React.Component {
  state = {
    list : [],
  }
  componentDidMount(){
    var components = [];
    //companyNames.sort();
    for(var i=0;i<companyNames.length;i++){
      var name = companyNames[i][0];
      var exists = companyNames[i][1];
      if(exists===true){
        var component = <Link target="_blank" title={name} key={components.length} className="App0list" to={`/stats/${name}`}>{name}</Link>;
        components.push(component);
      }else{
        var component = <div key={components.length} className="App1list">{name}</div>;
        components.push(component);
      }
    }
    this.setState({
      list: components
    });
  }
  render() {
    return <div className="App0">
      {this.state.list}
    </div>;
  }
}

export default App;