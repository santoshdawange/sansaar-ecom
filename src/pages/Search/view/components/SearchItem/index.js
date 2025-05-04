import React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { format } from '@cloudinary/url-gen/actions/delivery';
import { Link } from 'react-router-dom';

function index({ imageId, title, desc, link, serialNo }) {

    const cld = new Cloudinary({
        secure: true,
        cloud: {
            cloudName: 'dci1aiukm'
        }
    });

    const imgSrc = cld.image(imageId).quality('auto').delivery(format('webp'));

  return (
    <div className='mod-search-item'>
        <Link to={link} className='mod-search-item__link'></Link>
        <div className='mod-search-item__img-wrap'>
            <AdvancedImage cldImg={imgSrc} loading="lazy" className='mod-search-item__image' />
        </div>
        <div className='mod-search-item__info-wrap'>
            <h3 className='mod-search-item__title'>{title}</h3>
            <p className='mod-search-item__desc'>{serialNo && <span>Sr. No. {serialNo}</span>} {desc}</p>
        </div>
    </div>
  )
}

export default index