import React from 'react';
import CustomTabs from './components/CustomTabs';
import SectionBanner from '@common/components/SectionBanner';

function InspiredLiving() {
  return (
    <>
      <div className='bs-section cm-no-padding'>
          <div className='bs-section__section-cont'>
              <SectionBanner
                imageUrl="inspired-living-banner"
                title="what's buzzing in <span class='bs-section__title--highlight bs-section-banner__title--highlight'>our sansaar</span>"
                noHover={true}
                titlePosition="on-image"
              />
          </div>
      </div>
      <div className='bs-section bs-section--typ-custom-tabs-on-image'>
        <div className='bs-section__section-cont'>
          <CustomTabs />
        </div>
      </div>
    </>
  )
}

export default InspiredLiving