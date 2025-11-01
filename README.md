# 📝 Quick Notes – Cross-Browser Extension

A simple, lightweight **browser extension** that lets you take and save quick notes directly from your toolbar.  
Built using the **WebExtensions API**, it works seamlessly on **Chrome, Edge, Brave, Opera, and Firefox**.

---

## 🚀 Features

- 🖊️ Take quick notes in a popup window
- 💾 Notes are automatically saved locally
- 🧹 Clear notes with one click
- 🌍 Fully cross-browser compatible
- 🧱 Built with Manifest V3 (with Firefox fallback)

---

## 📦 Folder Structure

quick-notes-extension/
├── icons/
├── popup.html
├── popup.js
├── styles.css
├── manifest.json
├── browser-polyfill.js
└── README.md

---

## 🧪 Installation (Local Test)

### 🔹 Chrome / Edge / Brave / Opera

1. Open `chrome://extensions/`
2. Enable **Developer Mode**
3. Click **Load unpacked** and select this project folder

### 🔹 Firefox

1. Open `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on**
3. Select the `manifest.json` file

---

## 🛠️ Tech Stack

- Manifest V3
- WebExtensions API (`chrome` + `browser` polyfill)
- HTML, CSS, JavaScript
- `chrome.storage` / `browser.storage` for data persistence

---

## 🌍 Browser Compatibility

| Browser | Supported | Notes                              |
| ------- | --------- | ---------------------------------- |
| Chrome  | ✅        | Manifest V3                        |
| Edge    | ✅        | Works same as Chrome               |
| Brave   | ✅        | Chromium compatible                |
| Opera   | ✅        | Chromium compatible                |
| Firefox | ✅        | Uses polyfill for `browser.*` APIs |

---

## 📤 Publish

| Browser | Portal                                                                            | Developer Fee |
| ------- | --------------------------------------------------------------------------------- | ------------- |
| Chrome  | [Chrome Web Store](https://chrome.google.com/webstore/devconsole)                 | $5 one-time   |
| Edge    | [Microsoft Partner Center](https://partner.microsoft.com/dashboard/microsoftedge) | Free          |
| Firefox | [Mozilla Add-ons (AMO)](https://addons.mozilla.org/developers/)                   | Free          |
| Opera   | [Opera Add-ons](https://addons.opera.com/developer/)                              | Free          |

---

## 📜 License

[MIT License](LICENSE)

---

## 💡 Future Enhancements

- Export notes as `.txt` file
- Add dark mode
- Add note tagging
- Sync notes across devices

---

### 👨‍💻 Author

**Mayur Dahake**  
Open Source Developer | Angular & Web Extensions Enthusiast  
GitHub: [@mayurdahake](https://github.com/mayurdahake)
