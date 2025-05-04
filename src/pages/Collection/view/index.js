import React, { useEffect, useState } from 'react';
import CollectionTile from './components/CollectionTile';
import FilterPanel from './components/FilterPanel';
import useApi from '@common/utils/useApi';
import { useLocation } from 'react-router-dom';
import apiUrl from '@common/utils/apiURL';
let portrait = window.matchMedia("(orientation: portrait)");


const removeDuplicates = (arr) => {
    const seen = new Set();
    return arr.filter(obj => {
        const lowerCaseCollectionId = obj.collectionId.trim().toLowerCase();
        if (seen.has(lowerCaseCollectionId)) {
            return false;
        } else {
            seen.add(lowerCaseCollectionId);
            return true;
        }
    });
};

function Collection() {
    const [collectionListingData, setCollectionListingData] = useState([]);
    const [filteredCollectionData, setFilteredCollectionData] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({
        endUse: [],
        collectionName: [],
        fabType: [],
        category: [],
        trending: [],
        classic: [],
        priceRange: [0, 0]
    });
    const [filterOpen, setFilterOpen] = useState(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get('type');
    const value = searchParams.get('value');

    useEffect(() => {
        if (type !== undefined && type !== null) {
            if (selectedFilters[type].length === 0) {
                // const updatedFilters = value === 'Multipurpose' ? ['Curtain', 'Upholstery'] : [value];
                const updatedFilters = [value]
                setSelectedFilters(prevState => {
                    return {
                        ...prevState,
                        [type]: updatedFilters
                    };
                });

                if (window.innerWidth > 1024)
                    filterOpenHandleChange();
            }
        }
    }, [location]);

    const getAllCollectionURL = apiUrl.collection.getAll;

    const { data: response, loading: isLoading, error } = useApi(getAllCollectionURL);
    useEffect(() => {
        if (!isLoading && response) {
            const uniqueCollectionGallery = removeDuplicates(response);
            setCollectionListingData(uniqueCollectionGallery);
            setFilteredCollectionData(uniqueCollectionGallery);
        }
    }, [isLoading, response]);

    useEffect(() => {
        if (Object.values(selectedFilters).some(arr => arr.length > 0) && selectedFilters["priceRange"][1] !== 0) {
            const filteredData = collectionListingData.filter(item => {
                const itemEndUse = item.endUse.split(',').map(e => e.trim());
                const itemFabType = item.fabType.split(',').map(e => e.trim());
                const itemCategory = item.category.split(',').map(e => e.trim());

                const isEndUseMatch = selectedFilters.endUse.length === 0 || selectedFilters.endUse.some(endUse => itemEndUse.includes(endUse));
                // let isEndUseMatch;
                // // if (selectedFilters.endUse.includes('Curtain') && selectedFilters.endUse.includes('Upholstery')) {
                // if (value === 'Multipurpose') {
                //     isEndUseMatch = itemEndUse.includes('Curtain') && itemEndUse.includes('Upholstery');
                // } else {
                //     isEndUseMatch = selectedFilters.endUse.length === 0 || selectedFilters.endUse.some(endUse => itemEndUse.includes(endUse));
                // }
                const isCollectionNameMatch = selectedFilters.collectionName.length === 0 || selectedFilters.collectionName.includes(item.name);
                const isFabTypeMatch = selectedFilters.fabType.length === 0 || selectedFilters.fabType.some(fabType => itemFabType.includes(fabType));
                const isCategoryMatch = selectedFilters.category.length === 0 || selectedFilters.category.some(category => itemCategory.includes(category));
                const isTrendingMatch = selectedFilters.trending.length === 0 || item.trending !== 0;
                const isClassicMatch = selectedFilters.classic.length === 0 || item.classic !== 0;
                const isPriceMatch = item.minPrice >= selectedFilters.priceRange[0] && item.maxPrice <= selectedFilters.priceRange[1];
                return isEndUseMatch && isCollectionNameMatch && isFabTypeMatch && isCategoryMatch && isPriceMatch && isTrendingMatch && isClassicMatch;
            });

            if (selectedFilters.trending.length > 0) {
                filteredData.sort((a, b) => a.trending - b.trending);
            }
            if (selectedFilters.classic.length > 0) {
                filteredData.sort((a, b) => a.classic - b.classic);
            }
            setFilteredCollectionData(filteredData);
        } else {
            setFilteredCollectionData(collectionListingData);
        }
        // if(window.innerWidth <= 1024){
        //     setFilterOpen(false)
        // }
    }, [selectedFilters, collectionListingData]);

    const filterOpenHandleChange = () => {
        setFilterOpen(true)
    }

    const filterCloseHandleChange = () => {
        setFilterOpen(false)
    }

    const applySelectedFilters = (filters) => {
        setSelectedFilters(filters);
    }

    return (
        <div className='bs-section'>
            <div className='bs-section__section-head bs-section--typ-collections'>
                <h2 className='bs-section__title'>collections</h2>
            </div>
            <div className='bs-section__section-cont'>
                <div className={`lyt-collection ${filterOpen ? 'lyt-collection__filter-open' : ''}`}>
                    {/* onClick={filterOpenHandleChange} */}
                    {!filterOpen ? (
                        <button className='bs-btn bs-btn__btn-icon-link lyt-collection__filter-action' onClick={filterOpenHandleChange}>
                            <span className='bs-btn__icon icon icon-filter'></span>
                            <span className='bs-btn__btn-text'>filter</span>
                        </button>
                    ) : null}
                    {window.innerWidth <= 1024 ? (
                        <FilterPanel
                            filterCloseHandleChange={filterCloseHandleChange}
                            classname={filterOpen ? 'bs-filter__mb-active' : ''}
                            collectionData={collectionListingData}
                            applySelectedFilters={applySelectedFilters}
                            preSelectedFilters={selectedFilters}
                        />
                    ) : (
                        filterOpen &&
                        <div className='lyt-collection__filter-wrap'>
                            <FilterPanel
                                filterCloseHandleChange={filterCloseHandleChange}
                                collectionData={collectionListingData}
                                applySelectedFilters={applySelectedFilters}
                                preSelectedFilters={selectedFilters}
                            />
                        </div>

                    )}

                    <ul className='lyt-collection__list-wrap'>
                        {filteredCollectionData.map((item, index) => {
                            return (
                                <li className='lyt-collection__item' key={index}>
                                    <CollectionTile data={item} />
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Collection