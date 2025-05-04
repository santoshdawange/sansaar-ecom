import React from 'react';
import InfoTile from '../InfoTile';
import { Cloudinary } from '@cloudinary/url-gen';
import { format } from '@cloudinary/url-gen/actions/delivery';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';

const pressData = [
    {
        "id": 3,
        "heading": "D’Decor signs superstar Ranveer Singh as the brand ambassador for ‘Sansaar’",
        "thumbnailUrl": "",
        "mediaUrl": "BSMedia02",
        "articleUrl": "https://www.afaqs.com/news/brands/ddcor-launches-home-dcor-fabrics-brand-sansaar-with-ranveer-singh",
        "publishDate": "1970-01-01T00:00:45.000Z",
        "description": "D’Decor, one of the world’s largest manufacturers of soft furnishing fabrics has signed superstar Ranveer Singh...",
        "type": "press",
        "isActive": true,
        "createdAt": "2024-10-08T13:41:07.000Z",
        "updatedAt": "2024-10-10T12:51:15.000Z"
      },
      {
        "id": 9,
        "heading": "Sanjana Arora The sustainability flagbearer",
        "thumbnailUrl": "",
        "mediaUrl": "SAMedia01",
        "articleUrl": "https://www.afaqs.com/news/brands/ddcor-launches-home-dcor-fabrics-brand-sansaar-with-ranveer-singh",
        "publishDate": "1970-01-01T00:00:45.000Z",
        "description": "Sanjana Arora remembers dinner table conversations with her dad and grandfather since childhood! “I used to often take part in CAS fests in clubs where I would put up a stall of something or clubs where I would put up a stall of something or the other every year to sell small ticket...",
        "type": "press",
        "isActive": true,
        "createdAt": "2024-10-08T13:41:07.000Z",
        "updatedAt": "2024-10-10T12:51:15.000Z"
      },
      {
        "id": 14,
        "heading": "Sansaar aims to become ₹500 cr brand in 5 years with focus on conscious living ",
        "thumbnailUrl": "",
        "mediaUrl": "HBLMedia01",
        "articleUrl": "https://www.afaqs.com/news/brands/ddcor-launches-home-dcor-fabrics-brand-sansaar-with-ranveer-singh",
        "publishDate": "1970-01-01T00:00:45.000Z",
        "description": "Sansaar is looking to penetrate deeper into the domestic market. D’Decor’s conscious living, minimalism, and sustainability-focused brand...",
        "type": "press",
        "isActive": true,
        "createdAt": "2024-10-08T13:41:07.000Z",
        "updatedAt": "2024-10-10T12:51:15.000Z"
      },
      {
        "id": 15,
        "heading": "Press Coverage on created by API",
        "thumbnailUrl": "thumbnail test",
        "mediaUrl": "BSMedia02",
        "articleUrl": "https://www.afaqs.com/news/brands/ddcor-launches-home-dcor-fabrics-brand-sansaar-with-ranveer-singh",
        "publishDate": "1970-01-01T00:00:45.000Z",
        "description": "Examining the role of the press in reporting on global political protests.",
        "type": "press",
        "isActive": false,
        "createdAt": "2024-10-09T06:22:36.000Z",
        "updatedAt": "2024-10-10T12:51:15.000Z"
      },
      {
        "id": 19,
        "heading": "Press Coverage on Global Protests",
        "thumbnailUrl": null,
        "mediaUrl": "SAMedia01",
        "articleUrl": "https://www.afaqs.com/news/brands/ddcor-launches-home-dcor-fabrics-brand-sansaar-with-ranveer-singh",
        "publishDate": "1970-01-01T00:00:45.000Z",
        "description": "Examining the role of the press in reporting on global political protests.",
        "type": "press",
        "isActive": true,
        "createdAt": "2024-10-10T12:51:15.000Z",
        "updatedAt": "2024-10-10T12:51:15.000Z"
      },
      {
        "id": 25,
        "heading": "How the Press is Covering Climate Change",
        "thumbnailUrl": null,
        "mediaUrl": "HBLMedia01",
        "articleUrl": "https://www.afaqs.com/news/brands/ddcor-launches-home-dcor-fabrics-brand-sansaar-with-ranveer-singh",
        "publishDate": "1970-01-01T00:00:45.000Z",
        "description": "An analysis of press coverage on the global climate crisis.",
        "type": "press",
        "isActive": true,
        "createdAt": "2024-10-10T12:51:15.000Z",
        "updatedAt": "2024-10-10T12:51:15.000Z"
      },
      {
        "id": 30,
        "heading": "The Role of Press in Election Reporting",
        "thumbnailUrl": null,
        "mediaUrl": "BSMedia02",
        "articleUrl": "https://www.afaqs.com/news/brands/ddcor-launches-home-dcor-fabrics-brand-sansaar-with-ranveer-singh",
        "publishDate": "1970-01-01T00:00:45.000Z",
        "description": "How the press is shaping public opinion during elections.",
        "type": "press",
        "isActive": true,
        "createdAt": "2024-10-10T12:51:15.000Z",
        "updatedAt": "2024-10-10T12:51:15.000Z"
      },
      {
        "id": 44,
        "heading": "The Role of Press in Election Reporting",
        "thumbnailUrl": "NULL",
        "mediaUrl": "HBLMedia01",
        "articleUrl": "https://www.afaqs.com/news/brands/ddcor-launches-home-dcor-fabrics-brand-sansaar-with-ranveer-singh",
        "publishDate": "2024-10-01T00:00:00.000Z",
        "description": "How the press is shaping public opinion during elections.",
        "type": "press",
        "isActive": true,
        "createdAt": "2024-10-10T15:48:41.000Z",
        "updatedAt": "2024-10-10T15:48:41.000Z"
      }
]

function PressReleaseTabComponent({ data }) {
  // console.log('PressReleaseTabComponent', data)
  // if(data.length === 0)
  //   data = pressData;

  const cld = new Cloudinary({
    secure: true,
    cloud: {
        cloudName: 'dci1aiukm'
    }
  });

  // console.log('PressReleaseTabComponent data', data)
  return (
    <div className='lyt-press'>
        <ul className='lyt-press__list-wrap'>
            {data?.map((item, index) => {
                const myImage = cld.image(item?.mediaUrl).quality('auto').delivery(format('webp'));
                const croppedImage = cld.image(item?.mediaUrl).quality('auto').delivery(format('webp')).resize(thumbnail().width(475).height(346));
                return (
                  <li className='lyt-press__list-item' key={index}>
                    <InfoTile
                      title={item.heading}
                      mediaUrl={myImage}
                      time={item.publishDate}
                      description={item.description}
                      articleUrl={item.articleUrl}
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

export default PressReleaseTabComponent