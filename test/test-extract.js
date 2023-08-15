const chartDataString = `{\
    chartName: 'mychart',\
    chartType: 'bar',\
    chartData: {\
        labels: ['Math', 'Science', 'History', 'English', 'Art', 'Music', 'Sports'],\
        datasets: [{\
          label: 'Student Skills',\
          data: [80, 70, 60, 85, 45, 30, 75],\
          backgroundColor: 'rgba(75, 192, 192, 0.2)',\
          borderColor: 'rgba(75, 192, 192, 1)',\
          borderWidth: 1\
        },\
        {\
          label: 'Student Goals',\
          data: [110, 40, 60, 25, 65, 23, 45],\
          backgroundColor: '#ff0000',\
          borderColor: 'rgba(75, 192, 192, 1)',\
          borderWidth: 1\
        }]\
      }\
    }`

const chartData = JSON.parse(chartDataString);

console.log(chartData.chartName); // Output: mychart
console.log(chartData.chartType); // Output: bar
console.log(chartData.chartData.labels); // Output: ['Math', 'Science', 'History', 'English', 'Art', 'Music', 'Sports']
console.log(chartData.chartData.datasets[0].label); // Output: Student Skills
console.log(chartData.chartData.datasets[0].data); // Output: [80, 70, 60, 85, 45, 30, 75]
console.log(chartData.chartData.datasets[1].label); // Output: Student Goals
console.log(chartData.chartData.datasets[1].data); // Output: [110, 40, 60, 25, 65, 23, 45]