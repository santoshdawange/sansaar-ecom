import React from 'react';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import { format } from '@cloudinary/url-gen/actions/delivery';
import { useNavigate } from 'react-router-dom';

function Endurance() {
    const navigate = useNavigate();
    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dci1aiukm'
        }
    });

    const myImage = cld.image('endurance').quality('auto').delivery(format('webp'));

  return (
    <div className='bs-endurance'>
        <div className='bs-endurance__media-wrap'>
            <AdvancedImage cldImg={myImage} loading="lazy" className='bs-endurance__image'/>
        </div>
        <div className='bs-endurance__content-wrap'>
            <div className='bs-endurance__title-wrap'>
                <h2 className='bs-endurance__title'>
                    <span className='bs-endurance__text bs-endurance__text--bold'>introducing</span>
                    <span className='bs-endurance__text bs-endurance__text--highlight'>endurance</span>
                    <span className='bs-endurance__text bs-endurance__text--letter-spacing'>spill-safe technology</span>
                </h2>
                <p className='bs-endurance__title-desc'>High-quality fabrics that blend performance, luxury, and conscious living.</p>
            </div>
            <div className='bs-endurance__logo-list-wrap'>
                <ul className='bs-endurance__logo-list'>
                    <li className='bs-endurance__logo-item'>
                        <div className='bs-endurance__logo-block'>
                            <div className='bs-endurance__logo-block-icon-wrap'>
                                <span className='icon icon-stain-resistant'></span>
                            </div>
                            <label className='bs-endurance__logo-block-label'>stain resistant</label>
                        </div>
                    </li>
                    <li className='bs-endurance__logo-item'>
                        <div className='bs-endurance__logo-block'>
                            <div className='bs-endurance__logo-block-icon-wrap'>
                                <span className='icon icon-easy-to-clean'></span>
                            </div>
                            <label className='bs-endurance__logo-block-label'>easy to clean</label>
                        </div>
                    </li>
                    <li className='bs-endurance__logo-item'>
                        <div className='bs-endurance__logo-block'>
                            <div className='bs-endurance__logo-block-icon-wrap'>
                                <span className='icon icon-low-maintainance'></span>
                            </div>
                            <label className='bs-endurance__logo-block-label'>low maintainance</label>
                        </div>
                    </li>
                    <li className='bs-endurance__logo-item'>
                        <div className='bs-endurance__logo-block'>
                            <div className='bs-endurance__logo-block-icon-wrap'>
                                <span className='icon icon-child-pet-friendly'></span>
                            </div>
                            <label className='bs-endurance__logo-block-label'>child & pet friendly</label>
                        </div>
                    </li>
                    <li className='bs-endurance__logo-item'>
                        <div className='bs-endurance__logo-block'>
                            <div className='bs-endurance__logo-block-icon-wrap'>
                                <span className='icon icon-resilient'></span>
                            </div>
                            <label className='bs-endurance__logo-block-label'>resilient</label>
                        </div>
                    </li>
                </ul>
            </div>
            <div className='bs-endurance__action-wrap'>
                <button className='bs-btn bs-btn__btn-solid bs-btn__btn-solid--typ-large' onClick={() => {navigate('/products')}}>explore</button>
            </div>
        </div>
    </div>
  )
}

export default Endurance