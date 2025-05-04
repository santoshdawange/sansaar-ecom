import React, {useEffect, useState, useRef} from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { format } from '@cloudinary/url-gen/actions/delivery';
import { Link } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';


const shopCollectionData = [
  {
    id: 1,
    name: "bedsheets",
    coverImage : "bedheets",
    link: "#",
  },
  {
    id: 2,
    name: "duvet covers",
    coverImage : "duvet-covers",
    link: "#",
  },
  {
    id: 3,
    name: "pillow covers",
    coverImage : "pillow-covers",
    link: "#",
  },
  {
    id: 4,
    name: "bedsheets",
    coverImage : "collection2",
    link: "#",
  },
  {
    id: 5,
    name: "bedsheets",
    coverImage : "shop-sec2-big",
    link: "#",
  },
  {
    id: 6,
    name: "bedsheets",
    coverImage : "test-product",
    link: "#",
  }
]

function ShopCollections({ data }) {
  const swiperRef = useRef(null);

  const cld = new Cloudinary({
    secure: true,
    cloud: {
        cloudName: 'dci1aiukm'
    }
  });

  return (
    <div className='bs-shop-collections'>
      <Swiper
          grabCursor={true}
          slidesPerView='auto'
          spaceBetween={50}
          modules={[Navigation, Pagination, Autoplay]}
          className="bs-shop-collections__swiper-container"
          ref={swiperRef}
          navigation={true}   
      >
          {data?.map((item, index) => {

              const imgSrc = cld.image(item.imageUrl).quality('auto').delivery(format('webp'));;

              return (
                  <SwiperSlide className='bs-shop-collections__swiper-slide' key={index}>
                    <div className='bs-shop-collections__item'>
                      <div className='bs-shop-collections__media-wrap'>
                          <AdvancedImage cldImg={imgSrc} className='bs-shop-collections__image' />
                      </div>
                      <h4 className='bs-shop-collections__title'>
                        <span className='bs-shop-collections__text'>{item?.name}</span> 
                        <span className='icon icon-o-right bs-shop-collections__icon'></span>
                      </h4>
                      <Link to={item?.link || '/products'} className='bs-shop-collections__link'></Link>
                    </div>
                  </SwiperSlide>
              )
          })}
      </Swiper>
    </div>
  )
}

export default ShopCollections