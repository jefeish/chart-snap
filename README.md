# Chart Snap

This project is a JavaScript module that uses Chart.js and Puppeteer to generate PNG images of charts. The module can render several types of charts, including bar charts and radar charts, and can be customized with different data sets and chart options.

## Installation

To use this module, you must have Node.js and npm installed on your system. You can install the module using npm by running the following command:

```bash
npm install chart-image-generator
```

---
## Usage

To use the module, you can import it into your JavaScript or TypeScript code and call the `renderChart` function with the desired chart type and data. The function returns a Promise that resolves when the chart is rendered and saved as a PNG image.

### Example

```javascript
import renderChart from 'chart-image-generator'

const chartType = 'bar'
const chartData = {
  labels: ['Math', 'Science', 'History', 'English', 'Art', 'Music', 'Sports'],
  datasets: [{
    label: 'Student Skills',
    data: [80, 70, 60, 85, 45, 30, 75],
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 1
  },
  {
    label: 'Student Goals',
    data: [110, 40, 60, 25, 65, 23, 45],
    backgroundColor: '#0000ff',
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 1
  }]
}

renderChart(chartType, chartData)
  .then(() => console.log('Chart rendered successfully!'))
  .catch((err) => console.error(err))

```

---

### Bar-Chart Data Sample

```json
// Sample data for the chart
const data = {
    labels: ['Math', 'Science', 'History', 'English', 'Art', 'Music', 'Sports'],
    datasets: [{
            label: 'Student Skills',
            data: [80, 70, 60, 85, 45, 30, 75],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        },
        {
            label: 'Student Goals',
            data: [110, 40, 60, 25, 65, 23, 45],
            backgroundColor: '#0000ff',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
    }]
}
```

![bar](images/bar.png)

---

### Radar-Chart Data Sample 
(same data different rendering)

```json
// Sample data for the chart
const data = {
    labels: ['Math', 'Science', 'History', 'English', 'Art', 'Music', 'Sports'],
    datasets: [{
            label: 'Student Skills',
            data: [80, 70, 60, 85, 45, 30, 75],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        },
        {
            label: 'Student Goals',
            data: [110, 40, 60, 25, 65, 23, 45],
            backgroundColor: '#0000ff',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
    }]
}
```

![radar](images/radar.png)

---