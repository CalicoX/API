# 17TRACK Tracking API 落地页

Park 在这个仓库里直接改代码、看效果。Agent 用简体中文回复。产品原文不要改。

## 每次开工

1. 先读 `.cursor/memory.md`（当前决策和未完成项）。
2. 有新的设计取舍、布局数字、或用户纠正时，立刻写回 memory。
3. 一轮改完后更新 memory，然后 **commit 到本地（默认不 push）**。  
   push 只在 Park 明确说「push / 推上去 / 部署」时执行（`git push origin main`；main 连着 Vercel，push 即部署）。想推但暂不部署的 commit，message 里带 `[skip ci]`。攒批提交，不要一笔一小提交。不要 `--no-verify`、不要 force push。

## 页面结构

`LandingPage.jsx`：Hero → TrustBand → UseCases → HowItWorks → DataOperations → Applications → IntegrationTogether → Credentials → ExploreMore → BottomCta。

BottomCta 在 footer 上：Returns 同款暗底粒子海，文案 Efficient Solution of Value and Possibility + Contact Us。Applications 整屏 100vh，底部 Start My Free Trial 滚回 Hero `#free-trial`。背景是 Returns ROI 同款 Point Waves（`src/fx/modules/roi-point-waves.js`）。

- 内容壳 `.api-wrap`：**1440px**（含约 24px page padding）。
- 主样式：`src/styles/api-page.css`。
- 插图：`src/components/visuals/ApiDomVisuals.jsx`。
- 文案检查：`src/structure.test.js`。

## 断点规范（2026-08-31 Park 定案，Tailwind 四档）

- 全站只用 **640 / 768 / 1024** 三档 max-width（+ 640 内嵌套 360 窄机子档）；1280/1536 是 Tailwind 大屏接口，现阶段无素材不设。1440 是内容壳宽，不是断点。**别再新增断点值**（历史上 520/560/680/700/720/900/980/1100 的化石层已于 2026-08-31 清理归并）。
- 档位语义：≤640 手机特化（tab 切换、横滑、1px 描边、去分割线）；≤768 单列堆叠 + 关重 FX；≤1024 两/三列 rebalance；>1024 桌面全量。max-width 级联靠源顺序，窄档块写在宽档块之后。
- FX 开关（`matchMedia`）跟档走：`≤640` 手机 FX 分级（responsive-fx `mq640`）、`≤768` 降级/定格（hero/底 CTA shader、液态颗粒、iso-hub、particle-earth 等）、`≤1024` feature 面板 rebalance（landing-inline）。

## 视觉约定

- How-it-works / Data Operations 插图：浅灰井 `#f7f8fa` + 点阵，白 UI 碎片，8–11px 字，细描边。不要实拍、不要 3D 开盖。
- 四张 Data Operations 卡必须**四种构图**，不要同一套铺满双栏。
  1. Tracking data：双环 9 态绕 17 logo 公转（外 5 / 内 4，hover 反向）。涟漪铺满整井，叠层白圆 + 很淡阴影，不要描边。9 个状态全部白胶囊。轨道要散开（约 38 / 22 cqmin），内外错开 45°。
  2. Carriers：浅灰井（不要蓝底、不要点阵）；中心 3400+ + 两侧 logo **淡连线**；底半颗蓝点地球。Hover 时 logo+连线按 `--i` 逐个出现（只播一次）。
  3. Visibility：两张重叠卡拆开（运单号 → 自动识别）。
  4. Dashboard：井中小卡，**环形图描边**动画。
- Data Operations：浅灰整段、**不要** sticky / 滚轮横滑 / 中间白卡外框。三栏：左 [01][02] 静态白文案卡、中间方形井（直接是动画）、右 [03][04]。四卡**无**选中态、不点选切场、**无** Contact Us。标题行左标题 / 右渐变胶囊 **Start My Free Trial**（白圆 + `···→`，不要 `.api-btn-primary`），滚到 `#free-trial`。井底蓝紫绿 liquid + film grain（`s4-liquid-grain.js`），减动效/≤768/弱 GPU 静态渐变。四段同一口井连续演完 Tracking → Carriers → Visibility → Dashboard，重叠过渡（径向 mask / scale / clip-path / 模糊，0.98s `cubic-bezier(0.22, 1, 0.36, 1)`），不要横滑换片、不要淡入淡出切卡、不要斜移/3D。动画触发看井内 `.api-s4-stage.is-on`。地球自转跟当前场。reduce-motion 定格第一场。

## Hero shader（Undertones 1 本地复刻）

`src/fx/modules/hero-wash-shader.js`，纯 WebGL 双 pass，替代了 npm `shaders` 包（依赖已移除）。
逐行移植自 `shaders` v3.0.453 的组件源码（`dist/core/{Swirl,ChromaFlow,FlutedGlass,FilmGrain}-*.js`），
对应 shaders.com 预设 Undertones 1（`3c8b5d14`）。

- **管线**：原版四层 Swirl（底色）→ ChromaFlow（光标墨迹）→ FlutedGlass（折射）→ FilmGrain（颗粒），
  映射为 Pass 1（FBO：Swirl + ChromaFlow premultiplied-over 合成）+ Pass 2（屏幕：玻璃折射 + 颗粒 + sRGB 编码）。
- **色彩空间**：所有颜色 CPU 端 sRGB→线性（colorjs `srgb-linear` 同款公式），全程线性混合，
  末端 shader 里做 piecewise sRGB 编码。原版引擎渲到 `-srgb` surface，这一步不能省。
- **坐标系**：原版引擎 uv/pointer 都是 **y-down**（`pointer.y=(clientY-top)/height`），本地按字面移植；
  FBO 是 y-up，只在采样时翻转。条纹方向、光标方向颜色都依赖这个约定，别改回 y-up。
- **ChromaFlow**：128×128 RGBA16F 半浮点场纹理（WebGL2；WebGL1 回退字节打包），CPU 逐帧平流 + 注入。
  注意：方向色标签和屏幕方向相反（鼠标向上出 downColor 紫红），原版如此；
  颜色只在移动中可见，停手后残液以白色 base 混合、白底上隐形。
- **锁定参数**（原版预设）：FlutedGlass angle 31 / freq 8 / refraction 4 / aberration 0.61 /
  softness 1（rounded：expHi 8, expLo 3）/ lightAngle -90 / highlight 0.12 / speed 0（棱条静止）/ edges mirror；
  FilmGrain strength 0.05 / bias 2 / 静态；Swirl colorA `#FFFFFF`, colorB `#EBEBEB`（对原版实况逐像素实测）。
- **设计微调**（偏离原版，故意的）：`CF_INTENSITY 1.2`（原 0.85），`CF_FADE_SCALE 0.7`
 （衰减 `1-dt` → `1-dt*0.7`，拖尾约 1.4 倍寿命；2026-08-17 从 0.45 缩短，Park 嫌太长）。拖尾色：紫 `#D042FF` + 蓝 `#5B4FFF`
  + left 一点橙 `#FF3805`（绿不要）。想调手感只动 intensity / fade。
- Data Operations 不再用 `.api-s4-track` / sticky；Use Cases 探出卡片仍不要撑宽文档。

## Git

- 远程：`https://github.com/CalicoX/API.git`，默认分支 `main`。
- 不要 commit `.env`、密钥、`node_modules`、`dist`。
- 不要 `push --force`、不要改 git config、不要 `--no-verify`。
- 自动提交说明写「为什么」，1–2 句中文即可。
