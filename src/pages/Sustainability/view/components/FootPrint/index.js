import React from 'react'
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { format } from '@cloudinary/url-gen/actions/delivery';

function FootPrint({data}) {

    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dci1aiukm'
        }
    });
    
      

  return (
    <div className='bs-foot-print'>
        <ul className='bs-foot-print__list-wrap'>
            {data.map((item, index) => {
                const myImage = cld.image(item.imgId).quality('auto').delivery(format('webp'));
                return (
                    <li className='bs-foot-print__list-item' key={index}>
                        <div className='bs-foot-print__tile'>
                            <div className='bs-foot-print__media-wrap'>
                                <AdvancedImage cldImg={myImage} loading="lazy" className='bs-foot-print__image' />
                            </div>
                            <div className='bs-foot-print__info-wrap'>
                                <h3 className='bs-foot-print__info-title' dangerouslySetInnerHTML={{__html: item.title}}></h3>
                                <p className='bs-foot-print__info-desc' dangerouslySetInnerHTML={{__html: item.info}}></p>
                            </div>
                        </div>
                    </li>
                )
            })}
        </ul>
    </div>
  )
}

export default FootPrint