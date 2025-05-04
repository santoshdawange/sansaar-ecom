import React, { useEffect, useState } from 'react';
import Banner from '../../../common/components/Banner';
import DiscoverProduct from './components/DiscoverProducts';
import Collections from '@common/components/Collections';
import SectionBanner from '../../../common/components/SectionBanner';
import Instafeed from './components/InstafeedContainer';
import clientlogo from '../../../common/assets/json/client.json';
import { Link } from 'react-router-dom';
import Favourites from '@pages/Shop/view/components/Favourites';
import { categoryList } from '@common/utils/constant';
import apiUrl from '@common/utils/apiURL';
import useApi from '@common/utils/useApi';
import { getWishlist } from '@common/utils/cart';
import Endurance from './components/Endurance';

function Home() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const getFeaturedProductsURL = apiUrl.product.getFeaturedProducts;
    const { data: responseFeaturedProducts, loading: isLoading, error } = useApi(getFeaturedProductsURL);

    useEffect(() => {
        if (!isLoading && responseFeaturedProducts) {
            setFeaturedProducts(responseFeaturedProducts);
        }
    }, [isLoading, responseFeaturedProducts]);

    useEffect(() => {
        getWishlist();
    }, [])

    return (
        <>
            <Banner variant="slide" />
            <div className='bs-section bs-section--typ-grey bs-section--typ-sm-container'>
                <div className='bs-section__section-cont'>
                    <h2 className='bs-section__title'>about sansaar</h2>
                    <p className='bs-section__desc'>At Sansaar, each fabric we create embodies a journey of meticulous craftsmanship and modern sustainability. Inspired by mindful living, we’ve embedded sustainability at every step of the way. From ethical sourcing to the final product, weaving a promise of a better tomorrow for you and your loved ones.</p>
                    <div className="lyt-features">
                        <div className='mod-icon-info'>
                            <div className='mod-icon-info__icon-wrap'>
                                <span className='icon icon-non-toxic'></span>
                            </div>
                            <div className='mod-icon-info__info-wrap'>
                                <p className='mod-icon-info__desc'>
                                    Safe &
                                    <span className='cm-line-break'>Non-Toxic</span>
                                </p>
                            </div>
                        </div>
                        <div className='mod-icon-info'>
                            <div className='mod-icon-info__icon-wrap'>
                                <span className='icon icon-sustainably'></span>
                            </div>
                            <div className='mod-icon-info__info-wrap'>
                                <p className='mod-icon-info__desc'>
                                    Sustainable
                                    <span className='cm-line-break'>Management Practices</span>
                                </p>
                            </div>
                        </div>
                        <div className='mod-icon-info'>
                            <div className='mod-icon-info__icon-wrap'>
                                <span className='icon icon-washable'></span>
                            </div>
                            <div className='mod-icon-info__info-wrap'>
                                <p className='mod-icon-info__desc'>
                                    Washable &
                                    <span className='cm-line-break'>Resilient</span>
                                </p>
                            </div>
                        </div>
                        <div className='mod-icon-info'>
                            <div className='mod-icon-info__icon-wrap'>
                                <span className='icon icon-touch'></span>
                            </div>
                            <div className='mod-icon-info__info-wrap'>
                                <p className='mod-icon-info__desc'>
                                    Exceptional
                                    <span className='cm-line-break'>Touch</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <Link to="/" className='bs-btn bs-btn__btn-solid bs-btn__btn-solid--inverse d-none'>learn more</Link>
                </div>
            </div>
            <div className='bs-section'>
                <div className='bs-section__section-head'>
                    <h2 className='bs-section__title'>discover</h2>
                </div>
                <div className='bs-section__section-cont'>
                    <ul className='lyt-discover'>
                        <li className='lyt-discover__item'>
                            <DiscoverProduct title='curtains' imgUrl="240229-DE-03_gkp5gh.jpg" link='/collections?type=endUse&value=Curtain' />
                        </li>
                        <li className='lyt-discover__item'>
                            <DiscoverProduct title='multipurpose' imgUrl="Rectangle_2_dpuksx.jpg" link='/collections?type=endUse&value=Multipurpose' />
                        </li>
                        <li className='lyt-discover__item'>
                            <DiscoverProduct title='upholstery' imgUrl="_A1_1529_dpqecm.jpg" link='/collections?type=endUse&value=Upholstery' />
                        </li>
                    </ul>
                </div>
            </div>
            <div className='bs-section bs-section--products'>
                <div className='bs-section__section-head'>
                    <h2 className='bs-section__title'>Explore our range of Bedding</h2>
                    <p className='bs-section__sub-title'>Embrace CONSCIOUS LUXURY</p>
                    <ul className='bs-section__more-info-list'>
                        {categoryList.map((item, index) => (
                            <li className='bs-section__more-info-item' key={index}>
                                <Link to={item.link} className="mod-product-tag mod-product-tag--outline bs-section__more-info-item__tag">{item.name}</Link>
                            </li>
                        ))}
                        {/* <li className='bs-section__more-info-item'>
                            <label className="mod-product-tag mod-product-tag--outline bs-section__more-info-item__tag">bedspreads</label>
                        </li>
                        <li className='bs-section__more-info-item'>
                            <label className="mod-product-tag mod-product-tag--outline bs-section__more-info-item__tag">duvet covers</label>
                        </li>
                        <li className='bs-section__more-info-item'>
                            <label className="mod-product-tag mod-product-tag--outline bs-section__more-info-item__tag">comfortors</label>
                        </li> */}
                    </ul>
                </div>
                <div className='bs-section__section-cont'>
                    <SectionBanner
                        variant='typ-display-link'
                        imageUrl="Explore-Our-Bedding-Range"
                        redirectionLink="/products"
                    />
                </div>
            </div>
            <div className='bs-section bs-section--typ-grey cm-overflow-hidden'>
                <div className='bs-section__section-head'>
                    <h2 className='bs-section__title'>TRENDING FABRIC COLLECTIONS</h2>
                </div>
                <div className='bs-section__section-cont'>
                    <Collections />
                </div>
            </div>
            <div className='bs-section bs-section--typ-new-title cm-no-padding-horizontal'>
                <div className='bs-section__section-head'>
                    <h2 className='bs-section__title'>Featured Products</h2>
                    <p className='bs-section__sub-title'>explore range of home beddings</p>
                </div>
                <div className='bs-section__section-cont'>
                    <Favourites
                        gridGap={16}
                        actionTitle="shop all products"
                        data={featuredProducts}
                        showAddToCart={false}
                    />
                </div>
            </div>
            <div className='bs-section bs-section--typ-grey'>
                <div className='bs-section__section-cont'>
                    <Endurance />
                </div>
            </div>
            <div className='bs-section cm-no-padding'>
                <div className='bs-section__section-cont'>
                    <SectionBanner
                        imageUrl="home-1.jpg"
                        title="weaving sustainability along the way"
                        desc="Sustainability is the soul of Sansaar, a commitment woven into every fabric. It's about preserving the delicate balance of nature, empowering communities through ethical practices, and crafting fabrics that embody both beauty and responsibility."
                        link="#"
                        clientlogo={clientlogo}
                    />
                </div>
            </div>
            <div className='bs-section bs-section--typ-grey'>
                <div className='bs-section__section-head'>
                    <h2 className='bs-section__title'>follow us <span className='bs-section__title--handle-id'>@sansaar.ddecorbrand</span></h2>
                </div>
                <div className='bs-section__section-cont'>
                    <Instafeed />
                    <Link to={"/contact-us"} className='bs-btn bs-btn__btn-solid'>Contact Us</Link>
                </div>
            </div>
        </>
    )
}

export default Home