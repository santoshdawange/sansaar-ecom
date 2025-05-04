import SectionBanner from '@common/components/SectionBanner';
import React, { useEffect, useRef, useState } from 'react';
import ItemsMarquee from './components/ItemsMarquee';
import FootprintInfography from './components/FootprintInfography';
import ShopCollections from './components/ShopCollections';
import Favourites from './components/Favourites';
import CollectionGrid from './components/CollectionGrid';
import Infography from './components/Infography';
import CustomerSupport from './components/CustomerSupport';
import apiUrl from '@common/utils/apiURL';
import useApi from '@common/utils/useApi';
import { getCart } from '@common/utils/cart';
import { categoryList } from '@common/utils/constant';

const productData = [
    {
        id: 1,
        name: "Bedsheet",
    },
    {
        id: 2,
        name: "Duvet Covers",
    },
    {
        id: 3,
        name: "Pillow Covers",
    },
    {
        id: 4,
        name: "Comforter",
    },
    {
        id: 5,
        name: "Bedspreads",
    },
]

function Shop() {
    // const cartData = getCart();
    const [cartData, setCartData] = useState({});
    const [allTimeFav, setAllTimeFav] = useState([]);
    const [collectionsData, setCollectionsData] = useState([]);
    // const [categoriesData, setCategoriesData] = useState([]);

    // const swiperRef = useRef(null);
    const getAllCollectionURL = apiUrl.shop.getCollectionsList;
    // const getAllCategoryURL = apiUrl.shop.getCategoryList;
    const getAllTimeFavURL = apiUrl.shop.getAllTimeFav;

    const { data: responseCollection, loading: isLoadingCollection, errorCollection } = useApi(getAllCollectionURL);
    // const { data: responseCategory, loading: isLoadingCategory, errorCategory } = useApi(getAllCategoryURL);
    const { data: responseAllTimeFav, loading: isLoadingAllTimeFav, errorAllTimeFav } = useApi(getAllTimeFavURL);

    useEffect(() => {
        fetchCart();
    }, []);

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

    useEffect(() => {
        if (!isLoadingCollection && responseCollection) {
            const sortedCollections = [...responseCollection?.data].sort((a, b) => a.sequenceOrder - b.sequenceOrder);
            setCollectionsData(sortedCollections);
        }
    }, [isLoadingCollection, responseCollection]);

    // useEffect(() => {
    //     if (!isLoadingCategory && responseCategory) {
    //         setCategoriesData(responseCategory?.data)
    //     }
    // }, [isLoadingCategory, responseCategory]);

    useEffect(() => {
        // console.log('responseAllTimeFav', isLoadingAllTimeFav, responseAllTimeFav, cartData);
        if (!isLoadingAllTimeFav && responseAllTimeFav) {
            setAllTimeFav(responseAllTimeFav);
        }
    }, [isLoadingAllTimeFav, responseAllTimeFav, cartData]);

    console.log('allTimeFav', allTimeFav);
    return (
    <>
        <div className='bs-section cm-no-padding bs-section--typ-grey'>
            <div className='bs-section__section-cont'>
                <SectionBanner
                    noHover
                    titleLine1='Timeless Design meets'    
                    titleLine2='<span class="cm-italic cm-font-2">concious</span> living'
                    variant='typ-2'
                    imageUrl="Shop-Banner-Image"
                />
            </div>
        </div>
        {/* <div className='bs-section cm-no-padding'>
            <div className='bs-section__section-cont'>
                <ItemsMarquee/>
            </div>
        </div> */}
        <div className='bs-section bs-section--typ-grey'>
            <div className='bs-section__section-cont'>
                <FootprintInfography/>
            </div>
        </div>
        {categoryList.length > 0 ? 
            <div className='bs-section bs-section--typ-grey cm-no-padding-horizontal bs-section--typ-left-full'>
                <div className='bs-section__section-cont'>
                    <ShopCollections
                        data={categoryList}
                    />
                </div>
            </div>
        : null}
        <div className='bs-section cm-no-padding'>
            <div className='bs-section__section-cont'>
                <SectionBanner
                    noHover
                    titlePosition = 'on-image'
                    title='Origins'  
                    // desc='Luxury That’s Kind to the Earth Explore Organic Cotton Bedding'  
                    desc='Luxury that’s kind to the Earth Explore <span class="cm-bold">100% Organic Cotton Bedding</span>'
                    variant='typ-3'
                    imageUrl="Origins-Banner"
                />
            </div>
        </div>
        <div className='bs-section bs-section--typ-new-title cm-no-padding-horizontal'>
            <div className='bs-section__section-head'>
                <h2 className='bs-section__title'>All time favourites</h2>
                <p className='bs-section__sub-title'>explore range of home beddings</p>
            </div>
            <div className='bs-section__section-cont'>
                <Favourites
                    gridGap={44}
                    actionTitle="shop all"
                    data={allTimeFav}
                    setCartData={setCartData}
                    showAddToCart={true}
                    cartData={cartData}
                />
            </div>
        </div>
        <div className='bs-section bs-section--typ-grey'>
            <div className='bs-section__section-cont'>
                <CollectionGrid
                    data={collectionsData.slice(0, 5)}
                />
            </div>
        </div>
        <div className='bs-section cm-no-padding'>
            <div className='bs-section__section-cont'>
                <Infography
                    imageUrl="luxury-room"
                    title="Your Dream Bed, <span class='cm-line-break'>All in a bag</span>"
                    subTitle="Discover the perfect Bed-in-a Bag set"
                    actionLink="/products"
                    actionTitle="shop bed in bag"
                    productData={productData}
                />
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

export default Shop