function initReveal() {
  const els = document.querySelectorAll<HTMLElement>(".reveal");
  if (!els.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const delay = el.dataset.delay ?? "0";
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("is-visible");
          io.unobserve(el);
        }
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  els.forEach((el) => io.observe(el));
}

function initHeroTelemetry() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;

  hero.addEventListener('pointermove', (event) => {
    const bounds = hero.getBoundingClientRect();
    hero.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`);
    hero.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`);
  });

  const clock = hero.querySelector<HTMLElement>('[data-live-time]');
  if (clock) {
    const updateClock = () => {
      clock.textContent = `${new Intl.DateTimeFormat('en-MY', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Kuala_Lumpur',
      }).format(new Date())} MYT`;
    };
    updateClock();
    window.setInterval(updateClock, 1000);
  }
}

function initHeader() {
  const header = document.querySelector<HTMLElement>("[data-site-header]");
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const toggle = document.querySelector<HTMLButtonElement>("[data-nav-toggle]");
  const menu = document.querySelector<HTMLElement>("[data-nav-menu]");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      document.documentElement.classList.toggle("nav-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        document.documentElement.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }
}

function initMagnetic() {
  const targets = document.querySelectorAll<HTMLElement>("[data-magnetic]");
  targets.forEach((el) => {
    const strength = 18;
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${(x / rect.width) * strength}px, ${(y / rect.height) * strength}px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "translate(0, 0)";
    });
  });
}

function initPortfolioControls() {
  const grid = document.querySelector<HTMLElement>('[data-portfolio-grid]');
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll<HTMLElement>('[data-portfolio-card]'));
  const filters = document.querySelectorAll<HTMLButtonElement>('[data-filter]');
  const sort = document.querySelector<HTMLSelectElement>('[data-portfolio-sort]');
  const count = document.querySelector<HTMLElement>('[data-portfolio-count]');
  let activeFilter = 'all';

  const render = () => {
    const visibleCards = cards.filter((card) => activeFilter === 'all' || card.dataset.category === activeFilter);
    const sortedCards = [...visibleCards].sort((a, b) => {
      if (sort?.value === 'category') return (a.dataset.category ?? '').localeCompare(b.dataset.category ?? '');
      const direction = sort?.value === 'oldest' ? 1 : -1;
      return direction * (Number(a.dataset.year) - Number(b.dataset.year) || Number(a.dataset.order) - Number(b.dataset.order));
    });

    cards.forEach((card) => card.classList.toggle('is-hidden', !visibleCards.includes(card)));
    sortedCards.forEach((card) => grid.append(card));
    if (count) count.textContent = String(visibleCards.length);
  };

  filters.forEach((filter) => filter.addEventListener('click', () => {
    activeFilter = filter.dataset.filter ?? 'all';
    filters.forEach((button) => button.classList.toggle('is-active', button === filter));
    render();
  }));
  sort?.addEventListener('change', render);
  render();
}

function init() {
  initReveal();
  initHeader();
  initHeroTelemetry();
  initPortfolioControls();
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    initMagnetic();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
