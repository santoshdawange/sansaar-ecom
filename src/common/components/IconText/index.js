import React from 'react'

function IconText({icon, title, classname}) {
  return (
    <div className={`mod-icon-text ${classname}`}>
        <span className={`mod-icon-text__icon icon icon-${icon}`}></span>
        <label className='mod-icon-text__label' dangerouslySetInnerHTML={{__html: title}}></label>
    </div>
  )
}

export default IconText