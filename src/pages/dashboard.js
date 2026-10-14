/* ============================================
   A K FITNESS — Dashboard Page
   Member portal, plan status, VIP zone
   ============================================ */

import { getCurrentUser, isPlanActive, getDaysRemaining } from '../auth.js';
import { getPlan } from '../db.js';
import { navigate } from '../router.js';
import { formatPrice } from '../upi.js';

export function render(container) {
  const user = getCurrentUser();
  if (!user) {
    navigate('/login');
    return;
  }

  const active = isPlanActive();
  const plan = user.activePlan ? getPlan(user.activePlan) : null;
  const daysRemaining = getDaysRemaining();
  
  // Format dates
  const regDate = new Date(user.registeredAt).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric'
  });
  
  let nextDate = 'N/A';
  if (user.nextPaymentDate) {
    nextDate = new Date(user.nextPaymentDate).toLocaleDateString('en-IN', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  }

  container.innerHTML = `
    <div class="dashboard container">
      <!-- Welcome Header -->
      <div class="dashboard-welcome reveal-left">
        <span class="section-label">Member Portal</span>
        <h1>Welcome, <span class="gradient-text">${user.name.split(' ')[0]}</span></h1>
        <p class="text-secondary">Manage your membership and access exclusive content.</p>
      </div>

      <div class="dashboard-grid stagger-children">
        <!-- Membership Status Card -->
        <div class="dashboard-card card-gold reveal">
          <h3>
            <span style="color: var(--accent-gold);">🎟️</span> Membership Status
            ${active 
              ? '<span class="badge badge-success ml-auto" style="margin-left: auto;">ACTIVE</span>' 
              : '<span class="badge badge-error ml-auto" style="margin-left: auto;">EXPIRED</span>'}
          </h3>
          
          ${plan ? `
            <div class="plan-status">
              <div style="font-size: 3rem;">${plan.icon}</div>
              <div class="plan-info">
                <div class="plan-name-display">${plan.name}</div>
                <div class="plan-amount">${formatPrice(plan.price)} / ${plan.duration} days</div>
              </div>
            </div>
            
            <div class="payment-due">
              <div class="due-label">Next Payment Due</div>
              <div class="due-date">${nextDate}</div>
              ${active 
                ? `<div class="due-countdown">${daysRemaining} days remaining</div>` 
                : `<div class="due-countdown" style="color: var(--error);">Payment overdue</div>`}
            </div>
            
            <button class="btn btn-primary btn-full mt-4" id="dashboard-renew-btn" data-plan-id="${plan.id}">
              Renew Plan →
            </button>
          ` : `
            <div class="empty-state" style="padding: var(--space-6) 0;">
              <p>You don't have an active membership plan yet.</p>
              <a href="#/memberships" class="btn btn-primary mt-4">Browse Plans</a>
            </div>
          `}
        </div>

        <!-- Profile Details Card -->
        <div class="dashboard-card reveal">
          <h3>
            <span style="color: var(--accent-gold);">👤</span> Profile Details
          </h3>
          
          <div style="display: flex; flex-direction: column; gap: var(--space-4);">
            <div style="border-bottom: 1px solid var(--border-color); padding-bottom: var(--space-3);">
              <div class="text-xs text-muted text-uppercase font-bold mb-1">Full Name</div>
              <div>${user.name}</div>
            </div>
            
            <div style="border-bottom: 1px solid var(--border-color); padding-bottom: var(--space-3);">
              <div class="text-xs text-muted text-uppercase font-bold mb-1">Phone Number</div>
              <div>${user.phone.replace(/(\d{5})(\d{5})/, '$1 $2')}</div>
            </div>
            
            <div>
              <div class="text-xs text-muted text-uppercase font-bold mb-1">Member Since</div>
              <div>${regDate}</div>
            </div>
          </div>
          
          <div class="mt-8 text-sm text-secondary">
            Need to update your details? Contact support on WhatsApp.
          </div>
        </div>

        <!-- VIP ZONE (Conditionally Rendered) -->
        ${user.activePlan === 'vip' && active ? `
          <div class="dashboard-card dashboard-card-full vip-zone reveal-scale">
            <h3 style="display: flex; justify-content: space-between; align-items: center;">
              <span><span style="color: var(--accent-gold);">💎</span> VIP Member Zone</span>
              <span class="badge badge-vip">EXCLUSIVE</span>
            </h3>
            
            <div class="grid grid-2 mt-6">
              <!-- Locker Info -->
              <div>
                <h4 class="mb-4 font-heading text-sm text-uppercase">Your Dedicated Locker</h4>
                <div class="vip-locker">
                  <div class="locker-icon">🔐</div>
                  <div>
                    <div class="text-xs text-muted text-uppercase">Locker Number</div>
                    <div class="locker-number">#${user.lockerNumber || 'PENDING'}</div>
                  </div>
                </div>
                <p class="text-xs text-secondary mt-2">
                  This locker is reserved exclusively for you during your membership.
                </p>
              </div>
              
              <!-- Diet Plans -->
              <div>
                <h4 class="mb-4 font-heading text-sm text-uppercase">Custom Diet Plans</h4>
                <div class="vip-diets">
                  <div class="vip-diet-card" onclick="alert('Downloading Fat Loss Diet Plan PDF...')">
                    <div class="diet-card-icon">🔥</div>
                    <h4>Fat Loss</h4>
                    <p class="text-muted">Download PDF</p>
                  </div>
                  <div class="vip-diet-card" onclick="alert('Downloading Weight Gain Diet Plan PDF...')">
                    <div class="diet-card-icon">💪</div>
                    <h4>Weight Gain</h4>
                    <p class="text-muted">Download PDF</p>
                  </div>
                  <div class="vip-diet-card" onclick="alert('Downloading Muscle Gain Diet Plan PDF...')">
                    <div class="diet-card-icon">🎯</div>
                    <h4>Muscle Gain</h4>
                    <p class="text-muted">Download PDF</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  // Attach renew button listener if it exists
  const renewBtn = container.querySelector('#dashboard-renew-btn');
  if (renewBtn) {
    renewBtn.addEventListener('click', () => {
      const planId = renewBtn.getAttribute('data-plan-id');
      navigate(`/memberships`); // Redirect to memberships to handle payment flow
    });
  }
}
