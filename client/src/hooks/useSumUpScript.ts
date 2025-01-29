import { useEffect, useState } from 'react';

const useSumUpScript = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://gateway.sumup.com/gateway/ecom/card/v2/sdk.js';
    script.async = true;

    script.onload = () => setIsLoaded(true);
    script.onerror = () => console.error('Failed to load SumUp script');

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return isLoaded;
};

export default useSumUpScript;