import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/navigation';
import { EffectCreative, Navigation, Autoplay } from 'swiper/modules';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary, transformationStringFromObject } from "@cloudinary/url-gen";
import useApi from '@common/utils/useApi';
import useLocalStorage from '@common/utils/useLocalStorage';
import { Box, Modal } from '@mui/material';
import Share from '../../../../../common/components/Share';
import { format } from '@cloudinary/url-gen/actions/delivery';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

const cld = new Cloudinary({
    secure: true,
    cloud: {
        cloudName: 'dci1aiukm'
    }
});

// const transformation = transformationStringFromObject([
//     {aspect_ratio: '16:9'},
//     {quality: 'auto'}
// ]);



function Detail({ swiperData, name, description, brochure_url }) {

    const [shareOptionModal, setShareOptionModal] = useState(false);
    const [sortedSwiperData, setSortedSwiperData] = useState([]);

    const handleOpenShareOptionModal = () => {
        setShareOptionModal(true)
    }

    const handleCloseShareOptionModal = () => {
        setShareOptionModal(false)
    }

    const [imageId, setImageId] = useState(null);


    useEffect(() => {
        swiperData?.sort((a, b) => b.isPrimary - a.isPrimary);
        const filteredData = swiperData?.filter(item => item.isPrimary === true);
        setImageId(filteredData[0]?.imagePublicId);
        setSortedSwiperData(swiperData);
    }, [swiperData])

    return (
        <>
            <div className='bs-collection-detail'>
                <div className='bs-collection-detail__media-wrap'>
                    <Swiper
                        grabCursor={true}
                        loop={true}
                        effect={'creative'}
                        navigation={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        creativeEffect={{
                            prev: {
                                shadow: true,
                                translate: ['-20%', 0, -1],
                            },
                            next: {
                                translate: ['100%', 0, 0],
                            },
                        }}
                        speed={1100}
                        modules={[EffectCreative, Navigation, Autoplay]}
                        className="bs-collection-detail__swiper-container"
                    >
                        {sortedSwiperData.map((item, index) => {
                            const imgSrc = cld.image(item.imagePublicId).quality('auto').delivery(format('webp'));
                            return (
                                <SwiperSlide key={index}>
                                    <AdvancedImage cldImg={imgSrc} loading="lazy" className='bs-collection-detail__image' />
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
                <div className='bs-collection-detail__info-wrap'>
                    <div className='bs-collection-detail__text-wrap'>
                        <h3 className='bs-collection-detail__title'>{name}</h3>
                        <div className='bs-collection-detail__info'>
                            <p className='bs-collection-detail__desc'>{description}</p>
                        </div>
                    </div>
                    <div className='bs-collection-detail__action-wrap'>
                        <button className='bs-btn bs-btn__btn-icon-solid' onClick={handleOpenShareOptionModal}>
                            <span className='bs-btn__icon icon icon-share'></span>
                            <span className='bs-btn__btn-text'>share</span>
                        </button>
                        <a href={brochure_url} rel="noreferrer" target='_blank' className='bs-btn bs-btn__btn-icon-solid'>
                            <span className='bs-btn__icon icon icon-doc'></span>
                            <span className='bs-btn__btn-text'>download brouchure</span>
                        </a>
                    </div>
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
                        <Share imageId={imageId} name={name} />
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default Detail