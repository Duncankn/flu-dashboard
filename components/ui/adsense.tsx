import { useEffect, useRef } from 'react';
//import { getCookie } from 'cookies-next';

interface AdSenseProps {
  client: string;
  slot: string;
}

export function AdSense({ client, slot }: AdSenseProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
   //const consent = getCookie('adsense_consent');
   //if (consent === 'true' && adRef.current)
    if (adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, []);

  /* if (getCookie('adsense_consent') !== 'true') {
    return null;
  } */

  return (
    <div ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
