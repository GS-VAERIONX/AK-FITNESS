/* ============================================
   A K FITNESS — Register Page
   Sign up with name, phone, password
   ============================================ */

import { register } from '../auth.js';
import { getPlans } from '../db.js';
import { navigate, showToast } from '../router.js';

export function render(container, params) {
  const preselectedPlan = params ? params.get('plan') : null;
  const plans = getPlans();

  container.innerHTML = `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-header">
          <div class="auth-logo">A K FITNESS</div>
          <h2>Join the Elite</h2>
          <p class="text-secondary">Create your account to get started</p>
        </div>

        <form id="register-form" novalidate>
          <div class="form-group">
            <label class="form-label" for="reg-name">Full Name</label>
            <input 
              type="text" 
              id="reg-name" 
              class="form-input" 
              placeholder="Enter your full name"
              autocomplete="name"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="reg-phone">Phone Number</label>
            <input 
              type="tel" 
              id="reg-phone" 
              class="form-input" 
              placeholder="Enter your 10-digit number"
              maxlength="10"
              inputmode="numeric"
              autocomplete="tel"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="reg-password">Password</label>
            <input 
              type="password" 
              id="reg-password" 
              class="form-input" 
              placeholder="Choose a password (min. 4 chars)"
              autocomplete="new-password"
              required
            />
          </div>

          ${preselectedPlan && plans[preselectedPlan] ? `
            <div style="
              background: var(--accent-gold-subtle);
              border: 1px solid var(--accent-gold-border);
              border-radius: var(--radius-lg);
              padding: var(--space-4);
              margin-bottom: var(--space-6);
              display: flex;
              align-items: center;
              gap: var(--space-3);
              font-size: var(--fs-sm);
            ">
              <span style="font-size: 1.5rem;">${plans[preselectedPlan].icon}</span>
              <div>
                <div style="font-weight: var(--fw-semibold); color: var(--text-primary);">
                  Selected: ${plans[preselectedPlan].name}
                </div>
                <div style="color: var(--accent-gold);">
                  ₹${plans[preselectedPlan].price.toLocaleString('en-IN')}${plans[preselectedPlan].duration === 365 ? '/year' : plans[preselectedPlan].duration === 90 ? '/quarter' : '/month'}
                </div>
              </div>
            </div>
          ` : ''}

          <div id="register-error" style="display: none; margin-bottom: var(--space-4);">
            <span class="form-error" style="display: block;"></span>
          </div>

          <button type="submit" class="btn btn-primary btn-lg btn-full" id="register-submit-btn">
            Create Account →
          </button>

          <p style="font-size: var(--fs-xs); color: var(--text-muted); text-align: center; margin-top: var(--space-4); line-height: var(--lh-relaxed);">
            By registering, you agree to follow gym rules and regulations of A K FITNESS.
          </p>
        </form>

        <div class="auth-footer">
          Already have an account? 
          <a href="#/login">Login here</a>
        </div>
      </div>
    </div>
  `;

  // Form submission
  const form = container.querySelector('#register-form');
  const nameInput = container.querySelector('#reg-name');
  const phoneInput = container.querySelector('#reg-phone');
  const passwordInput = container.querySelector('#reg-password');
  const errorDiv = container.querySelector('#register-error');
  const errorText = errorDiv.querySelector('.form-error');
  const submitBtn = container.querySelector('#register-submit-btn');

  // Allow only digits in phone
  phoneInput.addEventListener('input', () => {
    phoneInput.value = phoneInput.value.replace(/\D/g, '');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Clear errors
    errorDiv.style.display = 'none';
    [nameInput, phoneInput, passwordInput].forEach((i) => i.classList.remove('form-input-error'));

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const password = passwordInput.value;

    // Validation
    if (!name || name.length < 2) {
      showError('Please enter your full name');
      nameInput.classList.add('form-input-error');
      nameInput.focus();
      return;
    }

    if (!phone || phone.length < 10) {
      showError('Please enter a valid 10-digit phone number');
      phoneInput.classList.add('form-input-error');
      phoneInput.focus();
      return;
    }

    if (!password || password.length < 4) {
      showError('Password must be at least 4 characters');
      passwordInput.classList.add('form-input-error');
      passwordInput.focus();
      return;
    }

    // Attempt registration
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner spinner-sm" style="display: inline-block;"></span> Creating account...';

    setTimeout(() => {
      const result = register(name, phone, password);

      if (result.success) {
        showToast(`Welcome to A K FITNESS, ${name}!`, 'success');
        // If a plan was preselected, go to memberships to pay
        if (preselectedPlan) {
          navigate(`/memberships`);
        } else {
          navigate('/dashboard');
        }
      } else {
        showError(result.error);
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Create Account →';
      }
    }, 600);
  });

  function showError(message) {
    errorText.textContent = message;
    errorDiv.style.display = 'block';
  }

  // Auto-focus name input
  setTimeout(() => nameInput.focus(), 400);
}
