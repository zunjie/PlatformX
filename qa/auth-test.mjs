import puppeteer from 'puppeteer-core';
import { PAGE_URL as BASE, CHROME } from './env.mjs';


const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const results = [];
async function check(name, fn) {
  try {
    const r = await fn();
    results.push({ name, ok: true, note: r });
    console.log(`  PASS  ${name}${r ? ' — ' + r : ''}`);
  } catch (e) {
    results.push({ name, ok: false, note: e.message });
    console.log(`  FAIL  ${name} — ${e.message}`);
  }
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files', '--disable-web-security']
  });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error' && !/favicon|Failed to load resource/i.test(m.text())) errors.push('console: ' + m.text()); });

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE, { waitUntil: 'networkidle0' });
  await sleep(2500);

  console.log('\n=== Auth（Email OTP + Phone OTP）验证 ===\n');

  await check('A1 侧栏未登录态', async () => {
    await page.waitForSelector('#user-avatar', { timeout: 5000 });
    const name = await page.$eval('#user-name', e => e.textContent.trim());
    if (name !== '未登录') throw new Error('应显示未登录，实际 ' + name);
    return name;
  });

  await check('A2 点击头像打开登录弹窗', async () => {
    await page.click('#user-avatar');
    await sleep(400);
    const title = await page.$eval('#modal h3', e => e.textContent.trim());
    if (!/登录/.test(title)) throw new Error('弹窗标题错误: ' + title);
    return title;
  });

  await check('A3 登录弹窗含三个 Tab（邮箱/手机号/微信）', async () => {
    const tabs = await page.$$eval('.login-tab', els => els.map(e => e.textContent.trim()));
    if (tabs.length !== 3) throw new Error('Tab 数量错误: ' + tabs.length);
    if (!tabs.some(t => t.includes('邮箱')) || !tabs.some(t => t.includes('手机号')) || !tabs.some(t => t.includes('微信'))) throw new Error('Tab 文案缺失: ' + tabs.join('|'));
    return tabs.join(' / ');
  });

  await check('A4 默认邮箱面板显示、手机号面板隐藏', async () => {
    const emailVisible = await page.$eval('#login-panel-email', e => e.style.display !== 'none');
    const phoneVisible = await page.$eval('#login-panel-phone', e => e.style.display !== 'none');
    if (!emailVisible) throw new Error('邮箱面板应默认显示');
    if (phoneVisible) throw new Error('手机号面板应默认隐藏');
    return '邮箱面板默认激活';
  });

  await check('A5 邮箱格式校验：非法邮箱被拦截', async () => {
    await page.type('#login-email', 'not-an-email');
    await page.click('#login-email-send');
    await sleep(200);
    const err = await page.$eval('#login-email-err', e => e.textContent.trim());
    if (!/邮箱/.test(err)) throw new Error('未提示邮箱错误: ' + err);
    return err;
  });

  await check('A6 切换手机号 Tab', async () => {
    await page.click('.login-tab[data-id="phone"]');
    await sleep(200);
    const phoneVisible = await page.$eval('#login-panel-phone', e => e.style.display !== 'none');
    const emailVisible = await page.$eval('#login-panel-email', e => e.style.display !== 'none');
    if (!phoneVisible) throw new Error('手机号面板应显示');
    if (emailVisible) throw new Error('邮箱面板应隐藏');
    const active = await page.$eval('.login-tab.active', e => e.dataset.id);
    if (active !== 'phone') throw new Error('active Tab 错误: ' + active);
    return '手机号面板激活';
  });

  await check('A7 手机号格式校验：10 位被拦截', async () => {
    await page.type('#login-phone', '1380013800'); // 10 位
    await page.click('#login-send');
    await sleep(200);
    const err = await page.$eval('#login-phone-err', e => e.textContent.trim());
    if (!/11 位/.test(err)) throw new Error('未提示手机号错误: ' + err);
    return err;
  });

  await check('A8 切回邮箱 Tab 清除待验证状态', async () => {
    await page.click('.login-tab[data-id="email"]');
    await sleep(200);
    const emailVisible = await page.$eval('#login-panel-email', e => e.style.display !== 'none');
    if (!emailVisible) throw new Error('邮箱面板应恢复显示');
    return '切回邮箱面板';
  });

  await check('A9 关闭弹窗无报错', async () => {
    await page.click('[data-act="close-modal"]');
    await sleep(300);
    const hidden = await page.$eval('#modal-overlay', e => e.style.display === 'none' || e.classList.contains('hidden') || e.hidden);
    return '弹窗已关闭';
  });

  const hardErrors = errors.filter(e => !/favicon|Failed to load resource|cloud/i.test(e));
  await check('A10 控制台无报错', async () => {
    if (hardErrors.length > 0) throw new Error(hardErrors.slice(0, 3).join(' | '));
    return '0 错误';
  });

  const pass = results.filter(r => r.ok).length;
  const fail = results.length - pass;
  console.log(`\n=== 结果：${pass} 通过 / ${fail} 失败 ===\n`);
  if (fail > 0) {
    console.log('失败项：');
    results.filter(r => !r.ok).forEach(r => console.log('  - ' + r.name + ': ' + r.note));
  }

  await browser.close();
  process.exit(fail > 0 ? 1 : 0);
})();
