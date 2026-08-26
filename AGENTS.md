# 17TRACK Tracking API 落地页

Park 在这个仓库里直接改代码、看效果。Agent 用简体中文回复。产品原文不要改。

## 每次开工

1. 先读 `.cursor/memory.md`（当前决策和未完成项）。
2. 有新的设计取舍、布局数字、或用户纠正时，立刻写回 memory。
3. 一轮改完后必须落到 GitHub：`commit` + `push` `origin/main`。  
   项目 hook 会在 agent **stop** 时自动做这件事；如果 hook 没跑，agent 自己做，不要问要不要提交。

## 页面结构

`LandingPage.jsx`：Hero → TrustBand → UseCases → HowItWorks → DataOperations → Applications → IntegrationTogether → Credentials → ExploreMore → BottomCta。

BottomCta 在 footer 上：Returns 同款暗底粒子海，文案 Efficient Solution of Value and Possibility + Contact Us。Applications 整屏 100vh，底部 Start My Free Trial 滚回 Hero `#free-trial`。背景是 Returns ROI 同款 Point Waves（`src/fx/modules/roi-point-waves.js`）。

- 内容壳 `.api-wrap`：**1440px**（含约 24px page padding）。
- 主样式：`src/styles/api-page.css`。
- 插图：`src/components/visuals/ApiDomVisuals.jsx`。
- 文案检查：`src/structure.test.js`。

## 视觉约定

- How-it-works / Data Operations 插图：浅灰井 `#f7f8fa` + 点阵，白 UI 碎片，8–11px 字，细描边。不要实拍、不要 3D 开盖。
- 四张 Data Operations 卡必须**四种构图**，不要同一套铺满双栏。
  1. Tracking data：双环 9 态绕 17 logo 公转（外 5 / 内 4，hover 反向）。涟漪铺满整井，叠层白圆 + 很淡阴影，不要描边。9 个状态全部白胶囊。轨道要散开（约 38 / 22 cqmin），内外错开 45°。
  2. Carriers：浅灰井（不要蓝底、不要点阵）；中心 3400+ + 两侧 logo **淡连线**；底半颗蓝点地球。Hover 时 logo+连线按 `--i` 逐个出现（只播一次）。
  3. Visibility：两张重叠卡拆开（运单号 → 自动识别）。
  4. Dashboard：井中小卡，**环形图描边**动画。
- Hover：整卡触发，约 3.2s，`cubic-bezier(0.22, 1, 0.36, 1)`；位移走水平，不要斜移。
- Data Operations：浅灰整段、sticky 竖滑横移、标题左对齐、右侧圆形 prev/next。单卡约 800×500。滚动用连续 `--s4-x`，不要整卡跳。

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
- 布局：`.api-s4-track` 有 `overflow-x: clip`（不是 hidden，hidden 会杀 sticky）——
  用例轮播的探出卡片不能撑宽文档，删了会回归横向滚动条。

## Git

- 远程：`https://github.com/CalicoX/API.git`，默认分支 `main`。
- 不要 commit `.env`、密钥、`node_modules`、`dist`。
- 不要 `push --force`、不要改 git config、不要 `--no-verify`。
- 自动提交说明写「为什么」，1–2 句中文即可。
