import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Box, Tab } from '@mui/material';
import CartItem from '@pages/Cart/view/components/CartItem';
import Nodata from '../NoData';

const cartItemData = [
    {
        id: 1,
        title: 'Melange luxe Pillow Covers',
        type: 'Bedsheet Set',
        size: 'Single w 75 x L 100 in Inches',
        price: 2200,
        discount: '-10',
        imageId: 'luxury-room'
    },
    {
        id: 2,
        title: 'Maison Royal Single comforter',
        type: 'Comforter',
        size: 'Single w 75 x L 100 in Inches',
        price: 4200,
        discount: '-10',
        imageId: 'shop-sec2-small'
    }
]

const wishlistItemData = [
    {
        id: 1,
        title: 'Melange luxe Pillow Covers',
        type: 'Bedsheet Set',
        size: 'Single w 75 x L 100 in Inches',
        price: 2200,
        discount: '-10',
        imageId: 'luxury-room'
    },
    {
        id: 2,
        title: 'Maison Royal Single comforter',
        type: 'Comforter',
        size: 'Single w 75 x L 100 in Inches',
        price: 4200,
        discount: '-10',
        imageId: 'shop-sec2-small'
    },
    {
        id: 3,
        title: 'Maison Royal Single comforter',
        type: 'Comforter',
        size: 'Single w 75 x L 100 in Inches',
        price: 4200,
        discount: '-10',
        imageId: 'shop-sec2-small'
    },
    {
        id: 4,
        title: 'Melange luxe Pillow Covers',
        type: 'Bedsheet Set',
        size: 'Single w 75 x L 100 in Inches',
        price: 2200,
        discount: '-10',
        imageId: 'luxury-room'
    },
    {
        id: 5,
        title: 'Maison Royal Single comforter',
        type: 'Comforter',
        size: 'Single w 75 x L 100 in Inches',
        price: 4200,
        discount: '-10',
        imageId: 'shop-sec2-small'
    },
    {
        id: 6,
        title: 'Maison Royal Single comforter',
        type: 'Comforter',
        size: 'Single w 75 x L 100 in Inches',
        price: 4200,
        discount: '-10',
        imageId: 'shop-sec2-small'
    }
]


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function CartDrawerTabs({ cartData, wishlistData, setCartData, setWishListData, setTabVariant }) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if(newValue === 1) {
            setTabVariant("wishlist");
        } else if(newValue === 0) {
            setTabVariant("cart");
        }
    };
    
    // console.log('cartData', cartData);
    // console.log('wishlistData', wishlistData);
    return (
        <div className='bs-tabs bs-tabs--typ-cart'>
            <div className='bs-tabs__nav-wrap'>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className='bs-tabs__nav'>
                    <Tab label={
                        <div className='bs-tabs__nav-text'>
                            Your cart <span className='bs-tabs__data-count'>{cartData?.length}</span>
                        </div>
                    } {...a11yProps(0)} className='bs-tabs__nav-item' />
                    <Tab label={
                        <div className='bs-tabs__nav-text'>
                            wishlist <span className='bs-tabs__data-count'>{wishlistData?.length}</span>
                        </div>
                    } {...a11yProps(1)} className='bs-tabs__nav-item' />
                </Tabs>
            </div>
            <div className='bs-tabs__cont'>
                <CustomTabPanel value={value} index={0} className='bs-tabs__tab-panel'>
                    <div className='lyt-cart-list'>
                        <ul className='lyt-cart-list__list-wrap'>
                            {cartData?.length > 0 ? (
                                cartData.map((item, index) => {
                                    return (
                                        <li className='lyt-cart-list__list-item' key={index}>
                                            <CartItem
                                                imageId={item?.product?.imageUrl} 
                                                title={item?.product?.name}
                                                type={item?.product?.sapCategoryName}
                                                size={item?.product?.size}
                                                price={item?.totalItemPrice}
                                                discount={item?.product?.discount}
                                                productId={item?.product?.id}
                                                productSlug={item?.product?.slug}
                                                productQty={item?.quantity}
                                                stock={item?.product?.stock}
                                                setCartData={setCartData}
                                                setWishListData={setWishListData}
                                            />
                                        </li>
                                    );
                                })
                            ) : <Nodata visible={true}/> }
                        </ul>
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1} className='bs-tabs__tab-panel'>
                    <div className='lyt-cart-list'>
                        <ul className='lyt-cart-list__list-wrap'>
                            {wishlistData.length > 0 ? (
                                wishlistData.map((item, index) => {
                                    return (
                                        <li className='lyt-cart-list__list-item' key={index}>
                                            <CartItem
                                                imageId={item?.imageUrl} 
                                                title={item?.name}
                                                type={item?.sapCategoryName}
                                                size={item?.size}
                                                price={item?.price}
                                                discount={item?.discount}
                                                productId={item?.id}
                                                productSlug={item?.slug}
                                                cartType="wishList"
                                                setWishListData={setWishListData}
                                                setCartData={setCartData}
                                                // productQty={item?.quantity}
                                                // stock={item?.product?.stock}
                                                // setCartData={setCartData}
                                            />
                                        </li>
                                    );
                                })
                            ) : <Nodata visible={true}/> }
                        </ul>
                    </div>
                </CustomTabPanel>
            </div>
        </div>
    )
}

export default CartDrawerTabs