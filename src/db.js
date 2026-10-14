/* ============================================
   A K FITNESS — Mock Database Module
   localStorage-backed data layer
   ============================================ */

const DB_KEYS = {
  USERS: 'akf_users',
  CURRENT_SESSION: 'akf_session',
};

// ── Membership Plans (static data) ──────────────────────────────────────────
export const PLANS = {
  monthly: {
    id: 'monthly',
    name: 'Monthly',
    price: 1000,
    duration: 30,
    icon: '⚡',
    description: 'Perfect to get started',
    features: [
      'Full gym access',
      'All equipment usage',
      'Locker room access',
      'Free Wi-Fi',
    ],
  },
  quarterly: {
    id: 'quarterly',
    name: 'Quarterly',
    price: 3500,
    duration: 90,
    icon: '🔥',
    description: 'Best for building consistency',
    features: [
      'Full gym access',
      'All equipment usage',
      'Locker room access',
      'Free Wi-Fi',
      'Basic fitness assessment',
      'Save ₹500 vs monthly',
    ],
  },
  annual: {
    id: 'annual',
    name: 'Annual',
    price: 11000,
    duration: 365,
    icon: '👑',
    description: 'Maximum savings',
    features: [
      'Full gym access',
      'All equipment usage',
      'Locker room access',
      'Free Wi-Fi',
      'Quarterly fitness assessment',
      'Priority equipment access',
      'Save ₹1,000 vs monthly',
    ],
  },
  pt: {
    id: 'pt',
    name: 'PT Package',
    price: 4000,
    duration: 30,
    icon: '🎯',
    description: '₹3,000 PT + ₹1,000 Monthly Base',
    features: [
      'Everything in Monthly',
      'Personal trainer sessions',
      'Customized workout plan',
      'Form correction & guidance',
      'Progress tracking',
    ],
  },
  vip: {
    id: 'vip',
    name: 'VIP Package',
    price: 4500,
    duration: 30,
    icon: '💎',
    description: 'The ultimate fitness experience',
    featured: true,
    features: [
      'Everything in PT Package',
      'Personal training sessions',
      'Customized diet plans',
      'Fat Loss / Weight Gain / Muscle Gain',
      'Dedicated locker',
      'Priority support via WhatsApp',
      'VIP member badge',
    ],
  },
};

// ── Helper: Generate unique ID ──────────────────────────────────────────────
function generateId() {
  return 'u_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 6);
}

// ── Helper: Simple password hash (demo-grade, not production crypto) ────────
export function hashPassword(password) {
  let hash = 0;
  const str = password + 'akf_salt_2024';
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit int
  }
  return Math.abs(hash).toString(36);
}

// ── CRUD Operations ─────────────────────────────────────────────────────────

/** Get all users from storage */
export function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(DB_KEYS.USERS) || '[]');
  } catch {
    return [];
  }
}

/** Save users array to storage */
function saveUsers(users) {
  localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
}

/** Find user by phone number */
export function findUserByPhone(phone) {
  const users = getUsers();
  return users.find((u) => u.phone === phone) || null;
}

/** Find user by ID */
export function findUserById(id) {
  const users = getUsers();
  return users.find((u) => u.id === id) || null;
}

/** Create a new user */
export function createUser({ name, phone, password }) {
  const users = getUsers();

  // Check if phone already registered
  if (users.find((u) => u.phone === phone)) {
    return { success: false, error: 'Phone number already registered' };
  }

  const newUser = {
    id: generateId(),
    name: name.trim(),
    phone: phone.trim(),
    passwordHash: hashPassword(password),
    activePlan: null,
    nextPaymentDate: null,
    lockerNumber: null,
    registeredAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);

  return { success: true, user: newUser };
}

/** Update user fields by ID */
export function updateUser(userId, updates) {
  const users = getUsers();
  const index = users.findIndex((u) => u.id === userId);

  if (index === -1) {
    return { success: false, error: 'User not found' };
  }

  users[index] = {
    ...users[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  saveUsers(users);
  return { success: true, user: users[index] };
}

/** Activate a plan for user */
export function activatePlan(userId, planId) {
  const plan = PLANS[planId];
  if (!plan) {
    return { success: false, error: 'Invalid plan' };
  }

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + plan.duration);

  const updates = {
    activePlan: planId,
    nextPaymentDate: nextDate.toISOString(),
  };

  // Assign locker for VIP members
  if (planId === 'vip') {
    const users = getUsers();
    const existingLockers = users.filter((u) => u.lockerNumber).map((u) => u.lockerNumber);
    let lockerNum = 1;
    while (existingLockers.includes(lockerNum)) {
      lockerNum++;
    }
    updates.lockerNumber = lockerNum;
  }

  return updateUser(userId, updates);
}

/** Get all plans */
export function getPlans() {
  return PLANS;
}

/** Get a single plan by ID */
export function getPlan(planId) {
  return PLANS[planId] || null;
}

// ── Session Management ──────────────────────────────────────────────────────

/** Save session (user ID) */
export function saveSession(userId) {
  localStorage.setItem(DB_KEYS.CURRENT_SESSION, userId);
}

/** Get current session user ID */
export function getSession() {
  return localStorage.getItem(DB_KEYS.CURRENT_SESSION);
}

/** Clear session */
export function clearSession() {
  localStorage.removeItem(DB_KEYS.CURRENT_SESSION);
}

/** Get current logged-in user (full object) */
export function getCurrentSessionUser() {
  const userId = getSession();
  if (!userId) return null;
  return findUserById(userId);
}
