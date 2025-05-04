import React from 'react'

function ProgressTracker() {
  return (
    <div className='bs-progress'>
        <div className='bs-progress__track-wrap'>
            <ul className='bs-progress__track-wrap'>
                <li className='bs-progress__track-item bs-progress__track-item--completed'></li>
                <li className='bs-progress__track-item bs-progress__track-item--completed'></li>
                <li className='bs-progress__track-item'></li>
            </ul>
        </div>
        <div className='bs-progress__action-wrap'>
            <button className='bs-btn bs-btn__btn-icon-link bs-btn__btn-icon-link--decoration-underline bs-address-card__button'>
                <span className='bs-btn__btn-text'>track order</span>
            </button>
        </div>
    </div>
  )
}

export default ProgressTracker