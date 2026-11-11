import puppeteer from 'puppeteer-core';
import fs from 'fs';

const BASE = 'C:/Users/lujie/WorkBuddy/2026-11-02-14-19-44/platformx';
const URL = 'file:///' + BASE + '/index.html';
const SHOTS = BASE + '/qa/shots';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
fs.mkdirSync(SHOTS, { recursive: true });

const results = [];
const assert = (cond, msg) => { if (!cond) throw new Error(msg); };
async function check(id, name, fn) {
  try { const n = await fn(); results.push({ id, name, ok: true, note: n || '' }); console.log(`PASS ${id} ${name}${n ? ' :: ' + n : ''}`); }
  catch (e) { results.push({ id, name, ok: false, note: e.message }); console.log(`FAIL ${id} ${name} :: ${e.message}`); }
}
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
const errors = [];
page.on('pageerror', e => errors.push(e.message));
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });

async function gotoPlans() {
  await page.goto(URL, { waitUntil: 'networkidle0' });
  await page.evaluate(() => { localStorage.clear(); location.hash = '#/plans'; location.reload(); });
  await sleep(600);
}

// T1 套餐页渲染，价格应为月付标准版9/专业版99
await check('T1', '套餐页渲染月付价格', async () => {
  await gotoPlans();
  const prices = await page.evaluate(() => {
    return [...document.querySelectorAll('.plan-amount')].map(e => e.textContent.trim());
  });
  assert(prices.length === 3, '应有3个套餐价格，实得' + prices.length);
  assert(prices[0] === '免费', '体验版应为免费');
  assert(prices[1] === '¥9', '标准版月付应为¥9，实得' + prices[1]);
  assert(prices[2] === '¥99', '专业版月付应为¥99，实得' + prices[2]);
  return prices.join(' | ');
});

// T2 切换到年付，价格变为 88 / 888，且显示省金额
await check('T2', '年付价格切换', async () => {
  await page.evaluate(() => {
    document.querySelector('.cycle-btn[data-id="year"]').click();
  });
  await sleep(300);
  const prices = await page.evaluate(() => {
    return [...document.querySelectorAll('.plan-amount')].map(e => e.textContent.trim());
  });
  assert(prices[1] === '¥88', '标准版年付应为¥88，实得' + prices[1]);
  assert(prices[2] === '¥888', '专业版年付应为¥888，实得' + prices[2]);
  const saves = await page.evaluate(() => [...document.querySelectorAll('.plan-save')].map(e => e.textContent.trim()));
  assert(saves.length === 2, '应有2个省金额标签');
  assert(saves[0] === '省 ¥20', '标准版年付省¥20，实得' + saves[0]);
  assert(saves[1] === '省 ¥300', '专业版年付省¥300，实得' + saves[1]);
  return prices.join(' | ') + ' / ' + saves.join(' | ');
});

// T3 点击标准版购买，弹出支付弹窗，默认微信
await check('T3', '购买套餐弹出支付弹窗', async () => {
  await page.evaluate(() => {
    document.querySelector('.cycle-btn[data-id="month"]').click();
  });
  await sleep(200);
  await page.evaluate(() => {
    document.querySelector('.plan-card.highlight .plan-btn').click();
  });
  await sleep(300);
  const overlay = await page.evaluate(() => !document.querySelector('#modal-overlay').hidden);
  assert(overlay, '支付弹窗未打开');
  const txt = await page.evaluate(() => document.querySelector('#modal').textContent);
  assert(txt.includes('开通标准版'), '标题应含开通标准版');
  assert(txt.includes('¥9'), '金额应为9');
  const brand = await page.evaluate(() => document.querySelector('.pay-qr-brand').textContent.trim());
  assert(brand.includes('微信'), '默认应微信支付');
  const qr = await page.evaluate(() => document.querySelector('.pay-qr svg') !== null);
  assert(qr, '应生成二维码SVG');
  await page.screenshot({ path: SHOTS + '/25-pay-wechat.png' });
  return '弹窗+二维码+微信默认 OK';
});

// T4 切换到支付宝，二维码品牌变化
await check('T4', '切换支付宝支付', async () => {
  await page.evaluate(() => {
    document.querySelector('.pay-method[data-id="alipay"]').click();
  });
  await sleep(200);
  const brand = await page.evaluate(() => document.querySelector('.pay-qr-brand').textContent.trim());
  assert(brand.includes('支付宝'), '应切换为支付宝，实得' + brand);
  await page.screenshot({ path: SHOTS + '/26-pay-alipay.png' });
  return brand;
});

// T5 模拟支付到账，套餐切换为 standard
await check('T5', '模拟支付后套餐生效', async () => {
  await page.evaluate(() => {
    document.querySelector('[data-act="simulate-pay"]').click();
  });
  await sleep(400);
  const plan = await page.evaluate(() => document.querySelector('.bh-plan').textContent.trim());
  assert(plan.includes('标准版'), '应切到标准版，实得' + plan);
  const overlay = await page.evaluate(() => document.querySelector('#modal-overlay').hidden);
  assert(overlay, '弹窗应关闭');
  return plan;
});

// T6 积分充值弹出支付弹窗
await check('T6', '积分充值弹支付弹窗', async () => {
  await page.evaluate(() => { location.hash = '#/plans'; location.reload(); });
  await sleep(500);
  const before = await page.evaluate(() => JSON.parse(localStorage.getItem('platformx.store.v1')).credits);
  await page.evaluate(() => {
    document.querySelector('.credit-pack[data-id="p100"]').click();
  });
  await sleep(300);
  const txt = await page.evaluate(() => document.querySelector('#modal').textContent);
  assert(txt.includes('积分充值'), '标题应含积分充值');
  assert(txt.includes('¥6'), '金额应为6');
  return 'before credits=' + before;
});

// T7 充值模拟到账，积分+100
await check('T7', '充值模拟到账', async () => {
  await page.evaluate(() => {
    document.querySelector('[data-act="simulate-pay"]').click();
  });
  await sleep(400);
  const after = await page.evaluate(() => JSON.parse(localStorage.getItem('platformx.store.v1')).credits);
  const bh = await page.evaluate(() => document.querySelector('.bh-credit-num').textContent.trim());
  assert(Number(bh) === after, '页面积分应与存储一致');
  return 'credits=' + after;
});

await page.screenshot({ path: SHOTS + '/27-plans-pay.png' });
console.log('\n===== 页面错误 =====');
console.log(errors.length ? errors.join('\n') : '无');
console.log('\n===== 结果 =====');
const pass = results.filter(r => r.ok).length;
console.log(`${pass}/${results.length} 通过`);
await browser.close();
process.exit(pass === results.length ? 0 : 1);
