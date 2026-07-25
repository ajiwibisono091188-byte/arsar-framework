/**
 * Dynamic WhatsApp Link Builder with UTM Tracking
 */

export function getWhatsAppUrl(phoneNumber, messageText) {
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(messageText);
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}

export function buildMarketingMessage(baseText = "Halo Arsar Digital, saya tertarik dengan layanan Anda.") {
  const pageUrl = window.location.href;
  const pageTitle = document.title;
  
  // Extract UTM parameters
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get('utm_source') || 'organic';
  const utmMedium = urlParams.get('utm_medium') || 'direct';
  const utmCampaign = urlParams.get('utm_campaign') || 'none';
  
  let msg = `${baseText}\n\n`;
  msg += `-------------------------\n`;
  msg += `Sumber Halaman: ${pageTitle}\n`;
  msg += `Link: ${pageUrl}\n`;
  msg += `UTM Source: ${utmSource}\n`;
  msg += `UTM Medium: ${utmMedium}\n`;
  msg += `UTM Campaign: ${utmCampaign}`;
  
  return msg;
}

export function initWhatsappClick(elementId, phoneNumber, baseText) {
  const element = document.getElementById(elementId);
  if (element) {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      const finalMsg = buildMarketingMessage(baseText);
      const url = getWhatsAppUrl(phoneNumber, finalMsg);
      window.open(url, '_blank');
    });
  }
}
