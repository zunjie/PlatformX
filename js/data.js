/* PlatformX — 静态数据层
 * 全部为前端演示数据，真实接入时可替换为后端接口返回
 */

const MODELS = [
  { id: 'deepseek-v4-pro', name: 'DeepSeek-V4-Pro', org: 'DeepSeek', params: '1.6T MoE · 49B 激活', ctx: '1M', lic: 'MIT', tags: ['通用', '推理', '代码'], note: '2026 旗舰基座，百万级上下文，推理与长文档兼顾，MIT 开源。' },
  { id: 'deepseek-v4.1-flash', name: 'DeepSeek-V4.1-Flash', org: 'DeepSeek', params: '552B MoE · 原生视觉', ctx: '1M', lic: 'MIT', tags: ['多模态', 'Agent'], note: 'V4 家族小体量新成员，原生视觉理解，更快更省。' },
  { id: 'kimi-k3', name: 'Kimi K3', org: 'Moonshot', params: '2.8T MoE · 104B 激活', ctx: '1M', lic: 'Kimi K3', tags: ['长文本', '推理'], note: 'KDA 混合线性注意力，超长文档与多文件资料库场景。' },
  { id: 'glm-5.3', name: 'GLM-5.3', org: 'Zhipu', params: '~753B MoE', ctx: '200K', lic: 'GLM-5.3', tags: ['中文', 'Agent'], note: '面向复杂系统工程与长程 Agent 任务，中文表达自然。' },
  { id: 'qwen3.8-2.4t', name: 'Qwen3.8-2.4T-A95B', org: 'Alibaba', params: '2.4T MoE · 95B 激活', ctx: '262K', lic: 'Qwen3.8', tags: ['通用', '代码'], note: '通义最大开源模型，代码与 Agent 能力业界领先。' },
  { id: 'minimax-m3', name: 'MiniMax M3', org: 'MiniMax', params: '428B MoE · 23B 激活', ctx: '1M', lic: 'MiniMax 社区', tags: ['多模态', '代码'], note: '原生多模态混合训练，百万级上下文，Coding 与 Agent 强。' },
  { id: 'mistral-medium-3.5', name: 'Mistral Medium 3.5', org: 'Mistral AI', params: '128B dense', ctx: '256K', lic: 'Modified MIT', tags: ['多语', '代码'], note: '密集编码模型，欧洲语系与本地化文案，低幻觉严谨风格。' },
  { id: 'gemma-4-31b', name: 'Gemma 4 31B', org: 'Google', params: '31B dense', ctx: '256K', lic: 'Apache-2.0', tags: ['轻量', '本地'], note: '单卡可跑，混合注意力 + 可切换推理，私有化部署首选。' },
  { id: 'llama-4-scout', name: 'Llama-4-Scout', org: 'Meta', params: '109B MoE · 17B 激活', ctx: '10M', lic: 'Llama 4', tags: ['多模态', '长文本'], note: '原生多模态，10M 超长上下文，图文混合输入兼顾。' },
  { id: 'gpt-oss-120b', name: 'gpt-oss-120b', org: 'OpenAI', params: '117B MoE · 5.1B 激活', ctx: '131K', lic: 'Apache-2.0', tags: ['轻量', '本地'], note: '单机单卡可跑，Apache-2.0 开源，内网办公首选。' }
];

/* 自定义模型：提供商预设（Base URL 仅作默认值，用户可改） */
const PROVIDERS = [
  { id: 'deepseek', name: 'DeepSeek 官方', base: 'https://api.deepseek.com/v1' },
  { id: 'dashscope', name: '阿里云百炼', base: 'https://dashscope.aliyuncs.com/compatible-mode/v1' },
  { id: 'moonshot', name: 'Moonshot / Kimi', base: 'https://api.moonshot.cn/v1' },
  { id: 'zhipu', name: '智谱 GLM', base: 'https://open.bigmodel.cn/api/paas/v4' },
  { id: 'minimax', name: 'MiniMax', base: 'https://api.minimaxi.com/v1' },
  { id: 'siliconflow', name: '硅基流动 SiliconFlow', base: 'https://api.siliconflow.cn/v1' },
  { id: 'openrouter', name: 'OpenRouter', base: 'https://openrouter.ai/api/v1' },
  { id: 'vllm', name: '自建 vLLM / SGLang', base: 'http://127.0.0.1:8000/v1', noKey: true },
  { id: 'ollama', name: 'Ollama（本地）', base: 'http://localhost:11434/v1', noKey: true },
  { id: 'custom', name: '其他（OpenAI 兼容）', base: '', noKey: true }
];

/* 可搜索的模型名称目录：填写「模型名称」时用来联想，也能直接手填任意 ID */
const MODEL_CATALOG = [
  { model: 'deepseek-chat', name: 'DeepSeek-V4-Pro', org: 'DeepSeek', ctx: '1M', provider: 'deepseek', tags: ['通用', '推理', '代码'] },
  { model: 'deepseek-flash', name: 'DeepSeek-V4.1-Flash', org: 'DeepSeek', ctx: '1M', provider: 'deepseek', tags: ['多模态', 'Agent'] },
  { model: 'kimi-k3', name: 'Kimi K3', org: 'Moonshot', ctx: '1M', provider: 'moonshot', tags: ['长文本', '推理'] },
  { model: 'glm-5.3', name: 'GLM-5.3', org: 'Zhipu', ctx: '200K', provider: 'zhipu', tags: ['中文', 'Agent'] },
  { model: 'qwen3.8-max', name: 'Qwen3.8-Max', org: 'Alibaba', ctx: '262K', provider: 'dashscope', tags: ['通用', '中文'] },
  { model: 'qwen3.8-2.4t-a95b', name: 'Qwen3.8-2.4T-A95B', org: 'Alibaba', ctx: '262K', provider: 'dashscope', tags: ['通用', '代码'] },
  { model: 'MiniMax-M3', name: 'MiniMax M3', org: 'MiniMax', ctx: '1M', provider: 'minimax', tags: ['多模态', '代码'] },
  { model: 'Mistral-Medium-3.5', name: 'Mistral Medium 3.5', org: 'Mistral AI', ctx: '256K', provider: 'custom', tags: ['多语', '代码'] },
  { model: 'google/gemma-4-31b-it', name: 'Gemma 4 31B', org: 'Google', ctx: '256K', provider: 'openrouter', tags: ['轻量', '本地'] },
  { model: 'meta-llama/Llama-4-Scout-17B-16E-Instruct', name: 'Llama-4-Scout', org: 'Meta', ctx: '10M', provider: 'siliconflow', tags: ['多模态', '长文本'] },
  { model: 'gpt-oss-120b', name: 'gpt-oss-120b', org: 'OpenAI', ctx: '131K', provider: 'siliconflow', tags: ['轻量', '本地'] },
  { model: 'gpt-oss-20b', name: 'gpt-oss-20b', org: 'OpenAI', ctx: '131K', provider: 'siliconflow', tags: ['轻量', '本地'] },
  { model: 'qwen3.5-max', name: 'Qwen3.5-Max', org: 'Alibaba', ctx: '256K', provider: 'dashscope', tags: ['通用', '中文'] },
  { model: 'llama3.1:70b', name: 'Llama 3.1 70B（Ollama）', org: 'Ollama', ctx: '128K', provider: 'ollama', tags: ['本地'] },
  { model: 'qwen3:32b', name: 'Qwen3 32B（Ollama）', org: 'Ollama', ctx: '128K', provider: 'ollama', tags: ['本地', '中文'] },
  { model: 'deepseek-ai/DeepSeek-V4', name: 'DeepSeek-V4（硅基流动）', org: 'SiliconFlow', ctx: '1M', provider: 'siliconflow', tags: ['通用'] },
  { model: 'anthropic/claude-sonnet-4.5', name: 'Claude Sonnet 4.5（中转）', org: 'OpenRouter', ctx: '200K', provider: 'openrouter', tags: ['通用', '代码'] }
];

const MODES = [
  { id: 'office', name: '办公', ico: 'doc', desc: '文档 · 表格 · 汇报 · 纪要', color: 'amber' },
  { id: 'dev', name: '开发', ico: 'code', desc: '架构 · 编码 · 调试 · 部署', color: 'blue' },
  { id: 'design', name: '设计', ico: 'pen', desc: '界面 · 视觉 · 原型 · 设计系统', color: 'violet' }
];

const EXPERTS = [
  {
    "id": "e1",
    "name": "公文与汇报专家",
    "cat": "办公",
    "initial": "公",
    "tone": "amber",
    "desc": "按党政机关与上市公司口径撰写请示、报告、总结，自动对齐格式与用语规范。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 13008,
    "installed": false
  },
  {
    "id": "e2",
    "name": "经营数据分析师",
    "cat": "办公",
    "initial": "经",
    "tone": "amber",
    "desc": "从原始表格到同环比拆解、异常归因与结论页，输出可直接汇报的图表。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 43320,
    "installed": false
  },
  {
    "id": "e3",
    "name": "会议纪要官",
    "cat": "办公",
    "initial": "会",
    "tone": "amber",
    "desc": "整理录音与速记，输出决议、待办、责任人与时间节点。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 22256,
    "installed": false
  },
  {
    "id": "e4",
    "name": "招聘与面试官",
    "cat": "办公",
    "initial": "招",
    "tone": "amber",
    "desc": "拆解岗位画像、筛选简历、生成结构化面试题库与评估表。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 13688,
    "installed": false
  },
  {
    "id": "e5",
    "name": "PPT 汇报教练",
    "cat": "办公",
    "initial": "PP",
    "tone": "amber",
    "desc": "把零散材料转成叙事清晰、版式专业的路演与汇报稿。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 44144,
    "installed": true
  },
  {
    "id": "e6",
    "name": "合同与法务助理",
    "cat": "办公",
    "initial": "合",
    "tone": "amber",
    "desc": "起草、审查与比对合同条款，标注风险点并给出修改建议。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 38072,
    "installed": false
  },
  {
    "id": "e7",
    "name": "行政事务专员",
    "cat": "办公",
    "initial": "行",
    "tone": "amber",
    "desc": "差旅、会务、用章与日程统筹，产出标准化流程文档。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 44672,
    "installed": false
  },
  {
    "id": "e8",
    "name": "文档格式美化师",
    "cat": "办公",
    "initial": "文",
    "tone": "amber",
    "desc": "统一字号、页眉页脚、目录与引用格式，产出交付级文档。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 22624,
    "installed": true
  },
  {
    "id": "e9",
    "name": "会议组织者",
    "cat": "办公",
    "initial": "会",
    "tone": "amber",
    "desc": "议题征集、议程设计、材料汇编与纪要分发。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 61408,
    "installed": true
  },
  {
    "id": "e10",
    "name": "公文写作辅导",
    "cat": "办公",
    "initial": "公",
    "tone": "amber",
    "desc": "机关常用文种的写作要点与规范讲解。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 35224,
    "installed": false
  },
  {
    "id": "e11",
    "name": "述职报告专家",
    "cat": "办公",
    "initial": "述",
    "tone": "amber",
    "desc": "梳理年度工作，量化成果、提炼亮点。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 48352,
    "installed": true
  },
  {
    "id": "e12",
    "name": "招标投标专员",
    "cat": "办公",
    "initial": "招",
    "tone": "amber",
    "desc": "解读招标文件，编制投标响应与偏离表。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 65888,
    "installed": false
  },
  {
    "id": "e13",
    "name": "档案管理员",
    "cat": "办公",
    "initial": "档",
    "tone": "amber",
    "desc": "电子与纸质档案的分类、著录与归档。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 5736,
    "installed": false
  },
  {
    "id": "e14",
    "name": "新闻稿撰写",
    "cat": "办公",
    "initial": "新",
    "tone": "amber",
    "desc": "媒体与内部通稿的新闻写作。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 59112,
    "installed": true
  },
  {
    "id": "e15",
    "name": "工作总结助手",
    "cat": "办公",
    "initial": "工",
    "tone": "amber",
    "desc": "周报、月报、年度总结的结构化梳理。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 3952,
    "installed": true
  },
  {
    "id": "e16",
    "name": "制度流程顾问",
    "cat": "办公",
    "initial": "制",
    "tone": "amber",
    "desc": "梳理流程，起草管理制度与 SOP。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 50032,
    "installed": true
  },
  {
    "id": "e17",
    "name": "内部通知拟稿",
    "cat": "办公",
    "initial": "内",
    "tone": "amber",
    "desc": "各类通知、公告、通报的规范拟写。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 48240,
    "installed": true
  },
  {
    "id": "e18",
    "name": "会议材料汇编",
    "cat": "办公",
    "initial": "会",
    "tone": "amber",
    "desc": "汇总上会材料，生成议题清单与决议草案。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 58184,
    "installed": false
  },
  {
    "id": "e19",
    "name": "涉外商务函电",
    "cat": "办公",
    "initial": "涉",
    "tone": "amber",
    "desc": "中英文商务信函、邀请函的规范撰写。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 12712,
    "installed": true
  },
  {
    "id": "e20",
    "name": "办公效率教练",
    "cat": "办公",
    "initial": "办",
    "tone": "amber",
    "desc": "诊断低效环节，给出工具与流程优化建议。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 62616,
    "installed": false
  },
  {
    "id": "e21",
    "name": "知识管理专员",
    "cat": "办公",
    "initial": "知",
    "tone": "amber",
    "desc": "沉淀团队知识，搭建目录与标签体系。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 3760,
    "installed": false
  },
  {
    "id": "e22",
    "name": "培训课件制作",
    "cat": "办公",
    "initial": "培",
    "tone": "amber",
    "desc": "把培训内容做成结构清晰的课件。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 67120,
    "installed": false
  },
  {
    "id": "e23",
    "name": "演讲与致辞拟稿",
    "cat": "办公",
    "initial": "演",
    "tone": "amber",
    "desc": "为发言、致辞、汇报提供口语化稿件。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 33944,
    "installed": false
  },
  {
    "id": "e24",
    "name": "政策解读助手",
    "cat": "办公",
    "initial": "政",
    "tone": "amber",
    "desc": "解读政策文件，提炼要点、影响与建议。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 59080,
    "installed": true
  },
  {
    "id": "e25",
    "name": "会议速记整理",
    "cat": "办公",
    "initial": "会",
    "tone": "amber",
    "desc": "快速整理速记稿与录音，还原会议内容。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 39520,
    "installed": false
  },
  {
    "id": "e26",
    "name": "商务谈判助手",
    "cat": "办公",
    "initial": "商",
    "tone": "amber",
    "desc": "谈判要点、策略与纪要整理。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 65176,
    "installed": false
  },
  {
    "id": "e27",
    "name": "标书编写专家",
    "cat": "办公",
    "initial": "标",
    "tone": "amber",
    "desc": "技术标、商务标的编写与排版。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 45608,
    "installed": false
  },
  {
    "id": "e28",
    "name": "政府项目申报",
    "cat": "办公",
    "initial": "政",
    "tone": "amber",
    "desc": "项目申报书、可研报告的撰写。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 40432,
    "installed": false
  },
  {
    "id": "e29",
    "name": "员工手册撰写",
    "cat": "办公",
    "initial": "员",
    "tone": "amber",
    "desc": "员工手册、制度汇编的编写。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 40424,
    "installed": true
  },
  {
    "id": "e30",
    "name": "公文排版专家",
    "cat": "办公",
    "initial": "公",
    "tone": "amber",
    "desc": "红头文件、公文的规范排版与印制。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 67648,
    "installed": false
  },
  {
    "id": "e31",
    "name": "会议策划专家",
    "cat": "办公",
    "initial": "会",
    "tone": "amber",
    "desc": "会议主题、议程与物料策划。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 28800,
    "installed": true
  },
  {
    "id": "e32",
    "name": "公文翻译专家",
    "cat": "办公",
    "initial": "公",
    "tone": "amber",
    "desc": "公文、合同的中英互译。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 16280,
    "installed": false
  },
  {
    "id": "e33",
    "name": "档案数字化",
    "cat": "办公",
    "initial": "档",
    "tone": "amber",
    "desc": "纸质档案扫描、OCR 与数字化归档。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 45512,
    "installed": false
  },
  {
    "id": "e34",
    "name": "行政预算专员",
    "cat": "办公",
    "initial": "行",
    "tone": "amber",
    "desc": "行政费用预算、报销与台账管理。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 19088,
    "installed": false
  },
  {
    "id": "e35",
    "name": "办公用品采购",
    "cat": "办公",
    "initial": "办",
    "tone": "amber",
    "desc": "采购计划、比价与供应商管理。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 47512,
    "installed": false
  },
  {
    "id": "e36",
    "name": "印章管理",
    "cat": "办公",
    "initial": "印",
    "tone": "amber",
    "desc": "用章流程、登记与合规管理。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 52104,
    "installed": true
  },
  {
    "id": "e37",
    "name": "前台接待规范",
    "cat": "办公",
    "initial": "前",
    "tone": "amber",
    "desc": "接待流程、话术与服务规范。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 47680,
    "installed": false
  },
  {
    "id": "e38",
    "name": "保密管理",
    "cat": "办公",
    "initial": "保",
    "tone": "amber",
    "desc": "保密制度、涉密文件管理。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 43336,
    "installed": true
  },
  {
    "id": "e39",
    "name": "值班排班",
    "cat": "办公",
    "initial": "值",
    "tone": "amber",
    "desc": "值班安排、轮换与记录。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 17344,
    "installed": true
  },
  {
    "id": "e40",
    "name": "公文流转",
    "cat": "办公",
    "initial": "公",
    "tone": "amber",
    "desc": "收发文登记、流转与督办。",
    "skills": [
      "docx",
      "xlsx",
      "pptx"
    ],
    "runs": 17352,
    "installed": true
  },
  {
    "id": "e41",
    "name": "软件架构师",
    "cat": "开发",
    "initial": "软",
    "tone": "blue",
    "desc": "从需求到模块拆分、数据模型与技术选型。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 18864,
    "installed": false
  },
  {
    "id": "e42",
    "name": "微服务架构师",
    "cat": "开发",
    "initial": "微",
    "tone": "blue",
    "desc": "从需求到模块拆分、数据模型与技术选型。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 24776,
    "installed": false
  },
  {
    "id": "e43",
    "name": "云原生架构师",
    "cat": "开发",
    "initial": "云",
    "tone": "blue",
    "desc": "从需求到模块拆分、数据模型与技术选型。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 9408,
    "installed": false
  },
  {
    "id": "e44",
    "name": "系统架构师",
    "cat": "开发",
    "initial": "系",
    "tone": "blue",
    "desc": "从需求到模块拆分、数据模型与技术选型。",
    "skills": [
      "code",
      "git",
      "terminal",
      "review"
    ],
    "runs": 4568,
    "installed": false
  },
  {
    "id": "e45",
    "name": "全栈工程师",
    "cat": "开发",
    "initial": "全",
    "tone": "blue",
    "desc": "前后端一体化实现，跑通构建与测试。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 4184,
    "installed": false
  },
  {
    "id": "e46",
    "name": "Node 全栈",
    "cat": "开发",
    "initial": "No",
    "tone": "blue",
    "desc": "前后端一体化实现，跑通构建与测试。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 8392,
    "installed": false
  },
  {
    "id": "e47",
    "name": "Python 全栈",
    "cat": "开发",
    "initial": "Py",
    "tone": "blue",
    "desc": "前后端一体化实现，跑通构建与测试。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 22992,
    "installed": false
  },
  {
    "id": "e48",
    "name": "Go 全栈",
    "cat": "开发",
    "initial": "Go",
    "tone": "blue",
    "desc": "前后端一体化实现，跑通构建与测试。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 60952,
    "installed": true
  },
  {
    "id": "e49",
    "name": "代码审查员",
    "cat": "开发",
    "initial": "代",
    "tone": "blue",
    "desc": "逐文件审查风险，产出分级与补丁。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 50744,
    "installed": false
  },
  {
    "id": "e50",
    "name": "技术文档工程师",
    "cat": "开发",
    "initial": "技",
    "tone": "blue",
    "desc": "阅读代码生成 API 文档与接入指南。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 64160,
    "installed": true
  },
  {
    "id": "e51",
    "name": "后端工程师",
    "cat": "开发",
    "initial": "后",
    "tone": "blue",
    "desc": "设计接口、数据模型与缓存策略。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 10880,
    "installed": true
  },
  {
    "id": "e52",
    "name": "Java 后端",
    "cat": "开发",
    "initial": "Ja",
    "tone": "blue",
    "desc": "设计接口、数据模型与缓存策略。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 26152,
    "installed": true
  },
  {
    "id": "e53",
    "name": "Go 后端",
    "cat": "开发",
    "initial": "Go",
    "tone": "blue",
    "desc": "设计接口、数据模型与缓存策略。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 63728,
    "installed": false
  },
  {
    "id": "e54",
    "name": "Python 后端",
    "cat": "开发",
    "initial": "Py",
    "tone": "blue",
    "desc": "设计接口、数据模型与缓存策略。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 56512,
    "installed": false
  },
  {
    "id": "e55",
    "name": "Node 后端",
    "cat": "开发",
    "initial": "No",
    "tone": "blue",
    "desc": "设计接口、数据模型与缓存策略。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 31584,
    "installed": true
  },
  {
    "id": "e56",
    "name": "Rust 后端",
    "cat": "开发",
    "initial": "Ru",
    "tone": "blue",
    "desc": "设计接口、数据模型与缓存策略。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 2816,
    "installed": false
  },
  {
    "id": "e57",
    "name": "PHP 后端",
    "cat": "开发",
    "initial": "PH",
    "tone": "blue",
    "desc": "设计接口、数据模型与缓存策略。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 36336,
    "installed": true
  },
  {
    "id": "e58",
    "name": "C# 后端",
    "cat": "开发",
    "initial": "C",
    "tone": "blue",
    "desc": "设计接口、数据模型与缓存策略。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 25592,
    "installed": true
  },
  {
    "id": "e59",
    "name": "前端工程师",
    "cat": "开发",
    "initial": "前",
    "tone": "blue",
    "desc": "组件化 UI 与交互动效。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 54032,
    "installed": false
  },
  {
    "id": "e60",
    "name": "React 前端",
    "cat": "开发",
    "initial": "Re",
    "tone": "blue",
    "desc": "组件化 UI 与交互动效。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 10392,
    "installed": false
  },
  {
    "id": "e61",
    "name": "Vue 前端",
    "cat": "开发",
    "initial": "Vu",
    "tone": "blue",
    "desc": "组件化 UI 与交互动效。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 32472,
    "installed": false
  },
  {
    "id": "e62",
    "name": "Angular 前端",
    "cat": "开发",
    "initial": "An",
    "tone": "blue",
    "desc": "组件化 UI 与交互动效。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 40952,
    "installed": false
  },
  {
    "id": "e63",
    "name": "Svelte 前端",
    "cat": "开发",
    "initial": "Sv",
    "tone": "blue",
    "desc": "组件化 UI 与交互动效。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 48192,
    "installed": false
  },
  {
    "id": "e64",
    "name": "小程序前端",
    "cat": "开发",
    "initial": "小",
    "tone": "blue",
    "desc": "组件化 UI 与交互动效。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 60224,
    "installed": false
  },
  {
    "id": "e65",
    "name": "DevOps 工程师",
    "cat": "开发",
    "initial": "De",
    "tone": "blue",
    "desc": "CI/CD、容器编排与监控告警。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 19800,
    "installed": false
  },
  {
    "id": "e66",
    "name": "安全与渗透专家",
    "cat": "开发",
    "initial": "安",
    "tone": "blue",
    "desc": "安全扫描、漏洞复现与加固。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 34904,
    "installed": false
  },
  {
    "id": "e67",
    "name": "测试工程师",
    "cat": "开发",
    "initial": "测",
    "tone": "blue",
    "desc": "测试用例、自动化与覆盖率。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 34792,
    "installed": false
  },
  {
    "id": "e68",
    "name": "功能测试",
    "cat": "开发",
    "initial": "功",
    "tone": "blue",
    "desc": "测试用例、自动化与覆盖率。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 43152,
    "installed": true
  },
  {
    "id": "e69",
    "name": "自动化测试",
    "cat": "开发",
    "initial": "自",
    "tone": "blue",
    "desc": "测试用例、自动化与覆盖率。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 55256,
    "installed": true
  },
  {
    "id": "e70",
    "name": "性能测试",
    "cat": "开发",
    "initial": "性",
    "tone": "blue",
    "desc": "测试用例、自动化与覆盖率。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 22632,
    "installed": false
  },
  {
    "id": "e71",
    "name": "安全测试",
    "cat": "开发",
    "initial": "安",
    "tone": "blue",
    "desc": "测试用例、自动化与覆盖率。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 6504,
    "installed": true
  },
  {
    "id": "e72",
    "name": "接口测试",
    "cat": "开发",
    "initial": "接",
    "tone": "blue",
    "desc": "测试用例、自动化与覆盖率。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 17976,
    "installed": false
  },
  {
    "id": "e73",
    "name": "数据库工程师",
    "cat": "开发",
    "initial": "数",
    "tone": "blue",
    "desc": "库表设计、索引优化与迁移。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 64968,
    "installed": false
  },
  {
    "id": "e74",
    "name": "MySQL 专家",
    "cat": "开发",
    "initial": "My",
    "tone": "blue",
    "desc": "库表设计、索引优化与迁移。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 31384,
    "installed": true
  },
  {
    "id": "e75",
    "name": "PostgreSQL 专家",
    "cat": "开发",
    "initial": "Po",
    "tone": "blue",
    "desc": "库表设计、索引优化与迁移。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 43512,
    "installed": false
  },
  {
    "id": "e76",
    "name": "MongoDB 专家",
    "cat": "开发",
    "initial": "Mo",
    "tone": "blue",
    "desc": "库表设计、索引优化与迁移。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 44104,
    "installed": false
  },
  {
    "id": "e77",
    "name": "Redis 专家",
    "cat": "开发",
    "initial": "Re",
    "tone": "blue",
    "desc": "库表设计、索引优化与迁移。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 61728,
    "installed": false
  },
  {
    "id": "e78",
    "name": "移动端工程师",
    "cat": "开发",
    "initial": "移",
    "tone": "blue",
    "desc": "iOS/Android 应用开发。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 40360,
    "installed": false
  },
  {
    "id": "e79",
    "name": "iOS 工程师",
    "cat": "开发",
    "initial": "iO",
    "tone": "blue",
    "desc": "iOS/Android 应用开发。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 5504,
    "installed": false
  },
  {
    "id": "e80",
    "name": "Android 工程师",
    "cat": "开发",
    "initial": "An",
    "tone": "blue",
    "desc": "iOS/Android 应用开发。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 24144,
    "installed": false
  },
  {
    "id": "e81",
    "name": "Flutter 工程师",
    "cat": "开发",
    "initial": "Fl",
    "tone": "blue",
    "desc": "iOS/Android 应用开发。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 46200,
    "installed": true
  },
  {
    "id": "e82",
    "name": "React Native 工程师",
    "cat": "开发",
    "initial": "Re",
    "tone": "blue",
    "desc": "iOS/Android 应用开发。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 7168,
    "installed": true
  },
  {
    "id": "e83",
    "name": "算法工程师",
    "cat": "开发",
    "initial": "算",
    "tone": "blue",
    "desc": "ML 与推荐、搜索排序算法。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 21320,
    "installed": false
  },
  {
    "id": "e84",
    "name": "嵌入式工程师",
    "cat": "开发",
    "initial": "嵌",
    "tone": "blue",
    "desc": "固件与驱动开发，实时系统调试。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 41048,
    "installed": false
  },
  {
    "id": "e85",
    "name": "区块链工程师",
    "cat": "开发",
    "initial": "区",
    "tone": "blue",
    "desc": "智能合约与去中心化应用。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 7464,
    "installed": true
  },
  {
    "id": "e86",
    "name": "智能合约开发",
    "cat": "开发",
    "initial": "智",
    "tone": "blue",
    "desc": "智能合约与去中心化应用。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 52648,
    "installed": false
  },
  {
    "id": "e87",
    "name": "Web3 前端",
    "cat": "开发",
    "initial": "We",
    "tone": "blue",
    "desc": "智能合约与去中心化应用。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 20864,
    "installed": false
  },
  {
    "id": "e88",
    "name": "链上数据",
    "cat": "开发",
    "initial": "链",
    "tone": "blue",
    "desc": "智能合约与去中心化应用。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 36848,
    "installed": true
  },
  {
    "id": "e89",
    "name": "游戏开发工程师",
    "cat": "开发",
    "initial": "游",
    "tone": "blue",
    "desc": "游戏逻辑、渲染与物理引擎。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 65464,
    "installed": false
  },
  {
    "id": "e90",
    "name": "Unity 开发",
    "cat": "开发",
    "initial": "Un",
    "tone": "blue",
    "desc": "游戏逻辑、渲染与物理引擎。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 51776,
    "installed": false
  },
  {
    "id": "e91",
    "name": "Unreal 开发",
    "cat": "开发",
    "initial": "Un",
    "tone": "blue",
    "desc": "游戏逻辑、渲染与物理引擎。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 47688,
    "installed": true
  },
  {
    "id": "e92",
    "name": "Cocos 开发",
    "cat": "开发",
    "initial": "Co",
    "tone": "blue",
    "desc": "游戏逻辑、渲染与物理引擎。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 20752,
    "installed": false
  },
  {
    "id": "e93",
    "name": "大数据工程师",
    "cat": "开发",
    "initial": "大",
    "tone": "blue",
    "desc": "海量数据采集、存储与计算。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 58008,
    "installed": true
  },
  {
    "id": "e94",
    "name": "Flink 工程师",
    "cat": "开发",
    "initial": "Fl",
    "tone": "blue",
    "desc": "海量数据采集、存储与计算。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 26696,
    "installed": false
  },
  {
    "id": "e95",
    "name": "Spark 工程师",
    "cat": "开发",
    "initial": "Sp",
    "tone": "blue",
    "desc": "海量数据采集、存储与计算。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 47840,
    "installed": true
  },
  {
    "id": "e96",
    "name": "AI 应用工程师",
    "cat": "开发",
    "initial": "AI",
    "tone": "blue",
    "desc": "大模型落地，RAG、Agent 与工具调用。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 54704,
    "installed": false
  },
  {
    "id": "e97",
    "name": "性能优化专家",
    "cat": "开发",
    "initial": "性",
    "tone": "blue",
    "desc": "定位性能瓶颈，全链路优化。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 18848,
    "installed": false
  },
  {
    "id": "e98",
    "name": "可靠性工程师(SRE)",
    "cat": "开发",
    "initial": "可",
    "tone": "blue",
    "desc": "可用性、容量与故障应急。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 55312,
    "installed": false
  },
  {
    "id": "e99",
    "name": "微服务专家",
    "cat": "开发",
    "initial": "微",
    "tone": "blue",
    "desc": "服务拆分、治理与分布式事务。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 51808,
    "installed": false
  },
  {
    "id": "e100",
    "name": "API 设计专家",
    "cat": "开发",
    "initial": "AP",
    "tone": "blue",
    "desc": "接口规范、版本治理与文档。",
    "skills": [
      "code",
      "git",
      "terminal"
    ],
    "runs": 17392,
    "installed": true
  },
  {
    "id": "e101",
    "name": "UI 设计系统专家",
    "cat": "设计",
    "initial": "UI",
    "tone": "violet",
    "desc": "设计 Token、组件与栅格规范。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 55480,
    "installed": false
  },
  {
    "id": "e102",
    "name": "品牌视觉总监",
    "cat": "设计",
    "initial": "品",
    "tone": "violet",
    "desc": "从调性到色彩、字体、图形语言。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 17792,
    "installed": false
  },
  {
    "id": "e103",
    "name": "交互原型师",
    "cat": "设计",
    "initial": "交",
    "tone": "violet",
    "desc": "流程图到高保真原型。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 2848,
    "installed": false
  },
  {
    "id": "e104",
    "name": "数据可视化工程师",
    "cat": "设计",
    "initial": "数",
    "tone": "violet",
    "desc": "大屏与报告图表，可交互看板。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 67336,
    "installed": true
  },
  {
    "id": "e105",
    "name": "插画与动效设计师",
    "cat": "设计",
    "initial": "插",
    "tone": "violet",
    "desc": "品牌插画、图标与动效。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 39760,
    "installed": false
  },
  {
    "id": "e106",
    "name": "用户体验研究员",
    "cat": "设计",
    "initial": "用",
    "tone": "violet",
    "desc": "访谈、可用性测试与旅程地图。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 59080,
    "installed": false
  },
  {
    "id": "e107",
    "name": "视觉设计师",
    "cat": "设计",
    "initial": "视",
    "tone": "violet",
    "desc": "海报、Banner 与营销视觉。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 67784,
    "installed": false
  },
  {
    "id": "e108",
    "name": "字体与排版专家",
    "cat": "设计",
    "initial": "字",
    "tone": "violet",
    "desc": "字体、字号层级与排版节奏。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 3536,
    "installed": true
  },
  {
    "id": "e109",
    "name": "3D 设计师",
    "cat": "设计",
    "initial": "3",
    "tone": "violet",
    "desc": "建模、渲染与场景搭建。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 32736,
    "installed": true
  },
  {
    "id": "e110",
    "name": "游戏 UI 设计师",
    "cat": "设计",
    "initial": "游",
    "tone": "violet",
    "desc": "游戏界面、HUD 与反馈。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 42848,
    "installed": true
  },
  {
    "id": "e111",
    "name": "动效设计专家",
    "cat": "设计",
    "initial": "动",
    "tone": "violet",
    "desc": "转场、微交互与引导动效。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 23032,
    "installed": false
  },
  {
    "id": "e112",
    "name": "无障碍设计顾问",
    "cat": "设计",
    "initial": "无",
    "tone": "violet",
    "desc": "对比、焦点与语义化。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 12056,
    "installed": true
  },
  {
    "id": "e113",
    "name": "包装设计专家",
    "cat": "设计",
    "initial": "包",
    "tone": "violet",
    "desc": "包装、标签与物料延展。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 21696,
    "installed": true
  },
  {
    "id": "e114",
    "name": "图标设计专家",
    "cat": "设计",
    "initial": "图",
    "tone": "violet",
    "desc": "统一图标语言与网格。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 61360,
    "installed": true
  },
  {
    "id": "e115",
    "name": "设计系统工程师",
    "cat": "设计",
    "initial": "设",
    "tone": "violet",
    "desc": "设计规范落地为组件。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 44264,
    "installed": false
  },
  {
    "id": "e116",
    "name": "服务设计专家",
    "cat": "设计",
    "initial": "服",
    "tone": "violet",
    "desc": "服务蓝图与端到端体验。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 51608,
    "installed": false
  },
  {
    "id": "e117",
    "name": "界面文案专家",
    "cat": "设计",
    "initial": "界",
    "tone": "violet",
    "desc": "微文案、按钮与提示语。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 4848,
    "installed": false
  },
  {
    "id": "e118",
    "name": "数字艺术指导",
    "cat": "设计",
    "initial": "数",
    "tone": "violet",
    "desc": "创意方向与视觉调性。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 48144,
    "installed": false
  },
  {
    "id": "e119",
    "name": "原型测试专家",
    "cat": "设计",
    "initial": "原",
    "tone": "violet",
    "desc": "快速验证原型可用性。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 34768,
    "installed": false
  },
  {
    "id": "e120",
    "name": "品牌策略顾问",
    "cat": "设计",
    "initial": "品",
    "tone": "violet",
    "desc": "品牌定位、命名与主张。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 3528,
    "installed": false
  },
  {
    "id": "e121",
    "name": "电商视觉设计师",
    "cat": "设计",
    "initial": "电",
    "tone": "violet",
    "desc": "电商页面与详情页视觉。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 43096,
    "installed": false
  },
  {
    "id": "e122",
    "name": "B 端产品设计师",
    "cat": "设计",
    "initial": "B",
    "tone": "violet",
    "desc": "企业级产品的信息架构与界面。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 67056,
    "installed": false
  },
  {
    "id": "e123",
    "name": "C 端产品设计师",
    "cat": "设计",
    "initial": "C",
    "tone": "violet",
    "desc": "消费级产品的体验设计。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 49320,
    "installed": false
  },
  {
    "id": "e124",
    "name": "网页设计师",
    "cat": "设计",
    "initial": "网",
    "tone": "violet",
    "desc": "官网与落地页设计。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 34832,
    "installed": false
  },
  {
    "id": "e125",
    "name": "信息架构师",
    "cat": "设计",
    "initial": "信",
    "tone": "violet",
    "desc": "信息层级与导航结构。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 60144,
    "installed": true
  },
  {
    "id": "e126",
    "name": "HMI 设计师",
    "cat": "设计",
    "initial": "HM",
    "tone": "violet",
    "desc": "车机与人机界面设计。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 39840,
    "installed": false
  },
  {
    "id": "e127",
    "name": "AR/VR 设计师",
    "cat": "设计",
    "initial": "AR",
    "tone": "violet",
    "desc": "沉浸式体验与空间界面。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 17312,
    "installed": false
  },
  {
    "id": "e128",
    "name": "动效工程师",
    "cat": "设计",
    "initial": "动",
    "tone": "violet",
    "desc": "动效实现与性能优化。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 2704,
    "installed": false
  },
  {
    "id": "e129",
    "name": "设计评审专家",
    "cat": "设计",
    "initial": "设",
    "tone": "violet",
    "desc": "设计走查与质量把控。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 48472,
    "installed": false
  },
  {
    "id": "e130",
    "name": "设计思维教练",
    "cat": "设计",
    "initial": "设",
    "tone": "violet",
    "desc": "设计思维方法与工作坊。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 60208,
    "installed": false
  },
  {
    "id": "e131",
    "name": "视觉品牌规范",
    "cat": "设计",
    "initial": "视",
    "tone": "violet",
    "desc": "品牌视觉识别系统规范。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 12696,
    "installed": true
  },
  {
    "id": "e132",
    "name": "设计趋势研究员",
    "cat": "设计",
    "initial": "设",
    "tone": "violet",
    "desc": "设计趋势与风格研究。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 17216,
    "installed": true
  },
  {
    "id": "e133",
    "name": "图标动效专家",
    "cat": "设计",
    "initial": "图",
    "tone": "violet",
    "desc": "图标动效与状态反馈。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 23184,
    "installed": true
  },
  {
    "id": "e134",
    "name": "字体设计师",
    "cat": "设计",
    "initial": "字",
    "tone": "violet",
    "desc": "中英文字体设计与定制。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 4624,
    "installed": true
  },
  {
    "id": "e135",
    "name": "信息可视化专家",
    "cat": "设计",
    "initial": "信",
    "tone": "violet",
    "desc": "复杂信息的可视化表达。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 52480,
    "installed": false
  },
  {
    "id": "e136",
    "name": "展会视觉设计师",
    "cat": "设计",
    "initial": "展",
    "tone": "violet",
    "desc": "展会物料与空间视觉。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 42312,
    "installed": false
  },
  {
    "id": "e137",
    "name": "社媒视觉设计师",
    "cat": "设计",
    "initial": "社",
    "tone": "violet",
    "desc": "社媒配图与模板设计。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 64576,
    "installed": false
  },
  {
    "id": "e138",
    "name": "视频视觉设计师",
    "cat": "设计",
    "initial": "视",
    "tone": "violet",
    "desc": "视频封面、字幕与包装。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 58592,
    "installed": false
  },
  {
    "id": "e139",
    "name": "插画师",
    "cat": "设计",
    "initial": "插",
    "tone": "violet",
    "desc": "商业插画与风格化创作。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 53992,
    "installed": false
  },
  {
    "id": "e140",
    "name": "UI 动效专家",
    "cat": "设计",
    "initial": "UI",
    "tone": "violet",
    "desc": "界面动效与转场设计。",
    "skills": [
      "figma",
      "image",
      "chart"
    ],
    "runs": 14288,
    "installed": true
  },
  {
    "id": "e141",
    "name": "数据科学家",
    "cat": "数据",
    "initial": "数",
    "tone": "green",
    "desc": "建模与预测分析。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 12216,
    "installed": true
  },
  {
    "id": "e142",
    "name": "数据分析师",
    "cat": "数据",
    "initial": "数",
    "tone": "green",
    "desc": "清洗、拆解、归因与报告。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 28048,
    "installed": true
  },
  {
    "id": "e143",
    "name": "数据工程师",
    "cat": "数据",
    "initial": "数",
    "tone": "green",
    "desc": "ETL、数仓建模与治理。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 45608,
    "installed": false
  },
  {
    "id": "e144",
    "name": "AI 训练与微调专家",
    "cat": "数据",
    "initial": "AI",
    "tone": "green",
    "desc": "数据准备、微调与评测。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 60616,
    "installed": true
  },
  {
    "id": "e145",
    "name": "商业分析师",
    "cat": "数据",
    "initial": "商",
    "tone": "green",
    "desc": "市场研究、模式拆解与测算。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 41928,
    "installed": false
  },
  {
    "id": "e146",
    "name": "商业智能(BI)专家",
    "cat": "数据",
    "initial": "商",
    "tone": "green",
    "desc": "指标、看板与决策。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 42416,
    "installed": false
  },
  {
    "id": "e147",
    "name": "统计学家",
    "cat": "数据",
    "initial": "统",
    "tone": "green",
    "desc": "实验设计与因果推断。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 49072,
    "installed": false
  },
  {
    "id": "e148",
    "name": "数据治理专家",
    "cat": "数据",
    "initial": "数",
    "tone": "green",
    "desc": "标准、血缘与合规。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 66424,
    "installed": false
  },
  {
    "id": "e149",
    "name": "机器学习工程师",
    "cat": "数据",
    "initial": "机",
    "tone": "green",
    "desc": "训练、部署与监控。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 49048,
    "installed": false
  },
  {
    "id": "e150",
    "name": "风控分析师",
    "cat": "数据",
    "initial": "风",
    "tone": "green",
    "desc": "信贷与交易风险建模。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 32472,
    "installed": false
  },
  {
    "id": "e151",
    "name": "用户增长分析师",
    "cat": "数据",
    "initial": "用",
    "tone": "green",
    "desc": "漏斗、留存与归因。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 54584,
    "installed": false
  },
  {
    "id": "e152",
    "name": "地理空间分析师",
    "cat": "数据",
    "initial": "地",
    "tone": "green",
    "desc": "地图、空间统计与位置智能。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 3240,
    "installed": true
  },
  {
    "id": "e153",
    "name": "量化研究员",
    "cat": "数据",
    "initial": "量",
    "tone": "green",
    "desc": "因子挖掘、回测与策略。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 31896,
    "installed": true
  },
  {
    "id": "e154",
    "name": "数据产品经理",
    "cat": "数据",
    "initial": "数",
    "tone": "green",
    "desc": "数据产品、口径与交付。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 17144,
    "installed": false
  },
  {
    "id": "e155",
    "name": "文本挖掘专家",
    "cat": "数据",
    "initial": "文",
    "tone": "green",
    "desc": "NLP 与文本分析。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 31136,
    "installed": false
  },
  {
    "id": "e156",
    "name": "爬虫与采集专家",
    "cat": "数据",
    "initial": "爬",
    "tone": "green",
    "desc": "合规采集与清洗。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 63088,
    "installed": true
  },
  {
    "id": "e157",
    "name": "数据标注专家",
    "cat": "数据",
    "initial": "数",
    "tone": "green",
    "desc": "标注规范与质检。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 35072,
    "installed": false
  },
  {
    "id": "e158",
    "name": "A/B 测试专家",
    "cat": "数据",
    "initial": "AB",
    "tone": "green",
    "desc": "实验设计与显著性。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 9440,
    "installed": false
  },
  {
    "id": "e159",
    "name": "时序预测专家",
    "cat": "数据",
    "initial": "时",
    "tone": "green",
    "desc": "时序建模与预测。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 60520,
    "installed": false
  },
  {
    "id": "e160",
    "name": "知识图谱专家",
    "cat": "数据",
    "initial": "知",
    "tone": "green",
    "desc": "实体关系与图谱构建。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 48984,
    "installed": true
  },
  {
    "id": "e161",
    "name": "数据挖掘工程师",
    "cat": "数据",
    "initial": "数",
    "tone": "green",
    "desc": "模式挖掘与特征。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 30816,
    "installed": true
  },
  {
    "id": "e162",
    "name": "实时计算专家",
    "cat": "数据",
    "initial": "实",
    "tone": "green",
    "desc": "实时流计算与指标。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 2752,
    "installed": false
  },
  {
    "id": "e163",
    "name": "数据可视化专家",
    "cat": "数据",
    "initial": "数",
    "tone": "green",
    "desc": "可视化表达与叙事。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 54640,
    "installed": false
  },
  {
    "id": "e164",
    "name": "指标体系建设专家",
    "cat": "数据",
    "initial": "指",
    "tone": "green",
    "desc": "指标口径与统一。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 53240,
    "installed": true
  },
  {
    "id": "e165",
    "name": "数据仓库架构师",
    "cat": "数据",
    "initial": "数",
    "tone": "green",
    "desc": "数仓分层与建模。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 23944,
    "installed": false
  },
  {
    "id": "e166",
    "name": "用户画像专家",
    "cat": "数据",
    "initial": "用",
    "tone": "green",
    "desc": "画像体系与标签。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 45504,
    "installed": false
  },
  {
    "id": "e167",
    "name": "推荐系统专家",
    "cat": "数据",
    "initial": "推",
    "tone": "green",
    "desc": "召回排序与策略。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 2544,
    "installed": false
  },
  {
    "id": "e168",
    "name": "搜索算法专家",
    "cat": "数据",
    "initial": "搜",
    "tone": "green",
    "desc": "搜索排序与相关性。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 64416,
    "installed": true
  },
  {
    "id": "e169",
    "name": "广告算法专家",
    "cat": "数据",
    "initial": "广",
    "tone": "green",
    "desc": "广告投放与出价。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 13600,
    "installed": false
  },
  {
    "id": "e170",
    "name": "NLP 工程师",
    "cat": "数据",
    "initial": "NL",
    "tone": "green",
    "desc": "自然语言处理与应用。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 6352,
    "installed": false
  },
  {
    "id": "e171",
    "name": "计算机视觉工程师",
    "cat": "数据",
    "initial": "计",
    "tone": "green",
    "desc": "图像视频理解与应用。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 66184,
    "installed": false
  },
  {
    "id": "e172",
    "name": "语音算法工程师",
    "cat": "数据",
    "initial": "语",
    "tone": "green",
    "desc": "语音识别与合成。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 9736,
    "installed": false
  },
  {
    "id": "e173",
    "name": "运筹优化专家",
    "cat": "数据",
    "initial": "运",
    "tone": "green",
    "desc": "调度、路径与资源优化。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 29168,
    "installed": false
  },
  {
    "id": "e174",
    "name": "因果推断专家",
    "cat": "数据",
    "initial": "因",
    "tone": "green",
    "desc": "因果分析与效应评估。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 66144,
    "installed": true
  },
  {
    "id": "e175",
    "name": "数据安全专家",
    "cat": "数据",
    "initial": "数",
    "tone": "green",
    "desc": "数据安全与脱敏。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 47752,
    "installed": true
  },
  {
    "id": "e176",
    "name": "数据血缘专家",
    "cat": "数据",
    "initial": "数",
    "tone": "green",
    "desc": "数据血缘与影响分析。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 38112,
    "installed": false
  },
  {
    "id": "e177",
    "name": "报表开发工程师",
    "cat": "数据",
    "initial": "报",
    "tone": "green",
    "desc": "报表与固定报告。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 11576,
    "installed": true
  },
  {
    "id": "e178",
    "name": "自助分析专家",
    "cat": "数据",
    "initial": "自",
    "tone": "green",
    "desc": "自助分析与数据赋能。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 7528,
    "installed": true
  },
  {
    "id": "e179",
    "name": "主数据管理专家",
    "cat": "数据",
    "initial": "主",
    "tone": "green",
    "desc": "主数据与参考数据。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 8672,
    "installed": false
  },
  {
    "id": "e180",
    "name": "数据分析团队负责人",
    "cat": "数据",
    "initial": "数",
    "tone": "green",
    "desc": "分析团队管理与规划。",
    "skills": [
      "sql",
      "python",
      "chart"
    ],
    "runs": 11896,
    "installed": false
  },
  {
    "id": "e181",
    "name": "增长营销专家",
    "cat": "营销",
    "initial": "增",
    "tone": "teal",
    "desc": "获客漏斗、活动与转化。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 2600,
    "installed": true
  },
  {
    "id": "e182",
    "name": "内容创作与运营",
    "cat": "营销",
    "initial": "内",
    "tone": "teal",
    "desc": "选题、脚本与多平台文案。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 28480,
    "installed": true
  },
  {
    "id": "e183",
    "name": "社媒运营专家",
    "cat": "营销",
    "initial": "社",
    "tone": "teal",
    "desc": "多平台内容排期与复盘。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 52944,
    "installed": false
  },
  {
    "id": "e184",
    "name": "SEO 优化专家",
    "cat": "营销",
    "initial": "SE",
    "tone": "teal",
    "desc": "关键词、技术 SEO 与内容。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 40440,
    "installed": false
  },
  {
    "id": "e185",
    "name": "SEM 投放专家",
    "cat": "营销",
    "initial": "SE",
    "tone": "teal",
    "desc": "搜索与信息流广告投放。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 15048,
    "installed": false
  },
  {
    "id": "e186",
    "name": "品牌营销经理",
    "cat": "营销",
    "initial": "品",
    "tone": "teal",
    "desc": "品牌战役策划与执行。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 55368,
    "installed": false
  },
  {
    "id": "e187",
    "name": "私域运营专家",
    "cat": "营销",
    "initial": "私",
    "tone": "teal",
    "desc": "社群、企微与会员运营。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 45680,
    "installed": true
  },
  {
    "id": "e188",
    "name": "直播运营专家",
    "cat": "营销",
    "initial": "直",
    "tone": "teal",
    "desc": "直播脚本、选品与复盘。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 23200,
    "installed": true
  },
  {
    "id": "e189",
    "name": "邮件营销专家",
    "cat": "营销",
    "initial": "邮",
    "tone": "teal",
    "desc": "邮件旅程与触达。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 25536,
    "installed": false
  },
  {
    "id": "e190",
    "name": "短视频营销专家",
    "cat": "营销",
    "initial": "短",
    "tone": "teal",
    "desc": "短视频脚本、拍摄与投放。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 35960,
    "installed": false
  },
  {
    "id": "e191",
    "name": "活动策划专家",
    "cat": "营销",
    "initial": "活",
    "tone": "teal",
    "desc": "活动创意、执行与评估。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 37080,
    "installed": false
  },
  {
    "id": "e192",
    "name": "公关传播专家",
    "cat": "营销",
    "initial": "公",
    "tone": "teal",
    "desc": "媒体关系、稿件与舆情。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 4184,
    "installed": false
  },
  {
    "id": "e193",
    "name": "用户运营专家",
    "cat": "营销",
    "initial": "用",
    "tone": "teal",
    "desc": "分层、召回与激励。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 58352,
    "installed": true
  },
  {
    "id": "e194",
    "name": "渠道运营专家",
    "cat": "营销",
    "initial": "渠",
    "tone": "teal",
    "desc": "渠道拓展、政策与赋能。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 53664,
    "installed": true
  },
  {
    "id": "e195",
    "name": "广告创意专家",
    "cat": "营销",
    "initial": "广",
    "tone": "teal",
    "desc": "创意洞察与高转化素材。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 63872,
    "installed": true
  },
  {
    "id": "e196",
    "name": "内容营销专家",
    "cat": "营销",
    "initial": "内",
    "tone": "teal",
    "desc": "内容矩阵与分发。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 4472,
    "installed": false
  },
  {
    "id": "e197",
    "name": "事件营销专家",
    "cat": "营销",
    "initial": "事",
    "tone": "teal",
    "desc": "事件策划与传播。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 7728,
    "installed": false
  },
  {
    "id": "e198",
    "name": "社群运营专家",
    "cat": "营销",
    "initial": "社",
    "tone": "teal",
    "desc": "社群活跃与转化。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 26808,
    "installed": false
  },
  {
    "id": "e199",
    "name": "KOL 营销专家",
    "cat": "营销",
    "initial": "KO",
    "tone": "teal",
    "desc": "达人合作与种草。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 58352,
    "installed": false
  },
  {
    "id": "e200",
    "name": "会员运营专家",
    "cat": "营销",
    "initial": "会",
    "tone": "teal",
    "desc": "会员体系与权益。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 54456,
    "installed": false
  },
  {
    "id": "e201",
    "name": "裂变增长专家",
    "cat": "营销",
    "initial": "裂",
    "tone": "teal",
    "desc": "裂变玩法与拉新。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 3520,
    "installed": true
  },
  {
    "id": "e202",
    "name": "本地化营销专家",
    "cat": "营销",
    "initial": "本",
    "tone": "teal",
    "desc": "本地化策略与执行。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 48080,
    "installed": false
  },
  {
    "id": "e203",
    "name": "品牌公关专家",
    "cat": "营销",
    "initial": "品",
    "tone": "teal",
    "desc": "品牌声誉与危机公关。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 41896,
    "installed": true
  },
  {
    "id": "e204",
    "name": "数字营销分析师",
    "cat": "营销",
    "initial": "数",
    "tone": "teal",
    "desc": "营销数据与 ROI。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 45392,
    "installed": false
  },
  {
    "id": "e205",
    "name": "跨境电商营销",
    "cat": "营销",
    "initial": "跨",
    "tone": "teal",
    "desc": "跨境电商投放与运营。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 34640,
    "installed": true
  },
  {
    "id": "e206",
    "name": "新零售营销专家",
    "cat": "营销",
    "initial": "新",
    "tone": "teal",
    "desc": "线上线下融合营销。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 49848,
    "installed": false
  },
  {
    "id": "e207",
    "name": "B2B 营销专家",
    "cat": "营销",
    "initial": "B2",
    "tone": "teal",
    "desc": "企业客户营销与线索。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 17512,
    "installed": false
  },
  {
    "id": "e208",
    "name": "效果营销专家",
    "cat": "营销",
    "initial": "效",
    "tone": "teal",
    "desc": "效果广告与优化。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 46696,
    "installed": false
  },
  {
    "id": "e209",
    "name": "营销自动化专家",
    "cat": "营销",
    "initial": "营",
    "tone": "teal",
    "desc": "营销自动化工具与流程。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 58720,
    "installed": false
  },
  {
    "id": "e210",
    "name": "达人营销专家",
    "cat": "营销",
    "initial": "达",
    "tone": "teal",
    "desc": "达人矩阵与投放。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 22192,
    "installed": true
  },
  {
    "id": "e211",
    "name": "品牌内容专家",
    "cat": "营销",
    "initial": "品",
    "tone": "teal",
    "desc": "品牌内容体系与调性。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 66400,
    "installed": true
  },
  {
    "id": "e212",
    "name": "视频营销专家",
    "cat": "营销",
    "initial": "视",
    "tone": "teal",
    "desc": "视频内容与传播。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 48128,
    "installed": false
  },
  {
    "id": "e213",
    "name": "节日营销专家",
    "cat": "营销",
    "initial": "节",
    "tone": "teal",
    "desc": "节日营销与造节。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 6088,
    "installed": false
  },
  {
    "id": "e214",
    "name": "口碑营销专家",
    "cat": "营销",
    "initial": "口",
    "tone": "teal",
    "desc": "口碑与评价管理。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 58424,
    "installed": false
  },
  {
    "id": "e215",
    "name": "转化率优化专家",
    "cat": "营销",
    "initial": "转",
    "tone": "teal",
    "desc": "落地页与转化优化。",
    "skills": [
      "search",
      "docx",
      "image"
    ],
    "runs": 50192,
    "installed": true
  },
  {
    "id": "e216",
    "name": "产品经理助理",
    "cat": "运营",
    "initial": "产",
    "tone": "violet",
    "desc": "需求拆解、PRD 与排期。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 22968,
    "installed": false
  },
  {
    "id": "e217",
    "name": "客户成功经理",
    "cat": "运营",
    "initial": "客",
    "tone": "violet",
    "desc": "交付、FAQ 与续费。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 56080,
    "installed": false
  },
  {
    "id": "e218",
    "name": "项目管理专家",
    "cat": "运营",
    "initial": "项",
    "tone": "violet",
    "desc": "里程碑、风险与资源。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 55440,
    "installed": false
  },
  {
    "id": "e219",
    "name": "产品运营专家",
    "cat": "运营",
    "initial": "产",
    "tone": "violet",
    "desc": "产品数据、功能运营。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 31248,
    "installed": true
  },
  {
    "id": "e220",
    "name": "客服主管",
    "cat": "运营",
    "initial": "客",
    "tone": "violet",
    "desc": "话术、工单与满意度。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 43440,
    "installed": true
  },
  {
    "id": "e221",
    "name": "供应链运营专家",
    "cat": "运营",
    "initial": "供",
    "tone": "violet",
    "desc": "采购、库存与履约。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 24016,
    "installed": true
  },
  {
    "id": "e222",
    "name": "电商运营专家",
    "cat": "运营",
    "initial": "电",
    "tone": "violet",
    "desc": "店铺、选品与活动。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 22768,
    "installed": false
  },
  {
    "id": "e223",
    "name": "本地生活运营专家",
    "cat": "运营",
    "initial": "本",
    "tone": "violet",
    "desc": "门店、团购与会员。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 45080,
    "installed": true
  },
  {
    "id": "e224",
    "name": "内容社区运营专家",
    "cat": "运营",
    "initial": "内",
    "tone": "violet",
    "desc": "氛围、生态与创作者。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 40848,
    "installed": false
  },
  {
    "id": "e225",
    "name": "商业化运营专家",
    "cat": "运营",
    "initial": "商",
    "tone": "violet",
    "desc": "广告、会员与增值。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 13296,
    "installed": false
  },
  {
    "id": "e226",
    "name": "数据合规运营专家",
    "cat": "运营",
    "initial": "数",
    "tone": "violet",
    "desc": "隐私、合规与风控。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 28304,
    "installed": true
  },
  {
    "id": "e227",
    "name": "流程优化专家",
    "cat": "运营",
    "initial": "流",
    "tone": "violet",
    "desc": "流程梳理与再造。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 52944,
    "installed": true
  },
  {
    "id": "e228",
    "name": "运营数据分析师",
    "cat": "运营",
    "initial": "运",
    "tone": "violet",
    "desc": "指标拆解与复盘。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 63384,
    "installed": true
  },
  {
    "id": "e229",
    "name": "用户反馈分析师",
    "cat": "运营",
    "initial": "用",
    "tone": "violet",
    "desc": "反馈聚合与洞察。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 57288,
    "installed": true
  },
  {
    "id": "e230",
    "name": "版本发布运营",
    "cat": "运营",
    "initial": "版",
    "tone": "violet",
    "desc": "发布节奏与灰度。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 50536,
    "installed": false
  },
  {
    "id": "e231",
    "name": "产品运营专家 2",
    "cat": "运营",
    "initial": "产",
    "tone": "violet",
    "desc": "产品生命周期运营。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 38736,
    "installed": true
  },
  {
    "id": "e232",
    "name": "渠道运营",
    "cat": "运营",
    "initial": "渠",
    "tone": "violet",
    "desc": "渠道政策与赋能。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 43568,
    "installed": true
  },
  {
    "id": "e233",
    "name": "内容审核专家",
    "cat": "运营",
    "initial": "内",
    "tone": "violet",
    "desc": "内容审核与标准。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 60080,
    "installed": false
  },
  {
    "id": "e234",
    "name": "社区管理员",
    "cat": "运营",
    "initial": "社",
    "tone": "violet",
    "desc": "社区秩序与氛围。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 5616,
    "installed": false
  },
  {
    "id": "e235",
    "name": "游戏运营专家",
    "cat": "运营",
    "initial": "游",
    "tone": "violet",
    "desc": "活动与用户运营。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 35776,
    "installed": false
  },
  {
    "id": "e236",
    "name": "教育运营专家",
    "cat": "运营",
    "initial": "教",
    "tone": "violet",
    "desc": "课程与学员运营。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 67384,
    "installed": false
  },
  {
    "id": "e237",
    "name": "金融运营专家",
    "cat": "运营",
    "initial": "金",
    "tone": "violet",
    "desc": "金融产品运营与合规。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 40224,
    "installed": true
  },
  {
    "id": "e238",
    "name": "SaaS 运营专家",
    "cat": "运营",
    "initial": "Sa",
    "tone": "violet",
    "desc": "SaaS 增长与留存。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 31176,
    "installed": false
  },
  {
    "id": "e239",
    "name": "活动运营",
    "cat": "运营",
    "initial": "活",
    "tone": "violet",
    "desc": "活动策划与执行。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 29720,
    "installed": false
  },
  {
    "id": "e240",
    "name": "商家运营",
    "cat": "运营",
    "initial": "商",
    "tone": "violet",
    "desc": "商家拓展与赋能。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 9200,
    "installed": false
  },
  {
    "id": "e241",
    "name": "品类运营",
    "cat": "运营",
    "initial": "品",
    "tone": "violet",
    "desc": "品类规划与选品。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 16808,
    "installed": true
  },
  {
    "id": "e242",
    "name": "直播运营",
    "cat": "运营",
    "initial": "直",
    "tone": "violet",
    "desc": "直播间运营与转化。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 34168,
    "installed": true
  },
  {
    "id": "e243",
    "name": "社群运营",
    "cat": "运营",
    "initial": "社",
    "tone": "violet",
    "desc": "社群增长与活跃。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 12112,
    "installed": false
  },
  {
    "id": "e244",
    "name": "会员运营",
    "cat": "运营",
    "initial": "会",
    "tone": "violet",
    "desc": "会员体系与复购。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 16528,
    "installed": true
  },
  {
    "id": "e245",
    "name": "数据运营",
    "cat": "运营",
    "initial": "数",
    "tone": "violet",
    "desc": "数据驱动运营决策。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 60736,
    "installed": false
  },
  {
    "id": "e246",
    "name": "品牌运营",
    "cat": "运营",
    "initial": "品",
    "tone": "violet",
    "desc": "品牌日常运营与传播。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 61008,
    "installed": false
  },
  {
    "id": "e247",
    "name": "产品增长专家",
    "cat": "运营",
    "initial": "产",
    "tone": "violet",
    "desc": "产品增长实验与优化。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 35016,
    "installed": true
  },
  {
    "id": "e248",
    "name": "用户增长专家",
    "cat": "运营",
    "initial": "用",
    "tone": "violet",
    "desc": "拉新、激活与留存。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 23848,
    "installed": true
  },
  {
    "id": "e249",
    "name": "内容运营专家",
    "cat": "运营",
    "initial": "内",
    "tone": "violet",
    "desc": "内容供给与分发。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 27488,
    "installed": false
  },
  {
    "id": "e250",
    "name": "平台治理专家",
    "cat": "运营",
    "initial": "平",
    "tone": "violet",
    "desc": "平台规则与治理。",
    "skills": [
      "docx",
      "xlsx",
      "automation"
    ],
    "runs": 24344,
    "installed": false
  },
  {
    "id": "e251",
    "name": "财务分析师",
    "cat": "金融与法务",
    "initial": "财",
    "tone": "amber",
    "desc": "财务报表、预算与预测。",
    "skills": [
      "docx",
      "xlsx",
      "pdf"
    ],
    "runs": 42680,
    "installed": false
  },
  {
    "id": "e252",
    "name": "投资顾问",
    "cat": "金融与法务",
    "initial": "投",
    "tone": "amber",
    "desc": "资产配置与风险建议。",
    "skills": [
      "docx",
      "xlsx",
      "pdf"
    ],
    "runs": 24136,
    "installed": false
  },
  {
    "id": "e253",
    "name": "税务顾问",
    "cat": "金融与法务",
    "initial": "税",
    "tone": "amber",
    "desc": "税务筹划与合规。",
    "skills": [
      "docx",
      "xlsx",
      "pdf"
    ],
    "runs": 23376,
    "installed": false
  },
  {
    "id": "e254",
    "name": "审计专家",
    "cat": "金融与法务",
    "initial": "审",
    "tone": "amber",
    "desc": "审计、合规与风险。",
    "skills": [
      "docx",
      "xlsx",
      "pdf"
    ],
    "runs": 60312,
    "installed": false
  },
  {
    "id": "e255",
    "name": "法务顾问",
    "cat": "金融与法务",
    "initial": "法",
    "tone": "amber",
    "desc": "合同、合规与争议。",
    "skills": [
      "docx",
      "xlsx",
      "pdf"
    ],
    "runs": 43944,
    "installed": false
  },
  {
    "id": "e256",
    "name": "知识产权顾问",
    "cat": "金融与法务",
    "initial": "知",
    "tone": "amber",
    "desc": "专利、商标与著作权。",
    "skills": [
      "docx",
      "xlsx",
      "pdf"
    ],
    "runs": 58320,
    "installed": false
  },
  {
    "id": "e257",
    "name": "合规风控专家",
    "cat": "金融与法务",
    "initial": "合",
    "tone": "amber",
    "desc": "监管合规与内控。",
    "skills": [
      "docx",
      "xlsx",
      "pdf"
    ],
    "runs": 59560,
    "installed": false
  },
  {
    "id": "e258",
    "name": "精算师",
    "cat": "金融与法务",
    "initial": "精",
    "tone": "amber",
    "desc": "保险定价与准备金。",
    "skills": [
      "docx",
      "xlsx",
      "pdf"
    ],
    "runs": 10168,
    "installed": true
  },
  {
    "id": "e259",
    "name": "基金经理",
    "cat": "金融与法务",
    "initial": "基",
    "tone": "amber",
    "desc": "组合管理与业绩归因。",
    "skills": [
      "docx",
      "xlsx",
      "pdf"
    ],
    "runs": 60304,
    "installed": true
  },
  {
    "id": "e260",
    "name": "财务建模专家",
    "cat": "金融与法务",
    "initial": "财",
    "tone": "amber",
    "desc": "DCF、LBO 与估值。",
    "skills": [
      "docx",
      "xlsx",
      "pdf"
    ],
    "runs": 14296,
    "installed": true
  },
  {
    "id": "e261",
    "name": "保险顾问",
    "cat": "金融与法务",
    "initial": "保",
    "tone": "amber",
    "desc": "保险方案与理赔。",
    "skills": [
      "docx",
      "xlsx",
      "pdf"
    ],
    "runs": 36864,
    "installed": false
  },
  {
    "id": "e262",
    "name": "证券分析师",
    "cat": "金融与法务",
    "initial": "证",
    "tone": "amber",
    "desc": "行业与公司研究。",
    "skills": [
      "docx",
      "xlsx",
      "pdf"
    ],
    "runs": 18472,
    "installed": false
  },
  {
    "id": "e263",
    "name": "资本运作专家",
    "cat": "金融与法务",
    "initial": "资",
    "tone": "amber",
    "desc": "融资、并购与上市。",
    "skills": [
      "docx",
      "xlsx",
      "pdf"
    ],
    "runs": 5024,
    "installed": false
  },
  {
    "id": "e264",
    "name": "信用分析师",
    "cat": "金融与法务",
    "initial": "信",
    "tone": "amber",
    "desc": "信用评级与授信。",
    "skills": [
      "docx",
      "xlsx",
      "pdf"
    ],
    "runs": 47688,
    "installed": false
  },
  {
    "id": "e265",
    "name": "财富管理顾问",
    "cat": "金融与法务",
    "initial": "财",
    "tone": "amber",
    "desc": "高净值财富规划。",
    "skills": [
      "docx",
      "xlsx",
      "pdf"
    ],
    "runs": 62360,
    "installed": false
  },
  {
    "id": "e266",
    "name": "会计",
    "cat": "金融与法务",
    "initial": "会",
    "tone": "amber",
    "desc": "记账、核算与报表。",
    "skills": [
      "docx",
      "xlsx",
      "pdf"
    ],
    "runs": 6040,
    "installed": true
  },
  {
    "id": "e267",
    "name": "出纳",
    "cat": "金融与法务",
    "initial": "出",
    "tone": "amber",
    "desc": "资金收付与对账。",
    "skills": [
      "docx",
      "xlsx",
      "pdf"
    ],
    "runs": 37920,
    "installed": true
  },
  {
    "id": "e268",
    "name": "预算分析师",
    "cat": "金融与法务",
    "initial": "预",
    "tone": "amber",
    "desc": "预算编制与执行。",
    "skills": [
      "docx",
      "xlsx",
      "pdf"
    ],
    "runs": 9272,
    "installed": false
  },
  {
    "id": "e269",
    "name": "成本会计",
    "cat": "金融与法务",
    "initial": "成",
    "tone": "amber",
    "desc": "成本核算与控制。",
    "skills": [
      "docx",
      "xlsx",
      "pdf"
    ],
    "runs": 40912,
    "installed": false
  },
  {
    "id": "e270",
    "name": "管理会计",
    "cat": "金融与法务",
    "initial": "管",
    "tone": "amber",
    "desc": "管理报表与决策。",
    "skills": [
      "docx",
      "xlsx",
      "pdf"
    ],
    "runs": 25984,
    "installed": true
  },
  {
    "id": "e271",
    "name": "财务共享专家",
    "cat": "金融与法务",
    "initial": "财",
    "tone": "amber",
    "desc": "财务共享与标准化。",
    "skills": [
      "docx",
      "xlsx",
      "pdf"
    ],
    "runs": 44264,
    "installed": false
  },
  {
    "id": "e272",
    "name": "资金管理专家",
    "cat": "金融与法务",
    "initial": "资",
    "tone": "amber",
    "desc": "资金计划与调度。",
    "skills": [
      "docx",
      "xlsx",
      "pdf"
    ],
    "runs": 40928,
    "installed": true
  },
  {
    "id": "e273",
    "name": "融资专员",
    "cat": "金融与法务",
    "initial": "融",
    "tone": "amber",
    "desc": "融资方案与对接。",
    "skills": [
      "docx",
      "xlsx",
      "pdf"
    ],
    "runs": 50256,
    "installed": false
  },
  {
    "id": "e274",
    "name": "并购顾问",
    "cat": "金融与法务",
    "initial": "并",
    "tone": "amber",
    "desc": "并购交易与尽调。",
    "skills": [
      "docx",
      "xlsx",
      "pdf"
    ],
    "runs": 60328,
    "installed": false
  },
  {
    "id": "e275",
    "name": "股权激励专家",
    "cat": "金融与法务",
    "initial": "股",
    "tone": "amber",
    "desc": "股权激励方案设计。",
    "skills": [
      "docx",
      "xlsx",
      "pdf"
    ],
    "runs": 4648,
    "installed": true
  },
  {
    "id": "e276",
    "name": "公司法务",
    "cat": "金融与法务",
    "initial": "公",
    "tone": "amber",
    "desc": "公司治理与合同。",
    "skills": [
      "docx",
      "xlsx",
      "pdf"
    ],
    "runs": 61688,
    "installed": false
  },
  {
    "id": "e277",
    "name": "诉讼律师助理",
    "cat": "金融与法务",
    "initial": "诉",
    "tone": "amber",
    "desc": "诉讼材料与流程。",
    "skills": [
      "docx",
      "xlsx",
      "pdf"
    ],
    "runs": 44872,
    "installed": true
  },
  {
    "id": "e278",
    "name": "合规专员",
    "cat": "金融与法务",
    "initial": "合",
    "tone": "amber",
    "desc": "合规检查与整改。",
    "skills": [
      "docx",
      "xlsx",
      "pdf"
    ],
    "runs": 61368,
    "installed": false
  },
  {
    "id": "e279",
    "name": "反洗钱专家",
    "cat": "金融与法务",
    "initial": "反",
    "tone": "amber",
    "desc": "反洗钱与可疑交易。",
    "skills": [
      "docx",
      "xlsx",
      "pdf"
    ],
    "runs": 14672,
    "installed": false
  },
  {
    "id": "e280",
    "name": "数据隐私专家",
    "cat": "金融与法务",
    "initial": "数",
    "tone": "amber",
    "desc": "数据隐私与合规。",
    "skills": [
      "docx",
      "xlsx",
      "pdf"
    ],
    "runs": 16224,
    "installed": true
  },
  {
    "id": "e281",
    "name": "课程设计专家",
    "cat": "教育与研究",
    "initial": "课",
    "tone": "blue",
    "desc": "目标、大纲与评估设计。",
    "skills": [
      "docx",
      "pdf",
      "search"
    ],
    "runs": 40376,
    "installed": false
  },
  {
    "id": "e282",
    "name": "论文写作辅导",
    "cat": "教育与研究",
    "initial": "论",
    "tone": "blue",
    "desc": "选题、结构与文献综述。",
    "skills": [
      "docx",
      "pdf",
      "search"
    ],
    "runs": 48016,
    "installed": true
  },
  {
    "id": "e283",
    "name": "科研助理",
    "cat": "教育与研究",
    "initial": "科",
    "tone": "blue",
    "desc": "文献、数据与实验记录。",
    "skills": [
      "docx",
      "pdf",
      "search"
    ],
    "runs": 63544,
    "installed": true
  },
  {
    "id": "e284",
    "name": "语言学习教练",
    "cat": "教育与研究",
    "initial": "语",
    "tone": "blue",
    "desc": "语言学习路径与练习。",
    "skills": [
      "docx",
      "pdf",
      "search"
    ],
    "runs": 31904,
    "installed": false
  },
  {
    "id": "e285",
    "name": "学科辅导老师",
    "cat": "教育与研究",
    "initial": "学",
    "tone": "blue",
    "desc": "知识点讲解与答疑。",
    "skills": [
      "docx",
      "pdf",
      "search"
    ],
    "runs": 16600,
    "installed": false
  },
  {
    "id": "e286",
    "name": "考研辅导专家",
    "cat": "教育与研究",
    "initial": "考",
    "tone": "blue",
    "desc": "备考规划与真题。",
    "skills": [
      "docx",
      "pdf",
      "search"
    ],
    "runs": 33832,
    "installed": false
  },
  {
    "id": "e287",
    "name": "职业规划顾问",
    "cat": "教育与研究",
    "initial": "职",
    "tone": "blue",
    "desc": "定位、简历与面试。",
    "skills": [
      "docx",
      "pdf",
      "search"
    ],
    "runs": 51056,
    "installed": false
  },
  {
    "id": "e288",
    "name": "教育产品设计师",
    "cat": "教育与研究",
    "initial": "教",
    "tone": "blue",
    "desc": "教育产品功能设计。",
    "skills": [
      "docx",
      "pdf",
      "search"
    ],
    "runs": 53560,
    "installed": true
  },
  {
    "id": "e289",
    "name": "学术翻译专家",
    "cat": "教育与研究",
    "initial": "学",
    "tone": "blue",
    "desc": "学术论文专业翻译。",
    "skills": [
      "docx",
      "pdf",
      "search"
    ],
    "runs": 32784,
    "installed": false
  },
  {
    "id": "e290",
    "name": "科普作家",
    "cat": "教育与研究",
    "initial": "科",
    "tone": "blue",
    "desc": "把复杂知识讲得通俗。",
    "skills": [
      "docx",
      "pdf",
      "search"
    ],
    "runs": 36240,
    "installed": false
  },
  {
    "id": "e291",
    "name": "教研专家",
    "cat": "教育与研究",
    "initial": "教",
    "tone": "blue",
    "desc": "教研与课程研发。",
    "skills": [
      "docx",
      "pdf",
      "search"
    ],
    "runs": 50712,
    "installed": true
  },
  {
    "id": "e292",
    "name": "学习教练",
    "cat": "教育与研究",
    "initial": "学",
    "tone": "blue",
    "desc": "学习方法与习惯。",
    "skills": [
      "docx",
      "pdf",
      "search"
    ],
    "runs": 26512,
    "installed": false
  },
  {
    "id": "e293",
    "name": "留学顾问",
    "cat": "教育与研究",
    "initial": "留",
    "tone": "blue",
    "desc": "留学规划与申请。",
    "skills": [
      "docx",
      "pdf",
      "search"
    ],
    "runs": 6888,
    "installed": false
  },
  {
    "id": "e294",
    "name": "教育顾问",
    "cat": "教育与研究",
    "initial": "教",
    "tone": "blue",
    "desc": "教育规划与咨询。",
    "skills": [
      "docx",
      "pdf",
      "search"
    ],
    "runs": 4568,
    "installed": true
  },
  {
    "id": "e295",
    "name": "阅读指导",
    "cat": "教育与研究",
    "initial": "阅",
    "tone": "blue",
    "desc": "阅读方法与书单。",
    "skills": [
      "docx",
      "pdf",
      "search"
    ],
    "runs": 26136,
    "installed": false
  },
  {
    "id": "e296",
    "name": "实验设计专家",
    "cat": "教育与研究",
    "initial": "实",
    "tone": "blue",
    "desc": "实验设计与数据分析。",
    "skills": [
      "docx",
      "pdf",
      "search"
    ],
    "runs": 6688,
    "installed": true
  },
  {
    "id": "e297",
    "name": "论文润色专家",
    "cat": "教育与研究",
    "initial": "论",
    "tone": "blue",
    "desc": "论文语言与逻辑润色。",
    "skills": [
      "docx",
      "pdf",
      "search"
    ],
    "runs": 58104,
    "installed": true
  },
  {
    "id": "e298",
    "name": "文献管理专家",
    "cat": "教育与研究",
    "initial": "文",
    "tone": "blue",
    "desc": "文献检索与管理。",
    "skills": [
      "docx",
      "pdf",
      "search"
    ],
    "runs": 35576,
    "installed": false
  },
  {
    "id": "e299",
    "name": "研究方法专家",
    "cat": "教育与研究",
    "initial": "研",
    "tone": "blue",
    "desc": "研究方法与范式。",
    "skills": [
      "docx",
      "pdf",
      "search"
    ],
    "runs": 16656,
    "installed": false
  },
  {
    "id": "e300",
    "name": "教学设计师",
    "cat": "教育与研究",
    "initial": "教",
    "tone": "blue",
    "desc": "教学设计与课件。",
    "skills": [
      "docx",
      "pdf",
      "search"
    ],
    "runs": 57368,
    "installed": true
  }
];

const SKILLS = [
  {
    "id": "s1",
    "name": "workbuddy-docx",
    "label": "Word 文档",
    "cat": "办公",
    "desc": "生成研报、公文、合同等专业 .docx，支持版式美化。",
    "ver": "19.1.5",
    "tools": [
      "create",
      "format"
    ],
    "runs": 80320,
    "installed": false
  },
  {
    "id": "s2",
    "name": "workbuddy-pptx",
    "label": "演示文稿",
    "cat": "办公",
    "desc": "从大纲或文档一键成稿，套用企业模板产出 pptx。",
    "ver": "17.7.0",
    "tools": [
      "create",
      "format"
    ],
    "runs": 47088,
    "installed": false
  },
  {
    "id": "s3",
    "name": "workbuddy-xlsx",
    "label": "表格处理",
    "cat": "办公",
    "desc": "读写 xlsx/csv，构造公式、透视与图表。",
    "ver": "15.0.4",
    "tools": [
      "create",
      "format"
    ],
    "runs": 57472,
    "installed": false
  },
  {
    "id": "s4",
    "name": "workbuddy-pdf",
    "label": "PDF 解析",
    "cat": "办公",
    "desc": "抽取 PDF 文本、表格与图表，支持扫描件 OCR。",
    "ver": "3.2.5",
    "tools": [
      "create",
      "format"
    ],
    "runs": 14624,
    "installed": true
  },
  {
    "id": "s5",
    "name": "tencent-docs",
    "label": "腾讯文档",
    "cat": "办公",
    "desc": "在线文档、智能表格、收集表的创建与协作。",
    "ver": "29.3.7",
    "tools": [
      "create",
      "format"
    ],
    "runs": 83024,
    "installed": false
  },
  {
    "id": "s6",
    "name": "transcribe",
    "label": "语音转写",
    "cat": "办公",
    "desc": "长音频转写与说话人分离。",
    "ver": "3.0.2",
    "tools": [
      "create",
      "format"
    ],
    "runs": 24288,
    "installed": false
  },
  {
    "id": "s7",
    "name": "template-creator",
    "label": "版式模板",
    "cat": "办公",
    "desc": "抽取版式，生成可复用 skill 模板。",
    "ver": "17.1.5",
    "tools": [
      "create",
      "format"
    ],
    "runs": 70112,
    "installed": true
  },
  {
    "id": "s8",
    "name": "meeting-minutes",
    "label": "会议纪要",
    "cat": "办公",
    "desc": "录音速记转决议、待办与责任人。",
    "ver": "3.0.5",
    "tools": [
      "create",
      "format"
    ],
    "runs": 10032,
    "installed": true
  },
  {
    "id": "s9",
    "name": "wps-edit",
    "label": "WPS 编辑",
    "cat": "办公",
    "desc": "本地 WPS 文档的打开、编辑与保存。",
    "ver": "21.3.7",
    "tools": [
      "create",
      "format"
    ],
    "runs": 83984,
    "installed": false
  },
  {
    "id": "s10",
    "name": "pdf-sign",
    "label": "PDF 签署",
    "cat": "办公",
    "desc": "电子签章、批注与水印。",
    "ver": "23.6.5",
    "tools": [
      "create",
      "format"
    ],
    "runs": 80016,
    "installed": false
  },
  {
    "id": "s11",
    "name": "doc-compare",
    "label": "文档比对",
    "cat": "办公",
    "desc": "两份文档差异比对与修订追踪。",
    "ver": "21.5.1",
    "tools": [
      "create",
      "format"
    ],
    "runs": 42720,
    "installed": false
  },
  {
    "id": "s12",
    "name": "ocr-extract",
    "label": "OCR 提取",
    "cat": "办公",
    "desc": "图片与扫描件文字识别。",
    "ver": "25.1.2",
    "tools": [
      "create",
      "format"
    ],
    "runs": 30080,
    "installed": true
  },
  {
    "id": "s13",
    "name": "translate",
    "label": "翻译",
    "cat": "办公",
    "desc": "多语种翻译与本地化。",
    "ver": "21.5.7",
    "tools": [
      "create",
      "format"
    ],
    "runs": 57976,
    "installed": false
  },
  {
    "id": "s14",
    "name": "summarize",
    "label": "摘要提炼",
    "cat": "办公",
    "desc": "长文摘要、要点与金句提炼。",
    "ver": "9.2.5",
    "tools": [
      "create",
      "format"
    ],
    "runs": 73632,
    "installed": false
  },
  {
    "id": "s15",
    "name": "email-draft",
    "label": "邮件起草",
    "cat": "办公",
    "desc": "商务邮件起草、回复与跟进。",
    "ver": "25.0.3",
    "tools": [
      "create",
      "format"
    ],
    "runs": 39648,
    "installed": false
  },
  {
    "id": "s16",
    "name": "report-builder",
    "label": "报告生成",
    "cat": "办公",
    "desc": "数据报告、周报月报的结构化生成。",
    "ver": "11.6.5",
    "tools": [
      "create",
      "format"
    ],
    "runs": 69680,
    "installed": false
  },
  {
    "id": "s17",
    "name": "form-collect",
    "label": "表单收集",
    "cat": "办公",
    "desc": "问卷与收集表设计、回收与汇总。",
    "ver": "3.4.6",
    "tools": [
      "create",
      "format"
    ],
    "runs": 53488,
    "installed": false
  },
  {
    "id": "s18",
    "name": "calendar-sync",
    "label": "日程同步",
    "cat": "办公",
    "desc": "会议日程、提醒与参会人管理。",
    "ver": "13.2.8",
    "tools": [
      "create",
      "format"
    ],
    "runs": 71104,
    "installed": true
  },
  {
    "id": "s19",
    "name": "contacts-mgr",
    "label": "通讯录管理",
    "cat": "办公",
    "desc": "联系人、分组与备注管理。",
    "ver": "1.5.3",
    "tools": [
      "create",
      "format"
    ],
    "runs": 7936,
    "installed": true
  },
  {
    "id": "s20",
    "name": "scan-clean",
    "label": "扫描件清理",
    "cat": "办公",
    "desc": "扫描件去污、纠偏与增强。",
    "ver": "15.0.7",
    "tools": [
      "create",
      "format"
    ],
    "runs": 73952,
    "installed": true
  },
  {
    "id": "s21",
    "name": "spreadsheet-auto",
    "label": "表格自动化",
    "cat": "办公",
    "desc": "批量填表、合并与拆分。",
    "ver": "5.2.4",
    "tools": [
      "create",
      "format"
    ],
    "runs": 59376,
    "installed": false
  },
  {
    "id": "s22",
    "name": "mail-merge",
    "label": "邮件合并",
    "cat": "办公",
    "desc": "批量个性化邮件与函件。",
    "ver": "29.5.6",
    "tools": [
      "create",
      "format"
    ],
    "runs": 16768,
    "installed": false
  },
  {
    "id": "s23",
    "name": "doc-outline",
    "label": "文档大纲",
    "cat": "办公",
    "desc": "文档大纲生成与层级优化。",
    "ver": "25.5.5",
    "tools": [
      "create",
      "format"
    ],
    "runs": 81792,
    "installed": false
  },
  {
    "id": "s24",
    "name": "slide-design",
    "label": "幻灯片美化",
    "cat": "办公",
    "desc": "幻灯片版式、配色与图文优化。",
    "ver": "3.7.8",
    "tools": [
      "create",
      "format"
    ],
    "runs": 71952,
    "installed": true
  },
  {
    "id": "s25",
    "name": "pdf-merge",
    "label": "PDF 合并",
    "cat": "办公",
    "desc": "PDF 合并、拆分与页面重排。",
    "ver": "15.4.8",
    "tools": [
      "create",
      "format"
    ],
    "runs": 52560,
    "installed": true
  },
  {
    "id": "s26",
    "name": "file-convert",
    "label": "格式转换",
    "cat": "办公",
    "desc": "文档格式互转与压缩。",
    "ver": "11.3.5",
    "tools": [
      "create",
      "format"
    ],
    "runs": 66352,
    "installed": true
  },
  {
    "id": "s27",
    "name": "table-of-contents",
    "label": "目录生成",
    "cat": "办公",
    "desc": "自动生成与更新文档目录。",
    "ver": "9.2.6",
    "tools": [
      "create",
      "format"
    ],
    "runs": 59312,
    "installed": false
  },
  {
    "id": "s28",
    "name": "footnote-ref",
    "label": "引用管理",
    "cat": "办公",
    "desc": "脚注、尾注与参考文献管理。",
    "ver": "5.0.5",
    "tools": [
      "create",
      "format"
    ],
    "runs": 52016,
    "installed": false
  },
  {
    "id": "s29",
    "name": "heading-style",
    "label": "标题样式",
    "cat": "办公",
    "desc": "标题层级与样式统一。",
    "ver": "17.6.3",
    "tools": [
      "create",
      "format"
    ],
    "runs": 26192,
    "installed": true
  },
  {
    "id": "s30",
    "name": "page-layout",
    "label": "页面布局",
    "cat": "办公",
    "desc": "页边距、分栏与纸张设置。",
    "ver": "13.2.2",
    "tools": [
      "create",
      "format"
    ],
    "runs": 84592,
    "installed": false
  },
  {
    "id": "s31",
    "name": "chart-in-doc",
    "label": "文档图表",
    "cat": "办公",
    "desc": "文档内嵌图表生成。",
    "ver": "13.2.4",
    "tools": [
      "create",
      "format"
    ],
    "runs": 4352,
    "installed": false
  },
  {
    "id": "s32",
    "name": "watermark",
    "label": "水印",
    "cat": "办公",
    "desc": "文档水印添加与管理。",
    "ver": "3.7.8",
    "tools": [
      "create",
      "format"
    ],
    "runs": 83424,
    "installed": false
  },
  {
    "id": "s33",
    "name": "print-setup",
    "label": "打印设置",
    "cat": "办公",
    "desc": "打印排版与分页预览。",
    "ver": "11.7.3",
    "tools": [
      "create",
      "format"
    ],
    "runs": 72904,
    "installed": false
  },
  {
    "id": "s34",
    "name": "revision-track",
    "label": "修订追踪",
    "cat": "办公",
    "desc": "修订、批注与合并。",
    "ver": "23.4.2",
    "tools": [
      "create",
      "format"
    ],
    "runs": 25952,
    "installed": true
  },
  {
    "id": "s35",
    "name": "document-merge",
    "label": "文档合并",
    "cat": "办公",
    "desc": "多文档合并与统一格式。",
    "ver": "17.6.7",
    "tools": [
      "create",
      "format"
    ],
    "runs": 32032,
    "installed": false
  },
  {
    "id": "s36",
    "name": "meeting-notes",
    "label": "会议记录",
    "cat": "办公",
    "desc": "会议记录与要点整理。",
    "ver": "25.6.0",
    "tools": [
      "create",
      "format"
    ],
    "runs": 26976,
    "installed": false
  },
  {
    "id": "s37",
    "name": "action-items",
    "label": "待办提取",
    "cat": "办公",
    "desc": "会议待办与责任提取。",
    "ver": "19.1.7",
    "tools": [
      "create",
      "format"
    ],
    "runs": 84184,
    "installed": true
  },
  {
    "id": "s38",
    "name": "code-agent",
    "label": "代码智能体",
    "cat": "开发",
    "desc": "仓库级检索、跨文件重构、补丁生成。",
    "ver": "19.6.6",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 8752,
    "installed": false
  },
  {
    "id": "s39",
    "name": "terminal",
    "label": "终端执行",
    "cat": "开发",
    "desc": "沙箱内执行命令、装依赖、跑测试。",
    "ver": "9.0.2",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 26496,
    "installed": false
  },
  {
    "id": "s40",
    "name": "git-workflow",
    "label": "Git 工作流",
    "cat": "开发",
    "desc": "分支管理、审阅、提交与 PR。",
    "ver": "21.0.0",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 21504,
    "installed": false
  },
  {
    "id": "s41",
    "name": "code-review",
    "label": "代码审查",
    "cat": "开发",
    "desc": "逐文件审查风险，产出分级与补丁。",
    "ver": "9.7.6",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 18512,
    "installed": false
  },
  {
    "id": "s42",
    "name": "browser-use",
    "label": "浏览器控制",
    "cat": "开发",
    "desc": "打开页面、填表、截图与端到端测试。",
    "ver": "9.2.8",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 21392,
    "installed": true
  },
  {
    "id": "s43",
    "name": "computer-use",
    "label": "桌面操作",
    "cat": "开发",
    "desc": "操作图形界面应用与无 API 工具。",
    "ver": "29.7.7",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 42528,
    "installed": false
  },
  {
    "id": "s44",
    "name": "appshot",
    "label": "界面快照",
    "cat": "开发",
    "desc": "抓取窗口截图与文本送入对话。",
    "ver": "23.2.6",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 68240,
    "installed": true
  },
  {
    "id": "s45",
    "name": "site-publish",
    "label": "站点发布",
    "cat": "开发",
    "desc": "本地项目发布为在线链接。",
    "ver": "23.2.7",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 14096,
    "installed": false
  },
  {
    "id": "s46",
    "name": "cloud-deploy",
    "label": "云平台部署",
    "cat": "开发",
    "desc": "一键部署到托管平台。",
    "ver": "29.0.2",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 66960,
    "installed": true
  },
  {
    "id": "s47",
    "name": "ssh-remote",
    "label": "SSH 远程",
    "cat": "开发",
    "desc": "远程主机执行命令、传文件与排障。",
    "ver": "5.3.6",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 69488,
    "installed": false
  },
  {
    "id": "s48",
    "name": "build-test",
    "label": "构建与测试",
    "cat": "开发",
    "desc": "编译、单测、集成测试与打包。",
    "ver": "17.3.4",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 56592,
    "installed": false
  },
  {
    "id": "s49",
    "name": "file-search",
    "label": "文件搜索",
    "cat": "开发",
    "desc": "按名称、内容与类型检索文件。",
    "ver": "21.7.0",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 19744,
    "installed": false
  },
  {
    "id": "s50",
    "name": "api-test",
    "label": "接口测试",
    "cat": "开发",
    "desc": "API 请求构造、断言与回归。",
    "ver": "21.0.0",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 21488,
    "installed": false
  },
  {
    "id": "s51",
    "name": "db-migrate",
    "label": "数据库迁移",
    "cat": "开发",
    "desc": "Schema 迁移脚本与版本管理。",
    "ver": "23.2.3",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 59280,
    "installed": true
  },
  {
    "id": "s52",
    "name": "docker-build",
    "label": "镜像构建",
    "cat": "开发",
    "desc": "Dockerfile 编写、构建与推送。",
    "ver": "5.3.7",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 31520,
    "installed": true
  },
  {
    "id": "s53",
    "name": "k8s-deploy",
    "label": "K8s 部署",
    "cat": "开发",
    "desc": "清单编写、滚动发布与回滚。",
    "ver": "21.7.3",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 80192,
    "installed": false
  },
  {
    "id": "s54",
    "name": "lint-format",
    "label": "代码规范",
    "cat": "开发",
    "desc": "Lint 与格式化。",
    "ver": "9.2.4",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 31136,
    "installed": true
  },
  {
    "id": "s55",
    "name": "refactor",
    "label": "代码重构",
    "cat": "开发",
    "desc": "安全重构与坏味道清理。",
    "ver": "1.4.3",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 62480,
    "installed": false
  },
  {
    "id": "s56",
    "name": "debugger",
    "label": "调试助手",
    "cat": "开发",
    "desc": "断点、日志与调用链定位。",
    "ver": "5.2.8",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 6536,
    "installed": true
  },
  {
    "id": "s57",
    "name": "benchmark",
    "label": "性能基准",
    "cat": "开发",
    "desc": "基准测试与性能对比。",
    "ver": "27.3.5",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 77248,
    "installed": true
  },
  {
    "id": "s58",
    "name": "dependency-mgr",
    "label": "依赖管理",
    "cat": "开发",
    "desc": "依赖分析、升级与安全审计。",
    "ver": "13.5.0",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 63056,
    "installed": true
  },
  {
    "id": "s59",
    "name": "ci-pipeline",
    "label": "CI 流水线",
    "cat": "开发",
    "desc": "流水线配置与优化。",
    "ver": "17.3.4",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 34160,
    "installed": true
  },
  {
    "id": "s60",
    "name": "doc-gen",
    "label": "文档生成",
    "cat": "开发",
    "desc": "代码注释转 API 文档。",
    "ver": "25.2.1",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 12208,
    "installed": false
  },
  {
    "id": "s61",
    "name": "mock-server",
    "label": "Mock 服务",
    "cat": "开发",
    "desc": "接口 Mock 与联调数据。",
    "ver": "19.7.5",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 4944,
    "installed": false
  },
  {
    "id": "s62",
    "name": "websocket",
    "label": "实时通信",
    "cat": "开发",
    "desc": "WebSocket 实时消息。",
    "ver": "19.2.1",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 20528,
    "installed": false
  },
  {
    "id": "s63",
    "name": "graphql",
    "label": "GraphQL",
    "cat": "开发",
    "desc": "Schema 设计与查询优化。",
    "ver": "7.5.8",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 2656,
    "installed": false
  },
  {
    "id": "s64",
    "name": "microservice",
    "label": "微服务",
    "cat": "开发",
    "desc": "服务拆分与治理。",
    "ver": "21.8.3",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 50432,
    "installed": false
  },
  {
    "id": "s65",
    "name": "security-audit",
    "label": "安全审计",
    "cat": "开发",
    "desc": "依赖与代码安全扫描。",
    "ver": "5.3.7",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 53040,
    "installed": false
  },
  {
    "id": "s66",
    "name": "load-test",
    "label": "压测",
    "cat": "开发",
    "desc": "并发压测与容量评估。",
    "ver": "13.8.6",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 51904,
    "installed": false
  },
  {
    "id": "s67",
    "name": "feature-flag",
    "label": "特性开关",
    "cat": "开发",
    "desc": "灰度发布与特性开关。",
    "ver": "3.5.5",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 48608,
    "installed": false
  },
  {
    "id": "s68",
    "name": "unit-test",
    "label": "单元测试",
    "cat": "开发",
    "desc": "单元测试编写与覆盖。",
    "ver": "7.6.1",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 35616,
    "installed": true
  },
  {
    "id": "s69",
    "name": "e2e-test",
    "label": "端到端测试",
    "cat": "开发",
    "desc": "端到端自动化测试。",
    "ver": "5.6.8",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 14024,
    "installed": true
  },
  {
    "id": "s70",
    "name": "snapshot-test",
    "label": "快照测试",
    "cat": "开发",
    "desc": "UI 快照测试与回归。",
    "ver": "11.1.2",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 10112,
    "installed": false
  },
  {
    "id": "s71",
    "name": "code-format",
    "label": "代码格式化",
    "cat": "开发",
    "desc": "代码格式化与风格统一。",
    "ver": "17.7.4",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 78192,
    "installed": false
  },
  {
    "id": "s72",
    "name": "type-check",
    "label": "类型检查",
    "cat": "开发",
    "desc": "类型检查与类型安全。",
    "ver": "13.7.7",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 87488,
    "installed": true
  },
  {
    "id": "s73",
    "name": "bundler",
    "label": "打包构建",
    "cat": "开发",
    "desc": "打包器配置与优化。",
    "ver": "17.0.7",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 38048,
    "installed": true
  },
  {
    "id": "s74",
    "name": "dev-server",
    "label": "开发服务器",
    "cat": "开发",
    "desc": "开发服务器与热更新。",
    "ver": "9.5.1",
    "tools": [
      "exec",
      "edit"
    ],
    "runs": 57616,
    "installed": true
  },
  {
    "id": "s75",
    "name": "image-gen",
    "label": "图像生成",
    "cat": "设计",
    "desc": "文生图与图生图。",
    "ver": "1.1.1",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 77784,
    "installed": false
  },
  {
    "id": "s76",
    "name": "figma-bridge",
    "label": "Figma 桥接",
    "cat": "设计",
    "desc": "读取图层与变量，同步 Token。",
    "ver": "13.0.5",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 14464,
    "installed": true
  },
  {
    "id": "s77",
    "name": "chart-kit",
    "label": "图表套件",
    "cat": "设计",
    "desc": "推荐图表，生成可交互图表。",
    "ver": "13.0.4",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 49872,
    "installed": false
  },
  {
    "id": "s78",
    "name": "visualize",
    "label": "可视化呈现",
    "cat": "设计",
    "desc": "数据、流程做成图表与演示。",
    "ver": "9.1.6",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 33408,
    "installed": false
  },
  {
    "id": "s79",
    "name": "prototype",
    "label": "交互原型",
    "cat": "设计",
    "desc": "流程到高保真原型。",
    "ver": "23.4.1",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 13056,
    "installed": false
  },
  {
    "id": "s80",
    "name": "icon-set",
    "label": "图标库",
    "cat": "设计",
    "desc": "统一图标风格与网格。",
    "ver": "21.0.8",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 14480,
    "installed": false
  },
  {
    "id": "s81",
    "name": "color-system",
    "label": "配色系统",
    "cat": "设计",
    "desc": "色板、对比度与无障碍。",
    "ver": "27.6.1",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 3392,
    "installed": false
  },
  {
    "id": "s82",
    "name": "typography",
    "label": "排版",
    "cat": "设计",
    "desc": "字号层级、行距与字体配对。",
    "ver": "11.3.8",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 49048,
    "installed": false
  },
  {
    "id": "s83",
    "name": "motion-design",
    "label": "动效设计",
    "cat": "设计",
    "desc": "转场、微交互与动效。",
    "ver": "23.4.2",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 15696,
    "installed": false
  },
  {
    "id": "s84",
    "name": "3d-model",
    "label": "3D 模型",
    "cat": "设计",
    "desc": "三维建模与渲染。",
    "ver": "11.1.2",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 36192,
    "installed": true
  },
  {
    "id": "s85",
    "name": "video-gen",
    "label": "视频生成",
    "cat": "设计",
    "desc": "文生视频与图生视频。",
    "ver": "11.3.3",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 73728,
    "installed": false
  },
  {
    "id": "s86",
    "name": "photo-edit",
    "label": "图片处理",
    "cat": "设计",
    "desc": "去水印、增强、美化与抠图。",
    "ver": "19.8.5",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 83024,
    "installed": false
  },
  {
    "id": "s87",
    "name": "logo-design",
    "label": "Logo 设计",
    "cat": "设计",
    "desc": "品牌 Logo 方案与延展。",
    "ver": "23.3.0",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 14368,
    "installed": false
  },
  {
    "id": "s88",
    "name": "ui-kit",
    "label": "UI 组件库",
    "cat": "设计",
    "desc": "可复用组件与规范落地。",
    "ver": "1.8.3",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 49840,
    "installed": false
  },
  {
    "id": "s89",
    "name": "wireframe",
    "label": "线框图",
    "cat": "设计",
    "desc": "低保真线框与页面结构。",
    "ver": "29.6.4",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 18240,
    "installed": true
  },
  {
    "id": "s90",
    "name": "storyboard",
    "label": "分镜",
    "cat": "设计",
    "desc": "视频分镜脚本与画面规划。",
    "ver": "27.6.3",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 80768,
    "installed": false
  },
  {
    "id": "s91",
    "name": "poster-design",
    "label": "海报设计",
    "cat": "设计",
    "desc": "营销海报与 Banner 视觉。",
    "ver": "1.0.8",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 16848,
    "installed": false
  },
  {
    "id": "s92",
    "name": "icon-anim",
    "label": "图标动效",
    "cat": "设计",
    "desc": "图标动效与状态反馈。",
    "ver": "17.4.3",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 35904,
    "installed": true
  },
  {
    "id": "s93",
    "name": "accessible-ui",
    "label": "无障碍 2",
    "cat": "设计",
    "desc": "可访问性审计与修复。",
    "ver": "25.0.5",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 37584,
    "installed": true
  },
  {
    "id": "s94",
    "name": "design-token",
    "label": "设计 Token",
    "cat": "设计",
    "desc": "设计变量定义与跨端同步。",
    "ver": "9.6.6",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 76336,
    "installed": false
  },
  {
    "id": "s95",
    "name": "style-guide",
    "label": "风格指南",
    "cat": "设计",
    "desc": "风格指南与规范。",
    "ver": "17.6.8",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 31968,
    "installed": true
  },
  {
    "id": "s96",
    "name": "moodboard",
    "label": "情绪板",
    "cat": "设计",
    "desc": "情绪板与灵感收集。",
    "ver": "1.7.2",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 13616,
    "installed": false
  },
  {
    "id": "s97",
    "name": "design-audit",
    "label": "设计走查",
    "cat": "设计",
    "desc": "设计走查与一致性。",
    "ver": "17.1.7",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 45584,
    "installed": false
  },
  {
    "id": "s98",
    "name": "redline",
    "label": "标注",
    "cat": "设计",
    "desc": "设计标注与交付。",
    "ver": "15.6.8",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 23376,
    "installed": false
  },
  {
    "id": "s99",
    "name": "asset-export",
    "label": "资源导出",
    "cat": "设计",
    "desc": "设计资源切图与导出。",
    "ver": "1.8.7",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 84000,
    "installed": false
  },
  {
    "id": "s100",
    "name": "font-pairing",
    "label": "字体配对",
    "cat": "设计",
    "desc": "字体搭配与推荐。",
    "ver": "19.6.3",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 56768,
    "installed": true
  },
  {
    "id": "s101",
    "name": "spacing-system",
    "label": "间距系统",
    "cat": "设计",
    "desc": "间距与栅格系统。",
    "ver": "13.8.1",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 86128,
    "installed": true
  },
  {
    "id": "s102",
    "name": "shadow-system",
    "label": "阴影系统",
    "cat": "设计",
    "desc": "阴影层级与质感。",
    "ver": "27.7.0",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 67008,
    "installed": false
  },
  {
    "id": "s103",
    "name": "gradient",
    "label": "渐变",
    "cat": "设计",
    "desc": "渐变配色与生成。",
    "ver": "7.0.5",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 32048,
    "installed": true
  },
  {
    "id": "s104",
    "name": "background",
    "label": "背景",
    "cat": "设计",
    "desc": "背景纹理与图案。",
    "ver": "29.8.1",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 40544,
    "installed": false
  },
  {
    "id": "s105",
    "name": "illustration",
    "label": "插画",
    "cat": "设计",
    "desc": "插画生成与风格化。",
    "ver": "1.8.5",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 62336,
    "installed": false
  },
  {
    "id": "s106",
    "name": "avatar-gen",
    "label": "头像生成",
    "cat": "设计",
    "desc": "头像生成与风格。",
    "ver": "17.7.8",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 9712,
    "installed": false
  },
  {
    "id": "s107",
    "name": "banner-design",
    "label": "Banner 设计",
    "cat": "设计",
    "desc": "Banner 与首图设计。",
    "ver": "5.4.4",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 27120,
    "installed": false
  },
  {
    "id": "s108",
    "name": "card-design",
    "label": "卡片设计",
    "cat": "设计",
    "desc": "卡片组件设计。",
    "ver": "1.1.2",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 39168,
    "installed": true
  },
  {
    "id": "s109",
    "name": "table-design",
    "label": "表格设计",
    "cat": "设计",
    "desc": "数据表格界面设计。",
    "ver": "5.3.2",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 57696,
    "installed": true
  },
  {
    "id": "s110",
    "name": "form-design",
    "label": "表单设计",
    "cat": "设计",
    "desc": "表单界面与校验。",
    "ver": "5.8.0",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 12672,
    "installed": false
  },
  {
    "id": "s111",
    "name": "empty-state",
    "label": "空状态",
    "cat": "设计",
    "desc": "空状态与占位设计。",
    "ver": "15.2.4",
    "tools": [
      "render",
      "preview"
    ],
    "runs": 37088,
    "installed": false
  },
  {
    "id": "s112",
    "name": "data-analysis",
    "label": "数据分析",
    "cat": "数据",
    "desc": "多源清洗、拆解、归因与报告。",
    "ver": "17.7.4",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 7216,
    "installed": true
  },
  {
    "id": "s113",
    "name": "sql-query",
    "label": "SQL 查询",
    "cat": "数据",
    "desc": "关系库读写、探查与 Schema。",
    "ver": "15.0.8",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 46304,
    "installed": false
  },
  {
    "id": "s114",
    "name": "web-search",
    "label": "联网搜索",
    "cat": "数据",
    "desc": "实时检索与公众号内容。",
    "ver": "11.7.8",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 12432,
    "installed": false
  },
  {
    "id": "s115",
    "name": "llm-gateway",
    "label": "模型推理",
    "cat": "数据",
    "desc": "大模型流式生成与路由。",
    "ver": "17.5.0",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 66960,
    "installed": true
  },
  {
    "id": "s116",
    "name": "vision-ocr",
    "label": "视觉理解",
    "cat": "数据",
    "desc": "图像识别、OCR 与版面解析。",
    "ver": "25.7.7",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 77840,
    "installed": false
  },
  {
    "id": "s117",
    "name": "etl-pipeline",
    "label": "ETL 管道",
    "cat": "数据",
    "desc": "数据抽取、转换与加载。",
    "ver": "13.0.3",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 58512,
    "installed": false
  },
  {
    "id": "s118",
    "name": "data-clean",
    "label": "数据清洗",
    "cat": "数据",
    "desc": "缺失、异常与去重处理。",
    "ver": "9.1.0",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 7168,
    "installed": true
  },
  {
    "id": "s119",
    "name": "feature-engine",
    "label": "特征工程",
    "cat": "数据",
    "desc": "特征构造、选择与编码。",
    "ver": "17.2.1",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 51888,
    "installed": true
  },
  {
    "id": "s120",
    "name": "ml-train",
    "label": "模型训练",
    "cat": "数据",
    "desc": "训练、调参与验证。",
    "ver": "15.0.4",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 46576,
    "installed": false
  },
  {
    "id": "s121",
    "name": "model-deploy",
    "label": "模型部署",
    "cat": "数据",
    "desc": "模型服务化与推理优化。",
    "ver": "7.8.3",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 77968,
    "installed": true
  },
  {
    "id": "s122",
    "name": "ab-test",
    "label": "A/B 测试",
    "cat": "数据",
    "desc": "实验设计与显著性。",
    "ver": "25.3.8",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 40624,
    "installed": false
  },
  {
    "id": "s123",
    "name": "forecast",
    "label": "预测",
    "cat": "数据",
    "desc": "时间序列预测。",
    "ver": "19.0.3",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 23232,
    "installed": false
  },
  {
    "id": "s124",
    "name": "anomaly-detect",
    "label": "异常检测",
    "cat": "数据",
    "desc": "异常识别与告警。",
    "ver": "29.4.2",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 72288,
    "installed": false
  },
  {
    "id": "s125",
    "name": "recommend",
    "label": "推荐",
    "cat": "数据",
    "desc": "推荐算法与召回。",
    "ver": "25.2.3",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 53936,
    "installed": false
  },
  {
    "id": "s126",
    "name": "nlp",
    "label": "自然语言处理",
    "cat": "数据",
    "desc": "分词、实体、情感与主题。",
    "ver": "1.2.0",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 15824,
    "installed": false
  },
  {
    "id": "s127",
    "name": "knowledge-graph",
    "label": "知识图谱",
    "cat": "数据",
    "desc": "实体关系建模与图谱。",
    "ver": "17.7.7",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 9424,
    "installed": false
  },
  {
    "id": "s128",
    "name": "crawler",
    "label": "数据采集",
    "cat": "数据",
    "desc": "合规网页采集与清洗。",
    "ver": "3.0.7",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 18896,
    "installed": false
  },
  {
    "id": "s129",
    "name": "dashboard",
    "label": "看板搭建",
    "cat": "数据",
    "desc": "指标看板与可视化大屏。",
    "ver": "29.8.0",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 58832,
    "installed": false
  },
  {
    "id": "s130",
    "name": "reporting",
    "label": "报表",
    "cat": "数据",
    "desc": "固定报表与自助分析。",
    "ver": "11.1.6",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 85408,
    "installed": true
  },
  {
    "id": "s131",
    "name": "data-governance",
    "label": "数据治理",
    "cat": "数据",
    "desc": "标准、血缘与安全合规。",
    "ver": "23.1.0",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 43632,
    "installed": false
  },
  {
    "id": "s132",
    "name": "data-warehouse",
    "label": "数仓",
    "cat": "数据",
    "desc": "数仓分层与建模。",
    "ver": "19.6.3",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 44224,
    "installed": true
  },
  {
    "id": "s133",
    "name": "real-time",
    "label": "实时计算",
    "cat": "数据",
    "desc": "实时流计算与指标。",
    "ver": "9.7.5",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 13440,
    "installed": false
  },
  {
    "id": "s134",
    "name": "data-quality",
    "label": "数据质量",
    "cat": "数据",
    "desc": "数据质量监控与校验。",
    "ver": "23.3.4",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 50048,
    "installed": false
  },
  {
    "id": "s135",
    "name": "data-lineage",
    "label": "数据血缘",
    "cat": "数据",
    "desc": "数据血缘与影响分析。",
    "ver": "27.4.2",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 62416,
    "installed": false
  },
  {
    "id": "s136",
    "name": "data-catalog",
    "label": "数据目录",
    "cat": "数据",
    "desc": "数据资产目录与发现。",
    "ver": "3.4.6",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 70128,
    "installed": false
  },
  {
    "id": "s137",
    "name": "data-masking",
    "label": "数据脱敏",
    "cat": "数据",
    "desc": "数据脱敏与加密。",
    "ver": "29.2.8",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 20288,
    "installed": false
  },
  {
    "id": "s138",
    "name": "data-backup",
    "label": "数据备份",
    "cat": "数据",
    "desc": "备份与恢复策略。",
    "ver": "19.6.7",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 24640,
    "installed": true
  },
  {
    "id": "s139",
    "name": "data-migration",
    "label": "数据迁移",
    "cat": "数据",
    "desc": "数据迁移与同步。",
    "ver": "5.1.3",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 87584,
    "installed": false
  },
  {
    "id": "s140",
    "name": "data-visualize",
    "label": "数据可视化",
    "cat": "数据",
    "desc": "可视化表达与叙事。",
    "ver": "17.5.7",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 19632,
    "installed": false
  },
  {
    "id": "s141",
    "name": "metric",
    "label": "指标体系",
    "cat": "数据",
    "desc": "指标定义与统一。",
    "ver": "1.7.3",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 29776,
    "installed": false
  },
  {
    "id": "s142",
    "name": "segmentation",
    "label": "用户分群",
    "cat": "数据",
    "desc": "用户分群与画像。",
    "ver": "21.8.6",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 1568,
    "installed": false
  },
  {
    "id": "s143",
    "name": "attribution",
    "label": "归因分析",
    "cat": "数据",
    "desc": "转化归因与贡献。",
    "ver": "19.6.2",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 1344,
    "installed": true
  },
  {
    "id": "s144",
    "name": "cohort",
    "label": "留存分析",
    "cat": "数据",
    "desc": "留存与队列分析。",
    "ver": "27.7.6",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 40176,
    "installed": true
  },
  {
    "id": "s145",
    "name": "funnel",
    "label": "漏斗分析",
    "cat": "数据",
    "desc": "漏斗与转化分析。",
    "ver": "11.8.3",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 60768,
    "installed": false
  },
  {
    "id": "s146",
    "name": "rfm",
    "label": "RFM 分析",
    "cat": "数据",
    "desc": "RFM 客户价值分层。",
    "ver": "7.6.6",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 35552,
    "installed": false
  },
  {
    "id": "s147",
    "name": "regression",
    "label": "回归分析",
    "cat": "数据",
    "desc": "回归建模与预测。",
    "ver": "7.4.0",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 25840,
    "installed": true
  },
  {
    "id": "s148",
    "name": "classification",
    "label": "分类",
    "cat": "数据",
    "desc": "分类建模与评估。",
    "ver": "25.4.3",
    "tools": [
      "query",
      "analyze"
    ],
    "runs": 34336,
    "installed": true
  },
  {
    "id": "s149",
    "name": "rag",
    "label": "RAG 检索增强",
    "cat": "AI 与模型",
    "desc": "文档向量化、检索与增强生成。",
    "ver": "25.3.5",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 45248,
    "installed": false
  },
  {
    "id": "s150",
    "name": "agent",
    "label": "智能体编排",
    "cat": "AI 与模型",
    "desc": "多智能体协作与任务分解。",
    "ver": "5.5.1",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 14720,
    "installed": true
  },
  {
    "id": "s151",
    "name": "prompt-eng",
    "label": "提示词工程",
    "cat": "AI 与模型",
    "desc": "提示词设计与优化。",
    "ver": "23.0.6",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 19008,
    "installed": false
  },
  {
    "id": "s152",
    "name": "embedding",
    "label": "向量嵌入 2",
    "cat": "AI 与模型",
    "desc": "文本向量化与相似检索。",
    "ver": "25.1.7",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 70848,
    "installed": true
  },
  {
    "id": "s153",
    "name": "fine-tune",
    "label": "模型微调",
    "cat": "AI 与模型",
    "desc": "SFT/RL 微调与评估。",
    "ver": "23.8.7",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 78768,
    "installed": true
  },
  {
    "id": "s154",
    "name": "function-call",
    "label": "工具调用",
    "cat": "AI 与模型",
    "desc": "函数调用与工具编排。",
    "ver": "29.3.1",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 70240,
    "installed": false
  },
  {
    "id": "s155",
    "name": "multimodal",
    "label": "多模态",
    "cat": "AI 与模型",
    "desc": "图文音视频联合理解。",
    "ver": "13.4.5",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 9888,
    "installed": false
  },
  {
    "id": "s156",
    "name": "tts",
    "label": "语音合成",
    "cat": "AI 与模型",
    "desc": "文字转语音与音色克隆。",
    "ver": "27.2.1",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 29184,
    "installed": true
  },
  {
    "id": "s157",
    "name": "asr",
    "label": "语音识别",
    "cat": "AI 与模型",
    "desc": "语音转文字与实时字幕。",
    "ver": "3.6.5",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 76864,
    "installed": true
  },
  {
    "id": "s158",
    "name": "translation-ai",
    "label": "AI 翻译",
    "cat": "AI 与模型",
    "desc": "神经翻译与术语统一。",
    "ver": "3.1.3",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 35552,
    "installed": false
  },
  {
    "id": "s159",
    "name": "chatbot",
    "label": "对话机器人",
    "cat": "AI 与模型",
    "desc": "对话系统与意图识别。",
    "ver": "3.6.5",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 62832,
    "installed": false
  },
  {
    "id": "s160",
    "name": "summarize-ai",
    "label": "AI 摘要",
    "cat": "AI 与模型",
    "desc": "长文摘要与会议总结。",
    "ver": "11.4.3",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 86752,
    "installed": true
  },
  {
    "id": "s161",
    "name": "classify",
    "label": "文本分类",
    "cat": "AI 与模型",
    "desc": "意图、情感与主题分类。",
    "ver": "5.2.0",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 35088,
    "installed": true
  },
  {
    "id": "s162",
    "name": "extract-ai",
    "label": "信息抽取",
    "cat": "AI 与模型",
    "desc": "实体、关系与事件抽取。",
    "ver": "1.5.4",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 65264,
    "installed": true
  },
  {
    "id": "s163",
    "name": "code-gen-ai",
    "label": "AI 编程",
    "cat": "AI 与模型",
    "desc": "代码补全、生成与解释。",
    "ver": "23.7.7",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 62336,
    "installed": true
  },
  {
    "id": "s164",
    "name": "image-understand",
    "label": "图像理解",
    "cat": "AI 与模型",
    "desc": "图像识别、检测与分割。",
    "ver": "7.6.4",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 62016,
    "installed": true
  },
  {
    "id": "s165",
    "name": "video-understand",
    "label": "视频理解",
    "cat": "AI 与模型",
    "desc": "视频动作与场景识别。",
    "ver": "3.7.7",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 87696,
    "installed": false
  },
  {
    "id": "s166",
    "name": "search-ai",
    "label": "AI 搜索",
    "cat": "AI 与模型",
    "desc": "语义搜索与答案生成。",
    "ver": "19.8.8",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 73024,
    "installed": true
  },
  {
    "id": "s167",
    "name": "eval",
    "label": "模型评测",
    "cat": "AI 与模型",
    "desc": "评测集、指标与对比。",
    "ver": "17.6.2",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 16448,
    "installed": false
  },
  {
    "id": "s168",
    "name": "guardrail",
    "label": "安全护栏",
    "cat": "AI 与模型",
    "desc": "内容安全与输出审查。",
    "ver": "17.4.7",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 6864,
    "installed": false
  },
  {
    "id": "s169",
    "name": "context-mgr",
    "label": "上下文管理",
    "cat": "AI 与模型",
    "desc": "上下文窗口与压缩。",
    "ver": "25.7.4",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 26000,
    "installed": false
  },
  {
    "id": "s170",
    "name": "memory",
    "label": "记忆",
    "cat": "AI 与模型",
    "desc": "长期记忆与检索。",
    "ver": "11.8.8",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 76240,
    "installed": false
  },
  {
    "id": "s171",
    "name": "planning",
    "label": "规划",
    "cat": "AI 与模型",
    "desc": "任务规划与分解。",
    "ver": "19.5.1",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 37920,
    "installed": true
  },
  {
    "id": "s172",
    "name": "tool-use",
    "label": "工具使用",
    "cat": "AI 与模型",
    "desc": "工具选择与调用。",
    "ver": "3.7.5",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 28512,
    "installed": false
  },
  {
    "id": "s173",
    "name": "self-reflect",
    "label": "自我反思",
    "cat": "AI 与模型",
    "desc": "自我反思与纠错。",
    "ver": "25.4.5",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 55424,
    "installed": true
  },
  {
    "id": "s174",
    "name": "reward-model",
    "label": "奖励模型",
    "cat": "AI 与模型",
    "desc": "奖励建模与 RLHF。",
    "ver": "27.5.5",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 10288,
    "installed": false
  },
  {
    "id": "s175",
    "name": "distillation",
    "label": "模型蒸馏",
    "cat": "AI 与模型",
    "desc": "知识蒸馏与压缩。",
    "ver": "27.5.4",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 31744,
    "installed": false
  },
  {
    "id": "s176",
    "name": "quantization",
    "label": "模型量化",
    "cat": "AI 与模型",
    "desc": "量化与推理加速。",
    "ver": "17.4.1",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 29632,
    "installed": false
  },
  {
    "id": "s177",
    "name": "prompt-cache",
    "label": "提示缓存",
    "cat": "AI 与模型",
    "desc": "提示缓存与复用。",
    "ver": "13.7.8",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 50576,
    "installed": false
  },
  {
    "id": "s178",
    "name": "output-parse",
    "label": "输出解析",
    "cat": "AI 与模型",
    "desc": "结构化输出解析。",
    "ver": "29.4.7",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 79696,
    "installed": false
  },
  {
    "id": "s179",
    "name": "embedding-visual",
    "label": "嵌入可视化",
    "cat": "AI 与模型",
    "desc": "嵌入空间可视化。",
    "ver": "11.7.1",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 53776,
    "installed": false
  },
  {
    "id": "s180",
    "name": "model-router",
    "label": "模型路由",
    "cat": "AI 与模型",
    "desc": "多模型路由与降级。",
    "ver": "11.2.7",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 31808,
    "installed": false
  },
  {
    "id": "s181",
    "name": "ai-workflow",
    "label": "AI 工作流",
    "cat": "AI 与模型",
    "desc": "AI 工作流编排。",
    "ver": "9.4.6",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 16784,
    "installed": false
  },
  {
    "id": "s182",
    "name": "ai-assistant",
    "label": "AI 助手",
    "cat": "AI 与模型",
    "desc": "通用 AI 助手。",
    "ver": "27.8.2",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 78000,
    "installed": true
  },
  {
    "id": "s183",
    "name": "ai-tutor",
    "label": "AI 导师",
    "cat": "AI 与模型",
    "desc": "AI 教学与答疑。",
    "ver": "9.0.3",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 3008,
    "installed": true
  },
  {
    "id": "s184",
    "name": "ai-writer",
    "label": "AI 写作",
    "cat": "AI 与模型",
    "desc": "AI 写作与润色。",
    "ver": "1.5.5",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 42640,
    "installed": false
  },
  {
    "id": "s185",
    "name": "ai-review",
    "label": "AI 审稿",
    "cat": "AI 与模型",
    "desc": "AI 审稿与校对。",
    "ver": "25.4.0",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 29616,
    "installed": false
  },
  {
    "id": "s186",
    "name": "ai-summarize",
    "label": "AI 会议总结",
    "cat": "AI 与模型",
    "desc": "会议总结与要点。",
    "ver": "27.3.6",
    "tools": [
      "chat",
      "stream"
    ],
    "runs": 31664,
    "installed": false
  },
  {
    "id": "s187",
    "name": "automation",
    "label": "任务自动化",
    "cat": "自动化",
    "desc": "定时任务与流程编排。",
    "ver": "27.4.2",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 79520,
    "installed": false
  },
  {
    "id": "s188",
    "name": "workflow",
    "label": "工作流",
    "cat": "自动化",
    "desc": "多步骤工作流设计。",
    "ver": "3.1.1",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 44720,
    "installed": false
  },
  {
    "id": "s189",
    "name": "scheduler",
    "label": "定时调度",
    "cat": "自动化",
    "desc": "定时任务与 cron 调度。",
    "ver": "23.1.7",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 25184,
    "installed": false
  },
  {
    "id": "s190",
    "name": "webhook",
    "label": "Webhook",
    "cat": "自动化",
    "desc": "事件触发与回调集成。",
    "ver": "19.1.7",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 61488,
    "installed": false
  },
  {
    "id": "s191",
    "name": "email-auto",
    "label": "邮件自动化",
    "cat": "自动化",
    "desc": "自动回复与邮件旅程。",
    "ver": "15.0.2",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 36064,
    "installed": false
  },
  {
    "id": "s192",
    "name": "data-sync",
    "label": "数据同步",
    "cat": "自动化",
    "desc": "多系统数据自动同步。",
    "ver": "13.2.5",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 2896,
    "installed": false
  },
  {
    "id": "s193",
    "name": "batch-process",
    "label": "批处理",
    "cat": "自动化",
    "desc": "批量任务与文件处理。",
    "ver": "11.3.1",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 27680,
    "installed": false
  },
  {
    "id": "s194",
    "name": "notification",
    "label": "通知推送",
    "cat": "自动化",
    "desc": "多渠道通知与提醒。",
    "ver": "19.7.2",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 38544,
    "installed": false
  },
  {
    "id": "s195",
    "name": "approval-flow",
    "label": "审批流",
    "cat": "自动化",
    "desc": "审批流程与流转规则。",
    "ver": "1.1.6",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 23120,
    "installed": false
  },
  {
    "id": "s196",
    "name": "rpa",
    "label": "RPA 机器人",
    "cat": "自动化",
    "desc": "重复操作自动化。",
    "ver": "21.3.7",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 47136,
    "installed": false
  },
  {
    "id": "s197",
    "name": "ifttt",
    "label": "触发联动",
    "cat": "自动化",
    "desc": "IFTTT 式触发联动。",
    "ver": "25.1.6",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 57920,
    "installed": false
  },
  {
    "id": "s198",
    "name": "report-auto",
    "label": "报告自动化",
    "cat": "自动化",
    "desc": "定期报告自动生成。",
    "ver": "1.3.7",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 26928,
    "installed": false
  },
  {
    "id": "s199",
    "name": "backup",
    "label": "自动备份",
    "cat": "自动化",
    "desc": "数据自动备份与恢复。",
    "ver": "11.6.5",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 83072,
    "installed": true
  },
  {
    "id": "s200",
    "name": "monitor",
    "label": "监控告警",
    "cat": "自动化",
    "desc": "指标监控与异常告警。",
    "ver": "25.5.7",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 56224,
    "installed": false
  },
  {
    "id": "s201",
    "name": "scheduled-report",
    "label": "定时报告",
    "cat": "自动化",
    "desc": "定时生成并推送报告。",
    "ver": "7.7.3",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 64848,
    "installed": false
  },
  {
    "id": "s202",
    "name": "auto-reply",
    "label": "自动回复",
    "cat": "自动化",
    "desc": "自动回复与智能应答。",
    "ver": "13.5.2",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 35440,
    "installed": false
  },
  {
    "id": "s203",
    "name": "task-queue",
    "label": "任务队列",
    "cat": "自动化",
    "desc": "异步任务与队列调度。",
    "ver": "7.1.5",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 82544,
    "installed": true
  },
  {
    "id": "s204",
    "name": "pipeline",
    "label": "流水线",
    "cat": "自动化",
    "desc": "端到端流水线编排。",
    "ver": "29.7.1",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 23072,
    "installed": false
  },
  {
    "id": "s205",
    "name": "trigger",
    "label": "触发器",
    "cat": "自动化",
    "desc": "事件触发与条件执行。",
    "ver": "25.2.5",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 11008,
    "installed": false
  },
  {
    "id": "s206",
    "name": "job-runner",
    "label": "任务执行器",
    "cat": "自动化",
    "desc": "任务执行与状态跟踪。",
    "ver": "1.6.4",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 29488,
    "installed": true
  },
  {
    "id": "s207",
    "name": "auto-import",
    "label": "自动导入",
    "cat": "自动化",
    "desc": "数据自动导入与更新。",
    "ver": "21.0.7",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 53536,
    "installed": false
  },
  {
    "id": "s208",
    "name": "auto-export",
    "label": "自动导出",
    "cat": "自动化",
    "desc": "数据自动导出与分发。",
    "ver": "15.6.0",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 53264,
    "installed": true
  },
  {
    "id": "s209",
    "name": "auto-archive",
    "label": "自动归档",
    "cat": "自动化",
    "desc": "文件自动归档与清理。",
    "ver": "23.4.2",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 77840,
    "installed": true
  },
  {
    "id": "s210",
    "name": "auto-tag",
    "label": "自动打标",
    "cat": "自动化",
    "desc": "内容自动分类与打标。",
    "ver": "7.0.4",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 46752,
    "installed": false
  },
  {
    "id": "s211",
    "name": "auto-remind",
    "label": "自动提醒",
    "cat": "自动化",
    "desc": "到期提醒与跟进。",
    "ver": "7.1.7",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 32704,
    "installed": true
  },
  {
    "id": "s212",
    "name": "auto-escalate",
    "label": "自动升级",
    "cat": "自动化",
    "desc": "自动升级与转交。",
    "ver": "25.6.8",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 20048,
    "installed": false
  },
  {
    "id": "s213",
    "name": "auto-close",
    "label": "自动关闭",
    "cat": "自动化",
    "desc": "工单自动关闭与归档。",
    "ver": "11.7.7",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 1392,
    "installed": false
  },
  {
    "id": "s214",
    "name": "auto-approve",
    "label": "自动审批",
    "cat": "自动化",
    "desc": "自动审批与规则。",
    "ver": "5.7.7",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 57776,
    "installed": false
  },
  {
    "id": "s215",
    "name": "auto-scaling",
    "label": "自动扩缩",
    "cat": "自动化",
    "desc": "自动扩缩容。",
    "ver": "11.4.7",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 23040,
    "installed": false
  },
  {
    "id": "s216",
    "name": "auto-heal",
    "label": "自愈",
    "cat": "自动化",
    "desc": "自动恢复与自愈。",
    "ver": "7.6.3",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 58080,
    "installed": false
  },
  {
    "id": "s217",
    "name": "chat-ops",
    "label": "ChatOps",
    "cat": "自动化",
    "desc": "对话式运维。",
    "ver": "15.4.7",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 32224,
    "installed": true
  },
  {
    "id": "s218",
    "name": "gitops",
    "label": "GitOps",
    "cat": "自动化",
    "desc": "声明式部署与同步。",
    "ver": "19.6.3",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 65824,
    "installed": false
  },
  {
    "id": "s219",
    "name": "cron",
    "label": "Cron 任务",
    "cat": "自动化",
    "desc": "Cron 表达式调度。",
    "ver": "1.3.4",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 11648,
    "installed": false
  },
  {
    "id": "s220",
    "name": "event-driven",
    "label": "事件驱动",
    "cat": "自动化",
    "desc": "事件驱动架构。",
    "ver": "3.8.3",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 28464,
    "installed": true
  },
  {
    "id": "s221",
    "name": "orchestration",
    "label": "编排",
    "cat": "自动化",
    "desc": "服务与流程编排。",
    "ver": "11.7.7",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 59184,
    "installed": true
  },
  {
    "id": "s222",
    "name": "state-machine",
    "label": "状态机",
    "cat": "自动化",
    "desc": "状态机与流转。",
    "ver": "29.2.8",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 35552,
    "installed": false
  },
  {
    "id": "s223",
    "name": "rules-engine",
    "label": "规则引擎",
    "cat": "自动化",
    "desc": "规则引擎与决策。",
    "ver": "15.3.1",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 71888,
    "installed": false
  },
  {
    "id": "s224",
    "name": "bpm",
    "label": "BPM",
    "cat": "自动化",
    "desc": "业务流程管理。",
    "ver": "29.7.8",
    "tools": [
      "schedule",
      "trigger"
    ],
    "runs": 77088,
    "installed": false
  },
  {
    "id": "s225",
    "name": "im-send",
    "label": "即时通讯",
    "cat": "通信与协作",
    "desc": "消息发送与群聊管理。",
    "ver": "17.4.2",
    "tools": [
      "send",
      "share"
    ],
    "runs": 55696,
    "installed": true
  },
  {
    "id": "s226",
    "name": "meeting",
    "label": "会议管理",
    "cat": "通信与协作",
    "desc": "会议创建、预约与纪要。",
    "ver": "3.8.2",
    "tools": [
      "send",
      "share"
    ],
    "runs": 66080,
    "installed": true
  },
  {
    "id": "s227",
    "name": "screen-share",
    "label": "屏幕共享",
    "cat": "通信与协作",
    "desc": "屏幕共享与远程协作。",
    "ver": "1.1.0",
    "tools": [
      "send",
      "share"
    ],
    "runs": 84624,
    "installed": true
  },
  {
    "id": "s228",
    "name": "share-link",
    "label": "链接分享",
    "cat": "通信与协作",
    "desc": "生成分享链接与权限。",
    "ver": "17.1.2",
    "tools": [
      "send",
      "share"
    ],
    "runs": 51408,
    "installed": false
  },
  {
    "id": "s229",
    "name": "comment",
    "label": "评论协作",
    "cat": "通信与协作",
    "desc": "评论、@提醒与审阅。",
    "ver": "29.8.7",
    "tools": [
      "send",
      "share"
    ],
    "runs": 60272,
    "installed": false
  },
  {
    "id": "s230",
    "name": "team-space",
    "label": "团队空间",
    "cat": "通信与协作",
    "desc": "团队工作区与权限。",
    "ver": "25.3.4",
    "tools": [
      "send",
      "share"
    ],
    "runs": 8880,
    "installed": true
  },
  {
    "id": "s231",
    "name": "kanban",
    "label": "看板",
    "cat": "通信与协作",
    "desc": "看板任务与状态流转。",
    "ver": "7.2.2",
    "tools": [
      "send",
      "share"
    ],
    "runs": 57280,
    "installed": false
  },
  {
    "id": "s232",
    "name": "gantt",
    "label": "甘特图",
    "cat": "通信与协作",
    "desc": "项目甘特图与进度。",
    "ver": "11.7.4",
    "tools": [
      "send",
      "share"
    ],
    "runs": 35456,
    "installed": true
  },
  {
    "id": "s233",
    "name": "okr",
    "label": "OKR 管理",
    "cat": "通信与协作",
    "desc": "目标与关键结果对齐。",
    "ver": "11.8.1",
    "tools": [
      "send",
      "share"
    ],
    "runs": 72880,
    "installed": true
  },
  {
    "id": "s234",
    "name": "wiki",
    "label": "Wiki",
    "cat": "通信与协作",
    "desc": "团队知识库与文档协作。",
    "ver": "13.5.8",
    "tools": [
      "send",
      "share"
    ],
    "runs": 73824,
    "installed": false
  },
  {
    "id": "s235",
    "name": "feed",
    "label": "信息流",
    "cat": "通信与协作",
    "desc": "动态信息流与订阅。",
    "ver": "29.8.4",
    "tools": [
      "send",
      "share"
    ],
    "runs": 43136,
    "installed": false
  },
  {
    "id": "s236",
    "name": "poll",
    "label": "投票",
    "cat": "通信与协作",
    "desc": "投票与意见征集。",
    "ver": "19.5.5",
    "tools": [
      "send",
      "share"
    ],
    "runs": 45568,
    "installed": false
  },
  {
    "id": "s237",
    "name": "mention",
    "label": "@提及",
    "cat": "通信与协作",
    "desc": "成员提及与通知。",
    "ver": "9.1.2",
    "tools": [
      "send",
      "share"
    ],
    "runs": 77872,
    "installed": true
  },
  {
    "id": "s238",
    "name": "presence",
    "label": "在线状态",
    "cat": "通信与协作",
    "desc": "在线状态与已读回执。",
    "ver": "27.2.6",
    "tools": [
      "send",
      "share"
    ],
    "runs": 34192,
    "installed": false
  },
  {
    "id": "s239",
    "name": "whiteboard",
    "label": "白板",
    "cat": "通信与协作",
    "desc": "在线白板与协作绘图。",
    "ver": "27.4.2",
    "tools": [
      "send",
      "share"
    ],
    "runs": 10784,
    "installed": true
  },
  {
    "id": "s240",
    "name": "video-conf",
    "label": "视频会议",
    "cat": "通信与协作",
    "desc": "视频会议与录制。",
    "ver": "15.8.6",
    "tools": [
      "send",
      "share"
    ],
    "runs": 60336,
    "installed": false
  },
  {
    "id": "s241",
    "name": "group-chat",
    "label": "群聊",
    "cat": "通信与协作",
    "desc": "群聊管理与机器人。",
    "ver": "15.1.7",
    "tools": [
      "send",
      "share"
    ],
    "runs": 78256,
    "installed": false
  },
  {
    "id": "s242",
    "name": "direct-msg",
    "label": "私信",
    "cat": "通信与协作",
    "desc": "私信与一对一沟通。",
    "ver": "25.8.4",
    "tools": [
      "send",
      "share"
    ],
    "runs": 33072,
    "installed": false
  },
  {
    "id": "s243",
    "name": "broadcast",
    "label": "广播",
    "cat": "通信与协作",
    "desc": "广播消息与公告。",
    "ver": "17.0.0",
    "tools": [
      "send",
      "share"
    ],
    "runs": 62720,
    "installed": true
  },
  {
    "id": "s244",
    "name": "reaction",
    "label": "表情回应",
    "cat": "通信与协作",
    "desc": "表情回应与互动。",
    "ver": "23.1.7",
    "tools": [
      "send",
      "share"
    ],
    "runs": 42448,
    "installed": false
  },
  {
    "id": "s245",
    "name": "thread",
    "label": "话题",
    "cat": "通信与协作",
    "desc": "话题与楼层讨论。",
    "ver": "21.3.6",
    "tools": [
      "send",
      "share"
    ],
    "runs": 14576,
    "installed": true
  },
  {
    "id": "s246",
    "name": "pinned",
    "label": "置顶",
    "cat": "通信与协作",
    "desc": "消息置顶与收藏。",
    "ver": "13.7.4",
    "tools": [
      "send",
      "share"
    ],
    "runs": 71936,
    "installed": true
  },
  {
    "id": "s247",
    "name": "read-receipt",
    "label": "回执",
    "cat": "通信与协作",
    "desc": "已读回执与送达。",
    "ver": "5.5.7",
    "tools": [
      "send",
      "share"
    ],
    "runs": 19776,
    "installed": true
  },
  {
    "id": "s248",
    "name": "translation-live",
    "label": "实时翻译",
    "cat": "通信与协作",
    "desc": "会议实时翻译。",
    "ver": "15.6.2",
    "tools": [
      "send",
      "share"
    ],
    "runs": 63984,
    "installed": false
  },
  {
    "id": "s249",
    "name": "caption",
    "label": "字幕",
    "cat": "通信与协作",
    "desc": "实时字幕与转录。",
    "ver": "25.2.2",
    "tools": [
      "send",
      "share"
    ],
    "runs": 81360,
    "installed": true
  },
  {
    "id": "s250",
    "name": "remote-control",
    "label": "远程控制",
    "cat": "通信与协作",
    "desc": "远程协助与控制。",
    "ver": "13.3.3",
    "tools": [
      "send",
      "share"
    ],
    "runs": 63296,
    "installed": false
  },
  {
    "id": "s251",
    "name": "file-transfer",
    "label": "文件传输",
    "cat": "通信与协作",
    "desc": "大文件传输与分享。",
    "ver": "13.0.0",
    "tools": [
      "send",
      "share"
    ],
    "runs": 61728,
    "installed": false
  },
  {
    "id": "s252",
    "name": "calendar-share",
    "label": "共享日历",
    "cat": "通信与协作",
    "desc": "共享日历与日程。",
    "ver": "5.6.1",
    "tools": [
      "send",
      "share"
    ],
    "runs": 5872,
    "installed": true
  },
  {
    "id": "s253",
    "name": "task-assign",
    "label": "任务分配",
    "cat": "通信与协作",
    "desc": "任务分配与跟进。",
    "ver": "21.5.2",
    "tools": [
      "send",
      "share"
    ],
    "runs": 75264,
    "installed": false
  },
  {
    "id": "s254",
    "name": "approval-request",
    "label": "审批请求",
    "cat": "通信与协作",
    "desc": "审批请求与批复。",
    "ver": "7.5.2",
    "tools": [
      "send",
      "share"
    ],
    "runs": 81008,
    "installed": false
  },
  {
    "id": "s255",
    "name": "notification-ctr",
    "label": "通知中心",
    "cat": "通信与协作",
    "desc": "通知聚合与管理。",
    "ver": "29.0.4",
    "tools": [
      "send",
      "share"
    ],
    "runs": 41328,
    "installed": true
  },
  {
    "id": "s256",
    "name": "digest",
    "label": "摘要推送",
    "cat": "通信与协作",
    "desc": "每日摘要与推送。",
    "ver": "5.6.2",
    "tools": [
      "send",
      "share"
    ],
    "runs": 60112,
    "installed": false
  },
  {
    "id": "s257",
    "name": "survey",
    "label": "调研",
    "cat": "通信与协作",
    "desc": "调研问卷与反馈。",
    "ver": "3.8.1",
    "tools": [
      "send",
      "share"
    ],
    "runs": 80784,
    "installed": false
  },
  {
    "id": "s258",
    "name": "brainstorm",
    "label": "头脑风暴",
    "cat": "通信与协作",
    "desc": "在线头脑风暴。",
    "ver": "25.1.6",
    "tools": [
      "send",
      "share"
    ],
    "runs": 7840,
    "installed": true
  },
  {
    "id": "s259",
    "name": "note-share",
    "label": "共享笔记",
    "cat": "通信与协作",
    "desc": "共享笔记与协作文档。",
    "ver": "27.7.2",
    "tools": [
      "send",
      "share"
    ],
    "runs": 65200,
    "installed": true
  },
  {
    "id": "s260",
    "name": "decision-log",
    "label": "决策记录",
    "cat": "通信与协作",
    "desc": "决策记录与跟踪。",
    "ver": "25.5.8",
    "tools": [
      "send",
      "share"
    ],
    "runs": 35776,
    "installed": false
  },
  {
    "id": "s261",
    "name": "action-track",
    "label": "行动跟踪",
    "cat": "通信与协作",
    "desc": "行动项与跟进。",
    "ver": "1.0.0",
    "tools": [
      "send",
      "share"
    ],
    "runs": 8240,
    "installed": false
  },
  {
    "id": "s262",
    "name": "team-huddle",
    "label": "快速会议",
    "cat": "通信与协作",
    "desc": "快速会议与站会。",
    "ver": "29.8.2",
    "tools": [
      "send",
      "share"
    ],
    "runs": 46672,
    "installed": true
  },
  {
    "id": "s263",
    "name": "server-monitor",
    "label": "服务器监控",
    "cat": "系统与运维",
    "desc": "资源监控与告警。",
    "ver": "19.5.5",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 26800,
    "installed": false
  },
  {
    "id": "s264",
    "name": "log-analyze",
    "label": "日志分析",
    "cat": "系统与运维",
    "desc": "日志采集、检索与告警。",
    "ver": "29.0.0",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 32080,
    "installed": false
  },
  {
    "id": "s265",
    "name": "config-mgr",
    "label": "配置管理",
    "cat": "系统与运维",
    "desc": "配置中心与变更管理。",
    "ver": "11.8.1",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 69392,
    "installed": false
  },
  {
    "id": "s266",
    "name": "deploy-rollback",
    "label": "发布回滚",
    "cat": "系统与运维",
    "desc": "发布与回滚管理。",
    "ver": "27.6.8",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 16688,
    "installed": false
  },
  {
    "id": "s267",
    "name": "incident",
    "label": "故障应急",
    "cat": "系统与运维",
    "desc": "故障定位与应急响应。",
    "ver": "23.1.1",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 3760,
    "installed": false
  },
  {
    "id": "s268",
    "name": "capacity",
    "label": "容量规划",
    "cat": "系统与运维",
    "desc": "容量评估与扩缩容。",
    "ver": "13.3.5",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 23984,
    "installed": false
  },
  {
    "id": "s269",
    "name": "network-op",
    "label": "网络运维",
    "cat": "系统与运维",
    "desc": "网络配置与故障排查。",
    "ver": "27.0.6",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 58784,
    "installed": false
  },
  {
    "id": "s270",
    "name": "security-op",
    "label": "安全运维",
    "cat": "系统与运维",
    "desc": "安全加固与漏洞修复。",
    "ver": "25.6.7",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 70656,
    "installed": false
  },
  {
    "id": "s271",
    "name": "cost-opt",
    "label": "成本优化",
    "cat": "系统与运维",
    "desc": "云资源成本分析与优化。",
    "ver": "19.2.1",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 36704,
    "installed": false
  },
  {
    "id": "s272",
    "name": "health-check",
    "label": "健康检查",
    "cat": "系统与运维",
    "desc": "服务健康检查与探活。",
    "ver": "15.0.2",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 81632,
    "installed": true
  },
  {
    "id": "s273",
    "name": "trace",
    "label": "链路追踪",
    "cat": "系统与运维",
    "desc": "分布式链路追踪。",
    "ver": "11.5.1",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 70416,
    "installed": false
  },
  {
    "id": "s274",
    "name": "metrics",
    "label": "指标采集",
    "cat": "系统与运维",
    "desc": "指标采集与可视化。",
    "ver": "29.8.8",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 1760,
    "installed": false
  },
  {
    "id": "s275",
    "name": "alert",
    "label": "告警中心",
    "cat": "系统与运维",
    "desc": "告警规则与通知。",
    "ver": "19.0.0",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 10128,
    "installed": false
  },
  {
    "id": "s276",
    "name": "ticket",
    "label": "工单系统",
    "cat": "系统与运维",
    "desc": "工单流转与 SLA 管理。",
    "ver": "21.4.7",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 81728,
    "installed": false
  },
  {
    "id": "s277",
    "name": "audit-log",
    "label": "审计日志",
    "cat": "系统与运维",
    "desc": "操作审计与合规。",
    "ver": "3.7.1",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 61872,
    "installed": false
  },
  {
    "id": "s278",
    "name": "infra-code",
    "label": "基础设施即代码",
    "cat": "系统与运维",
    "desc": "IaC 与自动化。",
    "ver": "3.0.5",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 72352,
    "installed": false
  },
  {
    "id": "s279",
    "name": "container-op",
    "label": "容器运维",
    "cat": "系统与运维",
    "desc": "容器编排与运维。",
    "ver": "13.3.8",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 4768,
    "installed": false
  },
  {
    "id": "s280",
    "name": "orchestration-op",
    "label": "编排运维",
    "cat": "系统与运维",
    "desc": "服务编排与调度。",
    "ver": "17.0.7",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 35504,
    "installed": true
  },
  {
    "id": "s281",
    "name": "storage-op",
    "label": "存储运维",
    "cat": "系统与运维",
    "desc": "存储管理与扩容。",
    "ver": "1.4.8",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 43856,
    "installed": true
  },
  {
    "id": "s282",
    "name": "backup-op",
    "label": "备份运维",
    "cat": "系统与运维",
    "desc": "备份策略与恢复。",
    "ver": "19.0.0",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 58016,
    "installed": false
  },
  {
    "id": "s283",
    "name": "dr",
    "label": "容灾",
    "cat": "系统与运维",
    "desc": "容灾与高可用。",
    "ver": "15.0.3",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 49968,
    "installed": false
  },
  {
    "id": "s284",
    "name": "patch-mgmt",
    "label": "补丁管理",
    "cat": "系统与运维",
    "desc": "补丁与更新管理。",
    "ver": "21.5.3",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 35936,
    "installed": false
  },
  {
    "id": "s285",
    "name": "asset-mgmt",
    "label": "资产管理",
    "cat": "系统与运维",
    "desc": "资产盘点与管理。",
    "ver": "21.6.8",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 12656,
    "installed": false
  },
  {
    "id": "s286",
    "name": "license-mgmt",
    "label": "许可管理",
    "cat": "系统与运维",
    "desc": "软件许可管理。",
    "ver": "29.2.6",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 47296,
    "installed": false
  },
  {
    "id": "s287",
    "name": "compliance-op",
    "label": "合规运维",
    "cat": "系统与运维",
    "desc": "合规检查与审计。",
    "ver": "25.4.6",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 75232,
    "installed": true
  },
  {
    "id": "s288",
    "name": "change-mgmt",
    "label": "变更管理",
    "cat": "系统与运维",
    "desc": "变更审批与执行。",
    "ver": "19.1.3",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 66160,
    "installed": false
  },
  {
    "id": "s289",
    "name": "release-mgmt",
    "label": "发布管理",
    "cat": "系统与运维",
    "desc": "发布流程与版本。",
    "ver": "29.6.7",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 49312,
    "installed": false
  },
  {
    "id": "s290",
    "name": "env-mgmt",
    "label": "环境管理",
    "cat": "系统与运维",
    "desc": "环境管理与隔离。",
    "ver": "21.4.6",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 6496,
    "installed": false
  },
  {
    "id": "s291",
    "name": "secret-mgmt",
    "label": "密钥管理",
    "cat": "系统与运维",
    "desc": "密钥与证书管理。",
    "ver": "7.4.2",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 75328,
    "installed": false
  },
  {
    "id": "s292",
    "name": "dns-mgmt",
    "label": "DNS 管理",
    "cat": "系统与运维",
    "desc": "域名与解析管理。",
    "ver": "3.8.2",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 37664,
    "installed": false
  },
  {
    "id": "s293",
    "name": "load-balance",
    "label": "负载均衡",
    "cat": "系统与运维",
    "desc": "负载均衡与分发。",
    "ver": "23.7.5",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 1648,
    "installed": false
  },
  {
    "id": "s294",
    "name": "cdn",
    "label": "CDN",
    "cat": "系统与运维",
    "desc": "CDN 与加速。",
    "ver": "9.3.7",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 8976,
    "installed": false
  },
  {
    "id": "s295",
    "name": "waf",
    "label": "WAF",
    "cat": "系统与运维",
    "desc": "Web 防火墙。",
    "ver": "17.2.3",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 59872,
    "installed": false
  },
  {
    "id": "s296",
    "name": "vpn",
    "label": "VPN",
    "cat": "系统与运维",
    "desc": "VPN 与远程接入。",
    "ver": "13.1.2",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 39760,
    "installed": true
  },
  {
    "id": "s297",
    "name": "firewall",
    "label": "防火墙",
    "cat": "系统与运维",
    "desc": "防火墙与策略。",
    "ver": "17.1.6",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 22688,
    "installed": false
  },
  {
    "id": "s298",
    "name": "ids",
    "label": "入侵检测",
    "cat": "系统与运维",
    "desc": "入侵检测与防御。",
    "ver": "25.7.4",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 57232,
    "installed": true
  },
  {
    "id": "s299",
    "name": "scan",
    "label": "漏洞扫描",
    "cat": "系统与运维",
    "desc": "漏洞扫描与评估。",
    "ver": "5.8.3",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 47968,
    "installed": true
  },
  {
    "id": "s300",
    "name": "pentest",
    "label": "渗透测试",
    "cat": "系统与运维",
    "desc": "渗透测试与加固。",
    "ver": "3.8.1",
    "tools": [
      "monitor",
      "alert"
    ],
    "runs": 36224,
    "installed": true
  }
];

const CONNECTORS = [
  {
    "id": "c1",
    "name": "企业微信",
    "cat": "协作",
    "desc": "消息、日程、文档与审批流，任务结果可推送群。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c2",
    "name": "飞书",
    "cat": "协作",
    "desc": "多维表格、云文档、审批与机器人消息。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c3",
    "name": "钉钉",
    "cat": "协作",
    "desc": "群机器人、待办、日志与审批实例。",
    "auth": "AppKey",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c4",
    "name": "Slack",
    "cat": "协作",
    "desc": "频道消息、文件与工作流触发器。",
    "auth": "OAuth",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c5",
    "name": "Microsoft Teams",
    "cat": "协作",
    "desc": "团队协作、会议与频道消息。",
    "auth": "OAuth",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c6",
    "name": "Telegram",
    "cat": "协作",
    "desc": "机器人消息、频道与文件。",
    "auth": "Bot Token",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c7",
    "name": "Discord",
    "cat": "协作",
    "desc": "频道、机器人与应用命令。",
    "auth": "Bot Token",
    "status": "disconnected"
  },
  {
    "id": "c8",
    "name": "Zoom",
    "cat": "协作",
    "desc": "会议创建、录制与参会人管理。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c9",
    "name": "腾讯会议",
    "cat": "协作",
    "desc": "会议创建、纪要与会后转写。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c10",
    "name": "Google Meet",
    "cat": "协作",
    "desc": "会议与日程联动。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c11",
    "name": "Webex",
    "cat": "协作",
    "desc": "视频会议与协作。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c12",
    "name": "Rocket.Chat",
    "cat": "协作",
    "desc": "开源团队协作与聊天。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c13",
    "name": "Mattermost",
    "cat": "协作",
    "desc": "开源协作与即时通讯。",
    "auth": "Token",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c14",
    "name": "Element",
    "cat": "协作",
    "desc": "基于 Matrix 的加密协作。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c15",
    "name": "Line",
    "cat": "协作",
    "desc": "消息与群组。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c16",
    "name": "WhatsApp",
    "cat": "协作",
    "desc": "商业消息与客服。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c17",
    "name": "短信平台",
    "cat": "协作",
    "desc": "短信验证码与通知发送。",
    "auth": "Key",
    "status": "disconnected"
  },
  {
    "id": "c18",
    "name": "邮件推送",
    "cat": "协作",
    "desc": "邮件发送与触达。",
    "auth": "SMTP",
    "status": "disconnected"
  },
  {
    "id": "c19",
    "name": "语音通知",
    "cat": "协作",
    "desc": "语音电话通知。",
    "auth": "Key",
    "status": "disconnected"
  },
  {
    "id": "c20",
    "name": "推送服务",
    "cat": "协作",
    "desc": "App 推送通知。",
    "auth": "Key",
    "status": "disconnected"
  },
  {
    "id": "c21",
    "name": "Gather",
    "cat": "协作",
    "desc": "虚拟空间协作。",
    "auth": "OAuth",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c22",
    "name": "Miro",
    "cat": "协作",
    "desc": "在线白板协作。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c23",
    "name": "Mural",
    "cat": "协作",
    "desc": "可视化协作白板。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c24",
    "name": "Flock",
    "cat": "协作",
    "desc": "团队协作工具。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c25",
    "name": "Zulip",
    "cat": "协作",
    "desc": "开源团队聊天。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c26",
    "name": "Chatwork",
    "cat": "协作",
    "desc": "日本团队协作。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c27",
    "name": "KakaoWork",
    "cat": "协作",
    "desc": "韩国企业协作。",
    "auth": "Token",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c28",
    "name": "Lark",
    "cat": "协作",
    "desc": "飞书国际版。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c29",
    "name": "ClickUp",
    "cat": "协作",
    "desc": "团队生产力平台。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c30",
    "name": "Wrike",
    "cat": "协作",
    "desc": "项目协作平台。",
    "auth": "OAuth",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c31",
    "name": "Monday.com",
    "cat": "协作",
    "desc": "工作操作系统。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c32",
    "name": "Smartsheet",
    "cat": "协作",
    "desc": "工作管理平台。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c33",
    "name": "Airtable",
    "cat": "协作",
    "desc": "低代码数据库协作。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c34",
    "name": "Basecamp",
    "cat": "协作",
    "desc": "项目管理与协作。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c35",
    "name": "Todoist",
    "cat": "协作",
    "desc": "任务与清单管理。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c36",
    "name": "Any.do",
    "cat": "协作",
    "desc": "任务管理。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c37",
    "name": "Google Chat",
    "cat": "协作",
    "desc": "Google 协作消息。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c38",
    "name": "Workplace",
    "cat": "协作",
    "desc": "企业社交协作。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c39",
    "name": "Yammer",
    "cat": "协作",
    "desc": "企业内部社交。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c40",
    "name": "GroupMe",
    "cat": "协作",
    "desc": "群组消息。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c41",
    "name": "Signal",
    "cat": "协作",
    "desc": "加密通讯。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c42",
    "name": "Wire",
    "cat": "协作",
    "desc": "安全协作。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c43",
    "name": "腾讯文档",
    "cat": "文档",
    "desc": "读写在线文档与智能表格。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c44",
    "name": "Notion",
    "cat": "文档",
    "desc": "页面、数据库与知识库同步。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c45",
    "name": "语雀",
    "cat": "文档",
    "desc": "团队知识库、文档与画板。",
    "auth": "Token",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c46",
    "name": "Confluence",
    "cat": "文档",
    "desc": "企业 Wiki 与文档协作。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c47",
    "name": "Google Docs",
    "cat": "文档",
    "desc": "在线文档与协同编辑。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c48",
    "name": "Google Sheets",
    "cat": "文档",
    "desc": "在线表格与公式。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c49",
    "name": "Microsoft OneDrive",
    "cat": "文档",
    "desc": "云盘与 Office 文档。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c50",
    "name": "Microsoft SharePoint",
    "cat": "文档",
    "desc": "企业文档库与门户。",
    "auth": "OAuth",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c51",
    "name": "Dropbox",
    "cat": "文档",
    "desc": "云盘与文件同步。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c52",
    "name": "Box",
    "cat": "文档",
    "desc": "企业云盘与协作。",
    "auth": "OAuth",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c53",
    "name": "Evernote",
    "cat": "文档",
    "desc": "笔记与剪藏。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c54",
    "name": "印象笔记",
    "cat": "文档",
    "desc": "中文笔记与知识管理。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c55",
    "name": "有道云笔记",
    "cat": "文档",
    "desc": "笔记与文档同步。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c56",
    "name": "石墨文档",
    "cat": "文档",
    "desc": "在线文档与表格。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c57",
    "name": "WPS 云文档",
    "cat": "文档",
    "desc": "WPS 在线文档与云盘。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c58",
    "name": "PDF 服务",
    "cat": "文档",
    "desc": "PDF 生成、转换与签署。",
    "auth": "Key",
    "status": "disconnected"
  },
  {
    "id": "c59",
    "name": "Readwise",
    "cat": "文档",
    "desc": "阅读高亮与回顾。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c60",
    "name": "Zotero",
    "cat": "文档",
    "desc": "文献管理与引用。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c61",
    "name": "Mendeley",
    "cat": "文档",
    "desc": "文献管理与协作。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c62",
    "name": "Notejoy",
    "cat": "文档",
    "desc": "团队笔记协作。",
    "auth": "Token",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c63",
    "name": "Coda",
    "cat": "文档",
    "desc": "文档与表格一体化。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c64",
    "name": "Quip",
    "cat": "文档",
    "desc": "销售文档协作。",
    "auth": "OAuth",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c65",
    "name": "Paper",
    "cat": "文档",
    "desc": "Dropbox 文档。",
    "auth": "OAuth",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c66",
    "name": "Slite",
    "cat": "文档",
    "desc": "团队知识库。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c67",
    "name": "Tettra",
    "cat": "文档",
    "desc": "团队知识管理。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c68",
    "name": "Guru",
    "cat": "文档",
    "desc": "企业知识库。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c69",
    "name": "Document360",
    "cat": "文档",
    "desc": "产品文档。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c70",
    "name": "ReadMe",
    "cat": "文档",
    "desc": "API 文档平台。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c71",
    "name": "GitBook",
    "cat": "文档",
    "desc": "文档站点。",
    "auth": "OAuth",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c72",
    "name": "BookStack",
    "cat": "文档",
    "desc": "开源文档系统。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c73",
    "name": "Outline",
    "cat": "文档",
    "desc": "团队知识库。",
    "auth": "OAuth",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c74",
    "name": "Obsidian",
    "cat": "文档",
    "desc": "本地知识库。",
    "auth": "Local",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c75",
    "name": "Logseq",
    "cat": "文档",
    "desc": "开源笔记。",
    "auth": "Local",
    "status": "disconnected"
  },
  {
    "id": "c76",
    "name": "Roam Research",
    "cat": "文档",
    "desc": "网状笔记。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c77",
    "name": "Bear",
    "cat": "文档",
    "desc": "写作笔记。",
    "auth": "Local",
    "status": "disconnected"
  },
  {
    "id": "c78",
    "name": "Ulysses",
    "cat": "文档",
    "desc": "写作工具。",
    "auth": "Local",
    "status": "disconnected"
  },
  {
    "id": "c79",
    "name": "iA Writer",
    "cat": "文档",
    "desc": "极简写作。",
    "auth": "Local",
    "status": "disconnected"
  },
  {
    "id": "c80",
    "name": "Typora",
    "cat": "文档",
    "desc": "Markdown 编辑器。",
    "auth": "Local",
    "status": "disconnected"
  },
  {
    "id": "c81",
    "name": "OneNote",
    "cat": "文档",
    "desc": "微软笔记。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c82",
    "name": "Joplin",
    "cat": "文档",
    "desc": "开源笔记。",
    "auth": "Local",
    "status": "disconnected"
  },
  {
    "id": "c83",
    "name": "Standard Notes",
    "cat": "文档",
    "desc": "加密笔记。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c84",
    "name": "Simplenote",
    "cat": "文档",
    "desc": "轻量笔记。",
    "auth": "Token",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c85",
    "name": "GitHub",
    "cat": "开发",
    "desc": "仓库、Issue、PR 与 Actions。",
    "auth": "OAuth",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c86",
    "name": "GitLab",
    "cat": "开发",
    "desc": "代码托管、MR 与流水线。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c87",
    "name": "Gitee",
    "cat": "开发",
    "desc": "国内代码托管与协作。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c88",
    "name": "Bitbucket",
    "cat": "开发",
    "desc": "代码托管与 CI。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c89",
    "name": "Git",
    "cat": "开发",
    "desc": "本地仓库操作。",
    "auth": "SSH",
    "status": "disconnected"
  },
  {
    "id": "c90",
    "name": "Jenkins",
    "cat": "开发",
    "desc": "持续集成与构建。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c91",
    "name": "GitHub Actions",
    "cat": "开发",
    "desc": "自动化工作流。",
    "auth": "Token",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c92",
    "name": "CircleCI",
    "cat": "开发",
    "desc": "云上 CI/CD。",
    "auth": "Token",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c93",
    "name": "Travis CI",
    "cat": "开发",
    "desc": "持续集成。",
    "auth": "Token",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c94",
    "name": "SonarQube",
    "cat": "开发",
    "desc": "代码质量与静态分析。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c95",
    "name": "Sentry",
    "cat": "开发",
    "desc": "异常监控与性能。",
    "auth": "Token",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c96",
    "name": "Jira",
    "cat": "开发",
    "desc": "需求、缺陷与看板。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c97",
    "name": "Linear",
    "cat": "开发",
    "desc": "问题跟踪与迭代。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c98",
    "name": "Trello",
    "cat": "开发",
    "desc": "看板与任务管理。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c99",
    "name": "Asana",
    "cat": "开发",
    "desc": "项目与任务管理。",
    "auth": "OAuth",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c100",
    "name": "Postman",
    "cat": "开发",
    "desc": "接口测试与文档。",
    "auth": "Key",
    "status": "disconnected"
  },
  {
    "id": "c101",
    "name": "Swagger",
    "cat": "开发",
    "desc": "API 文档与调试。",
    "auth": "URL",
    "status": "disconnected"
  },
  {
    "id": "c102",
    "name": "OpenAPI",
    "cat": "开发",
    "desc": "接口规范与生成。",
    "auth": "URL",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c103",
    "name": "npm registry",
    "cat": "开发",
    "desc": "包管理仓库。",
    "auth": "Token",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c104",
    "name": "Docker Hub",
    "cat": "开发",
    "desc": "镜像仓库。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c105",
    "name": "JFrog Artifactory",
    "cat": "开发",
    "desc": "制品仓库。",
    "auth": "Token",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c106",
    "name": "Nexus",
    "cat": "开发",
    "desc": "制品与依赖仓库。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c107",
    "name": "VS Code",
    "cat": "开发",
    "desc": "编辑器扩展与远程。",
    "auth": "Local",
    "status": "disconnected"
  },
  {
    "id": "c108",
    "name": "JetBrains",
    "cat": "开发",
    "desc": "IDE 与工具链。",
    "auth": "Local",
    "status": "disconnected"
  },
  {
    "id": "c109",
    "name": "Cursor",
    "cat": "开发",
    "desc": "AI 编程编辑器。",
    "auth": "Local",
    "status": "disconnected"
  },
  {
    "id": "c110",
    "name": "Copilot",
    "cat": "开发",
    "desc": "AI 代码补全。",
    "auth": "OAuth",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c111",
    "name": "CodeClimate",
    "cat": "开发",
    "desc": "代码质量分析。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c112",
    "name": "Coveralls",
    "cat": "开发",
    "desc": "覆盖率报告。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c113",
    "name": "Vercel",
    "cat": "开发",
    "desc": "前端部署与预览。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c114",
    "name": "Netlify",
    "cat": "开发",
    "desc": "静态站点部署。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c115",
    "name": "Cloudflare Pages",
    "cat": "开发",
    "desc": "边缘部署。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c116",
    "name": "Gitpod",
    "cat": "开发",
    "desc": "云端开发环境。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c117",
    "name": "CodeSandbox",
    "cat": "开发",
    "desc": "在线代码沙箱。",
    "auth": "OAuth",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c118",
    "name": "Replit",
    "cat": "开发",
    "desc": "在线 IDE。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c119",
    "name": "StackBlitz",
    "cat": "开发",
    "desc": "在线 IDE。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c120",
    "name": "Sourcegraph",
    "cat": "开发",
    "desc": "代码搜索与导航。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c121",
    "name": "Codecov",
    "cat": "开发",
    "desc": "覆盖率分析。",
    "auth": "Token",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c122",
    "name": "Renovate",
    "cat": "开发",
    "desc": "依赖自动更新。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c123",
    "name": "Dependabot",
    "cat": "开发",
    "desc": "依赖安全更新。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c124",
    "name": "Snyk",
    "cat": "开发",
    "desc": "依赖安全扫描。",
    "auth": "Token",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c125",
    "name": "WhiteSource",
    "cat": "开发",
    "desc": "开源安全。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c126",
    "name": "Trivy",
    "cat": "开发",
    "desc": "容器安全扫描。",
    "auth": "Local",
    "status": "disconnected"
  },
  {
    "id": "c127",
    "name": "ESLint",
    "cat": "开发",
    "desc": "JS 代码检查。",
    "auth": "Local",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c128",
    "name": "PostgreSQL",
    "cat": "数据",
    "desc": "关系库查询与表结构探查。",
    "auth": "连接串",
    "status": "disconnected"
  },
  {
    "id": "c129",
    "name": "MySQL",
    "cat": "数据",
    "desc": "关系库读写与慢查询分析。",
    "auth": "连接串",
    "status": "disconnected"
  },
  {
    "id": "c130",
    "name": "MongoDB",
    "cat": "数据",
    "desc": "文档库读写与聚合。",
    "auth": "连接串",
    "status": "disconnected"
  },
  {
    "id": "c131",
    "name": "Redis",
    "cat": "数据",
    "desc": "缓存、队列与锁。",
    "auth": "连接串",
    "status": "disconnected"
  },
  {
    "id": "c132",
    "name": "SQLite",
    "cat": "数据",
    "desc": "轻量本地数据库。",
    "auth": "文件",
    "status": "disconnected"
  },
  {
    "id": "c133",
    "name": "SQL Server",
    "cat": "数据",
    "desc": "企业级关系库。",
    "auth": "连接串",
    "status": "disconnected"
  },
  {
    "id": "c134",
    "name": "Oracle",
    "cat": "数据",
    "desc": "企业级数据库。",
    "auth": "连接串",
    "status": "disconnected"
  },
  {
    "id": "c135",
    "name": "ClickHouse",
    "cat": "数据",
    "desc": "列式分析数据库。",
    "auth": "连接串",
    "status": "disconnected"
  },
  {
    "id": "c136",
    "name": "Snowflake",
    "cat": "数据",
    "desc": "云数据仓库。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c137",
    "name": "BigQuery",
    "cat": "数据",
    "desc": "Google 云数据仓库。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c138",
    "name": "Redshift",
    "cat": "数据",
    "desc": "AWS 数据仓库。",
    "auth": "Key",
    "status": "disconnected"
  },
  {
    "id": "c139",
    "name": "Databricks",
    "cat": "数据",
    "desc": "数据湖与机器学习。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c140",
    "name": "Elasticsearch",
    "cat": "数据",
    "desc": "全文检索与分析。",
    "auth": "连接串",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c141",
    "name": "Kafka",
    "cat": "数据",
    "desc": "消息队列与流处理。",
    "auth": "连接串",
    "status": "disconnected"
  },
  {
    "id": "c142",
    "name": "RabbitMQ",
    "cat": "数据",
    "desc": "消息队列。",
    "auth": "连接串",
    "status": "disconnected"
  },
  {
    "id": "c143",
    "name": "Airflow",
    "cat": "数据",
    "desc": "工作流调度。",
    "auth": "Token",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c144",
    "name": "Spark",
    "cat": "数据",
    "desc": "大数据计算。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c145",
    "name": "Flink",
    "cat": "数据",
    "desc": "实时流计算。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c146",
    "name": "dbt",
    "cat": "数据",
    "desc": "数据转换。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c147",
    "name": "Superset",
    "cat": "数据",
    "desc": "数据可视化。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c148",
    "name": "Tableau",
    "cat": "数据",
    "desc": "商业智能。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c149",
    "name": "Power BI",
    "cat": "数据",
    "desc": "微软 BI 工具。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c150",
    "name": "Metabase",
    "cat": "数据",
    "desc": "开源 BI。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c151",
    "name": "Grafana",
    "cat": "数据",
    "desc": "监控可视化。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c152",
    "name": "Prometheus",
    "cat": "数据",
    "desc": "指标采集。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c153",
    "name": "InfluxDB",
    "cat": "数据",
    "desc": "时序数据库。",
    "auth": "连接串",
    "status": "disconnected"
  },
  {
    "id": "c154",
    "name": "Neo4j",
    "cat": "数据",
    "desc": "图数据库。",
    "auth": "连接串",
    "status": "disconnected"
  },
  {
    "id": "c155",
    "name": "MinIO",
    "cat": "数据",
    "desc": "对象存储。",
    "auth": "Key",
    "status": "disconnected"
  },
  {
    "id": "c156",
    "name": "S3 对象存储",
    "cat": "数据",
    "desc": "归档与下载链接。",
    "auth": "AK/SK",
    "status": "disconnected"
  },
  {
    "id": "c157",
    "name": "阿里云 OSS",
    "cat": "数据",
    "desc": "对象存储。",
    "auth": "AK/SK",
    "status": "disconnected"
  },
  {
    "id": "c158",
    "name": "Druid",
    "cat": "数据",
    "desc": "实时分析数据库。",
    "auth": "连接串",
    "status": "disconnected"
  },
  {
    "id": "c159",
    "name": "Presto",
    "cat": "数据",
    "desc": "分布式查询。",
    "auth": "连接串",
    "status": "disconnected"
  },
  {
    "id": "c160",
    "name": "Hive",
    "cat": "数据",
    "desc": "数据仓库。",
    "auth": "连接串",
    "status": "disconnected"
  },
  {
    "id": "c161",
    "name": "HBase",
    "cat": "数据",
    "desc": "分布式列存储。",
    "auth": "连接串",
    "status": "disconnected"
  },
  {
    "id": "c162",
    "name": "Cassandra",
    "cat": "数据",
    "desc": "分布式 NoSQL。",
    "auth": "连接串",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c163",
    "name": "DynamoDB",
    "cat": "数据",
    "desc": "AWS NoSQL。",
    "auth": "AK/SK",
    "status": "disconnected"
  },
  {
    "id": "c164",
    "name": "Cosmos DB",
    "cat": "数据",
    "desc": "Azure NoSQL。",
    "auth": "Key",
    "status": "disconnected"
  },
  {
    "id": "c165",
    "name": "TiDB",
    "cat": "数据",
    "desc": "分布式关系库。",
    "auth": "连接串",
    "status": "disconnected"
  },
  {
    "id": "c166",
    "name": "OceanBase",
    "cat": "数据",
    "desc": "分布式数据库。",
    "auth": "连接串",
    "status": "disconnected"
  },
  {
    "id": "c167",
    "name": "PolarDB",
    "cat": "数据",
    "desc": "阿里云数据库。",
    "auth": "AK/SK",
    "status": "disconnected"
  },
  {
    "id": "c168",
    "name": "QuestDB",
    "cat": "数据",
    "desc": "时序数据库。",
    "auth": "连接串",
    "status": "disconnected"
  },
  {
    "id": "c169",
    "name": "TimescaleDB",
    "cat": "数据",
    "desc": "时序扩展。",
    "auth": "连接串",
    "status": "disconnected"
  },
  {
    "id": "c170",
    "name": "Supabase",
    "cat": "数据",
    "desc": "Postgres + 认证 + 存储。",
    "auth": "Anon Key",
    "status": "disconnected"
  },
  {
    "id": "c171",
    "name": "OpenAI",
    "cat": "AI 与模型",
    "desc": "大模型对话与嵌入。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c172",
    "name": "DeepSeek",
    "cat": "AI 与模型",
    "desc": "国产大模型推理与代码。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c173",
    "name": "通义千问",
    "cat": "AI 与模型",
    "desc": "百炼模型与 Agent。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c174",
    "name": "智谱 GLM",
    "cat": "AI 与模型",
    "desc": "GLM 模型与工具调用。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c175",
    "name": "Moonshot",
    "cat": "AI 与模型",
    "desc": "Kimi 长文本模型。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c176",
    "name": "MiniMax",
    "cat": "AI 与模型",
    "desc": "多模态模型。",
    "auth": "API Key",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c177",
    "name": "文心一言",
    "cat": "AI 与模型",
    "desc": "百度大模型。",
    "auth": "API Key",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c178",
    "name": "豆包",
    "cat": "AI 与模型",
    "desc": "字节大模型。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c179",
    "name": "硅基流动",
    "cat": "AI 与模型",
    "desc": "模型聚合推理。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c180",
    "name": "OpenRouter",
    "cat": "AI 与模型",
    "desc": "多模型路由。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c181",
    "name": "Anthropic",
    "cat": "AI 与模型",
    "desc": "Claude 系列模型。",
    "auth": "API Key",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c182",
    "name": "Google AI",
    "cat": "AI 与模型",
    "desc": "Gemini 模型。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c183",
    "name": "Mistral",
    "cat": "AI 与模型",
    "desc": "Mistral 模型。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c184",
    "name": "Cohere",
    "cat": "AI 与模型",
    "desc": "NLP 与嵌入。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c185",
    "name": "Hugging Face",
    "cat": "AI 与模型",
    "desc": "模型与数据集。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c186",
    "name": "Replicate",
    "cat": "AI 与模型",
    "desc": "模型托管推理。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c187",
    "name": "Together AI",
    "cat": "AI 与模型",
    "desc": "开源模型推理。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c188",
    "name": "Groq",
    "cat": "AI 与模型",
    "desc": "高性能推理。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c189",
    "name": "Ollama",
    "cat": "AI 与模型",
    "desc": "本地模型推理。",
    "auth": "Local",
    "status": "disconnected"
  },
  {
    "id": "c190",
    "name": "vLLM",
    "cat": "AI 与模型",
    "desc": "本地高性能推理。",
    "auth": "Local",
    "status": "disconnected"
  },
  {
    "id": "c191",
    "name": "Pinecone",
    "cat": "AI 与模型",
    "desc": "向量数据库。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c192",
    "name": "Weaviate",
    "cat": "AI 与模型",
    "desc": "向量数据库。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c193",
    "name": "Milvus",
    "cat": "AI 与模型",
    "desc": "向量数据库。",
    "auth": "连接串",
    "status": "disconnected"
  },
  {
    "id": "c194",
    "name": "Qdrant",
    "cat": "AI 与模型",
    "desc": "向量数据库。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c195",
    "name": "LangChain",
    "cat": "AI 与模型",
    "desc": "LLM 应用框架。",
    "auth": "Local",
    "status": "disconnected"
  },
  {
    "id": "c196",
    "name": "LlamaIndex",
    "cat": "AI 与模型",
    "desc": "RAG 框架。",
    "auth": "Local",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c197",
    "name": "LangSmith",
    "cat": "AI 与模型",
    "desc": "LLM 可观测。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c198",
    "name": "ElevenLabs",
    "cat": "AI 与模型",
    "desc": "语音合成。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c199",
    "name": "Whisper",
    "cat": "AI 与模型",
    "desc": "语音识别。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c200",
    "name": "Stable Diffusion",
    "cat": "AI 与模型",
    "desc": "图像生成。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c201",
    "name": "Midjourney",
    "cat": "AI 与模型",
    "desc": "图像生成。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c202",
    "name": "DALL·E",
    "cat": "AI 与模型",
    "desc": "图像生成。",
    "auth": "API Key",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c203",
    "name": "Runway",
    "cat": "AI 与模型",
    "desc": "视频生成。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c204",
    "name": "Pika",
    "cat": "AI 与模型",
    "desc": "视频生成。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c205",
    "name": "Suno",
    "cat": "AI 与模型",
    "desc": "音乐生成。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c206",
    "name": "Azure OpenAI",
    "cat": "AI 与模型",
    "desc": "微软托管大模型。",
    "auth": "Key",
    "status": "disconnected"
  },
  {
    "id": "c207",
    "name": "AWS Bedrock",
    "cat": "AI 与模型",
    "desc": "AWS 托管模型。",
    "auth": "AK/SK",
    "status": "disconnected"
  },
  {
    "id": "c208",
    "name": "Vertex AI",
    "cat": "AI 与模型",
    "desc": "GCP 托管模型。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c209",
    "name": "AI21",
    "cat": "AI 与模型",
    "desc": "Jurassic 模型。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c210",
    "name": "Aleph Alpha",
    "cat": "AI 与模型",
    "desc": "欧洲大模型。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c211",
    "name": "Baidu ERNIE",
    "cat": "AI 与模型",
    "desc": "文心大模型。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c212",
    "name": "腾讯混元",
    "cat": "AI 与模型",
    "desc": "腾讯大模型。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c213",
    "name": "百川智能",
    "cat": "AI 与模型",
    "desc": "百川大模型。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c214",
    "name": "AWS",
    "cat": "部署与云",
    "desc": "云服务全家桶。",
    "auth": "AK/SK",
    "status": "disconnected"
  },
  {
    "id": "c215",
    "name": "阿里云",
    "cat": "部署与云",
    "desc": "国内云服务。",
    "auth": "AK/SK",
    "status": "disconnected"
  },
  {
    "id": "c216",
    "name": "腾讯云",
    "cat": "部署与云",
    "desc": "国内云服务。",
    "auth": "AK/SK",
    "status": "disconnected"
  },
  {
    "id": "c217",
    "name": "华为云",
    "cat": "部署与云",
    "desc": "国内云服务。",
    "auth": "AK/SK",
    "status": "disconnected"
  },
  {
    "id": "c218",
    "name": "Google Cloud",
    "cat": "部署与云",
    "desc": "GCP 云服务。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c219",
    "name": "Azure",
    "cat": "部署与云",
    "desc": "微软云服务。",
    "auth": "OAuth",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c220",
    "name": "DigitalOcean",
    "cat": "部署与云",
    "desc": "云主机与托管。",
    "auth": "Token",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c221",
    "name": "Heroku",
    "cat": "部署与云",
    "desc": "PaaS 平台。",
    "auth": "Token",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c222",
    "name": "Railway",
    "cat": "部署与云",
    "desc": "部署平台。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c223",
    "name": "Render",
    "cat": "部署与云",
    "desc": "云托管。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c224",
    "name": "Fly.io",
    "cat": "部署与云",
    "desc": "全球部署。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c225",
    "name": "Cloudflare",
    "cat": "部署与云",
    "desc": "CDN 与边缘。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c226",
    "name": "Kubernetes",
    "cat": "部署与云",
    "desc": "容器编排。",
    "auth": "Kubeconfig",
    "status": "disconnected"
  },
  {
    "id": "c227",
    "name": "Docker",
    "cat": "部署与云",
    "desc": "容器。",
    "auth": "Socket",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c228",
    "name": "Terraform",
    "cat": "部署与云",
    "desc": "基础设施即代码。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c229",
    "name": "Ansible",
    "cat": "部署与云",
    "desc": "自动化运维。",
    "auth": "SSH",
    "status": "disconnected"
  },
  {
    "id": "c230",
    "name": "Nginx",
    "cat": "部署与云",
    "desc": "反向代理。",
    "auth": "SSH",
    "status": "disconnected"
  },
  {
    "id": "c231",
    "name": "Caddy",
    "cat": "部署与云",
    "desc": "Web 服务器。",
    "auth": "SSH",
    "status": "disconnected"
  },
  {
    "id": "c232",
    "name": "Kong",
    "cat": "部署与云",
    "desc": "API 网关。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c233",
    "name": "Istio",
    "cat": "部署与云",
    "desc": "服务网格。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c234",
    "name": "Consul",
    "cat": "部署与云",
    "desc": "服务发现。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c235",
    "name": "Vault",
    "cat": "部署与云",
    "desc": "密钥管理。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c236",
    "name": "Datadog",
    "cat": "部署与云",
    "desc": "监控与可观测。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c237",
    "name": "New Relic",
    "cat": "部署与云",
    "desc": "应用性能监控。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c238",
    "name": "PagerDuty",
    "cat": "部署与云",
    "desc": "告警与值班。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c239",
    "name": "CloudWatch",
    "cat": "部署与云",
    "desc": "AWS 监控。",
    "auth": "AK/SK",
    "status": "disconnected"
  },
  {
    "id": "c240",
    "name": "Zabbix",
    "cat": "部署与云",
    "desc": "开源监控。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c241",
    "name": "Loki",
    "cat": "部署与云",
    "desc": "日志聚合。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c242",
    "name": "Argo CD",
    "cat": "部署与云",
    "desc": "GitOps 部署。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c243",
    "name": "Knative",
    "cat": "部署与云",
    "desc": "Serverless 编排。",
    "auth": "Token",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c244",
    "name": "OpenShift",
    "cat": "部署与云",
    "desc": "企业级 K8s。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c245",
    "name": "Rancher",
    "cat": "部署与云",
    "desc": "K8s 管理。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c246",
    "name": "Nomad",
    "cat": "部署与云",
    "desc": "集群调度。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c247",
    "name": "Puppet",
    "cat": "部署与云",
    "desc": "配置管理。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c248",
    "name": "Chef",
    "cat": "部署与云",
    "desc": "配置管理。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c249",
    "name": "SaltStack",
    "cat": "部署与云",
    "desc": "配置管理。",
    "auth": "Token",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c250",
    "name": "Helm",
    "cat": "部署与云",
    "desc": "K8s 包管理。",
    "auth": "Local",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c251",
    "name": "Kustomize",
    "cat": "部署与云",
    "desc": "K8s 配置。",
    "auth": "Local",
    "status": "disconnected"
  },
  {
    "id": "c252",
    "name": "Tekton",
    "cat": "部署与云",
    "desc": "云原生 CI/CD。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c253",
    "name": "Jenkins X",
    "cat": "部署与云",
    "desc": "云原生 CI/CD。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c254",
    "name": "Spinnaker",
    "cat": "部署与云",
    "desc": "多云发布。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c255",
    "name": "Crossplane",
    "cat": "部署与云",
    "desc": "云资源管理。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c256",
    "name": "Pulumi",
    "cat": "部署与云",
    "desc": "基础设施即代码。",
    "auth": "Token",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c257",
    "name": "Salesforce",
    "cat": "业务",
    "desc": "CRM 客户与商机。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c258",
    "name": "Stripe",
    "cat": "业务",
    "desc": "订阅与支付。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c259",
    "name": "支付宝",
    "cat": "业务",
    "desc": "扫码支付。",
    "auth": "Key",
    "status": "disconnected"
  },
  {
    "id": "c260",
    "name": "微信支付",
    "cat": "业务",
    "desc": "扫码与小程序支付。",
    "auth": "Key",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c261",
    "name": "HubSpot",
    "cat": "业务",
    "desc": "营销与 CRM。",
    "auth": "OAuth",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c262",
    "name": "Zendesk",
    "cat": "业务",
    "desc": "客服与工单。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c263",
    "name": "Intercom",
    "cat": "业务",
    "desc": "客户沟通。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c264",
    "name": "Freshdesk",
    "cat": "业务",
    "desc": "客服平台。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c265",
    "name": "SAP",
    "cat": "业务",
    "desc": "ERP 系统。",
    "auth": "Token",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c266",
    "name": "金蝶",
    "cat": "业务",
    "desc": "财务与 ERP。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c267",
    "name": "用友",
    "cat": "业务",
    "desc": "财务与 ERP。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c268",
    "name": "QuickBooks",
    "cat": "业务",
    "desc": "会计软件。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c269",
    "name": "Xero",
    "cat": "业务",
    "desc": "云会计。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c270",
    "name": "Shopify",
    "cat": "业务",
    "desc": "电商平台。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c271",
    "name": "Magento",
    "cat": "业务",
    "desc": "电商系统。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c272",
    "name": "WooCommerce",
    "cat": "业务",
    "desc": "WordPress 电商。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c273",
    "name": "有赞",
    "cat": "业务",
    "desc": "社交电商。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c274",
    "name": "微盟",
    "cat": "业务",
    "desc": "智慧零售。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c275",
    "name": "高德地图",
    "cat": "业务",
    "desc": "地理编码与路径。",
    "auth": "Key",
    "status": "disconnected"
  },
  {
    "id": "c276",
    "name": "百度地图",
    "cat": "业务",
    "desc": "地图与导航。",
    "auth": "Key",
    "status": "disconnected"
  },
  {
    "id": "c277",
    "name": "腾讯地图",
    "cat": "业务",
    "desc": "地图服务。",
    "auth": "Key",
    "status": "disconnected"
  },
  {
    "id": "c278",
    "name": "Google Maps",
    "cat": "业务",
    "desc": "地图与地理。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c279",
    "name": "Twilio",
    "cat": "业务",
    "desc": "短信与语音。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c280",
    "name": "SendGrid",
    "cat": "业务",
    "desc": "邮件发送。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c281",
    "name": "Mailchimp",
    "cat": "业务",
    "desc": "邮件营销。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c282",
    "name": "ConvertKit",
    "cat": "业务",
    "desc": "创作者邮件。",
    "auth": "API Key",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c283",
    "name": "Zapier",
    "cat": "业务",
    "desc": "应用集成。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c284",
    "name": "Make",
    "cat": "业务",
    "desc": "自动化集成。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c285",
    "name": "n8n",
    "cat": "业务",
    "desc": "开源自动化。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c286",
    "name": "IFTTT",
    "cat": "业务",
    "desc": "触发联动。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c287",
    "name": "Pipedrive",
    "cat": "业务",
    "desc": "销售 CRM。",
    "auth": "OAuth",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c288",
    "name": "Zoho CRM",
    "cat": "业务",
    "desc": "CRM 系统。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c289",
    "name": "Freshworks",
    "cat": "业务",
    "desc": "客户平台。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c290",
    "name": "Gorgias",
    "cat": "业务",
    "desc": "电商客服。",
    "auth": "Token",
    "status": "disconnected"
  },
  {
    "id": "c291",
    "name": "Klaviyo",
    "cat": "业务",
    "desc": "电商营销。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c292",
    "name": "ActiveCampaign",
    "cat": "业务",
    "desc": "营销自动化。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c293",
    "name": "Brevo",
    "cat": "业务",
    "desc": "营销与交易邮件。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c294",
    "name": "Iterable",
    "cat": "业务",
    "desc": "跨渠道营销。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c295",
    "name": "Customer.io",
    "cat": "业务",
    "desc": "客户消息。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c296",
    "name": "Braintree",
    "cat": "业务",
    "desc": "支付网关。",
    "auth": "API Key",
    "status": "disconnected"
  },
  {
    "id": "c297",
    "name": "PayPal",
    "cat": "业务",
    "desc": "在线支付。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c298",
    "name": "Square",
    "cat": "业务",
    "desc": "支付与 POS。",
    "auth": "OAuth",
    "status": "disconnected"
  },
  {
    "id": "c299",
    "name": "Adyen",
    "cat": "业务",
    "desc": "支付平台。",
    "auth": "API Key",
    "status": "connected",
    "account": "已授权账号"
  },
  {
    "id": "c300",
    "name": "Paddle",
    "cat": "业务",
    "desc": "软件支付。",
    "auth": "API Key",
    "status": "connected",
    "account": "已授权账号"
  }
];

const PROJECTS = [
  { id: 'p1', name: 'platformx-web', desc: '工作台前端与设计系统', repo: 'github.com/platformx/web', branch: 'main', files: 428, lang: 'TypeScript', hue: 216, tasks: 12 },
  { id: 'p2', name: 'q3-经营分析', desc: '季度经营数据与汇报材料', repo: '本地工作区 / finance', branch: '—', files: 96, lang: 'XLSX', hue: 38, tasks: 7 },
  { id: 'p3', name: 'brand-refresh', desc: '品牌视觉焕新与官网改版', repo: 'figma.com/platformx', branch: 'v2', files: 154, lang: 'Figma', hue: 275, tasks: 5 },
  { id: 'p4', name: 'agent-runtime', desc: '任务执行引擎与工具网关', repo: 'github.com/platformx/runtime', branch: 'feat/tools', files: 731, lang: 'Go', hue: 168, tasks: 18 },
  { id: 'p5', name: '客户成功知识库', desc: '交付手册、FAQ 与案例库', repo: '本地工作区 / kb', branch: '—', files: 212, lang: 'Markdown', hue: 12, tasks: 3 }
];

const DOCS = [
  { id: 'd1', name: '2026 Q3 经营分析报告.xlsx', type: 'xlsx', size: '2.4 MB', collection: '经营数据', updated: '2 小时前', owner: '财务部', tags: ['季度', '核心指标'], starred: true },
  { id: 'd2', name: 'PlatformX 产品需求文档 v3.docx', type: 'docx', size: '860 KB', collection: '产品', updated: '昨天', owner: '产品部', tags: ['PRD', 'v3'], starred: true },
  { id: 'd3', name: '设计系统 Token 规范.fig', type: 'fig', size: '12.8 MB', collection: '设计', updated: '昨天', owner: '设计中心', tags: ['Token', '组件'], starred: false },
  { id: 'd4', name: 'API 接入指南.md', type: 'md', size: '148 KB', collection: '工程', updated: '3 天前', owner: '平台组', tags: ['API', '文档'], starred: false },
  { id: 'd5', name: '竞品能力对照表.pdf', type: 'pdf', size: '5.1 MB', collection: '市场', updated: '3 天前', owner: '战略部', tags: ['竞品', '2026'], starred: true },
  { id: 'd6', name: '客户交付手册（华南区）.docx', type: 'docx', size: '1.2 MB', collection: '客户成功', updated: '上周', owner: '交付团队', tags: ['SOP'], starred: false },
  { id: 'd7', name: '季度汇报模板.pptx', type: 'pptx', size: '8.7 MB', collection: '模板', updated: '上周', owner: '总办', tags: ['模板', '汇报'], starred: false },
  { id: 'd8', name: '用户访谈原始记录（12 场）.txt', type: 'txt', size: '320 KB', collection: '用户研究', updated: '上周', owner: '用户研究', tags: ['访谈', '原始'], starred: false },
  { id: 'd9', name: '数据仓库表结构说明.sql', type: 'sql', size: '96 KB', collection: '工程', updated: '2 周前', owner: '数据组', tags: ['数仓', 'Schema'], starred: false },
  { id: 'd10', name: '品牌视觉手册 2026.pdf', type: 'pdf', size: '42.3 MB', collection: '设计', updated: '2 周前', owner: '品牌部', tags: ['VI', '规范'], starred: true }
];

const AUTOMATIONS = [
  { id: 'a1', name: '每日经营早报', schedule: '每个工作日 08:30', desc: '汇总昨日 GMV、订单、退款与库存预警，生成图文早报并推送到企业微信群。', on: true, last: '今天 08:30 已运行' },
  { id: 'a2', name: '周报自动成稿', schedule: '每周五 18:00', desc: '拉取本周任务与提交记录，按项目生成周报草稿，附产出链接。', on: true, last: '10 月 31 日 18:00 已运行' },
  { id: 'a3', name: '代码质量巡检', schedule: '每天 02:00', desc: '扫描主干分支新增代码，输出风险清单并创建 Issue。', on: false, last: '已暂停' },
  { id: 'a4', name: '设计稿变更提醒', schedule: '实时触发', desc: 'Figma 组件库更新后，比对代码实现差异并通知负责人。', on: true, last: '3 小时前触发' },
  { id: 'a5', name: '竞品动态监测', schedule: '每天 09:00', desc: '抓取竞品官网、应用商店与社媒动态，生成要点摘要并推送。', on: true, last: '今天 09:00 已运行' },
  { id: 'a6', name: '数据报表日报', schedule: '每天 07:00', desc: '汇总各数据源关键指标，生成可视化报表并归档到知识库。', on: true, last: '今天 07:00 已运行' },
  { id: 'a7', name: '工单超时预警', schedule: '每 30 分钟', desc: '扫描未处理工单，对超时项发送告警并 @ 对应负责人。', on: true, last: '15 分钟前触发' },
  { id: 'a8', name: '发票逾期提醒', schedule: '每月 25 日 10:00', desc: '核对本月应收/应付发票，标记临期项并生成催收清单。', on: false, last: '已暂停' },
  { id: 'a9', name: '会议纪要归档', schedule: '实时触发', desc: '会议结束后自动转写录音，提取决议与待办并同步到文档与任务系统。', on: true, last: '昨天 16:20 触发' },
  { id: 'a10', name: '客户回访计划', schedule: '每月 1 日 09:00', desc: '按签约周期生成客户回访清单，分配跟进人并下发提醒。', on: false, last: '已暂停' }
];

const TEMPLATES = [
  { id: 't1', mode: 'office', title: '把数据做成汇报', desc: '上传表格，产出结论清晰的分析报告与 12 页汇报稿', prompt: '把 @2026 Q3 经营分析报告.xlsx 整理成季度经营分析汇报，包含同环比拆解、异常归因与三页结论。' },
  { id: 't2', mode: 'dev', title: '实现一个功能', desc: '描述需求，直接改代码、跑测试并提交 PR', prompt: '在 platformx-web 中新增「任务模板」页面，支持按模式筛选与一键填充，完成后跑通构建并提交草稿 PR。' },
  { id: 't3', mode: 'design', title: '出三版视觉方向', desc: '给出调性关键词，得到可评审的界面方案', prompt: '为 PlatformX 官网首页设计三个视觉方向：极简专业、技术张力、温暖亲和，输出配色、字体与首屏布局。' }
];

/* 套餐与积分：体验版 / 标准版 / 专业版
 * 每档含「月付」与「年付」两种价格（体验版免费，无年付）
 */
const PLANS = [
  {
    id: 'trial', name: '体验版', tag: '免费',
    price: 0, priceYear: 0, period: '永久',
    credits: 100, /* 每月赠送积分 */
    desc: '上手体验核心能力，适合个人轻量使用。',
    limits: { maxTasks: 10, maxConcurrent: 1, dailyCredits: 30 },
    features: ['内置 10 个开源模型', '每月 100 积分（约 30 次任务）', '最多 10 个任务', '单任务单次执行', '基础文档 / 表格技能', '社区支持'],
    highlight: false
  },
  {
    id: 'standard', name: '标准版', tag: '推荐',
    price: 9, priceYear: 88, period: '月', /* 月付 9 元/月 · 年付 88 元/年 */
    credits: 2000, /* 每月赠送积分 */
    desc: '日常办公与开发的主力档位，额度与并发更宽裕。',
    limits: { maxTasks: 500, maxConcurrent: 3, dailyCredits: null },
    features: ['全部开源模型 + 自定义模型', '每月 2000 积分（约 600 次任务）', '最多 500 个任务', '3 个并发任务', '语音输入 · 增强提示词', '专家 / 技能 / 连接器全量开放', '邮箱支持'],
    highlight: true
  },
  {
    id: 'pro', name: '专业版', tag: '最高配',
    price: 99, priceYear: 888, period: '月', /* 月付 99 元/月 · 年付 888 元/年 */
    credits: 10000, /* 每月赠送积分 */
    desc: '重度用户与团队场景，不限任务数、最高并发。',
    limits: { maxTasks: Infinity, maxConcurrent: 10, dailyCredits: null },
    features: ['标准版全部能力', '每月 10000 积分', '任务数不限', '10 个并发任务', '自定义网关 / 私有化部署支持', '自动化与定时任务', '优先客服 · 专属顾问'],
    highlight: false
  }
];

/* 积分充值包（元），点击后走微信/支付宝扫码支付 */
const CREDIT_PACKS = [
  { id: 'p100', credits: 100, price: 6, tag: '' },
  { id: 'p500', credits: 500, price: 25, tag: '95 折' },
  { id: 'p1000', credits: 1000, price: 45, tag: '9 折' },
  { id: 'p3000', credits: 3000, price: 120, tag: '8 折' }
];

const NAV = [
  { group: '工作台', items: [
    { route: 'tasks', label: '任务', icon: 'clock' },
    { route: 'projects', label: '项目', icon: 'folder' },
    { route: 'library', label: '资料库', icon: 'database' }
  ]},
  { group: '能力', items: [
    { route: 'experts', label: '专家', icon: 'users' },
    { route: 'skills', label: '技能', icon: 'bolt' },
    { route: 'connectors', label: '连接器', icon: 'plug' }
  ]},
  { group: '更多', items: [
    { route: 'automations', label: '自动化', icon: 'repeat' },
    { route: 'plans', label: '套餐与积分', icon: 'gem' },
    { route: 'settings', label: '设置', icon: 'settings' }
  ]}
];

const INITIAL_TASKS = [
  {
    id: 'task-seed-1',
    title: '把 Q3 经营数据整理成汇报',
    mode: 'office',
    model: 'glm-5.3',
    project: 'p2',
    status: 'done',
    createdAt: Date.now() - 1000 * 60 * 60 * 5,
    attachments: [{ name: '2026 Q3 经营分析报告.xlsx', size: 2516582 }],
    messages: [
      { role: 'user', text: '把 @2026 Q3 经营分析报告.xlsx 整理成季度经营分析汇报，包含同环比拆解、异常归因与三页结论。' },
      { role: 'steps', items: [
        { label: '读取附件', detail: '解析 3 个工作表 / 1,284 行数据', state: 'done' },
        { label: '检索资料库', detail: '命中「季度汇报模板.pptx」等 2 项', state: 'done' },
        { label: '生成汇报稿', detail: '调用 workbuddy-docx', state: 'done' }
      ]},
      { role: 'assistant', text: '已完成 **Q3 经营分析汇报**，共 12 页，核心结论如下：\n\n### 一、整体表现\n- 营收 4.82 亿，同比 **+18.4%**，环比 **+6.1%**，跑赢季度目标 3.2 个百分点\n- 毛利率 61.3%，同比下降 1.8pt，主要来自云资源与人力成本上升\n\n### 二、异常归因\n- 华东区 9 月退款率升至 4.7%（基线 2.1%），集中在 8 月上线的新计费链路\n- 客单价下滑 12%，与低价套餐渗透率提升至 34% 直接相关\n\n### 三、建议动作\n1. 计费链路灰度回滚，两周内把退款率压回 2.5% 以内\n2. 对 34% 低价套餐用户做升级触达，目标客单价回升 8%\n3. Q4 预算向华东区交付能力倾斜',
        artifacts: [{ name: 'Q3 经营分析汇报.pptx', type: 'pptx', size: '6.8 MB' }, { name: 'Q3 指标明细.xlsx', type: 'xlsx', size: '1.1 MB' }]
      }
    ]
  },
  {
    id: 'task-seed-2',
    title: '重构用户鉴权模块并补充单测',
    mode: 'dev',
    model: 'qwen3.8-2.4t',
    project: 'p1',
    status: 'done',
    createdAt: Date.now() - 1000 * 60 * 60 * 26,
    attachments: [],
    messages: [
      { role: 'user', text: '重构 platformx-web 的用户鉴权模块，把 token 刷新逻辑抽成独立 service，并补充单元测试。' },
      { role: 'steps', items: [
        { label: '检索代码库', detail: '定位 7 个相关文件', state: 'done' },
        { label: '编辑文件', detail: '新增 auth/refresh.service.ts，改动 4 处引用', state: 'done' },
        { label: '运行测试', detail: 'npm run test — 32 passed', state: 'done' }
      ]},
      { role: 'assistant', text: '重构完成，`refreshToken` 的并发与竞态问题一并修复。\n\n```ts\nexport class RefreshService {\n  private inflight: Promise<Token> | null = null;\n\n  async refresh(): Promise<Token> {\n    // 并发调用复用同一个 Promise，避免刷新风暴\n    if (!this.inflight) {\n      this.inflight = this.request().finally(() => (this.inflight = null));\n    }\n    return this.inflight;\n  }\n}\n```\n\n测试结果：**32 passed / 0 failed**，覆盖率从 61% 提升到 87%。',
        artifacts: [{ name: 'auth-refresh.patch', type: 'patch', size: '18 KB' }]
      }
    ]
  },
  {
    id: 'task-seed-3',
    title: '为官网出 3 版视觉方向',
    mode: 'design',
    model: 'llama-4-scout',
    project: 'p3',
    status: 'done',
    createdAt: Date.now() - 1000 * 60 * 60 * 52,
    attachments: [],
    messages: [
      { role: 'user', text: '为 PlatformX 官网首页设计三个视觉方向：极简专业、技术张力、温暖亲和，输出配色、字体与首屏布局。' },
      { role: 'steps', items: [
        { label: '读取设计规范', detail: '品牌视觉手册 2026.pdf', state: 'done' },
        { label: '生成方案', detail: 'image-gen · 6 张草图', state: 'done' },
        { label: '整理提案', detail: 'workbuddy-pptx', state: 'done' }
      ]},
      { role: 'assistant', text: '三个方向已产出，差异点集中在**首屏信息密度**与**色彩策略**：\n\n### 方向 A · 极简专业\n墨黑底 + 单色留白，首屏只有一句主张与一个输入框，适合强调「专业、可靠」。\n\n### 方向 B · 技术张力\n深蓝渐变 + 等宽字体标注，首屏用任务流实时滚动展示，适合开发者与设计团队。\n\n### 方向 C · 温暖亲和\n米白底 + 陶土橙点缀，插画化流程说明，适合面向业务部门的办公场景。\n\n建议主站用 **A**，开发者落地页用 **B**，行业方案页用 **C**。',
        artifacts: [{ name: '官网视觉提案 v1.pptx', type: 'pptx', size: '24.6 MB' }]
      }
    ]
  }
];
