/**
 * Theme Management (Light / Dark Mode)
 */

export function initTheme() {
  const theme = localStorage.getItem('theme') || 'dark'; // default dark
  
  if (theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export function toggleTheme() {
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    return 'light';
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    return 'dark';
  }
}

// Auto-run theme setup immediately on script load to prevent flash of light mode
initTheme();
