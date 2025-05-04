import React, { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';

// const marks = [
//     {
//       value: 0,
//       label: 'Rs. 0',
//     },
//     {
//       value: 100,
//       label: 'Rs. 4999',
//     }
// ];

function valuetext(value) {
    return `Rs. ${value}`;
}

function PriceRange({minMaxResult, handlePriceChange, priceVal}) {
    const [price, setPrice] = useState([0, 999]);

    useEffect(() => {
        setPrice([0, minMaxResult?.maxPrice]);
    }, [minMaxResult])

    useEffect(() => {
        setPrice(priceVal);
    }, [priceVal])

    const handleChange = (event, newValue) => {
        handlePriceChange(newValue);
    };

    return (
        <div className='mod-range'>
            <Slider
                getAriaLabel={() => 'Price range'}
                value={price}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={0}
                max={minMaxResult?.maxPrice}
                step={1}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <span>{`${0}`}</span>
                <span>{`${minMaxResult?.maxPrice}`}</span>
            </div>
        </div>
    )
}

export default PriceRange