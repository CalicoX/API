# 项目记忆

Agent 开场必读；有新决策就改这一页。下面「日志」由 stop hook 自动追加。

## 现在

- 仓库：https://github.com/CalicoX/API.git（`main`）
- 本地开发：`http://localhost:5174/`（2026-08-27 起 5173 被 returns 项目 dev server 占用；Vite 只绑 IPv6，浏览器用 localhost 访问）
- 用户：Park，设计师，直接改代码迭代
- 产品：17TRACK Tracking API 落地页

## 决策

- 移动端 ≤480 批次（2026-08-31 Park 七点，全按 ≤480 做、桌面不动）：
  - ④场井内容溢出（dashgrid 369 > 井 343，底部卡+toast 被裁）：≤480 图例折两列（`gap: 5px 10px`）、donut/trend 各收 96px、dashgrid gap 6 → 实测 281px 正好收进井，toast 完整可见。
  - pricing tab 改**分段控件**：grid 四等分 + `#eef2f7` 底 + 4px 内衬，选中=白钮+蓝字+轻投影（不再是四个独立胶囊）。
  - 移动端卡片描边统一 1px：`.api-plan-card / .api-plan-custom` ≤480 `border-width: 1px`（桌面仍 2px）。
  - **模块 H2 全站统一 token**：390 宽下曾有 22.05/28.36/32.5/32.6 四种字号并存。`.api-h2`、`.credentials-head h2`、`.brands-say-head h2`（规则在 landing.css）→ `var(--fs-h2)`（22.05@390，桌面 1360 仍 40 不变）；`.api-s2-title`（桌面 48）→ `clamp(21.5px, calc(11.96px + 2.65vw), 48px)`；`.bottom-cta h2`（桌面 52）→ `clamp(21.5px, calc(10.52px + 3.05vw), 52px)`——同模板 M=21.5@360、D 各自不变。structure.test 的 `.api-h2` 断言已同步成 `var(--fs-h2)`。Hero 副标（`.api-s1-copy .api-h2` 24.8/600）是 hero 层级，不动。
  - **模块间发丝分割线 ≤480 已去**：来源是 landing.css `.section` / `.credentials` 的 `border-bottom: 1px solid var(--border-default)`（全页每个模块都有，不只 Park 圈的那条）；`.api-page .section, .api-page .credentials` ≤480 `border-bottom: 0`，桌面保留。
  - track-ui 悬出卡被裁根因：**≤680 块把 `.explore-card-tracking .track-ui` 设了 `overflow: hidden`**（基础样式明明是 visible），把悬出板外的 WISMO/Brand video 裁掉；≤480 改回 `overflow: visible`（returns-ui 同加）。实测 wismo left 27 ≥ 卡 16、video right 348 ≤ 卡 359，都不出卡。
  - CTA 按钮 ≤480 `max-width: 320px`（landing ≤480 块全局 `.btn-switch` + bottom-cta 另加 `margin-inline: auto` 抗 flex stretch 拉满整行）。

- 移动端修正范围（2026-08-29 Park「这是 <480 的，不是单纯的小于900」）：这批 5 项全按 **≤480 手机档**做，别扩到 900。
  - Use Cases 顶部「彩虹线」（Park 问是什么）：是 `.api-s2-progress` 滚动进度条（贴 sticky 舞台顶 2px、彩虹渐变随滚动填充）。手机 ≤768 滚动编排定格 p=1，它永远满宽挂着像凭空彩线 → ≤900 已 `display:none`，桌面保留。
  - Applications 卡 `.api-app-card`：≤480 `min-height: 0`（自适应内容高度）+ padding 收紧（22/18/24），别再把空隙拉满。
  - pricing（IntegrationTogether）：≤480 **tab 切换**（`.api-plan-tabs` 四个 plan 按钮 + `is-active`，`.api-plans > li:not(.is-active) { display:none }`），桌面平铺不变；JSX 加了 `useState(planIdx)`。
  - Explore 卡 `.explore-link`：≤480 `margin-top: 20px`（desktop 的 `margin-top:auto` 在单列布局里失效导致贴着正文）。
  - ④⑤ track-ui / returns-ui 插图：≤480 **PC 版整体缩放**——按**本页桌面实测尺寸 354×435** 冻结布局（别拍脑袋写 560×420，那是别的页面的尺寸；量法：1440 视口下 getBoundingClientRect），`transform: scale(0.87)` + `margin-left: calc((100% - 354px)/2)` 居中 + `margin-bottom: -57px` 抵消余高；恢复 PC 版板位（video 164/-8/132、wismo 168/-8/208、第4条事件 display:block）。这是做在 landing.css 末尾的独立 ≤480 块，覆盖 ≤680 块里的手机自定义布局；≤360 再降一档 scale 0.7 / margin-bottom -130px。别给插图做移动端重排，Park 明确要「PC 版直接缩放即可」。
  - **坑**：负 margin 居中的盒子 + `transform-origin: top left` 会把缩放的视觉钉在盒子左上角，视觉偏出卡片一侧（Park 截图：插图切左/右边空蓝）。必须 `transform-origin: 50% 0`（水平中心缩放）。另一个坑：**transform 只缩渲染不缩布局**——把盒子高度改成缩放后的高度会把内部 absolute 子元素全裁掉（Park 截图：WISMO 只剩标签），盒子必须保持 PC 原始布局尺寸，多余高度用负 margin-bottom 抵消。验证法：量 mock 的 getBoundingClientRect 相对卡片是否左右对称 + 子元素 bottom 是否在卡内。

- Data Operations 四场编排（2026-08-29 Park）：过渡要有「相同元素衔接」，不要硬切。
  - 场1入场（滑入视口才开播，well `is-started` 门控，IO 首次相交置位）：涟漪依次（`api-s4-wash-in` 按 `--r` 错峰）→ 17 logo 放大渐显（`api-s4-keel` 常驻层，squircle 裁切 + 蓝底，从场1 JSX 移到 DataOperations 井层）→ 9 状态依次（`api-s4-chip-in` 按 `--ci`，外5内4 全局序号）→ 1.75s 后才开始转（环动画挂在 is-on 上，每次重场重启）。
  - 场1→2 **无白桥**：keel logo 原地起步，面板浮现后（CSS 延迟 0.5s）**平滑落进枢纽卡顶部的 logo 槽位**（`api-s4-keel-slot` 30px 占位 + `data-s4-keel-slot`；落点由 `measureKeelSlot` 按槽位终态实测注入 keel inline style，`is-settle` 过渡 left/top/width/height/translate 0.6s）——之后 logo 就是卡的一部分，**不淡出**（2026-08-29 Park：logo 要和数字包在一起，不许消失）。枢纽白卡描边已加强（`rgba(15,23,42,0.1)`，和 codewin/dashtile 同档）。注意 keel 基态是 `translate:-50% -50%`，settle 必须归零 `translate:0 0`，否则落点偏半个身位。数字滚动已有（HubCarrierCount 0→3400）；基线线条 `wire-draw` 依次生长（base path pathLength=100）；承运商 `hublogo-in` 逐个出现；流光延迟 2s。
  - 场2→3 **DHL 桥**（唯一保留的桥；2026-08-29 Park：没有关联元素就别强行同元素过渡，3→4 / 4→1 的白核 morph 已删）：hub 的 DHL 节点飞向 `detect-hit`（data-s4-dhl-target），dur 2.1s / ttl 2150。第三场时序：**激活即清空** typed/detected（空表单入场，内容只出现一次——之前入场先显终态全量再清空重打，Park 看到「卡片出现两次」），700ms 起打字、扫 680ms → 识别 ~2.08s，与桥落点对齐。面板不位移。
  - **二三四场元素级进出场**（2026-08-29 Park「没有进出场动画」）：共享 `api-s4-el-in / el-out`（translate+opacity）。场2 退场：卡 hub-out 收拢、8 个承运商 logo 逐个弹没、线按序褪去（入场 hub-in/wire-draw/hublogo-in 已有）。场3 入场 codewin 0.15s 先起、link+trackpane 0.38s 跟进，退场整组上飘；trackpane 原来的 is-playing pane-in 重播已不触发（激活即清空后只走新入场）。场4 入场 donut 卡 0.2s → 趋势卡 0.38s（donut 扇区/trend 画线本身已有），退场整组上飘；toast 保留原 toast-in。reduce/touch 静态兜底已扩展。has-bridge--core 的 core-in/hide CSS 已随白核桥删除（[data-s4-core] 属性留着无害）。
  - 候场 transform 必须纯 `scale(0.52)`、origin 50% 50%——桥的逆变换按这个算（orbit-core 原来的 0.84 候场缩放已删）。
  - **大坑**：CSS 注释里写「`--f*/--t*`」这类含 `*/` 的文本会把注释提前终结，后面的注释文字变成垃圾选择器，整条规则被静默丢弃（桥 0×0 的根因）。

- Data Operations 结构（2026-08-28 Park，仍有效）：**不要** sticky / 滚轮横移 / `--s4-x` / 中间白卡外框。左 [01][02] 静态白文案卡 + 中间方形井 + 右 [03][04]。四卡无选中态、不点选、**无 Contact Us**。点了 `__lenis.scrollTo` `#free-trial`。循环；离屏不计时。触发看井内 `.api-s4-stage.is-on`。其余产品原文不改。≤900px：井置顶，文案竖叠。
- Data Operations 标题右侧 CTA（2026-08-29 Park「右边的 CTA 没有复用这个吗」）：**统一复用 `.btn-switch`**（Applications 同款，浅底不带 `.on-dark`），手写的 `.api-s4-pill` 及全部 CSS 已删（旧的「不要 Applications 暗底白钮」作废——btn-switch 是主蓝渐变+白钮滑动，不是暗底白钮）。`btn-switch.js` 的 FX 自动扫全页 `.btn-switch`，shader/knob 滑行/光束都生效；点击仍走 `goToTrial` 滚回 `#free-trial`。注意 08-28 里「用白圆+···→不要 api-btn-primary」的措辞已过时，CTA 一切以 btn-switch 为准。
- 井底背景（2026-08-29 Park）：`linear-gradient(180deg, #fff 0%, #f7f8fa 55%, #e9ecf1 100%)`（灰度已按反馈压淡一档）；**点阵暂撤**（well::before 已删，别再挂回）。WebGL liquid grain 已卸载（模块文件留存，useLandingEffects 不挂）。涟漪是描边圆环 `border: 1px solid rgba(158,164,174,0.2)`（不填充，Park：涟漪应该是描边、淡灰；2026-08-29 再淡到 0.2）；orbit-core 光晕与 bloom 淡蓝 `#dbeafe` 系；白卡靠自身描边+阴影站住。
- Data Ops 里插画 Mora 化（2026-08-29 Park 给 mora.com 截图）：**去框、细字、少线**。已落实：dashtile 全去框（透明浮空，无描边无底无影）；codewin/trackpane 描边减淡 rgba(15,23,42,0.06)+淡影；trend 无网格线、x 标签 #b9c2cd。**别删的**（删过头被 Park 点名要回）：① 井底紫色大曲线（`api-s4-dash-curve`，现在线 opacity 0.5 / 面积 0.55 当衬底）；② 9 状态扇区 `api-s4-donut-seg` + 图例 `api-s4-legend`（含 `.api-s4-legend li i` 色块 CSS！）；③ 趋势卡里的**折线** `api-s4-trend-line` + tooltip 已按 Park 要求删掉（后来他要删的），只留日期标签。以后删插画内容前先想想 Park 上一条说过什么。
- 场间退场方向（2026-08-29 Park 四点）：① 第一屏退场=整屏 `scale(0.62)+blur9` 收拢 + 状态胶囊 `chip-out` 逐个缩小消失（0.04s 错峰）；② keel 落卡**直线缩放到位**——忌 `left/top/width` 联 translate%（会走出弯曲路径），用 `translate: calc(-50% + var(--sdx)) calc(-50% + var(--sdy))` + `scale: var(--ss)`（JS 只给 px 偏移与缩放比，translate % 恒按 64px 基宽解析，轨迹绝对直线）；③ 第三屏退场=卡片**上下位移出画面**（codewin `-95cqh` 上出、trackpane+link `100cqh` 下出，cqh 以井为容器），stage 只轻微 scale(0.9)；④ 第四屏退场=整屏 scale(0.62) 回收 + 大曲线 `curve-rollback` 反向擦回（clip-path inset(0)→inset(0 100% 0 0)，和入场 ltr 同轴反放，回放消失），donut 扇区随 el-out。字段所有 is-exit 动画在 reduce 下有静态兜底。
- 场2退场（2026-08-29）：stage `is-exit` 覆盖成 `scale(0.62)+blur(9px)` 整体向中心缩小（不再是 1.9x 飞过镜头）；承运商 `hublogo-out` 0.4s 逐个弹没（0.06s 错峰）；线条 `wire-retract` 路径倒剪（dashoffset 0→100，0.06s 错峰）。
- 场3编排（2026-08-29 Park 复述）：激活即清空 + `panel=false` 单号卡**居中**独处 → 700ms 打字（70ms/位）→ 扫 680ms → 2.08s `setPanel(true)`：卡上移 0.55s、轨迹面板 pane-in、`status/timeinfo/events` 分块渐显（0.22/0.38/0.54s，el-in）；`.api-s4-link` panel 前隐藏、翻转后 0.3s 淡入。DHL 桥落点按**居中布局**补算：收拢位移 = (wellH − codewinH)/2 − 6px（css 的 translateY((100cqh−100%)/2−6px)），`measureBridge` 里 dhl 分支加了这段。
- 场间舞台过渡（2026-08-29）：统一「向前穿越」——候场在井深处 scale(.52)+blur，is-on 迎面飞抵 1.25s，is-exit 继续放大 1.9x 贴脸掠过 0.85s、z 在新场之上（近景遮远景）；无 iris/clip-path 擦除。

- Git 工作流（2026-08-27 Park「push+commit 太频繁」）：**默认只 commit 本地，不 push**。push 只在 Park 明确说「push / 推上去 / 部署」时执行（main 连 Vercel，push 即部署）；想推但暂不部署带 `[skip ci]`。攒批提交，不要一笔一小提交。三仓（API/Tracking/Returns）规则一致，Returns 的 AGENTS.md 由 Park 亲改。

- Git 提交邮箱（2026-08-27 Park）：本仓库用 `stillpilot <pyh1234576@gmail.com>`，不要 `sam@17track.net`。只改 **local** `user.email` / `user.name`，不改全局、不 rewrite 已推送的历史。

- ExploreMore（2026-08-26 Park：放到 credential 后面）：API 页挂上 Credentials（Our Credentials, Your Confidence），ExploreMore 紧跟其后、BottomCta 之前。顺序 IntegrationTogether → Credentials → ExploreMore → BottomCta。产品原文不改。

- Explore Tracking 插图（2026-08-26 Park：上面间距太小、节点没对齐）：`.track-ui-board` 顶垫 22 / 标题下 18。Shipping Events 竖线与菱形/圆点共用 `--rail`（列中心 10px），不要再写死 `left: 9px`（线会偏左 ~2px）。

- BrandsSay（2026-08-26 Park 纠正）：**API 落地页没有 What Top Brands Say**。那是 Tracking 模块。不要挂进 `LandingPage`。组件和暗底样式留在仓库（LegacyLanding / tracking 用），API 顺序仍是 Hero → TrustBand → UseCases。

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
- 承运商卡：8 个 logo 网状散点，不要再排成 3+5 两排。井是浅灰 `#f7f8fa`，`::before` 点阵关掉，不要蓝渐变。背景是第二屏 Use Cases 同款 WebGL 点状地球（公共模块 `src/fx/lib/particle-earth.js`），不是 SVG 点、不是井点阵。地球要能读出半球：`scale: 1.3`，`offset [0,-1.28]`（2026-08-21 再往下挪，少盖枢纽）。2026-08-21 四轮压暗：`size: 1.55`，`alphaMul: 0.08`，大陆 `[0.16,0.3,0.52]`，必须是蓝。叠点会发亮，别把 alpha 拉回去。自转跟 `.api-s4-stage.is-on`：平时定格零重绘（引擎 `getAnimating` 返回 false 时不排 rAF，`onApi.wake` 唤醒），该场出场缓动加速到 0.18 rad/s、离场刹停（速度因子指数逼近，dt 钳 0.1s）；reduce-motion / 触屏（`hover: none`）保持静态。不要用 absolute+aspect-ratio 空槽当 WebGL host（高度容易是 0，地球就没了）。不要铺成 124% 全幅。z-index 低于 3400+ / logo；横向 sticky + `overflow-x: clip` 时不要只靠 IntersectionObserver 才 start，用 getBoundingClientRect 判可见。卡滚出可视区停画。3400+ 视觉写成 `3,400+`（+ 略小、偏蓝），字重 700、tabular，carriers 大写字距。枢轴白卡约 132px 宽。logo 构图铺满井，地球不铺满。3400+ 白卡**居中**，8 个 logo **规整四向、互不连接**：上 DHL/USPS (122/278, y=42)，左 FedEx/TNT (x=44, y=128/232)，右 DPD/GLS (x=356, y=128/232)，下 UPS/RM (122/278, y=318)，一律 44px。连线只从枢纽边到 logo，**直角折线 + 14px 圆角**（垂直先走上下、水平先走左右）。idle 淡 `rgba(140,165,205,0.32)` 1.15px。**hover 光效 = Use Cases 网格游走柔光**：pathLength 100，三层 14/7/2.4 渐隐包叠在 1.15px 线上，青系、8s、无光晕无白头。白卡边框：**绕圈流动光**（conic-gradient `--hub-beam`，1.5px，7s；hover 3.8s）。底下一圈淡 1px。不要连接点半圆。`3,400+` **整卡 hover** 从 0 滚到 3400，leave 回到终值。reduce-motion 关光、数字直接 3400。机架 SVG 仍是三层无外框、1px 亮/暗。logo 常驻。hover 只播游走光 + LED + 白卡呼吸。reduce-motion 关光效。
- Visibility 卡（2026-08-21）：去掉 Auto-identified 下卡。故事：静态终态（单号满、DHL、轨迹面板都在）；**整卡 hover** 才播：先 Add Number **居中**打字+扫光，刷完后表单**上移**，轨迹面板从下面滑出。单号用 DHL Express 10 位运单 `8564312072`（前 9 位 mod 7 校验位），轨迹面板承运商/事件也是 DHL，单号不打码，和上卡一致。 ② Carrier 蓝盒扫光（现款 sweep，只播一次）再换成 DHL Express ③ 下方滑出 How-it-works 同款轨迹面板（Delivered / Time Info / Shipping Events）。leave 回到终态。reduce-motion 不播、保持终态。
- Use Cases（iso-hub-webgl）性能约定（2026-08-17）：动画观感不许动，优化全部走「不画/少画」——① host 离屏（IO，rootMargin 120px）就 `stopLoop()` 停 rAF，回屏续播；② 终端 680×520 canvas 纹理只在画面变了才重绘/上传（打字字符数、光标 500ms 闪烁、progress 变化 >0.0005 三者之一）；③ `measureText` 逐字符缓存；④ host 尺寸、callout 右侧空间全部缓存（RO 失效时才重测），不许逐帧 `getBoundingClientRect`；⑤ `renderer.setSize` 只在 host 真变尺寸时调，滚动缩放只改相机 frustum。滚过该屏后 rAF JS 占用 ~98→5 ms/s（桌面）/ ~240→5（手机）。
- Use Cases 进度驱动的坑：`use-cases-scroll` 的 `apply()` 里 `setProgress` 必须每次滚动都发、放在「p 没变就 return」之前——WebGL 是懒加载的，p 稳定后才挂载完就再也收不到进度。挂载种子在 `window.__isoHubWebGL = gl` 赋值后立刻做（onReady 闭包里 gl 未赋值，是空转的，别再用）。≤768px `__reduceFx=true`，该屏直接定格 p=1 终态（正视图+标签），这是有意的。
- Use Cases 手机端（≤900px）：iso 线条糊的根源是 renderer DPR 被钳 1.5、3x 屏上 1px 线放大成 2 物理像素——手机端 DPR 放开到原生（≤3，canvas 小所以开销可控），桌面仍 1.5。callout canvas 手机同理 ≤3。井加高：`min(96vw, 375px)`、min 300 / max 390（原 88vw/340/280/360）；短井填充率上调（hostFit h<420 → far 0.58 / near 0.66）。`.api-s2-cross` 十字准星 ≤900px 隐藏（会压到文案）。
- 标题单词亮度跟滚动走（`--on`），不是进场自动播。
- Data Ops 四张文案卡不再有 Contact Us；标题左侧 Start My Free Trial 滚回 `#free-trial`。
- 手机 ≤900px：井置顶，四张文案卡竖叠。
- 手机插图井高度：Use Cases 的 `.api-s2-visual` 必须 `flex: 0 0 auto` + 实高（现 96vw/375，min 300 / max 390）。`.api-iso-host` 是 absolute，copy 若 `height:100%` 会把井压成 0。手机藏 tickbar。
- How-it-works 井不要锁 260：`min(90vw, 340)` / min 300，webhook 仍可底裁。
- Data Ops 井不要锁 240：正方形 `aspect-ratio: 1`。
- Hero shader 已本地化：`hero-wash-shader.js` 纯 WebGL 复刻 shaders.com Undertones 1，npm `shaders` 依赖已删。技术细节见 AGENTS.md「Hero shader」节。墨迹手感只调 `CF_INTENSITY`（1.2）和 `CF_FADE_SCALE`（0.7，2026-08-17 从 0.45 改短，Park 嫌拖尾太长）。
- Hero 拖尾：紫 `#D042FF` + 蓝 `#5B4FFF` + 一点橙 `#FF3805`（只占 left 一个方向）。绿 `#66FF73` 不要。
- Applications（2026-08-24）：**100vh / 100dvh**。图标按标题，底色蓝橙绿紫青。hover 描边画出。卡下 CTA 用 Tracking 同款 `.btn-switch.on-dark`（白钮滑行 + colorful beam），文案仍是 Start My Free Trial，滚回 Hero `#free-trial`。标题 / 卡片 / CTA 再分开一点（head 下 88）。CTA 用 `margin-top: auto` 沉到下半屏，距底 128（Park：72 太贴底，往上挪一点）。产品文案不改。 FX 在 `btn-switch.js`，不依赖 `#ai-lab`。
- Applications 超大屏间距（2026-08-28 Park「超大屏没居中、三段间距不一致」）：head 底距 88 → `clamp(56px, 11vh, 120px)`；CTA `padding-top: 72` → 同款 `clamp(56px, 11vh, 120px)`。`margin-top:auto` 只吃超出部分，三段（标题→卡片 / 卡片→CTA / CTA→屏底）始终同档。
- Applications 背景（2026-08-24）：Returns ROI 同款 Point Waves 1（`roi-point-waves.js` 挂 `#applications` / canvas `.api-s5-waves`）。底 `#141414` + 青绿光晕。减动效 / ≤768 / 弱 GPU 不挂 WebGL，留静态底。Park：点波太亮 → `DOT_FADE` 0.30→0.16，高光 `15*0.02`→`15*0.012`。
- Land the Integration Together（2026-08-26 Park）：标题跟其他板块一样 — `.api-h2` 黑字 `clamp(28px, 3.2vw, 40px)`，不要粉蓝渐变。四张价卡一排，**Custom 单独横条放下面**（名左 / 图中 / Contact Us 右）。着重色不要橙：Popular / Flagship 边 / Get Started / Contact Us 一律 `--api-blue`（#2563eb）。价卡 **Unit Price / 金额同一水平线**：每张卡都留 36px Popular 槽（非 Flagship 透明），边框一律 2px，inner padding 相同。产品原文不改。Onboard 四步仍是 DOM 白碎片，不要浅灰井、不要动画。
- BottomCta（2026-08-24）：footer 上、ExploreMore 下。Returns 暗底粒子海。标题+按钮**水平居中、上下排列**。文案 Efficient Solution of Value and Possibility；按钮 Tracking `.btn-switch`，文案 Contact Us，链 17track contact-us。
- tracking-foundation（2026-08-24 Park「对齐一下」）：只对齐建议修，不动产品覆盖。`.api-h1` → `--fs-display` / 700 / 1.1；`.api-h2` → `clamp(28px, 3.2vw, 40px)` / 700 / `--track-title`；`.api-lead` 17px + `--track-body` + `--sec-title-desc`；How-it-works `--sec-y` / `--sec-head-gap` / head 760；ExploreMore 去掉外层 80 竖向 padding（只留 `--bg-subtle`）。**不动**：Hero 副标 24.8/600/`#3352b3`、lead 42ch、Use Cases 48/800、Data Ops head 72、Applications 100vh、Onboard 32、Bottom CTA 展示级、表单 `.api-btn-primary`、品牌蓝。Land 标题已按 2026-08-26 改成 api-h2 黑字。
- Explore 卡（2026-08-24 Park「去掉 3d hover」）：不要板子 rotateX/Y、不要内层 reverse parallax。仍保留跟手 spotlight、底光、箭头、图标描线。`landing-inline.js` 只写 `--spot-*`。
- ExploreMore（2026-08-25 Park「把 tracking 那个拿过来」）：Tracking 放左边。插图用 Returns 页同款 `track-ui`（进度条 + Shipping Events + WISMO + Brand video），不要旧的简易 timeline。Returns 卡仍在右边。不要 3D。产品文案不改。
- Data Operations（2026-08-24 Park「改回去」）：Cursor 主页那轮（去白框、1080 宽、copy 落页上）**作废**。2026-08-28 已改成三栏 + 一口井，不要回到 800×500 横滑四卡。
- Land 价格卡（2026-08-24 Park：改的是价格，官网 Pricing / API）：白卡黑字价、Get Started、六条功能；Flagship 橙条 Popular + 实心橙钮。标题仍是 Land the Integration Together。Custom 还在。不要加 Order Tracking / Returns 分段开关。
- 毛玻璃（2026-08-26）：Vite 8 默认 lightningcss 压 CSS 时，同一条规则里同时写 `backdrop-filter` + `-webkit-backdrop-filter` 会丢掉标准属性。Chrome 只认标准属性，Vercel 生产上顶栏 / 代码窗 / 玻璃卡全变实底。`vite.config.js` 的 `preserveBackdropFilter` 在产物里补回标准属性，并给 landing.css 加 `--bf-keep` 换哈希（旧文件 immutable 缓存）。源 CSS 两边都留着。不要删 `-webkit-`，也不要用 `cssMinify: 'esbuild'`（Vite 8 没带 esbuild；Rolldown 也不许在 generateBundle 里改 bundle 键）。
- TrustBand（2026-08-26 Park 用 Tracking 模块替换，随后加大圈出的标）：**12 家静态两排各 6**，跟 Tracking 同一套 logo。不要 Shopify / SHEIN / Temu。不要跑马灯。产品原文不改。默认 18px；AliExpress/Baleaf 22；Cainiao/eufy 26；SHARGE/totwoo/Vaporesso/GOELIA 24。行距 36、列距 **72**。灰度 0.62；eufy 单独 opacity 0.88（蓝标灰化会偏浅）。禁止 brightness(0)。
- 流体字号（2026-08-27 Park「移动端字有点大」）：**全站页面文字随视宽连续缩小、触底 12px，API / tracking-react / returns 三站同参**。公式 `clamp(M, calc(A + B·vw), D)`：锚点 1360→桌面现值 D 不变、360→M=`max(12, min(原最深媒体覆盖@360, 0.82×D))`；根 token `--fs-display/-h2/-h3/-lead/-body` 全部曲线化（var 引用处自动生效），≤1024/768/480 里的字号硬切覆盖已删（15/14px 钉死不再有）。`structure.test.js` 的 `.api-h2/.api-lead` 断言同步了新曲线。**不动**：插图/mock 内部小字（井内 UI 碎片 8–11px、`.mock-/.ogl-/.hero-ogl/` 等）、相对单位 em、本来就 <12px 的真实小注（表单 `.opt/.api-form-agree`、eyebrow 11px）。以后新增文字直接用 `var(--fs-*)` 或同款 clamp 模板，**别再往媒体查询里写 font-size 覆盖**（会回到跳变）。坑：批量改字号时按「整串选择器前缀」匹配会漏（`.api-page .bottom-cta h2` 这类长前缀），按「末段标签」匹配又会误伤 mock 的 h2/h3——两层都要查。

## 未完成

- 2026-08-14 先停在这里。
- Tracking data：质感已按参考图加软涟漪和玻璃圆。Park 再看。
- 承运商卡已改成从上往下散开。Visibility / Dashboard 都已按真实产品页微调。

## 日志

- 2026-08-29 14:1x — memory.md、useLandingEffects.js、api-page.css、structure.test.js（井底纯白+点阵）
- 2026-08-29 01:2x — memory.md、DataOperations.jsx、ApiDomVisuals.jsx、api-page.css（四场 match-cut 编排）
- 2026-08-28 17:50 — AGENTS.md、DataOperations.jsx、structure.test.js、api-page.css
- 2026-08-25 10:53 — memory.md、ExploreMore.jsx、landing.css
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
