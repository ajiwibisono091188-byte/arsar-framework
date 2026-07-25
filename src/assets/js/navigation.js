/**
 * Navigation Logic
 */

export function initNavigation() {
  const header = document.querySelector('header');
  const scrollThreshold = 50;

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > scrollThreshold) {
        header.classList.add('shadow-md', 'backdrop-blur-md', 'bg-opacity-90');
      } else {
        header.classList.remove('shadow-md', 'backdrop-blur-md', 'bg-opacity-90');
      }
    });
  }
}

export function setupMobileMenu() {
  return {
    isOpen: false,
    toggle() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },
    close() {
      this.isOpen = false;
      document.body.style.overflow = '';
    }
  };
}
