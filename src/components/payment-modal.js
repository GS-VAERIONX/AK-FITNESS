/* ============================================
   A K FITNESS — Payment Modal Component
   UPI QR code display + WhatsApp confirmation
   ============================================ */

import { generateQRCode, getWhatsAppConfirmURL, formatPrice } from '../upi.js';
import { getCurrentUser } from '../auth.js';
import { getPlan } from '../db.js';

/**
 * Show the payment modal for a specific plan
 * @param {string} planId - Plan identifier
 * @param {Function} onComplete - Callback after payment flow (optional)
 */
export async function showPaymentModal(planId, onComplete) {
  const plan = getPlan(planId);
  const user = getCurrentUser();

  if (!plan || !user) return;

  // Remove existing modal
  closePaymentModal();

  // Create modal backdrop
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.id = 'payment-modal-backdrop';

  // Generate QR code
  const qrDataUrl = await generateQRCode(plan.price, plan.name);

  backdrop.innerHTML = `
    <div class="modal" id="payment-modal">
      <button class="modal-close" id="payment-modal-close" aria-label="Close">✕</button>
      
      <div class="modal-header">
        <div style="font-size: 2.5rem; margin-bottom: var(--space-4);">${plan.icon}</div>
        <h3>${plan.name} Membership</h3>
        <p class="text-secondary" style="margin: 0 auto;">Complete your payment to activate</p>
      </div>

      <!-- Amount -->
      <div style="text-align: center; margin-bottom: var(--space-8);">
        <div style="font-family: var(--font-heading); font-size: var(--fs-4xl); font-weight: var(--fw-extrabold);">
          <span class="gradient-text">${formatPrice(plan.price)}</span>
        </div>
        <div class="text-secondary text-sm">${plan.description}</div>
      </div>

      <!-- QR Code -->
      <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: var(--space-8);">
        <div style="
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color-light);
          border-radius: var(--radius-xl);
          padding: var(--space-6);
          margin-bottom: var(--space-4);
        ">
          ${qrDataUrl 
            ? `<img src="${qrDataUrl}" alt="UPI QR Code" width="280" height="280" style="border-radius: var(--radius-md);" />`
            : `<div style="width: 280px; height: 280px; display: flex; align-items: center; justify-content: center; color: var(--text-muted);">QR Code Generation Failed</div>`
          }
        </div>
        <p class="text-sm text-secondary" style="margin: 0 auto;">Scan with any UPI app to pay</p>
      </div>

      <!-- Instructions -->
      <div style="
        background: var(--accent-gold-subtle);
        border: 1px solid var(--accent-gold-border);
        border-radius: var(--radius-lg);
        padding: var(--space-5);
        margin-bottom: var(--space-6);
        font-size: var(--fs-sm);
      ">
        <div style="font-weight: var(--fw-semibold); color: var(--accent-gold); margin-bottom: var(--space-2);">
          📋 Payment Steps
        </div>
        <ol style="color: var(--text-secondary); padding-left: var(--space-5); display: flex; flex-direction: column; gap: var(--space-2);">
          <li>Scan the QR code above with Google Pay, PhonePe, or Paytm</li>
          <li>Complete the payment of ${formatPrice(plan.price)}</li>
          <li>Click "Confirm Payment" below to notify us via WhatsApp</li>
        </ol>
      </div>

      <!-- Action Buttons -->
      <div style="display: flex; flex-direction: column; gap: var(--space-3);">
        <a 
          href="${getWhatsAppConfirmURL(plan.price, plan.name, user.name, user.phone)}" 
          target="_blank" 
          rel="noopener noreferrer"
          class="btn btn-whatsapp btn-lg btn-full"
          id="payment-confirm-btn"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Confirm Payment via WhatsApp
        </a>
        <button class="btn btn-secondary btn-full" id="payment-cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(backdrop);
  document.body.classList.add('no-scroll');

  // Event listeners
  const closeBtn = backdrop.querySelector('#payment-modal-close');
  const cancelBtn = backdrop.querySelector('#payment-cancel-btn');
  const confirmBtn = backdrop.querySelector('#payment-confirm-btn');

  const close = () => {
    closePaymentModal();
    if (onComplete) onComplete();
  };

  closeBtn.addEventListener('click', close);
  cancelBtn.addEventListener('click', close);

  // Close on backdrop click (not modal itself)
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) close();
  });

  // Close on Escape key
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      close();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);
}

/**
 * Close the payment modal
 */
export function closePaymentModal() {
  const backdrop = document.getElementById('payment-modal-backdrop');
  if (backdrop) {
    backdrop.remove();
  }
  document.body.classList.remove('no-scroll');
}
