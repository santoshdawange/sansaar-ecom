import React from 'react';
import InfoTile from '../InfoTile';
import { Cloudinary } from '@cloudinary/url-gen';
import { format } from '@cloudinary/url-gen/actions/delivery';

function InstagramSpotlightTabComponent({ data }) {
  const cld = new Cloudinary({
    secure: true,
    cloud: {
        cloudName: 'dci1aiukm'
    }
  });

  return (
    <div className='lyt-instafeed'>
      <ul className='lyt-instafeed__wrap'>
        {data.length > 0 && data?.map((item, index) => {
          const myImage = cld.image(item?.thumbnailUrl).quality('auto').delivery(format('webp'));
          return (
            <li className='lyt-instafeed__item' key={index}>
              <InfoTile
                title={item.heading}
                mediaUrl={myImage}
                description={item.description}
                articleUrl={item.articleUrl}
              />
          </li>
          )
        })}

        {/* <li className='lyt-instafeed__item'>
          <InfoTile
              title="Sanjana Arora The sustainability flagbearer"
              mediaUrl="https://res.cloudinary.com/dci1aiukm/image/upload/q_auto/f_webp/d1_djk3ng.jpg?_a=DAJAUVWIZAA0"
              description="Sanjana Arora remembers dinner table conversations with her dad and grandfather since childhood! “I used to often take part in CAS fests in clubs where I would put up a stall of something or clubs where I would put up a stall of something or the other every year to sell small ticket..."
              articleUrl="https://www.afaqs.com/news/brands/ddcor-launches-home-dcor-fabrics-brand-sansaar-with-ranveer-singh"
              variant="press"
          />
        </li> */}
        {/* <li className='lyt-instafeed__item'>
          <InstagramEmbed className='lyt-instafeed__tile' url="https://www.instagram.com/p/DAs9FGlSywN/?igsh=ZnhiMzE2emRmZDE3" />
        </li> */}
      </ul>
    </div>
  )
}

export default InstagramSpotlightTabComponent