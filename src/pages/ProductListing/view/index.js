import React, { useEffect, useState } from 'react';
import ProductTile from './components/ProductTile';
import CustomerSupport from '@pages/Shop/view/components/CustomerSupport';
import ProductFilterFeatureList from './components/ProductFilterFeatureList';
import { Link } from 'react-router-dom';
import CustomSelect from '@common/components/CustomSelect';
import ShopFilter from './components/ShopFilter';
import FilterPanel from './components/FilterPanel';
import apiUrl from '@common/utils/apiURL';
import useApi from '@common/utils/useApi';
import { getAuthHeaders, getCart } from '@common/utils/cart';
// import productColor1 from '../../../common/assets/images/products/BD000043_2.jpg';
// import productColor2 from '../../../common/assets/images/products/BD000044_2.jpg';
// import productColor3 from '../../../common/assets/images/products/BD000045_2.jpg';
// import productColor4 from '../../../common/assets/images/products/BD000046_2.jpg';
// import productColor5 from '../../../common/assets/images/products/BD000047_2.jpg';
// import productColor6 from '../../../common/assets/images/products/BD000048_2.jpg';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

// const productColorVariants = [productColor1, productColor2, productColor3, productColor4, productColor5, productColor6];

const paginationEnum = {
    page: 1,
    pageSize: 12,
    direction: "desc",
    orderBy: "id",
    totalPages: null,
}

function ProductListing() {
    const [sortBy, setSortBy] = React.useState('');
    const [skusData, setSKUsData] = React.useState([]);
    const [paginationInfo, setPaginationInfo] = React.useState(paginationEnum);
    const [isLoading, setIsLoading] = useState(false); // Track loading state

    // const getAllSKUsURL = apiUrl.shop.getAllSKUs;
    // const { data: responseSKUs, loading: isLoadingSKUs, errorSKUs } = useApi(getAllSKUsURL);


    const fetchProducts = async () => {
        // Call your search API here
        const fetchProductsURL = apiUrl.shop.getAllSKUs(
            paginationInfo.page,
            paginationInfo.pageSize,
            paginationInfo.direction,
            paginationInfo.orderBy
        );
        try {
            const response = await axios.get(fetchProductsURL);
            if (response.status === 200) {
                setPaginationInfo({
                    ...paginationInfo,
                    totalPages: response?.data?.totalPages,
                    page: response?.data?.currentPage + 1, // Increment page for the next fetch
                });
                if(response?.data?.data?.length === 0) {
                    setHasMore(false); // No more data to load
                } else {
                    setSKUsData((prevData) => [...prevData, ...response?.data?.data]); // Append new data to existing data
                    setHasMore(true);
                }
            }
        } catch (error) {
            console.error('Fetch products failed:', error);
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    useEffect(() => {
        // fetchProducts();
        fetchCart();
    }, []);

    const sortByHandleChange = (event) => {
        setSortBy(event.target.value);
        // handleFilterData('sort', event.target.value)
    };

    const addToCartHandleChange = () => {
        console.log('Add to cart button clicked');
    }

    const sortByData = [
        {
            id:1,
            value: 'value1',
            label: 'label 1'
        },
        {
            id:2,
            value: 'value2',
            label: 'label 2'
        }
    ]

    // get cart details
    const [cartData, setCartData] = useState({});

    const fetchCart = async () => {
        try {
            const cart = await getCart(); // Await the promise returned by getCart
            if (cart) {
                setCartData(cart?.data);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    // logic for infinite scrolling
    const [hasMore, setHasMore] = useState(true);
    const [loadMoreLoading, setLoadMoreLoading] = useState(false);
    const elementRef = React.useRef(null);

    const onIntersection = (entries) => {
        const firstEntries = entries[0];
        if (firstEntries.isIntersecting && hasMore) {
            setLoadMoreLoading(true);
            fetchProducts();
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(onIntersection);
        if(observer && elementRef.current) {
            observer.observe(elementRef.current);
        }
        return () => {
            observer.disconnect()
        }
    }, [skusData]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

  return (
    <>
        <div className='lyt-product-list'>
            <div className='lyt-product-list__filter-wrap'>
                {/* <ShopFilter/> */}
                {/* filter placement */}
                <FilterPanel/>
            </div>
            <div className='lyt-product-list__product-list-wrap'>
                <div className='lyt-product-list__head-wrap'>
                    <h2 className='lyt-product-list__title'>
                        <Link to="#" className='icon icon-o-left lyt-product-list__back-link'></Link>
                        <span className='lyt-product-list__title-text'>all products</span>
                    </h2>
                    <CustomSelect 
                        label="Sort by"
                        options={sortByData}
                        selectState={sortBy}
                        selectHandleChange={sortByHandleChange}
                        variant="typ-2"
                    />
                </div>
                <div className='lyt-product-list__filter-feature-wrap'>
                    <ul className='lyt-feature-list'>
                        <li className='lyt-feature-list__item'>
                            <ProductFilterFeatureList
                                icon="bedsheet"
                                title="bedsheet"
                            />
                        </li>
                        <li className='lyt-feature-list__item'>
                            <ProductFilterFeatureList
                                icon="duvet"
                                title="duvet cover"
                            />
                        </li>
                        <li className='lyt-feature-list__item'>
                            <ProductFilterFeatureList
                                icon="comfortor"
                                title="comfortor"
                            />
                        </li>
                        <li className='lyt-feature-list__item'>
                            <ProductFilterFeatureList
                                icon="bed-in-bag"
                                title="bed in a bag"
                            />
                        </li>
                        <li className='lyt-feature-list__item'>
                            <ProductFilterFeatureList
                                icon="pillow-cover"
                                title="pillow cover"
                            />
                        </li>
                        <li className='lyt-feature-list__item'>
                            <ProductFilterFeatureList
                                icon="cushion-cover"
                                title="cushion cover"
                            />
                        </li>
                    </ul>
                </div>
                <div className='lyt-product-list__body-wrap'>
                    <ul className='lyt-product-list__wrap'>
                        {skusData.map((item, index) => {
                            const itemProductQty = cartData?.cartItem?.find((ele) => ele.productId === item.id)?.quantity || 0;
                            const itemProductStock = cartData?.cartItem?.find((ele) => ele.productId === item.id)?.product?.stock || 0;
                            return (
                                <li className='lyt-product-list__item' key={index}>
                                    <ProductTile
                                        productId={item?.id}
                                        productSlug={item?.slug}
                                        imageUrl={item?.productImages[0]?.imageUrl}
                                        tagTitle={item?.badge}
                                        handleAction={() => addToCartHandleChange()}
                                        productTitle={item?.name}
                                        priceValue={item.discount ? item.price - Number(item.discount) : null}
                                        strikePriceValue={item.price}
                                        colorVariants={item?.colors}
                                        // colorVariants={productColorVariants}
                                        showAddToCart={true}
                                        setCartData={setCartData}
                                        productQty={itemProductQty}
                                        stock={itemProductStock}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                    {hasMore &&
                        <div ref={elementRef}>
                            <div className='circular_loader'>
                                {loadMoreLoading && <CircularProgress />}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
        <div className='bs-section bs-section--typ-grey bs-section--typ-customer-support'>
            <div className='bs-section__section-cont'>
                <CustomerSupport/>
            </div>
        </div>
    </>
  )
}

export default ProductListing