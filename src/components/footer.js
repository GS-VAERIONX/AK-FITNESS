/* ============================================
   A K FITNESS — Footer Component
   Multi-column footer with social links
   ============================================ */

export function renderFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.id = 'main-footer';
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <!-- Brand -->
        <div class="footer-brand">
          <a href="#/home" class="navbar-logo">
            A K <span>FITNESS</span>
          </a>
          <p>
            Ultra-luxury fitness experience in Kalayat, Haryana. Premium equipment, expert training, 
            and customized nutrition programs to transform your physique.
          </p>
          <div class="footer-social">
            <a href="https://www.instagram.com/train_with_ajju" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Follow @train_with_ajju">
              📸
            </a>
            <a href="https://wa.me/919053386350" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" title="Chat on WhatsApp">
              💬
            </a>
            <a href="tel:+919053386350" aria-label="Call us" title="Call +91 90533 86350">
              📞
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="footer-heading">Quick Links</h4>
          <ul class="footer-links">
            <li><a href="#/home">Home</a></li>
            <li><a href="#/about">About Us</a></li>
            <li><a href="#/memberships">Memberships</a></li>
            <li><a href="#/contact">Contact</a></li>
            <li><a href="#/register">Join Now</a></li>
          </ul>
        </div>

        <!-- Programs -->
        <div>
          <h4 class="footer-heading">Programs</h4>
          <ul class="footer-links">
            <li><a href="#/about">Fat Loss Program</a></li>
            <li><a href="#/about">Weight Gain Plan</a></li>
            <li><a href="#/about">Muscle Building</a></li>
            <li><a href="#/memberships">Personal Training</a></li>
            <li><a href="#/memberships">VIP Membership</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="footer-heading">Contact Us</h4>
          <ul class="footer-contact">
            <li>
              <span class="icon">📍</span>
              <span>Near HDFC Bank, Kalayat,<br>Haryana, India</span>
            </li>
            <li>
              <span class="icon">📱</span>
              <span>+91 90533 86350<br>(Ajay Lamba)</span>
            </li>
            <li>
              <span class="icon">📸</span>
              <span>@train_with_ajju<br>(Instagram)</span>
            </li>
            <li>
              <span class="icon">⏰</span>
              <span>Mon–Sat: 5:30 AM – 10:00 PM<br>Sunday: 6:00 AM – 12:00 PM</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom">
        <span>&copy; ${new Date().getFullYear()} A K FITNESS. All rights reserved.</span>
        <span>Built with 💪 in Kalayat, Haryana</span>
      </div>
    </div>
  `;

  // Insert into app
  const app = document.getElementById('app');
  const existing = document.getElementById('main-footer');
  if (existing) existing.remove();
  app.appendChild(footer);
}
