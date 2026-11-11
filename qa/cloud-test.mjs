import puppeteer from 'puppeteer-core';

const BASE = 'C:/Users/lujie/WorkBuddy/2026-11-02-14-19-44/platformx';
const URL = 'file:///' + BASE + '/index.html';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
const errors = [];
page.on('pageerror', e => errors.push(e.message));
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });

await page.goto(URL, { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 3000));

// 1. SDK 是否加载
const sdkLoaded = await page.evaluate(() => typeof WorkBuddyCloud !== 'undefined');
console.log('SDK 加载:', sdkLoaded);

// 2. cloud 实例是否初始化
const cloudInit = await page.evaluate(() => !!window.cloud && !!window.cloudReady);
console.log('cloud 实例:', cloudInit);

// 3. cloud 模块是否存在
const modules = await page.evaluate(() => {
  if (!window.cloud) return null;
  return {
    auth: !!window.cloud.auth,
    database: !!window.cloud.database,
    llm: !!window.cloud.llm,
    storage: !!window.cloud.storage
  };
});
console.log('模块:', JSON.stringify(modules));

// 4. 登录 UI 渲染（侧栏用户区域）
const userState = await page.evaluate(() => {
  const avatar = document.querySelector('#user-avatar');
  const name = document.querySelector('#user-name');
  const plan = document.querySelector('#user-plan');
  return {
    avatar: avatar ? avatar.textContent : null,
    name: name ? name.textContent : null,
    plan: plan ? plan.textContent : null
  };
});
console.log('侧栏用户:', JSON.stringify(userState));

// 5. 点击头像打开登录弹窗
await page.evaluate(() => { document.querySelector('#user-avatar').click(); });
await new Promise(r => setTimeout(r, 800));
const modal = await page.evaluate(() => {
  const overlay = document.querySelector('#modal-overlay');
  const m = document.querySelector('#modal');
  return {
    overlayHidden: overlay ? overlay.hidden : null,
    text: m ? m.textContent.replace(/\s+/g, ' ').trim().slice(0, 200) : null,
    hasWorkBuddyBtn: !!document.querySelector('[data-act="login-workbuddy"]'),
    hasSendOtp: !!document.querySelector('[data-act="send-otp"]'),
    hasLoginOtp: !!document.querySelector('[data-act="login-otp"]')
  };
});
console.log('登录弹窗:', JSON.stringify(modal));

await page.screenshot({ path: BASE + '/qa/shots/28-login-modal.png' });

console.log('\n页面错误:', errors.length ? errors.join('\n') : '无');
await browser.close();
