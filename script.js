/* ========== DARK MODE TOGGLE (saved) ========== */
const toggleBtn = document.getElementById("darkToggle");
const body = document.body;
const saved = localStorage.getItem("theme");
if (saved === "dark") {
  body.classList.add("dark-mode");
  toggleBtn.textContent = "☀️";
}
toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  const isDark = body.classList.contains("dark-mode");
  toggleBtn.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

/* ========== TYPING EFFECT ========== */
const phrases = ["Developer", "Designer", "Innovator","Hackerr"];
const typedEl = document.getElementById("typed");
let pIndex = 0, cIndex = 0, deleting = false;

function type() {
  const word = phrases[pIndex];
  const speed = deleting ? 70 : 120;

  typedEl.textContent = word.substring(0, cIndex);

  if (!deleting && cIndex < word.length) cIndex++;
  else if (deleting && cIndex > 0) cIndex--;
  else {
    if (!deleting) { deleting = true; setTimeout(type, 1400); return; }
    deleting = false; pIndex = (pIndex + 1) % phrases.length;
  }
  setTimeout(type, speed);
}
document.addEventListener("DOMContentLoaded", type);

/* ========== FADE-IN ON SCROLL ========== */
const faders = document.querySelectorAll(".fade-in");
const obs = new IntersectionObserver((entries, observer) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("appear");
    observer.unobserve(e.target);
  });
}, { threshold: 0.2, rootMargin: "0px 0px -40px 0px" });
faders.forEach(el => obs.observe(el));

/* ========== SKILL MODAL ========== */
const skillInfo = {
  html: {
    title: "HTML",
    desc: "HyperText Markup Language — the skeleton of the web. Semantics, accessibility, and clean structure are key."
  },
  css: {
    title: "CSS",
    desc: "Cascading Style Sheets — responsive layouts (Flex/Grid), animations, variables, and theming."
  },
  js: {
    title: "JavaScript",
    desc: "The language of the web — DOM/APIs, async patterns, modules, bundling, and modern ES features."
  },
  react: {
    title: "React",
    desc: "Component-based UI with hooks, state management, and reusable patterns for scalable frontends."
  },
  git: {
    title: "Git & GitHub",
    desc: "Version control, branching strategies, pull requests, code reviews, and CI/CD basics."
  },
  py: {
    title: "Python",
    desc: "General-purpose: scripting, data tasks, simple APIs; strong ecosystem and readability."
  }
};

const modal = document.getElementById("skillModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeBtn = modal.querySelector(".close");
let lastFocused = null;

function openModal(key){
  const data = skillInfo[key];
  if (!data) return;
  modalTitle.textContent = data.title;
  modalDesc.textContent = data.desc;
  lastFocused = document.activeElement;
  modal.setAttribute("aria-hidden", "false");
  modal.style.display = "flex";
  // move focus to dialog
  closeBtn.focus();
  document.addEventListener("keydown", escClose);
}

function closeModal(){
  modal.setAttribute("aria-hidden", "true");
  modal.style.display = "none";
  document.removeEventListener("keydown", escClose);
  if (lastFocused) lastFocused.focus();
}

function escClose(e){
  if (e.key === "Escape") closeModal();
}

// Click handlers for skill buttons
document.querySelectorAll(".skill").forEach(btn => {
  btn.addEventListener("click", () => openModal(btn.dataset.skill));
  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal(btn.dataset.skill);
    }
  });
});

// Modal close actions
closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
