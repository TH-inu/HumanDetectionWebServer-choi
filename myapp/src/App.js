import React from 'react';
import logo from './logo.svg';
import './App.css';
import Chart from './component/showGraph'

class App extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          username:null
      };
  }
  componentDidMount() {
    fetch('http://localhost:3001/api')
        .then(res=>res.json())
        .then(data=>this.setState({username:data.username}));
  }

  render() {
    const {username} = this.state;
    return (
        <div className="App">
          {username ? `Hello ${username}` : 'Hello World'}
          <Chart/>
        </div>
    );
    ;
  }
}

export default App;