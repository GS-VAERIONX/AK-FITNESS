/* ============================================
   A K FITNESS — SPA Router
   Hash-based client-side routing with guards
   ============================================ */

import { isAuthenticated } from './auth.js';

// ── Route Registry ──────────────────────────────────────────────────────────
const routes = {};
let currentPath = null;
let onRouteChangeCallbacks = [];

/**
 * Register a route
 * @param {string} path - Route path (e.g., '/home')
 * @param {Function} handler - Render function(container, params)
 * @param {Object} options - { isProtected: boolean }
 */
export function registerRoute(path, handler, options = {}) {
  routes[path] = {
    handler,
    isProtected: options.isProtected || false,
  };
}

/**
 * Navigate to a route programmatically
 * @param {string} path - Route path (e.g., '/memberships')
 */
export function navigate(path) {
  window.location.hash = '#' + path;
}

/**
 * Get current route path
 */
export function getCurrentPath() {
  return currentPath;
}

/**
 * Register a callback for route changes (used by navbar to update active state)
 */
export function onRouteChange(callback) {
  onRouteChangeCallbacks.push(callback);
}

/**
 * Parse hash into path and query params
 */
function parseHash() {
  const hash = window.location.hash.slice(1) || '/home';
  const [path, queryString] = hash.split('?');
  const params = new URLSearchParams(queryString || '');
  return { path, params };
}

/**
 * Handle route changes with animated transitions
 */
function handleRouteChange() {
  const { path, params } = parseHash();
  const route = routes[path];

  // 404 fallback
  if (!route) {
    if (routes['/404']) {
      const container = document.getElementById('page-content');
      if (container) {
        currentPath = '/404';
        routes['/404'].handler(container, params);
        notifyRouteChange('/404');
      }
    }
    return;
  }

  // Auth guard for protected routes
  if (route.isProtected && !isAuthenticated()) {
    navigate('/login');
    return;
  }

  // If already logged in and visiting login/register, redirect to dashboard
  if ((path === '/login' || path === '/register') && isAuthenticated()) {
    navigate('/dashboard');
    return;
  }

  const container = document.getElementById('page-content');
  if (!container) return;

  // Animate page transition
  if (currentPath !== null && currentPath !== path) {
    container.style.opacity = '0';
    container.style.transform = 'translateY(10px)';

    setTimeout(() => {
      currentPath = path;
      container.innerHTML = '';
      route.handler(container, params);

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'instant' });

      // Animate in
      requestAnimationFrame(() => {
        container.style.transition = 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
      });

      // Init scroll animations for new page
      initScrollAnimations(container);
      notifyRouteChange(path);
    }, 200);
  } else {
    // First render — no exit animation
    currentPath = path;
    container.innerHTML = '';
    route.handler(container, params);
    container.style.opacity = '1';
    container.style.transform = 'translateY(0)';

    initScrollAnimations(container);
    notifyRouteChange(path);
  }
}

/**
 * Notify all route change listeners
 */
function notifyRouteChange(path) {
  onRouteChangeCallbacks.forEach((cb) => cb(path));
}

/**
 * Initialize IntersectionObserver for scroll-triggered animations
 */
function initScrollAnimations(container) {
  const revealElements = container.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

/**
 * Initialize the router
 */
export function initRouter() {
  window.addEventListener('hashchange', handleRouteChange);

  // Handle initial load
  if (!window.location.hash) {
    window.location.hash = '#/home';
  } else {
    handleRouteChange();
  }
}

/**
 * Show a toast notification
 */
export function showToast(message, type = 'success') {
  // Remove existing toasts
  document.querySelectorAll('.toast').forEach((t) => t.remove());

  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span>${message}</span>
  `;

  document.body.appendChild(toast);

  // Auto-remove after 4 seconds
  setTimeout(() => {
    toast.style.animation = 'fadeInRight 0.3s var(--ease-out) reverse forwards';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
