import React from 'react'

function ProductTag({title, classname}) { 
  return (
    <label 
        className={`mod-product-tag ${classname} 
        ${title.toLowerCase() === 'new' ? 'mod-product-tag--new' : title.toLowerCase() === 'sale' ? 'mod-product-tag--sale' : ''}
        `}>
            {title}
    </label>
  )
}

export default ProductTag
