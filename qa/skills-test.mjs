import puppeteer from 'puppeteer-core';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE = 'file:///C:/Users/lujie/WorkBuddy/2026-11-02-14-19-44/platformx/index.html';
const sleep = ms => new Promise(r => setTimeout(r, ms));

let passed = 0, failed = 0;
function assert(cond, msg) {
  if (cond) { passed++; console.log('  ✓ ' + msg); }
  else { failed++; console.log('  ✗ ' + msg); }
}

(async () => {
  const b = await puppeteer.launch({
    executablePath: CHROME, headless: 'new',
    args: ['--no-sandbox', '--allow-file-access-from-files', '--disable-web-security']
  });
  const p = await b.newPage();
  const errors = [];
  p.on('pageerror', e => errors.push(e.message));

  await p.setViewport({ width: 1440, height: 900 });
  await p.goto(BASE, { waitUntil: 'networkidle0' });
  await sleep(1800);

  // 进入技能板块
  await p.click('#nav [data-route="skills"]');
  await sleep(500);

  const topCount = await p.$$eval('.card-grid .card', els => els.length);
  assert(topCount === 30, '技能板块显示 30 项，实际 ' + topCount);

  // 分类筛选包含「数据」
  const cats = await p.evaluate(() =>
    Array.from(document.querySelectorAll('.filter-chip')).map(c => c.textContent.trim())
  );
  assert(cats.includes('数据'), '分类含「数据」: ' + JSON.stringify(cats));

  // 点「数据」分类，应显示 5 项
  await p.evaluate(() => {
    const chip = Array.from(document.querySelectorAll('.filter-chip')).find(c => c.textContent.trim() === '数据');
    chip.click();
  });
  await sleep(300);
  const dataCount = await p.$$eval('.card-grid .card', els => els.length);
  assert(dataCount === 5, '「数据」分类 5 项，实际 ' + dataCount);

  // 搜「部署」应命中 cloud-deploy 和 site-publish
  await p.evaluate(() => {
    const chip = Array.from(document.querySelectorAll('.filter-chip')).find(c => c.textContent.trim() === '全部');
    chip.click();
  });
  await sleep(200);
  await p.evaluate(() => {
    const input = document.querySelector('.inline-search input');
    input.value = '部署';
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await sleep(300);
  const searchCount = await p.$$eval('.card-grid .card', els => els.length);
  assert(searchCount >= 1, '搜「部署」命中 ≥1 项，实际 ' + searchCount);
  const searchText = await p.$eval('.card-grid', e => e.textContent);
  assert(/云平台部署/.test(searchText), '搜「部署」应命中「云平台部署」');

  assert(errors.length === 0, '无页面错误' + (errors.length ? ': ' + errors[0] : ''));

  console.log(`\n结果：${passed} 通过，${failed} 失败`);
  await b.close();
  process.exit(failed ? 1 : 0);
})();
