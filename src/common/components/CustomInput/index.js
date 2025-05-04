import React, { useEffect } from 'react';
import {OutlinedInput,InputAdornment, IconButton} from '@mui/material';

function CustomInput({iconName, helperText, inputData, couponSaving, handleBtnClick, reference, readOnly=false}) {
  const [inputVal, setInputVal] = React.useState('');

  useEffect(() => {
    setInputVal(inputData);
  }, [inputData])
  // console.log('readOnly', readOnly);
  return (
    <div className='bs-custom-input'>
        <OutlinedInput
            id="outlined-adornment-password"
            type='text'
            className='bs-custom-input__field'
            value={inputVal}
            readOnly={readOnly}
            onChange={(e) => setInputVal(e.target.value)}
            startAdornment={
                <InputAdornment position="start">
                    <span className={`icon ${iconName}`}></span>
                </InputAdornment>
            }
            endAdornment={
              !readOnly && ( // Conditionally render endAdornment
                <InputAdornment position="end">
                  <IconButton
                    aria-label=""
                    edge="end"
                    onClick={() => {
                      if (Number(couponSaving) > 0) {
                        setInputVal('');
                        handleBtnClick(null, reference);
                      } else {
                        handleBtnClick(inputVal, reference);
                      }
                    }}
                  >
                    <span
                      className={`icon ${
                        Number(couponSaving) > 0 ? 'icon-close' : 'icon-fill-right'
                      }`}
                    ></span>
                  </IconButton>
                </InputAdornment>
              )
            }
            label="Password"
        />
        {Number(couponSaving) > 0 && <p className='bs-custom-input__helpertext' dangerouslySetInnerHTML={{__html: helperText}}></p>}
    </div>
  )
}

export default CustomInput