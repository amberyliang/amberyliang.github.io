# 個人網站 — Editorial Minimal

純 HTML / CSS / JS 的靜態網站，無框架、無動畫函式庫、無需建置，開箱即可部署。

排版系統：襯線標題（Newsreader / Noto Serif TC）配無襯線內文（Inter / Noto Sans TC）、
暖灰階色票、髮絲線分隔、零陰影，唯一有彩色為苔綠 accent。

## 檔案結構

```
personal-website/
├── index.html      # Page 1 — ACADEMIC（Hero、CV 時間軸、發表手風琴）
├── life.html       # Page 2 — LIFE CURATIONS（跳水下潛動畫、潛點地圖、抹茶探店、未來茶室）
├── about.html      # ABOUT / CONTACT
├── css/style.css   # 全站樣式（設計 token、排版系統、RWD、側欄）
├── js/main.js      # 互動（側欄、複製 Email、手風琴、地圖 Pin、章節標籤列）
└── README.md
```

## 替換內容（找「替換」二字即可全部找到）

| 要改的東西 | 位置 |
|---|---|
| 姓名／LOGO | 各頁 `<a class="brand">` 與 `<title>`（目前為 Angel Liang） |
| 個人照片（占位） | `index.html` 的 `.hero-portrait`，1:1 方形 |
| 個人照片 | `index.html` 的 `.hero-portrait`：建 `images/` 資料夾放照片，將 figure 內容換成 `<img src="images/portrait.jpg">` |
| 一句話簡介 | `index.html` 的 `.tagline` |
| CV PDF | 將你的履歷存成 `cv.pdf` 放在根目錄 |
| 學經歷 | `index.html` 的 `.timeline-item` 區塊（可複製增加） |
| 論文發表 | `index.html` 的 `.accordion-item` 區塊 |
| 潛點與日誌 | `life.html` 的 `.map-pin`（`transform="translate(x, y)"` 調整位置）與 `.dive-log-card` |
| 抹茶店卡片 | `life.html` 的 `.matcha-card`；照片同樣放 `images/` 後換成 `<img>` |
| 茶室選單 | `life.html` 的 `.menu-item` |
| 社群連結／Email | 各頁 `.drawer-footer`、`about.html` 的 `.contact-list` |

## 本機預覽

```bash
cd ~/personal-website
python3 -m http.server 8000
# 瀏覽器開 http://localhost:8000
```

## 部署（三選一，皆免費）

### A. GitHub Pages（推薦，附版本管理）

```bash
cd ~/personal-website
git init && git add -A && git commit -m "Personal website v1"
gh repo create <你的帳號>.github.io --public --source=. --push
```

到 GitHub repo → Settings → Pages → Source 選 `main` branch → 儲存。
幾分鐘後網站上線於 `https://<你的帳號>.github.io`。
之後更新只要 `git add -A && git commit -m "update" && git push`。

（沒有 `gh` CLI 的話：在 GitHub 網頁上新建名為 `<帳號>.github.io` 的 repo，
再 `git remote add origin <repo網址> && git push -u origin main`。）

### B. Netlify Drop（最簡單，拖拉即上線）

1. 開 <https://app.netlify.com/drop>
2. 把整個 `personal-website` 資料夾拖進網頁
3. 立即獲得 `https://xxx.netlify.app` 網址（可在設定改子網域名稱）

### C. Vercel

```bash
npm i -g vercel
cd ~/personal-website && vercel --prod
```

### 自訂網域（選用）

三個平台都支援：買網域（如 Namecheap / Cloudflare）後，
在平台的 Domain 設定加入網域，並依指示到 DNS 加 CNAME 記錄即可。

## 技術備註

- 字型由 Google Fonts CDN 載入；斷網時會落回系統襯線／無襯線字型，版面不受影響。
- 全站無捲動動畫，`prefers-reduced-motion` 下另將所有 transition 降到 0.01ms。
- 響應式：≤760px 自動切換為漢堡選單＋左側滑出側欄、單欄卡片流，
  潛點日誌卡片改為地圖下方的常駐清單（觸控裝置沒有 hover）。
- 色票要改成全灰階：`css/style.css` 的 `--accent` 換 `#5a5246`、`--accent-soft` 換 `#b3b0a6`。
