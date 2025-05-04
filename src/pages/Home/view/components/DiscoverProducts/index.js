import React from 'react';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import { Link } from 'react-router-dom';
import { format } from '@cloudinary/url-gen/actions/delivery';

function DiscoverProduct({title, imgUrl, link}) {

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dci1aiukm'
    }
  });

  const myImage = cld.image(imgUrl).quality('auto').delivery(format('webp'));

  return (
    <div className='bs-discover-product'>
        <div className='bs-discover-product__title-wrap'>
            <h3 className='bs-discover-product__title'>{title}</h3>
        </div>
        <div className='bs-discover-product__info-wrap'>
            <div className='bs-discover-product__media-wrap'>
                <Link to={link} className='bs-discover-product__media-link'>explore now</Link>
                <AdvancedImage cldImg={myImage} loading="lazy" className='bs-discover-product__image'/>
                {/* <img src={imgUrl} alt={title} className=''/> */}
            </div>
            <Link to={link} className='bs-btn bs-btn__btn-solid bs-discover-product__action'>explore now</Link>
        </div>
    </div>
  )
}

export default DiscoverProduct