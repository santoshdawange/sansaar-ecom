import React from 'react';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import { format } from '@cloudinary/url-gen/actions/delivery';

function PageLoader() {

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dci1aiukm'
    }
  });

  const myImage = cld.image('Sansaar_Website_2nd_July-01_1_2_mz9y6o.jpg').quality('auto').delivery(format('webp'));

  return (
    <div className='lyt-home-loader'>
        <AdvancedImage cldImg={myImage} loading="lazy" className='lyt-home-loader__image' alt="Sansaar a D'Decor Brand"/>
    </div>
  )
}

export default PageLoader