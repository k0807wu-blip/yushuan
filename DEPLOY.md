# 歸途 — 上傳 GitHub 與 ZEABUR 部署說明

## 一、環境需求

- **Node.js**：v14.18 以上（建議 v18+，本專案在 v16 可建置）
- **套件**：無需額外安裝插件，依賴皆在 `package.json` 中

### 依賴摘要

| 類型 | 套件 |
|------|------|
| 框架 | react, react-dom |
| 動畫 | framer-motion |
| 圖示 | lucide-react |
| 建置 | vite, @vitejs/plugin-react |
| 樣式 | tailwindcss, postcss, autoprefixer |

---

## 二、圖片檔案存取方式

- 作品圖片放在 **`public/images/`**，部署後路徑為 **`/images/檔名`**。
- Vite 會把 `public/` 內容原樣複製到輸出的 `dist/` 根目錄，因此：
  - 開發時：`/images/jimeng-yulan.png` 等會由 dev server 提供
  - 建置後：同上，由靜態伺服器提供

### 目前使用的圖片

| 作品 | 檔案路徑（程式中使用） |
|------|------------------------|
| 寄「夢」於「藍」 | `/images/jimeng-yulan.png` |
| 花聲什麼事? | `/images/huasheng.png` |
| Claire. | `/images/claire.png` |

- 若要更換圖片：替換 `public/images/` 內對應檔名即可，無需改程式。
- 若要新增作品：在 `public/images/` 新增檔案，並在 `src/App.jsx` 的 `portfolioItems` 加上一筆資料與 `img: '/images/新檔名.png'`。

---

## 三、上傳 GitHub

1. 在專案目錄初始化（若尚未有 repo）：
   ```bash
   git init
   git add .
   git commit -m "Initial commit: 歸途 Team Guítú 網頁"
   ```

2. 在 GitHub 建立新 repo（例如 `yushuan` 或 `guitu-portfolio`），不要勾選「Add a README」等，保留空 repo。

3. 設定遠端並推送：
   ```bash
   git remote add origin https://github.com/你的帳號/你的repo名稱.git
   git branch -M main
   git push -u origin main
   ```

4. 確認 **`node_modules`** 與 **`dist`** 已在 `.gitignore` 中（本專案已設定），不要推上去。

---

## 四、ZEABUR 部署步驟

1. **登入 ZEABUR**  
   前往 [zeabur.com](https://zeabur.com)，用 GitHub 登入。

2. **建立專案並匯入 Repo**  
   - 點「Deploy service」或「Add new service」  
   - 選擇「Deploy your source code」  
   - 搜尋並選擇剛推送的 GitHub repo，按「Import」

3. **建置設定（通常可自動偵測）**  
   ZEABUR 會辨識為 Vite 專案，預設會：
   - **Build Command**：`npm run build`（或 `npm ci` / `npm install` 後執行 build）
   - **Output**：產生 `dist/` 目錄  
   若有「Root Directory」或「Output Directory」欄位，可留空或設為 `dist`（依 ZEABUR 介面為準）。

4. **環境變數**  
   本專案為純前端靜態站，**不需設定環境變數**。若之後有 API URL 等，再在 ZEABUR 的 Environment 頁籤新增即可。

5. **部署**  
   儲存設定後 ZEABUR 會自動建置並部署，完成後會給一個網址（例如 `xxx.zeabur.app`）。

---

## 五、注意事項

- **Node 版本**：ZEABUR 預設通常為 Node 18。若建置失敗，可在 ZEABUR 專案設定中指定 Node 版本（例如 18 或 20）。
- **SPA 路由**：本專案為單頁應用，ZEABUR 靜態託管會一併處理 SPA fallback，重新整理或直接打開 `#section-1` 等連結應可正常顯示。
- **圖片 404**：若上線後圖片開不出來，請確認：
  1. `public/images/` 底下的檔案有一起 push 到 GitHub  
  2. 建置後在 ZEABUR 的 build 產物中是否有 `images/` 資料夾（或到「View build logs」檢查）

---

## 六、本地建置與預覽（部署前自檢）

```bash
cd c:\Users\wedot\Desktop\yushuan
npm install
npm run build
npm run preview
```

瀏覽器打開 `http://localhost:4173`（或終端顯示的網址），確認版面與圖片與開發時一致後再推上 GitHub 並在 ZEABUR 部署。
