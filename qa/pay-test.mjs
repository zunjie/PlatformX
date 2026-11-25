import puppeteer from 'puppeteer-core';
import { BASE_DIR as BASE, PAGE_URL as URL, CHROME } from './env.mjs';
import fs from 'fs';

const SHOTS = BASE + '/qa/shots';
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

// T1 套餐页渲染，月付 免费/39/129/399
await check('T1', '套餐页渲染月付价格', async () => {
  await gotoPlans();
  const prices = await page.evaluate(() => {
    return [...document.querySelectorAll('.plan-amount')].map(e => e.textContent.trim());
  });
  assert(prices.length === 4, '应有4个套餐价格，实得' + prices.length);
  assert(prices[0] === '免费', '免费版应为免费');
  assert(prices[1] === '¥39', '基础会员月付应为¥39，实得' + prices[1]);
  assert(prices[2] === '¥129', '标准会员月付应为¥129，实得' + prices[2]);
  assert(prices[3] === '¥399', '高级会员月付应为¥399，实得' + prices[3]);
  return prices.join(' | ');
});

// T2 切换到年付，价格变为 399 / 1299 / 3999，且显示省金额
await check('T2', '年付价格切换', async () => {
  await page.evaluate(() => {
    document.querySelector('.cycle-btn[data-id="year"]').click();
  });
  await sleep(300);
  const prices = await page.evaluate(() => {
    return [...document.querySelectorAll('.plan-amount')].map(e => e.textContent.trim());
  });
  assert(prices[1] === '¥399', '基础会员年付应为¥399，实得' + prices[1]);
  assert(prices[2] === '¥1299', '标准会员年付应为¥1299，实得' + prices[2]);
  assert(prices[3] === '¥3999', '高级会员年付应为¥3999，实得' + prices[3]);
  const saves = await page.evaluate(() => [...document.querySelectorAll('.plan-save')].map(e => e.textContent.trim()));
  assert(saves.length === 3, '应有3个省金额标签');
  assert(saves[0] === '省 ¥69', '基础会员年付省¥69，实得' + saves[0]);
  assert(saves[1] === '省 ¥249', '标准会员年付省¥249，实得' + saves[1]);
  assert(saves[2] === '省 ¥789', '高级会员年付省¥789，实得' + saves[2]);
  return prices.join(' | ') + ' / ' + saves.join(' | ');
});

// T3 未登录点击购买 → 引导登录（真钱计费需登录后由服务端记账）
await check('T3', '未登录购买引导登录', async () => {
  await page.evaluate(() => {
    document.querySelector('.cycle-btn[data-id="month"]').click();
  });
  await sleep(200);
  await page.evaluate(() => {
    document.querySelector('.plan-card.highlight .plan-btn').click();
  });
  await sleep(400);
  const overlay = await page.evaluate(() => !document.querySelector('#modal-overlay').hidden);
  assert(overlay, '未弹出提示弹窗');
  const txt = await page.evaluate(() => document.querySelector('#modal').textContent);
  assert(/需要登录/.test(txt), '应提示需要登录，实得：' + txt.slice(0, 40));
  assert(/去登录/.test(txt), '应提供去登录按钮');
  await page.screenshot({ path: SHOTS + '/25-pay-need-login.png' });
  return '未登录拦截 OK';
});

// T4 点击「去登录」打开登录弹窗
await check('T4', '登录引导跳转登录弹窗', async () => {
  await page.evaluate(() => {
    document.querySelector('[data-act="login"]').click();
  });
  await sleep(400);
  const txt = await page.evaluate(() => document.querySelector('#modal').textContent);
  assert(/登录 PlatformX/.test(txt), '未打开登录弹窗，实得：' + txt.slice(0, 40));
  const tabs = await page.evaluate(() => document.querySelectorAll('.login-tab').length);
  assert(tabs >= 3, '登录方式应有 3 种，实得 ' + tabs);
  await page.evaluate(() => document.querySelector('[data-act="close-modal"]').click());
  await sleep(200);
  return '邮箱 / 手机号 / 微信 ' + tabs + ' 种方式';
});

// T5 未登录点击充值包 → 同样引导登录
await check('T5', '未登录充值引导登录', async () => {
  await page.evaluate(() => { location.hash = '#/plans'; });
  await sleep(300);
  await page.evaluate(() => {
    document.querySelector('.credit-pack[data-id="p500"]').click();
  });
  await sleep(400);
  const txt = await page.evaluate(() => document.querySelector('#modal').textContent);
  assert(/需要登录/.test(txt), '充值应提示登录，实得：' + txt.slice(0, 40));
  await page.evaluate(() => document.querySelector('[data-act="close-modal"]').click());
  await sleep(200);
  return '充值拦截 OK';
});

// T6 未登录本地签到仍可用（演示账本）
await check('T6', '未登录签到（本地演示）', async () => {
  await page.evaluate(() => {
    const raw = localStorage.getItem('platformx.store.v1');
    const s = raw ? JSON.parse(raw) : {};
    s.credits = 100; s.plan = 'trial'; s.lastCheckIn = ''; s.streak = 0;
    localStorage.setItem('platformx.store.v1', JSON.stringify(s));
    location.hash = '#/plans';
    location.reload();
  });
  await page.waitForFunction(() => document.querySelector('.checkin-btn'), { timeout: 8000 });
  await sleep(500);
  const btn = await page.evaluate(() => document.querySelector('.checkin-btn').textContent.replace(/\s+/g, ' ').trim());
  assert(/签到领 20 积分/.test(btn), '签到按钮异常：' + btn);
  await page.evaluate(() => document.querySelector('.checkin-btn').click());
  await sleep(600);
  const num = await page.evaluate(() => document.querySelector('.bh-credit-num').textContent.trim());
  assert(num === '120', '签到后应为 120，实得 ' + num);
  return '签到 +20 → ' + num;
});

// T7 计费模式提示条：未登录显示本地演示
await check('T7', '计费模式提示条', async () => {
  const txt = await page.evaluate(() => document.querySelector('.billing-mode')?.textContent.replace(/\s+/g, ' ').trim() || '');
  assert(/未登录/.test(txt) && /本地演示/.test(txt), '提示条异常：' + txt);
  return txt.slice(0, 40);
});

await page.screenshot({ path: SHOTS + '/27-plans-pay.png' });
console.log('\n===== 页面错误 =====');
console.log(errors.length ? errors.join('\n') : '无');
console.log('\n===== 结果 =====');
const pass = results.filter(r => r.ok).length;
console.log(`${pass}/${results.length} 通过`);
await browser.close();
process.exit(pass === results.length ? 0 : 1);
