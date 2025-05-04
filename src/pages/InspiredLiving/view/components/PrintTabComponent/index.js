import React from 'react';
import PrintTile from '../PrintTile';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { format } from '@cloudinary/url-gen/actions/delivery';
import Marquee from "react-fast-marquee";

let portrait = window.matchMedia("(orientation: portrait)");

const logoData = [
  {
    id: 1,
    logoId: 'toi',
  },
  {
    id: 2,
    logoId: 'economic-times',
  },
  {
    id: 3,
    logoId: 'hindustan-times',
  },
  {
    id: 4,
    logoId: 'business-line',
  },
  {
    id: 5,
    logoId: 'business-standard',
  },
  {
    id: 6,
    logoId: 'elle-decor',
  },
  {
    id: 7,
    logoId: 'ad',
  },
  {
    id: 8,
    logoId: 'vogue',
  },
  {
    id: 9,
    logoId: 'forbes',
  },
  {
    id: 10,
    logoId: 'conde-nast-traveller',
  },
  {
    id: 11,
    logoId: 'fortune',
  }
]

function PrintTabComponent({ data }) {

  // if(data.length === 0)
  //   data = tileData;

  const cld = new Cloudinary({
    secure: true,
    cloud: {
        cloudName: 'dci1aiukm'
    }
  });

  // console.log('PrintTabComponent data', data);
  return (
    <div className='lyt-advertise'>
      <div className='lyt-advertise__title-wrap'>
        <h2 className='lyt-advertise__title'>Sansaar - A D'Decor Brand Full Page Print Ad/2024</h2>
      </div>
      <div className='lyt-advertise__cont-wrap lyt-advertise__cont-wrap--typ-col-2'>
        <div className='lyt-advertise__cont-wrap__item'>
          <ul className='lyt-advertise__print-list-wrap'>
            {data?.map((item, index) => {
              const myImage = cld.image(item?.mediaUrl).quality('auto').delivery(format('webp'));
              return (
                <li className='lyt-advertise__print-list-item' key={index}>
                  <PrintTile 
                    mediaUrl={myImage}
                    articleUrl={item.articleUrl}
                  />
                </li>
              )
            })}
          </ul>
        </div>
        {window.innerWidth <= 1024 && portrait ? (
          <div className='lyt-advertise__logo-list-wrap lyt-advertise__cont-wrap__item'>
            <div className='lyt-advertise__logo-list-sticky-wrap'>
              <div className='lyt-advertise__logo-list-title-wrap'>
                <h4 className='lyt-advertise__logo-list-title'>Media Coverage</h4>
              </div>
              <Marquee className='lyt-advertise__logo-list' speed={40} autoFill={true} >
                {logoData?.map((item, index) => {
                    
                    const myImage = cld.image(item.logoId).quality('auto').delivery(format('webp'));

                    return (
                      <AdvancedImage key={index} cldImg={myImage} loading="lazy" className={`lyt-advertise__logo-image ${item.logoId === 'toi' || item.logoId === 'business-standard' ? 'lyt-advertise__logo-image--lg-height' : ''}`}/>
                    )
                  })}
              </Marquee>
            </div>
          </div>
        ) : (
          <div className='lyt-advertise__logo-list-wrap lyt-advertise__cont-wrap__item'>
            <div className='lyt-advertise__logo-list-sticky-wrap'>
              <h4 className='lyt-advertise__logo-list-title'>Media Coverage</h4>
              <ul className='lyt-advertise__logo-list'>
                {logoData?.map((item, index) => {
                  
                  const myImage = cld.image(item.logoId).quality('auto').delivery(format('webp'));

                  return (
                    <li className={`lyt-advertise__logo-item `} key={index}>
                      <AdvancedImage cldImg={myImage} loading="lazy" className={`lyt-advertise__logo-image ${item.logoId === 'toi' || item.logoId === 'business-standard' ? 'lyt-advertise__logo-image--lg-height' : ''}`}/>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
      
    </div>
    
  )
}

export default PrintTabComponent