import { useEffect, useRef } from 'react';
import cloudinary from 'cloudinary-video-player';
import "cloudinary-video-player/cld-video-player.min.css";

const VideoPlayer = ({ id, publicId, ...props }) => {
  const cloudinaryRef = useRef();
  const videoRef = useRef();

  useEffect(() => {
    if ( cloudinaryRef.current ) return;

    cloudinaryRef.current = window.cloudinary;
    cloudinaryRef.current.videoPlayer(videoRef.current, {
        cloudName: 'dci1aiukm',
        fluid: true,
        controls: false,
        muted: true,
        skin: 'light',
        aiHighlightsGraph: true,
        floatingWhenNotVisible: 'right',
        pictureInPictureToggle: true,
        autoplay: true,
        loop: true
    })
  }, []);

  return (
      <video
        ref={videoRef}
        id={id}
        controls
        autoPlay
        data-cld-public-id={publicId}
        {...props}
      />
  );
}

export default VideoPlayer