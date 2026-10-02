const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion) {
  document.querySelectorAll(".reveal").forEach((el) => {
    const group = [...el.parentElement.querySelectorAll(":scope > .reveal")];
    const index = group.indexOf(el);
    if (index > 0) {
      const delay = Math.min(index, 5) * 50;
      el.style.setProperty("--d", `${delay}ms`);
    }
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -4% 0px" });

  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
}

const nav = document.querySelector("#nav");
const menuToggle = document.querySelector(".account-toggle");
const menuClose = document.querySelector(".header__menu-close");
const navScrim = document.querySelector("#nav-scrim");
const siteHeader = document.querySelector("#site-header");
const searchForm = document.querySelector("#search-form");
const addressInput = document.querySelector("#address");
const searchNote = document.querySelector("#search-note");
const modal = document.querySelector("#modal");
const modalForm = document.querySelector("#modal-form");
const modalTitle = document.querySelector("#modal-title");
const modalText = document.querySelector("#modal-text");
const modalStatus = document.querySelector("#modal-status");
const modalClose = document.querySelector("#modal-close");
const topbar = document.querySelector("#topbar");
const langBtn = document.querySelector(".lang__btn");
const langMenu = document.querySelector("#lang-menu");
const langCode = document.querySelector("#lang-code");
const cartBtn = document.querySelector("#cart-btn");
const cartPanel = document.querySelector("#cart-panel");
const locLabel = document.querySelector("#loc-label");
const locValue = document.querySelector("#loc-value");
const orderNote = document.querySelector("#order-note");

const modalCopy = {
  login: {
    title: "Log in",
    text: "Use your email to get back to your orders.",
    submit: "Log in",
  },
  signup: {
    title: "Create an account",
    text: "Sign up to save addresses and reorder faster.",
    submit: "Sign up",
  },
  partner: {
    title: "Add your restaurant",
    text: "Tell us how to reach you. This form stays on this page.",
    submit: "Send",
  },
  rider: {
    title: "Become a rider",
    text: "Leave an email and we'll pretend a recruiter wrote back.",
    submit: "Apply",
  },
  business: {
    title: "Business account",
    text: "Tell us how to reach your team. This form stays on this page.",
    submit: "Send",
  },
};

function setMenuOpen(open) {
  if (!nav || !menuToggle) return;
  nav.classList.toggle("is-open", open);
  document.body.classList.toggle("nav-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close account menu" : "Account menu");
  if (navScrim) navScrim.hidden = !open;
}

function closeMenu() {
  setMenuOpen(false);
}

function closeLang() {
  if (!langMenu || !langBtn) return;
  langMenu.hidden = true;
  langBtn.setAttribute("aria-expanded", "false");
}

function closeCart() {
  if (!cartPanel || !cartBtn) return;
  cartPanel.hidden = true;
  cartBtn.setAttribute("aria-expanded", "false");
}

if (siteHeader) {
  const syncStuck = () => {
    siteHeader.classList.toggle("is-stuck", window.scrollY > 8);
  };
  syncStuck();
  window.addEventListener("scroll", syncStuck, { passive: true });
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const open = !nav.classList.contains("is-open");
    setMenuOpen(open);
    if (open) {
      closeLang();
      closeCart();
    }
  });

  menuClose?.addEventListener("click", closeMenu);
  navScrim?.addEventListener("click", closeMenu);

  nav.addEventListener("click", (event) => {
    if (event.target.closest("[data-open]")) closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 1041px)").matches) closeMenu();
  });
}

if (langBtn && langMenu) {
  langBtn.addEventListener("click", () => {
    const open = langMenu.hidden;
    langMenu.hidden = !open;
    langBtn.setAttribute("aria-expanded", String(open));
    if (open) closeCart();
  });

  langMenu.addEventListener("click", (event) => {
    const choice = event.target.closest("[data-lang]");
    if (!choice) return;
    langCode.textContent = choice.dataset.lang;
    langMenu.querySelectorAll("[data-lang]").forEach((button) => {
      button.removeAttribute("aria-current");
    });
    choice.setAttribute("aria-current", "true");
    langBtn.setAttribute("aria-label", `Selected ${choice.textContent.trim()} language`);
    closeLang();
  });
}

if (cartBtn && cartPanel) {
  cartBtn.addEventListener("click", () => {
    const open = cartPanel.hidden;
    cartPanel.hidden = !open;
    cartBtn.setAttribute("aria-expanded", String(open));
    if (open) closeLang();
  });
}

document.querySelector("#loc-btn")?.addEventListener("click", () => {
  addressInput.scrollIntoView({ behavior: "smooth", block: "center" });
  addressInput.focus();
});

document.querySelector(".topbar__close")?.addEventListener("click", () => {
  if (topbar) topbar.hidden = true;
});

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((item) => {
      const selected = item === tab;
      item.classList.toggle("is-selected", selected);
      item.setAttribute("aria-selected", String(selected));
    });
    const notes = {
      delivery: "Delivery restaurants near you. Ratings are sample data for this page.",
      pickup: "Pick-up spots near you. Ratings are sample data for this page.",
      pandamart: "pandamart groceries and essentials. Sample categories for this page.",
      shops: "Shops near you. Sample categories for this page.",
    };
    if (orderNote && notes[tab.dataset.tab]) orderNote.textContent = notes[tab.dataset.tab];
    const target = document.getElementById(tab.dataset.target);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.addEventListener("click", (event) => {
  if (langMenu && !langMenu.hidden && !event.target.closest(".lang")) closeLang();
  if (cartPanel && !cartPanel.hidden && !event.target.closest(".cart")) closeCart();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (nav?.classList.contains("is-open")) closeMenu();
  closeLang();
  closeCart();
});

function showArea(area) {
  addressInput.value = area;
  if (locLabel) locLabel.textContent = "Delivering to";
  if (locValue) locValue.textContent = area;
}

document.querySelectorAll("[data-area]").forEach((button) => {
  button.addEventListener("click", () => {
    showArea(button.dataset.area);
    addressInput.focus();
    searchNote.textContent = "";
  });
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const area = addressInput.value.trim();
  if (area) showArea(area);
  searchNote.textContent = area
    ? `Showing sample restaurants that deliver to ${area}.`
    : "Enter an address to continue.";
});

let modalClosing = false;

function closeModal() {
  if (!modal.open || modalClosing) return;
  if (reduceMotion) {
    modal.close();
    return;
  }
  modalClosing = true;
  modal.classList.add("is-closing");
  modal.addEventListener("animationend", () => {
    modal.classList.remove("is-closing");
    modalClosing = false;
    modal.close();
  }, { once: true });
}

document.querySelectorAll("[data-open]").forEach((button) => {
  button.addEventListener("click", () => {
    const copy = modalCopy[button.dataset.open];
    if (!copy) return;
    modalTitle.textContent = copy.title;
    modalText.textContent = copy.text;
    modalForm.querySelector("#modal-submit").textContent = copy.submit;
    modalStatus.textContent = "";
    modalForm.reset();
    modal.classList.remove("is-closing");
    modal.showModal();
  });
});

modal.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeModal();
});

modalClose.addEventListener("click", closeModal);

modalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = new FormData(modalForm).get("email");
  modalStatus.textContent = `Saved locally for ${email}. Nothing was sent.`;
  modalForm.reset();
});
