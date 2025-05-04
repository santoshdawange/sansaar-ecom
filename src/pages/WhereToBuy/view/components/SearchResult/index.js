import React from 'react';

function SearchResult({ data, allData, onPlaceSelect }) {
    // const eboStores = (data.filter(store => store.storeType === 'EBO')).sort((a, b) => a.rank - b.rank);
    // const mboStores = (data.filter(store => store.storeType === 'MBO')).sort((a, b) => a.rank - b.rank);
    const eboStores = (data.filter(store => store.storeType === 'EBO')).sort((a, b) => a.distance - b.distance);
    const mboStores = (data.filter(store => store.storeType === 'MBO')).sort((a, b) => a.distance - b.distance);

  return (
    <div className='bs-search-results'>
        <div className='bs-search-results__title-wrap'>
            <label className='bs-search-results__title'>Search results</label>
            {data.length < allData.length ? <button className='bs-search-results__icon-link' onClick={() => onPlaceSelect('')}><span className='icon icon-reset bs-search-results__icon'></span><span className='bs-search-results__title'>Reset</span></button> : null}
        </div>
        <ul className='bs-search-results__list-wrap'>
            {eboStores.map((item, index) => {
                return (
                    <li className='bs-search-results__list-item' key={index}>
                        <div className='bs-search-results__item'>
                            {index === 0 ? (<h3 className='bs-search-results__item-title'>{'exclusive stores'}</h3>) : null}
                            <p className='bs-search-results__item-time'>{item.storeName}</p>
                            <address className='bs-search-results__item-address'>{`${item.fullAddress} ${item.city} ${item.state} ${item.pinCode}`}</address>
                            <a href={`tel:${item.contactNumber}`} className='bs-search-results__item-time'>Contact - {item.contactNumber}</a>
                            <a href={item.googleMapLink} target="_blank" className='bs-info-window__item-direction' rel="noreferrer">
                                <span className="icon icon-direction bs-info-window__icon"></span>
                                <span className="bs-info-window__text">Directions</span>
                            </a>
                        </div>
                    </li>
                )
            })}
            {mboStores.map((item, index) => {
                return (
                    <li className='bs-search-results__list-item' key={index}>
                        <div className='bs-search-results__item'>
                            <p className='bs-search-results__item-time'>{item.storeName}</p>
                            <address className='bs-search-results__item-address'>{`${item.fullAddress} ${item.city} ${item.state} ${item.pinCode}`}</address>
                            <a href={`tel:${item.contactNumber}`} className='bs-search-results__item-time'>Contact - {item.contactNumber}</a>
                            <a href={item.googleMapLink} target="_blank" className='bs-info-window__item-direction' rel="noreferrer">
                                <span className="icon icon-direction bs-info-window__icon"></span>
                                <span className="bs-info-window__text">Directions</span>
                            </a>
                        </div>
                    </li>
                )
            })}
        </ul>
    </div>
  )
}

export default SearchResult