import React from 'react';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import { format } from '@cloudinary/url-gen/actions/delivery';


function Profile({imageUrl, name, designation}) {

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dci1aiukm'
    }
  });

  const myImage = cld.image(imageUrl).quality('auto').delivery(format('webp'));

  return (
    <div className='mod-profile'>
        <div className='mod-profile__image-wrap'>
          <AdvancedImage cldImg={myImage} loading="lazy" className='mod-profile__image' alt={name} />
        </div>
        <h5 className='mod-profile__name'>{name}</h5>
        <p className='mod-profile__designantion'>{designation}</p>
    </div>
  )
}

export default Profile