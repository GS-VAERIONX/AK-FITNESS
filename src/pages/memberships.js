/* ============================================
   A K FITNESS — Memberships Page
   Pricing cards with dynamic plan selection
   ============================================ */

import { getPlans } from '../db.js';
import { isAuthenticated } from '../auth.js';
import { navigate } from '../router.js';
import { formatPrice } from '../upi.js';
import { showPaymentModal } from '../components/payment-modal.js';

export function render(container) {
  const plans = getPlans();
  const planKeys = Object.keys(plans);

  // Split into row 1 (first 3) and row 2 (last 2)
  const row1 = planKeys.slice(0, 3);
  const row2 = planKeys.slice(3);

  container.innerHTML = `
    <!-- MEMBERSHIPS HERO -->
    <section class="memberships-hero">
      <div class="container">
        <span class="section-label">Membership Plans</span>
        <h1>Invest in <span class="gradient-text">Yourself</span></h1>
        <div class="gold-divider"></div>
        <p style="max-width: 550px; margin: 0 auto; font-size: var(--fs-lg);">
          Choose the plan that fits your goals. Every membership includes full gym access 
          and premium facilities.
        </p>
      </div>
    </section>

    <!-- PRICING CARDS -->
    <section class="section" style="padding-top: 0;">
      <div class="container">
        <!-- Row 1: Monthly, Quarterly, Annual -->
        <div class="pricing-grid stagger-children">
          ${row1.map((key) => renderPricingCard(plans[key])).join('')}
        </div>

        <!-- Row 2: PT Package, VIP Package -->
        <div class="pricing-grid-row-2 stagger-children">
          ${row2.map((key) => renderPricingCard(plans[key])).join('')}
        </div>
      </div>
    </section>

    <!-- FAQ SECTION -->
    <section class="section" style="background: var(--bg-secondary);">
      <div class="container" style="max-width: 720px;">
        <div class="section-header reveal">
          <span class="section-label">FAQ</span>
          <h2>Common <span class="gradient-text">Questions</span></h2>
        </div>

        <div class="reveal" style="display: flex; flex-direction: column; gap: var(--space-4);">
          ${renderFAQ('How do I pay for my membership?', 'We accept UPI payments (Google Pay, PhonePe, Paytm). Select your plan, scan the QR code, and confirm via WhatsApp. Your membership will be activated within minutes.')}
          ${renderFAQ('Can I upgrade my plan later?', 'Absolutely! You can upgrade to a higher plan anytime. Contact Ajay via WhatsApp to discuss your upgrade options.')}
          ${renderFAQ("What's included in the VIP Package?", 'The VIP Package is our premium offering — you get personal training sessions, customized diet plans (Fat Loss, Weight Gain, Muscle Gain), a dedicated locker, and priority WhatsApp support.')}
          ${renderFAQ('What are the gym timings?', 'Monday to Saturday: 5:30 AM – 10:00 PM. Sunday: 6:00 AM – 12:00 PM. We offer flexible timing for our members.')}
          ${renderFAQ('Is there a trial period?', 'We offer a 1-day free trial for new members. Visit us with a valid ID to experience the A K FITNESS difference before committing.')}
        </div>
      </div>
    </section>

    <!-- BOTTOM CTA -->
    <section class="section">
      <div class="container text-center">
        <div class="reveal-scale">
          <h3 style="margin-bottom: var(--space-3);">Still deciding?</h3>
          <p style="margin: 0 auto var(--space-6); max-width: 450px;">
            Chat with Ajay directly on WhatsApp. He'll help you pick the perfect plan for your goals.
          </p>
          <a 
            href="https://wa.me/919053386350?text=Hi%20Ajay%2C%20I%20need%20help%20choosing%20a%20membership%20plan%20at%20A%20K%20FITNESS." 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn btn-whatsapp btn-lg"
          >
            💬 Ask Ajay on WhatsApp
          </a>
        </div>
      </div>
    </section>
  `;

  // Attach plan selection handlers
  container.querySelectorAll('[data-plan-id]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const planId = btn.getAttribute('data-plan-id');
      handlePlanSelect(planId);
    });
  });

  // FAQ toggle
  container.querySelectorAll('.faq-question').forEach((q) => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const isOpen = item.classList.contains('open');
      // Close all
      container.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('open'));
      // Toggle clicked
      if (!isOpen) item.classList.add('open');
    });
  });
}

/**
 * Render a pricing card
 */
function renderPricingCard(plan) {
  const isFeatured = plan.featured;
  const periodLabel = plan.duration === 365 ? '/year' : plan.duration === 90 ? '/quarter' : '/month';

  return `
    <div class="pricing-card ${isFeatured ? 'pricing-card-featured' : ''} reveal">
      ${isFeatured ? '<span class="badge badge-vip plan-badge">MOST POPULAR</span>' : ''}
      
      <div class="plan-icon">${plan.icon}</div>
      <div class="plan-name">${plan.name}</div>
      <div class="plan-price gradient-text">
        <span class="currency">₹</span>${plan.price.toLocaleString('en-IN')}
      </div>
      <div class="plan-period">${periodLabel} ${plan.description ? '• ' + plan.description : ''}</div>

      <ul class="plan-features">
        ${plan.features.map((f) => `
          <li>
            <span class="check">✓</span>
            <span>${f}</span>
          </li>
        `).join('')}
      </ul>

      <button class="btn ${isFeatured ? 'btn-primary' : 'btn-outline'} btn-full" data-plan-id="${plan.id}">
        ${isFeatured ? 'Get VIP Access →' : 'Choose Plan →'}
      </button>
    </div>
  `;
}

/**
 * Render a FAQ item
 */
function renderFAQ(question, answer) {
  return `
    <div class="faq-item" style="
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      overflow: hidden;
      transition: border-color var(--transition-fast);
    ">
      <button class="faq-question" style="
        width: 100%;
        padding: var(--space-5) var(--space-6);
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: var(--font-heading);
        font-size: var(--fs-sm);
        font-weight: var(--fw-semibold);
        color: var(--text-primary);
        cursor: pointer;
        text-align: left;
        gap: var(--space-4);
        background: none;
        border: none;
      ">
        <span>${question}</span>
        <span class="faq-icon" style="
          color: var(--accent-gold);
          font-size: var(--fs-lg);
          transition: transform var(--transition-base);
          flex-shrink: 0;
        ">+</span>
      </button>
      <div class="faq-answer" style="
        max-height: 0;
        overflow: hidden;
        transition: max-height var(--transition-slow), padding var(--transition-slow);
      ">
        <div style="
          padding: 0 var(--space-6) var(--space-5);
          font-size: var(--fs-sm);
          color: var(--text-secondary);
          line-height: var(--lh-relaxed);
        ">${answer}</div>
      </div>
    </div>
    <style>
      .faq-item.open {
        border-color: var(--accent-gold-border) !important;
      }
      .faq-item.open .faq-icon {
        transform: rotate(45deg);
      }
      .faq-item.open .faq-answer {
        max-height: 200px !important;
      }
    </style>
  `;
}

/**
 * Handle plan selection
 */
function handlePlanSelect(planId) {
  if (isAuthenticated()) {
    // Show payment modal
    showPaymentModal(planId);
  } else {
    // Redirect to register with plan pre-selected
    navigate(`/register?plan=${planId}`);
  }
}
