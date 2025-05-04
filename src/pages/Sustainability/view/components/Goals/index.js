import React from 'react'
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { format } from '@cloudinary/url-gen/actions/delivery';

const goalsData = [
    {
        id: 1,
        title: '50%',
        info: 'reduction in greenhouse gases by end of 2025 through replacement of fuel in our boiler house from coal to biomass.'
    },
    {
        id: 2,
        title: '95%',
        info: 'of our total water consumption will be recycled and reused.'
    },
    {
        id: 3,
        title: '50%',
        info: 'growth in sustainable product use. Increase in recycled yarns, organic cotton & BCI cotton in our product range.'
    },
    {
        id: 4,
        title: '55%',
        info: 'increase in renewable energy usage. Installing 0.70 MW rooftop solar panels and partnering with top green energy firms to replace 50% of our total electricity consumption with solar and wind power.'
    },
    {
        id: 5,
        title: 'EVs',
        info: 'will gradually replace all the diesel & petrol trucks.'
    },
    {
        id: 6,
        title: 'ZERO',
        info: 'coal usage by 2025. Invested in advanced equipments for our boiler house to convert the fuel from coal to greener alternatives.'
    }
]

function Goals() {

    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dci1aiukm'
        }
      });
    
      const myImage = cld.image('goals.jpg').quality('auto').delivery(format('webp'));

  return (
    <div className='lyt-goals'>
        <div className='lyt-goals__info-wrap'>
            <ul className='lyt-goals__info-list'>
                {goalsData?.map((item, index) => {
                    return (
                    <li className='lyt-goals__info-item' key={index}>
                        <div className='lyt-goals__info'>
                            <h4 className='lyt-goals__info-title'>{item.title}</h4>
                            <p className='lyt-goals__info-desc' dangerouslySetInnerHTML={{__html: item.info}}></p>
                        </div>
                    </li>
                    )
                })}
            </ul>
        </div>
        <div className='lyt-goals__media-wrap'>
            <AdvancedImage cldImg={myImage} loading="lazy" className='lyt-goals__image' />
        </div>
    </div>
  )
}

export default Goals