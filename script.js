const MENU_ITEMS = [
  {
    name: "House Espresso",
    desc: "Chocolatey, balanced, and dialed-in daily. Available as single or double.",
    price: 30.5,
    category: "coffee",
    tag: "Classic",
  },
  {
    name: "Brown Sugar Oat Latte",
    desc: "Oat milk, cinnamon, brown sugar syrup, and a soft nutty finish.",
    price: 50.75,
    category: "coffee",
    tag: "Popular",
  },
  {
    name: "Cold Brew + Orange",
    desc: "Slow-steeped cold brew with a bright orange peel lift.",
    price: 50.25,
    category: "coffee",
    tag: "Seasonal",
  },
  {
    name: "Matcha Cloud",
    desc: "Ceremonial matcha, vanilla, and a lightly whipped oat foam.",
    price: 60.0,
    category: "tea",
    tag: "Silky",
  },
  {
    name: "Jasmine Green Tea",
    desc: "Floral, calming, and steeped to stay sweet—not bitter.",
    price: 40.25,
    category: "tea",
    tag: "Bright",
  },
  {
    name: "Spiced Chai",
    desc: "Black tea, ginger, cardamom, and clove with warm steamed milk.",
    price: 50.5,
    category: "tea",
    tag: "Cozy",
  },
  {
    name: "Butter Croissant",
    desc: "Flaky layers with cultured butter. Add jam for extra shine.",
    price: 40.25,
    category: "pastry",
    tag: "Baked",
  },
  {
    name: "Berry Almond Tart",
    desc: "Toasted almonds, vanilla custard, and seasonal berries.",
    price: 60.5,
    category: "pastry",
    tag: "Sweet",
  },
  {
    name: "GF Chocolate Cookie",
    desc: "Dark cocoa, sea salt, chewy center. Gluten-free by recipe.",
    price: 30.75,
    category: "pastry",
    tag: "GF",
  },
  {
    name: "Avocado Toast",
    desc: "Sourdough, lemon, herbs, chili, and a sprinkle of seeds.",
    price: 90.5,
    category: "brunch",
    tag: "Fresh",
  },
  {
    name: "Bloom Breakfast Bowl",
    desc: "Roasted sweet potato, greens, egg, tahini drizzle, crispy chickpeas.",
    price: 110.75,
    category: "brunch",
    tag: "Hearty",
  },
  {
    name: "Ricotta Pancakes",
    desc: "Lemon ricotta, maple, and a berry compote that tastes like Sunday.",
    price: 120.5,
    category: "brunch",
    tag: "Brunch",
  },
];

const GALLERY_SHOTS = [
  { key: "espresso", label: "Espresso + crema" },
  { key: "pastrycase", label: "Morning bakes" },
  { key: "sunlight", label: "Sunlit tables" },
  { key: "latte", label: "Latte art closeup" },
  { key: "brunchplate", label: "Brunch plate" },
  { key: "vinyl", label: "Vinyl corner" },
];

function $(sel, root = document) {
  return root.querySelector(sel);
}
function $all(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}
function money(v) {
  // Display prices in Indian Rupees.
  return `₹${v.toFixed(2)}`;
}
function menuImageKeyFor(it) {
  const name = String(it.name ?? "").toLowerCase();

  // Coffee
  if (name === "house espresso") return "espresso-shot";
  if (name === "brown sugar oat latte") return "oat-latte";
  if (name === "cold brew + orange") return "coldbrew-orange";

  // Tea
  if (name === "matcha cloud") return "matcha";
  if (name === "jasmine green tea") return "green-tea";
  if (name === "spiced chai") return "chai";

  // Pastry
  if (name === "butter croissant") return "croissant";
  if (name === "berry almond tart") return "tart";
  if (name === "gf chocolate cookie") return "cookie";

  // Brunch
  if (name === "avocado toast") return "avocado-toast";
  if (name === "bloom breakfast bowl") return "breakfast-bowl";
  if (name === "ricotta pancakes") return "pancakes";

  return "espresso-shot"; // safe fallback
}

function renderMenu(items, limit = null) {
  const grid = $("#menuGrid");
  if (!grid) return;

  const list = limit ? items.slice(0, limit) : items;

  grid.innerHTML = list
    .map((it) => {
      const safeCat = it.category;
      const imgKey = menuImageKeyFor(it);
      return `
        <article class="item" data-cat="${safeCat}" data-img-key="${imgKey}">
          <div class="item__img" aria-hidden="true"></div>
          <div class="item__top">
            <div>
              <h3 class="item__name">${it.name}</h3>
            </div>
            <span class="item__tag">${it.tag}</span>
          </div>
          <p class="item__desc">${it.desc}</p>
          <div class="item__bottom">
            <span class="price">${money(it.price)}</span>
            <span class="pill">${safeCat}</span>
          </div>
        </article>
      `;
    })
    .join("");
}

function setupMenuItemImages() {
  const cards = $all(".item[data-img-key]");
  cards.forEach((card) => {
    const key = card.dataset.imgKey;
    const imgEl = card.querySelector(".item__img");
    if (!key || !imgEl) return;
    imgEl.style.setProperty("--img-url", imageFor(key));
  });
}

function setupMenuFiltering() {
  const chips = $all("[data-filter]");
  if (!chips.length) return;

  const setActive = (btn) => {
    chips.forEach((c) => {
      const on = c === btn;
      c.classList.toggle("is-active", on);
      c.setAttribute("aria-selected", on ? "true" : "false");
    });
  };

  const apply = (filter) => {
    const cards = $all(".item");
    cards.forEach((card) => {
      const show = filter === "all" || card.dataset.cat === filter;
      card.classList.toggle("is-hidden", !show);
    });
  };

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const filter = chip.dataset.filter;
      setActive(chip);
      apply(filter);
    });
  });
}

const IMAGE_URLS = {
  // Hero / story
  "latte-art": "img/lart.avif",
  pastry: "img/crossiant.avif",
  brunch: "img/atoast.avif",
  interior: "img/interior.avif",

  // Gallery
  espresso: "img/aespresso.avif",
  pastrycase: "img/pcase.webp",
  sunlight: "img/sunlight.avif",
  latte: "img/latte.avif",
  brunchplate: "img/brunchplate.avif",
  vinyl: "img/vinyl.avif",

  "espresso-shot": "img/hespresso.avif",
  "oat-latte": "img/olatte.avif",
  "coldbrew-orange": "img/coldbrewo.avif",
  matcha: "img/matcha.avif",
  "green-tea": "img/greent.avif",
  chai: "img/chai.avif",
  croissant: "img/crossiant.avif",
  tart: "img/tart.avif",
  cookie: "img/cookie.avif",
  "avocado-toast": "img/atoast.avif",
  "breakfast-bowl": "img/bbowl.avif",
  pancakes: "img/pancakes.avif",
};

function imageUrlFor(key) {
  return IMAGE_URLS[key] ?? IMAGE_URLS["espresso-shot"];
}

function imageFor(key) {
  return `url("${imageUrlFor(key)}")`;
}

function lightboxUrlFor(keyOrPath) {
  const path = Object.prototype.hasOwnProperty.call(IMAGE_URLS, keyOrPath)
    ? IMAGE_URLS[keyOrPath]
    : keyOrPath;
  const safe = String(path ?? "").replace(/"/g, '\\"');
  return `url("${safe}")`;
}

function lightboxLabelFromKey(k) {
  return String(k ?? "")
    .split(/[-_]/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function buildGalleryDeckFromDom() {
  const grid = $("#galleryGrid");
  if (!grid) return [];
  return $all(".shot[data-shot]", grid).map((btn) => ({
    key: btn.dataset.shot,
    label: String(btn.dataset.label ?? "").trim() || lightboxLabelFromKey(btn.dataset.shot),
  })).filter((s) => s.key && Object.prototype.hasOwnProperty.call(IMAGE_URLS, s.key));
}

function slideToBgUrl(s) {
  return lightboxUrlFor(s.key);
}

function setupDataImageBackgrounds() {
  const els = $all("[data-image]");
  els.forEach((el) => {
    const key = el.dataset.image;
    if (!key) return;
    const imgVar = imageFor(key);
    el.style.setProperty("--img-url", imgVar);
  });
}

function setupGalleryImageBackgrounds() {
  const shots = $all(".shot[data-shot]");
  shots.forEach((btn) => {
    const key = btn.dataset.shot;
    if (!key) return;
    btn.querySelector(".shot__img")?.style.setProperty("--img-url", imageFor(key));
  });
}

function renderGallery() {
  const grid = $("#galleryGrid");
  if (!grid) return;

  grid.innerHTML = GALLERY_SHOTS.map((s, i) => {
    const span = i === 0 ? 6 : 4;
    const minH = i === 0 ? 220 : 190;
    const imgVar = imageFor(s.key);
    return `
      <button class="shot" type="button" data-shot="${s.key}" data-label="${s.label}" style="grid-column: span ${span}; min-height:${minH}px;">
        <span class="sr-only">Open photo: ${s.label}</span>
        <span class="shot__img" aria-hidden="true"></span>
        <span class="shot__cap" aria-hidden="true">${s.label}</span>
      </button>
    `;
  }).join("");
}

/** Homepage-only preview: links to the gallery page (no lightbox here). */
function renderGalleryPreviewSmol(numb) {
  const listb = numb ? GALLERY_SHOTS.slice(0, numb) : GALLERY_SHOTS;
  const grid = $("#galleryPreview");
  if (!grid) return;

  grid.innerHTML = listb
    .map((s, i) => {
      const span = i === 0 ? 6 : 4;
      const minH = i === 0 ? 220 : 190;
      return `
      <a class="shot shot--preview" href="gallery.html" data-shot="${s.key}" data-label="${s.label}" style="grid-column: span ${span}; min-height:${minH}px;">
        <span class="sr-only">${s.label} — open full gallery</span>
        <span class="shot__img" aria-hidden="true"></span>
        <span class="shot__cap" aria-hidden="true">${s.label}</span>
      </a>
    `;
    })
    .join("");
}

function setupThemeToggle() {
  const btn3 = document.getElementById("themeToggle");
  if (!btn3) return;

  const getPreferredTheme = () => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    const prefersLight = window.matchMedia?.("(prefers-color-scheme: light)")?.matches;
    return prefersLight ? "light" : "dark";
  };

  const applyTheme = (theme) => {
    const isLight = theme === "light";
    document.body.classList.toggle("light", isLight);
    btn3.textContent = isLight ? "🌙" : "☀️";
    btn3.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
    btn3.setAttribute("title", isLight ? "Switch to dark mode" : "Switch to light mode");
  };

  const currentTheme = getPreferredTheme();
  applyTheme(currentTheme);
  localStorage.setItem("theme", currentTheme);

  btn3.addEventListener("click", () => {
    const isLight = document.body.classList.contains("light");
    const nextTheme = isLight ? "dark" : "light";
    applyTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  });
}
function patchLightboxNav(lb) {
  const panel = $(".lightbox__panel", lb);
  if (!panel || $(".lightbox__nav", panel)) return;

  const prev = document.createElement("button");
  prev.type = "button";
  prev.className = "lightbox__nav lightbox__nav--prev";
  prev.id = "lightboxPrev";
  prev.setAttribute("aria-label", "Previous image");
  prev.innerHTML = "&#8249;";

  const next = document.createElement("button");
  next.type = "button";
  next.className = "lightbox__nav lightbox__nav--next";
  next.id = "lightboxNext";
  next.setAttribute("aria-label", "Next image");
  next.innerHTML = "&#8250;";

  const closeBtn = $(".lightbox__close", panel);
  if (closeBtn) closeBtn.insertAdjacentElement("afterend", prev);
  else panel.insertAdjacentElement("afterbegin", prev);
  prev.insertAdjacentElement("afterend", next);
}

function ensureLightbox() {
  let lb = $("#lightbox");
  if (lb) {
    patchLightboxNav(lb);
    return lb;
  }
  lb = document.createElement("div");
  lb.id = "lightbox";
  lb.className = "lightbox lightbox--no-gallery-nav";
  lb.setAttribute("aria-hidden", "true");
  lb.innerHTML = `
    <div class="lightbox__backdrop" data-close></div>
    <figure class="lightbox__panel" role="dialog" aria-modal="true" aria-label="Image preview">
      <button class="lightbox__close" type="button" data-close aria-label="Close">×</button>
      <button class="lightbox__nav lightbox__nav--prev" type="button" id="lightboxPrev" aria-label="Previous image">&#8249;</button>
      <button class="lightbox__nav lightbox__nav--next" type="button" id="lightboxNext" aria-label="Next image">&#8250;</button>
      <div class="lightbox__img" id="lightboxImg"></div>
      <figcaption class="lightbox__cap" id="lightboxCap"></figcaption>
    </figure>
  `;
  document.body.appendChild(lb);
  return lb;
}

function isGalleryPage() {
  const path = window.location.pathname.replace(/\\/g, "/").toLowerCase();
  return path.endsWith("gallery.html");
}

function setupLightbox() {
  if (!isGalleryPage() || !$("#galleryGrid")) return;

  const lb = ensureLightbox();
  const img = $("#lightboxImg", lb);
  const cap = $("#lightboxCap", lb);
  const prevBtn = $("#lightboxPrev", lb);
  const nextBtn = $("#lightboxNext", lb);
  if (!img || !cap) return;

  let deck = [];
  let idx = 0;
  let galleryMode = false;

  const updateGalleryNav = () => {
    const showCarousel = galleryMode && deck.length > 1;
    lb.classList.toggle("lightbox--no-gallery-nav", !showCarousel);
  };

  const showSlide = (i) => {
    if (!deck.length) return;
    idx = ((i % deck.length) + deck.length) % deck.length;
    const s = deck[idx];
    img.style.setProperty("--img-url", slideToBgUrl(s));
    cap.textContent = s.label;
    updateGalleryNav();
  };

  const openSingle = (keyOrPath, label) => {
    galleryMode = false;
    if (Object.prototype.hasOwnProperty.call(IMAGE_URLS, keyOrPath)) {
      deck = [
        {
          key: keyOrPath,
          label: label?.trim() || lightboxLabelFromKey(keyOrPath),
        },
      ];
    } else {
      deck = [{ src: keyOrPath, label: label?.trim() || "Photo" }];
    }
    idx = 0;
    showSlide(0);
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const openGallery = (key, label) => {
    galleryMode = true;
    deck = buildGalleryDeckFromDom();
    if (!deck.length) {
      openSingle(key, label);
      return;
    }
    let i = deck.findIndex((s) => s.key === key);
    if (i < 0) i = 0;
    if (label?.trim()) deck[i] = { ...deck[i], label: label.trim() };
    idx = i;
    showSlide(idx);
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    galleryMode = false;
    lb.classList.remove("is-open");
    lb.classList.add("lightbox--no-gallery-nav");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const step = (delta) => {
    if (!galleryMode || !lb.classList.contains("is-open") || deck.length <= 1) return;
    showSlide(idx + delta);
  };

  prevBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    step(-1);
  });
  nextBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    step(1);
  });

  document.addEventListener("click", (e) => {
    if (e.target.closest("#lightbox")) return;

    const shot = e.target.closest("#galleryGrid .shot");
    if (!shot?.dataset?.shot) return;
    e.preventDefault();
    openGallery(shot.dataset.shot, shot.dataset.label || "");
  });

  lb.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) close();
  });

  window.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") {
      close();
      return;
    }
    if (!galleryMode || deck.length <= 1) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    }
  });
}

function setupTopbarElevation() {
  const topbar = $("[data-elevate]");
  if (!topbar) return;

  const onScroll = () => {
    topbar.classList.toggle("is-elevated", window.scrollY > 6);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function setupMobileNav() {
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.querySelector("#navMenu");

  if (!toggle || !menu) return;

  const close = () => {
    toggle.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
  };

  const open = () => {
    toggle.setAttribute("aria-expanded", "true");
    menu.classList.add("is-open");
  };

  // ✅ FIX: stop click bubbling (prevents instant close on mobile)
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    isOpen ? close() : open();
  });

  

  

  // Close when clicking a link
  menu.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a) close();
  });

  // Close on resize (desktop)
  window.addEventListener("resize", () => {
    if (window.innerWidth > 680) close();
  });

  // ESC key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  // Click outside
  document.addEventListener("click", (e) => {
    if (window.innerWidth > 680) return;

    if (menu.classList.contains("is-open")) {
      const within = e.target.closest(".nav");
      if (!within) close();
    }
  });
}

function setupReveal() {
  const els = $all(".reveal");
  if (!els.length) return;

  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (prefersReduced) {
    els.forEach((el) => el.classList.add("is-in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
  );

  els.forEach((el) => io.observe(el));
}

function setupReservationForm() {
  const form = $("#reserveForm");
  const toast = $("#formToast");
  const toastMsg = $("#toastMsg");
  if (!form || !toast || !toastMsg) return;

  const fields = ["name", "phone", "date", "time", "guests"];

  const setError = (name, msg) => {
    const input = form.elements[name];
    const field = input?.closest(".field");
    const hint = form.querySelector(`[data-error-for="${name}"]`);
    if (field) field.classList.toggle("is-invalid", Boolean(msg));
    if (hint) hint.textContent = msg ?? "";
  };

  const validate = () => {
    let ok = true;
    fields.forEach((n) => setError(n, ""));

    const name = form.elements.name?.value?.trim() ?? "";
    const phone = form.elements.phone?.value?.trim() ?? "";
    const date = form.elements.date?.value ?? "";
    const time = form.elements.time?.value ?? "";
    const guests = form.elements.guests?.value ?? "";

    if (name.length < 2) {
      ok = false;
      setError("name", "Please enter your name.");
    }

    const digits = phone.replace(/[^\d]/g, "");
    if (digits.length < 10) {
      ok = false;
      setError("phone", "Please enter a valid phone number (10+ digits).");
    }

    if (!date) {
      ok = false;
      setError("date", "Pick a date.");
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const chosen = new Date(`${date}T00:00:00`);
      if (chosen < today) {
        ok = false;
        setError("date", "Date can’t be in the past.");
      }
    }

    if (!time) {
      ok = false;
      setError("time", "Pick a time.");
    }

    if (!guests) {
      ok = false;
      setError("guests", "Select number of guests.");
    }

    return ok;
  };

  const showToast = (msg) => {
    toastMsg.textContent = msg;
    toast.hidden = false;
  };

  const hideToast = () => {
    toast.hidden = true;
  };

  toast.querySelector(".toast__close")?.addEventListener("click", hideToast);

  form.addEventListener("input", (e) => {
    const input = e.target;
    if (!(input instanceof HTMLElement)) return;
    const name = input.getAttribute("name");
    if (name && fields.includes(name)) setError(name, "");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    hideToast();
    if (!validate()) return;

    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const date = String(data.get("date") ?? "");
    const time = String(data.get("time") ?? "");
    const guests = String(data.get("guests") ?? "");
    const occasion = String(data.get("occasion") ?? "").trim();

    const extra = occasion ? ` Occasion: ${occasion}.` : "";
    showToast(`Thanks, ${name}. Table for ${guests} on ${date} at ${time}.${extra}`);

    form.reset();
  });
}

function setMinDate() {
  const date = document.querySelector('input[type="date"][name="date"]');
  if (!(date instanceof HTMLInputElement)) return;
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  date.min = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function setupYear() {
  const y = $("#year");
  if (y) y.textContent = String(new Date().getFullYear());
}

function setupSmoothCloseOnHash() {
  window.addEventListener("hashchange", () => {
    const menu = $("#navMenu");
    const toggle = $(".nav__toggle");
    if (menu?.classList.contains("is-open")) menu.classList.remove("is-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  });
}

/** E.164-style digits only (country code + number, no + or spaces) for https://wa.me/ */
const WHATSAPP_WA_ME = "919876543210";
const WHATSAPP_DISPLAY = "+91 98765 43210";

function setupWhatsAppFloat() {
  if ($("#waFloatRoot")) return;

  const root = document.createElement("div");
  root.id = "waFloatRoot";
  root.innerHTML = `
    <button type="button" class="wa-float" id="waFloatBtn" aria-label="WhatsApp us" aria-expanded="false" aria-controls="waPopup">
      <img src="img/whatapp.png" alt="" width="40" height="40" decoding="async" />
      <span class="wa-float__fallback" hidden aria-hidden="true">💬</span>
    </button>
    <div class="wa-popup" id="waPopup" role="dialog" aria-modal="true" aria-labelledby="waPopupTitle" hidden>
      <div class="wa-popup__backdrop" data-wa-close></div>
      <div class="wa-popup__panel">
        <button type="button" class="wa-popup__close" data-wa-close aria-label="Close">×</button>
        <h2 id="waPopupTitle" class="wa-popup__title">Chat on WhatsApp</h2>
        <p class="wa-popup__label">Reach us at</p>
        <p class="wa-popup__num">${WHATSAPP_DISPLAY}</p>
        <a class="btn btn--primary wa-popup__cta" href="https://wa.me/${WHATSAPP_WA_ME}" target="_blank" rel="noopener noreferrer">Continue to WhatsApp</a>
      </div>
    </div>
  `;
  document.body.appendChild(root);

  const btn = $("#waFloatBtn", root);
  const popup = $("#waPopup", root);
  const floatImg = root.querySelector(".wa-float img");
  const fallback = root.querySelector(".wa-float__fallback");

  floatImg?.addEventListener("error", () => {
    floatImg.style.display = "none";
    if (fallback) fallback.hidden = false;
  });

  const openWa = () => {
    popup.hidden = false;
    popup.classList.add("is-open");
    btn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  const closeWa = () => {
    popup.classList.remove("is-open");
    popup.hidden = true;
    btn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  btn?.addEventListener("click", (e) => {
    e.stopPropagation();
    openWa();
  });

  popup?.addEventListener("click", (e) => {
    if (e.target.closest("[data-wa-close]")) closeWa();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popup?.classList.contains("is-open")) closeWa();
  });
}

function init() {
  const path = window.location.pathname.replace(/\\/g, "/").toLowerCase();

  const isHome =
    path === "/" || path.endsWith("/") || path.endsWith("index.html");
  const onGallery = path.endsWith("gallery.html");

  if (isHome) {
    renderMenu(MENU_ITEMS, 3); // 👈 only 6 items on homepage
  } else {
    renderMenu(MENU_ITEMS); // 👈 full menu on menu.html
  }
  setupMenuItemImages();
  if (isHome) {
    renderGalleryPreviewSmol(3);
  } else if (onGallery) {
    renderGallery();
  }
  setupDataImageBackgrounds();
  setupGalleryImageBackgrounds();
  setupMenuFiltering();
  setupLightbox();
  setupTopbarElevation();
  setupMobileNav();
  setupThemeToggle();
  setupReveal();
  setupReservationForm();
  setupYear();
  setMinDate();
  setupSmoothCloseOnHash();
  setupWhatsAppFloat();
}

document.addEventListener("DOMContentLoaded", init);

