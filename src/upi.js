/* ============================================
   A K FITNESS — UPI & WhatsApp Integration
   QR code generation + WhatsApp payment bridge
   ============================================ */

// ── Configuration ───────────────────────────────────────────────────────────
const CONFIG = {
  UPI_VPA: 'akfitness@upi',        // Replace with actual UPI VPA
  MERCHANT_NAME: 'A K FITNESS',
  WHATSAPP_NUMBER: '919053386350',  // Ajay Lamba
};

/**
 * Generate a UPI payment URI
 */
export function generateUPIUri(amount, planName) {
  const params = new URLSearchParams({
    pa: CONFIG.UPI_VPA,
    pn: CONFIG.MERCHANT_NAME,
    am: amount.toString(),
    cu: 'INR',
    tn: `${planName} Membership - A K FITNESS`,
  });
  return `upi://pay?${params.toString()}`;
}

/**
 * Generate a QR code data URL from a UPI URI
 * Returns a base64 data URL for use in <img> src
 */
export async function generateQRCode(amount, planName) {
  const uri = generateUPIUri(amount, planName);

  try {
    const dataUrl = await QRCode.toDataURL(uri, {
      width: 280,
      margin: 2,
      color: {
        dark: '#D4AF37',
        light: '#1E1E1E',
      },
      errorCorrectionLevel: 'M',
    });
    return dataUrl;
  } catch (err) {
    console.error('QR Code generation failed:', err);
    return null;
  }
}

/**
 * Generate WhatsApp confirmation URL with pre-filled message
 */
export function getWhatsAppConfirmURL(amount, planName, userName, userPhone) {
  const formattedAmount = amount.toLocaleString('en-IN');
  const message = `Hello Ajay, I have just completed the payment of ₹${formattedAmount} for the ${planName} membership for ${userName}. My phone number is ${userPhone}. Please verify and activate my portal.`;

  return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate direct WhatsApp contact URL (for FAB)
 */
export function getWhatsAppDirectURL(message = '') {
  const defaultMessage = message || 'Hi Ajay, I would like to know more about A K FITNESS memberships.';
  return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(defaultMessage)}`;
}

/**
 * Format price for display
 */
export function formatPrice(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}
