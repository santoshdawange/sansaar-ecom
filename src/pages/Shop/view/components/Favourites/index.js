import React, {useRef} from 'react';
import { Link } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ProductTile from '@pages/ProductListing/view/components/ProductTile';

function Favourites({gridGap, actionTitle, data, showAddToCart=true, setCartData, cartData={cartItem: []}}) {

    const swiperRef = useRef(null);

    const addToCartHandleChange = () => {
        console.log('Add to cart button clicked');
    }

  return (
    <div className='lyt-favourites lyt-favourites--typ-navigation'>
        <div className='lyt-favourites__carousel-wrap'>
        <Swiper
          grabCursor={true}
          slidesPerView='auto'
          spaceBetween={gridGap}
          modules={[Navigation, Pagination, Autoplay]}
          className="lyt-favourites__swiper-container"
          ref={swiperRef}
          centeredSlides={window.innerWidth <= 1024 ? true : false}
          navigation={true}
      >
          {data?.map((item, index) => {
              const itemProductQty = cartData?.cartItem?.find((ele) => ele.productId === item.id)?.quantity || 0;
              const itemProductStock = cartData?.cartItem?.find((ele) => ele.productId === item.id)?.product?.stock || 0;
              return (
                  <SwiperSlide className='lyt-favourites__swiper-slide' key={index}>
                    <ProductTile
                        productId={item.id}
                        productSlug={item.slug}
                        imageUrl={item.imageUrl}
                        tagTitle={item.badge}
                        handleAction={() => addToCartHandleChange()}
                        productTitle={item.name}
                        priceValue={item.discount ? item.price - item.discount : null}
                        strikePriceValue={item.price}
                        colorVariants={item?.colors}
                        showAddToCart={showAddToCart}
                        setCartData={setCartData}
                        productQty={itemProductQty}
                        stock={itemProductStock}
                    />
                  </SwiperSlide>
              )
          })}
      </Swiper>
        </div>
        <div className='lyt-favourites__footer-wrap'>
            <Link to={"/products"} className='bs-btn bs-btn__btn-solid bs-btn__btn-solid--typ-large'>{actionTitle}</Link>
        </div>
    </div>
  )
}

export default Favourites