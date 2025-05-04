import React, { useState } from 'react';
import BlogInfography from './components/BlogInfography'
import { Box, Modal } from '@mui/material';
import Share from '@common/components/Share';
import Impact from './components/Impact';
import FeatureInfo from './components/FeatureInfo';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

function BlogDetails() {

    const [shareOptionModal, setShareOptionModal] = useState(false);

    const handleOpenShareOptionModal = () => {
        setShareOptionModal(true)
    }

    const handleCloseShareOptionModal = () => {
        setShareOptionModal(false)
    }

  return (
    <>
    <div className='lyt-blog-details'>
        <div className='lyt-blog-details__head-wrap'>
            <button className='lyt-blog-details__back-btn bs-btn bs-btn__btn-icon'>
                <span className='icon icon-left'></span>
            </button>
            <h1 className='lyt-blog-details__title'>blogs</h1>
        </div>
        <div className='lyt-blog-details__cont-wrap'>
            <ul className='lyt-blog-details__cont-list-wrap'>
                <li className='lyt-blog-details__cont-list-item'>
                    <BlogInfography
                        imageTitle="LOCOMOTION - SUSTAINABLE SHEERS"
                        imageUrl="blog"
                        infoTitle="how <span class='bs-blog-infography__info-title--highlight'>sustainable fabrics</span> are shaping the future of home décor"                    
                        infoDescription="In an era defined by eco-consciousness, sustainability has transcended being a mere trend to become a core life principle. It has evolved into an essential lifestyle choice, fundamentally reshaping the landscape of home décor. Sustainable fabrics now lead the way, responding to the growing demand for materials that are both aesthetically pleasing and environmentally friendly. As designers and homeowners embrace renewable, biodegradable, and responsibly sourced options, modern interiors are evolving to seamlessly blend style with sustainability."
                    />
                </li>
                <li className='lyt-blog-details__cont-list-item'>
                    <div className='lyt-blog-details__col-wrap'>
                        <div className='lyt-blog-details__col-item'>
                            <Impact/>
                        </div>
                        <div className='lyt-blog-details__col-item'>
                            <FeatureInfo/>
                        </div>
                    </div>
                </li>
                <li className='lyt-blog-details__cont-list-item'>
                    <button className='bs-btn bs-btn__btn-icon-solid' onClick={handleOpenShareOptionModal}>
                        <span className='bs-btn__icon icon icon-share'></span>
                        <span className='bs-btn__btn-text'>share</span>
                    </button>
                </li>
            </ul>
        </div>
    </div>
    <Modal
        open={shareOptionModal}
        onClose={handleCloseShareOptionModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='bs-modal bs-modal--typ-sm'
    >
        <Box className='bs-modal__wrapper' sx={style}>
            <div className='bs-modal__content'>
                <button className='bs-modal__close' onClick={handleCloseShareOptionModal}>
                    <span className='icon icon-simple-close'></span>
                </button>
                <Share name="LOCOMOTION - SUSTAINABLE SHEERS" />
            </div>
        </Box>
    </Modal>
    </>
  )
}

export default BlogDetails