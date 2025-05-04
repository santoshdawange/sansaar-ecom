import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Box, Tab } from '@mui/material';
import CartItem from '@pages/Cart/view/components/CartItem';
import Details from '../Details';
import { getAddresses } from '@common/utils/cart';
import Nodata from '@common/components/NoData';

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

function CartTabs({data, setCartData, tabValue, setTabValue, setShippingAddress, setBillingAddress, shippingAddress, billingAddress}) {
    // const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        // console.log('newValue', newValue, tabValue);
        if (newValue <= tabValue) {
            setTabValue(newValue);
        }
    };

    const [addressData, setAddressData] = useState(null);
    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const addresses = await getAddresses(); // Await the promise returned by getCart
            if (addresses) {
                setAddressData(addresses?.data);
            }
        } catch (error) {
            console.error('Error fetching address:', error);
        }
    };
    
    return (
        <div className='bs-tabs bs-tabs--typ-cart bs-tabs--typ-nav-start'>
            <div className='bs-tabs__nav-wrap'>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example" className='bs-tabs__nav'>
                    <Tab label={
                        <div className='bs-tabs__nav-text'>
                            Your cart <span className='bs-tabs__data-count'>{data.length}</span>
                        </div>
                    } {...a11yProps(0)} className='bs-tabs__nav-item' />
                    <Tab label={
                        <div className='bs-tabs__nav-text'>
                            details 
                        </div>
                    } {...a11yProps(1)} className='bs-tabs__nav-item' />
                    <Tab label={
                        <div className='bs-tabs__nav-text'>
                            payment
                        </div>
                    } {...a11yProps(2)} className='bs-tabs__nav-item' />
                </Tabs>
            </div>
            <div className='bs-tabs__cont'>
                <CustomTabPanel value={tabValue} index={0} className='bs-tabs__tab-panel'>
                    <div className='lyt-cart-list'>
                        {data.length > 0 ?
                            <ul className='lyt-cart-list__list-wrap'>
                                {data.map((item, index) => {
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
                                        />
                                    </li>
                                    );
                                })}
                            </ul>
                        : <Nodata visible={true}/>}
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={1} className='bs-tabs__tab-panel'>
                    <Details 
                        data={addressData} 
                        setShippingAddress={setShippingAddress}
                        setBillingAddress={setBillingAddress}
                        shippingAddress={shippingAddress}
                        billingAddress={billingAddress}
                        fetchAddresses={fetchAddresses}
                    />
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={3} className='bs-tabs__tab-panel'>
                    payment
                </CustomTabPanel>
            </div>
        </div>
    )
}

export default CartTabs