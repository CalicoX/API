# 项目记忆

Agent 开场必读；有新决策就改这一页。下面「日志」由 stop hook 自动追加。

## 现在

- 仓库：https://github.com/CalicoX/API.git（`main`）
- 本地开发：`http://localhost:5174/`（2026-08-27 起 5173 被 returns 项目 dev server 占用；Vite 只绑 IPv6，浏览器用 localhost 访问）
- 用户：Park，设计师，直接改代码迭代
- 产品：17TRACK Tracking API 落地页

## 决策

- **AI 整段 Duo 展开（2026-09-11 Park）**：边滚边立——段刚露头就开始回正，铺满视口时立直，不再钉住后再滚一段。透视仍从上往下 `rotateX`。渐进糊是 section 上四条横带 `backdrop-filter`（不进 3D 壳，壳上也不挂 filter）。≤640 / reduce 定格。

- **TrustBand 加高一点（2026-09-11 Park）**：`.trust` 上下 padding 从 `--sec-y-tight`（最高 96）改 `clamp(72px, 8vw, 128px)`。只加这段，不动物标尺寸。1024 档 36/40 仍紧，Park 再圈再改。

- **Enterprise 手机取消标题固高（2026-09-10 Park）**：桌面 h3 `min-height: 2em` 是为了四列描述对齐。≤640 单列不需要，标题和卡都随内容；卡 `align-items: start` + `height: auto`。1024 两列仍留 2 行固高。

- **CoverageBand 手机标签换行（2026-09-10 Park）**：`.coverage-data span` 基础是 `nowrap`（桌面一行）。≤640 两列时 Standardized / Carrier Recognition 两句溢出，改 `white-space: normal` + `text-wrap: balance`。文案不改。

- **HowItWorks 1024 改 2×2（2026-09-10 Park）**：四步卡在 1024 从 1×4 改 2×2（卡约 484、井 340，和 768 对齐）。>1024 仍四列；≤640 仍单列。2×2 必须写 `641-1024` 范围块——纯 ≤1024 会泄漏进 390 顶掉单列。768 块不再独自写 `repeat(2)`，列数交给这段。

- **AI EDD Origin/Destination 往下（2026-09-10 Park）**：EDD 卡改 flex 列，城市行 `margin-top: auto` 贴卡底，和中间卡 USPS 对齐。不要只加一点缝。

- **Hero 4,000+ 胶囊文字返白（2026-09-10 Park）**：`.api-lead-tag` 从浅蓝底深蓝字改成 `--api-blue` 底白字。

- **Applications 卡 hover 不要蓝描边（2026-09-10 Park）**：`.api-app-card:hover` 去掉 `rgba(37,99,235,0.22)` 蓝圈，描边保持静息灰 `rgba(15,23,42,0.08)`，抬起阴影留下。

- **AI EDD 进度条要流动（2026-09-10 Park）**：68% 蓝→粉填充上加高光扫过（`::after` 1.8s ease-in-out 循环）。只在填充里裁，不要扫进右边灰轨。reduce-motion 关掉。

- **AI 识别卡用 thinking-orbs 点阵球（2026-09-10 Park）**：中间卡原来是双圈 + AI 字。改挂 `thinking-orb` searching globe（96、dark 亮点、dotScale 1.45）。`#ai-intelligence` 入屏就挂，≤640 也挂（2D）；reduce-motion 只画一帧。圆环样式删掉。

- **AI Live route 点阵地图（2026-09-10 Park 两轮）**：实心改六角点阵。第一轮只裁太平洋，美西/亚洲被切、Park「地图不完整」。改成完整世界（经度 -28→332，略过南极），CN/US 仍在深圳/洛杉矶，航线走太平洋。`aiMapLand.js` 的 `dots`。

- **Enterprise icon 和前层玻璃绑在一起（2026-09-10 Park）**：hover 展开时线标必须跟前层一起走，不能停在原位。SVG 嵌进 `.api-ent-ico-glass`，位移只打在这一层；后蓝方仍单独往右上。

- **Enterprise 四卡描述对齐（2026-09-10 Park「描述文字没对齐」）**：标题换行数不同（1/2/3）导致正文起点不齐。桌面四列用 `subgrid` + `grid-row: span 3`，标题行跟最高那张齐；h3 另留 `min-height: calc(1.3em * 2)`。≤1024 两列改回 flex + `gap: 20px`（subgrid 的 parent row-gap 会把卡内三行也撑开）。不要 `p { margin-top: auto }`（那是底对齐）。

- **Applications 浅底把点波加回来（2026-09-10 Park「波浪点阵背景怎么没了」）**：卸挂是因为暗 canvas 盖住浅底。现重新挂 `roi-point-waves`，底 `#f7f8fa`、灰点 `#64748b`、`DOT_FADE` 0.32。≤640 仍不挂。

- **Applications 卡不要 268 固高，跟最高卡齐；icon 白线 + 实色底（2026-09-10 Park）**：`.api-app-card` 去掉 `min-height: 268px`（改 `0`），靠 grid stretch 跟同行最高卡齐，不再写死高度。`.api-app-ico` 白线（`color: #fff`）+ 实色底：logistics `#2563eb` / ecommerce `#ea580c` / finance `#059669` / platforms `#0891b2` / integrator `#7c3aed`。hover 只略压暗底，icon 保持白。640/1024 已有 `min-height: 0` 不动，别再引入 268。

- **AI 段重做（2026-09-10 Park）**：背景搬 tracking 5175 Synthesis 1（蓝 `#0582e8` / 粉 `#f00e94` / 底 `#08071a`）。文案不动。下面三块玻璃卡：预测（AI EDD 窗口）、AI 识别、地图航线。≤640 不挂 WebGL。

- **Data Operations 标题三行（2026-09-10 Park）**：`Turn Complex Tracking Data` / `into Usable Intelligence` / `Forecast, Monitor, Intervene.` 介词小写。

- **Explore 标题居中（2026-09-10 Park）**：`.api-explore .section-head` 加 `center`。

- **底 CTA 去掉 AWS（2026-09-10 Park）**：`Air Cargo (AWS) Tracking API` → `Air Cargo Tracking API`。

- **Explore 段纯白底（2026-09-10 Park）**：`.api-explore` 从 `#f7f8fa` 改 `#fff`。

- **HowItWorks 挪到 AI 后（2026-09-10 Park）**：From Tracking Data 整段从 Enterprise 后移到 AiIntelligence 与 Applications 之间。

- **Applications 改浅底（2026-09-10 Park 两轮）**：`#f7f8fa` + 白卡。点波 canvas 仍铺暗底会盖住 CSS，已卸挂并 `display:none`。topbar / dock 不当暗段。

- **HowItWorks Step 4 轨迹板加宽（2026-09-10 Park）**：Listen 井内插图从 86% 铺满（和其他三步一样）；`.api-vig--listen .api-vig-track` 56%→78%，井侧垫改 8px。只动 Listen，s4 trackpane 仍 100%。

- **Enterprise 卡 icon（2026-09-10 Park 参考 Home/列表 3D 方）**：两个圆角方叠——后层实心 `#3b82f6` 右上探出，前层透明毛玻璃（`rgba(255,255,255,0.14)` + `backdrop-filter: blur(10px)`，13 圆角 / 42），无描边。白描边符号居中。hover：上下层展开再收回 + 线标 pathLength 描边。不要实心渐变、不要紫。

- **Enterprise badge 四色（2026-09-10 Park「要彩色的」）**：Visible 蓝 / Reliable 绿 / Trust 紫 / Secure 橙，浅底+同色点，跟 Applications 四色一系。

- **Use Cases 挪到定价前（2026-09-10 Park）**：One Solution / Various Use Cases 整段从 Enterprise 后移到 Applications 与 IntegrationTogether 之间。

- **Enterprise 四词改 badge、卡跟 s4（2026-09-10 Park）**：Visible / Reliable / Trust / Secure 改成四枚白底描边圆点胶囊（落地页 `.badge` 同款）。四张能力卡跟 Data Operations 文案卡同一套：18 圆角、`1px rgba(15,23,42,0.08)` 描边、灰 icon hover 变蓝、h3 800。不复用 `.api-s4-copy-card` 类，避免吃到 s4 窄档缩字。

- **CoverageBand 上移替 BrandsSay（2026-09-10 Park）**：底部「Top Global Carriers Coverage」去掉；整段挪到 TrustBand 后，替换 BrandsSay。组件文件留着，LandingPage 不再挂 BrandsSay。ExploreMore 直接接 BottomCta。

- **补文案稿两个新段（2026-09-10 Park「还少了两个模块」）**：稿里第一轮没做的 Enterprise + AI。数据带已是 CoverageBand，不再另做中段指标。页序插在现有模块之间，不删 BrandsSay / UseCases / Credentials。Enterprise 在 logo 墙后：浅灰底、居中 eyebrow + 四词支柱 + 四张白卡（稿图 image 2）。AI 在 Data Operations 后：暗底大标题 + `AI EDD` / `AI Carrier Identification` 两标签（稿图 image 8），**整屏 100vh** 避免和 Applications 暗底粘成一段。文案按稿原文，不改。≤1024 企业卡 2×2，≤640 单列。

- **Explore Returns 卡跟 tracking（2026-09-10 Park「这块把 tracking 的拿过，响应式也一起」）**：17RETURNS 插图整段搬 tracking-react（5175）：场景图 `returns-scene.jpg`、毛玻璃双卡、窗口三点、只留 Sneakers、循环箭头 icon、标题拆成 headline。手机档不整体 scale，跟 tracking 改卡位（≤768 井 340 / ≤640 井 360 + photo `8% 86%`）。Tracking 卡不动。

- **pricing 对照官网 zh-cn/api Section6（2026-09-10 Park「对比原图」+ 两处纠正）**：卡 272 / pad 20 / 半径 15 / 描边 `#e0e0e0` / 列缝 24 / 标题和价块缝 32。名称 24/600；Unit 16；价 **36/700 `#FF6F00`**（官网 50，Park「单价字体太大了」）；配额 16/500。Flagship 渐变 + 🔥。Custom 官网码 128，**整卡居中**（名/码/说明）。英文价数字不动。≤768 两列、Custom 跨行。

- **Onboard in 4 Steps 整块去掉（2026-09-10 Park）**：IntegrationTogether 只留 pricing + Custom。插图组件 `IllusOnboard*` 一并删。价卡原文不动。

- **HowItWorks Step 2 井底被截空（2026-09-10 Park）**：`translateY` 抬的是整张白卡，Save 出场后井底露灰。白卡钉死 `min-height` 挂出井底，只平移内部 `.api-vig-sheet-shift`。signup 同样。

- **HowItWorks Step 1/2 循环光标偏移（2026-09-10 Park）**：第二圈 `setSheetY(0)` 后立刻 `aim()`，表单 CSS transition 还停在 -88/-108，量到的是上移后的坐标，光标钉在标题上方。第二圈先藏光标、等 480ms 落稳再瞄准。webhook 同样。

- **HowItWorks Step 1/2 井内白卡（2026-09-10 Park）**：signup/webhook 内卡同宽（左右 10%）；input 34→26；Package Status **一行一个**。webhook 勾选后表单上移改 `-108`，光标仍 `getBoundingClientRect` 瞄准，Save 落在井里。

- **HowItWorks Step 1/2 卡级 hover 光标戏（2026-09-10 Park「step1 和 step2 的动画没了」）**：signup 新建时没做动画；webhook 还绑在井内 vig 上、勾选/Save 又被 2×2 井裁掉。现 `useVigCardHover` 挂整张 `.api-s3-card`。Step 1：光标填公司 → 邮箱 → 货量 → 点 Start My Free Trial → toast Trial started，表单随目标上移。Step 2：仍点 Info Received → In Transit → Save → Webhook saved，Save 前上移一截。井内 vig 撑满、勾选/按钮要落在可见区。

- **HowItWorks Step 1 插图改成 Hero 留资表（2026-09-10 Park）**：`IllusSignupPanel` 不再是 Email/Password/Register，改成 Sign up for free trial 同款字段（公司/网站/电话/邮箱/货量/密码/help/条款/Start My Free Trial）。

- **HowItWorks Step 3 插图改回上下（2026-09-10 Park「保留上下」）**：1×4 卡太窄，左右会裁 curl。`IllusRegisterPanel` 回到重叠叠放：curl 上、Add Number 下，hover 拆开 + 竖向橙线。

- **HowItWorks Step 3 加宽的是井内插图（2026-09-10 Park 纠正）**：外卡四列均分，不是第三列 1.4fr。`.api-vig--register` 撑满井，`.api-vig-flow` 78%→80%（和 Step 1/2 内卡左右 10% 同宽）。

- **HowItWorks 四步改回 1×4（2026-09-10 Park「还是改成1x4吧」）**：`.api-s3-cards` 桌面 `repeat(4)` 均分；768 仍 2×2；≤640 单列。井高收回 `clamp(260px, 28vw, 360px)`。四步文案仍是 Register → Webhook → Register numbers → Updates。

- **Hero 左右列缝（2026-09-10 Park）**：文案和表单之间 `gap` 列向 32→**40**（「稍微加大一点点」）。768 双栏 28 不动。

- **Hero lead 收窄（2026-09-10 Park 圈了 4,000+ 那段「收窄一点」）**：只卡 `.api-s1-copy .api-lead` 为 **36em**，标题和 checklist 仍跟左栏走。不要再把整栏收回去。

- **Hero 左栏加宽（2026-09-10 Park「这个太空了，左边的文字宽度可以加一些」）**：`.api-s1-copy .api-lead` 去掉 42ch，段宽跟左栏走；栅格 `1.2fr / 520 / gap 48` → **`1.35fr / 500 / gap 32`**（后改为 40）。表单只收 20px，空的是段宽被卡死。≤768 双栏规则不动。

- **CoverageBand 接到 CTA 上方（2026-09-10 Park）**：tracking-react 同款「Top Global Carriers Coverage」点阵地球 + 5 项指标，插在 ExploreMore 与 BottomCta 之间。JSX / `coverage-globe.js` / `public/world.json` / CSS 3+2 栅格照搬 tracking；文案与 tracking 截图一致（4,000+ / 9+30 / 99.9% / 95%+ / 99.9% SLA）。地球手机也跑，只跳 reduced-motion。BottomCta 仍是 Ready to Build Smarter Tracking，不含这组数。

- **文案稿第一轮（2026-09-10 Park：只改文案，不增删模块）**：对照 Downloads《（新）产品详情页文案设计 API》。页序不动（Hero→TrustBand→BrandsSay→UseCases→HowItWorks→DataOperations→Applications→IntegrationTogether→Credentials→ExploreMore→BottomCta）。**没做**：Enterprise / 数据指标带 / AI 新段；没删 BrandsSay、UseCases、Credentials、pricing。HowItWorks 仍 3 卡（稿是 4 步，第 1 步 Register 没加），三卡文案对上稿的 Step 2–4。数字 3400→4,000、9+27→9+30。CTA 现有钮改 `Start Free`，没加 View API docs 第二钮。Hero 表单全必填 + Monthly Shipment Volume 下拉（稿要求）；三条 checklist 稿没写，保留。

- **footer 布局分档（2026-08-31 Park 两轮，commit 56f198f + 326b862）**：>640 = 桌面式左右（brand 左 max 480 + nav 右侧 2×2 两列，768 实测 row/并排）；≤640 才上下堆叠（堆叠规则嵌套在 10535 块的 ≤640 里）。nav 的 2×2 两列规则留在 ≤1024（桌面 4 列并排在 976px 放不下）。

- **1024 三处布局（2026-08-31 Park，commit 2373f53 + 6e83fa9）**：①s4 侧列分布定案：`flex-start` + 16px 缝 + 卡 `flex: 1 1 auto`（内容为下限、富余高度拉伸撑满列，列底与井底对齐）——space-between 会拉大缝、纯自然高会底空，这个组合两个问题都没有（Park「间距不一致」→「高度要撑开」两轮迭代）；②Applications 5 卡 3+2 第二排右侧空格难看 → ≤1024 改 6 列栅格（前 3 卡 `span 2`、后 2 卡 `span 3` 撑满整行）；③Explore 两卡在 1024 两列时文案列被压到每行两三个词 → `.explore-grid` ≤1024 单列一行一个，卡内保持桌面左文右图。**apps 的 6 列栅格只在 ≤1024 块**，桌面 5 列、768 两列、640 一列不变。

- **pricing Popular 徽标终态（2026-08-31 Park 五轮迭代，最终 commit 40e22dd 照官网源码 1:1）**：抓了 17track.net/zh-cn/pricing 的打包 CSS 照抄。官网机制：**全部卡 `margin-top: var(--popular-ribbon-height)(28px)`、热门卡 `margin-top: 0`**——热门卡的色带突出到其他卡上方 28px，色带底（白体顶）和其他卡框顶对齐；色带是热门卡内**流内首个元素**（28px、透明底白字 14px/500，露出卡的 `background: var(--api-blue)`——官网是橙渐变）；白体 `.api-plan-inner` is-hot 下 `border-radius: 14px; flex: 1 1 auto`（贴边框内嵌、官网无 margin）；**卡 `overflow: hidden`（官网如此，白体圆角由卡裁）**。标题逐像素对齐（nameAligned 0）。390 tab 档徽标随 Flagship 选中出现。**pricing 列数分档（d85f989 + 6a53fb3 + 46e22e7）：一行四列保持到 >768；768 平板竖屏两列（4 plan 卡 2+2、Custom 跨全宽一行，Park「也是 221 布局」）；≤640 tab 切换。坑重演警告：**768 的两列已用嵌套 `min-width:641` 圈住**——46e22e7 之前它泄漏进 ≤640 tab 档，激活卡在两列 grid 里只占半宽；跨档列数/span 一律要范围限定。****s4 井 ≤768 撑满壳宽（d2439f5）**：单列档 `.api-s4-stage-card` 原 `max-width:520px` 居中已废弃，井随宽走（768→736²、640→608²、390→358²）。**s4 布局定案（9cb27ce 终版，Park 拍板「<1200 保持布局，缩小字号」否掉单列方案）：>1180 桌面三栏（h3 clamp/正文 13.68）；769-1180 **三栏保持 + 字号缩档**（h3 13 !important/正文 12 !important，icon 18、padding 14/16、col gap 14；规则在文件末尾赢源顺序）；769-940 最窄段再收（h3 12/正文 11——882 第三卡 12px 时仍差 20px）；768=井全宽 + 卡 2×2 + 内容 zoom 1.39；≤640 单列小尺寸。坑：缩字号规则要 `!important` 压基础 clamp + 放文件末尾（2248 块会被 3368 基础反超）；嵌套 @media 编译不可靠，940 档用独立块。**坑：zoom 不接受 calc 容器单位（固定档 1.39）；transform scale 会和候场 scale(0.52) 桥逆变换系统打架（量到的 transform: none 是候场态，别用 transform 放大井内容）。****Onboard 768=2×2（d9c2ded，≤640 横滑不变）**；**Explore 卡 768 保持桌面左文右图（1a59054）**：10249 块的单列手机化整段 + 10535 块带 `!important` 的单列都嵌套限 ≤640（后者拆条：禁倾斜 transform none 保留 ≤768），641-768 吃桌面两列；≤640 的缩放方案（10861）不受影响。**坑（7ad0123）：≤1024 的 6 列 span 方案必须放 `769-1024` 范围块**——span 2 泄漏进 ≤768 两列 grid 就等于整行一个（Applications 曾变一行一张）；640/390 单列不变。**768 补充（c9ed8f1）：卡 `min-height:0` 高度随内容（同行 stretch 拉齐，去 268 固定高空白）、第五张 `:last-child` 跨全宽。**废弃方案：框内 36px 占位行、压线胶囊、框上小胶囊、框内色带白体 margin 4。**坑：绝对定位 top/bottom 同写时 bottom 被忽略（需 top:auto）——已不适用但记着；覆盖 absolute 基础规则为 static 时 `transform` 仍会生效（96be816：translateX(-50%) 残留把色带文字左移裁掉），要一并 `left:auto; transform:none`；列表容器 padding 归零要显式四向（ul 的 UA 默认 padding-inline-start:40px）**。

- **BrandsSay 同步到兄弟项目（2026-09-01，returns 49ab19b / tracking-react 3fbf846，均未 push）**：两处 API 改动带过去——①`.brand-card` 基础 `max-width: 320px`（全档钳宽）；②手机 100cqw 全宽卡挂点 ≤640（returns 原本就在 640；tracking-react 原在 720 块，末尾追加 ≤640 组按源顺序覆盖）。**发现：returns 的断点迁移已被 Park 自己做完**（working tree 里 4 文件 960→768、mq480→mq640、CSS 已只剩 640/768/1024），我第一次 `git add -A` 误把它混进 BrandsSay 提交，已 reset 拆成独立提交 4663564；tracking-react 断点未迁移（还是 480-1100 全套）。教训：**兄弟项目工作区可能有 Park 自己的改动，commit 前必须 git status 逐文件核对，禁用 -A 一把梭**。
- **footer 同步到兄弟项目（2026-09-01，returns 75788cc / tracking-react c06c420，均未 push）**：API 版 footer 分档（>640 左右 + ≤1024 nav 2×2 + ≤640 堆叠/两列均分）整段追加到两项目 landing.css **文件末尾**，按源顺序覆盖它们 ≤560 块里的旧 footer 规则（两项目还是旧断点体系 520/560/680/900/980，没做 API 那次并档——Park 只要 footer 同步，不要动全站断点）。实测：两项目 573（堆叠+两列 243/239 均分）与 900（row + nav 2×2 并排）全过，测试 16/16、49/49。
- **footer 手机链接两列终版（2026-08-31 Park 四轮，commit 8d49dec）**：`.site-footer-nav` ≤640 = `width:100%`（必须！nav 的 flex:1 1 0 在列方向 footer-main 里宽度收缩到内容，不撑满右列就到不了中线）+ `grid-template-columns: 1fr 1fr` + `column-gap: 40`。效果：Products/Partners 横排贴左、Company/Support 起点在行中线。三轮弯路记档：minmax(0,1fr) 裁长词 ✗、auto auto space-between 把左列压成竖排 ✗、规则写进 ≤480 而 Park 视口 481-640 没吃到 ✗。
- **footer 手机档链接分布（2026-08-31 Park 两轮，commit 5d3ce00 终）**：`.site-footer-nav` ≤640 = `1fr 1fr` + `justify-items: start` + col 100%——两列各自撑满半行（Products/Partners 贴左、Company/Support 在右半行），列距 40。Park「55 开/这一列应该在这儿」的真实意图是**布局拉开**（右列在右半边），不是列宽比例；长词撑列、`minmax(0,1fr)` 裁词方案都废弃。
- **footer 手机档 55 开（2026-08-31 Park，commit de1f94a）**：`.site-footer-nav` ≤640 两列从 `1fr 1fr` 改 `repeat(2, minmax(0,1fr))`——纯 `1fr` 等于 `minmax(auto,1fr)`，长词（Notifications）的 min-content 会撑宽左列成 40/60 并被裁。390 实测四组 2×2 各 79px 均分。
- **手机 hero 条纹过粗（2026-08-31 Park，commit bbe20f9）**：hero-wash-shader 的 FlutedGlass 频率沿用原版「按横向数格」（u 已乘 aspect，FREQUENCY×aspect 定总格数）——窄视口 aspect<0.5 时每格物理宽近两倍，条纹显粗。修法：`freqComp = max(aspect,1)/max(aspect,0.62)` 短边补偿，桌面（aspect≥1）恒为 1 逐位不变、窄屏密度回桌面观感。另注：≤640 手机档 FX 关、hero 显示 CSS fallback（`hero-shader-fallback` 的 repeating-linear-gradient 24px 周期灰白细纹）；Park 截图的彩色粗纹是真 shader 在跑（视口 >640 的窄窗口/模拟器）。
- **FX 降级线 768→640（2026-08-31 Park「768 hero 背景没了/地球没了/服务器滚动旋转没了」，commit db1ae30）**：三个「没了」同根因——responsive-fx 总开关 `reduce = mqReduce || mq768` 把 768 平板竖屏也 reduce 了（`__reduceFx=true` → 所有 shader 不挂 + use-cases-scroll 定格 p=1 不旋转），CSS 10535 块还把 `.hero-undertones/.bottom-cta-shader` display:none。修复：总开关和 `__isMobileLayout` 改挂 mq640，10 处 JS 兜底 matchMedia（hero-wash/undertones/use-cases-bg/bottom-cta/impact-bg/s4-liquid-grain/roi-point-waves/ai-lab/particle-earth/utils）同步 640，CSS shader 隐藏移 640 块。**约定更新：≤640（手机）才降 FX，768 平板吃完整桌面 FX**（AGENTS.md 已同步）。实测：768 → `__reduceFx=false`、hero shader canvas 753×768 WebGL 挂载、iso canvas 随滚动挂载；390 → reduce=true、canvas 不挂。hero canvas 类名是 `.api-s1-shader`（动态创建），`.hero-undertones` 是 LegacyLanding 的旧类别搞混。**注意：shader 模块挂载是加载时一次性判断，in-app browser 改视口不重跑——跨档改视口后 FX 状态不对先刷新页面再判断**（Park 报 1024 没背景即此，实测全新加载 1024 FX 全在）。

- **s4 文案卡 [01]-[04] 换 SVG icon + hover 动画（2026-08-31 Park，commit 5fab278）**：`[{card.idx}]` 序号标签整体换成四枚 24px 线性 icon（01 雷达：双圈+扫描线旋转+中心点弹出；02 地球：圆+经纬线描边绘制；03 眼睛：眼形绘制+瞳孔弹出；04 柱状图：基线绘制+三柱依次 scaleY 长高）。默认灰 `#94a3b8`、hover 卡片变 `--api-blue`。实现：stroke 全走 currentColor、描边元素 `pathLength="100"` 归一（CSS `dasharray 100` 统一 draw keyframes，`--d` 内联变量做错峰 delay）；`.bar/.core` 要 `transform-box: fill-box`。reduce-motion 全关。坑两个：**structure.test 的 gate 断言 `[{card.idx}]` 已同步成 `COPY_ICONS`/`api-s4-ico`**；`npm test | grep` 会吞退出码（grep 永远 0），失败测试曾被带进 commit——用 vitest 直跑或看输出再 commit。1024 档 icon 收 20px（卡高预算）。

- **s4 文案卡 769-1024 溢出（2026-08-31 Park，commit 9ea3eb5）**：平板档三栏侧列 ~253px 宽、卡高被井对半钉死（1024 卡 205 / 900 卡 181），正文漏出卡外 1-2 行。修法两段：①文字收一档（h3 14px、正文 12.5/lh1.5、idx margin 8、padding 14/16）——只够 1024，900 仍差 17px；②卡改随内容自然高（`flex: 0 0 auto`）+ 列 `space-between` 贴齐井沿，文字永不卡死。**两个坑**：字号规则块在文件前部（2248）会被后面（3368）的基础 clamp 同特异性反超——加 `.api-s4` 前缀提特异性；规则限 769-1024 范围块，否则手机档 12.06px 会被顶到 12.5。**别动井**：井和卡列联动，收井卡更矮。

- **分割线清理补全到 768（2026-08-31 Park，commit 3fb1a61 + 6f1deb1）**：Park 在 768 圈了 logos 带（.trust-band）和 BrandsSay 之间那条线——`.trust-band { border-bottom }` 是 ≤480 批次漏掉的第三类线，≤768 已去。同批把 `.section/.credentials` 分割线从 640 提到 768（并档一致性）。**随后 Park 在桌面也圈了同一条 → `.trust-band` 基础规则全档 `border-bottom: 0`**（6f1deb1）。当前状态：trust-band 全档无线；`.section/.credentials` 线 ≤768 无、**桌面（>768）仍保留**——Park 尚未表态桌面的 .section 线，他再圈就全档去掉。

- **768 平板竖屏三处回归（2026-08-31 Park 三点，commit 3eb7fb8 + 9049acd）**：断点并档后 768 吃到原 900 档的单列堆叠，Park 要求平板竖屏保持桌面式双栏——①hero 左右双栏（紧凑两列 `minmax(0,1fr) minmax(300px,46%)`，`display:block` 单列降到 ≤640）；②Use Cases s2 图/文保持 row（visual 62%/copy 38% 桌面流式，堆叠规则降到 ≤640；cross/tickbar/progress 隐藏保留在 768，p=1 定格的彩虹线在平板仍是噪音）；③BrandsSay 卡宽 `100cqw`（手机全宽卡）降到 ≤640，768 用块头 `min(300px,86vw)`=300px；**随后 Park 追加：`.brand-card` 全局 `max-width: 320px`**（桌面 340、手机 100cqw 全宽 375 都被钳到 320；390 手机卡不再全宽、右侧露边，Park 认可的统一观感）。教训：**从宽档往窄档挪规则时，窄档必须接住**——第一轮删了 768 的 hero 单列忘了 640 接，390 左列被压到 15px 破版。三档复验：768 双栏/640·390 单列、卡宽 320/300/320、零溢出。**语义更新：768 档 = 「平板竖屏双栏紧凑」+ 部分（仅噪音隐藏类）手机化，纯布局单列都在 ≤640。**

- **断点体系收敛（2026-08-31 Park 定案「按 Tailwind 的断点来」）**：全站 max-width 只剩 **640 / 768 / 1024**（+640 内嵌套 360 窄机子档），清理了 520/560/680/700/720/900/980/1100 化石层（共 28 个 @media + 4 处 JS matchMedia）。语义映射：**原 ≤900「单列堆叠」块→768**（不是 1024！机械替换会让 iPad 横屏被单列压掉）、**原 ≤980/≤1100「rebalance」块→1024**、原 ≤480/520/560→640、680/700/720→768；api-page 的 901-1100 组合块变 `(max-width:1024) and (min-width:769)`。JS：particle-earth / iso-hub 的 900→768（跟单列档，分别是性能降级和窄屏高 dpr）、landing-inline 980→1024（feature rebalance）、responsive-fx mq480→mq640。1280/1536 是 Tailwind 大屏接口暂不设，1440 是壳宽不是断点。规范已写进 AGENTS.md「断点规范」节。验证：六档（1440/1280/1024/768/640/390）关键网格实测全部按档生效、零横向溢出、桌面 1440/1280 零变化；768 的 track-ui 吃 768 档 hidden 但布局流式、悬出元素全部在卡内（实测 wismo/video 左右各 27px 余量），640 以下缩放方案接管（308px 对称居中 + visible）。**注意**：`tab.screenshot()` 被 in-app browser guest 模式拒（"activity capture failed for guest"），CUA 桌面截屏也没授权——视觉回归目前只能靠几何断言 + Park 实机看。工作方式（同日再次强调「我给你说，你来改。先别动」）：新批次也一样，Park 口述问题清单我只按他说的改，别自主扫页出诊断报告。

- 移动端 ≤480 批次（2026-08-31 Park 七点，全按 ≤480 做、桌面不动；**2026-08-31 晚断点并档后这批的挂点已是 ≤640**）：
  - ④场井内容溢出（dashgrid 369 > 井 343，底部卡+toast 被裁）：≤480 图例折两列（`gap: 5px 10px`）、donut/trend 各收 96px、dashgrid gap 6 → 实测 281px 正好收进井，toast 完整可见。
  - pricing tab 改**分段控件**：grid 四等分 + `#eef2f7` 底 + 4px 内衬，选中=白钮+蓝字+轻投影（不再是四个独立胶囊）。
  - 移动端卡片描边统一 1px：`.api-plan-card / .api-plan-custom` ≤480 `border-width: 1px`（桌面仍 2px）。
  - **模块 H2 全站统一 token**：390 宽下曾有 22.05/28.36/32.5/32.6 四种字号并存。`.api-h2`、`.credentials-head h2`、`.brands-say-head h2`（规则在 landing.css）→ `var(--fs-h2)`（22.05@390，桌面 1360 仍 40 不变）；`.api-s2-title`（桌面 48）→ `clamp(21.5px, calc(11.96px + 2.65vw), 48px)`；`.bottom-cta h2`（桌面 52）→ `clamp(21.5px, calc(10.52px + 3.05vw), 52px)`——同模板 M=21.5@360、D 各自不变。structure.test 的 `.api-h2` 断言已同步成 `var(--fs-h2)`。Hero 副标（`.api-s1-copy .api-h2` 24.8/600）是 hero 层级，不动。
  - **模块间发丝分割线 ≤480 已去**：来源是 landing.css `.section` / `.credentials` 的 `border-bottom: 1px solid var(--border-default)`（全页每个模块都有，不只 Park 圈的那条）；`.api-page .section, .api-page .credentials` ≤480 `border-bottom: 0`，桌面保留。
  - track-ui 悬出卡被裁根因：**≤680 块把 `.explore-card-tracking .track-ui` 设了 `overflow: hidden`**（基础样式明明是 visible），把悬出板外的 WISMO/Brand video 裁掉；≤480 改回 `overflow: visible`（returns-ui 同加）。实测 wismo left 27 ≥ 卡 16、video right 348 ≤ 卡 359，都不出卡。
  - CTA 按钮 ≤480 `max-width: 320px`（landing ≤480 块全局 `.btn-switch` + bottom-cta 另加 `margin-inline: auto` 抗 flex stretch 拉满整行）。
  - Onboard 4 Steps ≤480 改**横向滑动 + 底部 indicator**（同日 Park）：`.api-onboard-steps` flex + `scroll-snap-type: x mandatory`，卡 `flex: 0 0 86%` + `scroll-snap-align: center`（两侧露邻卡边），滚动条隐藏；dots（`.api-onboard-dots`，桌面 `display:none`）随 onScroll 取「视口中央最近的卡」高亮（蓝长条 18px / 灰点 6px，18px 热区 `::before` 画点），可点切（`scrollIntoView inline:center`，reduce-motion 用 auto）。JSX 在 IntegrationTogether：`obIdx` state + `stepsRef` + `onStepsScroll/goStep`。桌面四列 grid 完全不动。

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
- 底部产品切换 dock：2026-08-24 Park 暂时隐藏过（Applications 100vh 屏被 dock 挡住），**2026-08-31 Park「先放出来」已恢复**——LandingPage 渲染 `<ProductDock />`（fixed 底部居中三 tab），Applications 被压的问题 Park 接受/再说。
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

- 2026-09-11 14:59 — memory.md、AiIntelligence.jsx、useLandingEffects.js、structure.test.js、api-page.css 等 6 项
- 2026-09-10 14:16 — memory.md
- 2026-09-10 11:13 — .pi
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
