/* Reset browser scroll memory */
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

if (window.location.hash) {
  history.replaceState(null, "", window.location.pathname);
}

gsap.registerPlugin(ScrollTrigger);

/* Lenis Smooth Scrolling */
const lenis = new Lenis({
  duration: 1.4,
  smoothWheel: true,
  wheelMultiplier: 0.9,
  touchMultiplier: 1.2
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

/* Premium Scroll-Controlled Intro Typing */
const typeLines = document.querySelectorAll(".type-line");

typeLines.forEach((line) => {
  line.textContent = "";
});

gsap.set(".welcome-text", {
  opacity: 1,
  scale: 1,
  filter: "blur(0px)"
});

ScrollTrigger.create({
  trigger: ".intro-section",
  start: "top top",
  end: () => window.innerWidth <= 768 ? "+=1800" : "+=3200",
  scrub: true,
  pin: true,
  invalidateOnRefresh: true,

  onUpdate: (self) => {
    const progress = self.progress;
    const typingEnd = 0.65;

    typeLines.forEach((line, index) => {
      const text = line.dataset.text;
      const totalLines = typeLines.length;
      const step = typingEnd / totalLines;

      const start = index * step;
      const end = start + step;

      let localProgress = gsap.utils.mapRange(start, end, 0, 1, progress);
      localProgress = gsap.utils.clamp(0, 1, localProgress);

      const chars = Math.floor(localProgress * text.length);
      line.textContent = text.substring(0, chars);

      line.classList.toggle("active", progress >= start && progress <= end);

      if (progress > typingEnd) {
        line.textContent = text;
        line.classList.remove("active");
      }
    });

    const outroProgress = gsap.utils.clamp(
      0,
      1,
      gsap.utils.mapRange(0.72, 1, 0, 1, progress)
    );

    gsap.set(".welcome-text", {
      opacity: 1 - outroProgress,
      scale: 1 + outroProgress * 0.12,
      filter: `blur(${outroProgress * 12}px)`
    });

    gsap.set(".left-panel", {
      xPercent: -100 * outroProgress
    });

    gsap.set(".right-panel", {
      xPercent: 100 * outroProgress
    });
  }
});

/* Premium Logo Section Reveal After Intro Panels */
let logoRevealPlayed = false;

function playLogoReveal() {
  if (logoRevealPlayed) return;
  logoRevealPlayed = true;

  const logoTimeline = gsap.timeline();

  logoTimeline
    .from(".main-logo", {
      opacity: 0,
      x: -120,
      scale: 0.9,
      filter: "blur(18px)",
      duration: 1.3,
      ease: "power4.out"
    })
    .from(".logo-text > span", {
      opacity: 0,
      y: 35,
      filter: "blur(10px)",
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6")
    .from(".hero-premium-title span", {
      opacity: 0,
      y: 70,
      filter: "blur(14px)",
      duration: 1,
      stagger: 0.14,
      ease: "power4.out"
    }, "-=0.35")
    .from(".logo-text p", {
      opacity: 0,
      y: 45,
      filter: "blur(10px)",
      duration: 1,
      ease: "power3.out"
    }, "-=0.45");
}


/* Scroll Indicator Animation */
gsap.to(".scroll-indicator", {
  opacity: 0,
  scrollTrigger: {
    trigger: ".intro-section",
    start: "top top",
    end: "+=300",
    scrub: true
  }
});

gsap.set(".shutter-title span", {
  yPercent: 120,
  clipPath: "inset(0 0 100% 0)",
  filter: "blur(14px)"
});

/* About Section Animation */
gsap.set(".shutter-title span", {
  yPercent: 120,
  clipPath: "inset(0 0 100% 0)",
  filter: "blur(14px)"
});

const aboutTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".about-section",
    start: "top top",
    end: "+=1000",
    scrub: true,
    pin: true
  }
});

aboutTimeline
  .to(".shutter-title span", {
    yPercent: 0,
    clipPath: "inset(0 0 0% 0)",
    filter: "blur(0px)",
    duration: 0.8,
    stagger: 0.12,
    ease: "power4.out"
  })

  .to(".about-title", {
    top: "6vw",
    left: "6vw",
    x: 0,
    y: 0,
    transform: "translate(0, 0)",
    fontSize: "clamp(2rem, 4vw, 4rem)",
    duration: 1.2,
    ease: "power3.inOut"
  })

  .to(".about-content", {
    opacity: 1,
    y: 0,
    duration: 1
  }, "-=0.2")

  .from(".about-card", {
    opacity: 0,
    y: 80,
    stagger: 0.15,
    duration: 1
  }, "-=0.4");


/* Trusted Brands Cinematic Swipe Reveal */
const trustedIntro = document.querySelector(".trusted-intro");
const brandItems = gsap.utils.toArray(".brand-item");

if (trustedIntro && brandItems.length) {
  gsap.from(trustedIntro.children, {
    opacity: 0,
    y: 90,
    filter: "blur(22px)",
    stagger: 0.18,
    duration: 1.6,
    ease: "power4.out",
    scrollTrigger: {
      trigger: ".trusted-section",
      start: "top 70%",
      once: true
    }
  });

  gsap.set(brandItems, {
    opacity: 0,
    x: -140,
    scale: 0.86,
    filter: "blur(24px)"
  });

  gsap.set(brandItems[0], {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)"
  });

  const trustedTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".trusted-section",
      start: "top top",
      end: "+=3000",
      scrub: 1.6,
      pin: true
    }
  });

  brandItems.forEach((item, index) => {
    if (index === 0) return;

    const previous = brandItems[index - 1];

    trustedTimeline
      .to(previous, {
        x: 520,
        opacity: 0,
        scale: 0.9,
        filter: "blur(22px)",
        duration: 1.15,
        ease: "power3.inOut"
      })
      .fromTo(item,
        {
          x: -180,
          opacity: 0,
          scale: 0.86,
          filter: "blur(24px)"
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.35,
          ease: "power4.out"
        },
        "-=0.55"
      );
  });
}

/* Cinematic Statement Section Reveal */
gsap.from(".statement-kicker", {
  opacity: 0,
  y: 40,
  filter: "blur(12px)",
  duration: 1,
  ease: "power4.out",
  scrollTrigger: {
    trigger: ".statement-video-section",
    start: "top 65%"
  }
});


gsap.from(".statement-subtitle", {
  opacity: 0,
  y: 55,
  filter: "blur(14px)",
  duration: 1.1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".statement-video-section",
    start: "top 52%"
  }
});

/* Premium Services Reveal - Reliable Version */
const serviceRevealItems = [
  document.querySelector(".services-header p"),
  document.querySelector(".services-header h2"),
  document.querySelector(".service-details-header p"),
  document.querySelector(".service-details-header h2"),
  ...document.querySelectorAll(".service-detail-card")
].filter(Boolean);

serviceRevealItems.forEach((item, index) => {
  item.classList.add("premium-service-hidden");
  item.style.setProperty("--reveal-delay", `${index * 0.12}s`);
});

const serviceRevealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("premium-service-show");
      serviceRevealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.18
});

serviceRevealItems.forEach((item) => {
  serviceRevealObserver.observe(item);
});
/* Cinematic Work Cards Reveal */
gsap.fromTo(".project-card",
  {
    opacity: 0,
    y: 140,
    scale: 0.88,
    rotateX: 12,
    filter: "blur(18px)"
  },
  {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: "blur(0px)",
    duration: 1.25,
    stagger: 0.18,
    ease: "power4.out",
    scrollTrigger: {
      trigger: ".work-showcase",
      start: "top 75%",
      once: true
    }
  }
);

/* Our Work Typing Animation */
const typedText = document.querySelector(".typed-text");
const text = "Our Work";

let index = 0;
let isDeleting = false;

function typingLoop() {
  if (!typedText) return;

  if (!isDeleting) {
    typedText.textContent = text.substring(0, index + 1);
    index++;

    if (index === text.length) {
      isDeleting = true;
      setTimeout(typingLoop, 1200);
      return;
    }
  } else {
    typedText.textContent = text.substring(0, index - 1);
    index--;

    if (index === 0) {
      isDeleting = false;
      setTimeout(typingLoop, 500);
      return;
    }
  }

  const speed = isDeleting ? 70 : 130;
  setTimeout(typingLoop, speed);
}

typingLoop();

/* Booking Title Reveal */
const bookingTitleTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".booking-section",
    start: "top 65%"
  }
});

bookingTitleTimeline
  .to(".booking-kicker span", {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    stagger: 0.08,
    duration: 0.9,
    ease: "power4.out"
  })
  .to(".booking-heading span", {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    stagger: 0.1,
    duration: 1.1,
    ease: "power4.out"
  }, "-=0.4");

/* Booking Terminal Form */
const questions = [
  {
    text: "What is your name?",
    type: "text"
  },
  {
    text: "What is your company or brand type?",
    type: "choice",
    options: ["Startup", "Company", "Personal Brand", "Restaurant / Cafe", "Clinic", "Auto Business", "Other"]
  },
  {
    text: "Do you currently have a website or domain?",
    type: "choice",
    options: ["Yes", "No", "Only Domain"]
  },
  {
    text: "What service do you need?",
    type: "choice",
    options: ["Website Development", "Website Content Creation", "UI/UX Design", "CMS Integration", "Logo & Visual Identity", "Full Digital Presence"]
  },
  {
    text: "Which design style best matches the look you want for your website?",
    type: "choice",
    options: [
      "Luxury & Premium",
      "Modern & Clean",
      "Corporate & Professional",
      "Minimal & Elegant",
      "Creative & Bold"
    ]
  },
  {
    text: "Briefly describe what you want us to create for you.",
    type: "text"
  },
  {
    text: "Do you prefer an online meeting or an in-person meeting?",
    type: "choice",
    options: ["Online Meeting", "In-Person Meeting"]
  },
  {
    text: "Choose your preferred meeting date and time.",
    type: "datetime"
  }
];

const answers = [];
let currentQuestion = 0;
let typingInterval;

const questionEl = document.getElementById("terminal-question");
const inputEl = document.getElementById("terminal-input");
const nextBtn = document.getElementById("terminal-next");
const progressFill = document.querySelector(".progress-fill");

const choicesWrapper = document.createElement("div");
choicesWrapper.className = "terminal-choices";
inputEl.parentNode.insertBefore(choicesWrapper, inputEl);

function typeQuestion(questionText, callback) {
  clearInterval(typingInterval);

  questionEl.textContent = "";
  inputEl.style.display = "none";
  nextBtn.style.display = "none";
  choicesWrapper.innerHTML = "";

  let i = 0;

  typingInterval = setInterval(() => {
    questionEl.textContent += questionText.charAt(i);
    i++;

    if (i >= questionText.length) {
      clearInterval(typingInterval);
      if (callback) callback();
    }
  }, 28);
}

function updateProgress() {
  const progress = (currentQuestion / questions.length) * 100;
  progressFill.style.width = `${progress}%`;
}

function goToNextQuestion(value) {
  answers.push(value);
  currentQuestion++;
  updateProgress();

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    finishTerminal();
  }
}

function showQuestion() {
  const current = questions[currentQuestion];

  nextBtn.onclick = null;

  if (current.text.includes("describe")) {
    inputEl.placeholder = "Example: A luxury website for my coffee shop with online booking...";
  } else {
    inputEl.placeholder = "Type your answer here...";
  }

  typeQuestion(current.text, () => {
    if (current.type === "text") {
      inputEl.style.display = "block";
      nextBtn.style.display = "inline-block";
      inputEl.disabled = false;
      nextBtn.disabled = false;
      inputEl.focus();

      nextBtn.onclick = () => {
        const value = inputEl.value.trim();

        if (value === "") {
          inputEl.focus();
          return;
        }

        inputEl.value = "";
        goToNextQuestion(value);
      };
    }

    if (current.type === "choice") {
      choicesWrapper.innerHTML = "";

      if (current.text.includes("design style")) {
        const previewBtn = document.createElement("button");
        previewBtn.type = "button";
        previewBtn.className = "style-preview-btn";
        previewBtn.textContent = "View Style Examples";
        choicesWrapper.prepend(previewBtn);
      }

      current.options.forEach((option) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "terminal-choice";
        button.textContent = option;

        button.addEventListener("click", () => {
          goToNextQuestion(option);
        });

        choicesWrapper.appendChild(button);
      });
    }

    if (current.type === "datetime") {
      choicesWrapper.innerHTML = "";

      inputEl.style.display = "none";
      nextBtn.style.display = "inline-block";
      nextBtn.disabled = false;
      nextBtn.textContent = "Next";

      const dateTimeWrapper = document.createElement("div");
      dateTimeWrapper.className = "terminal-datetime";

      const dateInput = document.createElement("input");
      dateInput.type = "date";
      dateInput.className = "terminal-date-input";

      const timeInput = document.createElement("input");
      timeInput.type = "time";
      timeInput.className = "terminal-time-input";

      dateTimeWrapper.appendChild(dateInput);
      dateTimeWrapper.appendChild(timeInput);
      choicesWrapper.appendChild(dateTimeWrapper);

      dateInput.focus();

      nextBtn.onclick = () => {
        if (!dateInput.value || !timeInput.value) {
          return;
        }

        goToNextQuestion(`${dateInput.value} at ${timeInput.value}`);
      };
    }
  });
}

function finishTerminal() {
  progressFill.style.width = "100%";

  const whatsappNumber = "966503355696";

  const message = `
New Project Request - Double OO

Name: ${answers[0]}
Business Type: ${answers[1]}
Website / Domain: ${answers[2]}
Service Needed: ${answers[3]}
Preferred Style: ${answers[4]}
Project Details: ${answers[5]}
Meeting Preference: ${answers[6]}
Preferred Meeting Date & Time: ${answers[7]}
  `;

  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank");

  questionEl.textContent = "Request ready. WhatsApp has been opened.";
  inputEl.style.display = "none";
  nextBtn.style.display = "none";
  choicesWrapper.innerHTML = "";
}

if (questionEl && inputEl && nextBtn && progressFill) {
  showQuestion();

  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      nextBtn.click();
    }
  });
}

/* Contact Cinematic Reveal */
gsap.to(".contact-heading span", {
  opacity: 1,
  y: 0,
  filter: "blur(0px)",
  stagger: 0.08,
  duration: 1.2,
  ease: "power4.out",
  scrollTrigger: {
    trigger: ".contact-section",
    start: "top 65%"
  }
});

gsap.from(".contact-text", {
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".contact-section",
    start: "top 65%"
  }
});

gsap.fromTo(".contact-links a",
  {
    opacity: 0,
    y: 40
  },
  {
    opacity: 1,
    y: 0,
    stagger: 0.1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".contact-links",
      start: "top 90%"
    }
  }
);

gsap.from(".footer", {
  opacity: 0,
  y: 30,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".footer",
    start: "top 95%"
  }
});

window.addEventListener("load", () => {
  const forceTop = () => {
    window.scrollTo(0, 0);

    if (typeof lenis !== "undefined") {
      lenis.scrollTo(0, { immediate: true });
    }

    ScrollTrigger.clearScrollMemory();
    ScrollTrigger.refresh(true);
  };

  forceTop();

  setTimeout(forceTop, 100);
  setTimeout(forceTop, 300);
  setTimeout(forceTop, 700);
});

/* Premium Navbar Reveal + Theme Switch */
const premiumNavbar = document.querySelector(".premium-navbar");
const themedSections = document.querySelectorAll(".dark-section, .light-section, .logo-reveal");

function updateNavbar() {
  if (!premiumNavbar) return;

  if (window.scrollY > window.innerHeight * 0.8) {
    premiumNavbar.classList.add("show");
  } else {
    premiumNavbar.classList.remove("show");
  }

  themedSections.forEach((section) => {
    const rect = section.getBoundingClientRect();

    if (rect.top <= 120 && rect.bottom >= 120) {
      if (section.classList.contains("light-section")) {
        premiumNavbar.classList.add("nav-dark");
        premiumNavbar.classList.remove("nav-light");
      } else {
        premiumNavbar.classList.add("nav-light");
        premiumNavbar.classList.remove("nav-dark");
      }
    }
  });
}

window.addEventListener("scroll", updateNavbar);
window.addEventListener("load", updateNavbar);

/* Mobile Menu */
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
  });

  document.querySelectorAll(".mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("show");
    });
  });
}

/* Smooth Navbar Links Without URL Hash */
document.querySelectorAll("[data-scroll-to]").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetSelector = link.getAttribute("data-scroll-to");
    const targetSection = document.querySelector(targetSelector);

    if (!targetSection) return;

    history.replaceState(null, "", window.location.pathname);

    lenis.scrollTo(targetSection, {
      offset: 0,
      duration: 1.5,
      easing: (t) => 1 - Math.pow(1 - t, 3)
    });

    if (mobileMenu) {
      mobileMenu.classList.remove("show");
    }
  });
});

document.querySelector(".nav-brand")?.addEventListener("click", (e) => {
  e.preventDefault();
  history.replaceState(null, "", window.location.pathname);
  lenis.scrollTo(0, { duration: 1.5 });
});

/* Back To Top Button */
const backToTopBtn = document.getElementById("backToTop");

if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 700) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    lenis.scrollTo(0);
  });
}

/* Final Force Start From Top */
window.addEventListener("load", () => {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  lenis.scrollTo(0, {
    immediate: true
  });

  ScrollTrigger.clearScrollMemory();

  setTimeout(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    lenis.scrollTo(0, {
      immediate: true
    });

    ScrollTrigger.refresh(true);
  }, 500);
});

/* FIX MOBILE WIDTH AFTER GSAP PIN */
function fixMobileLayout() {
  document.documentElement.style.overflowX = "hidden";
  document.body.style.overflowX = "hidden";

  ScrollTrigger.refresh(true);
}

window.addEventListener("load", fixMobileLayout);
window.addEventListener("resize", fixMobileLayout);
window.addEventListener("orientationchange", () => {
  setTimeout(fixMobileLayout, 300);
});

/* Animated Language Switch */
document.querySelectorAll("[data-lang-switch]").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const target = btn.getAttribute("href");

    document.body.classList.add("page-leaving");

    gsap.to("body > *:not(.page-transition)", {
      opacity: 0,
      scale: 0.98,
      filter: "blur(12px)",
      duration: 0.55,
      ease: "power3.inOut",
      onComplete: () => {
        window.location.href = target;
      }
    });
  });
});

/* Style Examples Modal */
const styleModal = document.getElementById("styleModal");
const closeStyleModal = document.getElementById("closeStyleModal");

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("style-preview-btn")) {
    styleModal.classList.add("show");
  }
});

closeStyleModal?.addEventListener("click", () => {
  styleModal.classList.remove("show");
});

styleModal?.addEventListener("click", (e) => {
  if (e.target === styleModal) {
    styleModal.classList.remove("show");
  }
});

/* Premium AI Scan Text Reveal */
window.addEventListener("load", () => {
  const lines = document.querySelectorAll(".statement-video-text .en-scan");
  const section = document.querySelector(".statement-video-section");

  if (!lines.length || !section) return;

  lines.forEach((line) => {
    const text = line.textContent.trim();
    line.innerHTML = "";

    [...text].forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.classList.add("scan-letter");
      line.appendChild(span);
    });
  });

  let played = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !played) {
        played = true;

        gsap.to(".scan-letter", {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          textShadow: "0 0 0 rgba(255,255,255,0)",
          stagger: {
            each: 0.025,
            from: "random"
          },
          duration: 0.9,
          ease: "power4.out"
        });
      }
    });
  }, {
    threshold: 0.55
  });

  observer.observe(section);
});

/* Refresh GSAP on mobile resize/orientation */
window.addEventListener("resize", () => {
  ScrollTrigger.refresh(true);
});

window.addEventListener("orientationchange", () => {
  setTimeout(() => {
    ScrollTrigger.refresh(true);
  }, 400);
});
