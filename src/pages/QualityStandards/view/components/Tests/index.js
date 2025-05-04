import React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { format } from '@cloudinary/url-gen/actions/delivery';

const cld = new Cloudinary({
  secure: true,
  cloud: {
      cloudName: 'dci1aiukm'
  }
});

function Tests({data}) {

  

  return (
    <div className='bs-tests'>
      <ul className='bs-tests__list-wrap'>
        {data?.map((item, index) => {
          const imgSrc = cld.image(item.imgId).quality('auto').delivery(format('webp'));
          return(
            <li className='bs-tests__list-item' key={index}>
              <div className='bs-tests__item'>
                <div className='bs-tests__info-wrap'>
                  <h3 className='bs-tests__title' dangerouslySetInnerHTML={{__html: item.title}}></h3>
                  <p className='bs-tests__info'>{item.desc}</p>
                  {item?.dataList !== null && item?.moreInfo !== null ? (
                    <div className='bs-tests__extra-info'>
                      <label className='bs-tests__label bs-tests__text-sm'>{item.moreInfo}</label>
                      <ul className='bs-tests__test-item-list'>
                        {item?.dataList?.map((element, index) => {
                          return(
                            <li className='bs-tests__test-item' key={index}>
                              <label className='bs-tests__test-value bs-tests__text-sm'>{element.name}</label>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  ) : null}
                </div>
                <div className='bs-tests__media-wrap'>
                  <AdvancedImage cldImg={imgSrc} loading="lazy" className='bs-tests__image' />  
                </div> 
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Tests