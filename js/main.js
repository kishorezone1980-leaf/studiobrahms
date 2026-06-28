/**
 * Studio Brahms — scroll architecture & interaction
 * One init function per behaviour (STUDIO_BRAHMS.md)
 */

function initNavScroll() {
  const nav = document.querySelector('.nav');
  const bMark = document.querySelector('.nav__b-mark');
  const hero = document.querySelector('#hero');
  if (!nav) return;

  const onScroll = () => {
    if (hero) {
      nav.classList.toggle('nav--scrolled', hero.getBoundingClientRect().bottom <= 0);
      return;
    }
    nav.classList.toggle('nav--scrolled', window.scrollY > 60);
  };

  bMark?.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initScrollReveals() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach((el) => observer.observe(el));
}

function initStackCardAnimations() {
  const stackCards = document.querySelectorAll('.card--stack-entry');
  if (!stackCards.length) return;

  const showCard = (card) => {
    card.classList.add('card--visible');
    card.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
  };

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobileQuery = window.matchMedia('(max-width: 768px)');
  if (prefersReducedMotion || mobileQuery.matches) {
    stackCards.forEach(showCard);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          showCard(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: '0px 0px 0px 0px' }
  );

  stackCards.forEach((card) => observer.observe(card));
}

function initKineticText() {
  const containers = document.querySelectorAll('.kinetic-text');
  if (!containers.length) return;

  containers.forEach((container, index) => {
    const track = container.querySelector('.kinetic-text__track');
    if (!track || track.dataset.duplicated === 'true') return;

    track.innerHTML = track.innerHTML + track.innerHTML;
    track.dataset.duplicated = 'true';

    if (index % 2 === 1) {
      container.classList.add('kinetic-text--right');
    }
  });
}

function initBLogoColorSwitcher() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const themedSections = document.querySelectorAll('.card[data-nav-theme], #service-cards[data-nav-theme]');
  if (!themedSections.length) return;

  const probeY = () => {
    const target = nav.classList.contains('nav--scrolled')
      ? nav.querySelector('.nav__b-mark')
      : nav.querySelector('.nav__bar');
    if (!target) return 0;
    const rect = target.getBoundingClientRect();
    return rect.top + rect.height / 2;
  };

  const updateTheme = () => {
    if (!nav.classList.contains('nav--scrolled')) {
      nav.classList.remove('nav--on-light');
      return;
    }

    const y = probeY();
    const x = window.innerWidth / 2;
    const hit = document.elementFromPoint(x, y);
    const section = hit?.closest('.card[data-nav-theme], #service-cards[data-nav-theme]');
    if (section) {
      const theme = section.dataset.navTheme;
      nav.classList.toggle('nav--on-light', theme === 'light');
    }
  };

  updateTheme();
  window.addEventListener('scroll', updateTheme, { passive: true });
  window.addEventListener('resize', updateTheme, { passive: true });
}

function initMobileNav() {
  const hamburger = document.querySelector('.nav__hamburger');
  const menu = document.querySelector('.nav__mobile-menu');
  if (!hamburger || !menu) return;

  const close = () => {
    hamburger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', close);
  });
}

function fitServiceCardHeadings() {
  document.querySelectorAll('.service__heading-block').forEach((block) => {
    block.style.fontSize = '';

    let size = parseFloat(window.getComputedStyle(block).fontSize);
    const minSize = Math.max(size * 0.42, 24);

    while (block.scrollWidth > block.clientWidth + 1 && size > minSize) {
      size -= 0.5;
      block.style.fontSize = `${size}px`;
    }
  });
}

function initServiceCardsSection() {
  const section = document.querySelector('#service-cards');
  const stage = section?.querySelector('.service-cards-section__stage');
  const pin = section?.querySelector('.service-cards-section__pin');
  const deck = section?.querySelector('.service-cards-section__deck');
  if (!section || !stage || !pin || !deck) return;

  const cards = [...deck.querySelectorAll('.service-card')];
  const cardCount = cards.length;
  if (cardCount === 0) return;

  const STACK_OFFSET = 40;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobileQuery = window.matchMedia('(max-width: 768px)');

  const isStatic = () => prefersReducedMotion || mobileQuery.matches;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const getScrollPerStep = () => window.innerHeight;

  const getEnterOffset = () => Math.min(window.innerHeight * 0.55, 520);

  const getScrollMetrics = () => {
    const scrollPerStep = getScrollPerStep();
    const stackScroll = scrollPerStep * cardCount;
    const exitScroll = scrollPerStep;
    const totalScroll = stackScroll + exitScroll;

    return { scrollPerStep, stackScroll, exitScroll, totalScroll };
  };

  const applyCard = (card, y, zIndex, interactive) => {
    card.style.transform = `translate(-50%, calc(-50% + ${y}px))`;
    card.style.opacity = '1';
    card.style.zIndex = String(zIndex);
    card.style.pointerEvents = interactive ? 'auto' : 'none';
  };

  const hideCard = (card) => {
    card.style.transform = `translate(-50%, calc(-50% + ${getEnterOffset()}px))`;
    card.style.opacity = '0';
    card.style.zIndex = '0';
    card.style.pointerEvents = 'none';
  };

  const showAllStacked = () => {
    cards.forEach((card, index) => {
      const y = (cardCount - 1 - index) * STACK_OFFSET;
      applyCard(card, y, index + 1, true);
    });
  };

  const resetCards = () => {
    cards.forEach((card) => {
      card.style.transform = '';
      card.style.opacity = '';
      card.style.zIndex = '';
      card.style.pointerEvents = '';
    });
  };

  const layout = () => {
    const staticMode = isStatic();
    section.classList.toggle('service-cards-section--static', staticMode);
    pin.classList.remove('is-fixed', 'is-ended');

    if (staticMode) {
      section.style.height = '';
      stage.style.height = '';
      resetCards();
      return;
    }

    const { totalScroll } = getScrollMetrics();
    const sectionHeight = window.innerHeight + totalScroll;
    section.style.height = `${sectionHeight}px`;
    stage.style.height = `${sectionHeight}px`;
  };

  const getScrolled = () => {
    const { totalScroll } = getScrollMetrics();
    const rect = section.getBoundingClientRect();
    return clamp(-rect.top, 0, totalScroll);
  };

  const updatePin = () => {
    if (isStatic()) return;

    const { totalScroll } = getScrollMetrics();
    const rect = section.getBoundingClientRect();
    const scrolled = getScrolled();

    pin.classList.remove('is-fixed', 'is-ended');

    if (scrolled >= totalScroll) {
      pin.classList.add('is-ended');
    } else if (rect.top <= 0) {
      pin.classList.add('is-fixed');
    }
  };

  const updateCards = () => {
    if (isStatic()) return;

    updatePin();

    const { scrollPerStep, stackScroll } = getScrollMetrics();
    const enterOffset = getEnterOffset();
    const scrolled = getScrolled();

    if (scrolled >= stackScroll) {
      showAllStacked();
      return;
    }

    const segment = scrolled / scrollPerStep;
    const phase = Math.floor(segment);
    const t = segment - phase;

    if (phase === 0) {
      cards.forEach((card, index) => {
        if (index === 0) {
          applyCard(card, enterOffset * (1 - t), 1, true);
          return;
        }
        hideCard(card);
      });
      return;
    }

    const base = phase - 1;
    const incomingIndex = phase;

    cards.forEach((card, index) => {
      if (index > incomingIndex) {
        hideCard(card);
        return;
      }

      if (index < incomingIndex) {
        const fromY = (base - index) * STACK_OFFSET;
        const toY = (incomingIndex - index) * STACK_OFFSET;
        const y = fromY + (toY - fromY) * t;
        applyCard(card, y, index + 1, true);
        return;
      }

      if (t <= 0) {
        hideCard(card);
        return;
      }

      const y = enterOffset * (1 - t);
      applyCard(card, y, cardCount + 2, true);
    });
  };

  const scrollToCard = (cardId) => {
    const cardIndex = cards.findIndex((card) => card.id === cardId);
    if (cardIndex === -1) return;

    if (isStatic()) {
      cards[cardIndex]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    layout();
    const { scrollPerStep } = getScrollMetrics();
    const targetScroll = section.offsetTop + cardIndex * scrollPerStep;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const serviceIds = ['product-design', 'daas', 'workshops', 'branding'];

  const handleHash = () => {
    const id = location.hash.slice(1);
    if (serviceIds.includes(id)) {
      requestAnimationFrame(() => scrollToCard(id));
    }
  };

  layout();
  updateCards();
  fitServiceCardHeadings();
  handleHash();

  window.addEventListener('scroll', updateCards, { passive: true });
  window.addEventListener('hashchange', handleHash);
  window.addEventListener('resize', () => {
    layout();
    updateCards();
    fitServiceCardHeadings();
  });

  mobileQuery.addEventListener('change', () => {
    layout();
    updateCards();
    fitServiceCardHeadings();
  });

  document.fonts.ready.then(fitServiceCardHeadings);

  if (typeof ResizeObserver !== 'undefined') {
    const resizeObserver = new ResizeObserver(() => fitServiceCardHeadings());
    cards.forEach((card) => resizeObserver.observe(card));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initNavScroll();
  initScrollReveals();
  initStackCardAnimations();
  initKineticText();
  initBLogoColorSwitcher();
  initMobileNav();
  initServiceCardsSection();
});
