import puppeteer from 'puppeteer-core';
import { PAGE_URL as BASE, CHROME } from './env.mjs';

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

  // 点击头像打开登录弹窗
  await p.click('#user-avatar');
  await sleep(400);

  // 三个 Tab：邮箱 / 手机号 / 微信
  const tabs = await p.evaluate(() =>
    Array.from(document.querySelectorAll('.login-tab')).map(t => t.textContent.trim())
  );
  assert(tabs.length === 3, '登录弹窗含 3 个 Tab：' + JSON.stringify(tabs));
  assert(tabs.includes('微信登录'), '含「微信登录」Tab');

  // 点击微信 Tab
  await p.evaluate(() => {
    const t = Array.from(document.querySelectorAll('.login-tab')).find(x => x.textContent.trim() === '微信登录');
    t.click();
  });
  await sleep(300);

  // 微信面板显示 + 微信登录按钮存在
  const wechatVisible = await p.evaluate(() =>
    document.querySelector('#login-panel-wechat').style.display !== 'none'
  );
  assert(wechatVisible, '微信面板显示');

  const wechatBtn = await p.$eval('#login-wechat', el => el.textContent.trim());
  assert(/微信登录/.test(wechatBtn), '微信登录按钮存在: ' + wechatBtn);

  // 底部「登录/注册」按钮应隐藏
  const submitHidden = await p.evaluate(() =>
    document.querySelector('#login-submit').style.display === 'none'
  );
  assert(submitHidden, '微信 Tab 下底部「登录/注册」按钮隐藏');

  // 切回邮箱 Tab，底部按钮恢复
  await p.evaluate(() => {
    const t = Array.from(document.querySelectorAll('.login-tab')).find(x => x.textContent.trim() === '邮箱账号登录');
    t.click();
  });
  await sleep(300);
  const submitShown = await p.evaluate(() =>
    document.querySelector('#login-submit').style.display !== 'none'
  );
  assert(submitShown, '邮箱 Tab 下底部「登录/注册」按钮恢复显示');

  assert(errors.length === 0, '无页面错误' + (errors.length ? ': ' + errors[0] : ''));

  console.log(`\n结果：${passed} 通过，${failed} 失败`);
  await b.close();
  process.exit(failed ? 1 : 0);
})();
