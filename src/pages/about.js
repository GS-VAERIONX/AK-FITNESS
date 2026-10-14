/* ============================================
   A K FITNESS — About Page
   Gym details, diet programs, stats, owner
   ============================================ */

export function render(container) {
  container.innerHTML = `
    <!-- ABOUT HERO -->
    <section class="about-hero">
      <div class="container">
        <span class="section-label">About Us</span>
        <h1>The <span class="gradient-text">A K FITNESS</span> Story</h1>
        <div class="gold-divider"></div>
        <p style="max-width: 600px; margin: 0 auto; font-size: var(--fs-lg);">
          Where premium meets performance. Kalayat's finest gym built for those who demand excellence.
        </p>
      </div>
    </section>

    <!-- PREMIUM ENVIRONMENT -->
    <section class="section">
      <div class="container">
        <div class="about-split">
          <div class="about-image reveal-left">
            <div style="display: flex; flex-direction: column; align-items: center; gap: var(--space-4); color: var(--text-muted);">
              <span style="font-size: 5rem;">🏋️‍♂️</span>
              <span style="font-family: var(--font-heading); font-weight: var(--fw-bold); font-size: var(--fs-lg); color: var(--accent-gold);">A K FITNESS</span>
              <span style="font-size: var(--fs-sm);">Premium Gym Interior</span>
            </div>
          </div>
          <div class="about-text reveal-right">
            <span class="section-label">Our Space</span>
            <h3>Premium Equipment & Environment</h3>
            <div class="gold-divider gold-divider-left"></div>
            <p>
              At A K FITNESS, we've invested in the finest commercial-grade equipment from 
              leading manufacturers. Every machine is selected for maximum effectiveness 
              and user comfort.
            </p>
            <p>
              Our gym features a clean, well-ventilated space with premium interiors, 
              dedicated training zones, and an atmosphere designed to push you beyond your limits.
            </p>
            <p>
              Located near HDFC Bank in Kalayat, we're easily accessible and offer 
              ample parking for our members.
            </p>
            <div style="margin-top: var(--space-6);">
              <a href="#/memberships" class="btn btn-primary">Explore Our Plans →</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- DIET PROGRAMS -->
    <section class="section" style="background: var(--bg-secondary);">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-label">Targeted Nutrition</span>
          <h2>Customized <span class="gradient-text">Diet Programs</span></h2>
          <p>Every body is different. Our diet plans are tailored to your specific goals and body type.</p>
        </div>

        <div class="grid grid-3 stagger-children">
          <div class="diet-card fat-loss reveal">
            <div class="diet-icon">🔥</div>
            <h4>Fat Loss Program</h4>
            <div class="gold-divider"></div>
            <p>
              Strategic caloric deficit with high-protein meals. Designed to preserve muscle 
              while melting stubborn fat. Includes meal timing and macro tracking.
            </p>
            <ul style="text-align: left; margin-top: var(--space-4); font-size: var(--fs-sm); color: var(--text-secondary);">
              <li style="padding: var(--space-2) 0; border-bottom: 1px solid var(--border-color);">✓ Personalized calorie targets</li>
              <li style="padding: var(--space-2) 0; border-bottom: 1px solid var(--border-color);">✓ High-protein meal plans</li>
              <li style="padding: var(--space-2) 0; border-bottom: 1px solid var(--border-color);">✓ Strategic carb cycling</li>
              <li style="padding: var(--space-2) 0;">✓ Weekly progress reviews</li>
            </ul>
          </div>

          <div class="diet-card weight-gain reveal">
            <div class="diet-icon">💪</div>
            <h4>Weight Gain Plan</h4>
            <div class="gold-divider"></div>
            <p>
              Clean bulking nutrition designed to add quality mass without excess fat. 
              Caloric surplus with optimal macro ratios for lean weight gain.
            </p>
            <ul style="text-align: left; margin-top: var(--space-4); font-size: var(--fs-sm); color: var(--text-secondary);">
              <li style="padding: var(--space-2) 0; border-bottom: 1px solid var(--border-color);">✓ Surplus calorie planning</li>
              <li style="padding: var(--space-2) 0; border-bottom: 1px solid var(--border-color);">✓ 6-meal daily structure</li>
              <li style="padding: var(--space-2) 0; border-bottom: 1px solid var(--border-color);">✓ Supplement guidance</li>
              <li style="padding: var(--space-2) 0;">✓ Weight tracking support</li>
            </ul>
          </div>

          <div class="diet-card muscle-gain reveal">
            <div class="diet-icon">🎯</div>
            <h4>Muscle Gain Diet</h4>
            <div class="gold-divider"></div>
            <p>
              Precision nutrition for maximum muscle protein synthesis. Optimized protein timing, 
              strategic carb loading, and targeted supplementation.
            </p>
            <ul style="text-align: left; margin-top: var(--space-4); font-size: var(--fs-sm); color: var(--text-secondary);">
              <li style="padding: var(--space-2) 0; border-bottom: 1px solid var(--border-color);">✓ Protein-optimized meals</li>
              <li style="padding: var(--space-2) 0; border-bottom: 1px solid var(--border-color);">✓ Pre/post workout nutrition</li>
              <li style="padding: var(--space-2) 0; border-bottom: 1px solid var(--border-color);">✓ Creatine & BCAA protocols</li>
              <li style="padding: var(--space-2) 0;">✓ Monthly diet adjustments</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="stats-section section" id="about-stats">
      <div class="container">
        <div class="grid grid-4 stagger-children">
          <div class="stat-item reveal">
            <div class="stat-number" data-count="500">0</div>
            <div class="stat-label">Happy Members</div>
          </div>
          <div class="stat-item reveal">
            <div class="stat-number" data-count="5">0</div>
            <div class="stat-label">Years Strong</div>
          </div>
          <div class="stat-item reveal">
            <div class="stat-number" data-count="100">0</div>
            <div class="stat-label">Transformations</div>
          </div>
          <div class="stat-item reveal">
            <div class="stat-number" data-count="3">0</div>
            <div class="stat-label">Diet Programs</div>
          </div>
        </div>
      </div>
    </section>

    <!-- OWNER SPOTLIGHT -->
    <section class="section owner-section">
      <div class="container" style="max-width: 600px;">
        <div class="reveal-scale">
          <div class="owner-avatar">
            💪
          </div>
          <span class="section-label">Your Trainer</span>
          <h3 style="margin-bottom: var(--space-3);">Ajay Lamba</h3>
          <div class="gold-divider"></div>
          <p style="margin: 0 auto var(--space-4); text-align: center;">
            Founder & Head Trainer at A K FITNESS. With years of experience in personal training 
            and nutrition planning, Ajay has helped hundreds of people transform their bodies and lives.
          </p>
          <p style="margin: 0 auto var(--space-6); text-align: center;">
            Specializing in fat loss, muscle building, and strength training, Ajay creates 
            personalized programs that deliver results. Follow his journey on Instagram.
          </p>
          <div style="display: flex; gap: var(--space-4); justify-content: center; flex-wrap: wrap;">
            <a href="https://www.instagram.com/train_with_ajju" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
              📸 @train_with_ajju
            </a>
            <a href="https://wa.me/919053386350" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
              💬 WhatsApp Ajay
            </a>
          </div>
        </div>
      </div>
    </section>
  `;

  // Animate stat counters
  initCounterAnimation(container);
}

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

function animateCounter(element, target) {
  const duration = 2000;
  const start = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    element.textContent = current + '+';
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}
