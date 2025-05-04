import React from 'react';

const supportData = [
    {
        id: 1,
        title: 'free <span class="cm-line-break">shipping</span>',
        iconName: 'free-delivery'
    },
    {
        id: 2,
        title: 'express <span class="cm-line-break">devlivery</span>',
        iconName: 'express-delivery'
    },
    {
        id: 3,
        title: 'secure payment <span class="cm-line-break">options</span>',
        iconName: 'secure-payment-options'
    },
    {
        id: 4,
        title: 'dedicated customer <span class="cm-line-break">support</span>',
        iconName: 'dedicated-customer-support'
    },
]

function CustomerSupport() {
  return (
    <div className='bs-customer-suppport'>
        <ul className='bs-customer-suppport__info-wrap'>
            {supportData?.map((item, index) => {
                return (
                    <li className='bs-customer-suppport__info-item' key={index}>
                        <div className='bs-customer-suppport__item'>
                            <div className='bs-customer-suppport__icon-wrap'>
                                <span className={`bs-customer-suppport__icon icon icon-${item.iconName}`}></span>
                            </div>
                            <div className='bs-customer-suppport__innfo-wrap'>
                                <h3 className='bs-customer-suppport__title' dangerouslySetInnerHTML={{__html: item.title}}></h3>
                            </div>
                        </div>
                    </li>
                )
            })}
        </ul>
    </div>
  )
}

export default CustomerSupport