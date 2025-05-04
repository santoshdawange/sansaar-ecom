import React from 'react';
import { Link } from 'react-router-dom';
import Form from './components/Form';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import { format } from '@cloudinary/url-gen/actions/delivery';


function Contact() {

    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dci1aiukm'
        }
    });

    const myImage = cld.image('Rectangle_1_fts36b.jpg').quality('auto').delivery(format('webp'));

    return (
        <div className='bg-light'>
            {/* <div className='cm-container'>
                <div className='bs-breadcrumb'>
                    <ul className='bs-breadcrumb__list'>
                        <li className='bs-breadcrumb__item'>
                            <Link to="/" className='bs-breadcrumb__link'>HOME</Link>
                        </li>
                        <li className='bs-breadcrumb__item'>
                            <Link to="/contact-us" className='bs-breadcrumb__link'>CONTACT US</Link>
                        </li>
                    </ul>
                </div>
            </div> */}
            <Form />
            <div className='bs-contact-info'>
                <div className='bs-contact-info__img-wrap'>
                    {/* <img src={contactImg} alt='contact Img' /> */}
                    <AdvancedImage cldImg={myImage} loading="lazy" />
                </div>
                <div className='bs-contact-info__info-wrap'>
                    <h2 className='cm-title'>CONTACT US</h2>
                    <p className='bs-contact-info__desc'>
                        <span className='cm-line-break cm-semi-bold'>Headquarters</span>
                        D'Decor Curtain Fabrics LLP<br />
                        S14, Solitaire Corporate Park, 5th Floor,
                        167, Guru Hargovindji Marg, Chakala,
                        Andheri (E) Mumbai – 400093, India
                    </p>
                    <p className='bs-contact-info__desc'><a href="mailto:support@sansaar.co.in">Email: support@sansaar.co.in</a></p>
                    <p className='bs-contact-info__desc'><a href="tel:02261152525">Phone: 022-61152525</a></p>
                    <p className='bs-contact-info__desc'><a href="tel:07969112525">Mobile: 07969112525</a></p>
                </div>
            </div>
        </div>
    )
}

export default Contact