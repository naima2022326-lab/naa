const secret = "D3r5t0n3";

const loginEl = document.getElementById("login");
const appEl = document.getElementById("app");
const pw = document.getElementById("pw");
const overlay = document.getElementById("overlay");
const reader = document.getElementById("reader");

/* HIDE LOGIN INITIALLY */
loginEl.style.display = "none";

/* LOGIN */
function login() {
  if (pw.value === secret) {
    loginEl.style.display = "none";
    appEl.style.display = "block";
  } else {
    alert("Incorrect password");
  }
}

/* ENTER KEY */
pw.addEventListener("keydown", e => {
  if (e.key === "Enter") login();
});

/* OPEN EXTENSION */
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    const url = card.dataset.url;

    if (url.includes("spinchat.com")) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    overlay.style.display = "block";
    reader.src = url;
    setTimeout(() => overlay.requestFullscreen?.(), 50);
  });
});

/* EXIT FULLSCREEN */
document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    overlay.style.display = "none";
    reader.src = "";
  }
});

/* ========== INTRO SEQUENCE ========== */
const intro = document.getElementById("intro");
const introText = document.getElementById("intro-text");
const enterBtn = document.getElementById("enterBtn");

const message = "get ready to started to emerge yourselves";
let i = 0;

setTimeout(() => {
  const type = setInterval(() => {
    introText.textContent += message[i++];
    if (i === message.length) {
      clearInterval(type);
      setTimeout(() => {
        const del = setInterval(() => {
          introText.textContent =
            introText.textContent.slice(0, -1);
          if (!introText.textContent) clearInterval(del);
        }, 50);
      }, 1200);
    }
  }, 60);
}, 2300);

enterBtn.addEventListener("click", () => {
  intro.style.display = "none";
  loginEl.style.display = "flex";
});
