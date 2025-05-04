import React, { useEffect } from 'react';
import Instafeed from 'instafeed.js';


function InstafeedContainer() {

  

    useEffect(() => {
        // Initialize Instafeed
        const userFeed = new Instafeed({
          get: 'user',
          target: 'instafeed-container',
          resolution: 'low_resolution',
          limit: 6,
          accessToken: 'IGQWRNd1pmQ1pZAMmItQ2xjMTBWOEw4Rk91VnNIcFlUamVGcXlZAS3hmN18weHV4c2ZAMTE5BeXp4YmRud2FPUDQ3bXpYMmZAfN1ZAzRFdlcEYtTXlIMXU0eGZAFalVuOElXNXdraWFucVpkNUJXSkllMkJtdE4zWjhaOEUZD',
          template:'<a target="_blank" href="{{link}}"><img title="{{caption}}" src="{{image}}" /></a>'
        });
    
        // Run Instafeed
        userFeed.run();
    }, []);


  return (
    <div className='lyt-img-list' id="instafeed-container"></div>
  )
}

export default InstafeedContainer