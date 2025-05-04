import React from 'react';

import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { format } from '@cloudinary/url-gen/actions/delivery';
import { Link } from 'react-router-dom';

function CollectionTile({imageUrl, title, subTitle, link}) {

    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dci1aiukm'
        }
    });

    const myImage = cld.image(imageUrl).quality('auto').delivery(format('webp'));

  return (
    <div className='bs-collection-tile'>
        <AdvancedImage cldImg={myImage} loading="lazy" className='bs-collection-tile__image' />
        <div className='bs-collection-tile__content'>
            <h2 className='bs-collection-tile__title'>{title}</h2>
            <p className='bs-collection-tile__sub-title'>{subTitle}</p>
        </div>
        <Link to={link} className='bs-collection-tile__link'></Link>
    </div>
  )
}

export default CollectionTile