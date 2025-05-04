import React, { useEffect, useState } from 'react'
import SkuItem from '../../CollectionDetail/view/components/SkuItem'
import Detail from './components/Detail'
import { useNavigate, useSearchParams } from 'react-router-dom';
import apiUrl from '@common/utils/apiURL';
import useApi from '@common/utils/useApi';
import axios from 'axios';

function SkuDetail() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const materialId = searchParams.get("id");
    const collectionId = searchParams.get("collectionId");
    const [collectionData, setCollectionData] = useState(JSON.parse(localStorage["collection-data"] || null));
    const [materialData, setMaterialData] = useState([])
    const [remainingMaterialData, setRemainingMaterialData] = useState([])

    useEffect(() => {
        if(collectionData !== null && collectionData?.collectionId === collectionId) {
            const tempMaterialData = collectionData?.MaterialDetails.filter((item) => {
                return item.materialCode === materialId;
            })
            setMaterialData(tempMaterialData);
            const tempRemainingMaterialData = collectionData?.MaterialDetails.filter((item) => {
                return item.qualityId === tempMaterialData[0]?.qualityId;
            })
            setRemainingMaterialData(tempRemainingMaterialData);
        } else {
            const getMaterialsURL = collectionId ? apiUrl.collection.getMaterials(collectionId) : null;
            if(getMaterialsURL) {
                async function fetchData() {
                    const response = await axios.get(getMaterialsURL);
                    if (response.statusText === 'OK' || response.status === 200) {
                        localStorage["collection-data"] = JSON.stringify(response.data);
                        setCollectionData(response.data);
                    } else {
                        console.log('Error fetching data');
                    }
                }
                fetchData();
            }
        }
    }, [collectionData, materialId])

    const scrollTopHandleChange = () => {
        window.scrollTo(0, 0);
    }

  return (
    <>
        <div className='bs-section bs-section--typ-grey cm-no-padding lyt-details'>
            <div className="lyt-details__action">
                <button className="bs-btn bs-btn__btn-icon-link" onClick={() => navigate(-1)}>
                    <span className='bs-btn__icon icon icon-back'></span>
                    <span className='bs-btn__btn-text'>Back</span>
                </button>
            </div>
            <div className='bs-section__section-cont'>
                <Detail data={collectionData} materialData={materialData[0]} />
            </div>
        </div>
        <div className='bs-section'>
            <div className='bs-section__section-cont'>
                <div className='lyt-product'>
                    <div className='lyt-product__title-wrap'>
                        <h2 className='lyt-product__title'>All Colours</h2>
                    </div>
                    <ul className='lyt-product__list-wrap'>
                        {remainingMaterialData.map((item, index) => {
                            if(item?.materialCode !== materialData[0]?.materialCode) {
                                return (
                                    <li className='lyt-product__list-item' key={index} onClick={scrollTopHandleChange}>
                                        <SkuItem
                                            imageId={item.skuImageUrl}
                                            link={`/sku-detail?id=${item?.materialCode}&collectionId=${item?.collectionId}`}
                                            title={collectionData?.name + ", Sr.No. " + item.serialNo}
                                        />
                                    </li>
                                )
                            }
                        })}
                    </ul>
                </div>
            </div>
        </div>
    </>
  )
}

export default SkuDetail