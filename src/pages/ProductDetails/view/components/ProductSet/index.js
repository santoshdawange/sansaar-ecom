import React from 'react';
import { inrFormat } from '@common/utils/formatCurrency';

import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { format } from '@cloudinary/url-gen/actions/delivery';
import CustomCheckBox from '@common/components/CustomCheckBox';

function ProductSet() {

    const cld = new Cloudinary({
        secure: true,
        cloud: {
            cloudName: 'dci1aiukm'
        }
    });


    const setData = [
        {
            id: 1,
            imageId: 'shop-sec2-big',
            title: 'Maison luxe single bedsheet Set',
            price: 3600,
        },
        {
            id: 2,
            imageId: 'shop-sec2-small',
            title: 'Maison luxe Duvet Cover',
            price: 2200,
        },
        {
            id: 3,
            imageId: 'pillow-covers',
            title: 'Maison luxe pillow Covers',
            price: 1200,
        }
    ]


  return (
    <div className='bs-product-set'>
        <div className='bs-product-set__title-wrap'>
            <h3 className='bs-product-set__title'>make it a set</h3>
        </div>
        <div className='bs-product-set__cont-wrap'>
            <div className='bs-product-set__info-wrap'>
                <ul className='bs-product-set__set-info'>
                    {setData.map((item, index) => {
                        const imgSrc = cld.image(item.imageId).quality('auto').delivery(format('webp'));
                        return (
                            <li className='bs-product-set__set-item' key={index}>
                                <div className='mod-product-set'>
                                    <div className='mod-product-set__img-wrap'>
                                        <AdvancedImage cldImg={imgSrc} loading="lazy" className='mod-product-set__image' />
                                    </div>
                                    <div className='mod-product-set__info-wrap'>
                                        <h3 className='mod-product-set__title'>{item.title}</h3>
                                        <p className='mod-product-set__price'>{inrFormat(item.price)}</p>
                                        <CustomCheckBox
                                            itemName={item.title}
                                            itemId={`${item.title}__${index}`}
                                            onCheckboxChange={() => {}}
                                        />
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className='bs-product-set__amount-wrap mod-amount-card'>
                <h4 className='mod-amount-card__title'>total amount</h4>
                <p className='mod-amount-card__amount'>{inrFormat(8500)}</p>
                <label className='mod-amount-card__info'>3 Products selected</label>
                <button className='mod-amount-card__action-btn bs-btn bs-btn__btn-solid bs-btn__btn-solid--typ-xxl'>add to cart</button>
            </div>
        </div>
    </div>
  )
}

export default ProductSet