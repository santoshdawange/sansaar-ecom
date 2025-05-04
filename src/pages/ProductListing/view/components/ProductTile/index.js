import React, {useEffect, useState} from 'react';
import ProductTag from '../ProductTag';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import { format } from '@cloudinary/url-gen/actions/delivery';
import { addUpdateCart, addWishlist, checkProductInCart, checkProductInWishlist, removeWishlist } from '@common/utils/cart';
import { Link } from 'react-router-dom';
import CustomCounterWidget from '@common/components/CustomCounterWidget';

function ProductTile({imageUrl, tagTitle, handleAction, productTitle, priceValue, strikePriceValue, colorVariants, productId = "", productSlug = "", showAddToCart=true, productQty= 0, stock = 0, setCartData, variant}) { 
    const extraColorsCount = colorVariants?.length - 2;
    const [wishlistActive, setWishlistActive] = useState(false);
    
    useEffect(() => {
        setWishlistActive(checkProductInWishlist(productId));
    }, [productId]);

    const wishListActiveHandleChange = async (e, productId, type) => {
        e.preventDefault();
    
        if (type === 'remove') {
            await removeWishlist(productId); // Perform the remove action
            setWishlistActive(false); // Update the state to reflect the removal
        } else {
            await addWishlist(productId); // Perform the add action
            setWishlistActive(true); // Update the state to reflect the addition
        }
    };
    
    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dci1aiukm'
        }
    });

    const myImage = cld.image(imageUrl).quality('auto').delivery(format('webp'));
    
    const formatINR = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };
    
    // cart qty state
    const [qty, setQty] = useState(productQty);

    useEffect(() => {
        setQty(productQty);
    }, [productQty]);

    useEffect(() => {
        if(productQty !== qty){
            // updateCart(
            //     productId,
            //     qty,
            // )
            // console.log('update qty', qty);
            addUpdateCart(productId, qty, 'update', setCartData);
        }   
    }, [qty]);
    
    // const updateCart = async (id, quantity) => {
        //     try {
            //         const cart = await addUpdateCart(id, quantity, 'update', setCartData); // Await the promise returned by getCart
            //         console.log('cart', cart);
            //         if (cart) {
                //             // setCartData(cart?.data);
    //         }
    //     } catch (error) {
    //         console.error('Error update cart:', error);
    //     }
    // };
    
    // console.log('productQty', productQty, qty);
  return (
    <Link className='bs-product-tile' to={`/product-description/${productSlug}`}>
        <div className='bs-product-tile__head-wrap'>
            {tagTitle &&
                <ProductTag
                    title={tagTitle}
                    classname="bs-product-tile__tag"
                />
            }
            <button 
                className='bs-product-tile__btn-like' 
                onClick={(e) => {
                    wishListActiveHandleChange(
                        e,
                        productId,
                        wishlistActive ? 'remove' : 'add'
                    );
                }}
            >
                <span className={`icon  ${wishlistActive ? 'icon-like-fill' : 'icon-like'} bs-product-tile__icon-like`}></span>
            </button>
            {(!checkProductInCart(productId) && showAddToCart) ? 
                <button className='bs-btn bs-btn__btn-solid bs-btn__btn-solid--inverse bs-product-tile__action' onClick={(e) => {e.preventDefault(); addUpdateCart(productId, 1, 'add', setCartData)}}>Add to cart</button>
            : (checkProductInCart(productId) && showAddToCart) ? (<>
                <div className='bs-btn bs-btn__btn-solid bs-btn__btn-solid--inverse bs-product-tile__action'>
                    <CustomCounterWidget 
                        count={qty} 
                        setCount={setQty} 
                        stock={stock}
                    />
                </div>
            </>) : null}
            <div className='bs-product-tile__media-wrap'>
                <AdvancedImage cldImg={myImage} loading="lazy" className='bs-product-tile__image'/>
            </div>
        </div>
        <div className='bs-product-tile__info-wrap'>
            <h3 className='bs-product-tile__title'>{productTitle}</h3>
            <div className='bs-product-tile__more-info-wrap'>
                <div className='bs-product-tile__price-wrap'>
                    <strong className='bs-product-tile__price'>{priceValue ? formatINR(priceValue) : formatINR(strikePriceValue)}</strong>
                    {priceValue && <strong className='bs-product-tile__price bs-product-tile__price--strike'>{strikePriceValue ? formatINR(strikePriceValue) : '₹0'}</strong>}
                </div>
                {colorVariants && <div className='bs-product-tile__color-list-wrap'>
                    {colorVariants.slice(0, 2).map((item, index) => (
                        // <span
                        //     className="bs-product-tile__color-item bs-product-tile__color-item--block"
                        //     style={{ backgroundColor: item.colorCode }}
                        //     key={item.id}
                        // ></span>
                        <img 
                            className="bs-product-tile__color-item bs-product-tile__color-item--block"
                            src={item}
                            alt={index}
                            key={index}
                        />
                    ))}
                    {extraColorsCount > 0 && (
                        <span className="bs-product-tile__color-item">+{extraColorsCount}</span>
                    )}
                </div>}
            </div>
        </div>
    </Link>
  )
}

export default ProductTile