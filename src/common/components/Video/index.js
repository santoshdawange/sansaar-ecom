import React, {useRef, useState} from 'react'

function Video({posterImage, url, autoplay, controls, overlayAction}) {

    const videoRef = useRef(null);
    const [videoState, setVideoState] = useState(false);

    const playHandle = () => {
        setVideoState(true)
        if (videoRef.current) {
            videoRef.current.play();
        }
    }

    const pauseHandle = () => {
        setVideoState(false)
        if (videoRef.current) {
            videoRef.current.pause();
        }
    }

  return (
    <div className={`bs-video`}>
        <video 
            ref={videoRef} 
            controls={controls ? controls : false} 
            poster={posterImage ? posterImage : null} 
            autoPlay={autoplay ? autoplay : false}
            playsInline={autoplay ? autoplay : false}
            // webkit-playsinline={autoplay ? autoplay : false}
            className='bs-video__media'
        >
            <source src={url} type="video/mp4" />
        </video>


        {overlayAction && (
            videoState ? (
                <button className='bs-btn bs-btn__btn-icon bs-video__action' onClick={pauseHandle}>
                    <span className='icon icon-play'></span>
                </button>
            ) : (
                <button className='bs-btn bs-btn__btn-icon bs-video__action' onClick={playHandle}>
                    <span className='icon icon-play'></span>
                </button>
            )
        )}
    </div>
  )
}

export default Video