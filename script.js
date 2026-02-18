const secret = "D3r5t0n3";

const loginEl = document.getElementById("login");
const appEl = document.getElementById("app");
const pw = document.getElementById("pw");
const overlay = document.getElementById("overlay");
const reader = document.getElementById("reader");

/* LOGIN */
function login() {
  if (pw.value === secret) {
    showApp();
  } else {
    alert("Incorrect password");
  }
}

/* ENTER KEY SUPPORT */
pw.addEventListener("keydown", e => {
  if (e.key === "Enter") login();
});

/* SHOW APP */
function showApp() {
  loginEl.style.display = "none";
  appEl.style.display = "block";
}

/* OPEN EXTENSIONS */
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    overlay.style.display = "block";
    reader.src = card.dataset.url;

    setTimeout(() => {
      overlay.requestFullscreen?.();
    }, 50);
  });
});

/* EXIT FULLSCREEN */
document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    overlay.style.display = "none";
    reader.src = "";
  }
});

/* 🔧 SCROLL FIX */
window.addEventListener("keydown", e => {
  if (!document.fullscreenElement) return;

  const url = reader.src || "";
  if (url.includes("comix.to")) return;

  const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp"];
  if (!keys.includes(e.key)) return;

  e.preventDefault();

  try {
    reader.contentWindow.scrollBy({
      top:
        e.key === "ArrowDown" ? 120 :
        e.key === "ArrowUp" ? -120 :
        e.key === "PageDown" ? 500 :
        -500,
      behavior: "smooth"
    });
  } catch {}
});
