import React from 'react'

function Tag({title, onCheckboxChange}) {
  return (
    <div className='mod-tag'>
        <span className='mod-tag__text'>{title}</span>
        <button className='icon icon-simple-close' onClick={() => onCheckboxChange(title)}></button>
    </div>
  )
}

export default Tag