/* ============================================================
   A K FITNESS — app.js  (Refactored v2 Production Logic)
   ============================================================ */

'use strict';

/* ---- Navbar scroll behaviour ---- */
const siteHeader = document.getElementById('site-header');
if (siteHeader) {
  window.addEventListener('scroll', () => {
    siteHeader.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ---- Hamburger / Mobile Menu ---- */
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu   = document.getElementById('mobile-menu');
const menuClose    = document.getElementById('mobile-menu-close');

if (hamburgerBtn && mobileMenu) {
  hamburgerBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
  menuClose && menuClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
  mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) mobileMenu.classList.remove('open');
  });
}

/* ---- Contact Speed-Dial FAB Toggle ---- */
const speedDial = document.getElementById('speed-dial');
const speedDialToggle = document.getElementById('speed-dial-toggle');
if (speedDial && speedDialToggle) {
  speedDialToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    speedDial.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!speedDial.contains(e.target)) {
      speedDial.classList.remove('open');
    }
  });
}

/* ---- Gym Open/Close Status ---- */
function updateGymStatus() {
  const statusEl = document.getElementById('gym-status-text');
  if (!statusEl) return;
  const now = new Date();
  const h = now.getHours(), m = now.getMinutes();
  const totalMins = h * 60 + m;
  const openMins  = 5 * 60;   // 5:00 AM
  const closeMins = 22 * 60;  // 10:00 PM
  const isOpen = totalMins >= openMins && totalMins < closeMins;
  if (isOpen) {
    statusEl.textContent = 'Open Now';
    statusEl.style.color = '#22C55E';
  } else {
    statusEl.textContent = 'Opens at 5:00 AM';
    statusEl.style.color = '#EF4444';
    const dotEl = statusEl.previousElementSibling;
    if (dotEl && dotEl.classList.contains('pulse-dot')) {
      dotEl.style.background = '#EF4444';
    }
  }
}
updateGymStatus();
setInterval(updateGymStatus, 60000);

/* ---- Scroll Fade-Up Animations ---- */
const fadeEls = document.querySelectorAll('.fade-up');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.1 });
  fadeEls.forEach(el => observer.observe(el));
} else {
  fadeEls.forEach(el => el.classList.add('visible'));
}

/* ---- Payment Modal ---- */
function openPaymentModal(planName, price) {
  const modal     = document.getElementById('payment-modal');
  const nameEl    = document.getElementById('modal-plan-name');
  const priceEl   = document.getElementById('modal-plan-price');
  const waBtn     = document.getElementById('whatsapp-proof-btn');

  if (nameEl)  nameEl.textContent  = planName + ' Plan';
  if (priceEl) priceEl.textContent = price;

  // Pre-filled WhatsApp message as requested
  const msg = encodeURIComponent(
    `Hi Ajay! I selected the ${planName} (${price}) membership for A K FITNESS. Please verify my payment and activate my dashboard.`
  );
  if (waBtn) waBtn.href = `https://wa.me/qr/ZZHPEJESZLLKP1?text=${msg}`;

  if (modal) modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
window.openPaymentModal = openPaymentModal;

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}
window.closeModal = closeModal;

// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});

/* ---- Copy Real UPI ID (lambaajay575@oksbi) ---- */
function copyUPI() {
  const upiId = 'lambaajay575@oksbi';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(upiId).then(() => {
      showToast('📋 UPI ID copied: ' + upiId, 'success');
    }).catch(() => {
      fallbackCopy(upiId);
    });
  } else {
    fallbackCopy(upiId);
  }
}
function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    showToast('📋 UPI ID copied: ' + text, 'success');
  } catch (err) {
    showToast('UPI ID: ' + text);
  }
  document.body.removeChild(textarea);
}
window.copyUPI = copyUPI;

/* ---- Toast Notification ---- */
function showToast(msg, type = '') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.className = 'toast' + (type ? ' ' + type : '');
  void toast.offsetWidth; // trigger reflow
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}
window.showToast = showToast;

/* ============================================================
   3. DYNAMIC DIET PLAN GENERATOR (Comprehensive Engine)
   ============================================================ */
function generateDietPlan() {
  const heightVal = parseFloat(document.getElementById('diet-height')?.value);
  const weightVal = parseFloat(document.getElementById('diet-weight')?.value);
  const pref = document.getElementById('diet-preference')?.value; // 'veg' | 'nonveg'
  const goal = document.getElementById('diet-goal')?.value; // 'fat-loss' | 'muscle-gain'

  if (!heightVal || heightVal < 100 || heightVal > 250) {
    showToast('⚠️ Please enter a valid height (100 - 250 cm).');
    document.getElementById('diet-height')?.focus();
    return;
  }
  if (!weightVal || weightVal < 30 || weightVal > 250) {
    showToast('⚠️ Please enter a valid weight (30 - 250 kg).');
    document.getElementById('diet-weight')?.focus();
    return;
  }
  if (!pref) {
    showToast('⚠️ Please select your Diet Preference (Veg / Non-Veg).');
    document.getElementById('diet-preference')?.focus();
    return;
  }
  if (!goal) {
    showToast('⚠️ Please select your Goal (Fat Loss / Muscle Gain).');
    document.getElementById('diet-goal')?.focus();
    return;
  }

  // Calculate BMI & Calories
  const heightM = heightVal / 100;
  const bmi = (weightVal / (heightM * heightM)).toFixed(1);
  let bmiCategory = 'Normal Weight';
  if (bmi < 18.5) bmiCategory = 'Underweight';
  else if (bmi >= 25 && bmi < 29.9) bmiCategory = 'Overweight';
  else if (bmi >= 30) bmiCategory = 'Obese';

  // Estimate Maintenance & Target Calories
  // Basic BMR estimation: ~22-24 kcal/kg + activity
  const maintenance = Math.round(weightVal * 30);
  let targetCalories, dailyProtein, dailyCarbs, dailyFats;

  if (goal === 'fat-loss') {
    targetCalories = Math.max(1400, maintenance - 450);
    dailyProtein = Math.round(weightVal * 1.8); // 1.8g/kg
    dailyFats = Math.round((targetCalories * 0.25) / 9);
    dailyCarbs = Math.round((targetCalories - (dailyProtein * 4) - (dailyFats * 9)) / 4);
  } else {
    targetCalories = maintenance + 400;
    dailyProtein = Math.round(weightVal * 2.0); // 2.0g/kg
    dailyFats = Math.round((targetCalories * 0.25) / 9);
    dailyCarbs = Math.round((targetCalories - (dailyProtein * 4) - (dailyFats * 9)) / 4);
  }

  // Build Meal Plans
  let meals = [];
  const isVeg = pref === 'veg';
  const isFatLoss = goal === 'fat-loss';

  if (isFatLoss) {
    if (isVeg) {
      meals = [
        {
          num: 'Meal 1',
          time: 'Morning Fuel (8:00 AM)',
          icon: '🌅',
          title: 'High-Protein Veg Breakfast',
          items: [
            '100g Low-fat Paneer bhurji / Tofu scramble with spinach, tomatoes & green chillies',
            '35g Oats porridge cooked in water with cinnamon & chia seeds',
            'Handful of berries (or 1 small apple)',
            'Green tea or warm lemon water'
          ],
          calories: '~360 kcal',
          protein: '24g Protein'
        },
        {
          num: 'Meal 2',
          time: 'Midday Power (1:30 PM)',
          icon: '🥗',
          title: 'Lean Lunch Bowl',
          items: [
            '150g Grilled Tofu / Low-fat Paneer with herb seasoning',
            '1 Cup Steamed Brown Rice or 1 Multigrain Roti',
            '1 Medium Bowl Dal / Boiled Chickpeas (Chana)',
            'Large cucumber, tomato & lemon salad'
          ],
          calories: '~480 kcal',
          protein: '32g Protein'
        },
        {
          num: 'Meal 3',
          time: 'Pre-Workout (5:00 PM)',
          icon: '⚡',
          title: 'Energy Ignition',
          items: [
            '1 Mug Black Coffee (sugar-free) for thermogenesis',
            '1 Green Apple or 2 Rice Cakes with 1 tsp Peanut Butter',
            '3-4 Almonds / Walnuts'
          ],
          calories: '~160 kcal',
          protein: '5g Protein'
        },
        {
          num: 'Meal 4',
          time: 'Post-Workout (7:30 PM)',
          icon: '🥤',
          title: 'Rapid Recovery',
          items: [
            '1 Scoop Whey Protein (in water) or Plant Protein Isolate',
            '1 Small Banana or 50g Boiled Sprouts',
            '300ml Electrolyte water'
          ],
          calories: '~220 kcal',
          protein: '27g Protein'
        },
        {
          num: 'Meal 5',
          time: 'Dinner (9:00 PM)',
          icon: '🥦',
          title: 'Light Evening Repair',
          items: [
            '120g Grilled Soya Chunks / Paneer Tikka (minimal oil)',
            'Steamed broccoli, zucchini, bell peppers & French beans',
            'Warm vegetable clear soup (no cream)'
          ],
          calories: '~320 kcal',
          protein: '28g Protein'
        }
      ];
    } else {
      // Non-Veg Fat Loss
      meals = [
        {
          num: 'Meal 1',
          time: 'Morning Fuel (8:00 AM)',
          icon: '🌅',
          title: 'Egg White Power Breakfast',
          items: [
            '4 Egg Whites + 1 Whole Egg Omelette with spinach & mushrooms',
            '35g Rolled oats porridge in water with berries',
            '1 Cup Green tea'
          ],
          calories: '~350 kcal',
          protein: '28g Protein'
        },
        {
          num: 'Meal 2',
          time: 'Midday Power (1:30 PM)',
          icon: '🍗',
          title: 'Grilled Chicken & Greens',
          items: [
            '150g Grilled / Boiled Chicken Breast with black pepper & lemon',
            '1 Cup Steamed Brown Rice or 1 Multigrain Roti',
            'Mixed fresh green garden salad with lemon vinaigrette',
            '1 Small bowl curd (low fat)'
          ],
          calories: '~450 kcal',
          protein: '42g Protein'
        },
        {
          num: 'Meal 3',
          time: 'Pre-Workout (5:00 PM)',
          icon: '⚡',
          title: 'Energy Primer',
          items: [
            '1 Mug Black Coffee (no sugar)',
            '1 Apple or 2 Rice cakes with 1 tsp Peanut Butter',
            '4 Soaked Almonds'
          ],
          calories: '~160 kcal',
          protein: '5g Protein'
        },
        {
          num: 'Meal 4',
          time: 'Post-Workout (7:30 PM)',
          icon: '🥤',
          title: 'Anabolic Window Shake',
          items: [
            '1 Scoop Whey Protein in cold water',
            '1 Banana for glycogen replenishment'
          ],
          calories: '~220 kcal',
          protein: '26g Protein'
        },
        {
          num: 'Meal 5',
          time: 'Dinner (9:00 PM)',
          icon: '🐟',
          title: 'Lean Fish / Chicken Dinner',
          items: [
            '150g Grilled Fish (Rohu / Salmon / Tilapia) or 120g Chicken Breast',
            'Steamed broccoli, zucchini, asparagus & capsicum',
            '1 Cup Hot lemon green tea'
          ],
          calories: '~330 kcal',
          protein: '36g Protein'
        }
      ];
    }
  } else {
    // Muscle Gain
    if (isVeg) {
      meals = [
        {
          num: 'Meal 1',
          time: 'Breakfast (8:00 AM)',
          icon: '🌅',
          title: 'Surplus Veg Starter',
          items: [
            '100g Paneer cubes lightly sautéed + 2 Slices Whole wheat toast with 1.5 tbsp Peanut Butter',
            '1 Glass (250ml) Whole Buffalo Milk with 1 tsp raw honey',
            'Handful of soaked almonds & raisins'
          ],
          calories: '~580 kcal',
          protein: '30g Protein'
        },
        {
          num: 'Meal 2',
          time: 'Mid-Morning (11:00 AM)',
          icon: '🥛',
          title: 'Mass Gainer Smoothie',
          items: [
            '1 Scoop Whey Protein + 1 Cup Rolled Oats + 1 Banana + 2 tbsp Peanut Butter',
            'Blended in 250ml Whole Milk with a pinch of cinnamon'
          ],
          calories: '~620 kcal',
          protein: '38g Protein'
        },
        {
          num: 'Meal 3',
          time: 'Lunch (1:30 PM)',
          icon: '🍛',
          title: 'High-Carb Bulk Feast',
          items: [
            '200g Paneer Butter Masala (light ghee) or Soy chunk curry',
            '2-3 Whole wheat chapattis with desi ghee',
            '1.5 Cups White Rice + 1 Bowl Thick Dal Tadka + 1 Bowl Curd'
          ],
          calories: '~750 kcal',
          protein: '40g Protein'
        },
        {
          num: 'Meal 4',
          time: 'Pre-Workout (5:00 PM)',
          icon: '🍠',
          title: 'Glycogen Fuel',
          items: [
            '1 Big Boiled Sweet Potato (Shakarkandi) or 2 Peanut butter brown bread sandwiches',
            '1 Cup Black coffee or Espresso'
          ],
          calories: '~280 kcal',
          protein: '8g Protein'
        },
        {
          num: 'Meal 5',
          time: 'Post-Workout (7:30 PM)',
          icon: '🥤',
          title: 'Recovery & Synthesis',
          items: [
            '1 Scoop Whey Protein in water or milk',
            '100g Fresh Cottage Cheese (Paneer) or Boiled Moong sprouts',
            '1 Banana'
          ],
          calories: '~420 kcal',
          protein: '35g Protein'
        },
        {
          num: 'Meal 6',
          time: 'Dinner (9:30 PM)',
          icon: '🌙',
          title: 'Slow-Release Night Meal',
          items: [
            '150g Paneer bhurji / Tofu curry',
            '2 Whole wheat rotis + 1 Cup Steamed Rice + Sautéed seasonal vegetables',
            'Warm milk with turmeric (Haldi) before bed'
          ],
          calories: '~520 kcal',
          protein: '30g Protein'
        }
      ];
    } else {
      // Non-Veg Muscle Gain
      meals = [
        {
          num: 'Meal 1',
          time: 'Breakfast (8:00 AM)',
          icon: '🌅',
          title: 'Full Egg Champion Breakfast',
          items: [
            '4 Whole Eggs (scrambled or sunny side up in butter)',
            '2 Slices Whole wheat bread with 2 tbsp Peanut Butter',
            '1 Glass Whole Milk (250ml) + 1 Banana'
          ],
          calories: '~640 kcal',
          protein: '36g Protein'
        },
        {
          num: 'Meal 2',
          time: 'Mid-Morning (11:00 AM)',
          icon: '🥛',
          title: 'High-Calorie Anabolic Shake',
          items: [
            '1 Scoop Whey Protein + 1 Cup Oats + 1 Banana + 2 tbsp Peanut butter',
            'Blended in 250ml Milk with 5-6 crushed almonds'
          ],
          calories: '~650 kcal',
          protein: '40g Protein'
        },
        {
          num: 'Meal 3',
          time: 'Lunch (1:30 PM)',
          icon: '🍛',
          title: 'Bodybuilder Power Lunch',
          items: [
            '200g Desi Chicken Curry / Chicken Breast pieces',
            '2-3 Chapattis with ghee + 1.5 Cups White Basmati Rice',
            '1 Bowl Yellow Dal + 1 Bowl Curd + Sliced onion & cucumbers'
          ],
          calories: '~760 kcal',
          protein: '52g Protein'
        },
        {
          num: 'Meal 4',
          time: 'Pre-Workout (5:00 PM)',
          icon: '⚡',
          title: 'Pre-Lift Carb Pump',
          items: [
            '1 Big Boiled Sweet Potato with chaat masala or 2 Brown bread peanut butter slices',
            '1 Strong Black Coffee'
          ],
          calories: '~280 kcal',
          protein: '8g Protein'
        },
        {
          num: 'Meal 5',
          time: 'Post-Workout (7:30 PM)',
          icon: '🥤',
          title: 'Immediate Protein Spike',
          items: [
            '1 Scoop Whey Protein in water',
            '3 Boiled Egg Whites + 1 Banana for rapid glycogen restore'
          ],
          calories: '~310 kcal',
          protein: '34g Protein'
        },
        {
          num: 'Meal 6',
          time: 'Dinner (9:30 PM)',
          icon: '🐟',
          title: 'Night Muscle Repair',
          items: [
            '180g Grilled Fish (or Chicken / Paneer)',
            '2 Chapattis + 1 Cup Steamed Rice',
            'Mixed green vegetables cooked in olive oil',
            'Glass of warm milk before sleep'
          ],
          calories: '~550 kcal',
          protein: '44g Protein'
        }
      ];
    }
  }

  // Render Result
  const resultContainer = document.getElementById('diet-result');
  const titleEl = document.getElementById('diet-result-title');
  const metaEl = document.getElementById('diet-result-meta');
  const badgesEl = document.getElementById('diet-result-badges');
  const mealsGrid = document.getElementById('generated-meals-grid');

  if (titleEl) {
    titleEl.textContent = `Personalized ${isFatLoss ? 'Fat Loss' : 'Muscle Gain'} Plan (${isVeg ? 'Vegetarian' : 'Non-Vegetarian'})`;
  }
  if (metaEl) {
    metaEl.innerHTML = `Height: <strong>${heightVal} cm</strong> · Weight: <strong>${weightVal} kg</strong> · BMI: <strong>${bmi}</strong> (${bmiCategory}) · Target: <strong>~${targetCalories} kcal/day</strong>`;
  }
  if (badgesEl) {
    badgesEl.innerHTML = `
      <span class="badge badge-gold">🔥 Target: ${targetCalories} kcal</span>
      <span class="badge badge-green">💪 Protein: ~${dailyProtein}g</span>
      <span class="badge" style="background:rgba(59,130,246,0.1); color:#3B82F6; border:1px solid rgba(59,130,246,0.3);">🍚 Carbs: ~${dailyCarbs}g</span>
      <span class="badge" style="background:rgba(212,175,55,0.1); color:#D4AF37; border:1px solid rgba(212,175,55,0.3);">${meals.length} Meals/Day</span>
    `;
  }

  if (mealsGrid) {
    mealsGrid.innerHTML = meals.map(m => `
      <div class="meal-card" style="border:1px solid var(--border-gold); background:rgba(255,255,255,0.03);">
        <span class="meal-icon">${m.icon}</span>
        <div class="meal-number">${m.num} · ${m.time}</div>
        <div class="meal-time" style="font-size:1.05rem; margin-bottom:0.5rem;">${m.title}</div>
        <ul style="padding-left:1.1rem; font-size:0.85rem; color:var(--text-secondary); line-height:1.6; margin-bottom:0.75rem; list-style:disc;">
          ${m.items.map(it => `<li>${it}</li>`).join('')}
        </ul>
        <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--gold); font-weight:600; padding-top:0.5rem; border-top:1px solid var(--border-subtle);">
          <span>${m.calories}</span>
          <span>${m.protein}</span>
        </div>
      </div>
    `).join('');
  }

  if (resultContainer) {
    resultContainer.classList.add('visible');
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    showToast('✅ Diet plan generated for your stats!', 'success');
  }
}
window.generateDietPlan = generateDietPlan;

/* ---- Smooth scroll for anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
