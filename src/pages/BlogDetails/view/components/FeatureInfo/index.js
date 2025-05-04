import React from 'react';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import { format } from '@cloudinary/url-gen/actions/delivery';

function FeatureInfo() {

    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dci1aiukm'
        }
    });

    const myImage = cld.image('blog-enviornment-friendly').quality('auto').delivery(format('webp'));



  return (
    <div className='bs-feature-info'>
        <div className='bs-feature-info__media-wrap'>
            <AdvancedImage cldImg={myImage} loading="lazy" className='bs-feature-info__image'/>
            <p className='bs-feature-info__feature-desc'>These fabrics do more than just look good—they actively reduce the negative impact on the environment. Here's how they are shaping the future of home décor</p>
        </div>
        <ul className='bs-feature-info__feature-list'>
            <li className='bs-feature-info__feature-item'>
                <h4 className='bs-feature-info__feature-title'>Reduced Carbon Footprint</h4>
                <p className='bs-feature-info__feature-desc'>Sustainable fabrics are sourced from renewable resources, produced using less energy, less water and often have a smaller carbon footprint compared to traditional materials. For example, the farming of organic cotton used in our <a href="/collection-detail?id=B10001" className='cm-bold cm-underline'>Melange</a> collection uses less water and energy, while recycled polyester used in collections like <a href="/collection-detail?id=B10007" className='cm-bold cm-underline'>Earthen</a> help divert waste from landfills. </p>
            </li>
            <li className='bs-feature-info__feature-item'>
                <h4 className='bs-feature-info__feature-title'>Non-Toxic and Healthier Homes </h4>
                <p className='bs-feature-info__feature-desc'>Traditional fabrics often rely on chemical treatments for durability or stain resistance. Whereas fabrics that are sustainable, are typically free of harmful chemicals, resulting in a healthier indoor environment. This is especially beneficial for homes with children or those with allergies, as eco-friendly textiles promote better air quality.</p>
            </li>
            <li className='bs-feature-info__feature-item'>
                <h4 className='bs-feature-info__feature-title'>Ethical Production</h4>
                <p className='bs-feature-info__feature-desc'>The production prioritizes eco-friendly processes, such as energy-efficient techniques and water conservation, while ensuring fair labor practices through organic and fair-trade certifications. This approach reflects a growing focus on ethical manufacturing and responsible consumer choices, in line with <span className='cm-bold'>sustainability principles.</span></p>
            </li>
        </ul>
    </div>
  )
}

export default FeatureInfo