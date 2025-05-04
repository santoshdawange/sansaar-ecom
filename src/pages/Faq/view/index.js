import React from 'react';
import Banner from '../../../common/components/Banner';
import FaqParentAccordion from './components/FaqParentAccordion';

function Faq() {
  return (
    <>
        <Banner type="small" imgId="faq-banner.jpg" />
        <div className='bs-section bs-section--typ-grey bs-section--typ-faq'>
            <div className='bs-section__section-head'>
                <h2 className='bs-section__title'>frequently ask questions</h2>
            </div>
            <div className='bs-section__section-cont'>
                <FaqParentAccordion/>
            </div>
        </div>
    </>
    
  )
}

export default Faq