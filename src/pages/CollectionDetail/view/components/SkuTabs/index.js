import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Box, Tab } from '@mui/material';
import SkuItem from '../SkuItem';


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

function SkuTabs({ data, name }) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getUniqueDesignTypes = () => {
        const seenDesignTypes = new Set();
        const uniqueDesigns = [];
        const SKUs = data || [];
        for (const image of SKUs) {
            if (!seenDesignTypes.has(image.qualityId)) {
                seenDesignTypes.add(image.qualityId);
                uniqueDesigns.push(image);
            }
        }
        return uniqueDesigns;
    };
    const uniqueDesigns = getUniqueDesignTypes();
    
    return (
        <div className='bs-tabs'>
            <div className='bs-tabs__nav-wrap'>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className='bs-tabs__nav'>
                    <Tab label="All Products" {...a11yProps(0)} className='bs-tabs__nav-item' />
                    <Tab label="All Designs" {...a11yProps(1)} className='bs-tabs__nav-item' />
                </Tabs>
            </div>
            <div className='bs-tabs__cont'>
                <CustomTabPanel value={value} index={0} className='bs-tabs__tab-panel'>
                    <div className='lyt-product'>
                        <ul className='lyt-product__list-wrap'>
                            {data.map((item, index) => {
                                return (
                                    <SkuItem
                                        key={item.skuImageUrl+"-"+index}
                                        imageId={item.skuImageUrl}
                                        link={`/sku-detail?id=${item?.materialCode}&collectionId=${item?.collectionId}`}
                                        title={name + ", Sr.No. " + item.serialNo}
                                    />
                                )
                            })}
                        </ul>
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1} className='bs-tabs__tab-panel'>
                    <div className='lyt-product'>
                        <ul className='lyt-product__list-wrap'>
                            {uniqueDesigns.map((item, index) => {
                                return (
                                    <SkuItem
                                        key={item.skuImageUrl+"-"+index}
                                        imageId={item.skuImageUrl}
                                        link={`/sku-detail?id=${item?.materialCode}&collectionId=${item?.collectionId}`}
                                        title={name + ", Sr.No. " + item.serialNo}
                                    />
                                )
                            })}
                        </ul>
                    </div>
                </CustomTabPanel>
            </div>
        </div>
    )
}

export default SkuTabs