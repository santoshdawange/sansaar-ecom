import React, {useState, useRef} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {AdvancedImage} from '@cloudinary/react';
// import videoUrl from '@assets/videos/brand.mov';
// import videoPoster from '@common/assets/images/poster.webp';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};
  

function VideoModal({posterImage, videoUrl, videoImage}) {

    const videoRef = useRef(null);
    // const [videoState, setVideoState] = useState(false);

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
        setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.play();
            }
        }, 500)
    }
    const handleClose = () => {
        setOpen(false);
        setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        }, 500)
    }

  return (
    <>
        <div className='bs-infography__media-wrap cm-pointer' onClick={handleOpen}>
            
            <AdvancedImage cldImg={posterImage} loading="lazy" className='bs-infography__image'/>
            <span className='icon icon-play bs-infography__play-icon'></span>
        </div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='bs-modal bs-modal--typ-video'
        >
            <Box className='bs-modal__wrapper' sx={style}>
                <button className='bs-btn bs-btn__btn-icon bs-modal__close' onClick={handleClose}>
                    <span className='icon icon-close'></span>
                </button>
                <div className='bs-modal__content'>
                    <video 
                        ref={videoRef} 
                        controls={true} 
                        poster={videoImage} 
                        className='bs-modal__video'
                        width={'100%'}
                        height={'100%'}
                    >
                        <source src={videoUrl} type="video/mp4" />
                    </video>
                </div>
            </Box>
        </Modal>

    </>
  )
}

export default VideoModal