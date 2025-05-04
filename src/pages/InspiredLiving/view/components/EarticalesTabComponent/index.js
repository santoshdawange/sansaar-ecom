import React from 'react';
import InfoTile from '../InfoTile';

const electronicData = [
  {
    "id": 4,
    "heading": "Electronic Media: Trends for 2024",
    "thumbnailUrl": "",
    "mediaUrl": "",
    "articleUrl": "https://www.thehindubusinessline.com/companies/sansaar-aims-to-become-500-cr-brand-in-5-years-with-focus-on-conscious-living/article68533174.ece",
    "publishDate": "1970-01-01T00:00:45.000Z",
    "description": "Sansaar aims to become â¹500 cr brand in 5 years with focus on conscious living",
    "type": "electronic",
    "isActive": true,
    "createdAt": "2024-10-08T13:41:07.000Z",
    "updatedAt": "2024-10-10T12:51:15.000Z",
    "publisher": "Business Today"
  },
  {
    "id": 5,
    "heading": "Electronic Media: Trends for 2024",
    "thumbnailUrl": "",
    "mediaUrl": "",
    "articleUrl": "https://www.aninews.in/news/business/sansaar-ddecors-conscious-fabric-brand-unveils-a-new-nationwide-tvc-with-brand-ambassador-ranveer-singh20240725181753/",
    "publishDate": "1970-01-01T00:00:45.000Z",
    "description": "Sansaar, D'Decor's conscious fabric brand, unveils a new nationwide TVC with Brand Ambassador Ranveer Singh",
    "type": "electronic",
    "isActive": true,
    "createdAt": "2024-10-08T13:41:07.000Z",
    "updatedAt": "2024-10-10T12:51:15.000Z",
    "publisher": "New Delhi Times"
  },
  {
    "id": 10,
    "heading": "Digital Advertising in Electronic Media",
    "thumbnailUrl": "",
    "mediaUrl": "",
    "articleUrl": "https://brandequity.economictimes.indiatimes.com/news/advertising/ranveer-singh-builds-his-sansaar-in-new-campaign/111865112",
    "publishDate": "1970-01-01T00:00:45.000Z",
    "description": "Ranveer Singh builds his 'Sansaar' in new campaign",
    "type": "electronic",
    "isActive": true,
    "createdAt": "2024-10-08T13:41:07.000Z",
    "updatedAt": "2024-10-10T12:51:15.000Z",
    "publisher": "Elle Decor"
  },
  {
    "id": 20,
    "heading": "Electronic Media: Trends for 2024",
    "thumbnailUrl": null,
    "mediaUrl": null,
    "articleUrl": "https://www.thehindubusinessline.com/companies/sansaar-aims-to-become-500-cr-brand-in-5-years-with-focus-on-conscious-living/article68533174.ece",
    "publishDate": "1970-01-01T00:00:45.000Z",
    "description": "Sansaar aims to become â¹500 cr brand in 5 years with focus on conscious living",
    "type": "electronic",
    "isActive": true,
    "createdAt": "2024-10-10T12:51:15.000Z",
    "updatedAt": "2024-10-10T12:51:15.000Z",
    "publisher": "Elle Decor"
  },
  {
    "id": 21,
    "heading": "Electronic Media: Trends for 2024",
    "thumbnailUrl": null,
    "mediaUrl": null,
    "articleUrl": "https://www.aninews.in/news/business/sansaar-ddecors-conscious-fabric-brand-unveils-a-new-nationwide-tvc-with-brand-ambassador-ranveer-singh20240725181753/",
    "publishDate": "1970-01-01T00:00:45.000Z",
    "description": "Sansaar, D'Decor's conscious fabric brand, unveils a new nationwide TVC with Brand Ambassador Ranveer Singh",
    "type": "electronic",
    "isActive": true,
    "createdAt": "2024-10-10T12:51:15.000Z",
    "updatedAt": "2024-10-10T12:51:15.000Z",
    "publisher": "Elle Decor"
  },
  {
    "id": 26,
    "heading": "Digital Advertising in Electronic Media",
    "thumbnailUrl": null,
    "mediaUrl": null,
    "articleUrl": "https://brandequity.economictimes.indiatimes.com/news/advertising/ranveer-singh-builds-his-sansaar-in-new-campaign/111865112",
    "publishDate": "1970-01-01T00:00:45.000Z",
    "description": "Ranveer Singh builds his 'Sansaar' in new campaign",
    "type": "electronic",
    "isActive": true,
    "createdAt": "2024-10-10T12:51:15.000Z",
    "updatedAt": "2024-10-10T12:51:15.000Z",
    "publisher": "Elle Decor"
  },
  {
    "id": 34,
    "heading": "Electronic Media: Trends for 2024",
    "thumbnailUrl": "NULL",
    "mediaUrl": null,
    "articleUrl": "https://www.thehindubusinessline.com/companies/sansaar-aims-to-become-500-cr-brand-in-5-years-with-focus-on-conscious-living/article68533174.ece",
    "publishDate": "2024-09-05T00:00:00.000Z",
    "description": "Sansaar aims to become â¹500 cr brand in 5 years with focus on conscious living",
    "type": "electronic",
    "isActive": true,
    "createdAt": "2024-10-10T15:48:41.000Z",
    "updatedAt": "2024-10-10T15:48:41.000Z",
    "publisher": "Elle Decor"
  },
  {
    "id": 35,
    "heading": "Electronic Media: Trends for 2024",
    "thumbnailUrl": "NULL",
    "mediaUrl": null,
    "articleUrl": "https://www.aninews.in/news/business/sansaar-ddecors-conscious-fabric-brand-unveils-a-new-nationwide-tvc-with-brand-ambassador-ranveer-singh20240725181753/",
    "publishDate": "2024-09-05T00:00:00.000Z",
    "description": "Sansaar, D'Decor's conscious fabric brand, unveils a new nationwide TVC with Brand Ambassador Ranveer Singh",
    "type": "electronic",
    "isActive": true,
    "createdAt": "2024-10-10T15:48:41.000Z",
    "updatedAt": "2024-10-10T15:48:41.000Z",
    "publisher": "Elle Decor"
  },
  {
    "id": 40,
    "heading": "Digital Advertising in Electronic Media",
    "thumbnailUrl": "NULL",
    "mediaUrl": null,
    "articleUrl": "https://brandequity.economictimes.indiatimes.com/news/advertising/ranveer-singh-builds-his-sansaar-in-new-campaign/111865112",
    "publishDate": "2024-09-09T00:00:00.000Z",
    "description": "Ranveer Singh builds his 'Sansaar' in new campaign",
    "type": "electronic",
    "isActive": true,
    "createdAt": "2024-10-10T15:48:41.000Z",
    "updatedAt": "2024-10-10T15:48:41.000Z",
    "publisher": "Elle Decor"
  },
  {
    "id": 50,
    "heading": "Electronic Media: Trends for 2024",
    "thumbnailUrl": null,
    "mediaUrl": null,
    "articleUrl": "https://www.thehindubusinessline.com/companies/sansaar-aims-to-become-500-cr-brand-in-5-years-with-focus-on-conscious-living/article68533174.ece",
    "publishDate": "2024-09-05T00:00:00.000Z",
    "description": "Sansaar aims to become â¹500 cr brand in 5 years with focus on conscious living",
    "type": "electronic",
    "isActive": true,
    "createdAt": "2024-10-10T15:48:41.000Z",
    "updatedAt": "2024-10-10T15:48:41.000Z",
    "publisher": "Elle Decor"
  },
  {
    "id": 51,
    "heading": "Electronic Media: Trends for 2024",
    "thumbnailUrl": null,
    "mediaUrl": null,
    "articleUrl": "https://www.aninews.in/news/business/sansaar-ddecors-conscious-fabric-brand-unveils-a-new-nationwide-tvc-with-brand-ambassador-ranveer-singh20240725181753/",
    "publishDate": "2024-09-05T00:00:00.000Z",
    "description": "Sansaar, D'Decor's conscious fabric brand, unveils a new nationwide TVC with Brand Ambassador Ranveer Singh",
    "type": "electronic",
    "isActive": true,
    "createdAt": "2024-10-10T15:48:41.000Z",
    "updatedAt": "2024-10-10T15:48:41.000Z",
    "publisher": "Elle Decor"
  },
  {
    "id": 56,
    "heading": "Digital Advertising in Electronic Media",
    "thumbnailUrl": null,
    "mediaUrl": null,
    "articleUrl": "https://brandequity.economictimes.indiatimes.com/news/advertising/ranveer-singh-builds-his-sansaar-in-new-campaign/111865112",
    "publishDate": "2024-09-09T00:00:00.000Z",
    "description": "Ranveer Singh builds his 'Sansaar' in new campaign",
    "type": "electronic",
    "isActive": true,
    "createdAt": "2024-10-10T15:48:41.000Z",
    "updatedAt": "2024-10-10T15:48:41.000Z",
    "publisher": "Elle Decor"
  },
  {
    "id": 64,
    "heading": "Electronic Media: Trends for 2024",
    "thumbnailUrl": null,
    "mediaUrl": null,
    "articleUrl": "https://www.thehindubusinessline.com/companies/sansaar-aims-to-become-500-cr-brand-in-5-years-with-focus-on-conscious-living/article68533174.ece",
    "publishDate": "2024-09-05T00:00:00.000Z",
    "description": "Sansaar aims to become ₹500 cr brand in 5 years with focus on conscious living",
    "type": "electronic",
    "isActive": true,
    "createdAt": "2024-10-11T07:09:27.000Z",
    "updatedAt": "2024-10-11T07:09:27.000Z",
    "publisher": "Elle Decor"
  }
]

function EarticalesTabComponent({ data }) {
  // if(data.length === 0)
  //   data = electronicData;

  return (
    <div className='lyt-press lyt-press--typ-full'>
        <ul className='lyt-press__list-wrap'>
            {data?.map((item, index) => {
                return (
                <li className='lyt-press__list-item' key={index}>
                    <InfoTile
                      title={item.heading}
                      subTitle={item.subHeading}
                      time={item.publishDate}
                      description={item.description}
                      articleUrl={item.articleUrl}
                      variant={item.type}
                    />
                </li>
                )
            })}
        </ul>
    </div>
  )
}

export default EarticalesTabComponent