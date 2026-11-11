import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));

/** 项目根目录（绝对路径） */
export const BASE_DIR = path.resolve(HERE, '..');

/** 入口页的 file:// URL（跨平台正确） */
export const PAGE_URL = pathToFileURL(path.join(BASE_DIR, 'index.html')).href;

/** Chrome 可执行文件：优先 CHROME_PATH 环境变量，其次按平台默认 */
export const CHROME = process.env.CHROME_PATH || (
  process.platform === 'win32'
    ? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
    : process.platform === 'darwin'
      ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      : '/usr/bin/google-chrome'
);
