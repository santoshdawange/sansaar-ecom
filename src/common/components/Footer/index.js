import React from 'react';
import companyLogo from '../../assets/images/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import useScrollPosition from '../../../utils/useScrollPosition';

function Footer() {

    const { top } = useScrollPosition();

    const location = useLocation();

    const scrollTopHandleChange = () => {
        window.scrollTo(0, 0);
    }

    return (
        <>
            <div className={`bs-footer ${location.pathname.includes('collections')  || location.pathname.includes('collection-detail') || location.pathname.includes('sku-detail') || location.pathname.includes('sustainability') || location.pathname.includes('where-to-buy') || location.pathname.includes('quality-standards') || location.pathname.includes('inspired-living') || location.pathname.includes('blog') || location.pathname.includes('plp')  ? 'bs-footer--typ-dark' : ''}`}>
                <div className='bs-footer__logo-wrap'>
                    <Link to="/" className='bs-footer__logo'>
                        <img src={companyLogo} alt="Sansaar logo" />
                    </Link>
                </div>
                <div className='bs-footer__nav-wrap'>
                    <nav className='bs-footer__nav'>
                        <ul className='bs-footer__nav-list'>
                            <li className='bs-footer__nav-item'>
                                <Link to="/our-journey" className={`bs-footer__nav-link ${location.pathname.includes('our-journey')  ? 'bs-footer__nav-link--active' : ''}`}>our journey</Link>
                            </li>
                            <li className='bs-footer__nav-item'>
                                <Link to="/collections" className={`bs-footer__nav-link ${location.pathname.includes('collections')  || location.pathname.includes('collection-detail')  || location.pathname.includes('sku-detail')  ? 'bs-footer__nav-link--active' : ''}`}>collections</Link>
                            </li>
                            <li className='bs-footer__nav-item'>
                                <Link to="/sustainability" className={`bs-footer__nav-link ${location.pathname.includes('sustainability')  ? 'bs-footer__nav-link--active' : ''}`}>sustainability</Link>
                            </li>
                            <li className='bs-footer__nav-item'>
                                <Link to="/quality-standards" className={`bs-footer__nav-link ${location.pathname.includes('quality-standards')  ? 'bs-footer__nav-link--active' : ''}`}>quality standards</Link>
                            </li>
                            <li className='bs-footer__nav-item'>
                                <Link to="/faq" className={`bs-footer__nav-link ${location.pathname.includes('faq')  ? 'bs-footer__nav-link--active' : ''}`}>faqs</Link>
                            </li>
                            <li className='bs-footer__nav-item'>
                                <Link to="/contact-us" className={`bs-footer__nav-link ${location.pathname.includes('contact-us')  ? 'bs-footer__nav-link--active' : ''}`}>contact us</Link>
                            </li>
                            <li className='bs-footer__nav-item'>
                                <Link to="/privacy-policy" className={`bs-footer__nav-link ${location.pathname.includes('privacy-policy')  ? 'bs-footer__nav-link--active' : ''}`}>privacy policy</Link>
                            </li>
                            <li className='bs-footer__nav-item'>
                                <Link to="/inspired-living" className={`bs-footer__nav-link ${location.pathname.includes('inspired-living') || location.pathname.includes('blogs')  ? 'bs-footer__nav-link--active' : ''}`}>news / media</Link>
                            </li>
                            {/* <li className='bs-footer__nav-item'>
                                <Link to="#" className={`bs-footer__nav-link`}>career opportunities</Link>
                            </li> */}
                            <li className='bs-footer__nav-item'>
                                <Link to="/tnc" className={`bs-footer__nav-link ${location.pathname.includes('tnc')  ? 'bs-footer__nav-link--active' : ''}`}>terms & conditions</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className='bs-footer__foot-wrap'>
                    {/* <div className='bs-signup'>
                        <label className='bs-signup__label bs-footer__label'>sign up for updates</label>
                        <div className='bs-signup__form-group'>
                            <input className='bs-signup__field' placeholder="email address"/>
                            <button className='bs-btn bs-btn__btn-solid bs-signup__action'>Submit</button>
                        </div>
                    </div> */}
                    <div className='bs-social'>
                        <label className='bs-social__label bs-footer__label'>follow us</label>
                        <br></br>
                        <ul className='bs-social__link-wrap'>
                            <li className='bs-social__link-item'>
                                <Link to="https://www.instagram.com/sansaar.ddecorbrand" className='bs-social__link' target="_blank">
                                    <span className='icon icon-instagram'></span>
                                </Link>
                            </li>
                            <li className='bs-social__link-item'>
                                <Link to="https://www.linkedin.com/company/sansaar" className='bs-social__link' target="_blank">
                                    <span className='icon icon-linkedin'></span>
                                </Link>
                            </li>
                            <li className='bs-social__link-item'>
                                <Link to="https://www.youtube.com/@sansaar.ddecorbrand" className='bs-social__link' target="_blank">
                                    <span className='icon icon-youtube'></span>
                                </Link>
                            </li>
                            <li className='bs-social__link-item'>
                                <Link to="https://www.facebook.com/profile.php?id=61557298044043" className='bs-social__link' target="_blank">
                                    <span className='icon icon-facebook'></span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className='bs-floaters'>
                <ul className='bs-floaters__list'>
                    {location.pathname.includes('collections') || location.pathname.includes('collection-detail') || location.pathname.includes('sku-detail') || location.pathname.includes('search') || location.pathname.includes('inspired-living') ? (
                        top >= 500 &&
                        <li className='bs-floaters__list-item'>
                            <button className='bs-floaters__btn' onClick={scrollTopHandleChange}>
                                <span className='bs-floaters__btn-icon  bs-floaters__btn-icon--icon-scroll-up'></span>
                                <span className='bs-floaters__btn-text'>Scroll to top</span>
                            </button>
                        </li>
                    ) : (
                        ""
                        // <li className='bs-floaters__list-item'>
                        //     <Link aria-label="Chat on WhatsApp" to="https://wa.me/7400168623" className='bs-floaters__btn' target="_blank">
                        //         <span className='bs-floaters__btn-icon bs-floaters__btn-icon--icon-whastapp'></span>
                        //     </Link>
                        // </li>
                    )}
                </ul>
            </div>

        </>
    )
}

export default Footer