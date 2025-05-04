import CustomCheckStatement from '@common/components/CustomCheckSatement'
import ProductTag from '@pages/ProductListing/view/components/ProductTag'
import React from 'react'

function AddressCard({id, name, address, type, groupName, index, onClick, variant, isDefault, handleChangeAddress, isChecked, handleChangeDefaultAddress, onRemove}) {
  return (
    <div className={`bs-address-card ${variant === 'small' ? 'bs-address-card--typ-sm' : ''} ${variant === 'no-radio' ? 'bs-address-card--typ-no-radio' : ''}`}>
        {groupName !== 'showBillingAddress' ?
            <div className='bs-address-card__radio-wrap'>
                <div className="bs-address-card__radio">
                    <input 
                        type="radio" 
                        id={`${groupName}_${index}`}
                        name={groupName}
                        onChange={handleChangeAddress}
                        checked={isChecked} // Set the radio button as selected if isDefault is true
                    />
                    <label className="bs-address-card__radio__label" htmlFor={`${groupName}_${index}`}></label>
                </div>
            </div>
        : null}
        <div className='bs-address-card__cont-wrap'>
            <div className='bs-address-card__title-wrap'>
                <h3 className='bs-address-card__title'>{name}</h3>
                <ProductTag title={type} classname="mod-product-tag--typ-border" />
            </div>
            <address className='bs-address-card__address-text'>{address}</address>
        </div>
        {variant === 'small' || groupName === 'showBillingAddress' ? null : (
        <div className='bs-address-card__action-wrap'>
            <ul className='bs-address-card__action-list'>
                <li className='bs-address-card__action-item'>
                    <button className='bs-btn bs-btn__btn-icon-link bs-btn__btn-icon-link--decoration-underline bs-address-card__button'
                        onClick={onClick}
                    >
                        <span className='icon icon-edit bs-btn__icon'></span>
                        <span className='bs-btn__btn-text'>edit</span>
                    </button>
                </li>
                {variant === 'no-radio' &&
                    <li className='bs-address-card__action-item'>
                        <button className='bs-btn bs-btn__btn-icon-link bs-btn__btn-icon-link--decoration-underline bs-address-card__button'
                            onClick={onRemove}
                        >
                            <span className='icon icon-delete bs-btn__icon'></span>
                            <span className='bs-btn__btn-text'>remove</span>
                        </button>
                    </li>
                }
            </ul>
            
            {(!isDefault && groupName !== 'showBillingAddress') &&
                <CustomCheckStatement
                    id={`setDefaultAddress__${index}`}
                    name="defaultAddress"
                    value={isDefault}
                    label="Set as default"
                    classname="bs-address-card__check-box"
                    onChange={() => {handleChangeDefaultAddress(id)}}
                />
            }
        </div>
        )}
    </div>
  )
}

export default AddressCard