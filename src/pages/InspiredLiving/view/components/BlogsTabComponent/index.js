import React from 'react';
import InfoTile from '../InfoTile';
import { Cloudinary } from '@cloudinary/url-gen';
import { format } from '@cloudinary/url-gen/actions/delivery';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';

const pressData = [
  {
    "id": 3,
    "heading": "How sustainable fabrics are shaping the future of home décor",
    "thumbnailUrl": "",
    "mediaUrl": "blog",
    "articleUrl": "https://www.afaqs.com/news/brands/ddcor-launches-home-dcor-fabrics-brand-sansaar-with-ranveer-singh",
    "publishDate": "1970-01-01T00:00:45.000Z",
    "description": "D’Decor, one of the world’s largest manufacturers of soft furnishing fabrics has signed superstar Ranveer Singh...",
    "type": "press",
    "isActive": true,
    "createdAt": "2024-10-08T13:41:07.000Z",
    "updatedAt": "2024-10-10T12:51:15.000Z"
  },
  // {
  //   "id": 9,
  //   "heading": "How sustainable fabrics are shaping the future of home décor 2",
  //   "thumbnailUrl": "",
  //   "mediaUrl": "blog",
  //   "articleUrl": "https://www.afaqs.com/news/brands/ddcor-launches-home-dcor-fabrics-brand-sansaar-with-ranveer-singh",
  //   "publishDate": "1970-01-01T00:00:45.000Z",
  //   "description": "Sanjana Arora remembers dinner table conversations with her dad and grandfather since childhood! “I used to often take part in CAS fests in clubs where I would put up a stall of something or clubs where I would put up a stall of something or the other every year to sell small ticket...",
  //   "type": "press",
  //   "isActive": true,
  //   "createdAt": "2024-10-08T13:41:07.000Z",
  //   "updatedAt": "2024-10-10T12:51:15.000Z"
  // },
  // {
  //   "id": 14,
  //   "heading": "How sustainable fabrics are shaping the future of home décor 3",
  //   "thumbnailUrl": "",
  //   "mediaUrl": "blog",
  //   "articleUrl": "https://www.afaqs.com/news/brands/ddcor-launches-home-dcor-fabrics-brand-sansaar-with-ranveer-singh",
  //   "publishDate": "1970-01-01T00:00:45.000Z",
  //   "description": "Sansaar is looking to penetrate deeper into the domestic market. D’Decor’s conscious living, minimalism, and sustainability-focused brand...",
  //   "type": "press",
  //   "isActive": true,
  //   "createdAt": "2024-10-08T13:41:07.000Z",
  //   "updatedAt": "2024-10-10T12:51:15.000Z"
  // },
]

function BlogsTabComponent() {
  // console.log('BlogsTabComponent', data)
  // if(data.length === 0)
  //   data = pressData;

  const cld = new Cloudinary({
    secure: true,
    cloud: {
        cloudName: 'dci1aiukm'
    }
  });

  // console.log('BlogsTabComponent data', data)
  return (
    <div className='lyt-press'>
        <ul className='lyt-press__list-wrap'>
            {pressData?.map((item, index) => {
                const myImage = cld.image(item?.mediaUrl).quality('auto').delivery(format('webp'));
                const croppedImage = cld.image(item?.mediaUrl).quality('auto').delivery(format('webp')).resize(thumbnail().width(475).height(346));
                return (
                  <li className='lyt-press__list-item' key={index}>
                    <InfoTile
                      title={item.heading}
                      mediaUrl={myImage}
                      time={item.publishDate}
                      description={item.description}
                      articleUrl={'/blog-details'}
                      variant={item.type}
                      croppedMediaUrl={croppedImage}
                    />
                </li>
                )
            })}
        </ul>
    </div>
  )
}

export default BlogsTabComponent