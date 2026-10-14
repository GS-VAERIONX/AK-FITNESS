/* ============================================
   A K FITNESS — Login Page
   Minimalist phone + password auth
   ============================================ */

import { login } from '../auth.js';
import { navigate, showToast } from '../router.js';

export function render(container) {
  container.innerHTML = `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-header">
          <div class="auth-logo">A K FITNESS</div>
          <h2>Welcome Back</h2>
          <p class="text-secondary">Login to access your dashboard</p>
        </div>

        <form id="login-form" novalidate>
          <div class="form-group">
            <label class="form-label" for="login-phone">Phone Number</label>
            <input 
              type="tel" 
              id="login-phone" 
              class="form-input" 
              placeholder="Enter your 10-digit number"
              maxlength="10"
              inputmode="numeric"
              autocomplete="tel"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="login-password">Password</label>
            <input 
              type="password" 
              id="login-password" 
              class="form-input" 
              placeholder="Enter your password"
              autocomplete="current-password"
              required
            />
          </div>

          <div id="login-error" style="display: none; margin-bottom: var(--space-4);">
            <span class="form-error" style="display: block;"></span>
          </div>

          <button type="submit" class="btn btn-primary btn-lg btn-full" id="login-submit-btn">
            Login →
          </button>
        </form>

        <div class="auth-footer">
          Don't have an account? 
          <a href="#/register">Create one</a>
        </div>
      </div>
    </div>
  `;

  // Form submission
  const form = container.querySelector('#login-form');
  const phoneInput = container.querySelector('#login-phone');
  const passwordInput = container.querySelector('#login-password');
  const errorDiv = container.querySelector('#login-error');
  const errorText = errorDiv.querySelector('.form-error');
  const submitBtn = container.querySelector('#login-submit-btn');

  // Allow only digits in phone field
  phoneInput.addEventListener('input', () => {
    phoneInput.value = phoneInput.value.replace(/\D/g, '');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Clear previous errors
    errorDiv.style.display = 'none';
    phoneInput.classList.remove('form-input-error');
    passwordInput.classList.remove('form-input-error');

    const phone = phoneInput.value.trim();
    const password = passwordInput.value;

    // Client-side validation
    if (!phone || phone.length < 10) {
      showError('Please enter a valid 10-digit phone number');
      phoneInput.classList.add('form-input-error');
      phoneInput.focus();
      return;
    }

    if (!password) {
      showError('Please enter your password');
      passwordInput.classList.add('form-input-error');
      passwordInput.focus();
      return;
    }

    // Attempt login
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner spinner-sm" style="display: inline-block;"></span> Logging in...';

    // Simulate small delay for UX
    setTimeout(() => {
      const result = login(phone, password);

      if (result.success) {
        showToast(`Welcome back, ${result.user.name}!`, 'success');
        navigate('/dashboard');
      } else {
        showError(result.error);
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Login →';
      }
    }, 500);
  });

  function showError(message) {
    errorText.textContent = message;
    errorDiv.style.display = 'block';
  }

  // Auto-focus phone input
  setTimeout(() => phoneInput.focus(), 400);
}
