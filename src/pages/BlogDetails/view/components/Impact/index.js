import React from 'react';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import { format } from '@cloudinary/url-gen/actions/delivery';

function Impact() {

    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dci1aiukm'
        }
    });

    const mainImage = cld.image('blog-1').quality('auto').delivery(format('webp'));
    const image1 = cld.image('blog-2').quality('auto').delivery(format('webp'));
    const image2 = cld.image('blog-3').quality('auto').delivery(format('webp'));
    const image3 = cld.image('blog-4').quality('auto').delivery(format('webp'));


  return (
    <div className='bs-impact'>
        <div className='bs-impact__head-wrap'>
            <div className='bs-impact__title-wrap'>
                <h2 className='bs-impact__title'>the positive impact</h2>
                <p className='bs-impact__desc'>Popular eco-conscious fabrics include organic cotton, which is grown without harmful chemicals and offers a soft, breathable texture ideal for upholstery and curtains. inen, made from flax, is biodegradable and provides a light, airy feel. Recycled polyester, spun into yarn from repurposed plastic waste, creates durable and sleek fabrics. Explore all our <span className='cm-bold'>sustainable yarn</span> collections.</p>
            </div>
            <div className='bs-impact__media-wrap'>
                <AdvancedImage cldImg={mainImage} loading="lazy" className='bs-impact__image'/>
                <a href="/collection-detail?id=B10007" className='bs-impact__media-title-wrap'>
                    <label className='bs-impact__media-title'>EARTHEN - SUSTAINABLE MULTIPURPOSE PLAINS</label>
                </a>
            </div>
        </div>
        <div className='bs-impact__cont-wrap'>
            <ul className='bs-impact__media-list'>
                <li className='bs-impact__media-item'>
                    <AdvancedImage cldImg={image1} loading="lazy" className='bs-impact__media-item-image'/>
                </li>
                <li className='bs-impact__media-item'>
                    <AdvancedImage cldImg={image2} loading="lazy" className='bs-impact__media-item-image'/>
                </li>
                <li className='bs-impact__media-item'>
                    <AdvancedImage cldImg={image3} loading="lazy" className='bs-impact__media-item-image'/>
                </li>
            </ul>
            <div className='bs-impact__more-info'>
                <p className='bs-impact__desc'>In a world increasingly defined by conscious choices, creating an eco-friendly yet elegant home is more attainable than ever with Sansaar. By incorporating our exquisite collections featuring timeless elements, diverse color palette, and natural textures, you can cultivate a space that not only serves as a mindful choice but also adds a contemporary touch to it. Transform your home into a sanctuary of beauty and sustainability, where every detail contributes to a greener future.</p>
                <strong className='bs-impact__author'>With Sansaar, design and conscience coexist beautifully.</strong>
            </div>
        </div>
    </div>
  )
}

export default Impact