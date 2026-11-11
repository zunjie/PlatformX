/* =====================================================================
   PlatformX — 交互逻辑
   ===================================================================== */

/* ------------------------------ 工具函数 ------------------------------ */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const esc = (s = '') => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const sleep = ms => new Promise(r => setTimeout(r, ms));
const uid = p => p + '-' + Math.random().toString(36).slice(2, 9);
const clamp = (s, n) => (s.length > n ? s.slice(0, n) + '…' : s);

const ICONS = {
  plus: '<path d="M12 5v14M5 12h14"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 1.8"/>',
  folder: '<path d="M3 7.6A1.6 1.6 0 0 1 4.6 6h4.1l1.9 2.4h7.8A1.6 1.6 0 0 1 20 10v7.4A1.6 1.6 0 0 1 18.4 19H4.6A1.6 1.6 0 0 1 3 17.4Z"/>',
  database: '<ellipse cx="12" cy="6" rx="7.5" ry="3"/><path d="M4.5 6v12c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V6"/><path d="M4.5 12c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3"/>',
  users: '<circle cx="9" cy="8" r="3.4"/><path d="M2.8 19.4a6.4 6.4 0 0 1 12.4 0"/><path d="M16 5.2a3.4 3.4 0 0 1 0 6.6"/><path d="M17.6 13.6a6.4 6.4 0 0 1 3.6 5.8"/>',
  bolt: '<path d="M13.2 2.5 5 14h5.6L9.8 21.5 18.6 10h-5.9Z"/>',
  plug: '<path d="M9 3v5M15 3v5"/><path d="M6.5 8h11v3.2a5.5 5.5 0 0 1-11 0Z"/><path d="M12 16.7V21"/>',
  repeat: '<path d="m17 2.5 3.5 3.5L17 9.5"/><path d="M20.5 6H8.5A4.5 4.5 0 0 0 4 10.5v.5"/><path d="m7 21.5-3.5-3.5L7 14.5"/><path d="M3.5 18h12a4.5 4.5 0 0 0 4.5-4.5V13"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.2 14.4a1.5 1.5 0 0 0 .3 1.7l.1.1a1.9 1.9 0 1 1-2.7 2.7l-.1-.1a1.5 1.5 0 0 0-1.7-.3 1.5 1.5 0 0 0-.9 1.4v.3a1.9 1.9 0 1 1-3.8 0v-.2a1.5 1.5 0 0 0-1-1.4 1.5 1.5 0 0 0-1.6.3l-.2.1a1.9 1.9 0 1 1-2.7-2.7l.1-.1a1.5 1.5 0 0 0 .3-1.7 1.5 1.5 0 0 0-1.4-.9H3a1.9 1.9 0 1 1 0-3.8h.2a1.5 1.5 0 0 0 1.4-1 1.5 1.5 0 0 0-.3-1.6l-.1-.2a1.9 1.9 0 1 1 2.7-2.7l.1.1a1.5 1.5 0 0 0 1.7.3h.1a1.5 1.5 0 0 0 .9-1.4V3a1.9 1.9 0 1 1 3.8 0v.2a1.5 1.5 0 0 0 .9 1.4 1.5 1.5 0 0 0 1.7-.3l.1-.1a1.9 1.9 0 1 1 2.7 2.7l-.1.1a1.5 1.5 0 0 0-.3 1.7v.1a1.5 1.5 0 0 0 1.4.9h.3a1.9 1.9 0 1 1 0 3.8h-.2a1.5 1.5 0 0 0-1.4.9Z"/>',
  arrowUp: '<path d="M12 19V5"/><path d="m5.5 11.5 6.5-6.5 6.5 6.5"/>',
  arrowLeft: '<path d="M19 12H5"/><path d="m11 18-6-6 6-6"/>',
  arrowRight: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  chevronRight: '<path d="m9 5 7 7-7 7"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  check: '<path d="M4.5 12.5 9.5 17.5 19.5 6.5"/>',
  star: '<path d="m12 3.6 2.6 5.3 5.9.9-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.8l5.9-.9Z"/>',
  panel: '<rect x="3" y="4.5" width="18" height="15" rx="2.2"/><path d="M14.5 4.5v15"/>',
  hamburger: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  cpu: '<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M10 3v3M14 3v3M10 18v3M14 18v3M3 10h3M3 14h3M18 10h3M18 14h3"/>',
  doc: '<path d="M6 3.5h7l5 5V20a.5.5 0 0 1-.5.5h-11A.5.5 0 0 1 6 20Z"/><path d="M13 3.5v5h5"/>',
  code: '<path d="m9 8-4 4 4 4M15 8l4 4-4 4"/>',
  pen: '<path d="M4 20l4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10Z"/><path d="m14.5 6.5 3 3"/>',
  sparkle: '<path d="m12 3 1.9 5.6L19.5 10.5l-5.6 1.9L12 18l-1.9-5.6L4.5 10.5l5.6-1.9Z"/>',
  gem: '<path d="M7 4h10l4 5-9 11L3 9Z"/><path d="M3 9h18M9 4l3 5 3-5M12 9v11"/>',
  coin: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v10M9.5 9.5c0-1 .8-1.6 2.5-1.6s2.5.6 2.5 1.6-.8 1.4-2.5 1.4-2.5.6-2.5 1.6.8 1.6 2.5 1.6 2.5-.6 2.5-1.6"/>',
  crown: '<path d="m4 8 4 4 4-6 4 6 4-4-2 9H6Z"/><path d="M6 19h12"/>',
  qrcode: '<rect x="4" y="4" width="5" height="5" rx="1"/><rect x="15" y="4" width="5" height="5" rx="1"/><rect x="4" y="15" width="5" height="5" rx="1"/><path d="M9 4h6v5H9zM9 15h2v2H9zM13 15h2v5h-2zM15 19h5v-2M17 15h2"/><path d="M15 4h5v2"/>',
  trash: '<path d="M4 7h16M9.5 7V4.5h5V7M6.5 7l.8 13h9.4l.8-13"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M15 6.5A2.5 2.5 0 0 0 12.5 4H6a2 2 0 0 0-2 2v6.5A2.5 2.5 0 0 0 6.5 15"/>',
  external: '<path d="M14 4h6v6"/><path d="M20 4 11 13"/><path d="M18 14v4.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10"/>',
  download: '<path d="M12 4v11"/><path d="m7.5 11 4.5 4.5 4.5-4.5"/><path d="M4.5 19.5h15"/>',
  stop: '<rect x="7" y="7" width="10" height="10" rx="1.6"/>',
  eye: '<path d="M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12 18 17.5 12 17.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.8"/>',
  eyeOff: '<path d="M4 4l16 16"/><path d="M9.6 5.2A9.9 9.9 0 0 1 12 5c6 0 9.5 7 9.5 7a17 17 0 0 1-3.3 4.2"/><path d="M6.4 7.4A16.4 16.4 0 0 0 2.5 12S6 19 12 19a9.6 9.6 0 0 0 4-.9"/><path d="M9.9 10a2.9 2.9 0 0 0 4.1 4.1"/>',
  mic: '<rect x="9" y="3" width="6" height="10.5" rx="3"/><path d="M6.4 11.4a5.6 5.6 0 0 0 11.2 0"/><path d="M12 17v3.6M9 20.6h6"/>',
  wand: '<path d="m8.4 3.2 1.7 4.3 4.3 1.7-4.3 1.7-1.7 4.3-1.7-4.3L2.3 9.2l4.4-1.7Z"/><path d="m16.6 13.4 1.1 2.8 2.8 1.1-2.8 1.1-1.1 2.8-1.1-2.8-2.8-1.1 2.8-1.1Z"/><path d="M18.4 3.4v2.5M19.7 4.6h-2.5"/>',
  palette: '<path d="M12 3a9 9 0 1 0 0 18h1.5a1.8 1.8 0 0 0 0-3.6h-1.2a1.4 1.4 0 0 1-1-2.4 1.4 1.4 0 0 1 1-2.6H17A5 5 0 0 0 12 3Z"/><circle cx="7.8" cy="10.4" r="1"/><circle cx="10.8" cy="7.4" r="1"/><circle cx="15" cy="7.6" r="1"/>',
  server: '<rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/>',
  megaphone: '<path d="M3 11v2a1 1 0 0 0 1 1h2l3.5 4V6L6 10H4a1 1 0 0 0-1 1Z"/><path d="M20 6a7 7 0 0 1 0 12"/><path d="M17 9a3 3 0 0 1 0 6"/>',
  scale: '<path d="M12 3v18M8 21h8M6 7l-3 6a3 3 0 0 0 6 0Z"/><path d="M18 7l-3 6a3 3 0 0 0 6 0Z"/><path d="M3 7h18"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2Z"/><path d="M4 19a2 2 0 0 1 2-2h13"/>',
  cloud: '<path d="M7 18a4.5 4.5 0 0 1-.4-9A6 6 0 0 1 18 8.5 4 4 0 0 1 17.5 18Z"/>',
  briefcase: '<rect x="3" y="7.5" width="18" height="12" rx="2"/><path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3 13h18"/>',
  chart: '<path d="M4 4v16h16"/><path d="m7 15 3-4 3 2 4-6"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.2 14.4a1.5 1.5 0 0 0 .3 1.7l.1.1a1.9 1.9 0 1 1-2.7 2.7l-.1-.1a1.5 1.5 0 0 0-1.7-.3 1.5 1.5 0 0 0-.9 1.4v.3a1.9 1.9 0 1 1-3.8 0v-.2a1.5 1.5 0 0 0-1-1.4 1.5 1.5 0 0 0-1.6.3l-.2.1a1.9 1.9 0 1 1-2.7-2.7l.1-.1a1.5 1.5 0 0 0 .3-1.7 1.5 1.5 0 0 0-1.4-.9H3a1.9 1.9 0 1 1 0-3.8h.2a1.5 1.5 0 0 0 1.4-1 1.5 1.5 0 0 0-.3-1.6l-.1-.2a1.9 1.9 0 1 1 2.7-2.7l.1.1a1.5 1.5 0 0 0 1.7.3h.1a1.5 1.5 0 0 0 .9-1.4V3a1.9 1.9 0 1 1 3.8 0v.2a1.5 1.5 0 0 0 .9 1.4 1.5 1.5 0 0 0 1.7-.3l.1-.1a1.9 1.9 0 1 1 2.7 2.7l-.1.1a1.5 1.5 0 0 0-.3 1.7v.1a1.5 1.5 0 0 0 1.4.9h.3a1.9 1.9 0 1 1 0 3.8h-.2a1.5 1.5 0 0 0-1.4.9Z"/>',
  chartline: '<path d="M4 4v16h16"/><path d="m7 15 3-4 3 2 4-6"/><path d="M4 4v16h16"/>',
  table: '<rect x="3" y="4.5" width="18" height="15" rx="2"/><path d="M3 9.5h18M3 14.5h18M9 4.5v15M15 4.5v15"/>',
  file: '<path d="M6 3.5h8l4 4V20a.5.5 0 0 1-.5.5h-11A.5.5 0 0 1 6 20Z"/><path d="M14 3.5v4h4"/>',
  image: '<rect x="3" y="4.5" width="18" height="15" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="m4 17 4.5-4 3.5 3 3-2.5L20 18"/>',
  video: '<rect x="3" y="5.5" width="13" height="13" rx="2.5"/><path d="m16 10.5 5-3v9l-5-3"/>',
  translate: '<path d="M4 5h8M8 3v2"/><path d="M6 5c0 4 2.5 6.5 6 8"/><path d="M9.5 9.5c-1 1.5-2 3-2.5 4.5"/><path d="M13 20l4-9 4 9M14.5 17h5"/>',
  terminal: '<rect x="3" y="4" width="18" height="16" rx="2.2"/><path d="m6.5 9 3 3-3 3M12.5 15H17"/>',
  gitbranch: '<circle cx="6" cy="6" r="2.4"/><circle cx="6" cy="18" r="2.4"/><circle cx="18" cy="7" r="2.4"/><path d="M6 8.4v7.2M18 9.4c0 3-2.5 4-5.5 4"/>',
  shield: '<path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6Z"/><path d="m9.5 12 2 2 3.5-3.5"/>',
  rocket: '<path d="M14.5 4.5c3 .2 5 2.2 5.2 5.2"/><path d="M6.5 14.5c-1 1.5-1.5 4-2 6 2-.5 4.5-1 6-2"/><path d="M9.5 6.5C11 4 14 3.5 17 4c.5 3 0 6-2.5 7.5L9.5 6.5Z"/><circle cx="14" cy="10" r="1.3"/>',
  flask: '<path d="M9 3h6M10 3v6l-4.5 8A1.8 1.8 0 0 0 7 20h10a1.8 1.8 0 0 0 1.5-3l-4.5-8V3"/><path d="M7.5 14h9"/>',
  filter: '<path d="M4 5h16l-6.5 7.5V19l-3 1.5v-8Z"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/>',
  bell: '<path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2.5h-15Z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
  message: '<path d="M4 5.5h16v11H8l-4 3.5Z"/>',
  phone: '<path d="M6 3h3l1.5 4-2 1.5a12 12 0 0 0 6 6L16 13l4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 4 5a2 2 0 0 1 2-2Z"/>',
  globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.5 2.5 14.5 0 17M12 3.5c-2.5 2.5-2.5 14.5 0 17"/>',
  map: '<path d="m9 4-6 2v14l6-2 6 2 6-2V4l-6 2Z"/><path d="M9 4v14M15 6v14"/>',
  lock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>',
  key: '<circle cx="8" cy="15.5" r="4"/><path d="m11 12.5 8.5-8.5M16.5 7.5l3 3M14.5 9.5l2 2"/>',
  trending: '<path d="m3 17 6-6 4 4 7-8"/><path d="M14 7h6v6"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5Z"/><path d="m3 12.5 9 5 9-5"/><path d="m3 16.5 9 5 9-5"/>',
  package: '<path d="m12 3 9 5-9 5-9-5Z"/><path d="M3 8v8l9 5 9-5V8M12 13v8"/>',
  wrench: '<path d="M14.5 6a4.5 4.5 0 0 1 5.5-4.4l-2.5 2.5.4 2.4 2.4.4L22.8 5A4.5 4.5 0 0 1 18.4 10L9 19.5A2.4 2.4 0 0 1 5.6 16Z"/>',
  bug: '<circle cx="12" cy="13" r="5.5"/><path d="M12 7.5V5M9 5h6M9 13H4M20 13h-5M9.5 10 7 8M14.5 10 17 8M9.5 16 7 18M14.5 16l2.5 2"/>',
  brain: '<path d="M9 3a3 3 0 0 0-3 3 3 3 0 0 0-2 4 3 3 0 0 0 1 5 3 3 0 0 0 4 2.5V21M15 3a3 3 0 0 1 3 3 3 3 0 0 1 2 4 3 3 0 0 1-1 5 3 3 0 0 1-4 2.5V21M12 8v8M12 6.5v3"/>',
  robot: '<rect x="5" y="8" width="14" height="11" rx="2.5"/><path d="M12 4v4M12 15v2M8.5 13h.01M15.5 13h.01M9 8v1.5M15 8v1.5"/>',
  network: '<circle cx="12" cy="5" r="2.2"/><circle cx="5" cy="17" r="2.2"/><circle cx="19" cy="17" r="2.2"/><path d="M12 7.2V12M12 12l-5.2 3M12 12l5.2 3M5 14.8V13M19 14.8V13"/>',
  link: '<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1.5 1.5"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1.5-1.5"/>',
  rss: '<path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16"/><circle cx="5.5" cy="18.5" r="1.5"/>',
  currency: '<circle cx="12" cy="12" r="8.5"/><path d="M9 8.5h6M10.5 15.5H15M12 7v1.5M12 15.5V17"/>',
  heart: '<path d="M12 20.5S4 15 4 9.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8 3.5c0 5.5-8 11-8 11Z"/>',
  gift: '<rect x="3" y="8" width="18" height="4"/><path d="M5 12v8h14v-8M12 8v12M12 8c-2.5 0-4-1.5-4-3s1.5-2.5 2-2.5M12 8c2.5 0 4-1.5 4-3s-1.5-2.5-2-2.5"/>',
  building: '<rect x="4" y="3.5" width="16" height="17" rx="1.5"/><path d="M9 7.5h.01M15 7.5h.01M9 11.5h.01M15 11.5h.01M9 15.5h.01M15 15.5h.01M10 20.5v-3h4v3"/>',
  graduation: '<path d="m12 3.5 10 4.5-10 4.5L2 8Z"/><path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5M22 8v6"/>',
  lightbulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6.5 6.5 0 0 0-3.5 12c.5.4.8 1 .8 1.5h5.4c0-.6.3-1.1.8-1.5A6.5 6.5 0 0 0 12 3Z"/>',
  flag: '<path d="M5 21V4"/><path d="M5 4c3-2 6-2 9 0s6 2 7 0v8c-1 2-4 2-7 0s-6-2-9 0"/>',
  tag: '<path d="M3.5 12.5V5a1.5 1.5 0 0 1 1.5-1.5h7.5L20 11l-8 8Z"/><circle cx="8" cy="8" r="1.3"/>',
  printer: '<path d="M7 8V4h10v4"/><rect x="3.5" y="8" width="17" height="8" rx="1.5"/><path d="M7 13h10v7H7Z"/>',
  scan: '<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M7 12h10"/>',
  refresh: '<path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20 3.5V8h-4.5"/>',
  upload: '<path d="M12 16V5"/><path d="m7 10 5-5 5 5"/><path d="M4 20h16"/>',
  share: '<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="m8.3 10.8 7.4-3.6M8.3 13.2l7.4 3.6"/>',
  thumbup: '<path d="M7 11v9H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z"/><path d="M7 11l4-7a2 2 0 0 1 2 2v3h5a2 2 0 0 1 2 2.3l-1.2 6A2 2 0 0 1 17 19H7"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13"/><path d="M4 6h.01M4 12h.01M4 18h.01"/>',
  notebook: '<path d="M6 3.5h11A1.5 1.5 0 0 1 18.5 5v14a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 19V5A1.5 1.5 0 0 1 6 3.5Z"/><path d="M8 8h6M8 12h6M8 16h3"/>',
  mic2: '<path d="M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3M8.5 21h7"/>',
  wave: '<path d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4"/>',
  play: '<path d="M8 5.5v13l10-6.5Z"/>',
  pause: '<path d="M8 5v14M16 5v14"/>',
  home: '<path d="m4 11 8-7 8 7v8a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19Z"/><path d="M9 20.5v-6h6v6"/>',
  compass: '<circle cx="12" cy="12" r="8.5"/><path d="m15.5 8.5-2 5-5 2 2-5Z"/>',
  bookOpen: '<path d="M12 6c-2-1.5-5-2-8-1.5V19c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V4.5C17 4 14 4.5 12 6Z"/><path d="M12 6v14.5"/>',
  bulb2: '<path d="M12 3a6.5 6.5 0 0 0-3.5 12c.5.4.8 1 .8 1.5h5.4c0-.6.3-1.1.8-1.5A6.5 6.5 0 0 0 12 3Z"/><path d="M9 18h6M10 21h4"/>',
  cursor: '<path d="m5 3 14 8-6.5 1.5L10 19Z"/>'
};

function icon(name, size = 16, cls = '') {
  return `<svg class="${cls}" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ''}</svg>`;
}

/* 品牌徽标：Simple Icons 官方 logo（实心 + 品牌色）或 品牌色缩写徽标 */
function brandBadge(name, size = 16) {
  const b = (typeof BRAND_ICONS !== 'undefined' && BRAND_ICONS) ? BRAND_ICONS[name] : null;
  if (!b) return icon('plug', size);
  if (b.paths) {
    const p = b.paths.map(d => `<path d="${d}"/>`).join('');
    return `<svg class="brand-svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="#${b.hex}">${p}</svg>`;
  }
  // 文字徽标：品牌色底 + 白色缩写（按字数自适应字号）
  const t = b.text || name.slice(0, 2);
  const fs = t.length <= 2 ? '11px' : (t.length <= 3 ? '9px' : '8px');
  return `<span class="brand-badge" style="background:#${b.hex};font-size:${fs}">${esc(t)}</span>`;
}

/* 分类 → 图标映射：专家 / 技能 / 连接器卡片按分类显示对应图标 */
const CAT_ICON = {
  '办公': 'doc', '文档': 'doc',
  '开发': 'code',
  '设计': 'palette',
  '数据': 'database',
  'AI 与模型': 'cpu',
  '自动化': 'repeat',
  '通信与协作': 'users', '协作': 'users',
  '系统与运维': 'server',
  '营销': 'megaphone',
  '运营': 'chartline',
  '金融与法务': 'scale',
  '教育与研究': 'book',
  '部署与云': 'cloud',
  '业务': 'briefcase'
};
const catIcon = cat => CAT_ICON[cat] || 'bolt';

/* 关键词 → 图标映射：按优先级顺序匹配，返回最贴切的语义图标 */
const KW_ICON = [
  // 文档/办公
  ['word', 'doc'], ['文档', 'doc'], ['公文', 'doc'], ['报告', 'file'], ['汇报', 'file'], ['述职', 'file'], ['总结', 'file'],
  ['ppt', 'file'], ['演示', 'file'], ['幻灯片', 'file'], ['讲稿', 'file'], ['致辞', 'file'], ['课件', 'file'],
  ['excel', 'table'], ['表格', 'table'], ['xlsx', 'table'], ['表单', 'table'], ['数据表', 'table'],
  ['pdf', 'file'], ['签署', 'pen'], ['打印', 'printer'], ['排版', 'doc'], ['格式', 'doc'], ['水印', 'doc'], ['目录', 'doc'], ['样式', 'doc'],
  ['会议纪要', 'notebook'], ['会议记录', 'notebook'], ['会议', 'notebook'], ['速记', 'notebook'], ['纪', 'notebook'],
  ['语音', 'mic2'], ['转写', 'mic2'], ['识别', 'mic2'], ['字幕', 'mic2'], ['音频', 'mic2'],
  ['翻译', 'translate'], ['译', 'translate'],
  ['摘要', 'file'], ['提炼', 'file'], ['大纲', 'list'], ['目录', 'list'],
  ['邮件', 'mail'], ['邮箱', 'mail'],
  ['OCR', 'scan'], ['扫描', 'scan'], ['识别文本', 'scan'], ['提取', 'scan'],
  ['通讯录', 'users'], ['日程', 'calendar'], ['日历', 'calendar'], ['待办', 'list'], ['提醒', 'bell'],
  ['水印', 'doc'], ['修订', 'doc'], ['合并', 'doc'], ['比对', 'doc'],
  // 开发
  ['代码智能', 'code'], ['代码审查', 'code'], ['代码规范', 'code'], ['代码重构', 'code'], ['代码格式化', 'code'], ['代码', 'code'],
  ['终端', 'terminal'], ['命令', 'terminal'], ['Shell', 'terminal'],
  ['Git', 'gitbranch'], ['版本', 'gitbranch'], ['提交', 'gitbranch'], ['分支', 'gitbranch'],
  ['审查', 'code'], ['Review', 'code'],
  ['浏览器', 'globe'], ['网页', 'globe'],
  ['桌面操作', 'monitor'], ['桌面', 'monitor'],
  ['界面快照', 'image'], ['截图', 'image'], ['快照', 'image'],
  ['发布', 'rocket'], ['部署', 'rocket'], ['上线', 'rocket'],
  ['SSH', 'terminal'], ['远程', 'terminal'],
  ['构建', 'package'], ['测试', 'flask'], ['CI', 'repeat'], ['流水线', 'repeat'],
  ['文件搜索', 'search'], ['搜索', 'search'],
  ['接口', 'link'], ['API', 'link'], ['GraphQL', 'network'],
  ['数据库', 'database'], ['迁移', 'database'], ['SQL', 'database'],
  ['镜像', 'package'], ['Docker', 'package'], ['K8s', 'layers'], ['容器', 'layers'],
  ['调试', 'bug'], ['Debug', 'bug'], ['性能', 'trending'], ['基准', 'trending'], ['依赖', 'package'],
  ['Mock', 'wrench'], ['实时通信', 'wave'], ['微服务', 'network'], ['安全', 'shield'], ['压测', 'flask'],
  ['单元测试', 'flask'], ['端到端', 'flask'], ['快照测试', 'flask'], ['类型检查', 'check'], ['打包', 'package'],
  // 设计
  ['图像生成', 'image'], ['图片', 'image'], ['图像', 'image'],
  ['Figma', 'palette'], ['figma', 'palette'],
  ['图表', 'chart'], ['可视化', 'chart'], ['图', 'chart'],
  ['原型', 'grid'], ['线框', 'grid'], ['交互', 'cursor'],
  ['图标', 'grid'], ['icon', 'grid'], ['Logo', 'pen'], ['logo', 'pen'],
  ['配色', 'palette'], ['颜色', 'palette'], ['色彩', 'palette'],
  ['排版', 'doc'], ['字体', 'doc'], ['间距', 'layers'], ['阴影', 'layers'], ['渐变', 'palette'], ['背景', 'image'],
  ['动效', 'play'], ['动画', 'play'], ['分镜', 'video'],
  ['3D', 'package'], ['三维', 'package'], ['模型', 'package'],
  ['视频生成', 'video'], ['视频', 'video'],
  ['海报', 'image'], ['Banner', 'image'], ['卡片设计', 'grid'], ['插画', 'pen'], ['头像', 'users'],
  ['Token', 'layers'], ['风格指南', 'book'], ['情绪板', 'image'], ['走查', 'eye'], ['标注', 'pen'], ['资源导出', 'upload'],
  // 数据
  ['数据分析', 'chart'], ['数据清洗', 'database'], ['数据', 'database'],
  ['ETL', 'repeat'], ['管道', 'repeat'],
  ['特征工程', 'wrench'], ['模型训练', 'brain'], ['模型部署', 'rocket'], ['模型', 'brain'],
  ['A/B', 'flask'], ['测试', 'flask'], ['预测', 'trending'], ['异常检测', 'shield'], ['推荐', 'thumbup'],
  ['NLP', 'brain'], ['自然语言', 'brain'], ['知识图谱', 'network'],
  ['看板', 'grid'], ['报表', 'table'], ['治理', 'shield'], ['数仓', 'database'], ['实时计算', 'bolt'],
  ['质量', 'check'], ['血缘', 'link'], ['目录', 'list'], ['脱敏', 'lock'], ['备份', 'refresh'], ['迁移', 'database'],
  ['指标', 'target'], ['分群', 'users'], ['归因', 'link'], ['留存', 'trending'], ['漏斗', 'filter'], ['RFM', 'users'],
  ['回归分析', 'chart'], ['分类', 'filter'],
  // AI
  ['RAG', 'brain'], ['检索', 'search'], ['智能体', 'robot'], ['Agent', 'robot'],
  ['提示词', 'cursor'], ['Prompt', 'cursor'], ['向量', 'network'], ['嵌入', 'network'], ['微调', 'wrench'],
  ['工具调用', 'wrench'], ['多模态', 'layers'], ['语音合成', 'mic2'], ['AI 翻译', 'translate'],
  ['机器人', 'robot'], ['对话', 'message'], ['摘要', 'file'], ['文本分类', 'filter'], ['信息抽取', 'scan'],
  ['AI 编程', 'code'], ['图像理解', 'eye'], ['视频理解', 'video'], ['AI 搜索', 'search'], ['评测', 'flask'],
  ['护栏', 'shield'], ['上下文', 'layers'], ['记忆', 'brain'], ['规划', 'list'], ['反思', 'refresh'],
  ['奖励', 'star'], ['蒸馏', 'flask'], ['量化', 'target'], ['缓存', 'clock'], ['解析', 'wrench'], ['路由', 'link'],
  ['工作流', 'repeat'], ['AI 助手', 'robot'], ['导师', 'graduation'], ['写作', 'pen'], ['审稿', 'eye'],
  // 自动化
  ['自动化', 'repeat'], ['工作流', 'repeat'], ['定时', 'clock'], ['调度', 'clock'], ['Cron', 'clock'],
  ['Webhook', 'link'], ['钩子', 'link'], ['同步', 'refresh'], ['批处理', 'package'], ['通知', 'bell'], ['推送', 'bell'],
  ['审批', 'check'], ['RPA', 'robot'], ['触发', 'bolt'], ['备份', 'refresh'], ['监控', 'eye'], ['告警', 'bell'],
  ['回复', 'message'], ['队列', 'list'], ['流水线', 'repeat'], ['触发器', 'bolt'], ['执行', 'play'],
  ['导入', 'download'], ['导出', 'upload'], ['归档', 'folder'], ['打标', 'tag'], ['升级', 'arrowUp'], ['关闭', 'x'],
  ['扩缩', 'trending'], ['自愈', 'heart'], ['ChatOps', 'message'], ['GitOps', 'gitbranch'], ['事件', 'bolt'],
  ['编排', 'layers'], ['状态机', 'refresh'], ['规则', 'list'], ['BPM', 'repeat'],
  // 协作/通信
  ['即时通讯', 'message'], ['通讯', 'message'], ['聊天', 'message'], ['群聊', 'users'], ['私信', 'message'],
  ['会议管理', 'video'], ['视频会议', 'video'], ['屏幕共享', 'video'], ['白板', 'grid'],
  ['链接分享', 'link'], ['分享', 'share'], ['评论', 'message'], ['协作', 'users'],
  ['团队空间', 'users'], ['看板', 'grid'], ['甘特', 'list'], ['OKR', 'target'], ['Wiki', 'book'],
  ['信息流', 'list'], ['投票', 'thumbup'], ['@提及', 'users'], ['在线状态', 'users'], ['广播', 'megaphone'],
  ['表情', 'heart'], ['话题', 'message'], ['置顶', 'arrowUp'], ['回执', 'check'], ['字幕', 'mic2'],
  ['远程控制', 'cursor'], ['文件传输', 'upload'], ['共享日历', 'calendar'], ['任务分配', 'users'],
  ['调研', 'search'], ['头脑风暴', 'lightbulb'], ['共享笔记', 'notebook'], ['决策', 'check'], ['行动', 'list'],
  // 运维
  ['服务器监控', 'server'], ['监控', 'eye'], ['日志', 'list'], ['日志分析', 'list'], ['配置管理', 'gear'],
  ['发布回滚', 'refresh'], ['故障', 'shield'], ['应急', 'shield'], ['容量', 'trending'], ['网络', 'network'],
  ['成本', 'coin'], ['健康检查', 'heart'], ['链路追踪', 'link'], ['指标', 'target'], ['采集', 'download'],
  ['工单', 'list'], ['审计', 'shield'], ['基础设施', 'server'], ['容器', 'layers'], ['编排', 'layers'],
  ['存储', 'database'], ['容灾', 'shield'], ['补丁', 'wrench'], ['资产', 'package'], ['许可', 'key'],
  ['合规', 'shield'], ['变更', 'refresh'], ['发布管理', 'rocket'], ['环境', 'server'], ['密钥', 'key'],
  ['DNS', 'globe'], ['负载均衡', 'network'], ['CDN', 'globe'], ['WAF', 'shield'], ['VPN', 'lock'],
  ['防火墙', 'shield'], ['入侵检测', 'shield'], ['漏洞', 'bug'], ['渗透', 'shield']
];

const kwIcon = (text, fallback) => {
  if (!text) return fallback || 'bolt';
  const t = String(text).toLowerCase();
  for (const [kw, ic] of KW_ICON) {
    if (t.includes(kw.toLowerCase())) return ic;
  }
  return fallback || 'bolt';
};

/* 专家岗位 → 图标（按 name 关键词） */
const EXPERT_KW = [
  ['架构', 'layers'], ['全栈', 'code'], ['工程师', 'code'], ['开发', 'code'], ['前端', 'code'], ['后端', 'code'],
  ['算法', 'brain'], ['AI', 'brain'], ['机器学习', 'brain'], ['数据', 'chart'], ['大数据', 'database'], ['数据库', 'database'],
  ['设计', 'palette'], ['视觉', 'palette'], ['品牌', 'gem'], ['UI', 'grid'], ['UX', 'cursor'], ['交互', 'cursor'],
  ['插画', 'pen'], ['动效', 'play'], ['3D', 'package'], ['游戏', 'play'], ['原型', 'grid'],
  ['产品经理', 'target'], ['产品', 'target'], ['增长', 'trending'], ['营销', 'megaphone'], ['运营', 'chartline'],
  ['文案', 'pen'], ['内容', 'pen'], ['公关', 'megaphone'], ['SEO', 'search'], ['SEM', 'search'], ['广告', 'megaphone'],
  ['财务', 'currency'], ['会计', 'currency'], ['出纳', 'currency'], ['税务', 'currency'], ['审计', 'shield'],
  ['投资', 'trending'], ['顾问', 'briefcase'], ['基金', 'trending'], ['证券', 'trending'], ['财富', 'currency'], ['精算', 'target'],
  ['法务', 'scale'], ['律师', 'scale'], ['合同', 'scale'], ['合规', 'shield'], ['反洗钱', 'shield'], ['知识产权', 'scale'], ['隐私', 'lock'],
  ['教育', 'graduation'], ['课程', 'graduation'], ['论文', 'book'], ['科研', 'flask'], ['学术', 'book'], ['语言', 'translate'],
  ['教师', 'graduation'], ['导师', 'graduation'], ['教练', 'graduation'], ['留学', 'globe'], ['阅读', 'book'],
  ['客服', 'message'], ['供应链', 'package'], ['电商', 'gift'], ['直播', 'video'], ['社群', 'users'], ['社区', 'users'],
  ['项目', 'list'], ['会议', 'notebook'], ['行政', 'building'], ['档案', 'folder'], ['保密', 'lock'], ['采购', 'gift'],
  ['招聘', 'users'], ['面试', 'users'], ['培训', 'graduation'], ['知识管理', 'book'], ['商务', 'briefcase'], ['谈判', 'message'],
  ['公文', 'doc'], ['新闻稿', 'file'], ['制度', 'book'], ['流程', 'list'], ['标书', 'doc'], ['招标', 'doc'], ['申报', 'doc'],
  ['统计', 'chart'], ['量化', 'target'], ['风控', 'shield'], ['爬虫', 'bug'], ['挖掘', 'database'], ['标注', 'tag'],
  ['图谱', 'network'], ['画像', 'users'], ['推荐', 'thumbup'], ['搜索', 'search'], ['NLP', 'brain'], ['计算机视觉', 'eye'],
  ['语音', 'mic2'], ['运筹', 'target'], ['因果', 'link'], ['时序', 'clock'], ['主数据', 'database'], ['报表', 'table']
];
const expertIcon = name => kwIcon(name, catIcon('开发'));

/* 技能 label → 图标 */
const skillIcon = label => kwIcon(label, catIcon('办公'));


function fmtTime(ts) {
  const d = new Date(ts), now = Date.now(), diff = now - ts;
  if (diff < 60e3) return '刚刚';
  if (diff < 3600e3) return Math.floor(diff / 60e3) + ' 分钟前';
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const hm = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  if (ts >= today.getTime()) return '今天 ' + hm;
  if (ts >= today.getTime() - 864e5) return '昨天 ' + hm;
  return `${d.getMonth() + 1} 月 ${d.getDate()} 日`;
}
const fmtSize = b => !b ? '—' : b > 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB';
const extOf = name => (name.split('.').pop() || 'file').toLowerCase().slice(0, 4);

/* ------------------------------ 状态与持久化 ------------------------------ */
const KEY = 'platformx.store.v1';

const state = {
  route: 'home',
  currentTaskId: null,
  model: 'deepseek-v4-pro',
  mode: 'office',
  project: null,
  attachments: [],
  filter: '全部',
  query: '',
  docFilter: '全部',
  settingsTab: 'model',
  contextOpen: true,
  contextTab: 'ctx',
  composerDraft: '',
  voice: { active: false },
  enhance: null,
  models: MODELS,
  docs: [],
  tasks: [],
  // 云服务状态
  cloudSession: null,      // 当前登录会话（cloud.auth.getSession() 返回）
  cloudSyncing: false,     // 是否正在云端同步
  authView: null           // 登录弹窗视图状态
};

function defaultStore() {
  return {
    tasks: INITIAL_TASKS.map(t => ({ ...t, attachments: [...(t.attachments || [])], messages: JSON.parse(JSON.stringify(t.messages)) })),
    model: 'deepseek-v4-pro',
    mode: 'office',
    project: null,
    experts: EXPERTS.filter(e => e.installed).map(e => e.id),
    skills: SKILLS.filter(s => s.installed).map(s => s.id),
    connectors: CONNECTORS.filter(c => c.status === 'connected').map(c => c.id),
    extraDocs: [],
    starred: DOCS.filter(d => d.starred).map(d => d.id),
    automations: AUTOMATIONS.map(a => ({ id: a.id, on: a.on })),
    customModels: [],
    plan: 'trial',
    credits: 100,
    creditLog: [],
    settings: { baseUrl: 'https://api.platformx.local/v1', apiKey: 'px-••••••••••••••••', temperature: 0.6, maxTokens: 8192, workspace: 'C:/Users/lujie/PlatformX', theme: 'dark', telemetry: false }
  };
}

let store = defaultStore();

function loadStore() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const s = JSON.parse(raw);
      store = { ...defaultStore(), ...s };
    }
  } catch (e) { /* 忽略损坏的本地数据 */ }
  state.tasks = store.tasks;
  state.model = store.model;
  state.mode = store.mode;
  state.project = store.project;
  state.docs = [...store.extraDocs, ...DOCS.map(d => ({ ...d, starred: store.starred.includes(d.id) }))];
  syncModelList();
  normalizePlan();
}

/* 兼容旧数据：缺失套餐/积分字段时补齐 */
function normalizePlan() {
  if (!store.plan || !PLANS.some(p => p.id === store.plan)) store.plan = 'trial';
  if (typeof store.credits !== 'number' || isNaN(store.credits)) store.credits = planMeta().credits;
  if (!Array.isArray(store.creditLog)) store.creditLog = [];
}

/* 内置模型 + 已保存的自定义模型合并为可选列表 */
function syncModelList() {
  if (!Array.isArray(store.customModels)) store.customModels = [];
  state.models = [...MODELS, ...store.customModels];
  if (!state.models.some(m => m.id === state.model)) {
    state.model = MODELS[0].id;
    store.model = state.model;
  }
}

function saveStore() {
  try {
    localStorage.setItem(KEY, JSON.stringify({
      ...store,
      tasks: state.tasks.map(t => ({ ...t, __run: undefined })),
      model: state.model,
      mode: state.mode,
      project: state.project
    }));
  } catch (e) { /* 存储超限时静默失败 */ }
}

/* ------------------------------ 云服务适配层 ------------------------------ */
/* 云端持久化：登录后把任务/套餐积分/设置同步到云数据库，未登录时退回 localStorage。
 * 数据模型：
 *   user_state 表：每用户一行，存 plan / credits / credit_log / settings
 *   tasks 表：每用户多行，task_uid + payload(JSONB) 存完整任务对象
 */

const CLOUD = {
  get ready() { return !!window.cloudReady && !!window.cloud; },
  get authed() { return !!state.cloudSession; }
};

/* 判断当前是否有可用会话（登录且会话有效） */
async function refreshCloudSession() {
  if (!CLOUD.ready) { state.cloudSession = null; return null; }
  try {
    const { data, error } = await cloud.auth.getSession();
    state.cloudSession = (error || !data) ? null : data;
  } catch (e) {
    state.cloudSession = null;
  }
  return state.cloudSession;
}

/* 从云端拉取用户状态（套餐/积分/流水/设置），合并进本地 store */
async function pullCloudState() {
  if (!CLOUD.authed) return false;
  const { data, error } = await cloud.database
    .from('user_state')
    .select('plan, credits, credit_log, settings')
    .maybeSingle();
  if (error || !data) return false;

  if (data.plan) store.plan = data.plan;
  if (typeof data.credits === 'number') store.credits = data.credits;
  if (Array.isArray(data.credit_log)) store.creditLog = data.credit_log;
  if (data.settings && typeof data.settings === 'object') {
    store.settings = { ...store.settings, ...data.settings };
  }
  normalizePlan();
  return true;
}

/* 把当前用户状态推送到云端（upsert 当前用户那一行） */
async function pushCloudState() {
  if (!CLOUD.authed) return false;
  const payload = {
    plan: store.plan,
    credits: store.credits,
    credit_log: store.creditLog,
    settings: store.settings
  };
  const { data, error } = await cloud.database
    .from('user_state')
    .upsert(payload, { onConflict: 'owner_id' });
  return !error;
}

/* 从云端拉取任务列表，替换本地 state.tasks */
async function pullCloudTasks() {
  if (!CLOUD.authed) return false;
  const { data, error } = await cloud.database
    .from('tasks')
    .select('task_uid, payload')
    .order('created_at', { ascending: true });
  if (error) return false;
  state.tasks = (data || []).map(r => {
    try { return { ...r.payload, id: r.task_uid, __run: undefined }; }
    catch (_) { return null; }
  }).filter(Boolean);
  return true;
}

/* 把单个任务推送到云端（按 task_uid upsert） */
async function pushCloudTask(task) {
  if (!CLOUD.authed) return false;
  const clean = { ...task, __run: undefined };
  const { error } = await cloud.database
    .from('tasks')
    .upsert({ task_uid: task.id, payload: clean }, { onConflict: 'task_uid' });
  return !error;
}

/* 从云端删除一个任务 */
async function deleteCloudTask(taskUid) {
  if (!CLOUD.authed) return false;
  const { error } = await cloud.database
    .from('tasks')
    .delete()
    .eq('task_uid', taskUid);
  return !error;
}

/* 登录后整体同步：拉取云端状态覆盖本地，并把本地未上云的任务补传 */
async function syncFromCloud() {
  if (!CLOUD.authed) return false;
  state.cloudSyncing = true;
  try {
    await pullCloudState();
    await pullCloudTasks();
  } finally {
    state.cloudSyncing = false;
  }
  return true;
}

/* ------------------------------ 登录与账号 ------------------------------ */
/* 恢复登录态：应用启动时调用。
 * 带微信 OAuth 回调（?code=&provider=wechat）时先交换回调，再恢复会话；
 * 普通访问直接恢复会话（Email OTP / Phone OTP 无需 OAuth 回调）。 */
async function restoreAuth() {
  if (!CLOUD.ready) { renderUser(); return; }

  // 处理微信网站登录回调（在路由守卫前执行，避免丢失一次性 code）
  const url = new URL(location.href);
  if (url.searchParams.has('code') || url.searchParams.has('error')) {
    const provider = url.searchParams.get('provider');
    if (provider === 'wechat') {
      const handled = await handleWechatCallback();
      if (handled) return; // 已建立会话或已清空 URL，交由后续渲染
    } else if (provider === 'workbuddy') {
      const handled = await handleWorkbuddyCallback();
      if (handled) return;
    }
  }

  await refreshCloudSession();
  if (CLOUD.authed) {
    await syncFromCloud();
  }
  renderUser();
  renderNav();
}

/* 微信网站登录回调：交换 code → 会话，成功后清空 URL 参数 */
async function handleWechatCallback() {
  if (typeof cloud.auth.handleWechatWebCallback !== 'function') {
    toast('微信登录组件未就绪，请重试');
    return false;
  }
  const { data: session, error } = await cloud.auth.handleWechatWebCallback();
  if (error) { toast(error.message || '微信登录失败'); return false; }
  if (session) {
    state.cloudSession = session;
    const url = new URL(location.href);
    ['code', 'state', 'provider'].forEach(k => url.searchParams.delete(k));
    history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
    await syncFromCloud();
    renderUser(); renderNav();
    toast('微信登录成功');
    return true;
  }
  return false;
}

/* WorkBuddy 账号登录回调 */
async function handleWorkbuddyCallback() {
  if (typeof cloud.auth.handleWorkBuddyCallback !== 'function') {
    toast('WorkBuddy 登录组件未就绪，请重试');
    return false;
  }
  const { data: session, error } = await cloud.auth.handleWorkBuddyCallback();
  if (error) { toast(error.message || '登录失败'); return false; }
  if (session) {
    state.cloudSession = session;
    const url = new URL(location.href);
    ['code', 'state', 'provider'].forEach(k => url.searchParams.delete(k));
    history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
    await syncFromCloud();
    renderUser(); renderNav();
    toast('登录成功');
    return true;
  }
  return false;
}

/* 切换登录方式 Tab（邮箱 / 手机号 / 微信） */
function switchLoginTab(id) {
  if (id !== 'email' && id !== 'phone' && id !== 'wechat') return;
  state.__loginTab = id;
  const tabs = document.querySelectorAll('.login-tab');
  tabs.forEach(t => t.classList.toggle('active', t.dataset.id === id));
  const panelEmail = $('#login-panel-email');
  const panelPhone = $('#login-panel-phone');
  const panelWechat = $('#login-panel-wechat');
  if (panelEmail) panelEmail.style.display = id === 'email' ? '' : 'none';
  if (panelPhone) panelPhone.style.display = id === 'phone' ? '' : 'none';
  if (panelWechat) panelWechat.style.display = id === 'wechat' ? '' : 'none';
  // 微信 Tab 无需底部「登录/注册」按钮
  const submit = $('#login-submit');
  if (submit) submit.style.display = id === 'wechat' ? 'none' : '';
  // 切换 Tab 时清除上一 Tab 的待验证状态，避免串用
  state.__otp = null;
}

/* 渲染侧栏用户区域 */
function renderUser() {
  const avatar = $('#user-avatar');
  const name = $('#user-name');
  const planLabel = $('#user-plan');
  if (!avatar || !name) return;

  if (CLOUD.authed && state.cloudSession && state.cloudSession.user) {
    const nick = userNickname();
    const initial = (nick || '用').slice(0, 1);
    avatar.textContent = initial;
    avatar.classList.add('logged-in');
    name.textContent = nick || '已登录';
    if (planLabel) planLabel.textContent = `${planMeta().name} · ${store.credits} 积分`;
    avatar.onclick = () => openAccountModal();
    avatar.title = '账号设置（退出登录）';
  } else {
    avatar.textContent = '?';
    avatar.classList.remove('logged-in');
    name.textContent = '未登录';
    if (planLabel) planLabel.textContent = '点击登录同步云端';
    avatar.onclick = () => openLoginModal();
    avatar.title = '登录';
  }
}

/* 打开登录弹窗：邮箱账号登录（Email OTP）+ 手机号验证码登录（Phone OTP）+ 微信扫码登录 */
function openLoginModal() {
  if (!CLOUD.ready) { toast('云服务未就绪，请刷新后重试'); return; }
  state.__loginTab = 'email';
  openModal({
    title: '登录 PlatformX',
    desc: '登录后任务与积分将同步到云端，多端可访问。',
    body: `
      <div class="login-tabs">
        <button class="login-tab ${state.__loginTab === 'email' ? 'active' : ''}" data-act="login-tab" data-id="email">邮箱账号登录</button>
        <button class="login-tab ${state.__loginTab === 'phone' ? 'active' : ''}" data-act="login-tab" data-id="phone">手机号登录</button>
        <button class="login-tab ${state.__loginTab === 'wechat' ? 'active' : ''}" data-act="login-tab" data-id="wechat">微信登录</button>
      </div>
      <div class="login-panel" id="login-panel-email" style="${state.__loginTab === 'email' ? '' : 'display:none'}">
        <div class="field">
          <label>邮箱</label>
          <input id="login-email" type="email" placeholder="请输入邮箱地址" autocomplete="email" />
          <div class="hint" id="login-email-err"></div>
        </div>
        <div class="field-row">
          <div class="field"><label>验证码</label><input id="login-email-code" placeholder="6 位验证码" maxlength="6" inputmode="numeric" /></div>
          <div class="field" style="flex:none;align-self:flex-end">
            <button class="small-btn solid" id="login-email-send" data-act="send-email-otp">获取验证码</button>
          </div>
        </div>
        <div class="login-note">未注册的邮箱将自动创建账号，无需设置密码。</div>
      </div>
      <div class="login-panel" id="login-panel-phone" style="${state.__loginTab === 'phone' ? '' : 'display:none'}">
        <div class="field">
          <label>手机号</label>
          <input id="login-phone" placeholder="请输入 11 位手机号" maxlength="11" inputmode="numeric" />
          <div class="hint" id="login-phone-err"></div>
        </div>
        <div class="field-row">
          <div class="field"><label>验证码</label><input id="login-code" placeholder="6 位验证码" maxlength="6" inputmode="numeric" /></div>
          <div class="field" style="flex:none;align-self:flex-end">
            <button class="small-btn solid" id="login-send" data-act="send-otp">获取验证码</button>
          </div>
        </div>
      </div>
      <div class="login-panel" id="login-panel-wechat" style="${state.__loginTab === 'wechat' ? '' : 'display:none'}">
        <button class="wechat-login-btn" id="login-wechat" data-act="login-wechat">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M8.5 4C5.46 4 3 5.96 3 8.37c0 1.4.78 2.66 2.02 3.48l-.5 1.5 1.75-.88c.4.11.81.17 1.23.18-.04-.18-.06-.37-.06-.56 0-2.42 2.3-4.38 5.13-4.38h.42C12.45 5.78 10.66 4 8.5 4ZM6.4 6.9a.78.78 0 1 1 0 1.56.78.78 0 0 1 0-1.56Zm4.2 0a.78.78 0 1 1 0 1.56.78.78 0 0 1 0-1.56Z"/><path d="M15.5 11c-2.9 0-5.25 1.97-5.25 4.4 0 2.43 2.35 4.4 5.25 4.4.53 0 1.04-.07 1.52-.19l1.58.79-.46-1.36c1.6-.87 2.61-2.18 2.61-3.64 0-2.43-2.35-4.4-5.25-4.4Zm-2.1 3.3a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4Zm4.2 0a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4Z"/></svg>
          使用微信登录
        </button>
        <div class="login-note">点击后跳转微信授权，支持手机端一键登录与电脑端扫码登录。新用户将自动创建账号并绑定微信。</div>
      </div>`,
    foot: `
      <button class="ghost-btn" data-act="close-modal">取消</button>
      <button class="primary-btn" id="login-submit" data-act="login-otp" ${state.__loginTab === 'wechat' ? 'style="display:none"' : ''}>登录 / 注册</button>`
  });
}

/* 当前显示昵称：本地自定义昵称优先，其次云端 user.name，再次邮箱前缀 */
function userNickname() {
  const u = (state.cloudSession && state.cloudSession.user) || {};
  const local = (store.settings && store.settings.nickname) || '';
  if (local) return local;
  if (u.name) return u.name;
  if (u.email) return u.email.split('@')[0];
  return '';
}

/* 保存昵称（本地 + 云端 settings.nickname） */
async function saveNickname(name) {
  const v = String(name || '').trim();
  if (!v) { toast('昵称不能为空'); return false; }
  if (v.length > 20) { toast('昵称最长 20 个字符'); return false; }
  store.settings = { ...store.settings, nickname: v };
  saveStore();
  renderUser();
  pushCloudState();
  toast('昵称已更新');
  return true;
}

/* 打开账号弹窗（已登录）：显示用户信息 + 昵称编辑 + 退出登录 */
function openAccountModal() {
  const u = (state.cloudSession && state.cloudSession.user) || {};
  const nick = userNickname();
  const plan = planMeta();
  const email = u.email || (u.phone ? '已绑定手机号 ' + u.phone : '—');
  const syncState = syncStatusText();
  openModal({
    title: '我的账号',
    desc: '已通过云服务登录，数据实时同步。',
    body: `
      <div class="acct-head">
        <div class="acct-avatar">${esc(nick ? nick.slice(0, 1) : '用')}</div>
        <div class="acct-identity">
          <div class="acct-name">${esc(nick || '未设置昵称')}</div>
          <div class="acct-sub">${esc(email)}</div>
        </div>
      </div>
      <div class="kv-list">
        <div class="kv-row">
          <span class="k">昵称</span>
          <span class="v" id="acct-nick-view">${esc(nick || '—')}</span>
          <input class="acct-nick-input" id="acct-nick-input" value="${esc(nick)}" maxlength="20" style="display:none" placeholder="输入昵称" />
          <span class="grow"></span>
          <button class="small-btn" id="acct-nick-btn" data-act="edit-nickname">${icon('pen', 12)} 编辑</button>
        </div>
        <div class="kv-row"><span class="k">邮箱</span><span class="v">${esc(email)}</span></div>
        <div class="kv-row">
          <span class="k">套餐</span>
          <span class="v">${esc(plan.name)}<span class="acct-plan-tag">${esc(plan.tag)}</span></span>
          <span class="grow"></span>
          <button class="small-btn" data-act="go-plans">管理套餐</button>
        </div>
        <div class="kv-row">
          <span class="k">积分余额</span><span class="v">${store.credits}</span>
        </div>
        <div class="kv-row">
          <span class="k">同步状态</span>
          <span class="v acct-sync ${state.cloudSyncing ? 'syncing' : 'synced'}">
            <span class="acct-sync-dot"></span>${esc(syncState)}
          </span>
          <span class="grow"></span>
          <button class="small-btn" data-act="sync-now">${icon('repeat', 12)} 立即同步</button>
        </div>
      </div>`,
    foot: `
      <button class="ghost-btn" data-act="close-modal">关闭</button>
      <button class="primary-btn danger-btn" data-act="logout">退出登录</button>`
  });
}

/* 同步状态文案 */
function syncStatusText() {
  if (!CLOUD.authed) return '未连接';
  if (state.cloudSyncing) return '正在同步…';
  return '云端已同步';
}

/* 昵称编辑态切换 */
function toggleNicknameEdit(editing) {
  const view = $('#acct-nick-view');
  const input = $('#acct-nick-input');
  const btn = $('#acct-nick-btn');
  if (!view || !input || !btn) return;
  if (editing) {
    view.style.display = 'none';
    input.style.display = '';
    input.value = view.textContent === '—' ? '' : view.textContent;
    input.focus();
    btn.innerHTML = `${icon('check', 12)} 保存`;
    btn.dataset.act = 'save-nickname';
  } else {
    view.style.display = '';
    input.style.display = 'none';
    btn.innerHTML = `${icon('pen', 12)} 编辑`;
    btn.dataset.act = 'edit-nickname';
  }
}

/* 移动端 APP 下载弹窗：扫码下载 + 各平台下载链接 */
function openAppModal() {
  const seed = 'px-app-' + location.host + '-download';
  openModal({
    title: '下载 PlatformX 移动端 APP',
    desc: '扫码安装，随时随地处理任务与查看工作台。',
    body: `
      <div class="app-dl">
        <div class="app-dl-qr">${qrSvg(seed, 168)}</div>
        <div class="app-dl-info">
          <div class="app-dl-name">PlatformX 移动端</div>
          <div class="app-dl-sub">支持 iOS / Android / 鸿蒙 · 与网页端数据实时同步</div>
          <div class="app-dl-btns">
            <button class="app-dl-btn ios" data-act="app-dl-link" data-id="ios">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M16.7 12.9c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.9-1.6 0-3.1 1-3.9 2.4-1.7 2.9-.4 7.2 1.2 9.6.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8 0-.1-2.5-1-2.5-3.8zM14.8 6.4c.7-.8 1.1-1.9 1-3-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.5z"/></svg>
              App Store
            </button>
            <button class="app-dl-btn android" data-act="app-dl-link" data-id="android">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M5.5 8.5a1.3 1.3 0 0 0-1.3 1.3v4.4a1.3 1.3 0 1 0 2.6 0V9.8A1.3 1.3 0 0 0 5.5 8.5Zm13 0a1.3 1.3 0 0 0-1.3 1.3v4.4a1.3 1.3 0 1 0 2.6 0V9.8a1.3 1.3 0 0 0-1.3-1.3ZM7 15.6v.6A2.5 2.5 0 0 0 9.5 18.7h.5v2.1a1.2 1.2 0 1 0 2.4 0v-2.1h.2v2.1a1.2 1.2 0 1 0 2.4 0v-2.1h.5a2.5 2.5 0 0 0 2.5-2.5v-.6a1.2 1.2 0 0 0-1.2-1.2H8.2A1.2 1.2 0 0 0 7 15.6Zm9.1-9.5a.4.4 0 0 0-.4-.4h-.5a.4.4 0 0 0-.4.4v.6A5 5 0 0 0 12 7.9a5 5 0 0 0-2.8-1.2V6.1a.4.4 0 0 0-.4-.4h-.5a.4.4 0 0 0-.4.4v.7A5.2 5.2 0 0 0 6.8 9.6l-.8 1.4a.4.4 0 0 0 .1.5l.3.2a.4.4 0 0 0 .5-.1l.8-1.4a4.7 4.7 0 0 0 4.3 2.7 4.7 4.7 0 0 0 4.3-2.7l.8 1.4a.4.4 0 0 0 .5.1l.3-.2a.4.4 0 0 0 .1-.5l-.8-1.4a5.2 5.2 0 0 0-1.1-2.8Z"/></svg>
              Android 下载
            </button>
            <button class="app-dl-btn harmony" data-act="app-dl-link" data-id="harmony">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M3.67 6.14S1.82 7.91 1.72 9.78v.35c.08 1.51 1.22 2.4 1.22 2.4 1.83 1.79 6.26 4.04 7.3 4.55 0 0 .06.03.1-.01l.02-.04v-.04C7.52 10.8 3.67 6.14 3.67 6.14zM9.65 18.6c-.02-.08-.1-.08-.1-.08l-7.38.26c.8 1.43 2.15 2.53 3.56 2.2.96-.25 3.16-1.78 3.88-2.3.06-.05.04-.09.04-.09zm.08-.78C6.49 15.63.21 12.28.21 12.28c-.15.46-.2.9-.21 1.3v.07c0 1.07.4 1.82.4 1.82.8 1.69 2.34 2.2 2.34 2.2.7.3 1.4.31 1.4.31.12.02 4.4 0 5.54 0 .05 0 .08-.05.08-.05v-.06c0-.03-.03-.05-.03-.05zM9.06 3.19a3.42 3.42 0 00-2.57 3.15v.41c.03.6.16 1.05.16 1.05.66 2.9 3.86 7.65 4.55 8.65.05.05.1.03.1.03a.1.1 0 00.06-.1c1.06-10.6-1.11-13.42-1.11-13.42-.32.02-1.19.23-1.19.23zm8.299 2.27s-.49-1.8-2.44-2.28c0 0-.57-.14-1.17-.22 0 0-2.18 2.81-1.12 13.43.01.07.06.08.06.08.07.03.1-.03.1-.03.72-1.03 3.9-5.76 4.55-8.64 0 0 .36-1.4.02-2.34zm-2.92 13.07s-.07 0-.09.05c0 0-.01.07.03.1.7.51 2.85 2 3.88 2.3 0 0 .16.05.43.06h.14c.69-.02 1.9-.37 3-2.26l-7.4-.25zm7.83-8.41c.14-2.06-1.94-3.97-1.94-3.98 0 0-3.85 4.66-6.67 10.8 0 0-.03.08.02.13l.04.01h.06c1.06-.53 5.46-2.77 7.28-4.54 0 0 1.15-.93 1.21-2.42zm1.52 2.14s-6.28 3.37-9.52 5.55c0 0-.05.04-.03.11 0 0 .03.06.07.06 1.16 0 5.56 0 5.67-.02 0 0 .57-.02 1.27-.29 0 0 1.56-.5 2.37-2.27 0 0 .73-1.45.17-3.14z"/></svg>
              鸿蒙下载
            </button>
          </div>
          <div class="app-dl-hint">扫码或点击上方按钮下载安装包</div>
        </div>
      </div>`,
    foot: `<button class="primary-btn" data-act="close-modal">关闭</button>`
  });
}

/* 手机号验证码：发送 */
async function sendOtp() {
  const phone = ($('#login-phone') || {}).value || '';
  const errEl = $('#login-phone-err');
  if (!/^1\d{10}$/.test(phone)) {
    if (errEl) errEl.textContent = '请输入正确的 11 位手机号';
    return;
  }
  if (errEl) errEl.textContent = '';
  const btn = $('#login-send');
  if (btn) { btn.disabled = true; btn.textContent = '发送中…'; }
  const sent = await cloud.auth.sendOtp({ phone });
  if (btn) { btn.disabled = false; btn.textContent = '获取验证码'; }
  if (sent.error) { toast(sent.error.message); return; }
  state.__otp = { phone, ...sent.data };
  toast('验证码已发送');
}

/* 邮箱验证码：发送 */
async function sendEmailOtp() {
  const email = ($('#login-email') || {}).value || '';
  const errEl = $('#login-email-err');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    if (errEl) errEl.textContent = '请输入正确的邮箱地址';
    return;
  }
  if (errEl) errEl.textContent = '';
  const btn = $('#login-email-send');
  if (btn) { btn.disabled = true; btn.textContent = '发送中…'; }
  const sent = await cloud.auth.sendOtp({ email });
  if (btn) { btn.disabled = false; btn.textContent = '获取验证码'; }
  if (sent.error) { toast(sent.error.message); return; }
  state.__otp = { email, ...sent.data };
  toast('验证码已发送');
}

/* 验证码：登录/注册（按当前 Tab 分发邮箱 / 手机号） */
async function loginOtp() {
  const tab = state.__loginTab || 'email';
  if (tab === 'email') {
    const pending = state.__otp;
    const email = ($('#login-email') || {}).value || '';
    const code = ($('#login-email-code') || {}).value || '';
    if (!pending || !pending.email || pending.email !== email) { toast('请先获取验证码'); return; }
    if (!code) { toast('请输入验证码'); return; }
    const completed = await cloud.auth.verifyOtp({
      email: pending.email,
      verificationId: pending.verificationId,
      isExistingUser: pending.isExistingUser,
      token: code
    });
    if (completed.error) { toast(completed.error.message); return; }
    state.__otp = null;
    state.cloudSession = completed.data.session || (await cloud.auth.getSession()).data;
  } else {
    const pending = state.__otp;
    const phone = ($('#login-phone') || {}).value || '';
    const code = ($('#login-code') || {}).value || '';
    if (!pending || !pending.phone || pending.phone !== phone) { toast('请先获取验证码'); return; }
    if (!code) { toast('请输入验证码'); return; }
    const completed = await cloud.auth.verifyOtp({
      phone: pending.phone,
      verificationId: pending.verificationId,
      isExistingUser: pending.isExistingUser,
      token: code
    });
    if (completed.error) { toast(completed.error.message); return; }
    state.__otp = null;
    state.cloudSession = completed.data.session || (await cloud.auth.getSession()).data;
  }
  closeModal();
  await syncFromCloud();
  renderUser(); renderNav(); refreshBillingUI();
  if (state.route === 'plans') renderPlans();
  toast('登录成功');
}

/* 微信网站登录：signInWithOAuth 返回跳转 URL，导航到微信授权页（快速登录/扫码） */
async function loginWechat() {
  if (!CLOUD.ready) { toast('云服务未就绪，请刷新后重试'); return; }
  const btn = $('#login-wechat');
  if (btn) { btn.disabled = true; btn.classList.add('loading'); }

  const { data, error } = await cloud.auth.signInWithOAuth({
    provider: 'wechat',
    redirectTo: location.origin
  });

  if (btn) { btn.disabled = false; btn.classList.remove('loading'); }

  if (error) { toast(error.message || '微信登录失败'); return; }
  if (!data || !data.url) { toast('微信登录暂不可用，请稍后重试'); return; }
  location.assign(data.url);
}

/* 退出登录 */
async function logout() {
  try { await cloud.auth.signOut(); } catch (e) { /* 忽略 */ }
  state.cloudSession = null;
  closeModal();
  renderUser();
  toast('已退出登录');
}

/* ------------------------------ 积分与套餐 ------------------------------ */
const planMeta = (id = store.plan) => PLANS.find(p => p.id === id) || PLANS[0];

function addCredits(amount, note) {
  store.credits += amount;
  store.creditLog.unshift({ id: uid('cl'), delta: amount, note, at: Date.now() });
  if (store.creditLog.length > 100) store.creditLog.length = 100;
  saveStore();
  pushCloudState();
  refreshBillingUI();
  if (state.route === 'plans') renderPlans();
}

function spendCredits(amount, note) {
  if (store.credits < amount) return false;
  store.credits -= amount;
  store.creditLog.unshift({ id: uid('cl'), delta: -amount, note, at: Date.now() });
  if (store.creditLog.length > 100) store.creditLog.length = 100;
  saveStore();
  pushCloudState();
  refreshBillingUI();
  if (state.route === 'plans') renderPlans();
  return true;
}

/* 切换套餐：先弹扫码支付，支付成功后生效（演示支付为模拟到账） */
function switchPlan(id, cycle = billingCycle()) {
  const p = PLANS.find(x => x.id === id);
  if (!p) return;
  if (p.id === store.plan) { toast('当前已是' + p.name); return; }
  if (p.price === 0) { activatePlan(p.id, cycle); return; }

  const price = cycle === 'year' ? p.priceYear : p.price;
  const cycleLabel = cycle === 'year' ? '年付' : '月付';
  openPayModal({
    title: `开通${p.name}（${cycleLabel}）`,
    amount: price,
    desc: `${p.name} · ${cycleLabel} · 有效期 ${cycle === 'year' ? '12 个月' : '1 个月'}`,
    onSuccess: () => activatePlan(p.id, cycle)
  });
}

/* 支付成功后真正生效（切换套餐 + 赠送积分） */
function activatePlan(id, cycle) {
  const p = PLANS.find(x => x.id === id);
  if (!p) return;
  store.plan = p.id;
  const price = cycle === 'year' ? p.priceYear : p.price;
  const cycleLabel = cycle === 'year' ? '年付' : '月付';
  addCredits(p.credits, `开通${p.name}（${cycleLabel} ¥${price}）· 赠送 ${p.credits} 积分`);
  toast(`已开通${p.name}（${cycleLabel}），赠送 ${p.credits} 积分`);
  renderPlans();
  renderNav();
}

/* 任务成本（积分）与套餐额度校验 */
function taskCost() {
  const plan = planMeta();
  if (plan.id === 'pro') return 0;      // 专业版不限积分
  if (plan.id === 'standard') return 1;  // 标准版每次任务 1 积分（量大）
  return 3;                              // 体验版每次任务 3 积分
}

function planTaskLimit() {
  return planMeta().limits.maxTasks;
}

/* ------------------------------ 支付（扫码） ------------------------------ */
/* 当前账单周期：month | year，存于 state 便于套餐卡切换后回显 */
function billingCycle() {
  return state.billingCycle || 'month';
}
function setBillingCycle(c) {
  state.billingCycle = c;
  renderPlans();
}

/* 生成一个伪随机二维码（演示用，不可真正扫码支付）。
 * 基于种子字符串生成 21x21 的布尔矩阵 + 三个定位角，视觉上像真实二维码。
 */
function qrMatrix(seed, n = 21) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619); }
  const rnd = () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 1000) / 1000; };
  const m = Array.from({ length: n }, () => Array(n).fill(false));
  const corner = (x, y) => {
    for (let i = 0; i < 7; i++) for (let j = 0; j < 7; j++) {
      const edge = i === 0 || i === 6 || j === 0 || j === 6;
      const core = i >= 2 && i <= 4 && j >= 2 && j <= 4;
      if (edge || core) m[y + i][x + j] = true;
    }
  };
  corner(0, 0); corner(n - 7, 0); corner(0, n - 7);
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    const inCorner = (x < 8 && y < 8) || (x >= n - 8 && y < 8) || (x < 8 && y >= n - 8);
    if (inCorner) continue;
    m[y][x] = rnd() > 0.52;
  }
  return m;
}

function qrSvg(seed, size = 168) {
  const n = 21, cell = size / n, m = qrMatrix(seed, n);
  let rects = '';
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    if (m[y][x]) rects += `<rect x="${(x * cell).toFixed(1)}" y="${(y * cell).toFixed(1)}" width="${cell.toFixed(1)}" height="${cell.toFixed(1)}"/>`;
  }
  return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" fill="#111" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">${rects}</svg>`;
}

/* 支付方式：微信 / 支付宝（含官方品牌 logo） */
const PAY_METHODS = [
  { id: 'wechat', name: '微信支付', color: '#07c160',
    logo: 'M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z' },
  { id: 'alipay', name: '支付宝', color: '#1677ff',
    logo: 'M19.695 15.07c3.426 1.158 4.203 1.22 4.203 1.22V3.846c0-2.124-1.705-3.845-3.81-3.845H3.914C1.808.001.102 1.722.102 3.846v16.31c0 2.123 1.706 3.845 3.813 3.845h16.173c2.105 0 3.81-1.722 3.81-3.845v-.157s-6.19-2.602-9.315-4.119c-2.096 2.602-4.8 4.181-7.607 4.181-4.75 0-6.361-4.19-4.112-6.949.49-.602 1.324-1.175 2.617-1.497 2.025-.502 5.247.313 8.266 1.317a16.796 16.796 0 0 0 1.341-3.302H5.781v-.952h4.799V6.975H4.77v-.953h5.81V3.591s0-.409.411-.409h2.347v2.84h5.744v.951h-5.744v1.704h4.69a19.453 19.453 0 0 1-1.986 5.06c1.424.52 2.702 1.011 3.654 1.333m-13.81-2.032c-.596.06-1.71.325-2.321.869-1.83 1.608-.735 4.55 2.968 4.55 2.151 0 4.301-1.388 5.99-3.61-2.403-1.182-4.438-2.028-6.637-1.809' }
];

function openPayModal({ title, amount, desc, onSuccess }) {
  const pay = { method: 'wechat', title, amount, desc, onSuccess };
  state.__pay = pay;
  renderPayModal();
}

function renderPayModal() {
  const pay = state.__pay;
  if (!pay) return;
  const seed = `px-pay-${pay.method}-${pay.amount}-${Date.now()}`;
  const m = $('#modal');
  m.className = 'modal pay-modal';
  m.innerHTML = `
    <div class="modal-head">
      <div><h3>${esc(pay.title)}</h3><p>${esc(pay.desc)}</p></div>
      <span class="grow"></span>
      <button class="icon-btn" data-act="close-modal">${icon('x', 15)}</button>
    </div>
    <div class="modal-body">
      <div class="pay-amount"><span class="pay-cur">¥</span>${pay.amount}</div>
      <div class="pay-qr-wrap">
        <div class="pay-qr">${qrSvg(seed)}</div>
        <div class="pay-qr-brand ${pay.method}">${pay.method === 'wechat' ? '微信' : '支付宝'}扫码支付</div>
      </div>
      <div class="pay-methods">
        ${PAY_METHODS.map(m => `
          <button class="pay-method ${pay.method === m.id ? 'active' : ''}" data-act="pick-pay" data-id="${m.id}">
            <span class="pm-logo"><svg viewBox="0 0 24 24" width="18" height="18" fill="${m.color}" aria-hidden="true"><path d="${m.logo}"/></svg></span>${esc(m.name)}
          </button>`).join('')}
      </div>
      <div class="pay-hint">演示环境：请使用对应 App 扫描二维码完成支付，支付结果将自动到账。</div>
    </div>
    <div class="modal-foot">
      <button class="ghost-btn" data-act="close-modal">取消</button>
      <button class="primary-btn" data-act="simulate-pay">我已支付，模拟到账</button>
    </div>`;
  $('#modal-overlay').hidden = false;
}

/* 模拟支付成功（演示：直接回调到账，不接真实支付网关） */
function simulatePay() {
  const pay = state.__pay;
  if (!pay) return;
  closeModal();
  state.__pay = null;
  if (pay.onSuccess) pay.onSuccess();
}

/* 刷新侧栏额度卡片与用户套餐标签（DOM 存在时才更新） */
function refreshBillingUI() {
  const plan = planMeta();
  const card = $('#usage-card');
  if (card) {
    const pct = plan.credits > 0 ? Math.max(2, Math.min(100, Math.round(store.credits / plan.credits * 100))) : 100;
    card.innerHTML = `
      <div class="usage-top"><span>积分余额</span><span class="usage-num">${store.credits}</span></div>
      <div class="usage-bar"><i style="width:${pct}%"></i></div>
      <div class="usage-foot">${plan.name} · 每月 ${plan.credits} 积分</div>`;
    card.onclick = () => navigate('plans');
  }
  const planLabel = $('#user-plan');
  if (planLabel && CLOUD.authed) planLabel.textContent = `${plan.name} · ${store.credits} 积分`;
}

/* ------------------------------ 轻量 Markdown ------------------------------ */
function mdInline(s) {
  return s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/`([^`]+)`/g, '<code class="ic">$1</code>');
}

function md(src = '') {
  const lines = esc(src).replace(/\r/g, '').split('\n');
  let out = '', i = 0, list = null;
  const closeList = () => { if (list) { out += `</${list}>`; list = null; } };

  while (i < lines.length) {
    const line = lines[i];

    if (/^\s*```/.test(line)) {
      closeList();
      const lang = line.trim().replace(/^```/, '').trim();
      const buf = [];
      i++;
      while (i < lines.length && !/^\s*```/.test(lines[i])) { buf.push(lines[i]); i++; }
      i++;
      out += `<pre data-lang="${esc(lang)}"><code>${buf.join('\n')}</code></pre>`;
      continue;
    }

    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) { closeList(); out += `<h4>${mdInline(h[2])}</h4>`; i++; continue; }

    const li = line.match(/^(\s*)(?:([-*])|(\d+)\.)\s+(.*)$/);
    if (li) {
      const kind = li[3] ? 'ol' : 'ul';
      if (list !== kind) { closeList(); out += `<${kind}>`; list = kind; }
      out += `<li>${mdInline(li[4])}</li>`;
      i++; continue;
    }

    if (!line.trim()) { closeList(); i++; continue; }

    const buf = [line.trim()];
    i++;
    while (i < lines.length && lines[i].trim() && !/^\s*```|^#{1,4}\s|^\s*(?:[-*]|\d+\.)\s/.test(lines[i])) {
      buf.push(lines[i].trim()); i++;
    }
    closeList();
    out += `<p>${mdInline(buf.join(' '))}</p>`;
  }
  closeList();
  return out;
}

/* ------------------------------ Toast ------------------------------ */
function toast(text, kind = 'ok') {
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<span class="t-ico">${icon(kind === 'ok' ? 'check' : 'sparkle', 14)}</span><span>${esc(text)}</span>`;
  $('#toasts').appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .2s'; setTimeout(() => el.remove(), 220); }, 2400);
}

/* ------------------------------ 交付物打开 ------------------------------ */
/* 生成交付物的真实内容，让「点击查看」真正能打开/下载文件 */
function artifactContent(name) {
  const n = name.toLowerCase();
  const title = name.replace(/\.[^.]+$/, '');
  if (/\.md$/.test(n)) {
    return `# ${title}\n\n> 由 PlatformX 生成 · 演示交付物\n\n## 概述\n\n本文档为「${title}」的交付说明，包含本次任务的核心结论与变更摘要。\n\n## 内容要点\n\n- 目标：${title}\n- 产出：见正文与附录\n- 状态：已完成，待评审\n\n## 后续动作\n\n1. 请查阅附件明细表\n2. 确认口径后即可归档\n`;
  }
  if (/\.json$/.test(n)) {
    return JSON.stringify({ name: title, source: 'PlatformX', generated: true, tokens: { primary: '#2752F5', accent: '#00CBB7' }, note: '演示生成的 design tokens' }, null, 2);
  }
  if (/\.(csv|txt)$/.test(n)) {
    return '指标,本期,上期,同比\nGMV,1280.5万,1150.2万,+11.3%\n订单量,8.42万,7.90万,+6.6%\n退款率,2.1%,2.4%,-0.3pp\n';
  }
  if (/\.patch$/.test(n)) {
    return `diff --git a/src/index.ts b/src/index.ts\n--- a/src/index.ts\n+++ b/src/index.ts\n@@ -1,5 +1,5 @@\n-import { legacy } from './legacy';\n+import { refresh } from './refresh';\n \n export async function init() {\n-  return legacy.bootstrap();\n+  return refresh.bootstrap();\n }\n`;
  }
  // 其余类型（docx/xlsx/pptx/pdf 等）：生成一个可直接在浏览器打开的 HTML 预览
  return `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><title>${title}</title><style>body{font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;max-width:720px;margin:48px auto;padding:0 24px;color:#1f2430;line-height:1.7}h1{font-size:22px;color:#2752F5}.tag{display:inline-block;font-size:12px;color:#6b6b80;background:#f2f2f7;border-radius:6px;padding:2px 8px;margin-bottom:16px}table{width:100%;border-collapse:collapse;margin:16px 0}th,td{border:1px solid #e7e7f0;padding:8px 12px;text-align:left;font-size:14px}th{background:#f7f7fb}</style></head><body><h1>${title}</h1><span class="tag">PlatformX · 演示交付物</span><p>这是「${title}」的可打开预览版本。原始交付物为演示数据，此处展示其核心内容结构与结论，供查看与评审。</p><h2>摘要</h2><p>本次任务已完成，交付物包含结论、明细与建议三部分，结论前置、可直接用于汇报。</p><h2>核心数据</h2><table><tr><th>项目</th><th>内容</th></tr><tr><td>目标</td><td>${title}</td></tr><tr><td>状态</td><td>已完成</td></tr><tr><td>格式</td><td>${name.split('.').pop().toUpperCase()}</td></tr></table><p style="color:#6b6b80;font-size:13px">如需真实文件，请在任务中重新生成或替换为实际产出。</p></body></html>`;
}

function openArtifact(name) {
  const n = name.toLowerCase();
  const isText = /\.(md|json|csv|txt|patch)$/.test(n);
  const content = artifactContent(name);
  const blob = new Blob([content], { type: isText ? 'text/plain;charset=utf-8' : 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  if (isText) {
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast('已下载 ' + name);
  } else {
    window.open(url, '_blank');
    setTimeout(() => URL.revokeObjectURL(url), 60000);
    toast('已在浏览器中打开 ' + name);
  }
}

/* ------------------------------ 侧边栏 ------------------------------ */
function countFor(route) {
  switch (route) {
    case 'tasks': return state.tasks.length;
    case 'experts': return store.experts.length;
    case 'skills': return store.skills.length;
    case 'connectors': return store.connectors.length;
    case 'projects': return PROJECTS.length;
    case 'library': return state.docs.length;
    default: return '';
  }
}

function renderNav() {
  const active = state.route === 'task' ? 'tasks' : state.route;
  $('#nav').innerHTML = NAV.map(g => `
    <div class="nav-group">${g.group}</div>
    ${g.items.map(it => `
      <button class="nav-item ${active === it.route ? 'active' : ''}" data-act="nav" data-route="${it.route}">
        ${icon(it.icon, 15)}<span>${it.label}</span>
        <span class="nav-count">${countFor(it.route)}</span>
      </button>`).join('')}
  `).join('');

  $('#sidebar-project-list').innerHTML = PROJECTS.slice(0, 4).map(p => `
    <button class="project-mini" data-act="open-project" data-id="${p.id}">
      <span class="dot" style="background:hsl(${p.hue} 62% 58%)"></span>
      <span class="pname">${esc(p.name)}</span>
      <span class="pill">${p.tasks}</span>
    </button>`).join('');
}

/* ------------------------------ 顶栏 ------------------------------ */
function topbar(opts = {}) {
  return `
    <div class="topbar">
      <button class="icon-btn hamburger" data-act="toggle-sidebar">${icon('hamburger', 16)}</button>
      ${opts.back ? `<button class="icon-btn" data-act="back" title="返回">${icon('arrowLeft', 16)}</button>` : ''}
      <div class="crumb">${opts.crumb || ''}</div>
      <div class="grow"></div>
      ${opts.actions || ''}
      <button class="topbar-btn ${state.contextOpen ? 'on' : ''}" data-act="toggle-context" title="切换上下文面板">
        ${icon('panel', 14)}<span>面板</span>
      </button>
    </div>`;
}

/* ------------------------------ 输入器 ------------------------------ */
function projectLabel() {
  const p = PROJECTS.find(x => x.id === state.project);
  return p ? p.name : '不使用项目';
}
function modelLabel() {
  const m = state.models.find(x => x.id === state.model);
  return m ? m.name : '选择模型';
}

function modeSwitchHTML({ cls = '', icons = false } = {}) {
  return `<div class="mode-switch ${cls}" data-mode-active="${state.mode}" role="group" aria-label="任务模式">
    ${MODES.map(m => `<button data-act="set-mode" data-mode="${m.id}" class="${state.mode === m.id ? 'active' : ''}" aria-pressed="${state.mode === m.id}" title="${esc(m.name)}模式 · ${esc(m.desc)}">${icons ? `<span class="ms-ico">${icon(m.ico, 15)}</span>` : ''}<span class="ms-label">${esc(m.name)}</span></button>`).join('')}
  </div>`;
}

function modeDescHTML() {
  const m = MODES.find(x => x.id === state.mode) || MODES[0];
  const tags = m.desc.split(' · ').map(t => `<span class="hs-tag">${esc(t)}</span>`).join('<i class="hs-dot"></i>');
  return `${tags}<i class="hs-div"></i><span class="hs-meta">开源模型已就绪</span>`;
}

function composerHTML({ id, placeholder, compact = false, hideModes = false }) {
  return `
  <div class="composer">
    <div class="attach-row" data-attach></div>
    <textarea id="${id}" rows="1" placeholder="${esc(placeholder)}"></textarea>
    <div class="composer-bar">
      <div class="bar-left">
        <button class="add-btn" data-act="add-menu" title="添加文件或资料">${icon('plus', 15)}</button>
        <button class="chip-btn" data-act="pick-project" title="当前项目：${esc(projectLabel())}">${icon('folder', 13)}<span data-project-label>${esc(projectLabel())}</span><span class="caret">${icon('chevronDown', 12)}</span></button>
      </div>
      <div class="bar-right">
        ${hideModes ? '' : modeSwitchHTML()}
        <button class="tool-btn" data-act="enhance-prompt" title="增强提示词（⌘I）">${icon('wand', 16)}</button>
        <button class="chip-btn model-chip" data-act="pick-model"><span class="model-dot"></span><span data-model-label>${esc(modelLabel())}</span><span class="caret">${icon('chevronDown', 12)}</span></button>
        <button class="tool-btn mic-btn" data-act="voice-input" title="语音输入">${icon('mic', 16)}</button>
        <button class="send-btn" data-act="send" title="发送（Enter）">${icon('arrowUp', 15)}</button>
      </div>
    </div>
  </div>
  ${compact ? '' : `<div class="composer-hint"><span>Enter 发送</span><span class="dot-sep"></span><span>Shift + Enter 换行</span><span class="dot-sep"></span><span>⌘I 增强提示词</span><span class="dot-sep"></span><span>拖入文件即可引用</span><span class="dot-sep"></span><span>⌘K 命令面板</span></div>`}`;
}

const activeComposer = () => $('#composer-home') || $('#composer-task');

/* ---------- 语音输入 ---------- */
const VOICE_SAMPLES = {
  office: '把这个季度的经营数据整理成一份汇报稿，先讲结论，再讲收入结构的变化和需要关注的问题。',
  dev: '帮我把登录接口加上失败次数限流，超过阈值锁定十分钟，并补上对应的单元测试。',
  design: '把设置页的视觉重做一下，风格参考现有设计系统，重点调整信息层级和表单间距。'
};

function renderVoiceState() {
  $$('.composer').forEach(c => {
    const live = !!state.voice.active;
    c.classList.toggle('recording', live);
    const existing = c.querySelector('.voice-state');
    if (!live) { if (existing) existing.remove(); return; }
    if (existing) return;
    const el = document.createElement('div');
    el.className = 'voice-state';
    el.innerHTML = `<span class="voice-wave">${'<i></i>'.repeat(5)}</span>
      <span class="vs-text">正在聆听…再次点麦克风结束</span>
      <span class="grow"></span>
      <span class="vs-time" data-voice-time>0:00</span>`;
    c.insertBefore(el, c.querySelector('textarea') || c.firstChild);
  });
}

function startVoice() {
  stopVoice(true);
  state.voice = { active: true, startedAt: Date.now(), timer: 0, tick: 0 };
  syncComposer();
  state.voice.tick = setInterval(() => {
    if (!state.voice.active) return;
    const s = Math.floor((Date.now() - state.voice.startedAt) / 1000);
    const el = document.querySelector('[data-voice-time]');
    if (el) el.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  }, 300);
  state.voice.timer = setTimeout(() => { if (state.voice.active) finishVoice(); }, 15000);
  toast('开始录音，说完再点一次麦克风结束');
}

function finishVoice(cancel = false) {
  const v = state.voice;
  if (!v || !v.active) return;
  const secs = Math.max(1, Math.round((Date.now() - v.startedAt) / 1000));
  clearTimeout(v.timer);
  clearInterval(v.tick);
  state.voice = { active: false };
  syncComposer();
  if (cancel) return;
  const ta = activeComposer();
  const sample = VOICE_SAMPLES[state.mode] || VOICE_SAMPLES.office;
  if (ta) {
    const head = ta.value.replace(/\s+$/, '');
    ta.value = head ? `${head} ${sample}` : sample;
    autosize(ta);
    ta.focus();
  }
  toast(`已转写 ${secs} 秒语音，可直接编辑或发送`);
}

function stopVoice(silent = false) {
  if (!state.voice.active) return;
  if (silent) {
    clearTimeout(state.voice.timer);
    clearInterval(state.voice.tick);
    state.voice = { active: false };
  } else finishVoice(true);
}

function toggleVoice() {
  if (state.voice.active) { finishVoice(); return; }
  if (!activeComposer()) return;
  startVoice();
}

/* ---------- 增强提示词 ---------- */
const ENHANCE_ROLE = {
  office: '资深办公文档专家，擅长把零散材料整理成可直接汇报的结构化文档',
  dev: '资深全栈工程师，擅长读懂现有代码、按团队规范实现并自测',
  design: '资深产品设计师，擅长从信息结构推导到视觉与交互细节'
};
const ENHANCE_REQS = {
  office: [
    '先给结论与三条以内的核心判断，再展开依据',
    '关键数字标注来源与口径（同比 / 环比 / 预算）',
    '缺失数据或需要我确认的口径单独列出'
  ],
  dev: [
    '先说明改动方案与影响范围，再给实现',
    '沿用项目现有技术栈与代码风格，不引入新依赖',
    '给出自测方式、边界用例与回滚方式'
  ],
  design: [
    '先给设计判断与依据，再给具体方案',
    '复用现有设计 token（间距 / 字号 / 配色），不要另起一套',
    '说明浅色与深色下的表现，以及关键断点的响应式处理'
  ]
};

function buildEnhanced(text) {
  const mode = ENHANCE_ROLE[state.mode] ? state.mode : 'office';
  const proj = PROJECTS.find(p => p.id === state.project);
  const ctx = [
    `${modeName(mode)}模式`,
    `模型 ${modelLabel()}`,
    proj ? `项目 ${proj.name}` : '不绑定项目',
    `可引用资料 ${state.docs.length} 份`
  ];
  if (state.attachments.length) ctx.push(`附件 ${state.attachments.map(a => a.name).join('、')}`);
  return [
    `你是${ENHANCE_ROLE[mode]}。`,
    '',
    `目标：${text}`,
    '',
    `上下文：${ctx.join(' · ')}`,
    '',
    '要求：',
    ...ENHANCE_REQS[mode].map((r, i) => `${i + 1}. ${r}`),
    '',
    '输出：先给结论，再分层展开，最后列出待确认项；中文作答，不用客套话，不堆砌形容词。'
  ].join('\n');
}

function enhancePrompt() {
  const ta = activeComposer();
  if (!ta) return;
  // 当前内容就是增强结果 → 再点一次还原
  if (state.enhance && state.enhance.value === ta.value) {
    ta.value = state.enhance.base;
    state.enhance = null;
    autosize(ta);
    syncComposer();
    ta.focus();
    toast('已还原原始描述');
    return;
  }
  const base = ta.value.trim();
  if (!base) { toast('先写一句任务描述，再点增强'); ta.focus(); return; }

  const btn = document.querySelector('[data-act="enhance-prompt"]');
  btn?.classList.add('busy');
  setTimeout(() => {
    ta.value = buildEnhanced(base);
    state.enhance = { base, value: ta.value };
    autosize(ta);
    syncComposer();
    ta.focus();
    btn?.classList.remove('busy');
    toast('已增强为结构化提示词，再点一次可还原');
  }, 460);
}

function syncComposer() {
  $$('[data-project-label]').forEach(el => { el.textContent = projectLabel(); });
  $$('[data-model-label]').forEach(el => { el.textContent = modelLabel(); });
  $$('.mode-switch').forEach(el => { el.dataset.modeActive = state.mode; });
  $$('.mode-switch button').forEach(b => {
    const on = b.dataset.mode === state.mode;
    b.classList.toggle('active', on);
    b.setAttribute('aria-pressed', String(on));
  });
  $$('[data-mode-sub]').forEach(el => {
    const changed = el.dataset.modeCur !== state.mode;
    el.innerHTML = modeDescHTML();
    if (changed) {
      el.dataset.modeCur = state.mode;
      el.classList.remove('swap');
      void el.offsetWidth;
      el.classList.add('swap');
    }
  });
  $$('[data-attach]').forEach(el => {
    el.innerHTML = state.attachments.map((f, i) => `
      <span class="attach-chip">
        <span class="ftype">${esc(extOf(f.name))}</span>
        <span class="fname" title="${esc(f.name)}">${esc(f.name)}</span>
        <button data-act="remove-attach" data-idx="${i}" title="移除">${icon('x', 11)}</button>
      </span>`).join('');
  });
  renderVoiceState();
  const liveTa = activeComposer();
  $$('[data-act="voice-input"]').forEach(b => b.classList.toggle('rec', !!state.voice.active));
  $$('[data-act="enhance-prompt"]').forEach(b => {
    b.classList.toggle('on', !!(state.enhance && liveTa && liveTa.value === state.enhance.value));
  });
}

function autosize(el) {
  if (!el) return;
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 240) + 'px';
}

/* ------------------------------ 首页 ------------------------------ */
function renderHome() {
  const recent = [...state.tasks].sort((a, b) => b.createdAt - a.createdAt).slice(0, 4);
  $('#main').innerHTML = `
    ${topbar({ crumb: '<b>主页</b><span class="sep">/</span><span>新的任务</span>', actions: `
      <button class="topbar-btn" data-act="open-palette">${icon('search', 13)}<span>命令</span><kbd style="margin-left:2px">⌘K</kbd></button>` })}
    <div class="scroll">
      <div class="home">
        <div class="home-inner">
          <div class="home-hero">
            <div class="hero-mark"><img src="assets/logo-mark.svg" alt="PlatformX" width="40" height="50" /></div>
            <h1>今天想让 PlatformX 做什么？</h1>
            <div class="hero-modes">
              ${modeSwitchHTML({ cls: 'hero-mode-switch', icons: true })}
              <p class="hero-sub" data-mode-sub>${modeDescHTML()}</p>
            </div>
          </div>

          ${composerHTML({ id: 'composer-home', hideModes: true, placeholder: '描述任务，或直接拖入文件。例如：把这份经营数据整理成 12 页汇报稿…' })}

          <div class="template-grid">
            ${TEMPLATES.map(t => `
              <button class="template-card" data-act="use-template" data-id="${t.id}">
                <div class="tc-head"><span class="mode-dot ${t.mode}"></span><span class="tc-title">${esc(t.title)}</span></div>
                <div class="tc-desc">${esc(t.desc)}</div>
              </button>`).join('')}
          </div>

          <div class="section-title"><span>最近任务</span><span class="grow"></span><button class="mini-btn" data-act="nav" data-route="tasks">全部</button></div>
          <div class="recent-list">
            ${recent.map(t => `
              <button class="recent-row" data-act="open-task" data-id="${t.id}">
                <span class="status-dot ${t.status}"></span>
                <span class="rt-main">
                  <span class="rt-title">${esc(t.title)}</span>
                  <span class="rt-meta">
                    <span>${modeName(t.mode)}</span><span>·</span>
                    <span>${esc((state.models.find(m => m.id === t.model) || {}).name || t.model)}</span>
                    <span>·</span><span>${t.project ? esc((PROJECTS.find(p => p.id === t.project) || {}).name || '') : '无项目'}</span>
                  </span>
                </span>
                <span class="rt-time">${fmtTime(t.createdAt)}</span>
              </button>`).join('')}
          </div>
        </div>
      </div>
    </div>`;
  bindComposer();
  syncComposer();
}

const modeName = id => (MODES.find(m => m.id === id) || {}).name || id;
const taskStatusText = t => (t.status === 'running' ? '执行中' : t.stopped ? '已停止' : '已完成');

/* ------------------------------ 任务视图 ------------------------------ */
function renderTaskView() {
  const task = state.tasks.find(t => t.id === state.currentTaskId);
  if (!task) { navigate('home'); return; }

  $('#main').innerHTML = `
    ${topbar({
      back: true,
      crumb: `<b>${esc(clamp(task.title, 34))}</b><span class="sep">·</span><span class="task-status">${taskStatusText(task)}</span>`,
      actions: `<button class="topbar-btn" data-act="share">${icon('external', 13)}<span>分享</span></button>`
    })}
    <div class="task-view">
      <div class="thread"><div class="thread-inner" id="thread"></div></div>
      <div class="task-composer">${composerHTML({ id: 'composer-task', placeholder: '继续追问，或调整要求…', compact: true })}</div>
    </div>`;

  renderThread(task);
  bindComposer();
  syncComposer();
}

function renderThread(task) {
  const box = $('#thread');
  if (!box) return;
  box.innerHTML = task.messages.map(m => messageHTML(m, task)).join('');
  scrollThread();
}

function messageHTML(m, task) {
  if (m.role === 'user') {
    return `<div class="msg-user">
      <div class="mu-head">${icon('users', 12)}<span>你</span><span>·</span><span>${fmtTime(task.createdAt)}</span></div>
      <div class="mu-body">${esc(m.text)}</div>
    </div>`;
  }

  if (m.role === 'steps') {
    const running = !m.stopped && m.items.some(s => s.state === 'running' || s.state === 'pending');
    const doneCount = m.items.filter(s => s.state === 'done').length;
    return `<div class="steps">
      <div class="steps-head">
        ${m.stopped ? `<span class="tick" style="color:var(--text-3)">${icon('stop', 11)}</span>`
          : running ? '<span class="spin"></span>' : `<span class="tick">${icon('check', 12)}</span>`}
        <span>${m.stopped ? '已停止' : running ? (m.title || '执行中') : `已完成 ${m.items.length} 个步骤`}</span>
        <span class="grow"></span>
        ${running ? `<button class="mini-btn" data-act="stop-task">停止</button>` : (m.stopped ? `<span style="font-size:11.5px;color:var(--text-3)">${doneCount}/${m.items.length} 步完成</span>` : '')}
      </div>
      ${m.items.map(s => `
        <div class="step-row ${s.state}">
          <span class="st-ico">${s.state === 'done' ? `<span class="tick">${icon('check', 12)}</span>` : s.state === 'running' ? '<span class="spin"></span>' : '<span class="st-dot"></span>'}</span>
          <span class="st-label">${esc(s.label)}</span>
          <span class="st-detail">${esc(s.detail || '')}</span>
        </div>`).join('')}
    </div>`;
  }

  return `<div class="msg-ai" data-msg-id="${m.id || ''}">
    <div class="ai-head">
      <span class="ai-avatar">PX</span>
      <span>PlatformX</span><span>·</span>
      <span>${esc((state.models.find(x => x.id === task.model) || {}).name || '模型')}</span>
    </div>
    <div class="ai-body">${md(m.text || '')}</div>
    ${(m.artifacts && m.artifacts.length) ? `<div class="artifacts">
      ${m.artifacts.map(a => `
        <button class="artifact" data-act="open-artifact" data-name="${esc(a.name)}">
          <span class="af-ico">${esc(extOf(a.name))}</span>
          <span><span class="af-name">${esc(a.name)}</span><br><span class="af-meta">${esc(a.size || '')} · 点击查看</span></span>
        </button>`).join('')}
    </div>` : ''}
  </div>`;
}

function scrollThread() {
  const sc = $('.thread');
  if (sc) sc.scrollTop = sc.scrollHeight;
}

/* ------------------------------ 任务执行模拟 ------------------------------ */
function buildPlan(task, prompt) {
  const proj = PROJECTS.find(p => p.id === task.project);
  const atts = task.attachments || [];
  const att = atts[0];
  const model = state.models.find(m => m.id === task.model) || state.models[0];

  if (task.mode === 'dev') {
    const frontend = /页面|界面|组件|样式|前端|ui/i.test(prompt);
    const steps = [
      { label: '检索代码库', detail: proj ? `${proj.name} · ${proj.files} 个文件` : '当前工作区' },
      { label: '读取上下文', detail: frontend ? '4 个组件文件' : '6 个相关模块' },
      { label: '生成补丁', detail: frontend ? '新增 1 个页面，改动 3 处' : '重构 1 个 service，改动 4 处引用' },
      { label: '运行校验', detail: 'npm run build && npm run test' }
    ];
    const code = frontend
      ? `export function TaskTemplates() {\n  const [mode, setMode] = useState<Mode>('office');\n  const list = useMemo(() => TEMPLATES.filter(t => t.mode === mode), [mode]);\n\n  return (\n    <section className="templates">\n      <ModeTabs value={mode} onChange={setMode} />\n      {list.map(t => <TemplateCard key={t.id} {...t} />)}\n    </section>\n  );\n}`
      : `export class RefreshService {\n  private inflight: Promise<Token> | null = null;\n\n  async refresh(): Promise<Token> {\n    // 并发调用复用同一个 Promise，避免刷新风暴\n    if (!this.inflight) {\n      this.inflight = this.request().finally(() => (this.inflight = null));\n    }\n    return this.inflight;\n  }\n}`;

    const answer = `已按你的描述完成改动，涉及 **${frontend ? 4 : 5} 个文件**，核心变更如下：\n\n\`\`\`${frontend ? 'tsx' : 'ts'}\n${code}\n\`\`\`\n\n### 变更点\n\n- ${frontend ? '新增模板列表页与模式切换，复用既有卡片组件' : '把 token 刷新逻辑抽成独立 service，消除 4 处重复实现'}\n- ${frontend ? '补齐空态、加载态与移动端栅格' : '并发刷新复用同一个请求，修复刷新风暴导致的登出问题'}\n- 补充对应单元测试，覆盖成功、失败与并发三类路径\n\n### 校验结果\n\n- \`npm run build\` ✔ 通过（2.1s）\n- \`npm run test\` ✔ ${frontend ? '18' : '32'} passed / 0 failed\n- 类型检查 ✔ 无新增错误\n\n需要我把改动整理成 PR 描述，或者顺带补一份变更说明文档吗？`;

    return {
      steps,
      answer,
      artifacts: [{ name: frontend ? 'task-templates.patch' : 'auth-refresh.patch', type: 'patch', size: '22 KB' }, { name: '改动说明.md', type: 'md', size: '6 KB' }]
    };
  }

  if (task.mode === 'design') {
    const steps = [
      { label: '读取设计规范', detail: '品牌手册 · 24 个 Token' },
      { label: '生成视觉草图', detail: 'image-gen · 3 个方向' },
      { label: '校验对比度', detail: 'WCAG AA 全部通过' },
      { label: '整理提案', detail: 'workbuddy-pptx' }
    ];
    const answer = `三个方向已经出齐，差异集中在**首屏信息密度**和**色彩策略**上，可以直接拿去评审。\n\n### 方向 A · 极简专业\n墨黑底 + 单色留白，首屏只保留一句主张与一个输入框。适合强调「专业、可靠」，风险是记忆点偏弱。\n\n### 方向 B · 技术张力\n深蓝渐变 + 等宽字体标注，首屏用实时滚动的任务流做视觉主体。适合开发者与设计团队，转化路径最短。\n\n### 方向 C · 温暖亲和\n米白底 + 陶土橙点缀，插画化说明流程。适合面向业务部门的办公场景，亲和度高但技术感弱。\n\n### 落地建议\n\n1. 主站用 **A**，保证品牌一致性\n2. 开发者落地页用 **B**，突出能力密度\n3. 行业方案页用 **C**，降低非技术用户的理解成本\n\n配色、字阶与间距已抽成 Token，可直接同步到 \`figma-bridge\` 生成组件库。`;
    return {
      steps,
      answer,
      artifacts: [{ name: '视觉方向提案.pptx', type: 'pptx', size: '18.4 MB' }, { name: 'design-tokens.json', type: 'json', size: '12 KB' }]
    };
  }

  const steps = [
    { label: att ? '读取附件' : '解析任务', detail: att ? `${att.name} · 已索引` : '按描述拆解要素' },
    { label: '检索资料库', detail: '命中 3 份参考资料' },
    { label: '调用技能', detail: 'workbuddy-docx · workbuddy-xlsx' },
    { label: '生成交付物', detail: '导出 2 个文件' }
  ];
  const answer = `已完成初稿，交付物包含一份汇报稿与一份明细表，结论先行、可直接汇报。\n\n### 一、任务理解\n\n- 目标：${clamp(prompt.replace(/\s+/g, ' '), 52)}\n- 口径：沿用${proj ? `「${proj.name}」项目` : '工作区默认'}的统计口径与既有模板\n- 受众：${/汇报|老板|领导|管理层/.test(prompt) ? '管理层，结论前置、控制在一屏内' : '业务同事，保留可追溯的明细'}\n\n### 二、产出结构\n\n1. 封面与摘要：一页讲清结论、依据与建议\n2. 核心分析：按同比 / 环比 / 结构三段展开，异常项单独标注\n3. 结论与动作：3 条可执行建议，附责任人与时间点\n4. 附录：口径说明与数据明细\n\n### 三、需要你确认的点\n\n- 汇报篇幅按 **12 页** 处理，如需精简到 6 页我可以压缩附录\n- 是否要把华东区的异常单独拆一页做归因？\n- 需要同步一份 PDF 版本给到群里吗？`;

  return {
    steps,
    answer,
    artifacts: [{ name: '任务交付物.docx', type: 'docx', size: '2.6 MB' }, { name: '数据明细.xlsx', type: 'xlsx', size: '860 KB' }]
  };
}

async function runTask(task, prompt) {
  const token = Symbol('run');
  task.__run = token;
  task.status = 'running';
  task.messages.push({ role: 'user', text: prompt });

  const plan = buildPlan(task, prompt);
  const stepMsg = {
    role: 'steps',
    title: '正在理解任务',
    items: plan.steps.map(s => ({ label: s.label, detail: s.detail, state: 'pending' }))
  };
  task.messages.push(stepMsg);
  refreshTaskUI(task);
  saveStore();
  await sleep(420);

  for (let i = 0; i < stepMsg.items.length; i++) {
    if (task.__run !== token) return;
    const it = stepMsg.items[i];
    it.state = 'running';
    stepMsg.title = it.label + '…';
    refreshTaskUI(task);
    await sleep(560 + Math.random() * 420);
    if (task.__run !== token) return;
    it.state = 'done';
    refreshTaskUI(task);
  }

  stepMsg.title = '已完成';
  const msg = { id: uid('m'), role: 'assistant', text: '', artifacts: [] };
  task.messages.push(msg);
  refreshTaskUI(task);

  // 真实推理：云服务可用时调用 LLM 流式生成，否则退回本地模板
  const full = await generateAnswer(task, prompt, plan);

  msg.text = full;
  msg.artifacts = plan.artifacts;
  task.status = 'done';
  task.__run = null;
  refreshTaskUI(task);
  renderContext();
  renderNav();
  saveStore();
  pushCloudTask(task);

  const last = $(`[data-msg-id="${msg.id}"] .ai-body`);
  if (last) last.innerHTML = md(msg.text);
  const st = $('.task-status');
  if (st) st.textContent = taskStatusText(task);
  scrollThread();
  toast('任务完成，产出已生成');
}

/* 生成任务答案：优先调用云服务 LLM（流式），失败/不可用则退回本地模板逐字输出 */
async function generateAnswer(task, prompt, plan) {
  // 云服务可用且已登录时，走真实 LLM
  if (CLOUD.ready && CLOUD.authed) {
    try {
      const answer = await llmStream(task, prompt, plan);
      if (answer) return answer;
    } catch (e) {
      console.warn('[PlatformX] LLM 调用失败，回退本地模板：', e && e.message);
    }
  }
  // 本地模板逐字输出（原有演示逻辑）
  return typewriteLocal(task, plan.answer);
}

/* 调用云服务 LLM，流式输出到消息气泡 */
async function llmStream(task, prompt, plan) {
  const modeName = ({ office: '办公', dev: '开发', design: '设计' })[task.mode] || '办公';
  const model = state.models.find(m => m.id === task.model) || state.models[0];
  const systemPrompt = `你是 PlatformX 工作台的${modeName}助手，帮助用户完成真实任务。请给出专业、结构清晰、可执行的中文回答，使用 Markdown 格式。`;
  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: prompt }
  ];

  const msgEl = $(`.ai-body`) || null;
  let full = '';
  const msg = task.messages[task.messages.length - 1];

  for await (const chunk of cloud.llm.chat.completions.create({
    model: model.id,
    messages,
    stream: true,
    conversationId: 'task-' + task.id
  })) {
    const delta = chunk.choices && chunk.choices[0] && chunk.choices[0].delta;
    const content = delta && delta.content;
    if (content) {
      full += content;
      msg.text = full;
      const body = $(`[data-msg-id="${msg.id}"] .ai-body`);
      if (body) {
        body.innerHTML = md(full) + '<span class="typing-caret"></span>';
        scrollThread();
      }
    }
  }

  msg.text = full;
  return full || null;
}

/* 本地模板逐字输出（原有演示逻辑，返回完整文本） */
async function typewriteLocal(task, full) {
  const token = task.__run;
  const msg = task.messages[task.messages.length - 1];
  let n = 0;
  while (n < full.length) {
    if (task.__run !== token) return full;
    n = Math.min(full.length, n + 8 + Math.floor(Math.random() * 9));
    msg.text = full.slice(0, n);
    const body = $(`[data-msg-id="${msg.id}"] .ai-body`);
    if (body) {
      body.innerHTML = md(msg.text) + '<span class="typing-caret"></span>';
      scrollThread();
    }
    await sleep(16);
  }
  msg.text = full;
  return full;
}

function refreshTaskUI(task) {
  if (state.route === 'task' && state.currentTaskId === task.id) renderThread(task);
}

/* ------------------------------ 集合视图 ------------------------------ */
function pageHead(title, desc, actions = '') {
  return `<div class="page-head">
    <div><h2>${title}</h2><p>${desc}</p></div>
    <div class="grow"></div>
    <div style="display:flex;gap:8px">${actions}</div>
  </div>`;
}

function filterBar(items, current, searchPlaceholder = '搜索…') {
  return `<div class="filter-bar">
    ${items.map(x => `<button class="filter-chip ${current === x ? 'active' : ''}" data-act="filter" data-value="${esc(x)}">${esc(x)}</button>`).join('')}
    <span class="grow"></span>
    <label class="inline-search">${icon('search', 13)}<input data-act="search" placeholder="${esc(searchPlaceholder)}" value="${esc(state.query)}" /></label>
  </div>`;
}

function renderCollection(kind) {
  const cfg = {
    experts: { title: '专家', desc: '面向具体岗位的成品角色包，内置方法论、技能与交付模板。', action: `<button class="ghost-btn" data-act="noop">${icon('search', 13)} 从市场发现</button>`, items: EXPERTS, cats: ['全部', '办公', '开发', '设计', '数据', '营销', '运营', '金融与法务', '教育与研究'] },
    skills: { title: '技能', desc: '可被任务调用的原子能力，决定 PlatformX 能操作哪些工具与格式。', action: `<button class="ghost-btn" data-act="noop">${icon('download', 13)} 导入自定义技能</button>`, items: SKILLS, cats: ['全部', '办公', '开发', '设计', '数据', 'AI 与模型', '自动化', '通信与协作', '系统与运维'] },
    connectors: { title: '连接器', desc: '把工作台接到你已有的系统上：文档、代码库、设计稿与数据库。', action: `<button class="ghost-btn" data-act="noop">${icon('plus', 13)} 添加自定义连接器</button>`, items: CONNECTORS, cats: ['全部', '协作', '文档', '开发', '数据', 'AI 与模型', '部署与云', '业务'] }
  }[kind];

  const activeSet = kind === 'experts' ? store.experts : kind === 'skills' ? store.skills : store.connectors;
  const q = state.query.trim().toLowerCase();
  const list = cfg.items.filter(it => {
    const catOk = state.filter === '全部' || it.cat === state.filter;
    const qOk = !q || (it.name + (it.label || '') + it.desc).toLowerCase().includes(q);
    return catOk && qOk;
  });

  $('#main').innerHTML = `
    ${topbar({ crumb: `<b>${cfg.title}</b><span class="sep">/</span><span>${list.length} 项</span>` })}
    <div class="scroll"><div class="page">
      ${pageHead(cfg.title, cfg.desc, cfg.action)}
      ${filterBar(cfg.cats, state.filter, '按名称或描述搜索')}
      ${list.length ? `<div class="card-grid">${list.map(it => kind === 'connectors' ? connectorCard(it, activeSet) : capabilityCard(it, kind, activeSet)).join('')}</div>`
        : `<div class="empty-state"><div class="es-ico">${icon('search', 18)}</div><span>没有匹配的结果，试试换个关键词</span></div>`}
    </div></div>`;
}

function capabilityCard(it, kind, activeSet) {
  const on = activeSet.includes(it.id);
  const capIcon = kind === 'skills' ? skillIcon(it.label) : expertIcon(it.name);
  return `<div class="card">
    <div class="card-top">
      <div class="card-ico ${it.tone || ''}">${icon(capIcon, 15)}</div>
      <div>
        <div class="card-name">${esc(kind === 'skills' ? it.label : it.name)}</div>
        <div class="card-sub">${kind === 'skills' ? esc(it.name) : esc(it.cat)}${it.ver ? ' · v' + it.ver : ''}${it.runs ? ' · ' + (it.runs / 1000).toFixed(1) + 'k 次调用' : ''}</div>
      </div>
    </div>
    <div class="card-desc">${esc(it.desc)}</div>
    <div class="card-tags">${(it.skills || it.tools || []).map(s => `<span class="tag">${esc(s)}</span>`).join('')}</div>
    <div class="card-foot">
      <span class="meta">${on ? '已启用' : '未启用'}</span>
      <span class="grow"></span>
      ${on
        ? `<button class="small-btn danger" data-act="${kind === 'experts' ? 'uninstall-expert' : 'uninstall-skill'}" data-id="${it.id}">移除</button>
           <button class="small-btn solid" data-act="use-capability" data-id="${it.id}" data-kind="${kind}">使用</button>`
        : `<button class="small-btn solid" data-act="${kind === 'experts' ? 'install-expert' : 'install-skill'}" data-id="${it.id}">${kind === 'experts' ? '添加专家' : '启用技能'}</button>`}
    </div>
  </div>`;
}

function connectorCard(it, activeSet) {
  const on = activeSet.includes(it.id);
  return `<div class="card">
    <div class="card-top">
      <div class="card-ico ${on ? 'blue' : ''}">${brandBadge(it.name, 16)}</div>
      <div>
        <div class="card-name">${esc(it.name)}</div>
        <div class="card-sub">${esc(it.cat)} · ${esc(it.auth)}</div>
      </div>
      <span class="grow"></span>
      ${on ? '<span class="badge-on">已连接</span>' : ''}
    </div>
    <div class="card-desc">${esc(it.desc)}</div>
    <div class="card-foot">
      <span class="meta">${on ? esc(it.account || '已授权') : '未授权'}</span>
      <span class="grow"></span>
      ${on
        ? `<button class="small-btn danger" data-act="disconnect" data-id="${it.id}">断开</button>`
        : `<button class="small-btn solid" data-act="connect" data-id="${it.id}">连接</button>`}
    </div>
  </div>`;
}

/* ------------------------------ 项目 ------------------------------ */
function renderProjects() {
  const q = state.query.trim().toLowerCase();
  const list = PROJECTS.filter(p => !q || (p.name + p.desc + p.repo).toLowerCase().includes(q));
  $('#main').innerHTML = `
    ${topbar({ crumb: `<b>项目</b><span class="sep">/</span><span>${PROJECTS.length} 个</span>` })}
    <div class="scroll"><div class="page">
      ${pageHead('项目', '把代码库、资料与任务放进同一个上下文，任务可以直接读写项目文件。', `<button class="primary-btn" data-act="new-task">${icon('plus', 13)} 新建项目</button>`)}
      <div class="filter-bar">
        <button class="filter-chip active">全部</button>
        <button class="filter-chip" data-act="noop">进行中</button>
        <button class="filter-chip" data-act="noop">已归档</button>
        <span class="grow"></span>
        <label class="inline-search">${icon('search', 13)}<input data-act="search" placeholder="搜索项目" value="${esc(state.query)}" /></label>
      </div>
      <div class="card-grid">
        ${list.map(p => {
          const taskCount = state.tasks.filter(t => t.project === p.id).length;
          return `<div class="card project-card">
            <div class="pc-bar" style="background:linear-gradient(90deg,hsl(${p.hue} 62% 58%),hsl(${p.hue} 62% 58% / .15))"></div>
            <div class="card-top">
              <div class="card-ico" style="color:hsl(${p.hue} 70% 70%);background:hsl(${p.hue} 60% 12%);border-color:hsl(${p.hue} 50% 30% / .5)">${esc(p.name.slice(0, 1).toUpperCase())}</div>
              <div>
                <div class="card-name">${esc(p.name)}</div>
                <div class="card-sub">${esc(p.lang)} · ${esc(p.branch)}</div>
              </div>
            </div>
            <div class="card-desc">${esc(p.desc)}</div>
            <div class="pc-stats"><span><b>${p.files}</b> 文件</span><span><b>${taskCount}</b> 任务</span><span><b>${p.tasks}</b> 提交</span></div>
            <div class="card-foot">
              <span class="meta">${esc(p.repo)}</span>
              <span class="grow"></span>
              <button class="small-btn" data-act="open-project" data-id="${p.id}">详情</button>
              <button class="small-btn solid" data-act="new-task-in-project" data-id="${p.id}">新建任务</button>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div></div>`;
}

/* ------------------------------ 资料库 ------------------------------ */
function renderLibrary() {
  const cols = ['全部', ...new Set(state.docs.map(d => d.collection))];
  const q = state.query.trim().toLowerCase();
  const list = state.docs.filter(d => (state.docFilter === '全部' || d.collection === state.docFilter) && (!q || d.name.toLowerCase().includes(q)));

  $('#main').innerHTML = `
    ${topbar({ crumb: `<b>资料库</b><span class="sep">/</span><span>${state.docs.length} 份资料</span>` })}
    <div class="scroll"><div class="page">
      ${pageHead('资料库', '任务会自动检索这里的文档与数据，作为回答的依据；也可以手动 @ 引用。', `<button class="ghost-btn" data-act="upload-doc">${icon('plus', 13)} 上传资料</button>`)}
      ${filterBar(cols.slice(0, 7), state.docFilter, '搜索文件名')}
      <div class="row-list">
        ${list.map(d => `
          <div class="row">
            <span class="r-ico">${esc(extOf(d.name))}</span>
            <div class="r-main">
              <div class="r-name">${esc(d.name)}</div>
              <div class="r-meta"><span>${esc(d.collection)}</span><span>${esc(d.size)}</span><span>${esc(d.owner)}</span>${(d.tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
            </div>
            <div class="r-right">
              <span class="r-time">${esc(d.updated)}</span>
              <button class="icon-btn ${d.starred ? 'star on' : 'star'}" data-act="star-doc" data-id="${d.id}" title="收藏">${icon('star', 14)}</button>
              <button class="small-btn" data-act="open-doc" data-id="${d.id}">预览</button>
            </div>
          </div>`).join('') || `<div class="empty-state"><div class="es-ico">${icon('database', 18)}</div><span>还没有资料，上传一份试试</span></div>`}
      </div>
    </div></div>`;
}

/* ------------------------------ 任务列表 ------------------------------ */
function renderTasks() {
  const q = state.query.trim().toLowerCase();
  const list = state.tasks
    .filter(t => (state.filter === '全部' || modeName(t.mode) === state.filter) && (!q || t.title.toLowerCase().includes(q)))
    .sort((a, b) => b.createdAt - a.createdAt);

  $('#main').innerHTML = `
    ${topbar({ crumb: `<b>任务</b><span class="sep">/</span><span>${state.tasks.length} 个</span>` })}
    <div class="scroll"><div class="page">
      ${pageHead('任务', '所有任务都在工作区里留痕，可回溯执行步骤、产出文件与引用的资料。', `<button class="primary-btn" data-act="new-task">${icon('plus', 13)} 新建任务</button>`)}
      ${filterBar(['全部', '办公', '开发', '设计'], state.filter, '搜索任务标题')}
      <div class="row-list">
        ${list.map(t => `
          <button class="row" data-act="open-task" data-id="${t.id}">
            <span class="status-dot ${t.status}"></span>
            <div class="r-main">
              <div class="r-name">${esc(t.title)}</div>
              <div class="r-meta">
                <span>${modeName(t.mode)}</span>
                <span>${esc((state.models.find(m => m.id === t.model) || {}).name || '')}</span>
                <span>${t.project ? esc((PROJECTS.find(p => p.id === t.project) || {}).name || '') : '无项目'}</span>
                <span>${t.messages.length} 条消息</span>
              </div>
            </div>
            <div class="r-right">
              <span class="r-time">${fmtTime(t.createdAt)}</span>
              ${icon('chevronRight', 14)}
            </div>
          </button>`).join('') || `<div class="empty-state"><div class="es-ico">${icon('clock', 18)}</div><span>还没有任务</span></div>`}
      </div>
    </div></div>`;
}

/* ------------------------------ 自动化 ------------------------------ */
function renderAutomations() {
  const list = AUTOMATIONS.map(a => ({ ...a, on: (store.automations.find(x => x.id === a.id) || a).on }));
  $('#main').innerHTML = `
    ${topbar({ crumb: `<b>自动化</b><span class="sep">/</span><span>${list.filter(a => a.on).length} 个运行中</span>` })}
    <div class="scroll"><div class="page">
      ${pageHead('自动化', '把重复的任务交给时间表：定时汇总、定期巡检、事件触发，结果直接落到群里或文档里。', `<button class="primary-btn" data-act="noop">${icon('plus', 13)} 新建自动化</button>`)}
      <div class="row-list">
        ${list.map(a => `
          <div class="row">
            <span class="r-ico">${icon('repeat', 14)}</span>
            <div class="r-main">
              <div class="r-name">${esc(a.name)}</div>
              <div class="r-meta"><span>${esc(a.schedule)}</span><span>${esc(a.last)}</span></div>
              <div class="r-meta" style="color:var(--text-3)">${esc(a.desc)}</div>
            </div>
            <div class="r-right">
              <button class="small-btn ${a.on ? 'solid' : ''}" data-act="toggle-automation" data-id="${a.id}">${a.on ? '运行中' : '已暂停'}</button>
            </div>
          </div>`).join('')}
      </div>
    </div></div>`;
}

/* ------------------------------ 套餐与积分 ------------------------------ */
function renderPlans() {
  const plan = planMeta();
  const taskCount = state.tasks.length;
  const maxTasks = planTaskLimit();
  const usedPct = maxTasks === Infinity ? 0 : Math.min(100, Math.round(taskCount / maxTasks * 100));
  const cycle = billingCycle();

  $('#main').innerHTML = `
    ${topbar({ crumb: `<b>套餐与积分</b><span class="sep">/</span><span>${plan.name}</span>` })}
    <div class="scroll"><div class="page">
      ${pageHead('套餐与积分', '积分用于执行任务与调用高级能力，套餐决定额度与并发上限。')}

      <div class="billing-hero">
        <div class="bh-left">
          <div class="bh-label">当前套餐</div>
          <div class="bh-plan">${esc(plan.name)}<span class="bh-tag">${esc(plan.tag)}</span></div>
          <div class="bh-desc">${esc(plan.desc)}</div>
        </div>
        <div class="bh-right">
          <div class="bh-credit">
            <span class="bh-coin">${icon('coin', 20)}</span>
            <div class="bh-credit-main">
              <div class="bh-credit-num">${store.credits}</div>
              <div class="bh-credit-label">可用积分</div>
            </div>
          </div>
          <button class="primary-btn" data-act="open-recharge">${icon('plus', 13)} 充值积分</button>
        </div>
      </div>

      <div class="billing-usage">
        <div class="bu-row">
          <span class="bu-name">任务额度</span>
          <span class="bu-val">${maxTasks === Infinity ? '不限' : `${taskCount} / ${maxTasks}`}</span>
        </div>
        <div class="usage-bar"><i style="width:${usedPct}%"></i></div>
        <div class="bu-row">
          <span class="bu-name">并发任务</span>
          <span class="bu-val">${plan.limits.maxConcurrent === Infinity ? '不限' : plan.limits.maxConcurrent + ' 个'}</span>
        </div>
        <div class="bu-row">
          <span class="bu-name">单次任务成本</span>
          <span class="bu-val">${taskCost() === 0 ? '免积分' : taskCost() + ' 积分'}</span>
        </div>
      </div>

      <div class="section-title"><span>升级套餐</span><span class="grow"></span>
        <div class="cycle-switch">
          <button class="cycle-btn ${cycle === 'month' ? 'active' : ''}" data-act="set-cycle" data-id="month">月付</button>
          <button class="cycle-btn ${cycle === 'year' ? 'active' : ''}" data-act="set-cycle" data-id="year">年付 · 省更多</button>
        </div>
      </div>
      <div class="plan-grid">
        ${PLANS.map(p => {
          const price = cycle === 'year' ? p.priceYear : p.price;
          const period = cycle === 'year' ? '年' : '月';
          const per = p.price === 0 ? '永久' : `${cycle === 'year' ? '年' : '月'}付`;
          const save = cycle === 'year' && p.price > 0 ? p.price * 12 - p.priceYear : 0;
          return `
          <div class="plan-card ${p.id === plan.id ? 'current' : ''} ${p.highlight ? 'highlight' : ''}">
            ${p.highlight ? `<div class="plan-ribbon">最受欢迎</div>` : ''}
            <div class="plan-head">
              <div class="plan-name">${icon(p.id === 'pro' ? 'crown' : p.id === 'standard' ? 'bolt' : 'gem', 16)}${esc(p.name)}</div>
              ${p.tag ? `<span class="plan-tag">${esc(p.tag)}</span>` : ''}
            </div>
            <div class="plan-price">
              ${p.price === 0 ? `<span class="plan-amount">免费</span>` : `<span class="plan-amount">¥${price}</span><span class="plan-period">/ ${period}</span>`}
            </div>
            <div class="plan-credit">
              ${p.price === 0 ? '每月 ' + p.credits + ' 积分' : `${per} · 每月 ${p.credits} 积分`}
              ${save > 0 ? `<span class="plan-save">省 ¥${save}</span>` : ''}
            </div>
            <ul class="plan-features">
              ${p.features.map(f => `<li>${icon('check', 12)}${esc(f)}</li>`).join('')}
            </ul>
            <button class="plan-btn ${p.id === plan.id ? 'ghost-btn' : (p.highlight ? 'primary-btn' : 'ghost-btn')}" data-act="switch-plan" data-id="${p.id}" ${p.id === plan.id ? 'disabled' : ''}>
              ${p.id === plan.id ? '当前套餐' : p.price === 0 ? '立即开通' : '立即购买'}
            </button>
          </div>`;
        }).join('')}
      </div>

      <div class="section-title"><span>积分充值</span><span class="grow"></span><span class="bh-note">支持微信支付 / 支付宝扫码</span></div>
      <div class="credit-pack-grid">
        ${CREDIT_PACKS.map(c => `
          <button class="credit-pack" data-act="buy-credits" data-id="${c.id}">
            <div class="cp-amount">${icon('coin', 15)}${c.credits}</div>
            <div class="cp-price">¥${c.price}${c.tag ? `<span class="cp-tag">${esc(c.tag)}</span>` : ''}</div>
          </button>`).join('')}
      </div>

      <div class="section-title"><span>积分明细</span></div>
      <div class="panel">
        ${store.creditLog.length ? `<div class="credit-log">
          ${store.creditLog.map(l => `
            <div class="cl-row">
              <span class="cl-delta ${l.delta > 0 ? 'in' : 'out'}">${l.delta > 0 ? '+' + l.delta : l.delta}</span>
              <span class="cl-note">${esc(l.note)}</span>
              <span class="grow"></span>
              <span class="cl-time">${fmtTime(l.at)}</span>
            </div>`).join('')}
        </div>` : `<div class="empty-state"><div class="es-ico">${icon('coin', 18)}</div><span>暂无积分变动记录</span></div>`}
      </div>
    </div></div>`;
}

function scrollToRecharge() {
  const target = $('.credit-pack-grid');
  if (!target) return;
  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/* ------------------------------ 设置 ------------------------------ */
function renderSettings() {
  const tabs = [['model', '模型与网关'], ['data', '资料与存储'], ['about', '关于 PlatformX']];
  const s = store.settings;

  const panels = {
    model: `
      <div class="panel">
        <h3>默认模型</h3>
        <div class="panel-sub">新任务默认使用该模型，任务内可随时切换。</div>
        <div class="field">
          <label>模型</label>
          <select data-setting="model">
            ${state.models.map(m => `<option value="${m.id}" ${m.id === state.model ? 'selected' : ''}>${esc(m.name)} · ${esc(m.org)} · ${esc(m.ctx)}</option>`).join('')}
          </select>
          <div class="hint">${MODELS.length} 个内置开源模型 + ${(store.customModels || []).length} 个自定义模型。</div>
        </div>
        <div class="field-row">
          <div class="field"><label>温度</label><input data-setting="temperature" value="${s.temperature}" /></div>
          <div class="field"><label>最大输出 tokens</label><input data-setting="maxTokens" value="${s.maxTokens}" /></div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-head">
          <div>
            <h3>自定义模型</h3>
            <div class="panel-sub">接入任意 OpenAI 兼容网关，配置后即可在模型下拉里直接选用。</div>
          </div>
          <button class="small-btn solid" data-act="add-model">${icon('plus', 13)}添加模型</button>
        </div>
        ${(store.customModels || []).length ? `<div class="cm-list">${store.customModels.map(m => {
          const st = statusMeta(m);
          return `<div class="cm-row">
            <span class="cm-dot ${st.cls}" title="${esc(st.text)}"></span>
            <div class="cm-main">
              <div class="cm-name">${esc(m.name)}<span class="cm-badge">自定义</span>${m.id === state.model ? '<span class="cm-cur">当前</span>' : ''}</div>
              <div class="cm-sub">${esc(m.model)} · ${esc(m.baseUrl)}</div>
            </div>
            <div class="cm-meta">${esc(st.text)}</div>
            <button class="small-btn" data-act="test-model" data-id="${m.id}">测试</button>
            <button class="small-btn" data-act="edit-model" data-id="${m.id}">编辑</button>
            <button class="icon-btn cm-del" data-act="del-model" data-id="${m.id}" title="删除">${icon('trash', 14)}</button>
          </div>`;
        }).join('')}</div>` : `<div class="cm-empty">还没有自定义模型。可以接入 DeepSeek、百炼、Kimi、智谱，或本机的 Ollama / vLLM 网关。</div>`}
      </div>
      <div class="panel">
        <h3>推理网关</h3>
        <div class="panel-sub">未指定自定义模型时，任务走这里的默认网关。</div>
        <div class="field"><label>Base URL</label><input data-setting="baseUrl" value="${esc(s.baseUrl)}" /></div>
        <div class="field"><label>API Key</label><input data-setting="apiKey" value="${esc(s.apiKey)}" type="password" /><div class="hint">密钥仅保存在本机，不会上传。</div></div>
      </div>`,
    data: `
      <div class="panel">
        <h3>工作区</h3>
        <div class="panel-sub">任务读写文件、执行命令的根目录。</div>
        <div class="field"><label>路径</label><input data-setting="workspace" value="${esc(s.workspace)}" /></div>
        <div class="kv-list">
          <div class="kv-row"><span class="k">资料库</span><span class="v">${state.docs.length} 份 · 本地索引</span><button class="small-btn" data-act="noop">重建索引</button></div>
          <div class="kv-row"><span class="k">任务留存</span><span class="v">本地存储，最多保留 200 条</span><button class="small-btn danger" data-act="clear-tasks">清空任务</button></div>
        </div>
      </div>`,
    about: `
      <div class="panel">
        <div class="about-lockup">
          <img class="about-mark" src="assets/logo-mark.svg" alt="" width="37" height="46" />
          <div class="about-name">
            <img class="about-wordmark" src="assets/logo-wordmark.png" alt="PlatformX" />
            <span class="about-tag">开源模型驱动的办公 / 开发 / 设计工作台</span>
          </div>
        </div>
        <div class="kv-list">
          <div class="kv-row"><span class="k">版本</span><span class="v">2.2.0 (stable)</span></div>
          <div class="kv-row"><span class="k">云服务</span><span class="v">${CLOUD.ready ? '已连接 · 数据云端同步' : '未就绪'}</span></div>
          <div class="kv-row"><span class="k">登录状态</span><span class="v">${CLOUD.authed ? '已登录' : '未登录'}</span></div>
          <div class="kv-row"><span class="k">当前套餐</span><span class="v">${esc(planMeta().name)} · ${store.credits} 积分</span><button class="small-btn" data-act="nav" data-route="plans">查看</button></div>
          <div class="kv-row"><span class="k">可用模型</span><span class="v">${state.models.length} 个开源权重模型</span></div>
          <div class="kv-row"><span class="k">已装技能</span><span class="v">${store.skills.length} 个</span></div>
          <div class="kv-row"><span class="k">已连连接器</span><span class="v">${store.connectors.length} 个</span></div>
          <div class="kv-row"><span class="k">专家</span><span class="v">${store.experts.length} 个</span></div>
        </div>
      </div>`
  };

  $('#main').innerHTML = `
    ${topbar({ crumb: `<b>设置</b><span class="sep">/</span><span>${tabs.find(t => t[0] === state.settingsTab)[1]}</span>` })}
    <div class="scroll"><div class="page">
      ${pageHead('设置', '模型、网关与本地数据都在这里管理。')}
      <div class="settings-grid">
        <div class="settings-nav">
          ${tabs.map(([id, label]) => `<button class="${state.settingsTab === id ? 'active' : ''}" data-act="settings-tab" data-tab="${id}">${label}</button>`).join('')}
        </div>
        <div>${panels[state.settingsTab]}</div>
      </div>
    </div></div>`;
}

/* ------------------------------ 上下文面板 ------------------------------ */
function renderContext() {
  const el = $('#context');
  if (!state.contextOpen) { el.classList.add('hidden'); return; }
  el.classList.remove('hidden');

  const task = state.tasks.find(t => t.id === state.currentTaskId);
  const isTask = state.route === 'task' && task;

  const artifacts = isTask
    ? task.messages.flatMap(m => m.artifacts || [])
    : [{ name: 'Q3 经营分析汇报.pptx', size: '6.8 MB' }, { name: '视觉方向提案.pptx', size: '18.4 MB' }];

  const ctxTab = state.contextTab;

  el.innerHTML = `
    <div class="ctx-head">
      <div class="tabs">
        <button class="${ctxTab === 'ctx' ? 'active' : ''}" data-act="ctx-tab" data-tab="ctx">上下文</button>
        <button class="${ctxTab === 'art' ? 'active' : ''}" data-act="ctx-tab" data-tab="art">产物</button>
      </div>
      <span class="grow"></span>
      <button class="icon-btn" data-act="toggle-context" title="收起">${icon('x', 14)}</button>
    </div>
    <div class="ctx-body">
      ${ctxTab === 'art' ? `
        <div class="ctx-group">
          <div class="ctx-title"><span>本任务产物</span><span class="grow"></span><span>${artifacts.length}</span></div>
          ${artifacts.length ? artifacts.map(a => `
            <button class="ctx-item" data-act="open-artifact" data-name="${esc(a.name)}">
              <span class="ci-ico">${esc(extOf(a.name))}</span>
              <span class="ci-name">${esc(a.name)}</span>
              <span class="ci-meta">${esc(a.size || '')}</span>
            </button>`).join('') : '<div class="ctx-empty">还没有产物</div>'}
        </div>
        <div class="ctx-group">
          <div class="ctx-title"><span>最近产物</span></div>
          ${['季度汇报模板.pptx', '客户交付手册.docx', 'design-tokens.json'].map(n => `
            <button class="ctx-item" data-act="open-artifact" data-name="${esc(n)}">
              <span class="ci-ico">${esc(extOf(n))}</span><span class="ci-name">${esc(n)}</span>
            </button>`).join('')}
        </div>` : `
        ${isTask ? `
        <div class="ctx-group">
          <div class="ctx-title"><span>任务信息</span></div>
          <div class="ctx-task-meta">
            <div class="row-kv"><span>模式</span><span>${modeName(task.mode)}</span></div>
            <div class="row-kv"><span>模型</span><span>${esc((state.models.find(m => m.id === task.model) || {}).name || '')}</span></div>
            <div class="row-kv"><span>项目</span><span>${task.project ? esc((PROJECTS.find(p => p.id === task.project) || {}).name || '') : '无'}</span></div>
            <div class="row-kv"><span>状态</span><span>${task.status === 'running' ? '执行中' : '已完成'}</span></div>
            <div class="row-kv"><span>创建</span><span>${fmtTime(task.createdAt)}</span></div>
          </div>
        </div>` : `
        <div class="ctx-group">
          <div class="ctx-title"><span>工作区</span></div>
          <div class="ctx-task-meta">
            <div class="row-kv"><span>项目</span><span>${state.project ? esc(projectLabel()) : '未绑定'}</span></div>
            <div class="row-kv"><span>默认模型</span><span>${esc(modelLabel())}</span></div>
            <div class="row-kv"><span>资料库</span><span>${state.docs.length} 份已索引</span></div>
            <div class="row-kv"><span>专家</span><span>${store.experts.length} 个已添加</span></div>
            <div class="row-kv"><span>连接器</span><span>${store.connectors.length} 个已连接</span></div>
          </div>
        </div>`}

        <div class="ctx-group">
          <div class="ctx-title"><span>附件</span><span class="grow"></span><span>${(isTask ? task.attachments : state.attachments).length}</span></div>
          ${(isTask ? task.attachments : state.attachments).length
            ? (isTask ? task.attachments : state.attachments).map(f => `
              <div class="ctx-item"><span class="ci-ico">${esc(extOf(f.name))}</span><span class="ci-name">${esc(f.name)}</span></div>`).join('')
            : '<div class="ctx-empty">拖入文件即可引用</div>'}
        </div>

        <div class="ctx-group">
          <div class="ctx-title"><span>已启用的能力</span><span class="grow"></span><button class="mini-btn" data-act="nav" data-route="skills">管理</button></div>
          ${store.skills.slice(0, 4).map(id => {
            const s = SKILLS.find(x => x.id === id);
            return s ? `<button class="ctx-item" data-act="nav" data-route="skills"><span class="ci-ico">${esc(s.label.slice(0, 2))}</span><span class="ci-name">${esc(s.label)}</span><span class="ci-meta">v${esc(s.ver)}</span></button>` : '';
          }).join('')}
          ${store.experts.slice(0, 2).map(id => {
            const e = EXPERTS.find(x => x.id === id);
            return e ? `<button class="ctx-item" data-act="nav" data-route="experts"><span class="ci-ico" style="color:var(--design)">${esc(e.initial)}</span><span class="ci-name">${esc(e.name)}</span></button>` : '';
          }).join('')}
        </div>

        <div class="ctx-group">
          <div class="ctx-title"><span>已连接的连接器</span><span class="grow"></span><button class="mini-btn" data-act="nav" data-route="connectors">管理</button></div>
          ${store.connectors.map(id => {
            const c = CONNECTORS.find(x => x.id === id);
            return c ? `<button class="ctx-item" data-act="nav" data-route="connectors"><span class="ci-ico">${esc(c.name.slice(0, 1))}</span><span class="ci-name">${esc(c.name)}</span><span class="ci-meta">在线</span></button>` : '';
          }).join('') || '<div class="ctx-empty">还没有连接任何系统</div>'}
        </div>`}
    </div>`;
}

/* ------------------------------ 路由 ------------------------------ */
function navigate(route, opts = {}) {
  state.route = route;
  state.query = '';
  if (route !== 'library') state.docFilter = '全部';
  if (route !== 'tasks') state.filter = '全部';

  if (route === 'task') {
    state.currentTaskId = opts.id;
    state.attachments = [];
    const t = state.tasks.find(x => x.id === opts.id);
    if (t) { state.model = t.model; state.project = t.project || null; }
  }

  renderNav();
  switch (route) {
    case 'home': renderHome(); break;
    case 'task': renderTaskView(); break;
    case 'tasks': renderTasks(); break;
    case 'projects': renderProjects(); break;
    case 'library': renderLibrary(); break;
    case 'experts':
    case 'skills':
    case 'connectors': renderCollection(route); break;
    case 'automations': renderAutomations(); break;
    case 'plans': renderPlans(); break;
    case 'settings': renderSettings(); break;
    default: renderHome();
  }
  renderContext();
  closePopover();

  try {
    const h = '#/' + (route === 'task' ? 'task/' + opts.id : route);
    if (location.hash !== h) history.replaceState(null, '', h);
  } catch (_) { /* file:// 下忽略 */ }
}

/* ------------------------------ 输入器绑定 ------------------------------ */
function bindComposer() {
  const ta = $('#composer-home') || $('#composer-task');
  if (!ta) return;
  stopVoice(true);
  state.enhance = null;
  ta.value = '';
  autosize(ta);
  ta.addEventListener('input', () => autosize(ta));
  ta.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      send();
    }
  });
  ta.addEventListener('paste', e => {
    const files = [...(e.clipboardData?.files || [])];
    if (files.length) { addFiles(files); e.preventDefault(); }
  });
  setTimeout(() => ta.focus(), 40);

  function send() {
    if (state.voice.active) finishVoice();
    const text = ta.value.trim();
    if (!text) { toast('先描述一下任务内容'); ta.focus(); return; }
    ta.value = '';
    state.enhance = null;
    autosize(ta);
    submit(text);
  }
  state.__send = send;
}

function submit(text) {
  if (state.route === 'task') {
    const task = state.tasks.find(t => t.id === state.currentTaskId);
    if (!task) return;
    if (state.attachments.length) {
      task.attachments = [...(task.attachments || []), ...state.attachments];
      state.attachments = [];
    }
    if (task.status === 'running') { toast('任务正在执行，请稍候'); return; }
    if (!ensureBilling()) return;
    runTask(task, text);
    return;
  }

  if (!ensureBilling()) return;

  const task = {
    id: uid('task'),
    title: clamp(text.replace(/\s+/g, ' '), 28),
    mode: state.mode,
    model: state.model,
    project: state.project,
    status: 'running',
    createdAt: Date.now(),
    attachments: [...state.attachments],
    messages: []
  };
  state.tasks.unshift(task);
  state.attachments = [];
  saveStore();
  pushCloudTask(task);
  navigate('task', { id: task.id });
  runTask(task, text);
}

/* 提交任务前的套餐与积分校验；通过则扣积分并返回 true，否则弹引导并返回 false */
function ensureBilling() {
  const plan = planMeta();
  const cost = taskCost();

  // 任务数限额（体验版/标准版）
  const maxTasks = planTaskLimit();
  if (maxTasks !== Infinity && state.tasks.length >= maxTasks) {
    openUpgradeModal(`「${plan.name}」最多保留 ${maxTasks} 个任务，已达上限`, '升级套餐即可解除任务数限制。');
    return false;
  }

  // 积分余额校验（专业版免积分）
  if (cost > 0 && store.credits < cost) {
    openUpgradeModal(`积分不足（需 ${cost} 积分，当前 ${store.credits}）`, '充值积分或升级到专业版（免积分）后继续。');
    return false;
  }

  if (cost > 0) spendCredits(cost, '执行任务');
  return true;
}

function openUpgradeModal(title, desc) {
  openModal({
    title,
    desc,
    body: `<div class="upgrade-hint">
      <div class="uh-ico">${icon('gem', 22)}</div>
      <div class="uh-text">升级套餐可获得更多积分与更高任务额度，专业版执行任务不扣积分。</div>
    </div>`,
    foot: `
      <button class="ghost-btn" data-act="close-modal">取消</button>
      <button class="primary-btn" data-act="go-plans">查看套餐与积分</button>`
  });
}

/* ------------------------------ 附件 ------------------------------ */
function addFiles(fileList) {
  const files = [...fileList];
  if (!files.length) return;
  files.forEach(f => state.attachments.push({ name: f.name, size: f.size }));
  toast(`已添加 ${files.length} 个文件`);
  syncComposer();
  renderContext();
}

function pickLibraryDoc() {
  const items = state.docs.map(d => `
    <button class="row" data-act="add-doc-ref" data-id="${d.id}">
      <span class="r-ico">${esc(extOf(d.name))}</span>
      <div class="r-main"><div class="r-name">${esc(d.name)}</div><div class="r-meta"><span>${esc(d.collection)}</span><span>${esc(d.size)}</span></div></div>
      <div class="r-right">${icon('plus', 14)}</div>
    </button>`).join('');

  openModal({
    title: '从资料库引用',
    desc: '被引用的资料会加入本任务的检索上下文。',
    body: `<div class="row-list" style="max-height:380px;overflow:auto">${items}</div>`,
    foot: `<button class="ghost-btn" data-act="close-modal">完成</button>`
  });
}

/* ------------------------------ 弹层：下拉 ------------------------------ */
function openPopover(anchor, html, handler, width = 280) {
  const pop = $('#popover');
  pop.innerHTML = html;
  pop.hidden = false;
  pop.style.minWidth = width + 'px';
  const r = anchor.getBoundingClientRect();
  const pr = pop.getBoundingClientRect();
  let left = r.left;
  if (left + pr.width > innerWidth - 12) left = innerWidth - pr.width - 12;
  let top = r.top - pr.height - 8;
  if (top < 12) top = r.bottom + 8;
  pop.style.left = Math.max(12, left) + 'px';
  pop.style.top = Math.max(12, top) + 'px';
  state.popHandler = handler;
}

function closePopover() {
  const pop = $('#popover');
  pop.hidden = true;
  state.popHandler = null;
}

function modelPopover(anchor) {
  const custom = state.models.filter(m => m.custom);
  const html = `<div class="pop-head">选择模型 · ${MODELS.length} 内置${custom.length ? ` + ${custom.length} 自定义` : ''}</div>
    ${MODELS.map(m => `
      <button class="pop-item ${m.id === state.model ? 'active' : ''}" data-pop="model" data-id="${m.id}">
        <span class="pm-name">${esc(m.name)}<br><span style="font-size:11px;color:var(--text-3)">${esc(m.org)} · ${esc(m.ctx)}</span></span>
        ${m.id === state.model ? `<span style="color:var(--green)">${icon('check', 13)}</span>` : `<span class="pm-meta">${esc(m.lic)}</span>`}
      </button>`).join('')}
    ${custom.length ? `<div class="pop-sep"></div><div class="pop-head">自定义网关</div>
      ${custom.map(m => `
        <button class="pop-item ${m.id === state.model ? 'active' : ''}" data-pop="model" data-id="${m.id}">
          <span class="pm-name">${esc(m.name)}<br><span style="font-size:11px;color:var(--text-3)">${esc(m.model)} · ${esc(m.org)}</span></span>
          ${m.id === state.model ? `<span style="color:var(--green)">${icon('check', 13)}</span>` : `<span class="pm-meta">自定义</span>`}
        </button>`).join('')}` : ''}
    <div class="pop-sep"></div>
    <div class="pop-foot"><button class="pop-item pop-action" data-act="add-model"><span class="pop-plus">${icon('plus', 14)}</span><span class="pm-name">添加自定义模型</span></button></div>`;
  openPopover(anchor, html, id => {
    state.model = id;
    if (state.route === 'task') {
      const t = state.tasks.find(x => x.id === state.currentTaskId);
      if (t) { t.model = id; saveStore(); }
    }
    syncComposer();
    renderContext();
    toast('已切换至 ' + modelLabel());
  }, 300);
}

/* ------------------------------ 自定义模型 ------------------------------ */
const MODEL_TAGS = ['通用', '中文', '办公', '代码', '推理', '长文本', '多模态', '本地', 'Agent'];

const providerName = id => (PROVIDERS.find(p => p.id === id) || {}).name || '自定义';
const customModel = id => (store.customModels || []).find(m => m.id === id);

function statusMeta(m) {
  if (m.status === 'demo') return { cls: '', text: '演示校验' };
  if (!m.testedAt) return { cls: '', text: '未验证' };
  if (m.status === 'ok') return { cls: 'ok', text: `已验证 · ${m.latency || 0}ms` };
  if (m.status === 'fail') return { cls: 'err', text: '连接失败' };
  return { cls: '', text: '未验证' };
}

function modelFormHTML(d) {
  const tags = d.tags || ['通用'];
  return `
  <div class="mf-2">
    <div class="field">
      <label>显示名称 <span class="req">必填</span></label>
      <input id="mf-name" value="${esc(d.name || '')}" placeholder="例如 Qwen3-32B（内网）" autocomplete="off" />
    </div>
    <div class="field">
      <label>提供商预设</label>
      <select id="mf-provider">
        ${PROVIDERS.map(p => `<option value="${p.id}" ${p.id === (d.provider || 'deepseek') ? 'selected' : ''}>${esc(p.name)}</option>`).join('')}
      </select>
    </div>
  </div>
  <div class="field">
    <label>Base URL <span class="req">必填</span></label>
    <input id="mf-base" value="${esc(d.baseUrl || '')}" placeholder="https://api.example.com/v1" autocomplete="off" spellcheck="false" />
    <div class="hint">按 OpenAI 兼容协议，通常以 <code>/v1</code> 结尾；测试连接会请求 <code>GET {Base URL}/models</code></div>
  </div>
  <div class="field">
    <label>API Key</label>
    <div class="key-wrap">
      <input id="mf-key" type="password" value="${esc(d.apiKey || '')}" placeholder="sk-..." autocomplete="off" spellcheck="false" />
      <button class="key-eye" data-act="toggle-key" title="显示 / 隐藏密钥" type="button">${icon('eye', 15)}</button>
    </div>
    <div class="hint">仅保存在本机 localStorage，不会上传；本地网关（Ollama / vLLM）可留空。</div>
  </div>
  <div class="field">
    <label>模型名称 <span class="req">必填</span></label>
    <div class="suggest-wrap">
      <input id="mf-model" value="${esc(d.model || '')}" placeholder="搜索模型名称：deepseek / qwen / kimi …" autocomplete="off" spellcheck="false" />
      <div class="suggest" id="mf-suggest" hidden></div>
    </div>
    <div class="hint">输入关键词实时搜索内置模型目录，也可以直接填写网关里的模型 ID。</div>
  </div>
  <div class="field-row">
    <div class="field"><label>上下文长度</label><input id="mf-ctx" value="${esc(d.ctx || '128K')}" placeholder="128K" /></div>
    <div class="field"><label>参数量（可选）</label><input id="mf-params" value="${esc(d.params || '')}" placeholder="32B / MoE …" /></div>
  </div>
  <div class="field">
    <label>能力标签</label>
    <div class="tag-pick" id="mf-tags">
      ${MODEL_TAGS.map(t => `<button type="button" data-act="pick-tag" data-tag="${t}" class="${tags.includes(t) ? 'on' : ''}">${t}</button>`).join('')}
    </div>
  </div>
  <div class="conn-row">
    <button class="small-btn" data-act="test-model" id="mf-test">${icon('bolt', 13)}测试连接</button>
    <label class="switch-inline"><input type="checkbox" id="mf-demo" /> 演示模式（不发起真实请求）</label>
  </div>
  <div class="conn-result" id="mf-result" hidden></div>`;
}

function openModelModal(id) {
  const editing = id ? customModel(id) : null;
  const d = editing || { provider: 'deepseek', baseUrl: (PROVIDERS[0] || {}).base, ctx: '128K', tags: ['通用'] };
  openModal({
    wide: true,
    title: editing ? '编辑自定义模型' : '添加自定义模型',
    desc: '接入任意 OpenAI 兼容网关，保存后即可在模型下拉中切换。',
    body: modelFormHTML(d),
    foot: `<button class="ghost-btn" data-act="close-modal">取消</button>
           <button class="primary-btn" data-act="save-model" data-id="${editing ? editing.id : ''}">${editing ? '保存修改' : '保存并启用'}</button>`
  });
  initModelForm(d);
}

function initModelForm(d) {
  const base = $('#mf-base'), prov = $('#mf-provider'), key = $('#mf-key');
  if (prov) {
    prov.addEventListener('change', () => {
      const p = PROVIDERS.find(x => x.id === prov.value) || {};
      const known = PROVIDERS.map(x => x.base).filter(Boolean);
      if (base && (!base.value.trim() || known.includes(base.value.trim()))) base.value = p.base || '';
      if (key) key.placeholder = p.noKey ? '本地网关可留空' : 'sk-...';
    });
    const p0 = PROVIDERS.find(x => x.id === prov.value) || {};
    if (key) key.placeholder = p0.noKey ? '本地网关可留空' : 'sk-...';
  }
  const mi = $('#mf-model');
  if (mi) {
    mi.addEventListener('input', () => renderSuggest(mi.value));
    mi.addEventListener('focus', () => renderSuggest(mi.value));
    mi.addEventListener('keydown', e => {
      const box = $('#mf-suggest');
      const open = box && !box.hidden;
      if (e.key === 'Escape' && open) { e.stopPropagation(); box.hidden = true; return; }
      if (!open) return;
      const items = [...box.querySelectorAll('.sug-item')];
      if (!items.length) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        e.stopPropagation();
        const cur = items.findIndex(x => x.classList.contains('active'));
        const next = e.key === 'ArrowDown' ? Math.min(items.length - 1, cur + 1) : Math.max(0, cur - 1);
        items.forEach(x => x.classList.remove('active'));
        items[next].classList.add('active');
        items[next].scrollIntoView({ block: 'nearest' });
      }
      if (e.key === 'Enter') {
        const cur = items.find(x => x.classList.contains('active')) || items[0];
        if (cur) { e.preventDefault(); e.stopPropagation(); applySuggestion(Number(cur.dataset.idx)); }
      }
    });
    mi.addEventListener('blur', () => setTimeout(() => { const b = $('#mf-suggest'); if (b) b.hidden = true; }, 140));
  }
  setTimeout(() => { const n = $('#mf-name'); if (n && !n.value) n.focus(); }, 60);
}

function suggestPool() {
  const own = (store.customModels || []).map(m => ({ model: m.model, name: m.name, org: m.org, ctx: m.ctx, provider: m.provider, tags: m.tags, own: true }));
  const seen = new Set();
  return [...own, ...MODEL_CATALOG].filter(x => {
    if (!x.model || seen.has(x.model)) return false;
    seen.add(x.model);
    return true;
  });
}

function matchSnippet(text, kw) {
  const s = esc(text);
  if (!kw) return s;
  const i = s.toLowerCase().indexOf(kw.toLowerCase());
  if (i < 0) return s;
  return s.slice(0, i) + '<mark>' + s.slice(i, i + kw.length) + '</mark>' + s.slice(i + kw.length);
}

function renderSuggest(q) {
  const box = $('#mf-suggest');
  if (!box) return;
  const kw = String(q || '').trim();
  const terms = kw.toLowerCase().split(/\s+/).filter(Boolean);
  const pool = suggestPool().filter(x => {
    if (!terms.length) return true;
    const hay = (x.model + ' ' + x.name + ' ' + x.org + ' ' + (x.tags || []).join(' ')).toLowerCase();
    return terms.every(t => hay.includes(t));
  }).slice(0, 8);
  state.__msug = pool;
  if (!pool.length) {
    box.innerHTML = `<div class="sug-empty">没有匹配的模型，可直接使用输入的名称</div>`;
    box.hidden = false;
    return;
  }
  box.innerHTML = pool.map((x, i) => `
    <button type="button" class="sug-item" data-act="pick-model-id" data-idx="${i}">
      <span class="sug-id">${matchSnippet(x.model, kw)}</span>
      ${x.own ? '<span class="sug-own">已添加</span>' : ''}
      <span class="sug-meta">${esc(x.name)} · ${esc(x.ctx || '—')}</span>
    </button>`).join('');
  box.hidden = false;
}

function applySuggestion(idx) {
  const x = (state.__msug || [])[idx];
  if (!x) return;
  const mi = $('#mf-model'), nm = $('#mf-name'), ctx = $('#mf-ctx'), np = $('#mf-provider'), base = $('#mf-base');
  if (mi) mi.value = x.model;
  if (nm && !nm.value.trim()) nm.value = x.name || x.model;
  if (ctx && !ctx.value.trim()) ctx.value = x.ctx || '128K';
  if (np && x.provider) {
    const p = PROVIDERS.find(y => y.id === x.provider) || {};
    const known = PROVIDERS.map(y => y.base).filter(Boolean);
    const cur = base ? base.value.trim() : '';
    np.value = x.provider;
    if (base && p.base && (!cur || known.includes(cur))) base.value = p.base;
  }
  const box = $('#mf-suggest');
  if (box) box.hidden = true;
  if (nm) nm.focus();
}

async function probeGateway(cfg) {
  const started = performance.now();
  if (cfg.demo) {
    await new Promise(r => setTimeout(r, 780));
    return { ok: true, demo: true, ms: Math.round(performance.now() - started), count: cfg.model ? 1 : 0, ids: cfg.model ? [cfg.model] : [], modelFound: !!cfg.model };
  }
  const base = String(cfg.baseUrl || '').trim().replace(/\/+$/, '');
  if (!/^https?:\/\//i.test(base)) return { ok: false, kind: 'format', ms: 0, msg: 'Base URL 需以 http:// 或 https:// 开头' };
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 8000);
  try {
    const res = await fetch(base + '/models', {
      method: 'GET',
      headers: cfg.apiKey ? { Authorization: 'Bearer ' + cfg.apiKey } : {},
      signal: ctl.signal,
      cache: 'no-store'
    });
    const ms = Math.round(performance.now() - started);
    if (res.status === 401 || res.status === 403) return { ok: false, kind: 'auth', ms, code: res.status };
    if (res.status === 404) return { ok: false, kind: 'path', ms, code: 404 };
    if (!res.ok) return { ok: false, kind: 'http', ms, code: res.status };
    let data = null;
    try { data = await res.json(); } catch (_) { return { ok: false, kind: 'parse', ms }; }
    const list = (data && (data.data || data.models)) || [];
    const ids = list.map(x => (x && (x.id || x.name)) || '').filter(Boolean);
    const want = String(cfg.model || '').toLowerCase();
    const hit = want ? ids.find(x => x.toLowerCase() === want) || ids.find(x => x.toLowerCase().includes(want)) : null;
    return { ok: true, ms, count: ids.length, ids, modelFound: want ? !!hit : null };
  } catch (err) {
    const ms = Math.round(performance.now() - started);
    if (err && err.name === 'AbortError') return { ok: false, kind: 'timeout', ms };
    return { ok: false, kind: 'cors', ms };
  } finally {
    clearTimeout(timer);
  }
}

function probeView(r, model) {
  if (r.ok && r.demo) {
    return { cls: 'warn', head: '演示模式 · 模拟校验通过', hint: '未发起真实请求，仅用于预览配置流程；关闭演示模式可发起真实测试。' };
  }
  if (r.ok) {
    const head = `连接成功 · ${r.ms} ms · 网关返回 ${r.count} 个模型`;
    let hint;
    if (!r.count) hint = '接口可访问，但未返回模型列表（部分网关需指定模型名后才列出自有模型）。';
    else if (r.modelFound) hint = `模型列表中已找到 「${model}」。`;
    else hint = `列表中没有完全匹配的 「${model}」，若网关使用别名可忽略，保存后仍可调用。`;
    return { cls: 'ok', head, hint, ids: (r.ids || []).slice(0, 5) };
  }
  const map = {
    auth: [`鉴权失败（HTTP ${r.code || 401}）`, 'API Key 无效、已过期，或该密钥没有对应模型的调用权限。可先确认密钥是否属于当前 Base URL 的平台。'],
    path: ['接口路径不存在（HTTP 404）', 'Base URL 通常需要以 /v1 结尾，例如 https://api.deepseek.com/v1；本次请求的是 Base URL + /models。'],
    http: [`网关返回 HTTP ${r.code || '错误'}`, '网关可达，但拒绝了这次请求：请检查地址路径、模型权限或服务端限流。'],
    parse: ['返回内容不是 JSON', '该地址可能不是 OpenAI 兼容接口，请确认网关类型与路径（一般以 /v1 结尾）。'],
    timeout: ['连接超时（8 秒）', '请确认地址可达、端口未被占用；内网网关需要与本机网络连通。'],
    format: ['地址格式不正确', 'Base URL 需以 http:// 或 https:// 开头。'],
    cors: ['浏览器拦截了这次请求', '静态页面直连第三方 API 时，对方通常不允许 file:// 或 localhost 跨域。可以改用自建网关（vLLM / Ollama 需开启跨域），或把本页部署到 http 服务下；也可以勾选「演示模式」先保存配置。']
  };
  const [head, hint] = map[r.kind] || ['请求失败', '请检查网络与网关配置后重试。'];
  return { cls: r.kind === 'cors' || r.kind === 'timeout' ? 'warn' : 'err', head, hint };
}

function renderProbe(el, view, ms) {
  if (!el) return;
  el.hidden = false;
  el.className = 'conn-result ' + view.cls;
  el.innerHTML = `
    <div class="cr-head">${icon(view.cls === 'ok' ? 'check' : view.cls === 'warn' ? 'bolt' : 'x', 14)}<span>${esc(view.head)}</span>${ms ? `<span class="cr-ms">${ms} ms</span>` : ''}</div>
    <div class="cr-hint">${view.hint}</div>
    ${view.ids && view.ids.length ? `<div class="cr-ids">${view.ids.map(i => `<span class="cr-id">${esc(i)}</span>`).join('')}</div>` : ''}`;
}

function readModelForm() {
  const v = sel => { const el = $(sel); return el ? el.value.trim() : ''; };
  return {
    name: v('#mf-name'),
    provider: v('#mf-provider') || 'custom',
    baseUrl: v('#mf-base'),
    apiKey: v('#mf-key'),
    model: v('#mf-model'),
    ctx: v('#mf-ctx') || '128K',
    params: v('#mf-params'),
    tags: $$('#mf-tags button.on').map(b => b.dataset.tag),
    demo: !!($('#mf-demo') && $('#mf-demo').checked)
  };
}

async function testModelForm() {
  const btn = $('#mf-test'), out = $('#mf-result');
  const f = readModelForm();
  if (!f.baseUrl) { renderProbe(out, { cls: 'err', head: '请先填写 Base URL', hint: '测试连接需要知道请求地址，例如 https://api.deepseek.com/v1' }); return; }
  if (btn) { btn.disabled = true; btn.classList.add('busy'); btn.textContent = '测试中…'; }
  renderProbe(out, { cls: 'warn', head: '正在连接 ' + f.baseUrl, hint: '最多等待 8 秒…' });
  const r = await probeGateway(f);
  renderProbe(out, probeView(r, f.model), r.demo ? 0 : r.ms);
  if (btn) {
    btn.disabled = false;
    btn.classList.remove('busy');
    btn.innerHTML = icon('bolt', 13) + '重新测试';
  }
  state.__lastProbe = { ...f, result: r };
}

function saveModelForm(editId) {
  const f = readModelForm();
  const out = $('#mf-result');
  const fail = msg => renderProbe(out, { cls: 'err', head: msg, hint: '修正后即可保存。' });
  if (!f.name) return fail('请填写显示名称');
  if (!/^https?:\/\/.+/i.test(f.baseUrl)) return fail('Base URL 需以 http:// 或 https:// 开头');
  if (!f.model) return fail('请搜索或填写模型名称');
  const dup = state.models.find(m => m.id !== editId && m.custom && m.provider === f.provider && m.model === f.model);
  if (dup) return fail(`该网关下已存在模型 ${f.model}（${dup.name}）`);

  const probe = state.__lastProbe && state.__lastProbe.model === f.model && state.__lastProbe.baseUrl === f.baseUrl && state.__lastProbe.apiKey === f.apiKey && state.__lastProbe.demo === f.demo ? state.__lastProbe.result : null;
  const prev = editId ? customModel(editId) : null;
  const sameConn = prev && prev.baseUrl === f.baseUrl.replace(/\/+$/, '') && prev.apiKey === f.apiKey && prev.model === f.model;
  const rec = {
    id: editId || uid('cm'),
    name: f.name,
    org: providerName(f.provider),
    provider: f.provider,
    baseUrl: f.baseUrl.replace(/\/+$/, ''),
    apiKey: f.apiKey,
    model: f.model,
    ctx: f.ctx,
    params: f.params || '',
    lic: '自定义',
    tags: f.tags.length ? f.tags : ['通用'],
    note: `${providerName(f.provider)} · ${f.baseUrl}`,
    custom: true,
    status: probe ? (probe.ok ? (probe.demo ? 'demo' : 'ok') : 'fail') : (sameConn ? prev.status : ''),
    latency: probe ? probe.ms : (sameConn ? prev.latency : 0),
    testedAt: probe ? Date.now() : (sameConn ? prev.testedAt : 0)
  };
  if (editId) {
    store.customModels = store.customModels.map(m => (m.id === editId ? rec : m));
  } else {
    store.customModels = [...store.customModels, rec];
  }
  syncModelList();
  state.model = rec.id;
  store.model = rec.id;
  saveStore();
  state.__lastProbe = null;
  closeModal();
  if (state.route === 'settings') renderSettings();
  syncComposer();
  renderContext();
  toast(editId ? '模型配置已更新' : `已接入 ${rec.name}，可在任务中直接使用`);
}

async function runInlineTest(id, btn) {
  const m = customModel(id);
  if (!m) return;
  const old = btn ? btn.textContent : '';
  if (btn) { btn.disabled = true; btn.textContent = '测试中…'; }
  const r = await probeGateway({ baseUrl: m.baseUrl, apiKey: m.apiKey, model: m.model });
  store.customModels = store.customModels.map(x => x.id === id ? { ...x, status: r.ok ? 'ok' : 'fail', latency: r.ok ? r.ms : 0, testedAt: Date.now() } : x);
  syncModelList();
  saveStore();
  if (btn) { btn.disabled = false; btn.textContent = old; }
  if (state.route === 'settings') renderSettings();
  const v = probeView(r, m.model);
  toast(v.head);
}

function confirmDialog({ title, desc, body = '', okText = '确认', danger = true, onOk }) {
  state.__confirm = onOk;
  openModal({
    title, desc, body,
    foot: `<button class="ghost-btn" data-act="close-modal">取消</button>
           <button class="primary-btn ${danger ? 'danger' : ''}" data-act="confirm-ok">${esc(okText)}</button>`
  });
}

function removeModel(id) {
  const m = customModel(id);
  if (!m) return;
  confirmDialog({
    title: '删除自定义模型',
    desc: `「${m.name}」的配置与密钥将一并从本机移除，内置模型不受影响。`,
    body: '',
    okText: '删除',
    onOk: () => {
      store.customModels = store.customModels.filter(x => x.id !== id);
      if (state.model === id) { state.model = MODELS[0].id; store.model = state.model; }
      syncModelList();
      saveStore();
      closeModal();
      if (state.route === 'settings') renderSettings();
      syncComposer();
      renderContext();
      toast('已删除自定义模型');
    }
  });
}

function projectPopover(anchor) {
  const html = `<div class="pop-head">任务上下文</div>
    <button class="pop-item ${!state.project ? 'active' : ''}" data-pop="project" data-id="">
      <span class="pm-name">不使用项目</span>${!state.project ? `<span style="color:var(--green)">${icon('check', 13)}</span>` : ''}
    </button>
    <div class="pop-sep"></div>
    ${PROJECTS.map(p => `
      <button class="pop-item ${p.id === state.project ? 'active' : ''}" data-pop="project" data-id="${p.id}">
        <span class="pm-name">${esc(p.name)}<br><span style="font-size:11px;color:var(--text-3)">${esc(p.lang)} · ${esc(p.branch)}</span></span>
        ${p.id === state.project ? `<span style="color:var(--green)">${icon('check', 13)}</span>` : ''}
      </button>`).join('')}`;
  openPopover(anchor, html, id => {
    state.project = id || null;
    if (state.route === 'task') {
      const t = state.tasks.find(x => x.id === state.currentTaskId);
      if (t) { t.project = id || null; saveStore(); }
    }
    syncComposer();
    renderContext();
    toast(id ? '已关联项目 ' + projectLabel() : '已取消项目关联');
  }, 290);
}

function addMenuPopover(anchor) {
  const html = `<div class="pop-head">添加到任务</div>
    <button class="pop-item" data-pop="add" data-id="file"><span class="pm-name">上传本地文件</span><span class="pm-meta">任意格式</span></button>
    <button class="pop-item" data-pop="add" data-id="doc"><span class="pm-name">从资料库引用</span><span class="pm-meta">${state.docs.length}</span></button>
    <button class="pop-item" data-pop="add" data-id="skill"><span class="pm-name">指定技能</span><span class="pm-meta">${store.skills.length}</span></button>
    <button class="pop-item" data-pop="add" data-id="expert"><span class="pm-name">切换专家</span><span class="pm-meta">${store.experts.length}</span></button>
    <button class="pop-item" data-pop="add" data-id="connector"><span class="pm-name">接入连接器</span><span class="pm-meta">${store.connectors.length}</span></button>`;
  openPopover(anchor, html, id => {
    if (id === 'file') $('#file-input').click();
    if (id === 'doc') pickLibraryDoc();
    if (id === 'skill') navigate('skills');
    if (id === 'expert') navigate('experts');
    if (id === 'connector') navigate('connectors');
  }, 250);
}

/* ------------------------------ 弹窗 ------------------------------ */
function openModal({ title, desc, body, foot, wide = false }) {
  const m = $('#modal');
  m.className = 'modal' + (wide ? ' wide' : '');
  m.innerHTML = `
    <div class="modal-head">
      <div><h3>${esc(title)}</h3>${desc ? `<p>${esc(desc)}</p>` : ''}</div>
      <span class="grow"></span>
      <button class="icon-btn" data-act="close-modal">${icon('x', 15)}</button>
    </div>
    <div class="modal-body">${body}</div>
    <div class="modal-foot">${foot || `<button class="ghost-btn" data-act="close-modal">关闭</button>`}</div>`;
  $('#modal-overlay').hidden = false;
}

function closeModal() { $('#modal-overlay').hidden = true; }

function docModal(id) {
  const d = state.docs.find(x => x.id === id);
  if (!d) return;
  openModal({
    title: d.name,
    desc: `${d.collection} · ${d.size} · ${d.owner} · ${d.updated}`,
    body: `
      <div class="card-tags" style="margin-bottom:12px">${(d.tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
      <div class="panel" style="margin:0">
        <h3>内容摘要</h3>
        <div class="panel-sub">由 PlatformX 自动抽取的高层摘要，用于任务检索。</div>
        <p style="font-size:13.5px;color:var(--text-2);line-height:1.75">
          该资料包含关键指标口径、分区域拆解与历史对照数据，共 3 个章节、12 张图表。
          任务引用时会按段落召回，并在结论中标注来源页码，避免跨口径混用。
        </p>
      </div>`,
    foot: `<button class="ghost-btn" data-act="close-modal">关闭</button>
           <button class="primary-btn" data-act="cite-doc" data-id="${d.id}">引用到新任务</button>`
  });
}

function projectModal(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;
  const tasks = state.tasks.filter(t => t.project === id);
  openModal({
    title: p.name,
    desc: `${p.desc}`,
    body: `
      <div class="kv-list">
        <div class="kv-row"><span class="k">仓库</span><span class="v">${esc(p.repo)}</span></div>
        <div class="kv-row"><span class="k">分支</span><span class="v">${esc(p.branch)}</span></div>
        <div class="kv-row"><span class="k">语言</span><span class="v">${esc(p.lang)}</span></div>
        <div class="kv-row"><span class="k">文件</span><span class="v">${p.files} 个</span></div>
      </div>
      <div class="section-title" style="margin:16px 0 6px">关联任务</div>
      ${tasks.length ? `<div class="row-list">${tasks.map(t => `
        <button class="row" data-act="open-task-from-modal" data-id="${t.id}">
          <span class="status-dot ${t.status}"></span>
          <div class="r-main"><div class="r-name">${esc(t.title)}</div><div class="r-meta"><span>${modeName(t.mode)}</span><span>${fmtTime(t.createdAt)}</span></div></div>
        </button>`).join('')}</div>` : '<div class="ctx-empty">还没有针对该项目的任务</div>'}
    `,
    foot: `<button class="ghost-btn" data-act="close-modal">关闭</button>
           <button class="primary-btn" data-act="new-task-in-project" data-id="${p.id}">在此项目中新建任务</button>`
  });
}

/* ------------------------------ 命令面板 ------------------------------ */
function paletteItems() {
  const items = [
    { label: '新建任务', kind: 'action', act: 'new-task', icon: 'plus' },
    { label: '添加自定义模型', kind: 'addmodel', icon: 'cpu' },
    ...NAV.flatMap(g => g.items.map(i => ({ label: '打开 ' + i.label, kind: 'go', route: i.route, icon: i.icon }))),
    ...state.models.map(m => ({ label: '切换模型 · ' + m.name, kind: 'model', id: m.id, icon: 'cpu' })),
    ...state.tasks.slice(0, 6).map(t => ({ label: t.title, kind: 'task', id: t.id, icon: 'clock' })),
    ...store.experts.slice(0, 4).map(id => {
      const e = EXPERTS.find(x => x.id === id);
      return e ? { label: '专家 · ' + e.name, kind: 'go', route: 'experts', icon: 'users' } : null;
    }).filter(Boolean)
  ];
  return items;
}

function openPalette() {
  $('#palette-overlay').hidden = false;
  const input = $('#palette-input');
  input.value = '';
  state.paletteIndex = 0;
  renderPalette('');
  setTimeout(() => input.focus(), 30);
}

function renderPalette(q) {
  const kindLabel = { action: '命令', go: '页面', model: '模型', task: '任务', addmodel: '配置' };
  const list = paletteItems().filter(i => !q || i.label.toLowerCase().includes(q.toLowerCase())).slice(0, 40);
  state.paletteResults = list;
  state.paletteIndex = Math.min(state.paletteIndex || 0, Math.max(0, list.length - 1));
  $('#palette-list').innerHTML = list.length ? list.map((i, idx) => `
    <button class="palette-item ${idx === state.paletteIndex ? 'active' : ''}" data-act="palette-pick" data-idx="${idx}">
      ${icon(i.icon, 14)}<span class="pi-label">${esc(i.label)}</span><span class="pi-kind">${kindLabel[i.kind] || i.kind}</span>
    </button>`).join('') : '<div class="palette-empty">没有匹配的命令</div>';
}

function palettePick(idx) {
  const it = state.paletteResults[idx];
  if (!it) return;
  $('#palette-overlay').hidden = true;
  if (it.kind === 'action') {
    state.currentTaskId = null;
    navigate('home');
    setTimeout(() => ($('#composer-home') || {}).focus?.(), 60);
  } else if (it.kind === 'addmodel') { openModelModal(''); }
  else if (it.kind === 'go') navigate(it.route);
  else if (it.kind === 'model') { state.model = it.id; saveStore(); navigate(state.route === 'task' ? 'task' : 'home', state.route === 'task' ? { id: state.currentTaskId } : {}); toast('已切换至 ' + modelLabel()); }
  else if (it.kind === 'task') navigate('task', { id: it.id });
}

/* ------------------------------ 事件 ------------------------------ */
function handleClick(e) {
  const el = e.target.closest('[data-act]');
  if (!el) {
    if (!$('#popover').hidden && !e.target.closest('#popover')) closePopover();
    return;
  }
  const act = el.dataset.act;
  const id = el.dataset.id;

  switch (act) {
    case 'nav': navigate(el.dataset.route); break;
    case 'new-task':
      state.currentTaskId = null;
      navigate('home');
      setTimeout(() => ($('#composer-home') || {}).focus?.(), 60);
      break;
    case 'back': navigate('home'); break;
    case 'open-task': navigate('task', { id }); break;
    case 'open-task-from-modal': closeModal(); navigate('task', { id }); break;
    case 'share': toast('分享链接已复制到剪贴板'); break;
    case 'toggle-context':
      state.contextOpen = !state.contextOpen;
      renderContext();
      $$('.topbar-btn[data-act="toggle-context"]').forEach(b => b.classList.toggle('on', state.contextOpen));
      break;
    case 'ctx-tab': state.contextTab = el.dataset.tab; renderContext(); break;
    case 'toggle-sidebar': $('#app').classList.toggle('sidebar-collapsed'); break;
    case 'filter': state.filter = el.dataset.value; state.docFilter = el.dataset.value; reload(); break;
    case 'settings-tab': state.settingsTab = el.dataset.tab; renderSettings(); break;
    case 'open-palette': openPalette(); break;
    case 'close-modal': closeModal(); break;
    case 'login-tab': switchLoginTab(id); break;
    case 'send-email-otp': sendEmailOtp(); break;
    case 'send-otp': sendOtp(); break;
    case 'login-otp': loginOtp(); break;
    case 'login-wechat': loginWechat(); break;
    case 'logout': logout(); break;
    case 'edit-nickname': toggleNicknameEdit(true); break;
    case 'save-nickname': {
      const v = $('#acct-nick-input');
      const val = v ? v.value : '';
      saveNickname(val).then(ok => { if (ok) toggleNicknameEdit(false); });
      break;
    }
    case 'sync-now': {
      toast('正在同步…');
      syncFromCloud().then(ok => {
        toast(ok ? '同步完成' : '同步失败，请检查网络');
        if ($('#modal')) openAccountModal();
      });
      break;
    }
    case 'app-download': openAppModal(); break;
    case 'app-dl-link': {
      const platform = id === 'ios' ? 'iOS' : id === 'android' ? 'Android' : '鸿蒙';
      toast(`${platform} 安装包已开始下载（演示）`);
      break;
    }
    case 'pick-model': modelPopover(el); break;
    case 'add-model': closePopover(); openModelModal(''); break;
    case 'edit-model': openModelModal(id); break;
    case 'del-model': removeModel(id); break;
    case 'test-model':
      if (el.id === 'mf-test' || !id) testModelForm();
      else runInlineTest(id, el);
      break;
    case 'pick-model-id': applySuggestion(Number(el.dataset.idx)); break;
    case 'pick-tag':
      el.classList.toggle('on');
      break;
    case 'toggle-key': {
      const inp = $('#mf-key');
      if (!inp) break;
      const show = inp.type === 'password';
      inp.type = show ? 'text' : 'password';
      el.innerHTML = icon(show ? 'eyeOff' : 'eye', 15);
      break;
    }
    case 'save-model': saveModelForm(el.dataset.id || ''); break;
    case 'confirm-ok': {
      const fn = state.__confirm;
      state.__confirm = null;
      if (typeof fn === 'function') fn();
      break;
    }
    case 'pick-project': projectPopover(el); break;
    case 'add-menu': addMenuPopover(el); break;
    case 'switch-plan': switchPlan(id); break;
    case 'set-cycle': setBillingCycle(id); break;
    case 'open-recharge': scrollToRecharge(); break;
    case 'buy-credits': {
      const pack = CREDIT_PACKS.find(p => p.id === id);
      if (!pack) break;
      openPayModal({
        title: '积分充值',
        amount: pack.price,
        desc: `充值 ${pack.credits} 积分（¥${pack.price}）`,
        onSuccess: () => {
          addCredits(pack.credits, `充值 ${pack.credits} 积分（¥${pack.price}）`);
          toast(`已到账 ${pack.credits} 积分`);
        }
      });
      break;
    }
    case 'pick-pay': {
      if (!state.__pay) break;
      state.__pay.method = id;
      renderPayModal();
      break;
    }
    case 'simulate-pay': simulatePay(); break;
    case 'go-plans': closeModal(); navigate('plans'); break;
    case 'set-mode': state.mode = el.dataset.mode; syncComposer(); break;
    case 'send': state.__send && state.__send(); break;
    case 'voice-input': toggleVoice(); break;
    case 'enhance-prompt': enhancePrompt(); break;
    case 'remove-attach':
      state.attachments.splice(Number(el.dataset.idx), 1);
      syncComposer(); renderContext();
      break;
    case 'use-template': {
      const t = TEMPLATES.find(x => x.id === el.dataset.id);
      if (!t) break;
      state.mode = t.mode;
      state.project = t.mode === 'office' ? 'p2' : t.mode === 'dev' ? 'p1' : 'p3';
      navigate('home');
      const ta = $('#composer-home');
      if (ta) { ta.value = t.prompt; autosize(ta); ta.focus(); }
      toast('已套用模板，可直接发送');
      break;
    }
    case 'install-expert':
      store.experts.push(id); saveStore(); renderCollection('experts'); renderNav(); renderContext();
      toast('已添加专家，可在任务中直接调用');
      break;
    case 'uninstall-expert':
      store.experts = store.experts.filter(x => x !== id); saveStore(); renderCollection('experts'); renderNav(); renderContext();
      toast('已移除专家');
      break;
    case 'install-skill':
      store.skills.push(id); saveStore(); renderCollection('skills'); renderNav(); renderContext();
      toast('技能已启用');
      break;
    case 'uninstall-skill':
      store.skills = store.skills.filter(x => x !== id); saveStore(); renderCollection('skills'); renderNav(); renderContext();
      toast('技能已停用');
      break;
    case 'connect': {
      const c = CONNECTORS.find(x => x.id === id);
      el.textContent = '授权中…';
      setTimeout(() => {
        if (!store.connectors.includes(id)) store.connectors.push(id);
        c.account = '已授权账号';
        saveStore(); renderCollection('connectors'); renderNav(); renderContext();
        toast(c.name + ' 已连接');
      }, 900);
      break;
    }
    case 'disconnect':
      store.connectors = store.connectors.filter(x => x !== id);
      saveStore(); renderCollection('connectors'); renderNav(); renderContext();
      toast('已断开连接');
      break;
    case 'open-project': projectModal(id); break;
    case 'new-task-in-project':
      closeModal();
      state.project = id;
      state.currentTaskId = null;
      navigate('home');
      setTimeout(() => ($('#composer-home') || {}).focus?.(), 60);
      toast('已切换到项目上下文');
      break;
    case 'star-doc': {
      const d = state.docs.find(x => x.id === id);
      if (!d) break;
      d.starred = !d.starred;
      if (d.starred) { if (!store.starred.includes(id)) store.starred.push(id); }
      else store.starred = store.starred.filter(x => x !== id);
      saveStore();
      renderLibrary();
      break;
    }
    case 'open-doc': docModal(id); break;
    case 'cite-doc':
      closeModal();
      state.attachments.push({ name: state.docs.find(x => x.id === id).name, size: 120000 });
      state.currentTaskId = null;
      navigate('home');
      syncComposer();
      toast('已引用到新任务');
      break;
    case 'add-doc-ref': {
      const d = state.docs.find(x => x.id === id);
      if (d) { state.attachments.push({ name: d.name, size: 120000 }); syncComposer(); renderContext(); toast('已加入引用'); }
      closeModal();
      break;
    }
    case 'upload-doc': $('#file-input').dataset.target = 'library'; $('#file-input').click(); break;
    case 'open-artifact': openArtifact(el.dataset.name); break;
    case 'toggle-automation': {
      const a = store.automations.find(x => x.id === id);
      if (a) { a.on = !a.on; saveStore(); renderAutomations(); toast(a.on ? '自动化已恢复运行' : '自动化已暂停'); }
      break;
    }
    case 'stop-task': {
      const t = state.tasks.find(x => x.id === state.currentTaskId);
      if (!t) break;
      t.__run = null;
      t.status = 'done';
      t.stopped = true;
      const last = [...t.messages].reverse().find(m => m.role === 'steps');
      if (last) {
        last.items.forEach(it => { if (it.state !== 'done') it.state = 'skipped'; });
        last.stopped = true;
        last.title = '已停止';
      }
      saveStore(); renderThread(t); renderContext(); renderNav();
      const st = $('.task-status');
      if (st) st.textContent = taskStatusText(t);
      toast('已停止执行');
      break;
    }
    case 'clear-tasks':
      state.tasks = []; saveStore(); renderNav(); toast('任务已清空');
      if (CLOUD.authed) cloud.database.from('tasks').delete().neq('task_uid', '__never__').then(() => {});
      break;
    case 'noop': toast('演示版本未接入该流程'); break;
    case 'palette-pick': palettePick(Number(el.dataset.idx)); break;
    default: break;
  }
}

function reload() {
  if (state.route === 'tasks') renderTasks();
  else if (state.route === 'library') renderLibrary();
  else renderCollection(state.route);
}

function bindGlobal() {
  document.addEventListener('click', e => {
    // 窄屏：点击内容区收起抽屉
    if (innerWidth <= 900 && !e.target.closest('.sidebar') && !e.target.closest('[data-act="toggle-sidebar"]')) {
      $('#app').classList.add('sidebar-collapsed');
    }
    const popItem = e.target.closest('[data-pop]');
    if (popItem) {
      const id = popItem.dataset.id;
      const h = state.popHandler;
      closePopover();
      if (h) h(id);
      return;
    }
    handleClick(e);
  });

  $('#new-task').addEventListener('click', () => { state.currentTaskId = null; navigate('home'); setTimeout(() => ($('#composer-home') || {}).focus?.(), 60); });
  $('#search-trigger').addEventListener('click', openPalette);
  $('#sidebar-fold').addEventListener('click', () => $('#app').classList.toggle('sidebar-collapsed'));
  $('#modal-overlay').addEventListener('click', e => { if (e.target.id === 'modal-overlay') closeModal(); });
  $('#palette-overlay').addEventListener('click', e => { if (e.target.id === 'palette-overlay') $('#palette-overlay').hidden = true; });
  $('#popover').addEventListener('click', () => {});

  $('#file-input').addEventListener('change', e => {
    const files = [...e.target.files];
    const target = e.target.dataset.target;
    if (target === 'library') {
      const added = files.map(f => ({ id: uid('doc'), name: f.name, type: extOf(f.name), size: fmtSize(f.size), collection: '上传', updated: '刚刚', owner: '我', tags: ['本地'], starred: false }));
      store.extraDocs = [...added, ...store.extraDocs];
      state.docs = [...added, ...state.docs];
      state.docFilter = '全部';
      saveStore();
      renderNav();
      renderContext();
      if (state.route === 'library') renderLibrary(); else navigate('library');
      toast('已上传 ' + files.length + ' 份资料');
    } else {
      addFiles(files);
    }
    e.target.value = '';
    e.target.dataset.target = '';
  });

  document.addEventListener('keydown', e => {
    const meta = e.metaKey || e.ctrlKey;
    if (meta && e.key.toLowerCase() === 'k') { e.preventDefault(); openPalette(); return; }
    if (meta && e.key.toLowerCase() === 'n') { e.preventDefault(); state.currentTaskId = null; navigate('home'); setTimeout(() => ($('#composer-home') || {}).focus?.(), 60); return; }
    if (meta && e.key.toLowerCase() === 'i') { e.preventDefault(); enhancePrompt(); return; }
    if (e.key === 'Escape') {
      if (!$('#palette-overlay').hidden) { $('#palette-overlay').hidden = true; return; }
      if (!$('#modal-overlay').hidden) { closeModal(); return; }
      if (!$('#popover').hidden) { closePopover(); return; }
    }
    if (!$('#palette-overlay').hidden) {
      if (e.key === 'ArrowDown') { e.preventDefault(); state.paletteIndex = Math.min((state.paletteIndex || 0) + 1, (state.paletteResults || []).length - 1); renderPalette($('#palette-input').value); }
      if (e.key === 'ArrowUp') { e.preventDefault(); state.paletteIndex = Math.max(0, (state.paletteIndex || 0) - 1); renderPalette($('#palette-input').value); }
      if (e.key === 'Enter') { e.preventDefault(); palettePick(state.paletteIndex || 0); }
    }
  });

  $('#palette-input').addEventListener('input', e => { state.paletteIndex = 0; renderPalette(e.target.value); });

  // 列表内搜索：输入即筛选，保持焦点与光标位置
  document.addEventListener('input', e => {
    const el = e.target.closest('[data-act="search"]');
    if (!el) return;
    state.query = el.value;
    const pos = el.value.length;
    if (state.route === 'tasks') renderTasks();
    else if (state.route === 'library') renderLibrary();
    else if (state.route === 'projects') renderProjects();
    else if (['experts', 'skills', 'connectors'].includes(state.route)) renderCollection(state.route);
    const next = document.querySelector('[data-act="search"]');
    if (next) { next.value = state.query; next.focus(); try { next.setSelectionRange(pos, pos); } catch (_) {} }
  });

  // 设置项输入
  document.addEventListener('change', e => {
    const el = e.target.closest('[data-setting]');
    if (!el) return;
    const k = el.dataset.setting;
    if (k === 'model') { state.model = el.value; store.model = el.value; syncComposer(); }
    else store.settings[k] = el.value;
    saveStore();
    toast('设置已保存');
    renderContext();
  });

  // 拖拽上传
  let dragDepth = 0;
  document.addEventListener('dragenter', e => {
    if (![...(e.dataTransfer?.types || [])].includes('Files')) return;
    dragDepth++; $('#drop-veil').classList.add('on');
  });
  document.addEventListener('dragover', e => { e.preventDefault(); });
  document.addEventListener('dragleave', e => {
    dragDepth = Math.max(0, dragDepth - 1);
    if (!dragDepth) $('#drop-veil').classList.remove('on');
  });
  document.addEventListener('drop', e => {
    e.preventDefault();
    dragDepth = 0;
    $('#drop-veil').classList.remove('on');
    if (e.dataTransfer?.files?.length) addFiles(e.dataTransfer.files);
  });

  window.addEventListener('resize', () => {
    if (innerWidth <= 900) $('#app').classList.add('sidebar-collapsed');
    closePopover();
  });

  // 支持浏览器前进 / 后退与直接跳转 hash
  window.addEventListener('hashchange', () => {
    const raw = location.hash.replace(/^#\/?/, '');
    const [route, id] = raw.split('/');
    const valid = ['home', 'tasks', 'projects', 'library', 'experts', 'skills', 'connectors', 'automations', 'plans', 'settings', 'task'];
    if (!route || !valid.includes(route)) return;
    const cur = state.route === 'task' ? 'task/' + state.currentTaskId : state.route;
    if (route + (id ? '/' + id : '') === cur) return;
    navigate(route, { id });
  });
}

/* ------------------------------ 启动 ------------------------------ */
function boot() {
  loadStore();
  bindGlobal();
  renderUser();
  refreshBillingUI();
  if (innerWidth <= 900) $('#app').classList.add('sidebar-collapsed');

  const raw = location.hash.replace(/^#\/?/, '');
  const [route, id] = raw.split('/');
  const valid = ['home', 'tasks', 'projects', 'library', 'experts', 'skills', 'connectors', 'automations', 'plans', 'settings', 'task'];
  if (route && valid.includes(route)) navigate(route, { id });
  else navigate('home');

  // 恢复登录态（异步）：带 OAuth 回调则先处理回调，再同步云端数据
  restoreAuth();
}

boot();
