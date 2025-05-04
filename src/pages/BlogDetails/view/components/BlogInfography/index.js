import React from 'react';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import { format } from '@cloudinary/url-gen/actions/delivery';

function BlogInfography({imageUrl, imageTitle, infoTitle, infoDescription}) {

    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dci1aiukm'
        }
    });

    const myImage = cld.image(imageUrl).quality('auto').delivery(format('webp'));

  return (
    <div className='bs-blog-infography'>
        <div className='bs-blog-infography__media-wrap'>
            <AdvancedImage cldImg={myImage} loading="lazy" className='bs-blog-infography__image'/>
            <a href="/collection-detail?id=B10006" className='bs-blog-infography__title-wrap'>
                <label className='bs-blog-infography__media-title'>{imageTitle}</label>
            </a>
        </div>
        <div className='bs-blog-infography__info-wrap'>
            <h2 className='bs-blog-infography__info-title' dangerouslySetInnerHTML={{__html: infoTitle}}></h2>
            <p className='bs-blog-infography__info-desc' dangerouslySetInnerHTML={{__html: infoDescription}}></p>
        </div>
    </div>
  )
}

export default BlogInfography