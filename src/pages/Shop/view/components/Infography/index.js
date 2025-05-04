import React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { format } from '@cloudinary/url-gen/actions/delivery';
import { Link } from 'react-router-dom';



function Infography({imageUrl, title, subTitle, actionTitle, actionLink, productData}) {

    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dci1aiukm'
        }
    });

    const myImage = cld.image(imageUrl).quality('auto').delivery(format('webp'));

  return (
    <div className='bs-shop-infography'>
        <div className='bs-shop-infography__media-wrap'>
            <AdvancedImage cldImg={myImage} loading="lazy" className='bs-shop-infography__image' />
        </div>
        <div className='bs-shop-infography__info-wrap'>
            <h2 className='cm-title bs-shop-infography__title' dangerouslySetInnerHTML={{__html: title}}></h2>
            <p className='bs-shop-infography__sub-title'>{subTitle}</p>
            <ul className='bs-shop-infography__collection-wrap'>
                {productData?.map((item, index) => {    
                    return (
                        <li className='bs-shop-infography__collection-item' key={index}>
                            {item.name}
                        </li>
                    )
                })}
            </ul>
            <Link to={actionLink} className='bs-btn bs-btn__btn-solid bs-btn__btn-solid--typ-large bs-shop-infography__action-btn'>{actionTitle}</Link>
        </div>
    </div>
  )
}

export default Infography