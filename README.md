# Matching Memory Game

## Page Flow
Home → Instructions → Game Play → Score Board
↑ (Next/Restart)
↓ (Game Complete)

### Core Pages
| Page Name | Type | Purpose |
|-----------|------|---------|
| `home` | Intro | **遊戲首頁**<br>自定義標題、開始遊戲 |
| `instructions` | Info | 遊戲說明 |
| `cards` | **Main** | **記憶配對遊戲**<br>1-5位玩家輪流對戰 |
| `scores` | Ending | **計分板**<br>按分數排序+獎盃 |

### Game Flow (Multiplayer)
1. **首頁** → 設定玩家數量 → **遊戲說明**
2. **遊戲主畫面** → 輪流翻卡片 → **配對正確/錯誤動畫**
3. 全部配對完成 → **計分板**
4. **回首頁** / **重新開始**

## 🎯 遊戲機制
點擊卡片翻開 → 第二張卡片 → 判斷配對
├── 成功：1分 +音效 → Next按鈕 → 下一玩家
└── 失敗：音效 → 自動翻回 → 下一玩家

## 🛠️ Tech Stack
- **React** + Hooks (useState/useEffect/useCallback)
- **Styled Components** (動態網格CSS-in-JS)
- **Public folder assets** (images/sounds)
- **Dynamic grid layout** (自動適配卡牌數量)
- **Responsive scaling** (1920x1080 → auto-fit)

## 🚀 Quick Start
npm install
npm start

**Game designed for 1920x1080 full-screen play.**