import React from 'react';
import noDataImage from '@assets/images/icons/empty-cart.svg';
import { useNavigate } from 'react-router-dom';

function Nodata({visible}) {
  const navigate = useNavigate();

  return (
    <div className={`bs-message ${visible ? 'bs-message--visible' : ''}`}>
        <div className='bs-message__image-wrap'>
            <img src={noDataImage} alt="no data"/>
        </div>
        <diuv className='bs-message__action-wrap'>
            <button className='bs-btn bs-btn__btn-solid bs-btn__btn-solid--typ-large' onClick={() => navigate('/products')}>go to shopping</button>
        </diuv>
    </div>
  )
}

export default Nodata