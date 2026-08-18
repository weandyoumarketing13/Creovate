/* ==========================================================================
   CREOVATE MAIN APPLICATION CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initBudgetEstimator();
  initContactForm();
  initServiceTabs();
  initToastSystem();
  initScrollReveal();
});

/* Scroll Reveal Intersection Observer */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => observer.observe(el));
}

/* 1. Header Navigation Controller */
function initNavbar() {
  const header = document.querySelector('.header-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Scrolled class toggle
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active link highlight based on scroll position
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle logic
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinksContainer = document.getElementById('navLinks');
  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('open');
    });
  }
}

/* 2. Interactive Project Budget Estimator */
function initBudgetEstimator() {
  const slider = document.getElementById('budgetSlider');
  const display = document.getElementById('budgetDisplay');
  const scopeText = document.getElementById('estimatorScope');
  const roasDisplay = document.getElementById('estimatorRoas');

  if (!slider || !display) return;

  const updateEstimator = () => {
    const val = parseInt(slider.value, 10);
    const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    display.textContent = formatted;

    if (val < 20000) {
      scopeText.textContent = "Social Media Marketing & Creative Ad Shoots Core Package";
      roasDisplay.textContent = "High Brand Awareness & Audience Growth";
    } else if (val < 50000) {
      scopeText.textContent = "Full Social Media, Talent & Influencer Management + Web Dev";
      roasDisplay.textContent = "Measurable Lead Generation & High Engagement";
    } else {
      scopeText.textContent = "Complete Creovate 360° Studio: App Dev, PPC, SEO, Meta Ads & E-Com";
      roasDisplay.textContent = "Maximum Revenue Growth & Category Leadership";
    }
  };

  slider.addEventListener('input', updateEstimator);
  updateEstimator();

  // Motion Gallery interactive click
  const motionCards = document.querySelectorAll('.motion-card');
  motionCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('.motion-title')?.textContent || 'Creative Asset';
      showToast(`🎬 Previewing: ${title}`);
    });
  });
}

/* 3. Services Filter Tabs */
function initServiceTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      serviceCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* 4. Contact Form Handling */
function initContactForm() {
  const form = document.getElementById('creovateContactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = `<span>Processing Blueprint...</span>`;

    setTimeout(() => {
      showToast("✓ Request Received! Our Innovation Strategist will connect within 24 hours.");
      form.reset();
      btn.disabled = false;
      btn.innerHTML = originalText;
    }, 1200);
  });
}

/* 5. Toast Notification System */
function initToastSystem() {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

/* Global Service Select Helper */
function selectServiceOption(serviceVal) {
  const dropdown = document.getElementById('contactService');
  if (dropdown) {
    dropdown.value = serviceVal;
    showToast(`✓ Selected service: ${dropdown.options[dropdown.selectedIndex].text}`);
  }
}

/* Master-Detail Interactive Services Switcher */
const masterServicesData = [
  {
    num: "01",
    tag: "01 / SOCIAL MEDIA",
    title: "Social Media Marketing",
    val: "social-marketing",
    icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.684A1.761 1.761 0 013 12c0-.795.536-1.5 1.258-1.748l13.5-4.502a1.76 1.76 0 012.242 2.242l-4.5 13.502C15.248 22.464 14.543 23 13.748 23c-.795 0-1.5-.536-1.748-1.258l-1.26-3.606"/></svg>`,
    desc: "Build and grow your brand presence across key social channels with content-driven engagement strategies.",
    bullets: [
      "Build and grow your brand on Instagram, Facebook & Linkedin",
      "Create engaging posts, reels, & stories",
      "Manage accounts and boost audience engagement",
      "Drive leads, sales, and brand awareness through content driven strategy"
    ]
  },
  {
    num: "02",
    tag: "02 / TALENT",
    title: "Talent Management",
    val: "talent-management",
    icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>`,
    desc: "Connecting creative visionaries, influencers, and brands to forge impactful partnerships.",
    bullets: [
      "Discover and manage creative talent and influencers",
      "Handle brand collaborations and partnerships",
      "Build strong personal brands",
      "Personal brand building and we ensure smooth communication and growth"
    ]
  },
  {
    num: "03",
    tag: "03 / MOBILE APP",
    title: "App Development",
    val: "app-dev",
    icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect width="14" height="20" x="5" y="2" rx="2" stroke-linecap="round" stroke-linejoin="round"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 18h.01"/></svg>`,
    desc: "User-friendly mobile applications engineered for smooth performance and high retention.",
    bullets: [
      "Design and develop user-friendly mobile applications",
      "Custom solutions for business needs for smooth performance",
      "Modern UI/UX",
      "Ongoing support and updates"
    ]
  },
  {
    num: "04",
    tag: "04 / PRODUCTION",
    title: "Creative Ad Shoots",
    val: "creative-shoots",
    icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>`,
    desc: "Cinematic photography and videography that captivates audiences and transforms brand narrative.",
    bullets: [
      "Professional photography & videography",
      "Concept development & execution",
      "Cinematic brand storytelling",
      "High-quality ad creatives"
    ]
  },
  {
    num: "05",
    tag: "05 / META ADS",
    title: "Social Media Ads",
    val: "social-ads",
    icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="9" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="1" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    desc: "Laser-targeted ad campaigns built to scale acquisition across Meta and modern social platforms.",
    bullets: [
      "Targeted ad campaigns on Instagram, Facebook, Meta & more",
      "Performance tracking & optimization",
      "Creative ad designs and copywriting",
      "Continuous monitoring and optimization"
    ]
  },
  {
    num: "06",
    tag: "06 / INFLUENCERS",
    title: "Influencer Marketing",
    val: "influencer-marketing",
    icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>`,
    desc: "Impactful influencer campaigns that amplify brand reach, foster trust, and deepen audience connection.",
    bullets: [
      "Identify the right influencers for your brand",
      "Design and launch impactful campaigns",
      "Amplify reach, foster trust, and deepen audience connection",
      "Measure performance and analyze campaign result"
    ]
  },
  {
    num: "07",
    tag: "07 / WEB DEV",
    title: "Web Development",
    val: "web-dev",
    icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>`,
    desc: "Responsive, secure, and blazing-fast websites crafted for seamless user experiences.",
    bullets: [
      "Create responsive and professional websites",
      "E-commerce and business website solutions",
      "Fast, secure, user-friendly designs",
      "Fast, secure, and optimized builds"
    ]
  },
  {
    num: "08",
    tag: "08 / SEO",
    title: "Search Engine Optimization (SEO)",
    val: "seo",
    icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>`,
    desc: "Dominate search rankings, elevate organic traffic, and secure sustained long-term growth.",
    bullets: [
      "Improve website ranking on search engines",
      "Keyword research and on-page optimization",
      "Increase organic traffic and visibility",
      "Long-term growth strategy"
    ]
  },
  {
    num: "09",
    tag: "09 / PPC ADS",
    title: "Pay Per Click Ads (PPC)",
    val: "ppc-ads",
    icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/></svg>`,
    desc: "High-intent paid ad campaigns on Google and top channels for rapid, qualified lead generation.",
    bullets: [
      "Run paid ads on Google and other platforms",
      "Target the right audience for quick results",
      "Optimize campaigns for better ROI",
      "Generate quality leads and conversions"
    ]
  },
  {
    num: "10",
    tag: "10 / E-COMMERCE",
    title: "E-Commerce Management",
    val: "ecom-management",
    icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>`,
    desc: "End-to-end platform management, conversion UX, retention, and multichannel growth engine.",
    bullets: [
      "Platform & Performance Management",
      "User Experience (UX) & Seamless customer experience",
      "Growth Through SEO, SEM & Content",
      "Customer Retention & Personalization"
    ]
  }
];

function selectDetailService(index) {
  const data = masterServicesData[index];
  if (!data) return;

  // Master items active toggle
  const items = document.querySelectorAll('.service-master-item');
  items.forEach((item, idx) => {
    if (idx === index) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Update Detail Panel
  const icon = document.getElementById('detailIcon');
  const tag = document.getElementById('detailTag');
  const title = document.getElementById('detailTitle');
  const desc = document.getElementById('detailDesc');
  const bullets = document.getElementById('detailBullets');
  const btn = document.getElementById('detailActionBtn');

  if (icon) icon.innerHTML = data.icon;
  if (tag) tag.textContent = data.tag;
  if (title) title.textContent = data.title;
  if (desc) desc.textContent = data.desc;

  if (bullets) {
    bullets.innerHTML = data.bullets.map(b => `
      <div class="detail-bullet-item">
        <div class="detail-check-icon">✓</div>
        <span>${b}</span>
      </div>
    `).join('');
  }

  if (btn) {
    btn.setAttribute('onclick', `selectServiceOption('${data.val}')`);
  }
}

function filterMasterServices(category) {
  const items = document.querySelectorAll('.service-master-item');
  items.forEach(item => {
    const cat = item.dataset.category;
    if (category === 'all' || cat === category) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });

  // Active tab style toggle
  const tabs = document.querySelectorAll('.services-tabs .tab-btn');
  tabs.forEach(t => {
    if (t.getAttribute('onclick')?.includes(category)) {
      t.classList.add('active');
    } else {
      t.classList.remove('active');
    }
  });
}


/* ==========================================================================
   INTERSECTION OBSERVER SCROLL ANIMATIONS
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-up');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});
