const yaml = require('js-yaml');
const util = require('util');

const text = `Hello [chart-snap](
chartName: mychart
chartType: bar
chartData:
  labels: [Math, Science, History, English, Art, Music, Sports]
  datasets:
  - label: Student Skills
    data: [80, 70, 60, 85, 45, 30, 75]
    backgroundColor: #00ff00
    borderColor: #ff0000
    borderWidth: 1
  - label: Student Goals
    data: [110, 40, 60, 25, 65, 23, 45]
    backgroundColor: #0000ff
    borderColor: #00f0f0
    borderWidth: 1
  )`;


const regex = /\[chart-snap\]\((.*)\)/s;
const chartSnap = text.match(regex);
console.log("chartSnap:" + chartSnap[1]);

// let chartData = JSON.parse(jsonData[1]);

const jsonData = yaml.load(chartSnap[1]);
console.log("jsonData: " + util.inspect(jsonData));

// const chartData = JSON.parse(jsonData);
// console.log("jsonData: "+ jsonData);
// console.log(typeof jsonData);
// console.log("result: "+ jsonData)

console.log("chartName: "+ jsonData.chartName)
console.log("chartType: "+ jsonData.chartType)