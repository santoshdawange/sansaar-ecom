import React from 'react';
import Video from '../Video';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import VideoModal from "../VideoModal";
import { format } from '@cloudinary/url-gen/actions/delivery';


function  Infography({title, desc, imageUrl, reverse, quote, author, video, titleBreak, variant, videoPosterImg, videoUrl, type, viewInModal, desc2}) {

    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dci1aiukm'
        }
    });

    const myImage = cld.image(imageUrl).quality('auto').delivery(format('webp'));

  return (
    <div 
        className={`bs-infography 
            ${reverse ? 'bs-infography--typ-reverse' : ''} 
            ${video ? 'bs-infography--typ-video' : ''} 
            ${variant === 'no-space' ? 'bs-infography--no-space' : ''} 
            ${type === "sm" ? 'bs-infography--typ-sm' : ''} 
            ${type === "vertical" ? 'bs-infography--typ-vertical' : ''}
            ${variant === 'films' ? 'bs-infography--typ-film-list' : ''} 
            ${type === "full" ? 'bs-infography--typ-full' : ''}
        `}
    >
        {/* {title && desc ? ( */}
        <div className='bs-infography__info-wrap'>
            {title && type !== "vertical" ?
                <h2 className='bs-infography__title'>
                    {titleBreak && <span className='cm-line-break'>{titleBreak}</span>}
                    {title}
                </h2>
            : null}
            <div className={`bs-infography__cont-wrap ${quote ? 'bs-infography__cont-wrap--typ-quote' : ''}`}>
                <p className='bs-infography__desc'>{desc}</p>
                {desc2 && <p className='bs-infography__desc'>{desc2}</p>}
                {author && <strong className='bs-infography__meta-info cm-cursive'>{author}</strong>}
            </div>
        </div>
        {/* ) : null} */}
        {video ? (
            <div className='bs-infography__video-wrap'>
                <Video
                    posterImage={videoPosterImg}
                    url={videoUrl}
                />
            </div>
            ) : (
            viewInModal ? 
                <>
                {title && type === "vertical" ?
                    <h2 className='bs-infography__title'>
                        {titleBreak && <span className='cm-line-break'>{titleBreak}</span>}
                        {title}
                    </h2>
                : null}
                <VideoModal 
                    posterImage={myImage}
                    videoUrl={videoUrl}
                    videoImage={videoPosterImg}
                />
                </>
            :
                <div className='bs-infography__media-wrap'>
                    <AdvancedImage cldImg={myImage} loading="lazy" className='bs-infography__image'/>
                </div>
        )}
    </div>
  )
}

export default Infography