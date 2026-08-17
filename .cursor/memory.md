# 项目记忆

Agent 开场必读；有新决策就改这一页。下面「日志」由 stop hook 自动追加。

## 现在

- 仓库：https://github.com/CalicoX/API.git（`main`）
- 本地开发：`http://127.0.0.1:5173/`
- 用户：Park，设计师，直接改代码迭代
- 产品：17TRACK Tracking API 落地页

## 决策

- 产品原文不改。
- 内容区 1440px，注意 wrap 的 24px padding；不要负 margin 撑出外壳。
- How-it-works 三张卡：白卡 20px 圆角、8px 内边距；插图井浅灰点阵、overflow hidden。
- Data Operations 四张卡插图要各不相同，不能都顶满井。
- Tracking data 卡：双环 9 个大状态用 Figma 官方图标（`public/assets/status/`），外 5 / 内 4。状态色必须用产品官方值，不要改灰：Info `#00bcd4`、Transit `#2196f3`、Out `#2962ff`、Pickup `#0d47a1`、Alert `#ff6f00`、Delivered `#43a047`、Expired `#b71c1c`、Undelivered `#f44336`、NotFound `#757575`。圆角 6px。体积渐变 160°：亮停靠白、暗停靠井色 `#151b28`，不要混纯黑。两圈描边已对调：外圈深（`0 0 0 1px`，chip 混井色），内圈浅（`inset 1px`，chip 混白）。整卡 hover：图标从 `scale(0.84)` + 压暗缓动放大点亮到现在的尺寸（`cubic-bezier(0.22, 1, 0.36, 1)`，约 0.85s），同时内外反向公转；图标正向、中心在轨道上。中间 17 logo 平面约 64px，外形是超椭圆（n=5，二次贝塞尔平滑曲线），不要普通圆角矩形。中间 logo 光还要更大（外圈约 168px / blur 34 / drop-shadow 68px），饱和蓝（`#2f7dff` / `#5eb0ff`），贴边+外扩，中心亮、边缘干净衰减；不要发白、不要紫、不要脏雾。Park 连说不够。轨道圆圈很淡（约 0.2 透明度）。
- Tracking data 井：深色，只比 `#0a0d14` 稍浅一档，不要改浅灰、不要改成中灰蓝 `#3c465e`。渐变中心 `#1c2434` → 边 `#111620`，再加很淡的白蓝径向。点阵用淡白点。其它三张 Data Ops 井仍浅灰点阵。
- 承运商卡：3400+ 在上，13 个运输商 logo 分三排往下散开，底排淡出表示还有更多。枢纽约 120px，插图尽量铺满井。
- 标题单词亮度跟滚动走（`--on`），不是进场自动播。
- 右侧渐隐遮罩跟 `--s4-p`，最后一张收掉。
- Contact Us 在四张卡都有；当前卡 / hover 箭头 `api-s4-cta-nudge`。
- 手机 ≤900px：取消 sticky，竖排叠卡，藏导航按钮。
- 手机插图井高度：Use Cases 的 `.api-s2-visual` 必须 `flex: 0 0 auto` + 实高（约 88vw/340，min 280）。`.api-iso-host` 是 absolute，copy 若 `height:100%` 会把井压成 0。手机藏 tickbar。
- How-it-works 井不要锁 260：`min(90vw, 340)` / min 300，webhook 仍可底裁。
- Data Ops 井不要锁 240：正方形 `aspect-ratio: 1`；轨道缩到 `--r-out:118` / `--r-in:76`，避免图标被裁。
- Hero shader 已本地化：`hero-wash-shader.js` 纯 WebGL 复刻 shaders.com Undertones 1，npm `shaders` 依赖已删。技术细节见 AGENTS.md「Hero shader」节。墨迹手感只调 `CF_INTENSITY`（1.2）和 `CF_FADE_SCALE`（0.45）。
- Hero 拖尾：紫 `#D042FF` + 蓝 `#5B4FFF` + 一点橙 `#FF3805`（只占 left 一个方向）。绿 `#66FF73` 不要。
- `.api-s4-track` 的 `overflow-x: clip` 防横向滚动，不能换成 hidden（会杀 sticky）。

## 未完成

- 2026-08-14 先停在这里。
- Tracking data：中间 logo 光晕已再加大一档（124px / blur 24 / drop-shadow 44px）。Park 再看。
- 承运商卡已改成从上往下散开。Visibility / Dashboard 还没按同一轮重做。

## 日志

- 2026-08-17 10:26 — memory.md、api-page.css
- 2026-08-17 10:24 — memory.md、api-page.css
- 2026-08-17 10:22 — api-page.css
- 2026-08-17 10:19 — memory.md、api-page.css
- 2026-08-17 10:17 — memory.md、api-page.css
- 2026-08-17 10:13 — memory.md、api-page.css
- 2026-08-14 15:39 — memory.md、AGENTS.md、ApiDomVisuals.jsx、api-page.css、status
- 2026-08-14 15:32 — memory.md、ApiDomVisuals.jsx、api-page.css
- 2026-08-14 14:50 — memory.md、AGENTS.md、ApiDomVisuals.jsx、api-page.css
- 2026-08-14 14:45 — memory.md、AGENTS.md、ApiDomVisuals.jsx、api-page.css
- 2026-08-14 11:31 — memory.md、AGENTS.md、ApiDomVisuals.jsx、api-page.css、logo-17-mark.png
- 2026-08-14 10:38 — memory.md
- 2026-08-14 10:38 — .gitignore、.cursor、AGENTS.md
