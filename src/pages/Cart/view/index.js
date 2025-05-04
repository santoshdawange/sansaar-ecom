import React, { useEffect, useState } from 'react';
import CartTabs from './components/CartTabs';
import CustomInput from '@common/components/CustomInput';
import { inrFormat } from '@common/utils/formatCurrency';
import ProductTag from '@pages/ProductListing/view/components/ProductTag';
import { applyRemoveCoupon, cartCheckout, getAddresses, getCart } from '@common/utils/cart';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {Modal, Box, TextField} from '@mui/material';
import Nodata from '@common/components/NoData';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
};

function Cart() {
    const navigate = useNavigate();

    const handleBackdropClick = (event) => {
        // Prevent close when the backdrop is clicked
        event.stopPropagation();
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleModalClose = (event, reason) => {
        // This is where you can handle close when clicking the modal button, etc.
        if (reason === 'backdropClick') {
        // Do nothing to prevent closing on backdrop click
        return;
        }
        handleClose();
        navigate('/')
    };

    const [deliveryInputState, setDeliveryInputState] = useState(false);
    const [cartLoad, setCartLoad] = useState(false);
    const deliveryInputShowHandle = () => {
        if(deliveryInputState){
            setDeliveryInputState(false)
        }else{
            setDeliveryInputState(true)
        }
    }

    // get cart details
    const [cartData, setCartData] = useState(null);
    const [billingAddress, setBillingAddress] = useState(null);
    const [shippingAddress, setShippingAddress] = useState(null);

    useEffect(() => {
        fetchCart();
        // fetchAddresses();
    }, []);

    const fetchCart = async () => {
        try {
            const cart = await getCart(); // Await the promise returned by getCart
            if (cart) {
                setCartData(cart?.data);
                setCartLoad(true);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const handleApplyCoupon = async (param) => {
        try {
            const updatedCart = await applyRemoveCoupon(param); // Await the promise returned by getCart
            // console.log('cart', updatedCart);
            if (updatedCart) {
                setCartData(updatedCart?.data);
            }
        } catch (error) {
            console.error('Error update cart:', error);
        }
    }

    // console.log('cartData', cartData);

    const [tabValue, setTabValue] = useState(0);
    const placeOrder = () => {
        if(billingAddress === null || shippingAddress === null){
            toast.error('Please select billing and shipping address');
        }else{
            handleCartCheckout();
        }
    }

    const handleCartCheckout = async () => {
        try {
            const orderStatus = await cartCheckout(shippingAddress, billingAddress); // Await the promise returned by getCart
            if(orderStatus) {
                setOpen(true);
            }
        } catch (error) {
            console.error('Error while pacing order:', error);
        }
    }
  return (
    <>
    <div className='bs-section'>
        <div className='lyt-cart'>
            {cartData !== null ? (<>
                {cartData?.cartItem.length > 0 ? (<>
                    <div className='lyt-cart__tabs-wrap'>
                        <CartTabs 
                            data={cartData?.cartItem} 
                            setCartData={setCartData} 
                            tabValue={tabValue} 
                            setTabValue={setTabValue} 
                            setShippingAddress={setShippingAddress}
                            setBillingAddress={setBillingAddress}
                            billingAddress={billingAddress}
                            shippingAddress={shippingAddress}
                        />
                    </div>
                    <div className='lyt-cart__summary-wrap'>
                        <ul className='lyt-cart__summary-item-wrap'>
                            <li className='lyt-cart__summary-item'>
                                <div className='bs-card bs-card--typ-border bs-card--typ-flex'>
                                    <div className='bs-card__info-wrap'>
                                        <div className='bs-card__title-wrap'>
                                            <label className='bs-card__title'><span className='bs-card__title--bold'>delivering to</span> 440042</label>
                                            <button className='bs-btn bs-btn__btn-icon-link bs-btn__btn-icon-link--decoration-underline' onClick={deliveryInputShowHandle}><span className='bs-btn__btn-text'>change</span></button>
                                        </div>
                                    </div>
                                    <div className='bs-card__action-wrap'>
                                        {!deliveryInputState ? (
                                            <p className='bs-card__desc'>Estimated delivery 5-7 working days</p>
                                        ) : (
                                            <CustomInput
                                                helperText={`Estimated delivery 5-7 working day`}
                                                iconName='icon-delivery'
                                            />
                                        )}
                                    </div>
                                </div>
                            </li>
                            <li className='lyt-cart__summary-item'>
                                <div className='bs-card bs-card--typ-border'>
                                    <div className='bs-card__info-wrap'>
                                        <label className='bs-card__title'><span className='bs-card__title--semi-bold'>apply coupon</span></label>
                                    </div>
                                    <div className='bs-card__action-wrap'>
                                        <CustomInput
                                            helperText={`Congratulations, you have saved <span class="cm-text-bold">${inrFormat(cartData?.price?.discount)}</span>`}
                                            iconName='icon-tag'
                                            inputData={cartData?.price?.couponCode || ''}
                                            couponSaving={cartData?.price?.discount || ''}
                                            handleBtnClick={handleApplyCoupon}
                                            reference="coupon"
                                            readOnly={tabValue === 0 ? false : true}
                                        />
                                    </div>
                                </div>
                            </li>
                            <li className='lyt-cart__summary-item'>
                                <div className='bs-card bs-card--typ-bg bs-order-summary'>
                                    <div className='bs-card__info-wrap'>
                                        <div className='bs-order-summary__details-wrap'>
                                            <label className='bs-card__title bs-order-summary__title'><span className='bs-card__title--bold'>order summary</span></label>
                                            <ul className='bs-order-summary__list'>
                                                <li className='bs-order-summary__item'>
                                                    <label className='bs-order-summary__label'>order total</label>
                                                    <p className='bs-order-summary__value'>{inrFormat(cartData?.price?.price)}</p>
                                                </li>
                                                {/* <li className='bs-order-summary__item'>
                                                    <label className='bs-order-summary__label'><ProductTag title={calculateDiscountPercentage(Number(cartData?.price?.discount), Number(cartData?.price?.price))} classname="bs-cart-item__tag"/>Discount on MRP</label>
                                                    <p className='bs-order-summary__value'>-{inrFormat(600)}</p>
                                                </li> */}
                                                {Number(cartData?.price?.discount) > 0 && <li className='bs-order-summary__item'>
                                                    <label className='bs-order-summary__label'>Coupon Discount</label>
                                                    <p className='bs-order-summary__value'>-{inrFormat(cartData?.price?.discount)}</p>
                                                </li>}
                                                {/* <li className='bs-order-summary__item'>
                                                    <label className='bs-order-summary__label'>Estimated Taxes</label>
                                                    <p className='bs-order-summary__value'>{inrFormat(1600)}</p>
                                                </li>
                                                <li className='bs-order-summary__item'>
                                                    <label className='bs-order-summary__label'>Shipping charges</label>
                                                    <p className='bs-order-summary__value'>{inrFormat(1600)}</p>
                                                </li> */}
                                                <li className='bs-order-summary__item bs-order-summary__item--total'>
                                                    <label className='bs-order-summary__label bs-card__title bs-card__title--bold'>total amount</label>
                                                    <p className='bs-order-summary__value'>{inrFormat(cartData?.price?.finalPrice)}</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='bs-card__action-wrap'>
                                        <button
                                            className="bs-btn bs-btn__btn-solid bs-btn__btn-solid--typ-xxl"
                                            disabled={(tabValue === 0 && cartData?.cartItem.length === 0) || (tabValue === 1 && (!billingAddress || !shippingAddress))} // Disable if tabValue is 1 and addresses are null
                                            onClick={() => {
                                                tabValue === 0 ? setTabValue(1) : placeOrder();
                                            }}
                                        >
                                            {tabValue === 2 ? 'place order' : 'proceed'}
                                        </button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </>) : cartData?.cartItem.length === 0 ?
                    <Nodata visible={true} />
                : null}
            </>) : <> Loading... </>}
        </div>
    </div>
    <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='bs-modal bs-modal--typ-select-address'
        
    >
        <Box className='bs-modal__wrapper' sx={style} onClick={handleBackdropClick}>
            <div className="bs-success-msg">
                <div className='bs-success-msg__info-wrap'>
                    <span className='icon icon-success bs-success-msg__icon'></span>
                    <h4 className='bs-success-msg__title'>Order placed successfully</h4>
                    <p className='bs-success-msg__desc'>thank you for shopping at sansaar a D’Décor Brand</p>
                </div>
                <div className='bs-success-msg__action-wrap'>
                    <button className='bs-btn bs-btn__btn-solid bs-btn__btn-solid--typ-xxl' onClick={handleModalClose}>continue shopping</button>
                </div>
            </div>
        </Box>
    </Modal>
    </>
  )
}

export default Cart