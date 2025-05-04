import React from 'react'

function ProductFilterFeatureList({icon, title}) {
  return (
    <div className='mod-filter-feature'>
        <div className='mod-filter-feature__icon-wrap'>
            <span className={`mod-filter-feature__icon icon icon-${icon}`}></span>
        </div>
        <label className='mod-filter-feature__label'>{title}</label>
    </div>
  )
}

export default ProductFilterFeatureList