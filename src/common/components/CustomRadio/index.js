import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { format } from '@cloudinary/url-gen/actions/delivery';
import React from 'react'

function CustomRadio({variant, groupName, title, colorValue, itemId, onChange, defaultValue}) {
  // console.log('title', title, 'defaultValue', defaultValue);
  const cld = new Cloudinary({
    secure: true,
    cloud: {
        cloudName: 'dci1aiukm'
    }
  });

  const imgSrc = cld.image(colorValue).quality('auto').delivery(format('webp'));
  return (
    <div className={`bs-radio ${variant === 'color' ? 'bs-radio--typ-color' : ''} ${variant === 'capsule' ? 'bs-radio--typ-capsule' : ''}`}>
        <input 
            type="radio" 
            id={itemId} 
            name={groupName} 
            value={title}
            className='bs-radio__input'
            onChange={onChange}
            defaultChecked={defaultValue === title} // Set default checked based on the defaultValue prop
        />
        <label 
            className='bs-radio__label' 
            htmlFor={itemId} 
            style={{background: variant === 'color' ? '' : 'transparent' }}
            // style={variant === 'color' ? { backgroundImage: `url(${colorValue})` } : { background: 'transparent' }}
        >
            {variant === 'color' ? <AdvancedImage cldImg={imgSrc} loading="lazy" /> : title}
        </label>
    </div>
  )
}

export default CustomRadio