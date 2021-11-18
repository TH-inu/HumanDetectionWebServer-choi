import React from 'react';
import './App.css';
import { Line } from 'react-chartjs-2';

const options = {
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

class App extends React.Component {

  // state에 사용할 변수 초기화
  constructor(props) {
      super(props);
      this.state = {
          csiData:[]
      };
  }

  // json 파일로 받아온 데이터 parsing
  componentDidMount() {
    fetch('http://localhost:3001/api')
        .then(res=>res.json())
        .then(data=>this.setState({csiData : data.csiData}));
  }

  render() {
    const {csiData} = this.state;

    // x축 label 생성
    const label = []
    for (var i = 0; i < 20; i++) {
      label[i] = ''+i
    }

    // csi 데이터만 뽑아내기
    var csi_data = [];
    var i = 0;
    csiData.forEach( csiData => { 
      csi_data[i++] = csiData.csi_data;
    })

    // dataSet 만들기
    const dataSet = [];
    for (var j = 0; j < 6; j++) {
      dataSet[j] = {
        label: +j+' of csi_data',
        data: csi_data[j],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      }
    }

    const data = {labels: label, datasets: dataSet};
    console.log(data);

    return (
      <div className="App">
        <Line data={data} options={options} />
      </div>
    );
  }
}

export default App;