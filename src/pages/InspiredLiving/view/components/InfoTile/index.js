import { AdvancedImage } from '@cloudinary/react';
import moment from 'moment/moment';
import React from 'react';
import { Link } from 'react-router-dom';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';


function InfoTile({title, subTitle, time, description, mediaUrl, articleUrl, variant, croppedMediaUrl}) {

  const updatedDate = moment(time).format('MMMM Do YYYY, h:mm:ss A');
  
  console.log('articleUrl', articleUrl)

  return (
    <div className={`bs-info-tile ${(variant === 'electronic' || variant === 'blog') ? 'bs-info-tile--typ-article' : ''}  ${variant === "press" ? 'bs-info-tile--typ-press' : ''}`}>
        {/* {variant !== "press" &&  */}
        <Link to={articleUrl} target="_blank" className='bs-info-tile__link'>Link</Link>
        {/* // } */}
        {mediaUrl ? (
          <div className='bs-info-tile__image-wrap'>
            {/* <img src={mediaUrl} alt={title} className='bs-info-tile__image'/> */}
            {variant === "press" ? (
              <>
                {/* <Zoom zoomImg={articleUrl}> */}
                  <AdvancedImage cldImg={croppedMediaUrl} loading="lazy" alt={mediaUrl} className='bs-info-tile__image' />
                {/* </Zoom> */}
              </>
          ) : (<>
            <AdvancedImage cldImg={mediaUrl} loading="lazy" alt={mediaUrl} className='bs-info-tile__image' />  
            </>)}
            
          </div>
        ) : null}
        <div className='bs-info-tile__info-wrap'>
            {subTitle && <strong className='bs-info-tile__sub-title'>{subTitle}</strong>}
            {title && <h3 className='bs-info-tile__title'>{title}</h3>}
            {time && <label className='bs-info-tile__time'>{updatedDate}</label>}
            {description && <p className='bs-info-tile__desc'>{description}</p>}
        </div>
    </div>
  )
}

export default InfoTile