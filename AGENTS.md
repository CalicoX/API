# 17TRACK Tracking API 落地页

Park 在这个仓库里直接改代码、看效果。Agent 用简体中文回复。产品原文不要改。

## 每次开工

1. 先读 `.cursor/memory.md`（当前决策和未完成项）。
2. 有新的设计取舍、布局数字、或用户纠正时，立刻写回 memory。
3. 一轮改完后必须落到 GitHub：`commit` + `push` `origin/main`。  
   项目 hook 会在 agent **stop** 时自动做这件事；如果 hook 没跑，agent 自己做，不要问要不要提交。

## 页面结构

`LandingPage.jsx`：Hero → TrustBand → UseCases → HowItWorks → DataOperations → Applications → BottomCta → ExploreMore。

- 内容壳 `.api-wrap`：**1440px**（含约 24px page padding）。
- 主样式：`src/styles/api-page.css`。
- 插图：`src/components/visuals/ApiDomVisuals.jsx`。
- 文案检查：`src/structure.test.js`。

## 视觉约定

- How-it-works / Data Operations 插图：浅灰井 `#f7f8fa` + 点阵，白 UI 碎片，8–11px 字，细描边。不要实拍、不要 3D 开盖。
- 四张 Data Operations 卡必须**四种构图**，不要同一套铺满双栏。
  1. Tracking data：双环大状态图标（外 5 / 内 4）绕小平面 17TRACK 方标；hover 内外反向慢转。
  2. Carriers：中心 3400+ + 两侧 logo **连线**。
  3. Visibility：两张重叠卡拆开（运单号 → 自动识别）。
  4. Dashboard：井中小卡，**环形图描边**动画。
- Hover：整卡触发，约 3.2s，`cubic-bezier(0.22, 1, 0.36, 1)`；位移走水平，不要斜移。
- Data Operations：浅灰整段、sticky 竖滑横移、标题左对齐、右侧圆形 prev/next。单卡约 800×500。滚动用连续 `--s4-x`，不要整卡跳。

## Git

- 远程：`https://github.com/CalicoX/API.git`，默认分支 `main`。
- 不要 commit `.env`、密钥、`node_modules`、`dist`。
- 不要 `push --force`、不要改 git config、不要 `--no-verify`。
- 自动提交说明写「为什么」，1–2 句中文即可。
