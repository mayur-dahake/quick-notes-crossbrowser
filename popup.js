const api = typeof browser !== "undefined" ? browser : chrome;

const noteArea = document.getElementById("note");
const status = document.getElementById("status");
const clearBtn = document.getElementById("clearBtn");

// Load saved note
api.storage.local.get("quickNote").then((data) => {
  if (data.quickNote) noteArea.value = data.quickNote;
});

// Save note on input
noteArea.addEventListener("input", () => {
  const note = noteArea.value;
  api.storage.local.set({ quickNote: note }).then(() => {
    status.textContent = "Saved!";
    setTimeout(() => (status.textContent = ""), 1000);
  });
});

// Clear note
clearBtn.addEventListener("click", () => {
  noteArea.value = "";
  api.storage.local.remove("quickNote").then(() => {
    status.textContent = "Cleared!";
    setTimeout(() => (status.textContent = ""), 1000);
  });
});
