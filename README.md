# PlatformX — 开源模型驱动的办公 / 开发 / 设计工作台

纯静态的单页工作台，零构建、零运行时依赖：打开 `index.html` 即可运行。集成开源大模型调度、专家 / 技能 / 连接器能力市场、任务与项目协作、自动化编排与积分套餐体系。

- **在线使用**：<https://platformx.app.workbuddy.host/?sharecode=LGBT6NPMNN>
- **静态预览**：<https://zunjie.github.io/PlatformX/>
- **代码仓库**：<https://github.com/zunjie/PlatformX>

## 功能特性

| 模块 | 说明 |
| --- | --- |
| 工作台 | 办公 / 开发 / 设计三种模式，任务输入框支持拖拽附件（≤ 100 MB）、模型切换、提示词模板 |
| 任务 | 任务创建、状态流转、交付物附件、关键词搜索与筛选，支持 ⌘K 全局搜索、⌘N 新建 |
| 项目 | 多项目归档，任务按项目聚合统计 |
| 资料库 | 文档 / 表格 / 链接等资料索引，10 份已索引示例 |
| 专家 | 300 个专家角色，8 大领域分类（办公 / 开发 / 设计 / 数据 / 营销 / 运营 / 金融与法务 / 教育与研究） |
| 技能 | 300 个可调用技能，覆盖办公文档、代码开发、设计创作、数据处理等方向 |
| 连接器 | 300 个第三方服务连接器，7 类分组，含钉钉、Slack、Microsoft Teams、Telegram 等 |
| 自动化 | 10 个常用定时任务模板（日报汇总、周报生成、数据巡检、代码评审提醒等） |
| 套餐与积分 | 3 档套餐、积分余额与消耗流水展示 |
| 账号 | 手机号验证码登录、微信扫码登录、账号绑定，登录后云端同步 |
| 移动端 | iOS / Android / 鸿蒙 三平台下载入口（含二维码） |

品牌图标采用 [Simple Icons](https://simpleicons.org/)（CC0）还原真实品牌 Logo，共 190 个矢量 Logo + 110 个中文品牌色徽标。

## 技术栈

- **前端**：原生 HTML / CSS / JavaScript（ES2020+），无框架、无打包器
- **路由**：Hash 路由（`#/home`、`#/tasks`、`#/experts` …）
- **持久化**：`localStorage` 本地存储 + WorkBuddy Cloud 云端双写
- **云服务**：WorkBuddy Cloud SDK（Auth / Database / LLM / Storage），已本地化到 `js/workbuddy-cloud-sdk.js`，**不依赖任何 CDN**
- **测试**：Puppeteer + Chrome Headless 端到端用例

## 目录结构

```
platformx/
├── index.html                  # 单页入口
├── css/
│   └── styles.css              # 全站样式（设计令牌 + 组件）
├── js/
│   ├── app.js                  # 应用主逻辑：路由、渲染、事件、云同步
│   ├── data.js                 # 静态数据层：模型/技能/专家/连接器/自动化/套餐
│   ├── brand-icons.js          # 品牌图标映射（Simple Icons path + 中文品牌徽标）
│   ├── cloud.js                # 云服务客户端初始化
│   └── workbuddy-cloud-sdk.js  # 本地化云 SDK（离线可用）
├── assets/                     # Logo、favicon
└── qa/                         # 端到端测试脚本与报告
```

## 本地运行

任选一种方式（推荐静态服务器，避免 `file://` 下的跨域限制）：

```bash
# Python
python -m http.server 8080

# 或 Node
npx serve .
```

然后访问 <http://localhost:8080>。直接双击 `index.html` 也能运行，仅云服务能力降级为本地模式。

## 测试

`qa/` 下为 Puppeteer 端到端脚本，需本机安装 Chrome：

```bash
npm i puppeteer-core
node qa/px-test.mjs          # 全量回归（63 项）
node qa/app-dl-test.mjs      # 移动端下载入口
node qa/cloud-test.mjs       # 云服务加载与登录入口
node qa/top300-test.mjs      # 技能/专家/连接器数据完整性
```

脚本默认以 `--allow-file-access-from-files --disable-web-security` 直接加载 `file://` 页面。

## 部署

项目为纯静态站点，任意静态托管均可。

**GitHub Pages**（已启用，推送 `main` 自动重建）：

```bash
unset http_proxy https_proxy HTTP_PROXY HTTPS_PROXY   # 沙箱代理会阻断 github.com 的 git 隧道
git add -A && git commit -m "更新说明" && git push
```

Pages 配置：source = `main` / 根目录，仓库根部的 `.nojekyll` 用于跳过 Jekyll 处理。

**WorkBuddy 应用托管**：正式环境 `https://platformx.app.workbuddy.host/`，保留云服务 Origin 白名单，云端登录与跨设备同步仅在该域名下可用。

## 云服务与限制

云服务客户端在 `js/cloud.js` 中初始化，数据模型为两张表：

- `user_state`：每用户一行，存 `plan` / `credits` / `credit_log` / `settings`
- `tasks`：每用户多行，`task_uid` + `payload`（JSONB）存完整任务对象

未登录或云端不可用时自动退回 `localStorage`，功能不中断。

> **Origin 白名单限制**：服务端强制校验来源域名。在 `zunjie.github.io` 等自定义域名下访问时，云端登录与跨设备同步不可用，其余功能正常。正式使用请走 `platformx.app.workbuddy.host`。

## 版本

当前版本 **v2.11**。近期变更：

- 技能 / 专家 / 连接器扩容至各 300 条，8 大领域分类
- 品牌图标系统：190 个真实品牌矢量 Logo + 110 个中文品牌徽标
- 云 SDK 本地化，彻底移除 jsdelivr CDN 依赖（消除网络抖动导致的白屏/降级）
- 新增鸿蒙（HarmonyOS）下载入口，采用华为品牌 Logo
- 微信支付 / 支付宝 Logo 与支付方式图标还原

## 声明

界面与数据为演示用途，模型能力、连接器状态、积分流水等均为前端模拟数据；真实接入时可将 `js/data.js` 替换为后端接口返回。
