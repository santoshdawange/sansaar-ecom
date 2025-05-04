import React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { format } from '@cloudinary/url-gen/actions/delivery';
// import logo from '../../assets/images/logos/1.svg'
import Collection from '../../../pages/Collection/view/index';
import { Link } from 'react-router-dom';

function SectionBanner({ title, desc, link, imageUrl, clientlogo, noHover, titlePosition, view, variant, titleLine1, titleLine2, redirectionLink="" }) {

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dci1aiukm'
    }
  });

  const myImage = cld.image(imageUrl).quality('auto').delivery(format('webp'));

  return (
    <div className={`
      bs-section-banner 
      ${clientlogo ? 'bs-section-banner--typ-full-height' : ''} 
      ${noHover ? 'bs-section-banner--no-hover-interaction' : ''} 
      ${view === 'sm' ? 'bs-section-banner--info-small' : ''}
      ${titlePosition === 'on-image' ? 'bs-section-banner--on-image' : ''}
      ${variant === 'typ-2' ? 'bs-section-banner--variant-typ-2' : ''}
      ${variant === 'typ-3' ? 'bs-section-banner--variant-typ-3' : ''}
      ${variant === 'typ-display-link' ? 'bs-section-banner--variant-typ-display-link' : ''}
    `}>
      {variant === 'typ-2' ? (
        <>
          {(titleLine1 !== null || titleLine1 !== '') && (titleLine2 !== null || titleLine2 !== '') ? (
            <div className='bs-section-banner__title-wrap'>
              <h3 className='bs-section__title'>
                <span className="bs-section__title__font-1-text--sm" dangerouslySetInnerHTML={{__html: titleLine1}}></span>
                <span className="bs-section__title__font-1-text--lg" dangerouslySetInnerHTML={{__html: titleLine2}}></span>
              </h3>
            </div>
          ) : null}
          <div className='bs-section-banner__media-wrap'>
            <AdvancedImage cldImg={myImage} loading="lazy" className='bs-section-banner__image' />
          </div>
        </>
      ) : variant === 'typ-3' ?(
        <>
          <div className='bs-section-banner__media-wrap'>
            <AdvancedImage cldImg={myImage} loading="lazy" className='bs-section-banner__image' />
          </div>
          <div className='bs-section-banner__info-wrap'>
            <div className='bs-section-banner__desc-wrap'>
              <h3 className='bs-section__title'>{title}</h3>
              <p className='bs-section__desc' dangerouslySetInnerHTML={{__html: desc}}></p>
            </div>
            <Link to="/products" className='bs-btn bs-btn__btn-solid bs-btn__btn-solid--inverse bs-section-banner__action'>shop Collection</Link>
          </div>
        </>
      ) : variant === 'typ-display-link' ? (
        <>
          <div className='bs-section-banner__media-wrap'>
            <AdvancedImage cldImg={myImage} loading="lazy" className='bs-section-banner__image' />
            <Link to={redirectionLink} className='bs-btn bs-btn__btn-solid bs-btn__btn-solid--inverse bs-btn__btn-solid--typ-large bs-section-banner__action'>shop now</Link>
          </div>
        </>
      ) : (
        <>
          {titlePosition === 'top' ? (
          <div className='bs-section-banner__title-wrap'>
            <h3 className='bs-section__title'>{title}</h3>
          </div>
        ) : null}
        {/* {imageUrl ? ( */}
          <div className='bs-section-banner__media-wrap'>
            <AdvancedImage cldImg={myImage} loading="lazy" className='bs-section-banner__image' />
          </div>
        {/* ) : null} */}
        <div className='bs-section-banner__info-wrap'>
          {titlePosition === 'top' ? null : <h3 className='bs-section__title' dangerouslySetInnerHTML={{__html: title}}></h3>}
          <div className='bs-section-banner__desc-wrap'>
            <p className='bs-section__desc'>{desc}</p>
          </div>
          {clientlogo &&
            <div className='lyt-logo'>
              {clientlogo.map((logo, index) => {
                return(
                  <div className='lyt-logo__img-wrap' key={index}>
                    <img src={logo.src} alt={logo.name} />
                  </div>
                )
              })}
            </div>
          }
          {/* {link && <a href={link} className='bs-btn bs-btn__btn-solid'>learn more</a>} */}
        </div>
        </>
      )}
      
      
    </div>
  )
}

export default SectionBanner