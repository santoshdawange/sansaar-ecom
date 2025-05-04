import ProductTag from '@pages/ProductListing/view/components/ProductTag';
import React, {useEffect, useState} from 'react';
import CustomInput from '@common/components/CustomInput';
import {Accordion, AccordionSummary, AccordionDetails, Modal, Box} from '@mui/material';
import { inrFormat } from '@common/utils/formatCurrency';
import CustomRadio from '@common/components/CustomRadio';
import CustomCounterWidget from '@common/components/CustomCounterWidget';
import Share from '../../../../../common/components/Share';
import { addUpdateCart, applyRemoveCoupon } from '@common/utils/cart';
import { useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

function DetailInfo({ data, productCartQty, setCartData, sizes, shades, setSelectedSize, setSelectedShade, selectedSize, selectedShade, couponList, cartData }) {
    // console.log('productCartQty', productCartQty, cartData);
    const navigate = useNavigate();
    const [wishlistActive, setWishlistActive] = useState(false);

    const wishListActiveHandleChange = () => {
        setWishlistActive(!wishlistActive);
    }

    //color handle and State
    const [colorState, setColorState] = useState(null);
    const colorHandleChange = (title) => {
        setColorState(title);
    }

    // share option modal state
    const [shareOptionModal, setShareOptionModal] = useState(false);
    const handleOpenShareOptionModal = () => {
        setShareOptionModal(true)
    }
    const handleCloseShareOptionModal = () => {
        setShareOptionModal(false)
    }

    // size handle and State
    const [sizeState, setSizeState] = useState(null);
    const sizeHandleChange = (size) => {
        setSizeState(size);
    }

    // features data
    const [featuresData, setFeaturesData] = useState([]);
    useEffect(() => {
        setFeaturesData(data?.features.split(','));
    }, [data.features]);

    // cart qty state
    const [qty, setQty] = useState(1);
    useEffect(() => {
        setQty(productCartQty ? productCartQty : 1)
    }, [productCartQty])

    // select coupon on pdp
    const [selectedCoupon, setSelectedCoupon] = useState(cartData?.price?.couponCode || ''); // Track the selected coupon

    const handleCouponSelection = (code) => {
        // console.log('Radio button clicked:', code); // Debug log
        if (selectedCoupon === code) {
            setSelectedCoupon(null); // Uncheck the selected coupon
            updateCart(null);
            // console.log('Coupon unselected');
        } else {
            setSelectedCoupon(code); // Update the selected coupon
            updateCart(code);
            // console.log('Coupon selected:', code);
        }
    };

    const updateCart = async (param) => {
        try {
            const updatedCart = await applyRemoveCoupon(param); // Await the promise returned by getCart
            // console.log('cart', updatedCart);
            if (updatedCart) {
                setCartData(updatedCart?.data);
            }
        } catch (error) {
            console.error('Error update cart:', error);
        }
    };

    function itext(inputStr) {

        return inputStr
            .toLowerCase()                       // Convert to lowercase
            .replace(/[^a-z0-9\s]/g, '')         // Remove special characters (keep letters, numbers, spaces)
            .trim()                              // Remove leading/trailing spaces
            .replace(/\s+/g, '-');               // Replace one or more spaces with a hyphen
    }

  return (
    <>
        <div className='bs-detail-info'>
            <ul className='bs-detail-info__section-wrap'>
                <li className='bs-detail-info__section-item'>
                    <label className='bs-detail-info__label'>{data?.sapCategoryName}</label>
                    <div className='bs-detail-info__title-wrap'>
                        <h1 className='bs-detail-info__title'>{data?.name}</h1>
                        {/* <button className='bs-detail-info__btn-like' onClick={wishListActiveHandleChange}>
                            <span className={`icon  ${wishlistActive ? 'icon-like-fill' : 'icon-like'} bs-detail-info__icon-like`}></span>
                        </button> */}
                    </div>
                    <ul className='bs-detail-info__feature-list'>
                        <li className='bs-detail-info__feature-item'>
                            <label className='bs-detail-info__feature-label'>{data?.fabType}</label>
                        </li>
                        <li className='bs-detail-info__feature-item'>
                            <label className='bs-detail-info__feature-label'>{data?.sapCollectionName}</label>
                        </li>
                    </ul>
                    <div className='bs-detail-info__price-info-wrap'>
                        <div className='bs-product-tile__price-wrap bs-detail-info__price-wrap'>
                            <strong className='bs-product-tile__price bs-detail-info__price'>{inrFormat(data?.discount ? Number(data?.price) - Number(data?.discount) : Number(data?.price))}</strong>
                            {data?.discount && <strong className='bs-product-tile__price bs-product-tile__price--strike bs-detail-info__price bs-detail-info__price--strike'>{inrFormat(Number(data?.price))}</strong>}
                        </div>
                        {data?.discount && <ProductTag
                            title={'20%Off'}
                            classname="bs-detail-info__tag"
                        />}
                        <p className='bs-detail-info__text'>Inc. All Taxes</p>
                    </div>
                    <div className='bs-checkbox-wrap'>
                        {couponList.length > 0 && 
                            couponList.map((coupon, index) => (<>
                                <div className="bs-checkbox bs-detail-info__accept-coupon" key={index}>
                                    <input
                                        type="radio"
                                        id={`coupon_${index}`}
                                        name="coupon"
                                        checked={selectedCoupon === coupon.couponCode}
                                        // onChange={() => handleCouponSelection(coupon?.couponCode)} // Handles selection when value changes
                                        onClick={() => handleCouponSelection(coupon?.couponCode)} // Handles click even if already selected
                                    />
                                    <label
                                        className="bs-checkbox__label bs-detail-info__accept-coupon-label"
                                        htmlFor={`coupon_${index}`}
                                    >
                                        {`Apply coupon '${coupon?.couponCode}' & Get it For ${inrFormat(
                                            Number(data?.price) - Number(coupon?.discount)
                                        )}`}
                                    </label>
                                </div>
                            </>))
                        }
                    </div>
                </li>
                <li className='bs-detail-info__section-item'>
                    <div className='bs-detail-info__section-title-wrap'>
                        <p className='bs-detail-info__info-text'>
                            <span className='bs-detail-info__info-text-label'>size</span>
                            <span className='bs-detail-info__info-text-txt'>{selectedSize} : {data?.dimensions}</span>
                        </p>
                        <button className='bs-btn bs-btn__btn-icon-text bs-detail-info__size-chart-action'>
                            <span className='icon icon-ruler bs-btn__btn-icon-text bs-btn__btn-icon'></span>
                            <span className='btn-btn__btn-icon-text bs-btn__btn-text'>all sizes</span>
                        </button>
                    </div>
                    <div className='bs-detail-info__section-action-wrap'>
                        <ul className='lyt-radio-list'>
                            {sizes.map((item, index) => {
                                return (
                                    <li className='lyt-radio-list__item' key={index}>
                                        <CustomRadio
                                            title={item}
                                            groupName='size'
                                            itemId={`${item}__${index}`}
                                            onChange={() => setSelectedSize(item)}
                                            defaultValue={selectedSize}                                    
                                        />
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </li>
                <li className='bs-detail-info__section-item'>
                    <div className='bs-detail-info__section-title-wrap'>
                        <p className='bs-detail-info__info-text'>
                            <span className='bs-detail-info__info-text-label'>color</span>
                            <span className='bs-detail-info__info-text-txt bs-detail-info__info-text-txt--typ-upppercase'>{selectedShade}</span>
                        </p>
                    </div>
                    <div className='bs-detail-info__section-action-wrap'>
                        <ul className='lyt-radio-list'>
                            {shades.map((item, index) => {
                                return (
                                    <li className='lyt-radio-list__item' key={index}>
                                        <CustomRadio
                                            title={item.shade}
                                            groupName='colors'
                                            variant='color'
                                            colorValue={item.imageUrl}
                                            itemId={`${item.title}__${index}`}
                                            onChange={() => setSelectedShade(item.shade)}
                                            // onChange={() => navigate(`/product-description/${item.slug}`)}
                                            defaultValue={selectedShade}
                                        />
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </li>
                <li className='bs-detail-info__section-item'>
                    {data?.stock <= '0' ? <>
                        <div className='bs-detail-info__section-title-wrap'>
                            <p className='bs-detail-info__info-text'>
                                Out of stock
                            </p>
                        </div>
                    </> : <>
                        <div className='bs-detail-info__section-title-wrap'>
                            <p className='bs-detail-info__info-text'>
                                <span className='bs-detail-info__info-text-label'>Quantity</span>
                            </p>
                            <CustomCounterWidget count={qty} setCount={setQty} stock={data?.stock} flowRef="pdp" />
                        </div>
                        <div className='bs-detail-info__section-action-wrap bs-detail-info__cta-wrap'>
                            <button className='bs-btn bs-btn__btn-solid bs-btn__btn-solid--typ-xxl bs-btn__btn-solid--inverse-border' onClick={() => {addUpdateCart(data?.id, qty, productCartQty === 0 ? "add" : "update", setCartData)}}>add to cart</button>
                            <button className='bs-btn bs-btn__btn-solid bs-btn__btn-solid--typ-xxl' onClick={() => {productCartQty === null ? addUpdateCart(data?.id, 1, "add", setCartData, true) : navigate('/cart')}}>buy now</button>
                            <button className='bs-btn bs-btn__btn-icon-solid bs-btn__btn-icon-solid--typ-xxl'>
                                <span className='bs-btn__icon icon icon-share'></span>
                                <span className='bs-btn__btn-text' onClick={handleOpenShareOptionModal} >share</span>
                            </button>
                        </div>
                    </>}
                </li>
                <li className='bs-detail-info__section-item'>
                    <div className='bs-detail-info__section-title-wrap'>
                        <p className='bs-detail-info__info-text'>
                            <span className='bs-detail-info__info-text-label bs-detail-info__info-text-label--light'>check delivery</span>
                            {/* <span className='bs-detail-info__info-text-txt bs-detail-info__info-text-txt--sm'><span className='icon icon-check-circle bs-detail-info__ckeck-icon'></span>COD Available</span> */}
                        </p>
                    </div>
                    <div className='bs-detail-info__section-action-wrap'>
                        <CustomInput
                            helperText='5 - 7 business working days'
                            iconName='icon-delivery'
                        />
                    </div>
                </li>
                <li className='bs-detail-info__section-item'>
                    <Accordion defaultExpanded>
                        <AccordionSummary
                            expandIcon={<span className='icon icon-down'></span>}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            className='bs-detail-info__section-title-wrap'
                        >
                            <p className='bs-detail-info__info-text-label bs-detail-info__info-text-label--light'>product features</p>
                        </AccordionSummary>
                        <AccordionDetails className='bs-detail-info__section-action-wrap'>
                            {/* <p className='bs-detail-info__info-text-txt bs-detail-info__info-text-txt--sm'>Sansaar’s vision is to redefine the art of home living by blending timeless design with unparalleled comfort, quality, and sustainability.</p> */}
                            <div className='bs-infography-footprint'>
                                <ul className='bs-infography-footprint__feature-list'>
                                    {featuresData.length > 0 && featuresData.map((item, index) => {

                                        return (
                                            <li className='bs-infography-footprint__feature-item' key={index}>
                                                <span className='bs-infography-footprint__icon-wrap'>
                                                    <span className={`icon icon-${itext(item)}`}></span>
                                                </span>
                                                <p className='bs-infography-footprint__feature'>{item}</p>
                                            </li>
                                        )
                                    }
                                    )}
                                </ul>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </li>
                <li className='bs-detail-info__section-item'>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<span className='icon icon-down'></span>}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            className='bs-detail-info__section-title-wrap'
                        >
                            <p className='bs-detail-info__info-text-label bs-detail-info__info-text-label--light'>wash care</p>
                        </AccordionSummary>
                        <AccordionDetails className='bs-detail-info__section-action-wrap'>
                            <ul className='bs-detail-info__icon-list'>
                                {data?.bleachWash !== '0' && data?.bleachWash !== null ?
                                    <li className='bs-detail-info__icon-list-item'>
                                        <span className={`bs-detail-info__icon-list-icon icon icon-no-bleach`}></span>
                                    </li>
                                : null}
                                {data?.dryCleanWash !== '0' && data?.dryCleanWash !== null ?
                                    <li className='bs-detail-info__icon-list-item'>
                                        <span className={`bs-detail-info__icon-list-icon icon icon-dry-clean`}></span>
                                    </li>
                                : null}
                                {data?.iron !== '0' && data?.iron !== null ?
                                    <li className='bs-detail-info__icon-list-item'>
                                        <span className={`bs-detail-info__icon-list-icon icon icon-iron`}></span>
                                    </li>
                                : null}
                                {data?.machineWash !== '0' && data?.machineWash !== null ?
                                    <li className='bs-detail-info__icon-list-item'>
                                        <span className={`bs-detail-info__icon-list-icon icon icon-wash-30`}></span>
                                    </li>
                                : null}
                                {data?.tumbleDryWash !== '0' && data?.tumbleDryWash !== null ?
                                    <li className='bs-detail-info__icon-list-item'>
                                        <span className={`bs-detail-info__icon-list-icon icon icon-tumble-dry`}></span>
                                    </li>
                                : null}
                                {data?.washCycle !== '0' && data?.washCycle !== null ?
                                    <li className='bs-detail-info__icon-list-item'>
                                        <span className={`bs-detail-info__icon-list-icon icon icon-wash-30`}></span>
                                    </li>
                                : null}
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                </li>
                <li className='bs-detail-info__section-item'>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<span className='icon icon-down'></span>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        className='bs-detail-info__section-title-wrap'
                        >
                            <p className='bs-detail-info__info-text-label bs-detail-info__info-text-label--light'>description</p>
                        </AccordionSummary>
                        <AccordionDetails className='bs-detail-info__section-action-wrap'>
                            {/* <p className='bs-detail-info__info-text__subtitle'>80% Cotton, 20% Polyster</p> */}
                            <p className='bs-detail-info__info-text__desc'>{data?.description}</p>
                        </AccordionDetails>
                    </Accordion>
                </li>
                <li className='bs-detail-info__section-item'>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<span className='icon icon-down'></span>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        className='bs-detail-info__section-title-wrap'
                        >
                            <p className='bs-detail-info__info-text-label bs-detail-info__info-text-label--light'>return & exchange</p>
                        </AccordionSummary>
                        <AccordionDetails className='bs-detail-info__section-action-wrap'>
                            {/* <p className='bs-detail-info__info-text__subtitle'>80% Cotton, 20% Polyster</p> */}
                            <p className='bs-detail-info__info-text__desc'>Returns and Replacements available for damaged products or manufacturing defects within 7 days of delivery. Write to us on support@sansaar.co.in or call our customer care at Ph: +91 8655712561for any Return or Refund requests.</p>
                        </AccordionDetails>
                    </Accordion>
                </li>
                
            </ul>     
        </div>
        <Modal
            open={shareOptionModal}
            onClose={handleCloseShareOptionModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='bs-modal bs-modal--typ-sm'
        >
            <Box className='bs-modal__wrapper' sx={style}>
                <div className='bs-modal__content'>
                    <button className='bs-modal__close' onClick={handleCloseShareOptionModal}>
                        <span className='icon icon-simple-close'></span>
                    </button>
                    <Share imageId={data?.imageUrl} name={data?.name} />
                </div>
            </Box>
        </Modal>
    </>
  )
}

export default DetailInfo