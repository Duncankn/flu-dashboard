"use client"

import { useState, useEffect } from 'react';
import CookieConsent from 'react-cookie-consent';
import { setCookie } from 'cookies-next';

const CookieConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    setShowBanner(true);
  }, []);

  const handleAccept = () => {
    setCookie('adsense_consent', 'true', {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
    });
    loadAdSenseScript();
  };

  const loadAdSenseScript = () => {
    const script = document.createElement('script');
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8470057760537876";
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);
  };

  if (!showBanner) return null;

  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      onAccept={handleAccept}
      enableDeclineButton
    >
      This website uses cookies to enhance the user experience and display relevant ads.
    </CookieConsent>
  );
};

export default CookieConsentBanner;
