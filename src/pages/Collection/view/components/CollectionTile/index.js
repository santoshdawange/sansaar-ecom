import React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { Link } from 'react-router-dom';
import useLocalStorage from '@common/utils/useLocalStorage';
import { format } from '@cloudinary/url-gen/actions/delivery';

function CollectionTile({ data }) {
    let { collectionId, name, CollectionImages, endUse } = data

    const cld = new Cloudinary({
        secure: true,
        cloud: {
            cloudName: 'dci1aiukm'
        }
    });

    const handleClick = (event) => {
        localStorage["selected_collection"] = JSON.stringify(data);
    }

    const handleIcon = (item) => {
        const curtainArr = ['drapery', 'curtains',"curtain"]; 
        const upholsteryArr = ['upholstery', 'sofa', "cushions", "cushion"]; 

        if (curtainArr.includes(item)) return 'icon-curtain'
        else if (upholsteryArr.includes(item)) return 'icon-chair'
    }

    const imgSrc = cld.image((CollectionImages.find(item => item.isPrimary))?.imagePublicId).quality('auto').delivery(format('webp'));
    // const imgSrc = cld.image(data.imgId).quality('auto');

    return (
        <div className='bs-collection'>
            <h3 className='bs-collection__title'>{name}</h3>
            <div className='bs-collection__cont-wrap'>
                <div className='bs-collection__media-wrap'>
                    <Link to={`/collection-detail?id=${collectionId}`} className='bs-collection__link' onClick={handleClick}></Link>
                    <AdvancedImage cldImg={imgSrc} loading="lazy" className='bs-collection__image' />
                    <ul className='bs-collection__more-action'>
                        {endUse.split(',').map((item, index) => {
                            return (
                                <li className='bs-collection__action-item' key={index}>
                                    <button className='bs-collection__action'>
                                    {
                                            (
                                                item.toLowerCase() === "multipurpose"
                                                    ? <><span className={`icon icon-curtain`}></span>  <span className={`icon icon-chair`}></span></>
                                                    : <span className={`icon ${handleIcon(item.toLowerCase())}`}></span>
                                            )
                                        }
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CollectionTile