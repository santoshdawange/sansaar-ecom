import React from 'react';
import SectionBanner from '@common/components/SectionBanner';
import CustomTabs from '../CustomTabs';

function BlogListing() {
  return (
    <div className='lyt-blogs'>
      <div className='bs-section cm-no-padding'>
          <div className='bs-section__section-cont'>
              <SectionBanner
                imageUrl="inspired-living-banner"
                title="reflections on <span class='bs-section__title--highlight bs-section-banner__title--highlight'>conscious choices</span>"
                noHover={true}
                titlePosition="on-image"
              />
          </div>
      </div>
      <div className='bs-section bs-section--typ-custom-tabs-on-image'>
        <div className='bs-section__section-cont'>
            <CustomTabs showBlogs={true}/>
        </div>
      </div>
    </div>
  )
}

export default BlogListing