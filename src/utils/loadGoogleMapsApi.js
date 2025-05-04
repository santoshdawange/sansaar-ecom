// src/utils/loadGoogleMapsApi.js
export const loadGoogleMapsApi = (apiKey) => {
    return new Promise((resolve, reject) => {
      const existingScript = document.getElementById('google-maps-api');
      if (existingScript) {
        resolve(window.google);
        return;
      }
  
      const script = document.createElement('script');
      script.id = 'google-maps-api';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve(window.google);
      script.onerror = (error) => reject(error);
      document.body.appendChild(script);
    });
  };
  