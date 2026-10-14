/* ============================================
   A K FITNESS — Navbar Component
   Fixed navigation with mobile drawer
   ============================================ */

import { navigate, onRouteChange, getCurrentPath } from '../router.js';
import { isAuthenticated, logout, getCurrentUser } from '../auth.js';

/**
 * Render the navbar into the app
 */
export function renderNavbar() {
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.id = 'main-navbar';
  nav.innerHTML = getNavbarHTML();

  // Insert at start of #app
  const app = document.getElementById('app');
  const existing = document.getElementById('main-navbar');
  if (existing) existing.remove();
  app.insertBefore(nav, app.firstChild);

  // Mobile overlay
  let overlay = document.getElementById('navbar-mobile-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'navbar-mobile-overlay';
    overlay.id = 'navbar-mobile-overlay';
    app.insertBefore(overlay, nav.nextSibling);
  }

  attachNavbarEvents(nav, overlay);
  updateActiveLink(getCurrentPath());

  // Listen for route changes to update active state
  onRouteChange((path) => {
    updateNavbar();
    updateActiveLink(path);
  });

  // Scroll listener for navbar bg
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });
}

/**
 * Generate navbar HTML (recalculated on auth state change)
 */
function getNavbarHTML() {
  const authenticated = isAuthenticated();
  const user = getCurrentUser();

  return `
    <div class="navbar-inner">
      <a href="#/home" class="navbar-logo" id="nav-logo">
        A K <span>FITNESS</span>
      </a>

      <div class="navbar-links" id="nav-links">
        <a href="#/home" class="navbar-link" data-route="/home">Home</a>
        <a href="#/about" class="navbar-link" data-route="/about">About</a>
        <a href="#/memberships" class="navbar-link" data-route="/memberships">Plans</a>
        <a href="#/contact" class="navbar-link" data-route="/contact">Contact</a>
      </div>

      <div class="navbar-auth" id="nav-auth">
        ${authenticated
          ? `
            <a href="#/dashboard" class="btn btn-outline btn-sm" data-route="/dashboard">
              Dashboard
            </a>
            <button class="btn btn-ghost btn-sm" id="nav-logout-btn">
              Logout
            </button>
          `
          : `
            <a href="#/login" class="btn btn-ghost btn-sm" data-route="/login">Login</a>
            <a href="#/register" class="btn btn-primary btn-sm" data-route="/register">Join Now</a>
          `
        }
      </div>

      <button class="navbar-toggle" id="nav-toggle" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile menu drawer -->
    <div class="navbar-mobile" id="nav-mobile">
      <a href="#/home" class="navbar-link" data-route="/home">Home</a>
      <a href="#/about" class="navbar-link" data-route="/about">About</a>
      <a href="#/memberships" class="navbar-link" data-route="/memberships">Plans</a>
      <a href="#/contact" class="navbar-link" data-route="/contact">Contact</a>
      <div class="divider"></div>
      ${authenticated
        ? `
          <a href="#/dashboard" class="navbar-link" data-route="/dashboard">📊 Dashboard</a>
          <button class="btn btn-outline btn-full mt-4" id="nav-mobile-logout-btn">Logout</button>
        `
        : `
          <a href="#/login" class="navbar-link" data-route="/login">Login</a>
          <a href="#/register" class="btn btn-primary btn-full mt-4">Join Now</a>
        `
      }
    </div>
  `;
}

/**
 * Attach event listeners to navbar
 */
function attachNavbarEvents(nav, overlay) {
  const toggle = nav.querySelector('#nav-toggle');
  const mobile = nav.querySelector('#nav-mobile');

  // Hamburger toggle
  if (toggle) {
    toggle.addEventListener('click', () => {
      const isOpen = mobile.classList.contains('open');
      toggleMobileMenu(!isOpen, toggle, mobile, overlay);
    });
  }

  // Overlay click closes menu
  overlay.addEventListener('click', () => {
    toggleMobileMenu(false, toggle, mobile, overlay);
  });

  // Close mobile menu on link click
  nav.querySelectorAll('.navbar-mobile .navbar-link, .navbar-mobile .btn').forEach((link) => {
    link.addEventListener('click', () => {
      toggleMobileMenu(false, toggle, mobile, overlay);
    });
  });

  // Logout button(s)
  const logoutBtn = nav.querySelector('#nav-logout-btn');
  const mobileLogoutBtn = nav.querySelector('#nav-mobile-logout-btn');

  const handleLogout = () => {
    logout();
    toggleMobileMenu(false, toggle, mobile, overlay);
    navigate('/home');
    updateNavbar();
  };

  if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
  if (mobileLogoutBtn) mobileLogoutBtn.addEventListener('click', handleLogout);
}

/**
 * Toggle mobile menu open/close
 */
function toggleMobileMenu(open, toggle, mobile, overlay) {
  toggle.classList.toggle('active', open);
  mobile.classList.toggle('open', open);
  overlay.classList.toggle('open', open);
  document.body.classList.toggle('no-scroll', open);
}

/**
 * Update navbar content (e.g., after login/logout)
 */
export function updateNavbar() {
  const nav = document.getElementById('main-navbar');
  const overlay = document.getElementById('navbar-mobile-overlay');
  if (!nav) return;

  nav.innerHTML = getNavbarHTML();
  attachNavbarEvents(nav, overlay);
  updateActiveLink(getCurrentPath());
}

/**
 * Highlight the active nav link
 */
function updateActiveLink(path) {
  const nav = document.getElementById('main-navbar');
  if (!nav) return;

  nav.querySelectorAll('.navbar-link').forEach((link) => {
    const route = link.getAttribute('data-route');
    link.classList.toggle('active', route === path);
  });
}
