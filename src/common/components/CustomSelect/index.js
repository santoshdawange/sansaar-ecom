import React from 'react';
import {Select, MenuItem, InputLabel} from '@mui/material';

function CustomSelect({label, options, selectState, selectHandleChange, variant}) {
  return (
    variant === 'typ-2' ? 
    <>
    
      <div className='bs-select'>
          {label && <label className='bs-select__label' id="demo-simple-select-label">{label}</label>} 
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectState}
            onChange={selectHandleChange}
            className='bs-select__widget'
          >
              {options.map((item, index) => {
                  return  <MenuItem value={item.value} key={index} className='bs-select__item'>{item.label}</MenuItem>
              })}
          </Select>
      </div>
    </> 
    : 
    <>
      <div className='bs-select'>
          {label && <label className='bs-select__label'>{label}</label>} 
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectState}
            onChange={selectHandleChange}
            className='bs-select__widget'
          >
              {options.map((item, index) => {
                  return  <MenuItem value={item.value} key={index} className='bs-select__item'>{item.label}</MenuItem>
              })}
          </Select>
      </div>
    </>
    
  )
}

export default CustomSelect