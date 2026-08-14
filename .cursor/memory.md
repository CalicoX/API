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
- Tracking data 卡：双环都是 9 个大状态图标（外 5 / 内 4），hover 内外反向慢转。中间 17TRACK 方标要小、平面（无厚度），约 52px。不放文字 pill、不放子状态。
- 承运商卡用连线枢纽；报表卡用环形图动画。
- 标题单词亮度跟滚动走（`--on`），不是进场自动播。
- 右侧渐隐遮罩跟 `--s4-p`，最后一张收掉。
- Contact Us 在四张卡都有；当前卡 / hover 箭头 `api-s4-cta-nudge`。
- 手机 ≤900px：取消 sticky，竖排叠卡，藏导航按钮。

## 未完成

- Tracking data：双环大状态图标（5+4）+ 反向转。Park 再看疏密。
- 其余三张 Data Operations 插图还没按同一轮重做。

## 日志

- 2026-08-14 14:50 — memory.md、AGENTS.md、ApiDomVisuals.jsx、api-page.css
- 2026-08-14 14:45 — memory.md、AGENTS.md、ApiDomVisuals.jsx、api-page.css
- 2026-08-14 11:31 — memory.md、AGENTS.md、ApiDomVisuals.jsx、api-page.css、logo-17-mark.png
- 2026-08-14 10:38 — memory.md
- 2026-08-14 10:38 — .gitignore、.cursor、AGENTS.md
