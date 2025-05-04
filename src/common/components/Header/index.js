import React, { useState, useEffect } from 'react';
import companyLogo from '../../assets/images/logo.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import { format } from '@cloudinary/url-gen/actions/delivery';
import SignInModal from '../SignInModal';
import CartDrawer from '../CartDrawer';

let portrait = window.matchMedia("(orientation: portrait)");

function Header() {
  const [menuActive, setMenuActive] = useState(false);

  const menuActiveHandleChange = () => {

    if (menuActive) {
      setMenuActive(false)
    } else {
      setMenuActive(true)
    }
  }

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [subMenuShow, setSubMenuShow] = useState('');

  const subMenuShowHandleChange = (target) => {

    setSubMenuShow(target);
  }

  const subMenuHideHandleChange = () => {
    // alert('sub menu hide')
    setSubMenuShow(false)
  }

  const navigate = useNavigate();
  const location = useLocation();
  
  const handleMenuClick = (path) => {
    if (location.pathname === path.split('?')[0]) {
      // Force re-render by pushing the same path
      navigate('/');
      setTimeout(() => {
        navigate(path);
      }, 0);
    } else {
      navigate(path);
    }
    if(window.innerWidth <= 1024){
      setMenuActive(false);
      setSubMenuShow(false);
    }
  };

  const cld = new Cloudinary({
      cloud: {
        cloudName: 'dci1aiukm'
      }
  });

  const myImage = cld.image('home-2.jpg').quality('auto').delivery(format('webp'));


  return (
    <header className="bs-header">
      <div className='bs-header__logo-wrap'>
        <Link to="/" className='bs-header__logo'>
          <img width="100%" height="100%" src={companyLogo} alt="Company logo" />
        </Link>
      </div>
      <div className={`bs-header__menu-wrap ${menuActive ? 'bs-header__menu-wrap--active' : ''}`}>
        <nav className='bs-menu bs-header__menu'>
          <ul className='bs-menu__nav-list'>
            <li className={`bs-menu__nav-item bs-menu__nav-item--fabric-collections ${subMenuShow === 'aboutSansaar' ? 'bs-menu__nav-item--active' : ''}`} >
              {window.innerWidth <= 1024 ? (
                <p onClick={() => subMenuShowHandleChange('aboutSansaar')} className={`bs-menu__nav-link bs-menu__nav-link--mb ${location.pathname.includes('our-journey') || location.pathname.includes('quality-standards')  ? 'bs-menu__nav-link--active' : ''}`}>About Sansaar <span className='icon icon-down bs-menu__icon-more'></span></p>
              ) : (
                // <Link to="/collections" onClick={menuActiveHandleChange} className={`bs-menu__nav-link ${location.pathname.includes('collections') || location.pathname.includes('collection-detail') || location.pathname.includes('sku-detail') ? 'bs-menu__nav-link--active' : ''}`}>collections</Link>
                <button 
                  onClick={
                    () => {
                      handleMenuClick("/collections"); 
                      menuActiveHandleChange();
                    }
                  } 
                  className={`bs-menu__nav-link ${location.pathname.includes('our-journey') || location.pathname.includes('inspired-living') || location.pathname.includes('quality-standards') ? 'bs-menu__nav-link--active' : ''}`}>
                    About Sansaar
                </button>
              )}
              
              <div className='bs-sub-menu bs-menu__sub-menu'>
                <div className='bs-sub-menu__head'>
                  <button className='bs-sub-menu__back-button' onClick={subMenuHideHandleChange}>
                    <span className='icon icon-back bs-sub-menu__icon-back'></span>
                  </button>
                  <h3 className='bs-sub-menu__head-title'>collections</h3>
                </div>
                <div className='bs-sub-menu__cont'>
                  <div className='bs-link-list'>
                    <ul className='bs-link-list__list-wrap'>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/our-journey`)} className='bs-link-list__link bs-link-list__title'>our journey</button>
                      </li>
                    </ul>
                  </div>
                  <div className='bs-link-list'>
                    <ul className='bs-link-list__list-wrap'>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/quality-standards`)} className='bs-link-list__link bs-link-list__title'>quality standards</button>
                      </li>
                    </ul>
                  </div>
                  <div className='bs-link-list'>
                    <ul className='bs-link-list__list-wrap'>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick("/inspired-living?type=film")} className='bs-link-list__link bs-link-list__title'>inspired living</button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            {/* <li className='bs-menu__nav-item bs-menu__nav-item--our-journey'>
              <Link to="/our-journey" onClick={menuActiveHandleChange} className={`bs-menu__nav-link ${location.pathname.includes('our-journey') ? 'bs-menu__nav-link--active' : ''}`}>our journey</Link>
            </li> */}
            <li className={`bs-menu__nav-item bs-menu__nav-item--fabric-collections ${subMenuShow === 'collections' ? 'bs-menu__nav-item--active' : ''}`} >
              {window.innerWidth <= 1024 ? (
                <p onClick={() => subMenuShowHandleChange('collections')} className={`bs-menu__nav-link bs-menu__nav-link--mb ${location.pathname.includes('collections') || location.pathname.includes('collection-detail')  || location.pathname.includes('sku-detail')  ? 'bs-menu__nav-link--active' : ''}`}>discover fabrics<span className='icon icon-down bs-menu__icon-more'></span></p>
              ) : (
                // <Link to="/collections" onClick={menuActiveHandleChange} className={`bs-menu__nav-link ${location.pathname.includes('collections') || location.pathname.includes('collection-detail') || location.pathname.includes('sku-detail') ? 'bs-menu__nav-link--active' : ''}`}>collections</Link>
                <button 
                  onClick={
                    () => {
                      handleMenuClick("/collections"); 
                      menuActiveHandleChange();
                    }
                  } 
                  className={`bs-menu__nav-link ${location.pathname.includes('collections') || location.pathname.includes('collection-detail') || location.pathname.includes('sku-detail') ? 'bs-menu__nav-link--active' : ''}`}>
                    discover fabrics
                </button>
              )}
              
              <div className='bs-sub-menu bs-menu__sub-menu'>
                <div className='bs-sub-menu__head'>
                  <button className='bs-sub-menu__back-button' onClick={subMenuHideHandleChange}>
                    <span className='icon icon-back bs-sub-menu__icon-back'></span>
                  </button>
                  <h3 className='bs-sub-menu__head-title'>collections</h3>
                </div>
                <div className='bs-sub-menu__cont'>
                  <div className='bs-link-list'>
                    <h3 className='bs-link-list__title'>end use</h3>
                    <ul className='bs-link-list__list-wrap'>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/collections?type=endUse&value=Curtain`)} className='bs-link-list__link'>curtains</button>
                      </li>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/collections?type=endUse&value=Multipurpose`)} className='bs-link-list__link'>multipurpose</button>
                      </li>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/collections?type=endUse&value=Upholstery`)} className='bs-link-list__link'>Upholstery</button>
                      </li>
                    </ul>
                  </div>
                  <div className='bs-link-list'>
                    <h3 className='bs-link-list__title'>fabric type</h3>
                    <ul className='bs-link-list__list-wrap'>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/collections?type=fabType&value=Plains`)} className='bs-link-list__link'>plains</button>
                      </li>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/collections?type=fabType&value=Texture`)} className='bs-link-list__link'>textured</button>
                      </li>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/collections?type=fabType&value=Sheers`)} className='bs-link-list__link'>sheers</button>
                      </li>
                      {/* <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/collections?type=fabType&value=Foil`)} className='bs-link-list__link'>foil</button>
                      </li> */}
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/collections?type=fabType&value=Chenille and Boucle`)} className='bs-link-list__link'>chenille and boucle</button>
                      </li>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/collections?type=fabType&value=Dimout and Blackout`)} className='bs-link-list__link'>dimout and blackout</button>
                      </li>
                      {/* <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/collections?type=fabType&value=Embroidery and Prints`)} className='bs-link-list__link'>embroidery and prints</button>
                      </li> */}
                    </ul>
                  </div>
                  <div className='bs-link-list'>
                    <h3 className='bs-link-list__title'>category</h3>
                    <ul className='bs-link-list__list-wrap'>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/collections?type=category&value=Sustainable Yarns`)} className='bs-link-list__link'>sustainable yarns</button>
                      </li>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/collections?type=category&value=Room Darkening`)} className='bs-link-list__link'>room darkening</button>
                      </li>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/collections?type=category&value=Decorative Fabrics`)} className='bs-link-list__link'>decorative fabrics</button>
                      </li>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/collections`)} className='bs-link-list__link'>all</button>
                      </li>
                    </ul>
                  </div>
                  <div className='bs-link-list'>
                    <h3 className='bs-link-list__title'>collection</h3>
                    <ul className='bs-link-list__list-wrap'>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/collections?type=trending&value=Trending`)} className='bs-link-list__link'>trending</button>
                      </li>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/collections?type=classic&value=Classic`)} className='bs-link-list__link'>classic</button>
                      </li>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/collections`)} className='bs-link-list__link'>all collections</button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            {/* <li className='bs-menu__nav-item bs-menu__new-tag'>
              <Link to="/shop" onClick={menuActiveHandleChange} className={`bs-menu__nav-link ${location.pathname.includes('our-journey') ? 'bs-menu__nav-link--active' : ''}`}>shop</Link>
              
            </li> */}
            <li className={`bs-menu__nav-item bs-menu__nav-item--shop ${subMenuShow === 'shop' ? 'bs-menu__nav-item--active' : ''}`} >
              <div className='bs-menu__new-tag'>
                {window.innerWidth <= 1024 ? (
                  <p onClick={() => subMenuShowHandleChange('shop')} className={`bs-menu__nav-link bs-menu__nav-link--mb ${location.pathname.includes('shop') || location.pathname.includes('product-description')  || location.pathname.includes('products')  ? 'bs-menu__nav-link--active' : ''}`}>shop<span className='icon icon-down bs-menu__icon-more'></span></p>
                ) : (
                  // <Link to="/collections" onClick={menuActiveHandleChange} className={`bs-menu__nav-link ${location.pathname.includes('collections') || location.pathname.includes('collection-detail') || location.pathname.includes('sku-detail') ? 'bs-menu__nav-link--active' : ''}`}>collections</Link>
                  <button 
                    onClick={
                      () => {
                        handleMenuClick("/shop"); 
                        menuActiveHandleChange();
                      }
                    } 
                    className={`bs-menu__nav-link ${location.pathname.includes('collections') || location.pathname.includes('collection-detail') || location.pathname.includes('sku-detail') ? 'bs-menu__nav-link--active' : ''}`}>
                      shop
                  </button>
                )}
                <label className="mod-product-tag mod-product-tag--new-2 bs-menu__tag">new</label>
              </div>
              
              <div className='bs-sub-menu bs-menu__sub-menu'>
                <div className='bs-sub-menu__head'>
                  <button className='bs-sub-menu__back-button' onClick={subMenuHideHandleChange}>
                    <span className='icon icon-back bs-sub-menu__icon-back'></span>
                  </button>
                  <h3 className='bs-sub-menu__head-title'>collections</h3>
                </div>
                <div className='bs-sub-menu__cont'>
                  <div className='bs-link-list'>
                    <h3 className='bs-link-list__title'>products</h3>
                    <ul className='bs-link-list__list-wrap'>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/products`)} className='bs-link-list__link'>BEDSHEET SET</button>
                      </li>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/products`)} className='bs-link-list__link'>BEDSPREADS</button>
                      </li>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/products`)} className='bs-link-list__link'>DUVET COVERS</button>
                      </li>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/products`)} className='bs-link-list__link'>COMFORTERS</button>
                      </li>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/products`)} className='bs-link-list__link'>BED IN A BAG</button>
                      </li>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/products`)} className='bs-link-list__link'>PILLOW COVER</button>
                      </li>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/products`)} className='bs-link-list__link'>all products</button>
                      </li>
                    </ul>
                  </div>
                  <div className='bs-link-list'>
                    <h3 className='bs-link-list__title'>collections</h3>
                    <ul className='bs-link-list__list-wrap'>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/products`)} className='bs-link-list__link'>charm</button>
                      </li>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/products`)} className='bs-link-list__link'>enchanted</button>
                      </li>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/products`)} className='bs-link-list__link'>moments</button>
                      </li>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/products`)} className='bs-link-list__link'>origins</button>
                      </li>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/products`)} className='bs-link-list__link'>bespoke bedding</button>
                      </li>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/products`)} className='bs-link-list__link'>luxe layers</button>
                      </li>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/products`)} className='bs-link-list__link'>all collections</button>
                      </li>
                    </ul>
                  </div>
                  
                  <div className='bs-link-list'>
                    <h3 className='bs-link-list__title'>fabric type</h3>
                    <ul className='bs-link-list__list-wrap'>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/products`)} className='bs-link-list__link'>embroidered</button>
                      </li>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/products`)} className='bs-link-list__link'>plain</button>
                      </li>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/products`)} className='bs-link-list__link'>jacquard</button>
                      </li>
                      <li className='bs-link-list__list-item'>
                        <button onClick={() => handleMenuClick(`/products`)} className='bs-link-list__link'>organic cotton</button>
                      </li>
                    </ul>
                  </div>

                  <div className='bs-link-list'>
                    <div className='bs-link-list__image-wrap'>
                        <Link onClick={() => handleMenuClick(`/products`)} className='bs-link-list__image-link'></Link>
                        <AdvancedImage  cldImg={myImage} loading="lazy" className='bs-link-list__image'/>
                        <div className='bs-link-list__image-title-wrap'>
                          <h4 className='bs-link-list__image-title'>new arrival <span className='bs-link-list__image-title--highlight'>jacquard</span> <span className='bs-link-list__image-title--highlight'>essentials</span></h4>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className='bs-menu__nav-item bs-menu__nav-item--sustainability'>
              <Link to="/sustainability" onClick={menuActiveHandleChange} className={`bs-menu__nav-link ${location.pathname.includes('sustainability') ? 'bs-menu__nav-link--active' : ''}`}>sustainability</Link>
            </li>
            {/* <li className='bs-menu__nav-item bs-menu__nav-item--quality-standards'>
              <Link to="/quality-standards" onClick={menuActiveHandleChange} className={`bs-menu__nav-link ${location.pathname.includes('quality-standards') ? 'bs-menu__nav-link--active' : ''}`}>quality standards</Link>
            </li> */}
            {/* <li className='bs-menu__nav-item bs-menu__nav-item--inspired-living'>
              <Link to="#" className={`bs-menu__nav-link ${location.pathname.includes('inspired-living') ? 'bs-menu__nav-link--active' : ''}`}>inspired living</Link>
            </li> */}

            <li className={`bs-menu__nav-item bs-menu__nav-item--inspired-living ${subMenuShow === 'media' ? 'bs-menu__nav-item--active' : ''}`} >
              {window.innerWidth <= 1024 ? (
                <p onClick={() => handleMenuClick("/contact-us")} className={`bs-menu__nav-link bs-menu__nav-link--mb ${location.pathname.includes('contact-us')  ? 'bs-menu__nav-link--active' : ''}`}>Contact Us <span className='icon icon-down bs-menu__icon-more'></span></p>
              ) : (
                // <Link to="/collections" onClick={menuActiveHandleChange} className={`bs-menu__nav-link ${location.pathname.includes('collections') || location.pathname.includes('collection-detail') || location.pathname.includes('sku-detail') ? 'bs-menu__nav-link--active' : ''}`}>collections</Link>
                <button onClick={() => {handleMenuClick("/contact-us"); menuActiveHandleChange()}} className={`bs-menu__nav-link ${location.pathname.includes('contact-us') ? 'bs-menu__nav-link--active' : ''}`}>Contact Us</button>
              )}
              
              {/* <div className='bs-sub-menu bs-menu__sub-menu'>
                <div className='bs-sub-menu__head'>
                  <button className='bs-sub-menu__back-button' onClick={subMenuHideHandleChange}>
                    <span className='icon icon-back bs-sub-menu__icon-back'></span>
                  </button>
                </div>
                <div className='bs-sub-menu__cont'>
                  <div className='bs-link-list'>
                    <h3 className='bs-link-list__title' onClick={() => handleMenuClick(`/inspired-living?type=film`)}>media</h3>
                    <ul className='bs-link-list__list-wrap'>
                      <li className='bs-link-list__list-item'>
                        <button className='bs-link-list__link' onClick={() => handleMenuClick(`/inspired-living?type=film`)}>advertising</button>
                      </li>
                      <li className='bs-link-list__list-item'>
                        <button className='bs-link-list__link' onClick={() => handleMenuClick(`/inspired-living?type=press`)}>press release</button>
                      </li>
                      <li className='bs-link-list__list-item'>
                        <button className='bs-link-list__link' onClick={() => handleMenuClick(`/inspired-living?type=electronic`)}>e-articles</button>
                      </li>
                      <li className='bs-link-list__list-item'>
                        <button className='bs-link-list__link' onClick={() => handleMenuClick(`/inspired-living?type=insta`)}>instagram spotlight</button>
                      </li>
                    </ul>
                  </div>
                  <div className='bs-link-list'>
                    <h3 className='bs-link-list__title cm-text-indent-999'>media</h3>
                    <ul className='bs-link-list__list-wrap'>
                      <li className='bs-link-list__list-item'>
                        <button className='bs-link-list__link' onClick={() => handleMenuClick(`/blogs`)}>blogs</button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div> */}
            </li>
            
            <li className='bs-menu__nav-item bs-menu__nav-item--where-to-buy'>
              <Link to="/where-to-buy" onClick={menuActiveHandleChange} className={`bs-menu__nav-link ${location.pathname.includes('where-to-buy') ? 'bs-menu__nav-link--active' : ''}`}>stores</Link>
            </li>
            {/* <li className='bs-menu__nav-item bs-menu__nav-item--contact-us'>
              <Link to="/contact-us" onClick={menuActiveHandleChange} className={`bs-menu__nav-link ${location.pathname.includes('contact-us') ? 'bs-menu__nav-link--active' : ''}`}>contact us</Link>
            </li> */}
            {/* <li className='bs-menu__nav-item bs-menu__nav-item--contact-us cm-visible-flex-xs'>
              <Link to="/login" onClick={menuActiveHandleChange} className={`bs-menu__nav-link ${location.pathname.includes('login') ? 'bs-menu__nav-link--active' : ''}`}>login</Link>
            </li> */}
          </ul>
        </nav>
      </div>
      <div className='bs-header__sub-menu-wrap'>
        <CartDrawer/>

        <Link to="/search" className='bs-btn bs-btn__btn-icon bs-header__action'>
          <span className='icon icon-search'></span>
        </Link>
        
        <SignInModal/>


        <button className={`bs-header__menu-action ${menuActive ? 'bs-header__menu-action--active' : ''}`} onClick={menuActiveHandleChange}>
          <span className='bs-header__menu-bar'></span>
          <span className='bs-header__menu-bar'></span>
          <span className='bs-header__menu-bar'></span>
        </button>
      </div>
    </header>
  )
}

export default Header
