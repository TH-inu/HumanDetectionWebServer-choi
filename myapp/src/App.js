import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Chart from './component/showGraph'

class App extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          csiData:[]
      };
  }

  componentDidMount() {
    fetch('http://localhost:3001/api')
        .then(res=>res.json())
        .then(data=>this.setState({csiData : data.csiData}));
  }

  render() {
    const {csiData} = this.state;
    return (
      <div className="App">
        <Chart/>
        {console.log(csiData)}
      </div>
    );
  }
}

export default App;