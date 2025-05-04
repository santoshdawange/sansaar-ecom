import React from 'react'

function NoResults({searchValue}) {
  return (
    <div className='bs-no-results'>
        <div className='bs-no-results__icon-wrap'>
            <span className='bs-no-results__icon icon icon-sad'></span>
        </div>
        <div className='bs-no-results__text-wrap'>
            <p className='bs-no-results__text'>Sorry, we couldn't find any results for "<span className='bs-no-results__text--bold'>{searchValue}</span>"</p>
        </div>
    </div>
  )
}

export default NoResults