// Cross-browser API helper: use `browser` if available (Firefox), otherwise `chrome`.
const api = typeof browser !== "undefined" ? browser : chrome;

// Small storage helpers that return Promises and work for both Chrome (callback) and Firefox (promise)
function storageGet(key) {
  return new Promise((resolve) => {
    try {
      const result = api.storage.local.get(key);
      // If it returns a Promise (Firefox / polyfill), use it
      if (result && typeof result.then === "function") {
        result.then(resolve).catch(() => resolve({}));
      } else {
        // Chrome-style callback
        api.storage.local.get(key, (res) => {
          resolve(res || {});
        });
      }
    } catch (err) {
      // Fallback safe resolve
      resolve({});
    }
  });
}

function storageSet(obj) {
  return new Promise((resolve) => {
    try {
      const result = api.storage.local.set(obj);
      if (result && typeof result.then === "function") {
        result.then(resolve).catch(() => resolve());
      } else {
        api.storage.local.set(obj, () => resolve());
      }
    } catch (err) {
      resolve();
    }
  });
}

function storageRemove(key) {
  return new Promise((resolve) => {
    try {
      const result = api.storage.local.remove(key);
      if (result && typeof result.then === "function") {
        result.then(resolve).catch(() => resolve());
      } else {
        api.storage.local.remove(key, () => resolve());
      }
    } catch (err) {
      resolve();
    }
  });
}

// Debounce helper to reduce frequent writes while typing
function debounce(fn, wait = 300) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

document.addEventListener("DOMContentLoaded", async () => {
  const copyBtn = document.getElementById("copyBtn");
  const clearBtn = document.getElementById("clearBtn");
  const userText = document.getElementById("note");
  const statusMsg = document.getElementById("statusMsg");

  const STORAGE_KEY = "MDevHubQuickNote";

  // Load saved note on startup
  try {
    const data = await storageGet(STORAGE_KEY);
    if (data && data[STORAGE_KEY]) {
      userText.value = data[STORAGE_KEY];
    }
  } catch (err) {
    console.warn("Failed to load saved note", err);
  }

  // Save function (debounced)
  const saveNote = debounce(async () => {
    try {
      await storageSet({ [STORAGE_KEY]: userText.value });
      showStatus("Saved!", "green");
    } catch (err) {
      showStatus("Save failed", "red");
    }
  }, 350);

  // Save on input
  userText.addEventListener("input", () => {
    saveNote();
  });

  // Copy to clipboard
  copyBtn.addEventListener("click", async () => {
    const text = userText.value;
    if (!text || !text.trim()) {
      showStatus("Please type something first!", "red");
      return;
    }

    try {
      // navigator.clipboard may require secure context; extension popup is secure
      await navigator.clipboard.writeText(text);
      showStatus("Copied!", "green");
    } catch (err) {
      console.error("Copy failed", err);
      showStatus("Failed to copy!", "red");
    }
  });

  // Clear text and storage
  clearBtn.addEventListener("click", async () => {
    userText.value = "";
    try {
      await storageRemove(STORAGE_KEY);
      showStatus("Cleared!", "gray");
    } catch (err) {
      showStatus("Clear failed", "red");
    }
  });

  function showStatus(message, color = "black") {
    statusMsg.textContent = message;
    statusMsg.style.color = color;
    // clear after short delay
    setTimeout(() => {
      statusMsg.textContent = "";
    }, 1600);
  }
});
