import React from 'react'
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { format } from '@cloudinary/url-gen/actions/delivery';
// import { Window } from '../../../../../../node_modules/@mui/icons-material/index.d';

function Certifications({data}) {

    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dci1aiukm'
        }
    });

  return (
    <div className='bs-certifcation-list'>
        <ul className='bs-certifcation-list__wrap'>
            {data.map((item, index) => {
                const myImage = cld.image(item.imgId).quality('auto').delivery(format('webp'));
                return(
                    <li className={`bs-certifcation-list__list-item ${window.innerWidth < 540 && item.orderXs === 11 ? 'bs-certifcation-list__list-item--no-border' : ''}`} key={index} style={{order: window.innerWidth < 540 ? item.orderXs : 'initial'}}>
                        <div className='bs-certifcation-list__item'>
                            <div className='bs-certifcation-list__media-wrap'>
                                <AdvancedImage cldImg={myImage} loading="lazy" className='bs-certifcation-list__image' />
                            </div>
                            <div className='bs-certifcation-list__info-wrap'>
                                <h4 className='bs-certifcation-list__title' dangerouslySetInnerHTML={{__html: item.title}}></h4>
                                <div className='bs-certifcation-list__info-list-wrap'>
                                    {item.info.map((info, index) => {
                                        return(
                                            <p className='bs-certifcation-list__info' key={index}>{info.text}</p>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </li>
                )
            })}
            
        </ul>
    </div>
  )
}

export default Certifications