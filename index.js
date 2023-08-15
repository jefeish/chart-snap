/**
 * @fileoverview This file is the entry point for the action.
 * @description This script uses Puppeteer to render a chart using Chart.js 
 *              and save it as a PNG image.
 * 
 * @author jefeish@github.com
 * 
 */

const yaml = require('js-yaml');
const core = require('@actions/core');
const github = require('@actions/github');
const path = require('path')
const fs = require('fs')
const { renderChart } = require('./renderChart')

/**
 * @description This function is the entry point for the action.
 * @returns {Promise<void>}
 */
async function exec() {
    const demoData = `Hello [chart-snap](
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
  
    const token = core.getInput("GITHUB_TOKEN");
    const octokit = github.getOctokit(token);
    const context = github.context;

    // Get data from the Issue comment
    const issueComment = context.payload.comment.body
    issueComment = demoData;

    // extract chart type and data from comment.
    const chartSnapRegex = /\[chart-snap\]\((.*)\)/s;
    const chartSnapData = issueComment.match(chartSnapRegex);
    const chartSnap = yaml.load(chartSnapData[1]);
    const chartType = chartSnap.chartType;
    const chartData = chartSnap.chartData;

    const imageOutputLocation = core.getInput("image-location");
    chartWidth = core.getInput("image-width") || 700;
    chartHeight = core.getInput("image-height") || 800;

    renderChart(chartType, chartData, imageOutputLocation, chartWidth, chartHeight).then(() => {
        // update Issue
        console.log(`Updating Issue with chart image...`)
        const issue_number = context.payload.issue.number;
        const owner = context.repo.owner;
        const repo = context.repo.repo;
        const chartPath = path.join(__dirname, 'chart.png');
        const chartData = fs.readFileSync(chartPath);
        const chartBase64 = Buffer.from(chartData).toString('base64');
        const chartUrl = `![chart](data:image/png;base64,${chartBase64})`;
        octokit.issues.createComment({
            owner,
            repo,
            issue_number,
            body: chartUrl
        });
    }).catch((err) => {
        console.error(err);
        process.exit(1);
    })
}

//Entrypoint
exec()