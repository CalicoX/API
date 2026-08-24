# 项目记忆

Agent 开场必读；有新决策就改这一页。下面「日志」由 stop hook 自动追加。

## 现在

- 仓库：https://github.com/CalicoX/API.git（`main`）
- 本地开发：`http://127.0.0.1:5173/`
- 用户：Park，设计师，直接改代码迭代
- 产品：17TRACK Tracking API 落地页

## 决策

- 产品原文不改。
- 底部产品切换 dock：2026-08-24 Park **暂时隐藏**（Applications 100vh 屏被 dock 挡住）。组件和 `mountProductDock` 仍在，LandingPage 不渲染 `<ProductDock />`。不是误删，要回来再挂回去。
- Hero H1 字内光：hover 时光斑只在字形内部（`background-clip: text`，底层墨色 + 跟鼠标的径向光斑，中心浅蓝 `#c4deff`、中段蓝紫 `rgba(91,111,255)`，半径 170px）。坐标 `--h1-x/--h1-y` 由 h1 的 onMouseMove 写入；光强 `--h1-glow` 用 `@property` 注册成 number，`:hover` 置 1、0.45s 过渡淡入淡出。不要做成扫光动画，是跟手的。
- Hero 左栏文案（2026-08-17 定稿）：H2 副标降级不抢 H1——`clamp(1.2rem, 1.8vw, 1.55rem)`、字重 600、色 `#3352b3`（不用 `#1e40af` 粗黑蓝）。lead 去掉 `.api-lead-line` 强制两行 nowrap，自然换行 + `max-width: 42ch`。`3400+` 药丸改浅底：`#dbeafe` 底 + `#1d4ed8` 字，不再实心蓝底白字。checklist 圆点改轻量：`#eff6ff` 底 + `#bfdbfe` 描边 + 蓝勾（不再实心蓝底白勾），行距 gap 10px。copy 区加 `::before` 白色径向 veil（z:-1，压在 shader 上保证可读性）。左栏第五条「View docs」次级 CTA 暂不加。
- Hero 注册表单：右栏宽 `minmax(420px, 520px)`（原 380/460，Park 要更宽）。不用红星标必填，非必填（Company Website / 留言）label 右侧灰字 `Optional`。留言框默认收成 44px、focus 缓动展开到 96px、`resize: none` 不能拖。输入框白底 `#e2e8f0` 描边 + 浅投影，hover 描边加深。Password 有 show/hide 眼睛。`No credit card required` 徽章在 CTA 按钮正下方居中，不在标题行。法务 checkbox 11px 淡灰。字段间距 15/14px。
- 内容区 1440px，注意 wrap 的 24px padding；不要负 margin 撑出外壳。
- How-it-works 三张卡：白卡 20px 圆角、8px 内边距；插图井浅灰点阵、overflow hidden。
- Data Operations 四张卡插图要各不相同，不能都顶满井。
- Dashboard 卡（2026-08-21）：两卡上下叠、收窄 `min(72%, 336px)`，整体靠下。Webhook toast 锚在下卡右侧。① 状态 donut：fill path 扇区。② 90 天线：idle 只露贴零平段；hover **dashoffset 100→0 从左往右**。③ 井底紫面积：clip-path 从左擦出。两条增长线 **4.5s**、`cubic-bezier(0.4, 0, 0.2, 1)`，画出占 0–50%（约 2.2s）。3.2s 太快、6.4s 太慢。reduce-motion 终态。
- Tracking data 卡（2026-08-18）：浅灰井 `#eef1f5`，**overflow hidden**，胶囊不许探出井边。9 态全部白胶囊。外环文字朝中心、内环文字朝外，圆点钉在轨道上（`is-flip`）。`--r-out: 42cqmin` / `--r-in: 26cqmin`。涟漪铺满井，淡阴影，不要描边。状态圆官方纯色、不要渐变。
- 承运商井浅灰 `#f7f8fa`、**不要点阵**（2026-08-20 Park：矩阵把地球糊没了）。Visibility / Dashboard 仍浅灰点阵。
- 承运商卡：8 个 logo 网状散点，不要再排成 3+5 两排。井是浅灰 `#f7f8fa`，`::before` 点阵关掉，不要蓝渐变。背景是第二屏 Use Cases 同款 WebGL 点状地球（公共模块 `src/fx/lib/particle-earth.js`），不是 SVG 点、不是井点阵。地球要能读出半球：`scale: 1.3`，`offset [0,-1.28]`（2026-08-21 再往下挪，少盖枢纽）。2026-08-21 四轮压暗：`size: 1.55`，`alphaMul: 0.08`，大陆 `[0.16,0.3,0.52]`，必须是蓝。叠点会发亮，别把 alpha 拉回去。自转是 hover 驱动：平时定格零重绘（引擎 `getAnimating` 返回 false 时不排 rAF，`onApi.wake` 唤醒），整卡 `.api-s4-card` mouseenter 缓动加速到 0.18 rad/s、mouseleave 缓动刹停（速度因子指数逼近，dt 钳 0.1s）；reduce-motion / 触屏（`hover: none`）不挂监听、保持静态。不要用 absolute+aspect-ratio 空槽当 WebGL host（高度容易是 0，地球就没了）。不要铺成 124% 全幅。z-index 低于 3400+ / logo；横向 sticky + `overflow-x: clip` 时不要只靠 IntersectionObserver 才 start，用 getBoundingClientRect 判可见。卡滚出可视区停画。3400+ 视觉写成 `3,400+`（+ 略小、偏蓝），字重 700、tabular，carriers 大写字距。枢轴白卡约 132px 宽。logo 构图铺满井，地球不铺满。3400+ 白卡**居中**，8 个 logo **规整四向、互不连接**：上 DHL/USPS (122/278, y=42)，左 FedEx/TNT (x=44, y=128/232)，右 DPD/GLS (x=356, y=128/232)，下 UPS/RM (122/278, y=318)，一律 44px。连线只从枢纽边到 logo，**直角折线 + 14px 圆角**（垂直先走上下、水平先走左右）。idle 淡 `rgba(140,165,205,0.32)` 1.15px。**hover 光效 = Use Cases 网格游走柔光**：pathLength 100，三层 14/7/2.4 渐隐包叠在 1.15px 线上，青系、8s、无光晕无白头。白卡边框：**绕圈流动光**（conic-gradient `--hub-beam`，1.5px，7s；hover 3.8s）。底下一圈淡 1px。不要连接点半圆。`3,400+` **整卡 hover** 从 0 滚到 3400，leave 回到终值。reduce-motion 关光、数字直接 3400。机架 SVG 仍是三层无外框、1px 亮/暗。logo 常驻。hover 只播游走光 + LED + 白卡呼吸。reduce-motion 关光效。
- Visibility 卡（2026-08-21）：去掉 Auto-identified 下卡。故事：静态终态（单号满、DHL、轨迹面板都在）；**整卡 hover** 才播：先 Add Number **居中**打字+扫光，刷完后表单**上移**，轨迹面板从下面滑出。单号用 DHL Express 10 位运单 `8564312072`（前 9 位 mod 7 校验位），轨迹面板承运商/事件也是 DHL，单号不打码，和上卡一致。 ② Carrier 蓝盒扫光（现款 sweep，只播一次）再换成 DHL Express ③ 下方滑出 How-it-works 同款轨迹面板（Delivered / Time Info / Shipping Events）。leave 回到终态。reduce-motion 不播、保持终态。
- Use Cases（iso-hub-webgl）性能约定（2026-08-17）：动画观感不许动，优化全部走「不画/少画」——① host 离屏（IO，rootMargin 120px）就 `stopLoop()` 停 rAF，回屏续播；② 终端 680×520 canvas 纹理只在画面变了才重绘/上传（打字字符数、光标 500ms 闪烁、progress 变化 >0.0005 三者之一）；③ `measureText` 逐字符缓存；④ host 尺寸、callout 右侧空间全部缓存（RO 失效时才重测），不许逐帧 `getBoundingClientRect`；⑤ `renderer.setSize` 只在 host 真变尺寸时调，滚动缩放只改相机 frustum。滚过该屏后 rAF JS 占用 ~98→5 ms/s（桌面）/ ~240→5（手机）。
- Use Cases 进度驱动的坑：`use-cases-scroll` 的 `apply()` 里 `setProgress` 必须每次滚动都发、放在「p 没变就 return」之前——WebGL 是懒加载的，p 稳定后才挂载完就再也收不到进度。挂载种子在 `window.__isoHubWebGL = gl` 赋值后立刻做（onReady 闭包里 gl 未赋值，是空转的，别再用）。≤768px `__reduceFx=true`，该屏直接定格 p=1 终态（正视图+标签），这是有意的。
- Use Cases 手机端（≤900px）：iso 线条糊的根源是 renderer DPR 被钳 1.5、3x 屏上 1px 线放大成 2 物理像素——手机端 DPR 放开到原生（≤3，canvas 小所以开销可控），桌面仍 1.5。callout canvas 手机同理 ≤3。井加高：`min(96vw, 375px)`、min 300 / max 390（原 88vw/340/280/360）；短井填充率上调（hostFit h<420 → far 0.58 / near 0.66）。`.api-s2-cross` 十字准星 ≤900px 隐藏（会压到文案）。
- 标题单词亮度跟滚动走（`--on`），不是进场自动播。
- 右侧渐隐遮罩跟 `--s4-p`，最后一张收掉。
- Contact Us 在四张卡都有；当前卡 / hover 箭头 `api-s4-cta-nudge`。
- 手机 ≤900px：取消 sticky，竖排叠卡，藏导航按钮。
- 手机插图井高度：Use Cases 的 `.api-s2-visual` 必须 `flex: 0 0 auto` + 实高（现 96vw/375，min 300 / max 390）。`.api-iso-host` 是 absolute，copy 若 `height:100%` 会把井压成 0。手机藏 tickbar。
- How-it-works 井不要锁 260：`min(90vw, 340)` / min 300，webhook 仍可底裁。
- Data Ops 井不要锁 240：正方形 `aspect-ratio: 1`。
- Hero shader 已本地化：`hero-wash-shader.js` 纯 WebGL 复刻 shaders.com Undertones 1，npm `shaders` 依赖已删。技术细节见 AGENTS.md「Hero shader」节。墨迹手感只调 `CF_INTENSITY`（1.2）和 `CF_FADE_SCALE`（0.7，2026-08-17 从 0.45 改短，Park 嫌拖尾太长）。
- Hero 拖尾：紫 `#D042FF` + 蓝 `#5B4FFF` + 一点橙 `#FF3805`（只占 left 一个方向）。绿 `#66FF73` 不要。
- `.api-s4-track` 的 `overflow-x: clip` 防横向滚动，不能换成 hidden（会杀 sticky）。
- Applications（2026-08-24）：**100vh / 100dvh**。图标按标题，底色蓝橙绿紫青。hover 描边画出。卡下 CTA 用 Tracking 同款 `.btn-switch.on-dark`（白钮滑行 + colorful beam），文案仍是 Start My Free Trial，滚回 Hero `#free-trial`。标题 / 卡片 / CTA 再分开一点（head 下 88）。CTA 用 `margin-top: auto` 沉到下半屏，距底 128（Park：72 太贴底，往上挪一点）。产品文案不改。 FX 在 `btn-switch.js`，不依赖 `#ai-lab`。
- Applications 背景（2026-08-24）：Returns ROI 同款 Point Waves 1（`roi-point-waves.js` 挂 `#applications` / canvas `.api-s5-waves`）。底 `#141414` + 青绿光晕。减动效 / ≤768 / 弱 GPU 不挂 WebGL，留静态底。Park：点波太亮 → `DOT_FADE` 0.30→0.16，高光 `15*0.02`→`15*0.012`。
- Land the Integration Together（2026-08-24）：官网原模块，Applications 后、ExploreMore 前。标题粉蓝渐变；五张价卡。Onboard 四步：按官网构图用 DOM 白碎片，**不要浅灰井外框、不要动画**。颜色收成灰蓝+一点橙。头像和 XLS 图标用 Imagine 生成的图（`src/assets/onboard/`）。产品原文不改。
- BottomCta（2026-08-24）：footer 上、ExploreMore 下。Returns 暗底粒子海。标题+按钮**水平居中、上下排列**。文案 Efficient Solution of Value and Possibility；按钮 Tracking `.btn-switch`，文案 Contact Us，链 17track contact-us。
- tracking-foundation（2026-08-24 Park「对齐一下」）：只对齐建议修，不动产品覆盖。`.api-h1` → `--fs-display` / 700 / 1.1；`.api-h2` → `clamp(28px, 3.2vw, 40px)` / 700 / `--track-title`；`.api-lead` 17px + `--track-body` + `--sec-title-desc`；How-it-works `--sec-y` / `--sec-head-gap` / head 760；ExploreMore 去掉外层 80 竖向 padding（只留 `--bg-subtle`）。**不动**：Hero 副标 24.8/600/`#3352b3`、lead 42ch、Use Cases 48/800、Data Ops head 72、Applications 100vh、Land 渐变 56、Onboard 32、Bottom CTA 展示级、表单 `.api-btn-primary`、品牌蓝。
- Explore 卡（2026-08-24 Park「去掉 3d hover」）：不要板子 rotateX/Y、不要内层 reverse parallax。仍保留跟手 spotlight、底光、箭头、图标描线。`landing-inline.js` 只写 `--spot-*`。
- Data Operations（2026-08-24 Park「改回去」）：Cursor 主页那轮（去白框、1080 宽、copy 落页上）**作废**。回到白卡 800×500、8px 井、copy 在卡内。别再拆框。
- Land 价格卡（2026-08-24 Park：改的是价格，官网 Pricing / API）：白卡黑字价、Get Started、六条功能；Flagship 橙条 Popular + 实心橙钮。标题仍是 Land the Integration Together。Custom 还在。不要加 Order Tracking / Returns 分段开关。

## 未完成

- 2026-08-14 先停在这里。
- Tracking data：质感已按参考图加软涟漪和玻璃圆。Park 再看。
- 承运商卡已改成从上往下散开。Visibility / Dashboard 都已按真实产品页微调。

## 日志

- 2026-08-18 20:08 — memory.md、ApiDomVisuals.jsx、api-page.css
- 2026-08-18 19:58 — memory.md、ApiDomVisuals.jsx、api-page.css
- 2026-08-18 19:48 — memory.md、AGENTS.md、ApiDomVisuals.jsx、api-page.css
- 2026-08-18 19:36 — memory.md、ApiDomVisuals.jsx、api-page.css
- 2026-08-18 19:28 — memory.md、ApiDomVisuals.jsx、api-page.css
- 2026-08-18 19:18 — memory.md、AGENTS.md、ApiDomVisuals.jsx、api-page.css
- 2026-08-18 19:05 — memory.md、AGENTS.md、ApiDomVisuals.jsx、api-page.css
- 2026-08-18 18:52 — memory.md、AGENTS.md、ApiDomVisuals.jsx、api-page.css
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
