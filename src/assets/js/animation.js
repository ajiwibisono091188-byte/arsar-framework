/**
 * Scroll Animations & Visual Enhancements
 */

export function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.scroll-animate');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, self) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        entry.target.classList.remove('opacity-0');
        self.unobserve(entry.target); // trigger animation only once
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => {
    el.classList.add('opacity-0', 'transition-all');
    observer.observe(el);
  });
}

/**
 * Setup Glow Cards interactive mouse moves
 */
export function initGlowCards() {
  const cards = document.querySelectorAll('.glow-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}
