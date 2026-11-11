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
  await sleep(2200);

  // 获取所有 filter-chip 分类
  async function cats() {
    return p.evaluate(() => Array.from(document.querySelectorAll('.filter-chip')).map(c => c.textContent.trim()));
  }

  // ===== 专家 =====
  await p.click('#nav [data-route="experts"]');
  await sleep(600);
  let n = await p.$$eval('.card-grid .card', els => els.length);
  assert(n === 300, '专家 300 项，实际 ' + n);
  let c = await cats();
  assert(c.includes('金融与法务') && c.includes('教育与研究'), '专家分类含新分类: ' + JSON.stringify(c));

  // ===== 技能 =====
  await p.click('#nav [data-route="skills"]');
  await sleep(600);
  n = await p.$$eval('.card-grid .card', els => els.length);
  assert(n === 300, '技能 300 项，实际 ' + n);
  c = await cats();
  assert(c.includes('AI 与模型') && c.includes('自动化') && c.includes('通信与协作') && c.includes('系统与运维'),
    '技能分类含新分类: ' + JSON.stringify(c));

  // ===== 连接器 =====
  await p.click('#nav [data-route="connectors"]');
  await sleep(600);
  n = await p.$$eval('.card-grid .card', els => els.length);
  assert(n === 300, '连接器 300 项，实际 ' + n);
  c = await cats();
  assert(c.includes('AI 与模型') && c.includes('部署与云'), '连接器分类含新分类: ' + JSON.stringify(c));

  // 分类筛选功能：专家点「金融与法务」应显示 30 项
  await p.click('#nav [data-route="experts"]');
  await sleep(500);
  await p.evaluate(() => {
    const chip = Array.from(document.querySelectorAll('.filter-chip')).find(x => x.textContent.trim() === '金融与法务');
    chip.click();
  });
  await sleep(400);
  n = await p.$$eval('.card-grid .card', els => els.length);
  assert(n === 30, '专家「金融与法务」30 项，实际 ' + n);

  // 搜索功能：技能搜「代码」应命中多条
  await p.click('#nav [data-route="skills"]');
  await sleep(500);
  await p.evaluate(() => {
    const chip = Array.from(document.querySelectorAll('.filter-chip')).find(x => x.textContent.trim() === '全部');
    chip.click();
  });
  await sleep(200);
  await p.evaluate(() => {
    const input = document.querySelector('.inline-search input');
    input.value = '代码';
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await sleep(300);
  n = await p.$$eval('.card-grid .card', els => els.length);
  assert(n >= 1, '技能搜「代码」命中 ≥1 项，实际 ' + n);

  assert(errors.length === 0, '无页面错误' + (errors.length ? ': ' + errors[0] : ''));

  console.log(`\n结果：${passed} 通过，${failed} 失败`);
  await b.close();
  process.exit(failed ? 1 : 0);
})();
