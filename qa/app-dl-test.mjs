import puppeteer from 'puppeteer-core';
import { PAGE_URL as BASE, CHROME } from './env.mjs';

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const results = [];
async function check(name, fn) {
  try { const r = await fn(); results.push({ name, ok: true, note: r }); console.log(`  PASS  ${name}${r ? ' — ' + r : ''}`); }
  catch (e) { results.push({ name, ok: false, note: e.message }); console.log(`  FAIL  ${name} — ${e.message}`); }
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME, headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files', '--disable-web-security']
  });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error' && !/favicon|Failed to load resource/i.test(m.text())) errors.push('console: ' + m.text()); });

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE, { waitUntil: 'networkidle0' });
  await sleep(2500);

  console.log('\n=== 移动端 APP 下载按钮验证 ===\n');

  await check('B1 设置按钮已替换为 APP 下载按钮', async () => {
    const old = await page.evaluate(() => !!document.querySelector('.sidebar-footer [data-route="settings"]'));
    if (old) throw new Error('设置按钮仍存在，未替换');
    const btn = await page.$('#app-download-btn');
    if (!btn) throw new Error('APP 下载按钮不存在');
    const title = await page.$eval('#app-download-btn', e => e.title);
    if (!/下载|APP/i.test(title)) throw new Error('按钮 title 错误: ' + title);
    return title;
  });

  await check('B2 点击按钮打开下载弹窗', async () => {
    await page.click('#app-download-btn');
    await sleep(400);
    const title = await page.$eval('#modal h3', e => e.textContent.trim());
    if (!/下载|APP|移动端/i.test(title)) throw new Error('弹窗标题错误: ' + title);
    return title;
  });

  await check('B3 弹窗含二维码与三平台按钮', async () => {
    const qr = await page.$eval('#modal .app-dl-qr svg', e => !!e);
    const ios = await page.$eval('#modal [data-id="ios"]', e => e.textContent.trim());
    const android = await page.$eval('#modal [data-id="android"]', e => e.textContent.trim());
    const harmony = await page.$eval('#modal [data-id="harmony"]', e => e.textContent.trim());
    if (!qr) throw new Error('二维码未渲染');
    if (!/App Store/.test(ios)) throw new Error('iOS 按钮缺失: ' + ios);
    if (!/Android/.test(android)) throw new Error('Android 按钮缺失: ' + android);
    if (!/鸿蒙/.test(harmony)) throw new Error('鸿蒙按钮缺失: ' + harmony);
    return ios + ' + ' + android + ' + ' + harmony;
  });

  await check('B4 点击下载按钮有反馈', async () => {
    await page.click('#modal [data-id="ios"]');
    await sleep(300);
    const toast = await page.$eval('#toasts', e => e.textContent);
    if (!/iOS|下载/.test(toast)) throw new Error('无下载反馈: ' + toast);
    return toast.trim();
  });

  await check('B5 关闭弹窗无报错', async () => {
    await page.click('#modal [data-act="close-modal"]');
    await sleep(300);
    return '弹窗已关闭';
  });

  const hardErrors = errors.filter(e => !/favicon|Failed to load resource|cloud/i.test(e));
  await check('B6 控制台无报错', async () => {
    if (hardErrors.length > 0) throw new Error(hardErrors.slice(0, 3).join(' | '));
    return '0 错误';
  });

  const pass = results.filter(r => r.ok).length;
  const fail = results.length - pass;
  console.log(`\n=== 结果：${pass} 通过 / ${fail} 失败 ===\n`);
  if (fail > 0) results.filter(r => !r.ok).forEach(r => console.log('  - ' + r.name + ': ' + r.note));

  await browser.close();
  process.exit(fail > 0 ? 1 : 0);
})();
