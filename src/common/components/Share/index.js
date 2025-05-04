import React, {useState, useEffect} from 'react';
import {EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, XIcon, TwitterShareButton, PinterestIcon, PinterestShareButton, WhatsappIcon, WhatsappShareButton} from "react-share";
import { Cloudinary } from "@cloudinary/url-gen";
import {CopyToClipboard} from 'react-copy-to-clipboard';

const cld = new Cloudinary({
    secure: true,
    cloud: {
        cloudName: 'dci1aiukm'
    }
});



function Share({imageId, name}) {

    const iconSize = '100%';

    const shareUrl = window.location.href;
    const title = window?.location?.search?.split('=')[1]

    const imgSrc = cld.image(imageId).quality('auto');

    const generateSrc = `https://res.cloudinary.com/${imgSrc.cloudName}/image/upload/${imgSrc.publicID}`

    const [openCopyAlert, setOpenCopyAlert] = useState(false);

    const showCopyAlertHandle = () => {
        setOpenCopyAlert(true)
    }

    const closeAlertHandle = () => {
        setOpenCopyAlert(false)
    }

    useEffect(() => {
        setTimeout(() => {
            setOpenCopyAlert(false)
        }, 2000)
    },[openCopyAlert])

  return (
    <div className='bs-share-list'>
        <h3 className='bs-share-list__title'>Share via</h3>
        <ul className='bs-share-list__list-wrap'>
            <li className='bs-share-list__list-item'>
                <FacebookShareButton url={shareUrl} className="bs-share-list__share-btn">
                    <FacebookIcon size={iconSize} round />
                </FacebookShareButton>
                <label className='bs-share-list__label'>facebook</label>
            </li>
            <li className='bs-share-list__list-item'>
                <TwitterShareButton
                    url={shareUrl}
                    title={name}
                    className="bs-share-list__share-btn"
                >
                    <XIcon size={iconSize} round />
                </TwitterShareButton>
                <label className='bs-share-list__label'>Twitter</label>
            </li>
            <li className='bs-share-list__list-item'>
                <WhatsappShareButton
                    url={shareUrl}
                    title={name}
                    separator=" - "
                    className="bs-share-list__share-btn"
                >
                    <WhatsappIcon size={iconSize} round />
                </WhatsappShareButton>
                <label className='bs-share-list__label'>Whatsapp</label>
            </li>
            <li className='bs-share-list__list-item'>
                <PinterestShareButton
                    url={shareUrl}
                    media={generateSrc}
                    className="bs-share-list__share-btn"
                >
                    <PinterestIcon size={iconSize} round />
                </PinterestShareButton>
                <label className='bs-share-list__label'>pinterest</label>
            </li>
            <li className='bs-share-list__list-item'>
                <EmailShareButton
                    url={shareUrl}
                    subject={name}
                    body="body"
                    className="bs-share-list__share-btn"
                >
                    <EmailIcon size={iconSize} round />
                </EmailShareButton>
                <label className='bs-share-list__label'>Email</label>
            </li>
            <li className='bs-share-list__list-item'>
                <CopyToClipboard 
                    text={shareUrl}
                >
                    <button className="bs-share-list__share-btn bs-share-list__share-btn--copy" onClick={showCopyAlertHandle}>
                        <span className='icon icon-copy'></span>
                    </button>
                </CopyToClipboard>
                <label className='bs-share-list__label'>copy link</label>
            </li>
        </ul>
        <p className={`bs-share-list__alert-text ${openCopyAlert ? 'bs-share-list__alert-text--active' : ''}`}>Sharable link copied</p>
    </div>
  )
}

export default Share