import React from 'react';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import { format } from '@cloudinary/url-gen/actions/delivery';
import { useNavigate } from 'react-router-dom';

function FootprintInfography() {
    const navigate = useNavigate();
    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dci1aiukm'
        }
    });

    const bigImage = cld.image('DNA-Image-1').quality('auto').delivery(format('webp'));
    const smallImage = cld.image('DNA-Image-2').quality('auto').delivery(format('webp'));


  return (
    <div className='bs-infography-footprint'>
        <div className='bs-infography-footprint__info-wrap'>
            <h2 className='cm-title bs-infography-footprint__title'>Luxury That Leaves a Lighter Footprint</h2>
            <p className='bs-infography-footprint__desc'>Sansaar’s vision is to redefine the art of home living by blending timeless design with unparalleled comfort, quality, and sustainability.</p>
            <ul className='bs-infography-footprint__feature-list'>
                <li className='bs-infography-footprint__feature-item'>
                    <span className='bs-infography-footprint__icon-wrap'>
                        <span className='icon icon-breathable'></span>
                    </span>
                    <p className='bs-infography-footprint__feature'>Breathable</p>
                </li>
                <li className='bs-infography-footprint__feature-item'>
                    <span className='bs-infography-footprint__icon-wrap'>
                        <span className='icon icon-azo-free-dyes'></span>
                    </span>
                    <p className='bs-infography-footprint__feature'>Azo free dyes</p>
                </li>
                <li className='bs-infography-footprint__feature-item'>
                    <span className='bs-infography-footprint__icon-wrap'>
                        <span className='icon icon-no-color-bleeding'></span>
                    </span>
                    <p className='bs-infography-footprint__feature'>No Color bleeding</p>
                </li>
                <li className='bs-infography-footprint__feature-item'>
                    <span className='bs-infography-footprint__icon-wrap'>
                        <span className='icon icon-easy-maintainance'></span>
                    </span>
                    <p className='bs-infography-footprint__feature'>Easy Maintainance</p>
                </li>
                <li className='bs-infography-footprint__feature-item'>
                    <span className='bs-infography-footprint__icon-wrap'>
                        <span className='icon icon-premium-quality'></span>
                    </span>
                    <p className='bs-infography-footprint__feature'>Premium Quality</p>
                </li>
                <li className='bs-infography-footprint__feature-item'>
                    <span className='bs-infography-footprint__icon-wrap'>
                        <span className='icon icon-feather-soft'></span>
                    </span>
                    <p className='bs-infography-footprint__feature'>Feather Soft</p>
                </li>
            </ul>
            <button className='bs-btn bs-btn__btn-solid bs-infography-footprint__action' onClick={() => navigate("/products")} >shop now</button>
        </div>
        <div className='bs-infography-footprint__media-wrap'>
            <div className='bs-infography-footprint__big-img-wrap'>
                <AdvancedImage cldImg={bigImage} loading="lazy" className='bs-infography-footprint__image'/>
            </div>
            <div className='bs-infography-footprint__smimg-wrap'>
                <AdvancedImage cldImg={smallImage} loading="lazy" className='bs-infography-footprint__image bs-infography-footprint__image--sm'/>
            </div>
        </div>  
    </div>
  )
}

export default FootprintInfography