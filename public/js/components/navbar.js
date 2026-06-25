const navbar = document.querySelector(".navbar");
const toggle = document.querySelector(".navbar__toggle");
const menu = document.querySelector(".navbar__menu");

function setMenuState(isOpen) {
  toggle.setAttribute("aria-expanded", String(isOpen));
  menu.dataset.open = String(isOpen);
}

toggle.addEventListener("click", () => {
  const isOpen = toggle.getAttribute("aria-expanded") === "true";
  setMenuState(!isOpen);
});

document.addEventListener("click", (event) => {
  const isOpen = toggle.getAttribute("aria-expanded") === "true";

  if (isOpen && !navbar.contains(event.target)) {
    setMenuState(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuState(false);
    toggle.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.matchMedia("(min-width: 768px)").matches) {
    setMenuState(false);
  }
});
