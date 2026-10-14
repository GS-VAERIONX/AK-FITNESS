/* ============================================
   A K FITNESS — Home Page
   Hero section, features, Instagram, CTA
   ============================================ */

import { navigate } from '../router.js';

export function render(container) {
  container.innerHTML = `
    <!-- HERO SECTION -->
    <section class="hero" id="hero">
      <!-- Background with gradient & particles -->
      <div class="hero-gradient-bg"></div>
      <div class="hero-particles" id="hero-particles"></div>
      
      <div class="hero-content">
        <span class="section-label">Premium Fitness Experience</span>
        <h1>
          ELEVATE YOUR<br>
          <span class="gradient-text">FITNESS</span>
        </h1>
        <p class="hero-subtitle">
          Kalayat's most exclusive gym. Premium equipment, expert personal training, 
          and customized nutrition plans — all under one roof.
        </p>
        <div class="hero-cta">
          <a href="#/register" class="btn btn-primary btn-lg">
            Join Now →
          </a>
          <a href="#/memberships" class="btn btn-outline btn-lg">
            View Plans
          </a>
        </div>
      </div>

      <div class="hero-scroll">
        <span>Scroll</span>
        <div class="scroll-line"></div>
      </div>
    </section>

    <!-- FEATURES SECTION -->
    <section class="features-section section" id="features">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-label">Why Choose Us</span>
          <h2>The <span class="gradient-text">A K FITNESS</span> Difference</h2>
          <p>We don't just build bodies — we craft transformations.</p>
        </div>

        <div class="grid grid-4 stagger-children">
          <div class="feature-card reveal">
            <div class="feature-icon">🏋️</div>
            <h4>Premium Equipment</h4>
            <p>State-of-the-art machines and free weights for every muscle group. Commercial-grade quality.</p>
          </div>
          <div class="feature-card reveal">
            <div class="feature-icon">🎯</div>
            <h4>Expert Training</h4>
            <p>Personal training sessions with Ajay Lamba. Customized programs for your unique goals.</p>
          </div>
          <div class="feature-card reveal">
            <div class="feature-icon">🥗</div>
            <h4>Targeted Diets</h4>
            <p>Scientifically designed diet plans for fat loss, weight gain, and muscle building.</p>
          </div>
          <div class="feature-card reveal">
            <div class="feature-icon">✨</div>
            <h4>Luxury Amenities</h4>
            <p>Premium interiors, dedicated lockers, clean facilities, and a motivating atmosphere.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS SECTION -->
    <section class="stats-section section" id="stats">
      <div class="container">
        <div class="grid grid-4 stagger-children">
          <div class="stat-item reveal">
            <div class="stat-number" data-count="500">0</div>
            <div class="stat-label">Members Trained</div>
          </div>
          <div class="stat-item reveal">
            <div class="stat-number" data-count="5">0</div>
            <div class="stat-label">Years Experience</div>
          </div>
          <div class="stat-item reveal">
            <div class="stat-number" data-count="100">0</div>
            <div class="stat-label">Transformations</div>
          </div>
          <div class="stat-item reveal">
            <div class="stat-number" data-count="15">0</div>
            <div class="stat-label">Training Programs</div>
          </div>
        </div>
      </div>
    </section>

    <!-- INSTAGRAM SECTION -->
    <section class="instagram-section section" id="instagram">
      <div class="container">
        <div class="instagram-card reveal-scale">
          <div style="font-size: 3rem; margin-bottom: var(--space-4);">📸</div>
          <h3>Follow Our Journey</h3>
          <p class="text-secondary" style="margin: 0 auto var(--space-2);">
            Daily workouts, transformation stories, and fitness tips on Instagram
          </p>
          <p style="font-family: var(--font-heading); font-size: var(--fs-xl); font-weight: var(--fw-bold); color: var(--accent-gold); margin-bottom: var(--space-6);">
            @train_with_ajju
          </p>
          <a 
            href="https://www.instagram.com/train_with_ajju" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn btn-primary btn-lg"
          >
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>

    <!-- CTA SECTION -->
    <section class="cta-section section">
      <div class="container">
        <div class="cta-card reveal-scale">
          <span class="section-label">Start Today</span>
          <h2 style="margin-bottom: var(--space-4);">Ready to <span class="gradient-text">Transform</span>?</h2>
          <p class="text-secondary" style="margin: 0 auto var(--space-8); max-width: 500px; font-size: var(--fs-lg);">
            Join Kalayat's most premium fitness community. Your transformation starts with a single step.
          </p>
          <div class="hero-cta">
            <a href="#/register" class="btn btn-primary btn-lg">
              Start Your Journey →
            </a>
            <a href="https://wa.me/919053386350?text=Hi%20Ajay%2C%20I%20want%20to%20join%20A%20K%20FITNESS!" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-lg">
              💬 Chat with Ajay
            </a>
          </div>
        </div>
      </div>
    </section>
  `;

  // Generate floating particles
  createParticles();

  // Animate stat counters on scroll
  initCounterAnimation(container);
}

/**
 * Create floating gold particles in the hero
 */
function createParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'hero-particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 6}s`;
    particle.style.animationDuration = `${4 + Math.random() * 4}s`;
    particle.style.opacity = `${0.1 + Math.random() * 0.3}`;
    particle.style.width = `${1 + Math.random() * 3}px`;
    particle.style.height = particle.style.width;
    container.appendChild(particle);
  }
}

/**
 * Animate stat counters when they scroll into view
 */
function initCounterAnimation(container) {
  const statNumbers = container.querySelectorAll('.stat-number[data-count]');
  if (statNumbers.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          animateCounter(el, target);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((el) => observer.observe(el));
}

/**
 * Counter animation
 */
function animateCounter(element, target) {
  const duration = 2000;
  const start = performance.now();
  const suffix = target >= 100 ? '+' : '+';

  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);

    element.textContent = current + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
