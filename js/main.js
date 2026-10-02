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

const i18n = {
  EN: {
    htmlLang: "en",
    dir: "ltr",
    langLabel: "Selected English language",
    login: "Log in",
    signup: "Sign up for free delivery",
    locLabelDefault: "New address",
    locValueDefault: "Select your address",
    locLabelActive: "Delivering to",
    locTip: "You're viewing a generic location. Updating it helps us find restaurants or shops near you.",
    delivery: "Delivery",
    pickup: "Pick-up",
    pandamart: "pandamart",
    shops: "Shops",
    eyebrow: "Delivery in about 30 minutes",
    headline: "It's the food you love, delivered.",
    lead: "Find restaurants and shops near you. Enter your address and we'll show what's open right now.",
    addressPh: "Enter your street or area",
    findFood: "Find food",
    searchEmpty: "Enter an address to continue.",
    searchFound: (area) => `Showing sample restaurants that deliver to ${area}.`,
    cartTitle: "Your cart is empty",
    cartBody: "Add items from a restaurant to start an order.",
    cartAria: "Your cart is empty",
    account: "Account",
    craving: "What are you craving?",
    cravingLead: "Browse by category and order in a few taps.",
    popular: "Popular near you",
    popularLead: "Outlets from the foodpanda list. Ratings on this page are sample data.",
    how: "How it works",
    howLead: "Three steps from hungry to delivered.",
    cities: "Cities we deliver in",
    citiesLead: "Sample cities for this landing page.",
    partner: "Grow with foodpanda",
    partnerLead: "List your restaurant, or earn by delivering orders in your city.",
    addRestaurant: "Add your restaurant",
    becomeRider: "Become a rider",
    tabNotes: {
      delivery: "Delivery restaurants near you. Ratings are sample data for this page.",
      pickup: "Pick-up spots near you. Ratings are sample data for this page.",
      pandamart: "pandamart groceries and essentials. Sample categories for this page.",
      shops: "Shops near you. Sample categories for this page.",
    },
  },
  UR: {
    htmlLang: "ur",
    dir: "rtl",
    langLabel: "منتخب زبان اردو",
    login: "لاگ اِن",
    signup: "مفت ڈیلیوری کے لیے سائن اَپ",
    locLabelDefault: "نیا پتہ",
    locValueDefault: "اپنا پتہ منتخب کریں",
    locLabelActive: "ڈیلیوری یہاں",
    locTip: "آپ ایک عمومی مقام دیکھ رہے ہیں۔ پتہ اپڈیٹ کرنے سے قریبی ریسٹورنٹس ملنا آسان ہوتا ہے۔",
    delivery: "ڈیلیوری",
    pickup: "پِک اَپ",
    pandamart: "پینڈامارٹ",
    shops: "شاپس",
    eyebrow: "تقریباً ۳۰ منٹ میں ڈیلیوری",
    headline: "وہ کھانا جو آپ پسند کرتے ہیں، گھر تک۔",
    lead: "اپنے قریب ریسٹورنٹس اور شاپس تلاش کریں۔ پتہ لکھیں، ہم بتائیں گے کیا کھلا ہے۔",
    addressPh: "اپنا علاقہ یا گلی لکھیں",
    findFood: "کھانا تلاش کریں",
    searchEmpty: "جاری رکھنے کے لیے پتہ لکھیں۔",
    searchFound: (area) => `${area} کے لیے نمونہ ریسٹورنٹس دکھائے جا رہے ہیں۔`,
    cartTitle: "آپ کی کارٹ خالی ہے",
    cartBody: "آرڈر شروع کرنے کے لیے ریسٹورنٹ سے آئٹمز شامل کریں۔",
    cartAria: "آپ کی کارٹ خالی ہے",
    account: "اکاؤنٹ",
    craving: "کیا کھانا چاہتے ہیں؟",
    cravingLead: "کیٹگری دیکھیں اور چند ٹیپ میں آرڈر کریں۔",
    popular: "آپ کے قریب مقبول",
    popularLead: "فوڈ پانڈا لسٹ کے آؤٹ لیٹس۔ ریٹنگز اس صفحے کے لیے نمونہ ڈیٹا ہیں۔",
    how: "کیسے کام کرتا ہے",
    howLead: "بھوک سے ڈیلیوری تک تین قدم۔",
    cities: "شہر جہاں ڈیلیوری ہے",
    citiesLead: "اس لینڈنگ صفحے کے نمونہ شہر۔",
    partner: "فوڈ پانڈا کے ساتھ بڑھیں",
    partnerLead: "اپنا ریسٹورنٹ شامل کریں، یا اپنے شہر میں ڈیلیوری کر کے کمائیں۔",
    addRestaurant: "اپنا ریسٹورنٹ شامل کریں",
    becomeRider: "رائیڈر بنیں",
    tabNotes: {
      delivery: "آپ کے قریب ڈیلیوری ریسٹورنٹس۔ ریٹنگز نمونہ ڈیٹا ہیں۔",
      pickup: "آپ کے قریب پِک اَپ جگہیں۔ ریٹنگز نمونہ ڈیٹا ہیں۔",
      pandamart: "پینڈامارٹ گروسری۔ اس صفحے کی نمونہ کیٹگریز۔",
      shops: "آپ کے قریب شاپس۔ نمونہ کیٹگریز۔",
    },
  },
};

let currentLang = "EN";

function t() {
  return i18n[currentLang] || i18n.EN;
}

function applyLanguage(code) {
  const pack = i18n[code];
  if (!pack) return;
  currentLang = code;

  document.documentElement.lang = pack.htmlLang;
  document.documentElement.dir = pack.dir;

  if (langCode) langCode.textContent = code;
  langBtn?.setAttribute("aria-label", pack.langLabel);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const value = pack[key];
    if (typeof value === "string") el.textContent = value;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    const value = pack[key];
    if (typeof value === "string") el.placeholder = value;
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.dataset.i18nAria;
    const value = pack[key];
    if (typeof value === "string") el.setAttribute("aria-label", value);
  });

  const selectedTab = document.querySelector(".tab.is-selected");
  if (orderNote && selectedTab && pack.tabNotes[selectedTab.dataset.tab]) {
    orderNote.textContent = pack.tabNotes[selectedTab.dataset.tab];
  }

  if (locLabel && locValue) {
    const hasAddress = addressInput?.value.trim();
    if (hasAddress) {
      locLabel.textContent = pack.locLabelActive;
    } else if (locLabel.textContent === i18n.EN.locLabelDefault || locLabel.textContent === i18n.UR.locLabelDefault || locLabel.textContent === i18n.EN.locLabelActive || locLabel.textContent === i18n.UR.locLabelActive) {
      locLabel.textContent = pack.locLabelDefault;
      if (!hasAddress) locValue.textContent = pack.locValueDefault;
    }
  }
}

if (langBtn && langMenu) {
  langBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    const open = langMenu.hidden;
    langMenu.hidden = !open;
    langBtn.setAttribute("aria-expanded", String(open));
    if (open) closeCart();
  });

  langMenu.addEventListener("click", (event) => {
    const choice = event.target.closest("[data-lang]");
    if (!choice) return;
    event.stopPropagation();
    langMenu.querySelectorAll("[data-lang]").forEach((button) => {
      button.removeAttribute("aria-current");
    });
    choice.setAttribute("aria-current", "true");
    applyLanguage(choice.dataset.lang);
    closeLang();
    closeMenu();
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
    const notes = t().tabNotes;
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
  if (locLabel) locLabel.textContent = t().locLabelActive;
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
  searchNote.textContent = area ? t().searchFound(area) : t().searchEmpty;
  if (area) {
    const restaurants = document.querySelector("#restaurants");
    if (restaurants) restaurants.scrollIntoView({ behavior: "smooth", block: "start" });
  }
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
