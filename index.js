/**
 * @fileoverview This file is the entry point for the action.
 * @description This script uses Puppeteer to render a chart using Chart.js 
 *              and save it as a PNG image.
 * 
 * @author jefeish@github.com
 * 
 */

const core = require('@actions/core');
const github = require('@actions/github');

const puppeteer = require('puppeteer')
const path = require('path')
const ejs = require('ejs')
const fs = require('fs')
const renderChart = require('./renderChart')

/**
 * @description This function is the entry point for the action.
 * @returns {Promise<void>}
 */
async function exec() {
    renderChart().then(() => {  
        // update Issue
        const token = core.getInput("GITHUB_TOKEN");
        const octokit = github.getOctokit(token);
        const context = github.context;
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