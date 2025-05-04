import React, { useEffect, useRef, useState } from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import { EffectFade, Navigation, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { format } from '@cloudinary/url-gen/actions/delivery';

const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowWidth;
};

function Banner({ variant, imgId, type }) {

    const videoRef = useRef();
    const [muteState, setMuteState] = useState(true)
    const screenWidth = useWindowWidth();


    const muteUnmuteHandleChange = () => {
        if (muteState) {
            setMuteState(false)
        } else {
            setMuteState(true)
        }
    }

    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dci1aiukm'
        }
    });

    const myImage = cld.image(imgId).quality('auto').delivery(format('webp'));

    let videoUrl = null;
    if (screenWidth >= 1920) {
        videoUrl = "https://res.cloudinary.com/dci1aiukm/video/upload/v1724226855/home_video_banner_10_mb_1080p.webm";
    } else if (screenWidth >= 1280) {
        videoUrl = "https://res.cloudinary.com/dci1aiukm/video/upload/v1724226855/home_video_banner_10_mb_720p.webm";
    } else {
        videoUrl = "https://res.cloudinary.com/dci1aiukm/video/upload/v1724226855/home_video_banner_10_mb_480p.webm";
    }
    videoUrl = "https://res.cloudinary.com/dci1aiukm/video/upload/v1724226855/home_video_banner_10_mb_1080p.webm";

    const videoPosterImg = cld.image('banner-video-poster').quality('auto').delivery(format('webp')).toURL();

    const fallbackVideoURL = "https://res.cloudinary.com/dci1aiukm/video/upload/v1724218429/home_video_banner_10_mb.mp4";

    const bannerSlideData = [
        {
            id:1,
            title: 'Light & Luxe that Elevates your space',
            category: 'Sansaar',
            link: '/our-journey',
            imgId: 'Banner-1'
        },
        {
            id:2,
            title: 'Light & Luxe that Elevates your space',
            category: 'Fabrics',
            link: '/collections',
            imgId: 'Banner-2-Fabric-Image'
        },
        {
            id:3,
            title: 'Premium Bedding for Restful Sleep',
            category: 'bedding',
            link: '/shop',
            imgId: 'Banner_BeddingCampaign'
        },
    ]

    return (
        <div className={`bs-banner ${variant === 'video' ? 'bs-banner--typ-video' : ''} ${type === 'small' ? 'bs-banner--typ-small' : ''} ${variant === 'slide' ? 'bs-banner--typ-slide' : ''}`}>
            {variant === 'video' ? (
                <div className='bs-banner__video-wrap'>
                    <video
                        controls={false}
                        poster={videoPosterImg}
                        autoPlay={true}
                        preload="none"
                        playsInline={true}
                        webkit-playsinline={'true'}
                        muted={muteState}
                        loop={true}
                        className='bs-banner__video'
                        ref={videoRef}
                    >
                        <source src={videoUrl} type="video/webm" />
                        <source src={fallbackVideoURL} type="video/mp4" />

                    </video>
                    <div className='bs-banner__slide-info'>
                        <Link to={"/collections"} className='bs-btn bs-btn__btn-solid bs-btn__btn-solid--inverse'>explore now</Link>
                    </div>
                    <button className='bs-banner__video-wrap__action' onClick={muteUnmuteHandleChange}>
                        {!muteState ? (
                            <span className='icon icon-unmute'></span>
                        ) : (
                            <span className='icon icon-mute'></span>
                        )}
                    </button>
                </div>
            ) : variant === 'slide' ? (
                <Swiper
                    spaceBetween={30}
                    effect={'fade'}
                    navigation={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    speed={2000}
                    modules={[EffectFade, Navigation, Autoplay]}
                    className="bs-banner__swiper-container"
                >
                    {bannerSlideData.map((item, index) => {

                        const slideImage = cld.image(item.imgId).quality('auto').delivery(format('webp'));

                        return (
                            <SwiperSlide className='bs-banner__swiper-slide' key={index}>
                                <div className='bs-banner__slide-image'>
                                    <AdvancedImage cldImg={slideImage} loading='lazy' className='bs-banner__image' />
                                </div>
                                <div className='bs-banner__slide-info'>
                                    <label className='bs-banner__slide-category'>{item.category}</label>
                                    <h2 className='bs-banner__slide-title'>{item.title}</h2>
                                    <Link to={item.link} className='bs-btn bs-btn__btn-solid bs-btn__btn-solid--inverse'>explore now</Link>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            ) : (
                <div className='bs-banner__media'>
                    <AdvancedImage cldImg={myImage} loading='lazy' className='bs-banner__image' />
                </div>
            )}
        </div>
    )
}

export default Banner