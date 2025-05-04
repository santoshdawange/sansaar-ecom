import React from 'react'
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import IconText from '@common/components/IconText';
import { format } from '@cloudinary/url-gen/actions/delivery';

function Challenge() {

    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dci1aiukm'
        }
    });

    const myImage = cld.image('textile-waste.jpg').quality('auto').delivery(format('webp'));
  return (
    <div className='bs-challenge'>
        <div className='bs-challenge__media-wrap'>
            <AdvancedImage cldImg={myImage} loading="lazy" className='bs-challenge__image' />
        </div>
        <div className='bs-challenge__info-wrap'>
            <div className='bs-challenge__title-wrap'>
                <h3 className='bs-challenge__info-title'>92 million tons of textile waste annually</h3>
                <p className='bs-challenge__info-desc'>We turn this challenge into sustainable luxury.</p>
            </div>
            <div className='bs-challenge__feature-wrap'>
                <ul className='bs-challenge__feature-list'>
                    <li className='bs-challenge__feature-item'>
                        <IconText icon="truck" classname="bs-challenge__feature" title="100% non-hazardous waste sent for recycling to authorized recyclers, following the norms specified IN MPCB consent"/>
                    </li>
                    <li className='bs-challenge__feature-item'>
                        <IconText icon="yarn" classname="bs-challenge__feature" title="25% of the collection is crafted from sustainable yarns"/>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Challenge