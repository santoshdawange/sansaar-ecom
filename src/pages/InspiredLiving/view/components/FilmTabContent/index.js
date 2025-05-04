import Video from '@common/components/Video';
import { Cloudinary } from "@cloudinary/url-gen";
import { format } from '@cloudinary/url-gen/actions/delivery';
import React from 'react';
import Infography from '@common/components/Infography';

const filmData = [
  {
    "id": 1,
    "heading": "Sansaar - A D'Decor Brand TVC/2024",
    "thumbnailUrl": "banner-video-poster",
    "mediaUrl": "home_video_banner_10_mb_1080p",
    "articleUrl": "https://sansaar.co.in/TVC.html",
    "publishDate": "1970-01-01T00:00:45.000Z",
    "description": "A deep dive into the technological innovations shaping the future of film production.",
    "type": "film",
    "isActive": true,
    "createdAt": "2024-10-08T13:41:07.000Z",
    "updatedAt": "2024-10-10T12:51:14.000Z"
  }
  // {
  //   "id": 17,
  //   "heading": "The Future of Cinema",
  //   "thumbnailUrl": "banner-video-poster",
  //   "mediaUrl": "brand_1080p",
  //   "articleUrl": "https://sansaar.co.in/TVC.html",
  //   "publishDate": "1970-01-01T00:00:45.000Z",
  //   "description": "A deep dive into the technological innovations shaping the future of film production.",
  //   "type": "film",
  //   "isActive": true,
  //   "createdAt": "2024-10-10T12:51:15.000Z",
  //   "updatedAt": "2024-10-10T12:51:15.000Z"
  // },
  // {
  //   "id": 31,
  //   "heading": "The Future of Cinema updated",
  //   "thumbnailUrl": "banner-video-poster",
  //   "mediaUrl": "brand_1080p",
  //   "articleUrl": "https://sansaar.co.in/TVC.html",
  //   "publishDate": "2024-08-10T00:00:00.000Z",
  //   "description": "A deep dive into the technological innovations shaping the future of film production.",
  //   "type": "film",
  //   "isActive": true,
  //   "createdAt": "2024-10-10T15:48:41.000Z",
  //   "updatedAt": "2024-10-10T15:48:41.000Z"
  // },
  // {
  //   "id": 47,
  //   "heading": "The Future of Cinema",
  //   "thumbnailUrl": "banner-video-poster",
  //   "mediaUrl": "brand_1080p",
  //   "articleUrl": "https://sansaar.co.in/TVC.html",
  //   "publishDate": "2024-08-10T00:00:00.000Z",
  //   "description": "A deep dive into the technological innovations shaping the future of film production.",
  //   "type": "film",
  //   "isActive": false,
  //   "createdAt": "2024-10-10T15:48:41.000Z",
  //   "updatedAt": "2024-10-11T05:18:15.000Z"
  // },
  // {
  //   "id": 61,
  //   "heading": "The Future of Cinema",
  //   "thumbnailUrl": "banner-video-poster",
  //   "mediaUrl": "brand_1080p",
  //   "articleUrl": "https://sansaar.co.in/TVC.html",
  //   "publishDate": "2024-08-10T00:00:00.000Z",
  //   "description": "A deep dive into the technological innovations shaping the future of film production.",
  //   "type": "film",
  //   "isActive": true,
  //   "createdAt": "2024-10-11T07:09:27.000Z",
  //   "updatedAt": "2024-10-11T07:09:27.000Z"
  // }
]

function FilmTabContent({ data }) {
  if(data.length === 0)
    data = filmData;

  const cld = new Cloudinary({
    cloud: {
        cloudName: 'dci1aiukm'
    }
  });

  return (
    <div className='lyt-advertise lyt-advertise--typ-container-sm'>
      {/* <div className='lyt-advertise__title-wrap'>
        <h2 className='lyt-advertise__title'>Sansaar - A D'Decor Brand TVC/2024</h2>
      </div> */}
      <div className='lyt-advertise__cont-wrap'>
        <ul className='lyt-advertise__film-list-wrap'>
          {data?.map((item, index) => {

          const videoPosterImg = cld.image(item.thumbnailUrl).quality('auto').delivery(format('webp')).toURL();
          const videoUrl = cld.video(item.mediaUrl).quality('auto').delivery(format('mp4')).toURL();
            return (
              <li className='lyt-advertise__film-list-item' key={index}>
                <h4 className='lyt-advertise__film-title'>{item.heading}</h4>
                <Infography
                    imageUrl="home-video-poster.webp"
                    viewInModal={true}  
                    type="full"
                    videoUrl = {videoUrl}
                    videoPosterImg="https://res.cloudinary.com/dci1aiukm/image/upload/w_300,h_200,c_fill,q_auto,f_jpg/v1724226761/home-video-poster.webp"
                />
              </li>
            )
          })}
        </ul>
      </div>
      
    </div>
  )
}

export default FilmTabContent