/**
 * @description This module uses Puppeteer to render a chart using Chart.js 
 *              and save it as a PNG image.
 * 
 * @param {string} chartType - The type of chart to render (e.g. 'bar', 'line', 'pie', etc.)
 * @param {object} chartData - The data to render the chart (see Chart.js documentation for format)
 * @param {string} imageOutputLocation - The location where the PNG image of the chart will be saved (absolute or relative path)
 * @param {number} [chartWidth=800] - The width of the chart (default: 800)
 * @param {number} [chartHeight=600] - The height of the chart (default: 600)
 * 
 * @returns {Promise} A Promise that resolves when the chart is rendered and saved as a PNG image.
 * 
 */

import puppeteer from 'puppeteer'
import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

export default async function renderChart(chartType, chartData, imageOutputLocation, chartWidth, chartHeight) {
  const browser = await puppeteer.launch({ headless: "new" })
  const page = await browser.newPage()

  // Set viewport size and device scale factor for higher resolution
  await page.setViewport({
    width: chartWidth || 800,   // Adjust as needed
    height: chartHeight || 600,  // Adjust as needed
    deviceScaleFactor: 4, // Adjust as needed
  })

  const imagePath = path.join(new URL('.', import.meta.url).pathname, imageOutputLocation)
  const chartName = chartType // chartName is used as the filename

  // check if the chart type is chartSupported
  let chartSupported = false
  switch (chartType) {
    case 'bar': chartSupported = true; break;
    case 'line': chartSupported = true; break;
    case 'pie': chartSupported = true; break;
    case 'doughnut': chartSupported = true; break;
    case 'radar': chartSupported = true; break;
    case 'polarArea': chartSupported = true; break;
    case 'bubble': chartSupported = true; break;
    case 'scatter': chartSupported = true; break;
    default: chartSupported = false; break;
  }

  if (chartSupported) {
    // Read the EJS template file
    const templatesDirectory = path.join(new URL('.', import.meta.url).pathname, 'chart-templates/')
    const templatePath = path.join(templatesDirectory, chartType + '.ejs')
    const templateContent = fs.readFileSync(templatePath, 'utf8')

    const renderedHtml = ejs.render(templateContent, { chartData: chartData })

    // Load the HTML content using page.goto
    await page.goto(`data:text/html,${encodeURIComponent(renderedHtml)}`)

    // Wait for the chart to render (adjust the delay as needed)
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Capture a screenshot of the chart
    await page.screenshot({ path: imagePath + '/' + chartName + '.png' })
  } else {
    console.log('Chart type not chartSupported: ' + chartType)
  }

  await browser.close()
}