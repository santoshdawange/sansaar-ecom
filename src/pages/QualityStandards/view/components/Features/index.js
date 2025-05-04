import React from 'react';
import IconText from '@common/components/IconText'
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { format } from '@cloudinary/url-gen/actions/delivery';

function Features({data}) {

    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dci1aiukm'
        }
    });

  return (
    <div className='bs-features'>
        <ul className='bs-features__list-wrap'>
            {data?.map((item) => {
                return(
                <li className='bs-features__list-item' key={item?.id}>
                    <div className='bs-features__item'>
                        <div className='bs-features__item-title-wrap'>
                            <IconText
                                icon={item?.icon}
                                title={item?.title}
                                classname="bs-features__item-icon-text"
                            />
                            {item?.certificates !== null ? (
                                <ul className='bs-features__item-logo-list'>
                                    {item?.certificates?.map((logoItem) => {
                                        const myImage = cld.image(logoItem?.name).quality('auto').delivery(format('webp'));
                                        return(
                                            <li className='bs-features__item-logo' key={logoItem?.id}>
                                                <AdvancedImage cldImg={myImage} loading="lazy" className='bs-features__item-mage' />
                                            </li>
                                        )
                                    })}
                                </ul>
                            ) : null}
                        </div>
                        <div className='bs-features__item-desc-wrap'>
                            <p className='bs-features__item-desc'>{item?.desc}</p>
                        </div>
                    </div>
                </li>
                )
            })}
        </ul>
    </div>
  )
}

export default Features