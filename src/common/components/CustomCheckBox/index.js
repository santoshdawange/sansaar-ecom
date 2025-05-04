import React from 'react'

function CustomCheckBox({onCheckboxChange, itemName, itemId}) {
  return (
    <div className='mod-checkbox'>
        <input 
            type="checkbox" 
            name={itemName}
            id={itemId}
            className='mod-checkbox__input'
            onChange={() => onCheckboxChange(itemId)}
        />
        <label className='mod-checkbox__label' htmlFor={itemId}>
            {/* <span className='mod-checkbox__icon icon icon-uncheck'></span> */}
        </label>
    </div>
  )
}

export default CustomCheckBox