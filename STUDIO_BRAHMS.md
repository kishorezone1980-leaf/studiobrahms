# Studio Brahms — Project Skill File
> Read this before writing a single line of code or CSS.
> This is the single source of truth for all design and development decisions on the Studio Brahms website.

---

## What This Project Is

Studio Brahms is a product design consultancy based in Bengaluru, India.
Target audience: Startup founders, product leads, early-stage teams — skeptical, budget-conscious, non-design-literate.
The website's single job: Earn the first conversation. Not close the deal. Just open the door.

This is not a portfolio site. It is a consultancy positioning site.
It should feel like a serious studio — not a freelancer, not an agency.

---

## Design Philosophy

**Editorial. Intentional. Not decorative.**

Every visual decision must earn its place. If something is there for decoration alone, remove it.

The visual language draws from:
- Bauhaus discipline — form follows function, no ornament without reason
- Swiss editorial typography — large display type, tight hierarchy, white space as structure
- Japanese restraint — what is removed is as important as what remains

The site should feel like it was designed by someone with taste — not generated.
Confidence over cleverness. Clarity over beauty.

**The one thing this site must never feel:** templated.

---

## Color Palette

Use CSS custom properties everywhere. Never hardcode a color value.

```css
:root {
  /* Core */
  --color-bg-dark:        #0A0A0A;   /* Primary dark background */
  --color-bg-light:       #EEEAE0;   /* Cream / light sections */
  --color-bg-mid:         #1A1A1A;   /* Dark section variant */

  /* Text */
  --color-text-primary:   #F0EDE6;   /* Cream — primary text on dark */
  --color-text-dark:      #0A0A0A;   /* Dark text on light sections */
  --color-text-muted:     #888888;   /* Footnotes, captions, meta */
  --color-text-mid:       #555555;   /* Body text on light backgrounds */

  /* Accent */
  --color-gold:           #B8933A;   /* Primary accent — use sparingly */
  --color-gold-light:     #D4A84B;   /* Hover state for gold elements */

  /* Borders */
  --color-border-dark:    #2A2A2A;   /* Dividers on dark backgrounds */
  --color-border-light:   #DDDDDD;   /* Dividers on light backgrounds */
}
```

**Rules on color use:**
- Gold is an accent. It should appear on 10–15% of the page maximum.
- Never use gold as a background fill on large areas.
- Alternate dark and light sections for visual rhythm — not randomly.
- The B mark and logo are always in their original colors — never recolor them.

---

## Typography

```css
/* Google Fonts import — always include both */
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&display=swap');

:root {
  --font-display:   'Bebas Neue', sans-serif;   /* All display headings */
  --font-body:      'Inter', sans-serif;         /* All body, UI, captions */
}
```

### Type Scale

```css
:root {
  --text-hero:      clamp(64px, 12vw, 140px);   /* Hero display — Studio Brahms wordmark */
  --text-display:   clamp(48px, 8vw, 96px);     /* Section headings — WHO WE ARE, WHAT WE DO */
  --text-heading:   clamp(32px, 5vw, 56px);     /* Service headings — PRODUCT DESIGN */
  --text-subhead:   clamp(18px, 2.5vw, 24px);   /* Subcaptions, taglines */
  --text-body:      16px;                        /* Body copy */
  --text-small:     13px;                        /* Footnotes, captions, meta */
}
```

### Typography Rules
- Bebas Neue is ONLY for display headings. Never use it for body, captions, or UI elements.
- Inter at weight 300 for body copy. Weight 500 for labels and emphasis. Weight 600 for prices and CTAs.
- Letter spacing on Bebas Neue display: `letter-spacing: 0.02em`
- Never center-align body text. Center is reserved for hero statements and pull quotes only.
- Line height for display: 0.95. Line height for body: 1.6.

---

## Spacing System

```css
:root {
  --space-xs:    8px;
  --space-sm:    16px;
  --space-md:    32px;
  --space-lg:    64px;
  --space-xl:    96px;
  --space-2xl:   128px;
  --space-3xl:   192px;

  --section-padding-y:   var(--space-3xl);    /* Top and bottom padding for all sections */
  --section-padding-x:   clamp(24px, 6vw, 96px);  /* Side padding — responsive */
  --content-max-width:   1200px;              /* Max content width */
}
```

---

## Layout Principles

**Section alternation:**
Sections alternate between dark (`--color-bg-dark`) and light (`--color-bg-light`) backgrounds.
Never place two dark sections or two light sections adjacent without a deliberate reason.

**Grid:**
Use CSS Grid for all layouts. No floats. No Bootstrap.
Standard content grid: `grid-template-columns: repeat(12, 1fr); gap: var(--space-md);`

**The left rule:**
Every section has a subtle left border rule on key content blocks — 2px solid `--color-gold`.
This is a signature element of the Studio Brahms visual language. Use it consistently.

**Section numbering:**
Service sections are numbered 01, 02, 03, 04 in large outlined/ghost type in the top-right corner.
This is decorative structure — it encodes sequence and gives each service section a unique anchor.
Font: Bebas Neue. Style: outline/stroke only, no fill. Opacity: 0.15.

**The kinetic type treatment:**
Each service section has a repeated kinetic headline — e.g. "DESIGN DESIGN DESIGN" or "THINK THINK THINK"
These are purely visual rhythm elements. They sit behind or beside the section content.
They should animate on scroll — slow horizontal drift, left to right or right to left alternating.
Use CSS animation or prepare for GSAP ScrollTrigger later.

---

## Component Patterns

### Nav
```
Position: fixed, top
Background: transparent → blur+dark on scroll
Left: B mark (image asset)
Right: Studio Brahms wordmark (text or image)
Center: WHO WE ARE · WHAT WE DO · CONTACT
Font: Inter 500, 13px, letter-spacing: 0.1em, uppercase
```

### Section Header Pattern
```
Eyebrow:    Inter 500, 12px, uppercase, letter-spacing 0.15em, --color-gold
Heading:    Bebas Neue, --text-display
Subhead:    Inter 300, --text-subhead, --color-text-muted
```

### Service Section Pattern
```
Ghost number:   Top right, Bebas Neue, 0.15 opacity
Service title:  Bebas Neue, --text-heading
Tagline:        Inter 300 italic, --text-subhead
Body:           Inter 300, --text-body
CTA:            Inter 500, uppercase, 13px, letter-spacing 0.1em
                Underline style — no button box
```

### Price Display Pattern
```
Strikethrough price:  Inter 400, --color-text-muted, text-decoration: line-through
Current price:        Inter 600, --text-subhead, --color-text-primary
Label:                Inter 300, --text-small, --color-text-muted
```

### CTA / Link Pattern
```
Style: text link with animated underline — no button boxes
Hover: underline slides in from left
Color: --color-gold on dark backgrounds, --color-text-dark on light
Text: uppercase, Inter 500, 12px, letter-spacing 0.1em
```

---

## Animation & Interaction

**Philosophy:** Motion should feel inevitable, not decorative.
Every animation must serve comprehension or guide attention — not perform.

**Scroll reveals:**
All sections fade and translate up on scroll entry.
Use Intersection Observer API. Prepare class structure for GSAP ScrollTrigger later.

```javascript
// Standard reveal pattern — use this structure everywhere
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

```css
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Kinetic type drift:**
```css
@keyframes drift-left {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes drift-right {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}
.kinetic-text {
  animation: drift-left 20s linear infinite;
  white-space: nowrap;
}
```

**Nav scroll behaviour:**
```javascript
// Nav becomes solid on scroll — structure for this from day one
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  nav.classList.toggle('nav--scrolled', window.scrollY > 60);
});
```

**Reduced motion — always include:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## File Structure

```
studiobrahms-web/
├── index.html
├── STUDIO_BRAHMS.md              ← This file
├── images/                       ← All site images live here
│   ├── brahms-b-mark.png         ← The B symbol
│   ├── brahms-wordmark.png       ← Full Studio Brahms wordmark
│   └── saul-bass.jpg             ← Saul Bass portrait — Who We Are / Philosophy section
├── Reference screens/            ← Visual references for Cursor to check against
│   ├── 01-hero.png
│   ├── 02-who-we-are.png
│   ├── 02B-Philosphy.png         ← Saul Bass / philosophy card
│   ├── 03-what-we-do.png
│   ├── 04-product-design.png
│   ├── 05-daas.png
│   ├── 06-workshop.png
│   ├── 07-branding.png
│   ├── 08-contact.png
│   └── 09-footer.png
```

---

## Sections & Content

### 01 — NAV
```
Links: WHO WE ARE · WHAT WE DO · CONTACT
```

### 02 — HERO
```
Display: STUDIO BRAHMS
Subline 1: Design Consultancy · Bengaluru
Subline 2: Design is decisions of taste —
           from strategy to execution.
           By people who think before they draw.
```

### 03 — WHO WE ARE
```
Heading: WHO WE ARE?
Col 1: We are a product design consultancy. We work with
       founders and product teams to get the thinking right
       before a single screen is drawn — and see it through
       to a working prototype.
Col 2: 25 years across enterprise SaaS, insurance, HR tech,
       real estate, and aerospace — from zero-to-one startups
       to complex enterprise systems.
Image block: Saul Bass portrait
Quote: "I just want to create beautiful things even if nobody cares"
Attribution: — Saul Bass
```

### 04 — WHAT WE DO
```
Heading: WHAT WE DO?
List: PRODUCT DESIGN
      DESIGN AS A SERVICE
      WORKSHOPS
      BRANDING
      DESIGN SYSTEM
```

### 05 — PRODUCT DESIGN (Service 01)
```
Ghost number: 01
Kinetic text: THINK THINK THINK BEFORE YOU BUILD
Heading: PRODUCT DESIGN
Tagline: Discovery to Launch. Full ownership.
Pricing label: Scope-wise pricing
Body: From the first stakeholder conversation to a working
      clickthrough prototype — research, strategy, and execution
      handled as one engagement. No handoffs. No gaps.
CTA: CONNECT WITH US →
```

### 06 — DESIGN AS A SERVICE (Service 02)
```
Ghost number: 02
Kinetic text: DESIGN DESIGN DESIGN ON DEMAND
Heading: DESIGN AS A SERVICE
Tagline: On demand. Need-based support. Lean and flexible.
Pricing label: Hourly pricing
Body: Feature design, iterations, review cycles. Works alongside
      your existing team or dev partner. Weekly or monthly engagement.
Price: ₹3,500 (strikethrough) → ₹1,500 / hour
Note: Minimum 4 hours per session.
CTA: CONNECT WITH US →
```

### 07 — WORKSHOPS (Service 03)
```
Ghost number: 03
Kinetic text: ALIGN ALIGN ALIGN YOUR TEAM
Heading: DESIGN SPRINT / WORKSHOPS
Tagline: Unblock your team. Validate a direction. Fast.
Body: A structured session to align your team, validate a direction,
      or break a product deadlock. Remote or in-person, Bengaluru.
Price: Half-day ₹25,000 · Full-day ₹35,000
CTA: CONNECT WITH US →
```

### 08 — ADD-ONS (Service 04)
```
Ghost number: 04
Kinetic text: EXTEND EXTEND EXTEND AS NEEDED
Heading: BRANDING · DESIGN SYSTEM · PRESENTATIONS
Tagline: As part of a bigger engagement or as a separate offering.
Body: Logo, visual language, and brand direction.
      A timeless identity beyond looking good.
      Pricing on request.
CTA: CONNECT WITH US →
```

### 09 — CONTACT
```
Heading: CONTACT
Subline: For a scope discussion or just to say hello.
Email: admin@studiobrahms.com
Phone: +91 96119 00770
City: Bengaluru
CTA: DROP A MESSAGE →
```

### 10 — FOOTER
```
B mark: large, centered or left
Wordmark: STUDIO BRAHMS
Tagline: Design Consultancy · Bengaluru
```

---

## What To Never Do

- Never use box shadows as decoration
- Never use border-radius greater than 4px — this is an editorial, angular design language
- Never use gradient backgrounds
- Never center-align body text
- Never use more than two font families
- Never hardcode colors — always use CSS custom properties
- Never add hover effects that don't serve a purpose
- Never use placeholder lorem ipsum — use the actual copy above
- Never use Bootstrap, Tailwind, or any CSS framework
- Never style the B mark or wordmark differently from the asset files

---

## Scroll Choreography — Card Stack Behaviour

This is the core interaction of the site. Each section is a **card**. The scroll experience is choreographed — not all cards behave the same way. Build this with CSS `position: sticky` and z-index layering. Do NOT use a scroll-jacking library — keep it native scroll with sticky positioning.

### Card behaviour map

```
CARD 01 — Hero
  Behaviour: Loads normally. Stays fixed in place as subsequent cards stack on top.
  Position: sticky, top: 0
  z-index: 1

CARD 02 — Who We Are
  Behaviour: Slides up from bottom and STACKS on top of Hero card on scroll.
  Animation: translateY(100vh) → translateY(0) as it enters viewport
  Position: sticky, top: 0
  z-index: 2

CARD 02B — Saul Bass / Philosophy
  Behaviour: Does NOT stack. Stays as a STATIC BACKGROUND as the next card scrolls over it.
  Position: relative (not sticky)
  z-index: 3
  Note: This card is a full-bleed background image (Saul Bass portrait).
        It does not move. The What We Do card scrolls over it naturally.

CARD 03 — What We Do
  Behaviour: Scrolls normally ON TOP of the Saul Bass card. No stacking animation.
  Position: relative
  z-index: 4

CARDS 04–07 — Services (Product Design, DaaS, Workshops, Branding)
  Behaviour: Normal scroll. No stacking. All feel like one continuous services section.
  Position: relative
  z-index: 5

CARD 08 — Contact
  Behaviour: STACKS on top of the last service card. Slides up from bottom.
  Animation: translateY(100vh) → translateY(0) as it enters viewport
  Position: sticky, top: 0
  z-index: 6

CARD 09 — Footer
  Behaviour: REVEALED from beneath — does not stack on top.
             As Contact card scrolls away, Footer is already waiting underneath.
  Position: fixed or relative beneath Contact card
  z-index: 0 (below everything — it is revealed, not pushed)
  Note: Footer uses the large B mark as a full-bleed graphic element.
```

### Implementation approach

```html
<!-- HTML structure -->
<div class="card-stack">
  <section class="card card--sticky" id="hero">...</section>
  <section class="card card--sticky" id="who-we-are">...</section>
  <section class="card card--static" id="philosophy">...</section>
  <section class="card card--normal" id="what-we-do">...</section>
  <section class="card card--normal" id="product-design">...</section>
  <section class="card card--normal" id="daas">...</section>
  <section class="card card--normal" id="workshops">...</section>
  <section class="card card--normal" id="branding">...</section>
  <section class="card card--sticky" id="contact">...</section>
  <footer class="card card--reveal" id="footer">...</footer>
</div>
```

```css
/* Base card */
.card {
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
}

/* Stacking cards */
.card--sticky {
  position: sticky;
  top: 0;
}

/* Static background card (Saul Bass) */
.card--static {
  position: relative;
  z-index: 3;
}

/* Normal scroll cards */
.card--normal {
  position: relative;
}

/* Footer — sits beneath, revealed as contact scrolls away */
.card--reveal {
  position: relative;
  z-index: 0;
  margin-top: -100vh; /* Sits behind the contact card initially */
}

/* Z-index stack */
#hero         { z-index: 1; }
#who-we-are   { z-index: 2; }
#philosophy   { z-index: 3; }
#what-we-do   { z-index: 4; }
#product-design,
#daas,
#workshops,
#branding     { z-index: 5; }
#contact      { z-index: 6; }
#footer       { z-index: 0; }
```

### Slide-up animation for stacking cards
```javascript
// Who We Are and Contact cards slide up on scroll entry
const stackCards = document.querySelectorAll('.card--sticky:not(#hero)');

const stackObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('card--visible');
    }
  });
}, { threshold: 0.05 });

stackCards.forEach(card => {
  card.style.transform = 'translateY(60px)';
  card.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
  stackObserver.observe(card);
});
```

---

## Mobile Responsiveness

The site must be fully responsive. Mobile breakpoint: 768px and below.

### Mobile layout principles
- All multi-column layouts collapse to single column
- Display type scales down using clamp() — already defined in type scale above
- Section padding reduces on mobile
- Kinetic text drifts slower on mobile (reduce animation duration by 40%)
- Sticky card scroll behaviour is PRESERVED on mobile — same choreography, smaller cards
- The Saul Bass background card remains full-bleed on mobile, portrait cropped to face

### Mobile-specific overrides

```css
@media (max-width: 768px) {

  :root {
    --section-padding-y:  var(--space-xl);       /* Reduce vertical padding */
    --section-padding-x:  var(--space-md);        /* Tighter side margins */
  }

  /* Two-column who-we-are collapses to single column */
  .who-we-are__grid {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }

  /* What we do list — left-align, full width */
  .what-we-do__list {
    text-align: left;
    font-size: clamp(28px, 8vw, 48px);
  }

  /* Service sections — stack image below text */
  .service__grid {
    grid-template-columns: 1fr;
  }
  .service__image {
    order: 2;
    height: 240px;                              /* Fixed height image block on mobile */
  }

  /* Kinetic text — slower drift on mobile */
  .kinetic-text {
    animation-duration: 30s;
  }

  /* Ghost section number — smaller on mobile */
  .section-number {
    font-size: clamp(80px, 20vw, 140px);
  }

  /* Contact form — full width inputs */
  .contact__form input,
  .contact__form textarea {
    width: 100%;
  }

  /* Footer B mark — scale down */
  .footer__b-mark {
    width: 60vw;
  }

  /* Nav — hide center links, show hamburger */
  .nav__links {
    display: none;
  }
  .nav__hamburger {
    display: flex;
  }
}
```

### Mobile nav pattern
```html
<nav class="nav">
  <div class="nav__logo">
    <img src="images/brahms-b-mark.png" alt="Studio Brahms">
  </div>
  <div class="nav__links">
    <a href="#who-we-are">WHO WE ARE</a>
    <a href="#what-we-do">WHAT WE DO</a>
    <a href="#contact">CONTACT</a>
  </div>
  <!-- Mobile only -->
  <button class="nav__hamburger" aria-label="Menu">
    <span></span><span></span>
  </button>
</nav>

<!-- Mobile menu overlay -->
<div class="nav__mobile-menu">
  <a href="#who-we-are">WHO WE ARE</a>
  <a href="#what-we-do">WHAT WE DO</a>
  <a href="#contact">CONTACT</a>
</div>
```

```css
.nav__hamburger { display: none; }

@media (max-width: 768px) {
  .nav__hamburger {
    display: flex;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
  }
  .nav__hamburger span {
    width: 24px;
    height: 1.5px;
    background: var(--color-text-primary);
    transition: transform 0.3s ease;
  }
  .nav__mobile-menu {
    position: fixed;
    inset: 0;
    background: var(--color-bg-dark);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--space-lg);
    transform: translateX(100%);
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 100;
  }
  .nav__mobile-menu.is-open {
    transform: translateX(0);
  }
  .nav__mobile-menu a {
    font-family: var(--font-display);
    font-size: clamp(36px, 10vw, 56px);
    color: var(--color-text-primary);
    text-decoration: none;
    letter-spacing: 0.02em;
  }
}
```

---

## Contact Form

The contact section includes a form. Build it as a standard HTML form — no JS submission yet. Structure it for easy backend connection later (Netlify Forms, Formspree, or custom).

```html
<form class="contact__form" name="contact" netlify>
  <div class="form__field">
    <label for="name">Name</label>
    <input type="text" id="name" name="name" placeholder="Your name" required>
  </div>
  <div class="form__field">
    <label for="email">Email</label>
    <input type="email" id="email" name="email" placeholder="your@email.com" required>
  </div>
  <div class="form__field">
    <label for="message">Message</label>
    <textarea id="message" name="message" rows="5" placeholder="Tell us about your project" required></textarea>
  </div>
  <button type="submit" class="form__submit">CONNECT →</button>
</form>
```

```css
.contact__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  max-width: 480px;
}

.form__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.form__field label {
  font-family: var(--font-body);
  font-size: var(--text-small);
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.form__field input,
.form__field textarea {
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--color-border-dark);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  font-size: var(--text-body);
  font-weight: 300;
  padding: var(--space-sm) 0;
  outline: none;
  transition: border-color 0.3s ease;
  resize: none;
}

.form__field input:focus,
.form__field textarea:focus {
  border-bottom-color: var(--color-gold);
}

.form__submit {
  align-self: flex-start;
  background: none;
  border: none;
  color: var(--color-gold);
  font-family: var(--font-body);
  font-size: var(--text-small);
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  padding: 0;
  position: relative;
  transition: color 0.3s ease;
}

.form__submit::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--color-gold);
  transition: width 0.3s ease;
}

.form__submit:hover::after {
  width: 100%;
}
```

---

## Future Enhancements — Structure For These Now

These are not built yet but the code must not conflict with them:

- Case study modals — each service section will have expandable case study content
- Works gallery — filterable grid of past work
- GSAP ScrollTrigger — will replace CSS scroll animations for more control
- Contact form — will replace the static contact details
- Mobile nav — hamburger menu for mobile

Prepare for these by:
- Giving every section a unique ID
- Using semantic HTML throughout
- Keeping JS modular — one function per behaviour
- Never inline styles — all styling via CSS classes

---

*Last updated: June 2026*
*Project: studiobrahms-web*
*Reference: Rate card v1, Homepage design v2*
