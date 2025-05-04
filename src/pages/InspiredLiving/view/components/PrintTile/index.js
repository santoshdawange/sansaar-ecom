import { AdvancedImage } from '@cloudinary/react';
import React from 'react';
import { Link } from 'react-router-dom';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

function PrintTile({mediaUrl, articleUrl}) {


  return (
    <div className='bs-print-tile'>
        {/* <Link to={articleUrl} target='_blank' className='bs-print-tile__link'>Link</Link> */}
        <div className='bs-print-tile__image-wrap'>
        <Zoom>
          <AdvancedImage cldImg={mediaUrl} loading="lazy" alt={mediaUrl} />
        </Zoom>
          {/* <AdvancedImage cldImg={mediaUrl} loading="lazy" alt={mediaUrl} /> */}
          {/* <img src={mediaUrl} alt={mediaUrl} /> */}
        </div>
    </div>
  )
}

export default PrintTile