import React, { useCallback, useEffect, useState } from 'react';
import Collections from '@common/components/Collections';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Link } from 'react-router-dom';
import SearchItem from './components/SearchItem';
import apiUrl from '@common/utils/apiURL';
import axios from 'axios';
import NoResults from '@common/components/NoResults';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [collectionArr, setCollectionArr] = useState([]);
  const [materialArr, setMaterialArr] = useState([]);
  // Define the search function
  const searchApi = async (term) => {
    // Call your search API here
    const searchURL = apiUrl.search(term);
    await axios.get(searchURL)  
    .then((response) => {
        if(response.status === 200) {
            setCollectionArr(response.data.collections)
            setMaterialArr(response.data.materials)
            setIsLoading(false);
        }
    })
    .catch((error) => {
        console.log('Search request failed', error);
        setIsLoading(false);
    })
  };

  const [firstLoad, setFirstLoad] = useState(false);
  const validateSearchTerm = useCallback((val) => {
    if(firstLoad)
      searchApi(val)
    else
      setFirstLoad(true);
  }, [searchTerm])

  useEffect(() => {
    const timer = setTimeout(() => {
      validateSearchTerm(searchTerm)
    }, 700);
    return () => {
      clearTimeout(timer);
    }
  }, [searchTerm])

  return (
    <div className='bs-global-search'>
        <div className='bs-section cm-no-padding bs-section--typ-grey bs-section--pg-title'>
            <div className='bs-section__section-head'>
                <h1 className='bs-section__title'>Search Results</h1>
            </div>
        </div>
        <div className='bs-section'>
            <div className='bs-section__section-head bs-global-search__head'>
                <div className='lyt-locator__search-field-wrap bs-global-search__search-wrap'>
                    <div className='lyt-locator__search-field'>
                      <TextField 
                        placeholder='Search here' 
                        className='lyt-locator__search-input'
                        value={searchTerm}
                        onChange={(e)=>{ e.persist(); setSearchTerm(e.target.value); setIsLoading(true)}}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <button 
                                className={`icon bs-global-search__close-icon ${searchTerm !== '' && searchTerm !== null ? 'icon-simple-close' : 'icon-search'}`}
                                onClick={() => setSearchTerm('')}
                              > 
                              </button>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
                </div>
            </div>
            <div className='bs-section__section-cont bs-global-search__body'>
              <ul className='bs-global-search__result-wrap'>
                {collectionArr.length === 0 && materialArr.length === 0 && searchTerm !== "" && !isLoading ? (
                  <li className='bs-global-search__result-item'>
                    <NoResults searchValue={searchTerm}/>
                  </li>
                ) : null}
                {collectionArr.length > 0 ?
                  <li className='bs-global-search__result-item'>
                    <h3 className='bs-global-search__result-title'>Collections</h3>
                    <ul className='bs-global-search__search-list-wrap'>
                        {collectionArr.map((item, index) => {
                            return(
                                <li className='bs-global-search__search-list-item' key={index}>
                                    {/* <div className='bs-global-search__search-item'>
                                        <Link className='bs-global-search__search-item-title'>{item.label}</Link>
                                        <p className='bs-global-search__search-item-desc'>{item.year}</p>
                                    </div> */}
                                    <SearchItem
                                      imageId={item?.CollectionImages}
                                      title={item?.name}
                                      desc={item?.description}
                                      link={`/collection-detail?id=${item?.collectionId}`}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                  </li>
                : null}
                {materialArr.length > 0 ?
                  <li className='bs-global-search__result-item'>
                    <h3 className='bs-global-search__result-title'>Fabrics</h3>
                    <ul className='bs-global-search__search-list-wrap'>
                        {materialArr.map((item, index) => {
                            return(
                                <li className='bs-global-search__search-list-item' key={index}>
                                    {/* <div className='bs-global-search__search-item'>
                                        <Link className='bs-global-search__search-item-title'>{item.label}</Link>
                                        <p className='bs-global-search__search-item-desc'>{item.year}</p>
                                    </div> */}
                                    <SearchItem
                                      imageId={item?.materialCode}
                                      title={item?.collectionName}
                                      desc={item?.productCategoryCollectionBase}
                                      link={`/sku-detail?id=${item?.materialCode}&collectionId=${item?.collectionId}`}
                                      serialNo={item?.serialNo}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                  </li>
                : null}
              </ul>
            </div>
        </div>
        <div className='bs-section bs-section--typ-grey cm-overflow-hidden'>
            <div className='bs-section__section-head'>
                <h2 className='bs-section__title'>trending collections</h2>
            </div>
            <div className='bs-section__section-cont'>
                <Collections />
            </div>
        </div>
    </div>
  )
}

export default Search