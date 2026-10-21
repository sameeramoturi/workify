import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const executablePath = fs.existsSync(chromePath) ? chromePath : edgePath;

const outDir = path.resolve(__dirname, '..', 'docs', 'figures');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  console.log('Launching browser using:', executablePath);
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1366,768']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768, deviceScaleFactor: 2 });

  const routes = [
    { url: 'http://localhost:3000/', file: 'web_fig_landing_page.png', wait: 2000 },
    { url: 'http://localhost:3000/workers', file: 'web_fig_workers_map.png', wait: 3500 },
    { url: 'http://localhost:3000/post-job', file: 'web_fig_post_job.png', wait: 2000 },
    { url: 'http://localhost:3000/worker-dashboard', file: 'web_fig_worker_dashboard.png', wait: 2500 }
  ];

  for (const r of routes) {
    console.log(`Navigating to ${r.url}...`);
    try {
      await page.goto(r.url, { waitUntil: 'networkidle0', timeout: 15000 });
    } catch (e) {
      console.log(`Navigation timeout on ${r.url}, proceeding anyway...`);
    }
    await new Promise(res => setTimeout(res, r.wait));
    const dest = path.join(outDir, r.file);
    await page.screenshot({ path: dest, fullPage: false });
    console.log(`Saved screenshot: ${dest}`);
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

run().catch(console.error);
