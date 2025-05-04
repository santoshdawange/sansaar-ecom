import React, { useEffect, useState } from 'react';
import { Drawer } from '@mui/material';
import { inrFormat } from '@common/utils/formatCurrency';
import CartDrawerTabs from '../CartDrawerTabs';
import { getCart, getWishlist } from '@common/utils/cart';
import { useNavigate } from 'react-router-dom';
import Nodata from '../NoData';

function CartDrawer() {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    right: false,
  });
  const [tabVariant, setTabVariant] = useState("cart");

  const toggleDrawer = (anchor, open) => (event) => {
    // Preventing drawer toggle with Tab or Shift key press
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // Function far cart
  // get cart details
  const [cartData, setCartData] = useState({
    cartItem: []
  });
  const [wishListData, setWishListData] = useState({
    wishList: []
  });
  useEffect(() => {
    if(state.right) {
      fetchCart();
      fetchWishlist()
    }
  }, [state.right]);

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

  // Function for wishlist
  const fetchWishlist = async () => {
    try {
      const wishlist = await getWishlist(); // Await the promise returned by getwishlist
      if (wishlist) {
        // console.log('wishlist', wishlist);
        setWishListData(wishlist?.data);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const handleProceed = () => {
    // Handle the proceed action here
    // For example, navigate to the checkout page
    setState({ ...state, right: false });
    navigate('/cart')
  }

  // console.log('wishListData?.wishlist', wishListData?.wishList);
  return (
    <>
      <button
        className="bs-btn bs-btn__btn-icon bs-header__action"
        onClick={toggleDrawer('right', true)}
      >
        <span className="icon icon-cart"></span>
      </button>

      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer('right', false)}
        className='bs-drawer bs-drawer--typ-cart'
      >
        <div className='bs-drawer__cont-wrap'>
            <CartDrawerTabs 
              cartData={cartData?.cartItem}
              wishlistData={wishListData?.wishList}
              setCartData={setCartData}
              setWishListData={setWishListData}
              setTabVariant={setTabVariant}
            />
        </div>
        {(cartData?.cartItem.length > 0 && tabVariant === "cart") &&
          <div className='bs-drawer__foot-wrap'>
              <div className='bs-drawer__amount-wrap'>
                  <strong className='bs-drawer__amount-wrap-title'>total amount</strong>
                  <p className='bs-product-tile__price bs-drawer__amount'>{inrFormat(cartData?.price?.finalPrice)}</p>
                  <label className='bs-drawer__amount-info-text'>Shipping and taxes calculated at checkout.</label>
              </div>
              <div className='bs-drawer__action-wrap'>
                  <button className='bs-btn bs-btn__btn-solid bs-btn__btn-solid--typ-xxl' onClick={handleProceed}>Proceed</button>
              </div>
          </div>
        }
        {/* <Nodata visible={true}/> */}
      </Drawer>
    </>
  );
}

export default CartDrawer;