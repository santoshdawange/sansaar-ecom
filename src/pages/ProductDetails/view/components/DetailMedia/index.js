import React, {useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, EffectCreative } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/effect-creative';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary, transformationStringFromObject } from "@cloudinary/url-gen";
import { format } from '@cloudinary/url-gen/actions/delivery';


const cld = new Cloudinary({
  secure: true,
  cloud: {
      cloudName: 'dci1aiukm'
  }
});


function DetailMedia({showCaseData}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className='bs-detail-media'>
      <div className='bs-detail-media__thumb-wrap'>
          <Swiper
            style={{
              '--swiper-navigation-color': '#000',
              '--swiper-pagination-color': '#000',
            }}
            onSwiper={setThumbsSwiper}
            navigation={true}
            spaceBetween={20}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper bs-detail-media__swiper--thumb"
            direction={'vertical'}
          >
            {showCaseData.map((item, index) => {
              const imgSrc = cld.image(item.imageUrl).quality('auto').delivery(format('webp'));
              return (
                <SwiperSlide key={index}>
                  <AdvancedImage cldImg={imgSrc} loading="lazy" />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
      <div className='bs-detail-media__cont-wrap'>
        <Swiper
          effect={'creative'}
          spaceBetween={0}
          loop={true} 
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Thumbs, EffectCreative]}
          speed={1100}
          creativeEffect={{
            prev: {
                shadow: true,
                translate: ['-20%', 0, -1],
            },
            next: {
                translate: ['100%', 0, 0],
            },
        }}
          className="mySwiper2 bs-detail-media__swiper--main"
        >
          {showCaseData.map((item, index) => {
            const imgSrc = cld.image(item.imageUrl).quality('auto').delivery(format('webp'));
            return (
              <SwiperSlide key={index}>
                <AdvancedImage cldImg={imgSrc} loading="lazy" />
                {/* <button className='bs-btn bs-btn__btn-icon bs-detail-media__pallete-btn' id={`button_${index}`}>
                  <span className='icon icon-pallete'></span>
                </button> */}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  )
}

export default DetailMedia