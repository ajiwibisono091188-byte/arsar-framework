/**
 * Third-Party Tracking Loader
 */

export function loadTracking(config) {
  if (!config) return;

  // 1. Google Analytics (GA4)
  if (config.googleAnalytics?.enabled && config.googleAnalytics.measurementId) {
    const gaId = config.googleAnalytics.measurementId;
    injectScript(`https://www.googletagmanager.com/gtag/js?id=${gaId}`, () => {
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', gaId, { 'anonymize_ip': true });
    });
  }

  // 2. Facebook Pixel
  if (config.facebookPixel?.enabled && config.facebookPixel.pixelId) {
    const pixelId = config.facebookPixel.pixelId;
    /* eslint-disable */
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', pixelId);
    fbq('track', 'PageView');
    /* eslint-enable */
  }
}

function injectScript(src, callback) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = src;
  script.onload = callback;
  document.head.appendChild(script);
}

/**
 * Track Custom Event
 * @param {string} eventName 
 * @param {Object} params 
 */
export function trackEvent(eventName, params = {}) {
  // GA4
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
  // FB Pixel
  if (typeof window.fbq === 'function') {
    window.fbq('track', eventName, params);
  }
}
