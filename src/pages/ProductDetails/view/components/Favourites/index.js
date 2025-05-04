import React, {useRef} from 'react';
// import { Link } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ProductTile from '@pages/ProductListing/view/components/ProductTile';

const productData = [
    {
        id: 1,
        name: "Melange Single Bedsheet set",
        sp: 4500,
        discountPrice: 3500,
        productImgUrl: 'test-product',
        productColorVariants: [
            {
                id:1,
                colorCode: '#6C6159',
            },
            {
                id:2,
                colorCode: '#F0EBB8',
            },
            {
                id:3,
                colorCode: '#ff0000',
            },
            {
                id:4,
                colorCode: '#00ff00',
            },
            {
                id:5,
                colorCode: '#0000ff',
            }
        ],
        tag: "New Arrival",
    },
    {
        id: 2,
        name: "Melange Single Bedsheet set 2",
        sp: 4500,
        discountPrice: 3500,
        productImgUrl: 'test-product',
        productColorVariants: [
            {
                id:1,
                colorCode: '#6C6159',
            },
            {
                id:2,
                colorCode: '#F0EBB8',
            },
            {
                id:3,
                colorCode: '#ff0000',
            }
        ],
        tag: "sale",
    },
    {
        id: 3,
        name: "Melange Single Bedsheet set 3",
        sp: 4500,
        discountPrice: 3500,
        productImgUrl: 'test-product',
        productColorVariants: [
            {
                id:1,
                colorCode: '#6C6159',
            },
            {
                id:2,
                colorCode: '#F0EBB8',
            }
        ],
        tag: "",
    },
    {
        id: 4,
        name: "Melange Single Bedsheet set 4",
        sp: 4500,
        discountPrice: 3500,
        productImgUrl: 'test-product',
        productColorVariants: [
            {
                id:1,
                colorCode: '#6C6159',
            },
            {
                id:2,
                colorCode: '#F0EBB8',
            },
            {
                id:3,
                colorCode: '#ff0000',
            },
            {
                id:4,
                colorCode: '#0000ff',
            }
        ],
        tag: "",
    },
    {
        id: 5,
        name: "Melange Single Bedsheet set",
        sp: 4500,
        discountPrice: 3500,
        productImgUrl: 'test-product',
        productColorVariants: [
            {
                id:1,
                colorCode: '#6C6159',
            },
            {
                id:2,
                colorCode: '#F0EBB8',
            },
            {
                id:3,
                colorCode: '#ff0000',
            },
            {
                id:4,
                colorCode: '#00ff00',
            },
            {
                id:5,
                colorCode: '#0000ff',
            }
        ],
        tag: "New Arrival",
    },
    {
        id: 6,
        name: "Melange Single Bedsheet set 2",
        sp: 4500,
        discountPrice: 3500,
        productImgUrl: 'test-product',
        productColorVariants: [
            {
                id:1,
                colorCode: '#6C6159',
            },
            {
                id:2,
                colorCode: '#F0EBB8',
            },
            {
                id:3,
                colorCode: '#ff0000',
            }
        ],
        tag: "sale",
    },
    {
        id: 7,
        name: "Melange Single Bedsheet set 3",
        sp: 4500,
        discountPrice: 3500,
        productImgUrl: 'test-product',
        productColorVariants: [
            {
                id:1,
                colorCode: '#6C6159',
            },
            {
                id:2,
                colorCode: '#F0EBB8',
            }
        ],
        tag: "",
    },
    {
        id: 8,
        name: "Melange Single Bedsheet set 4",
        sp: 4500,
        discountPrice: 3500,
        productImgUrl: 'test-product',
        productColorVariants: [
            {
                id:1,
                colorCode: '#6C6159',
            },
            {
                id:2,
                colorCode: '#F0EBB8',
            },
            {
                id:3,
                colorCode: '#ff0000',
            },
            {
                id:4,
                colorCode: '#0000ff',
            }
        ],
        tag: "",
    },
    {
        id: 9,
        name: "Melange Single Bedsheet set",
        sp: 4500,
        discountPrice: 3500,
        productImgUrl: 'test-product',
        productColorVariants: [
            {
                id:1,
                colorCode: '#6C6159',
            },
            {
                id:2,
                colorCode: '#F0EBB8',
            },
            {
                id:3,
                colorCode: '#ff0000',
            },
            {
                id:4,
                colorCode: '#00ff00',
            },
            {
                id:5,
                colorCode: '#0000ff',
            }
        ],
        tag: "New Arrival",
    },
    {
        id: 10,
        name: "Melange Single Bedsheet set 2",
        sp: 4500,
        discountPrice: 3500,
        productImgUrl: 'test-product',
        productColorVariants: [
            {
                id:1,
                colorCode: '#6C6159',
            },
            {
                id:2,
                colorCode: '#F0EBB8',
            },
            {
                id:3,
                colorCode: '#ff0000',
            }
        ],
        tag: "sale",
    },
    {
        id: 11,
        name: "Melange Single Bedsheet set 3",
        sp: 4500,
        discountPrice: 3500,
        productImgUrl: 'test-product',
        productColorVariants: [
            {
                id:1,
                colorCode: '#6C6159',
            },
            {
                id:2,
                colorCode: '#F0EBB8',
            }
        ],
        tag: "",
    },
    {
        id: 12,
        name: "Melange Single Bedsheet set 4",
        sp: 4500,
        discountPrice: 3500,
        productImgUrl: 'test-product',
        productColorVariants: [
            {
                id:1,
                colorCode: '#6C6159',
            },
            {
                id:2,
                colorCode: '#F0EBB8',
            },
            {
                id:3,
                colorCode: '#ff0000',
            },
            {
                id:4,
                colorCode: '#0000ff',
            }
        ],
        tag: "",
    },

]

function Favourites({gridGap, actionTitle, sectionTitle, sectionSubTitle}) {

    const swiperRef = useRef(null);

    const addToCartHandleChange = () => {
        console.log('Add to cart button clicked');
    }


  return (
    <div className='lyt-favourites lyt-favourites--typ-navigation'>
        <div className='bs-section__section-head'>
            <h2 className='bs-section__title'>{sectionTitle}</h2>
            <p className='bs-section__sub-title'>{sectionSubTitle}</p>
        </div>
        <div className='lyt-favourites__carousel-wrap'>
        <Swiper
            grabCursor={true}
            slidesPerView='auto'
            spaceBetween={gridGap}
            modules={[Navigation, Pagination, Autoplay]}
            className="lyt-favourites__swiper-container"
            ref={swiperRef}
            navigation={true}
        >
                {productData?.map((item, index) => {

                    return (
                        <SwiperSlide className='lyt-favourites__swiper-slide' key={index}>
                            <ProductTile
                                imageUrl={item.productImgUrl}
                                tagTitle={item.tag}
                                handleAction={() => addToCartHandleChange()}
                                productTitle={item.name}
                                priceValue={item.discountPrice}
                                strikePriceValue={item.sp}
                                // colorVariants={item.productColorVariants}
                            />
                        </SwiperSlide>
                    )
                })}
        </Swiper>
        </div>
    </div>
  )
}

export default Favourites