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

  // ===== 专家板块 =====
  await p.click('#nav [data-route="experts"]');
  await sleep(500);

  const expCount = await p.$$eval('.card-grid .card', els => els.length);
  assert(expCount === 30, '专家板块显示 30 项，实际 ' + expCount);

  let expCats = await p.evaluate(() =>
    Array.from(document.querySelectorAll('.filter-chip')).map(c => c.textContent.trim())
  );
  assert(expCats.includes('数据'), '专家分类含「数据」: ' + JSON.stringify(expCats));
  assert(expCats.includes('营销') && expCats.includes('运营'), '专家分类含「营销」「运营」: ' + JSON.stringify(expCats));

  // 点「数据」分类
  await p.evaluate(() => {
    const chip = Array.from(document.querySelectorAll('.filter-chip')).find(c => c.textContent.trim() === '数据');
    chip.click();
  });
  await sleep(300);
  const expDataCount = await p.$$eval('.card-grid .card', els => els.length);
  assert(expDataCount === 5, '专家「数据」分类 5 项，实际 ' + expDataCount);

  // ===== 连接器板块 =====
  await p.click('#nav [data-route="connectors"]');
  await sleep(500);

  const connCount = await p.$$eval('.card-grid .card', els => els.length);
  assert(connCount === 30, '连接器板块显示 30 项，实际 ' + connCount);

  let connCats = await p.evaluate(() =>
    Array.from(document.querySelectorAll('.filter-chip')).map(c => c.textContent.trim())
  );
  assert(connCats.includes('部署') && connCats.includes('AI') && connCats.includes('业务'),
    '连接器分类含「部署」「AI」「业务」: ' + JSON.stringify(connCats));

  // 点「AI」分类
  await p.evaluate(() => {
    const chip = Array.from(document.querySelectorAll('.filter-chip')).find(c => c.textContent.trim() === 'AI');
    chip.click();
  });
  await sleep(300);
  const connAICount = await p.$$eval('.card-grid .card', els => els.length);
  assert(connAICount === 4, '连接器「AI」分类 4 项，实际 ' + connAICount);

  assert(errors.length === 0, '无页面错误' + (errors.length ? ': ' + errors[0] : ''));

  console.log(`\n结果：${passed} 通过，${failed} 失败`);
  await b.close();
  process.exit(failed ? 1 : 0);
})();
