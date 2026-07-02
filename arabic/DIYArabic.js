const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const navbar = document.querySelector(".diy-navbar");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    mobileMenu?.setAttribute("aria-hidden", String(!isOpen));
  });
}

document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    mobileMenu?.setAttribute("aria-hidden", "true");
  });
});

/* Navbar scroll state */
window.addEventListener("scroll", () => {
  navbar?.classList.toggle("nav-scrolled", window.scrollY > 40);
});

/* Premium section reveal */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.16,
  rootMargin: "0px 0px -8% 0px"
});

document.querySelectorAll(".section-reveal").forEach((section) => {
  revealObserver.observe(section);
});

/* Stagger card animations */
const animatedItems = document.querySelectorAll(
  ".industry-card, .template-card, .benefit-grid div, .process-line div, .compare-grid article, .faq-item"
);

animatedItems.forEach((item, index) => {
  item.classList.add("animated-item");
  item.style.setProperty("--delay", `${(index % 6) * 0.08}s`);
});

const itemObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("item-visible");
      itemObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.18
});

animatedItems.forEach((item) => itemObserver.observe(item));

/* Active nav link */
const sectionIds = ["top", "industries", "templates", "personalizer", "faq", "contact"];
const navLinks = document.querySelectorAll(".nav-links a[href^='#']");

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    }
  });
}, {
  threshold: 0.45
});

sectionIds.forEach((id) => {
  const section = document.getElementById(id);
  if (section) activeObserver.observe(section);
});

/* Subtle hero parallax */
const heroShowcase = document.querySelector(".hero-showcase");
const heroContent = document.querySelector(".hero-content");
const heroOrbOne = document.querySelector(".hero-orb-one");
const heroOrbTwo = document.querySelector(".hero-orb-two");

window.addEventListener("scroll", () => {
  const y = window.scrollY;

  if (y < window.innerHeight) {
    heroShowcase?.style.setProperty("transform", `translateY(${y * 0.035}px)`);
    heroContent?.style.setProperty("transform", `translateY(${y * -0.018}px)`);
    heroOrbOne?.style.setProperty("transform", `translateY(${y * 0.05}px)`);
    heroOrbTwo?.style.setProperty("transform", `translateY(${y * -0.04}px)`);
  }
});

/* FAQ */
document.querySelectorAll(".faq-item").forEach((item) => {
  item.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item").forEach((faq) => faq.classList.remove("open"));
    if (!isOpen) item.classList.add("open");
  });
});

/* Personalizer */
const generateBtn = document.getElementById("generatePreview");
const businessName = document.getElementById("businessName");
const industry = document.getElementById("industry");
const styleSelect = document.getElementById("style");
const previewName = document.getElementById("previewName");
const previewMeta = document.getElementById("previewMeta");

if (generateBtn) {
  generateBtn.addEventListener("click", () => {
    const name = businessName.value.trim() || "نشاطك التجاري";
    const selectedIndustry = industry.value;
    const selectedStyle = styleSelect.value;

    previewName.textContent = name;
    previewMeta.textContent = `${selectedIndustry} • ${selectedStyle}`;

    document.querySelector(".generated-preview")?.animate([
      { transform: "scale(0.96)", opacity: 0.65, filter: "blur(6px)" },
      { transform: "scale(1)", opacity: 1, filter: "blur(0)" }
    ], {
      duration: 520,
      easing: "cubic-bezier(.2,.8,.2,1)"
    });
  });
}

/* Atelier transition back to Arabic main */
document.querySelectorAll(".atelier-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const href = link.href;
    const transition = document.getElementById("atelierTransition");

    if (!transition) {
      window.location.href = href;
      return;
    }

    body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    mobileMenu?.setAttribute("aria-hidden", "true");

    transition.classList.add("active");

    setTimeout(() => {
      window.location.href = href;
    }, 1300);
  });
});
