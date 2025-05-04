import React, {useEffect, useState, useRef} from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import apiUrl from '@common/utils/apiURL';
import useApi from '@common/utils/useApi';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { format } from '@cloudinary/url-gen/actions/delivery';

const processCollections = (data) => {
    // Filter out collections with trending value of 0
    const filteredCollections = data.filter(collection => collection.trending > 0);
  
    // Sort filtered collections by 'trending' in ascending order
    const sortedCollections = filteredCollections.sort((a, b) => a.trending - b.trending);
  
    // Filter primary images for each collection
    const processedCollections = sortedCollections.map(collection => {
      const primaryImage = collection.CollectionImages.find(image => image.isPrimary);
      return {
        ...collection,
        primaryImage: primaryImage ? primaryImage.imagePublicId : null
      };
    });
  
    return processedCollections;
  };


function Collections() {

    const [trendingData, setTrendingData] = useState([]);
    const getAllCollectionURL = apiUrl.collection.getTrending;
    const swiperRef = useRef(null);

    const { data: response, loading: isLoading, error } = useApi(getAllCollectionURL);
    useEffect(() => {
        if (!isLoading && response) {
            const uniqueCollectionGallery = processCollections(response);
            setTrendingData(uniqueCollectionGallery);
        }
    }, [isLoading, response]);

    

    const cld = new Cloudinary({
        secure: true,
        cloud: {
            cloudName: 'dci1aiukm'
        }
    });
    
    useEffect(() => {
        if (swiperRef.current) {
            setTimeout(() => {
                swiperRef.current.swiper.update(); // Update Swiper instance when data changes
            }, 1000)
        }
    }, [trendingData]);

    // console.log(trendingData.length, 'trendingDataLength')

    return (
        <div className='bs-collections'>
            {trendingData && trendingData.length > 0 ?
                <Swiper
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={1}
                    spaceBetween={0}
                    loop={true}
                    navigation={true}
                    pagination={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[Navigation, Pagination, Autoplay]}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    className="bs-collections__swiper-container"
                    ref={swiperRef}
                >
                    {trendingData?.map((item, index) => {

                        const imgSrc = cld.image(item.primaryImage).quality('auto').delivery(format('webp'));;

                        return (
                            <SwiperSlide className='bs-collections__swiper-slide' key={index}>
                                <div className='bs-collections__item'>
                                    <Link to={`/collection-detail?id=${item.collectionId}`} className='bs-collection__link'></Link>
                                    <AdvancedImage cldImg={imgSrc} className='bs-collections__image' />
                                </div>
                                <button className='bs-btn bs-btn__btn-solid'>{item.name}</button>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            : null}
        </div>
    )
}

export default Collections