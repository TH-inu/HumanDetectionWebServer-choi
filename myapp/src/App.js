import React from 'react';
import './App.css';
import { Line } from 'react-chartjs-2';

function data_processing(csiData) {
  for (var i = 0; i < 64; i++) {
    label[i] = ''+i
  }

  // csi 데이터만 뽑아내기
  var csi_data = [];
  var i = 0;
  csiData.forEach(csiData => {
    // console.log(csiData);
    csi_data[i++] = csiData.csi_data.split(', ').map(item => {
      return parseInt(item, 10);
    }); // string to int array
  });
  // csiData.forEach( csiData => { 
  //   csi_data[i++] = csiData.csi_data.split(', ').map(item => {
  //     return parseInt(item, 10);
  //   }); // string to int array
  // });

  // dataSet 만들기
  for (var j = 0; j < 20; j++) {
    dataSet[j] = {
      label: +j+' of csi_data',
      data: csi_data[j],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    }
  }
  let return_data = {labels: label, datasets: dataSet};
  return return_data
}

const stream_url = 'http://localhost:5001/api'

const options = {
  scales: {
    y: {
      beginAtZero: true
    }
  }
};
const label = []
const dataSet = [];
let data = {labels: label, datasets: dataSet};
let lineChart;

var es = new EventSource(stream_url);
var csiData = []
es.onmessage = function (event) {
  csiData = event.data;
  data = data_processing(JSON.parse(event.data));
this.setState(this.onChange(data));
// var es = new EventSource(stream_url);
// var csiData = []
// es.onmessage = function (event) {
//   csiData = event.data;
//   data = data_processing(JSON.parse(event.data));
//   this.setState(this.onChange(data));
//   // console.log(data);
// };
es.addEventListener('myevent', function(e) {
    // 'myevent' 이벤트의 데이터 처리
    // console.log(e);
    // console.log(JSON.parse(data));
    
}, false);

class App extends React.Component {
  // console.log(data);
};
  // state에 사용할 변수 초기화
  // constructor(props) {
  //     super(props);
  //     this.state = {
  //         csiData:[]
  //     };
  // }

  // json 파일로 받아온 데이터 parsing
  // componentDidMount() {
  //   fetch(stream_url)
  //       .then(res=>res.json())
  //       .then(data=>this.setState({csiData : data.csiData}));
  // }
  conponentDidMount() {
    console.log(this.chartReference);
    lineChart = this.reference.charInstance;
    console.log(lineChart);
  }

  render() {
    // const {csiData} = this.state;
    // console.log(csiData);
    // x축 label 생성

    return (
      <div className="App">
        {/* {draw_graph()} */}
        {/* <Line data={data} options={options} /> */}
        <Line  
          data={this.data}
          ref={(reference) => this.chartReference = reference} />
      </div>
    );
  }
}

export default App;