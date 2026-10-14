/* ============================================
   A K FITNESS — Main Entry Point
   Initializes router, components, and layout
   ============================================ */

import { initRouter, registerRoute } from './router.js';
import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { renderWhatsAppFAB } from './components/whatsapp-fab.js';

// Import Pages
import { render as renderHome } from './pages/home.js';
import { render as renderAbout } from './pages/about.js';
import { render as renderMemberships } from './pages/memberships.js';
import { render as renderContact } from './pages/contact.js';
import { render as renderLogin } from './pages/login.js';
import { render as renderRegister } from './pages/register.js';
import { render as renderDashboard } from './pages/dashboard.js';
import { render as renderNotFound } from './pages/notfound.js';

// CSS is loaded via index.html directly

/**
 * Initialize Application
 */
function initApp() {
  const app = document.getElementById('app');
  if (!app) return;

  // Clear splash screen
  const splash = document.getElementById('splash-screen');
  if (splash) {
    splash.style.opacity = '0';
    splash.style.transition = 'opacity 0.5s ease';
    setTimeout(() => splash.remove(), 500);
  }

  // Set up layout container for pages
  const contentContainer = document.createElement('main');
  contentContainer.id = 'page-content';
  contentContainer.style.opacity = '0';
  app.appendChild(contentContainer);

  // Register Routes
  registerRoute('/home', renderHome);
  registerRoute('/about', renderAbout);
  registerRoute('/memberships', renderMemberships);
  registerRoute('/contact', renderContact);
  registerRoute('/login', renderLogin);
  registerRoute('/register', renderRegister);
  
  // Protected Routes
  registerRoute('/dashboard', renderDashboard, { isProtected: true });
  
  // 404 Route
  registerRoute('/404', renderNotFound);

  // Render Global Components
  renderNavbar();
  renderFooter();
  renderWhatsAppFAB();

  // Start Router
  initRouter();
}

// Bootstrap
document.addEventListener('DOMContentLoaded', initApp);
