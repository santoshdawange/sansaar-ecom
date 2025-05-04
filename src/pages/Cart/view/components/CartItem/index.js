import React, {useEffect, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary} from "@cloudinary/url-gen";
import { format } from '@cloudinary/url-gen/actions/delivery';
import ProductTag from '@pages/ProductListing/view/components/ProductTag';
import { inrFormat } from '@common/utils/formatCurrency';
import CustomCounterWidget from '@common/components/CustomCounterWidget';
import { addUpdateCart, addWishlist, removeWishlist } from '@common/utils/cart';


const cld = new Cloudinary({
    secure: true,
    cloud: {
        cloudName: 'dci1aiukm'
    }
});



function CartItem({imageId, title, type, size, price, discount, productId, productSlug, productQty = 0, stock = 0, setCartData, setWishListData, cartType="cart"}) {

    const [wishlistActive, setWishlistActive] = useState(false)

    const wishListActiveHandleChange = async (e, productId, cartTypeParam) => {
        e.preventDefault();
    
        if (cartTypeParam === 'wishList') {
            await removeWishlist(productId, setWishListData); // Perform the remove action
            updateCart(productId, 1);
        } else {
            await addWishlist(productId, setWishListData); // Perform the add action
            updateCart(productId, 0);
        }
    };


    const imgSrc = cld.image(imageId).quality('auto').delivery(format('webp'));

    // cart qty state
    const [qty, setQty] = useState(productQty);
    
    useEffect(() => {
        setQty(productQty);
    }, [productQty]);

    useEffect(() => {
        if(productQty !== qty){
            updateCart(
                productId,
                qty,
            )
        }   
    }, [qty]);

    const updateCart = async (id, quantity) => {
        try {
            const cart = await addUpdateCart(id, quantity, 'update', setCartData); // Await the promise returned by getCart
            // console.log('cart', cart);
            if (cart) {
                setCartData(cart?.data);
            }
        } catch (error) {
            console.error('Error update cart:', error);
        }
    };

  return (
    <div className='bs-cart-item'>
        <div className='bs-cart-item__info-wrap'>
            <div className='bs-cart-item__media-wrap'>
                <AdvancedImage cldImg={imgSrc} loading="lazy" />
            </div>
            <div className='bs-cart-item__title-wrap'>
                <label className='bs-cart-item__type'>{type}</label>
                <h3 className='bs-cart-item__title'>{title}</h3>
                <p className='bs-cart-item__size'><span className='bs-cart-item__size--txt-semi-bold'>size :</span> {size}</p>
                <button className='bs-cart-item__like bs-cart-item__btn' onClick={(e) => {wishListActiveHandleChange(e, productId, cartType)}}>
                    {/* <span className={`icon  ${wishlistActive ? 'icon-like-fill' : 'icon-like'} bs-cart-item__icon-like bs-cart-item__btn-icon`}></span> */}
                    <span className='bs-cart-item__btn-text'>{cartType === "cart" ? "move to wishlist" : "move to cart"}</span>
                </button>
            </div>
        </div>
        <div className='bs-cart-item__more-info-wrap'>
            <div className='bs-cart-item__price-wrap'>
                <div className='bs-cart-item__price-n-discount'>
                    <strong className='bs-product-tile__price bs-cart-item__price'>{inrFormat(price)}</strong>
                    {discount && 
                        <ProductTag
                            title={`${discount}%`}
                            classname="bs-cart-item__tag"
                        />
                    }
                </div>
                <p className='bs-cart-item__text'>Including Taxes</p>
            </div>
            {cartType === "cart" && <CustomCounterWidget count={qty} setCount={setQty} stock={stock}/>}
        </div>
        {cartType === "cart" && <div className='bs-cart-item__action-wrap'>
            <IconButton aria-label="delete" size="large" className='bs-cart-item__action-delete' onClick={() => {updateCart(productId, 0)}}>
                <span className='icon icon-trash bs-cart-item__action-icon'></span>
            </IconButton>
        </div>}
    </div>
  )
}

export default CartItem