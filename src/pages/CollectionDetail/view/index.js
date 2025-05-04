import React, { useEffect, useState } from "react";
import Detail from "./components/Detail";
import SkuTabs from "./components/SkuTabs";
import useLocalStorage from "@common/utils/useLocalStorage";
import useApi from "@common/utils/useApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "@common/components/Loader";
import apiUrl from "@common/utils/apiURL";

function CollectionDetail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  let collectionId = searchParams.get("id");
  const [collectionGallery, setCollectionGallery] = useState([]);
  const [materialData, setMaterialData] = useState([]);

  const getMaterialsURL = apiUrl.collection.getMaterials(collectionId)
  

  useEffect(() => {
    if (
      collectionId === "" ||
      collectionId === undefined ||
      collectionId === null
    ) {
      navigate("/collections");
    }
  }, []);

  const { data: response, loading: isLoading, error } = useApi(getMaterialsURL);

  useEffect(() => {
    if (!isLoading && response && response?.CollectionImages) {
      setCollectionGallery(response.CollectionImages);
      setMaterialData(response.MaterialDetails);
      localStorage["collection-data"] = JSON.stringify(response);
    }
  }, [isLoading, response]);

  return (
    <>
    {isLoading ? (
      <Loader/>
    ) : (
      <>
        {collectionGallery.length > 0 &&
          <div className="bs-section">
            <div className="bs-section__section-cont">
              <Detail swiperData={collectionGallery} name={response?.name} description={response?.description} brochure_url={response?.brochureUrl} />
            </div>
          </div>
        }
        {materialData.length > 0 &&
          <div className="bs-section">
            <div className="bs-section__section-cont">
              <SkuTabs data={materialData} name={response?.name} />
            </div>
          </div>
        }
      </>
    )}
    </>
  );
}

export default CollectionDetail;
