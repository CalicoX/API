# 项目记忆

Agent 开场必读；有新决策就改这一页。下面「日志」由 stop hook 自动追加。

## 现在

- 仓库：https://github.com/CalicoX/API.git（`main`）
- 本地开发：`http://127.0.0.1:5173/`
- 用户：Park，设计师，直接改代码迭代
- 产品：17TRACK Tracking API 落地页

## 决策

- 产品原文不改。
- Hero H1 字内光：hover 时光斑只在字形内部（`background-clip: text`，底层墨色 + 跟鼠标的径向光斑，中心浅蓝 `#c4deff`、中段蓝紫 `rgba(91,111,255)`，半径 170px）。坐标 `--h1-x/--h1-y` 由 h1 的 onMouseMove 写入；光强 `--h1-glow` 用 `@property` 注册成 number，`:hover` 置 1、0.45s 过渡淡入淡出。不要做成扫光动画，是跟手的。
- Hero 左栏文案（2026-08-17 定稿）：H2 副标降级不抢 H1——`clamp(1.2rem, 1.8vw, 1.55rem)`、字重 600、色 `#3352b3`（不用 `#1e40af` 粗黑蓝）。lead 去掉 `.api-lead-line` 强制两行 nowrap，自然换行 + `max-width: 42ch`。`3400+` 药丸改浅底：`#dbeafe` 底 + `#1d4ed8` 字，不再实心蓝底白字。checklist 圆点改轻量：`#eff6ff` 底 + `#bfdbfe` 描边 + 蓝勾（不再实心蓝底白勾），行距 gap 10px。copy 区加 `::before` 白色径向 veil（z:-1，压在 shader 上保证可读性）。左栏第五条「View docs」次级 CTA 暂不加。
- Hero 注册表单：右栏宽 `minmax(420px, 520px)`（原 380/460，Park 要更宽）。不用红星标必填，非必填（Company Website / 留言）label 右侧灰字 `Optional`。留言框默认收成 44px、focus 缓动展开到 96px、`resize: none` 不能拖。输入框白底 `#e2e8f0` 描边 + 浅投影，hover 描边加深。Password 有 show/hide 眼睛。`No credit card required` 徽章在 CTA 按钮正下方居中，不在标题行。法务 checkbox 11px 淡灰。字段间距 15/14px。
- 内容区 1440px，注意 wrap 的 24px padding；不要负 margin 撑出外壳。
- How-it-works 三张卡：白卡 20px 圆角、8px 内边距；插图井浅灰点阵、overflow hidden。
- Data Operations 四张卡插图要各不相同，不能都顶满井。
- Dashboard 卡（2026-08-17 重做）：井里是「圆形半透明遮罩 + 仪表盘拼贴」。遮罩 `api-s4-dash-disc`：白色半透明圆盘（min(84%,320px)，径向白 0.92→0.22 + 淡蓝晕），1px `rgba(15,23,42,0.06)` 发丝描边，垫在点阵上、拼贴下，与拼贴中心对位。拼贴 `api-s4-dashgrid` min(88%,336px) 两列 `grid-template-rows: auto 1fr`，左右两列**上下齐平**（Park 嫌右列下沉重心歪，别加 margin-top 错位）：左 donut 主卡（Status distribution，donut 118px，图例单列 4 项——不要两列会换行）、右列 Carrier time performance 迷你条形（4 承运商 ×天数，条色 #2962ff/#2196f3/#00bcd4/#43a047）+ Tracking function status LED 行（绿绿橙 + 右对齐 %，1fr 拉伸 + `padding-bottom: 42px` 留空）；Webhook push alert toast 锚在网格右下角（bottom -10 / right -8，压在 fn 卡的留白区上，不悬空、不盖行），铃铛橙块 #fff7ed/#ff6f00。hover 全部 3.2s cubic-bezier(0.22,1,0.36,1) infinite：donut 重描（原有）、条形 scaleX 重涨（delay --i×0.09s）、LED box-shadow 呼吸、toast 从右滑入左滑出（位移只走水平）。≤900px：donut 96px、grid 94%、toast 改 static 入流占整行靠右（绝对定位会压行或被井底裁）。reduce-motion 全停。仪表盘微字 8–9px 是插图微文案，不算产品文案。
- Tracking data 卡：双环 9 个大状态用 Figma 官方图标（`public/assets/status/`），外 5 / 内 4。状态色必须用产品官方值，不要改灰：Info `#00bcd4`、Transit `#2196f3`、Out `#2962ff`、Pickup `#0d47a1`、Alert `#ff6f00`、Delivered `#43a047`、Expired `#b71c1c`、Undelivered `#f44336`、NotFound `#757575`。圆角 6px。体积渐变 160°：亮停靠白、暗停靠井色 `#151b28`，不要混纯黑。两圈描边：外圈用状态色本身（`0 0 0 1px var(--chip)`），不要混白、不要混黑；内圈深（`inset 1px`，chip 混井色）。整卡 hover：放大的是中间 logo（`.api-s4-orbit-core` 从 `scale(0.84)` 缓动到 1，现在的 64px 是 hover 尺寸），不是状态图标；同时内外反向公转。图标正向、中心在轨道上，环 `z-index: 4` 压在光晕之上，光不能遮住 icon。中间 17 logo 平面约 64px，外形是超椭圆（n=5，二次贝塞尔平滑曲线），不要普通圆角矩形。中间 logo 光还要更大（外圈约 168px / blur 34 / drop-shadow 68px），饱和蓝（`#2f7dff` / `#5eb0ff`），贴边+外扩，中心亮、边缘干净衰减；不要发白、不要紫、不要脏雾。Park 连说不够。轨道圆圈很淡（约 0.2 透明度）。
- Tracking data 光晕点亮时机（2026-08-17）：平时收敛成微光（`::before` opacity 0.16 / `::after` 0.22，logo drop-shadow 用同构弱化列表 alpha 0.7/0.28/0.22/0.14），整卡 `.api-s4-card:hover` 才亮到全强度（0.95/1 + 原 drop-shadow）。过渡 0.9s `cubic-bezier(0.22,1,0.36,1)`，只走 opacity/filter 插值（logo 的 filter 列表 hover 前后函数个数、类型必须一致才能平滑插值，别删项）。与 logo scale、双环公转的 transition 并存互不覆盖。reduce-motion 瞬切。
- Tracking data 井：深色，只比 `#0a0d14` 稍浅一档，不要改浅灰、不要改成中灰蓝 `#3c465e`。渐变中心 `#1c2434` → 边 `#111620`，再加很淡的白蓝径向。点阵用淡白点。承运商井是蓝色 + 第二屏同款 WebGL 点状地球；Visibility / Dashboard 仍浅灰点阵。
- 承运商卡：底排 5 个淡出 logo 去掉，只留上两排（3+5）。井是蓝色（`#4a86ff` → `#1b57e0` → `#143eb4`），不要浅灰点阵。背景是第二屏 Use Cases 同款 WebGL 点状地球（公共模块 `src/fx/lib/particle-earth.js`），不是 SVG 点、不是井点阵。地球要淡、往下放、井口只切出上半颗：`scale: 1.3`，`offset [0,-1.05]`（赤道贴井底，下半被 overflow 裁掉，两侧略出血），`alphaMul: 0.62`（2026-08-17 Park 要再大再淡）。自转是 hover 驱动：平时定格零重绘（引擎 `getAnimating` 返回 false 时不排 rAF，`onApi.wake` 唤醒），整卡 `.api-s4-card` mouseenter 缓动加速到 0.18 rad/s、mouseleave 缓动刹停（速度因子指数逼近，dt 钳 0.1s）；reduce-motion / 触屏（`hover: none`）不挂监听、保持静态。不要用 absolute+aspect-ratio 空槽当 WebGL host（高度容易是 0，地球就没了）。不要铺成 124% 全幅。z-index 低于 3400+ / logo；蓝底上用白/浅蓝点；横向 sticky + `overflow-x: clip` 时不要只靠 IntersectionObserver 才 start，用 getBoundingClientRect 判可见。卡滚出可视区停画。3400+ 视觉写成 `3,400+`（+ 略小、偏蓝），字重 700、tabular，carriers 大写字距。枢轴白卡约 132px 宽。logo 构图铺满井，地球不铺满。第二排 logo 在 y=300（2026-08-17 从 268 下移拉开两排），`hubWirePath` 自动跟随，但 `stroke-dasharray`/keyframes 要 ≥300 盖住最长连线，否则线中间断。白卡顶部有三层机架服务器 SVG（76×46，细描边 `#d5deec`、白底、蓝 LED + 浅蓝通风条/活动条），hover 时三颗蓝 LED 错峰闪（`api-s4-led`，delay `--i`×0.38s），reduce-motion 关。服务器在数字上方，卡 padding 收成 15/14。
- Visibility 卡（2026-08-17 重做，Park 要「和文案匹配 + 彩色」）：仍是两张重叠卡拆开的构图，但故事讲全、上色。上卡 Add Number：标题前蓝点 kicker；Carrier 字段是蓝底药丸盒（`#eff6ff` + 蓝描边），idle 放大镜 + 蓝字 Auto-detect，hover 换成 DHL 小 logo + DHL Express，且盒内有蓝色扫光（`api-s4-scan`，同 3.2s 曲线）。橙色连接线不变。下卡 Auto-identified：标题前绿点；识别行 = DHL logo + 名称 + 运单号（LV123242CN 复现上卡的号，串起叙事）+ 绿色 `80%+ match` 药丸（`rgba(67,160,71)` 系）；下面新增同步条 `api-s4-sync`：4 个官方状态色圆点（Info `#00bcd4` → Transit `#2196f3` → Out `#2962ff` → Delivered `#43a047`）+ 细线相连，caption「Auto-sync · non-stop until fulfilled」，hover 圆点按 `--i` 依次脉冲（延迟 0.5s 起步、间隔 0.14s）。idle 态就把完整故事亮出来，不能只有 hover 才见结果。reduce-motion 关扫光和脉冲、直接显示识别结果。
- Use Cases（iso-hub-webgl）性能约定（2026-08-17）：动画观感不许动，优化全部走「不画/少画」——① host 离屏（IO，rootMargin 120px）就 `stopLoop()` 停 rAF，回屏续播；② 终端 680×520 canvas 纹理只在画面变了才重绘/上传（打字字符数、光标 500ms 闪烁、progress 变化 >0.0005 三者之一）；③ `measureText` 逐字符缓存；④ host 尺寸、callout 右侧空间全部缓存（RO 失效时才重测），不许逐帧 `getBoundingClientRect`；⑤ `renderer.setSize` 只在 host 真变尺寸时调，滚动缩放只改相机 frustum。滚过该屏后 rAF JS 占用 ~98→5 ms/s（桌面）/ ~240→5（手机）。
- Use Cases 进度驱动的坑：`use-cases-scroll` 的 `apply()` 里 `setProgress` 必须每次滚动都发、放在「p 没变就 return」之前——WebGL 是懒加载的，p 稳定后才挂载完就再也收不到进度。挂载种子在 `window.__isoHubWebGL = gl` 赋值后立刻做（onReady 闭包里 gl 未赋值，是空转的，别再用）。≤768px `__reduceFx=true`，该屏直接定格 p=1 终态（正视图+标签），这是有意的。
- Use Cases 手机端（≤900px）：iso 线条糊的根源是 renderer DPR 被钳 1.5、3x 屏上 1px 线放大成 2 物理像素——手机端 DPR 放开到原生（≤3，canvas 小所以开销可控），桌面仍 1.5。callout canvas 手机同理 ≤3。井加高：`min(96vw, 375px)`、min 300 / max 390（原 88vw/340/280/360）；短井填充率上调（hostFit h<420 → far 0.58 / near 0.66）。`.api-s2-cross` 十字准星 ≤900px 隐藏（会压到文案）。
- 标题单词亮度跟滚动走（`--on`），不是进场自动播。
- 右侧渐隐遮罩跟 `--s4-p`，最后一张收掉。
- Contact Us 在四张卡都有；当前卡 / hover 箭头 `api-s4-cta-nudge`。
- 手机 ≤900px：取消 sticky，竖排叠卡，藏导航按钮。
- 手机插图井高度：Use Cases 的 `.api-s2-visual` 必须 `flex: 0 0 auto` + 实高（现 96vw/375，min 300 / max 390）。`.api-iso-host` 是 absolute，copy 若 `height:100%` 会把井压成 0。手机藏 tickbar。
- How-it-works 井不要锁 260：`min(90vw, 340)` / min 300，webhook 仍可底裁。
- Data Ops 井不要锁 240：正方形 `aspect-ratio: 1`；轨道缩到 `--r-out:118` / `--r-in:76`，避免图标被裁。
- Hero shader 已本地化：`hero-wash-shader.js` 纯 WebGL 复刻 shaders.com Undertones 1，npm `shaders` 依赖已删。技术细节见 AGENTS.md「Hero shader」节。墨迹手感只调 `CF_INTENSITY`（1.2）和 `CF_FADE_SCALE`（0.7，2026-08-17 从 0.45 改短，Park 嫌拖尾太长）。
- Hero 拖尾：紫 `#D042FF` + 蓝 `#5B4FFF` + 一点橙 `#FF3805`（只占 left 一个方向）。绿 `#66FF73` 不要。
- `.api-s4-track` 的 `overflow-x: clip` 防横向滚动，不能换成 hidden（会杀 sticky）。

## 未完成

- 2026-08-14 先停在这里。
- Tracking data：中间 logo 光晕已再加大一档（124px / blur 24 / drop-shadow 44px）。Park 再看。
- 承运商卡已改成从上往下散开。Visibility 已按彩色叙事重做（2026-08-17）；Dashboard 还没按同一轮重做。

## 日志

- 2026-08-17 17:27 — memory.md、api-page.css
- 2026-08-17 17:12 — memory.md、ApiDomVisuals.jsx、api-page.css
- 2026-08-17 17:03 — memory.md、ApiDomVisuals.jsx、particle-earth.js、structure.test.js、api-page.css
- 2026-08-17 16:42 — memory.md、ApiDomVisuals.jsx、iso-hub-webgl.js、use-cases-scroll.js、api-page.css
- 2026-08-17 14:35 — memory.md、AGENTS.md、hero-wash-shader.js
- 2026-08-17 14:32 — hero-wash-shader.js、api-page.css
- 2026-08-17 14:25 — memory.md、Hero.jsx、api-page.css
- 2026-08-17 14:06 — memory.md、Hero.jsx、api-page.css
- 2026-08-17 13:59 — memory.md、api-page.css
- 2026-08-17 13:57 — memory.md、Hero.jsx、structure.test.js、api-page.css
- 2026-08-17 13:45 — api-page.css
- 2026-08-17 11:09 — memory.md、particle-earth.js
- 2026-08-17 11:07 — memory.md、ApiDomVisuals.jsx、particle-earth.js、structure.test.js、api-page.css
- 2026-08-17 10:53 — memory.md、ApiDomVisuals.jsx、particle-earth.js、structure.test.js、api-page.css
- 2026-08-17 10:50 — memory.md、ApiDomVisuals.jsx、use-cases-bg-shader.js、structure.test.js、api-page.css 等 6 项
- 2026-08-17 10:46 — memory.md、DataOperations.jsx、ApiDomVisuals.jsx、api-page.css
- 2026-08-17 10:42 — memory.md、api-page.css
- 2026-08-17 10:40 — memory.md、api-page.css
- 2026-08-17 10:37 — memory.md、api-page.css
- 2026-08-17 10:26 — memory.md、api-page.css
