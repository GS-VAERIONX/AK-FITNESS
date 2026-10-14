/* ============================================
   A K FITNESS — Authentication Module
   Login, Register, Session, User State
   ============================================ */

import {
  findUserByPhone,
  createUser,
  hashPassword,
  saveSession,
  clearSession,
  getCurrentSessionUser,
  activatePlan,
  updateUser,
} from './db.js';

/**
 * Register a new user
 * @returns {{ success: boolean, user?: object, error?: string }}
 */
export function register(name, phone, password) {
  // Validation
  if (!name || name.trim().length < 2) {
    return { success: false, error: 'Please enter your full name' };
  }

  const cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.length < 10) {
    return { success: false, error: 'Please enter a valid 10-digit phone number' };
  }

  if (!password || password.length < 4) {
    return { success: false, error: 'Password must be at least 4 characters' };
  }

  // Create user in DB
  const result = createUser({
    name: name.trim(),
    phone: cleanPhone.slice(-10), // last 10 digits
    password,
  });

  if (result.success) {
    // Auto-login after registration
    saveSession(result.user.id);
  }

  return result;
}

/**
 * Login with phone and password
 * @returns {{ success: boolean, user?: object, error?: string }}
 */
export function login(phone, password) {
  const cleanPhone = phone.replace(/\D/g, '').slice(-10);

  if (cleanPhone.length < 10) {
    return { success: false, error: 'Please enter a valid phone number' };
  }

  if (!password) {
    return { success: false, error: 'Please enter your password' };
  }

  const user = findUserByPhone(cleanPhone);

  if (!user) {
    return { success: false, error: 'No account found with this phone number' };
  }

  if (user.passwordHash !== hashPassword(password)) {
    return { success: false, error: 'Incorrect password' };
  }

  saveSession(user.id);
  return { success: true, user };
}

/**
 * Logout current user
 */
export function logout() {
  clearSession();
}

/**
 * Get the currently logged-in user
 * @returns {object|null}
 */
export function getCurrentUser() {
  return getCurrentSessionUser();
}

/**
 * Check if a user is currently authenticated
 * @returns {boolean}
 */
export function isAuthenticated() {
  return getCurrentSessionUser() !== null;
}

/**
 * Activate a plan for the current user
 * @returns {{ success: boolean, user?: object, error?: string }}
 */
export function activateUserPlan(planId) {
  const user = getCurrentUser();
  if (!user) {
    return { success: false, error: 'Not logged in' };
  }
  return activatePlan(user.id, planId);
}

/**
 * Check if current user's plan is active (not expired)
 * @returns {boolean}
 */
export function isPlanActive() {
  const user = getCurrentUser();
  if (!user || !user.activePlan || !user.nextPaymentDate) {
    return false;
  }
  return new Date(user.nextPaymentDate) > new Date();
}

/**
 * Get days remaining until plan expiry
 * @returns {number}
 */
export function getDaysRemaining() {
  const user = getCurrentUser();
  if (!user || !user.nextPaymentDate) return 0;

  const now = new Date();
  const expiry = new Date(user.nextPaymentDate);
  const diff = expiry - now;

  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}
