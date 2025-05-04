import React, { useEffect, useState } from 'react'
import PriceRange from '../PriceRange'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import CheckList from '../CheckList';
import Tag from '../Tag';

const initialFilters = {
  endUse: [],
  collectionName: [],
  fabType: [],
  category: [],
  trending: [],
  classic: [],
  priceRange: [0, 0]
};

function FilterPanel({filterCloseHandleChange, classname, collectionData, applySelectedFilters, preSelectedFilters}) {
  const [minMaxResult, setMinMaxResult] = useState({});
  const [endUseList, setEndUseList] = useState([]);
  const [collectionNameList, setCollectionNameList] = useState([]);
  const [fabTypesList, setFabTypesList] = useState([]);
  const [catTypeList, setCatTypeList] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState(preSelectedFilters);

  function findMinMaxPrices(arr) {
    return arr.reduce(
      (acc, obj) => {
        if (obj.minPrice < acc.minPrice) {
          acc.minPrice = obj.minPrice;
        }
        if (obj.maxPrice > acc.maxPrice) {
          acc.maxPrice = obj.maxPrice;
        }
        return acc;
      },
      { minPrice: Infinity, maxPrice: -Infinity }
    );
  }

  function getUniqueFlatData(arr, key) {
    const data = arr.flatMap(obj => obj[key].split(','));
    const filteredData = data.filter(value => value.trim() !== ''); // Skip blank values
    const uniqueFlatData = [...new Set(filteredData)]; // Get unique values
    return uniqueFlatData;
  }

  useEffect(() => {
    if(collectionData.length > 0) {
      setMinMaxResult(findMinMaxPrices(collectionData));
      setEndUseList(getUniqueFlatData(collectionData, 'endUse'));
      setCollectionNameList([...new Set(collectionData.filter(obj => obj.name).map(obj => obj.name))])
      setFabTypesList([...new Set(collectionData.filter(obj => obj.fabType).map(obj => obj.fabType))])
      setCatTypeList(getUniqueFlatData(collectionData, 'category'));
    }
  }, [collectionData])

  useEffect(() => {
    if(Object.keys(minMaxResult).length > 0) {
      let tempValue = [preSelectedFilters["priceRange"][0] === 0 ? 0 : preSelectedFilters["priceRange"][0], preSelectedFilters["priceRange"][1] === 0 ? minMaxResult?.maxPrice : preSelectedFilters["priceRange"][1]];
      setSelectedFilters(prevState => ({
        ...prevState,
        endUse: preSelectedFilters?.endUse,
        collectionName: preSelectedFilters?.collectionName,
        fabType: preSelectedFilters?.fabType,
        category: preSelectedFilters?.category,
        trending: preSelectedFilters?.trending,
        classic: preSelectedFilters?.classic,
        priceRange: tempValue
      }));
    }
  }, [minMaxResult])

  const handleCheckboxChange = (type, value) => {
    if(type === "priceRange") {
      let tempValue = [0, minMaxResult?.maxPrice];
      setSelectedFilters(prevState => ({
        ...prevState,
        priceRange: tempValue
      }));
      initialFilters["priceRange"] = tempValue;
    } else {
      setSelectedFilters(prevState => {
        const updatedFilters = prevState[type].includes(value)
          ? prevState[type].filter(item => item !== value)
          : [...prevState[type], value];
        return {
          ...prevState,
          [type]: updatedFilters
        };
      });
    }
  };

  const getCheckedItems = (type) => {
    return selectedFilters[type].reduce((acc, item) => {
      acc[item] = true;
      return acc;
    }, {});
  };
  
  const hasAnyFilters = () => {
    const { priceRange, ...otherFilters } = selectedFilters;
    const isPriceFilterApplied = priceRange[0] !== initialFilters.priceRange[0] || priceRange[1] !== minMaxResult?.maxPrice;
    return isPriceFilterApplied || Object.values(otherFilters).some(array => array.length > 0);
  };

  const resetFilters = () => {
    setSelectedFilters(initialFilters);
    let tempValue = [0, minMaxResult?.maxPrice];
    setSelectedFilters(prevState => ({
      ...prevState,
      priceRange: tempValue
    }));
  };

  useEffect(() => {
    applySelectedFilters(selectedFilters);
  }, [selectedFilters])

  const handlePriceChange = (newPriceRange) => {
    setSelectedFilters(prevState => ({
      ...prevState,
      priceRange: newPriceRange
    }));
  };

  return (
    <div className={`bs-filter bg-light ${classname}`}>
      <div className='bs-filter__title-wrap'>
        <div className='bs-filter__title-cont'>
          <button className='bs-btn bs-btn__btn-icon-link'>
            <span className='bs-btn__icon icon icon-filter'></span>
            <span className='bs-btn__btn-text'>filter</span>
          </button>
          <button className='bs-btn bs-btn__btn-icon-link bs-filter__close' onClick={() => filterCloseHandleChange()}>
            <span className='icon icon-simple-close bs-filter__icon'></span>
          </button>
        </div>
        {/* {Object.keys(selectedFilters).length > 0 && */}
          <div className='bs-filter__top-wrap'>
            <div className='bs-filter__tag-wrap'>
              {Object.keys(selectedFilters).map((key) => {
                return selectedFilters[key].length > 0 && selectedFilters[key].map((item, index) => {
                  if(key !== "priceRange") {
                    return (
                      <React.Fragment key={index}>
                        <Tag title={item} onCheckboxChange={(value) => handleCheckboxChange(key, value)} />
                      </React.Fragment>
                    );
                  } else if((selectedFilters["priceRange"][0] !== 0 || selectedFilters["priceRange"][1] !== minMaxResult?.maxPrice) && index === 0) {
                    return (
                      <React.Fragment key={index}>
                        <Tag title={`Rs. ${selectedFilters["priceRange"][0]} - Rs. ${selectedFilters["priceRange"][1]}`} onCheckboxChange={(value) => handleCheckboxChange(key, value)} />
                      </React.Fragment>
                    );
                  }
                });
              })}
              {/* <Tag title='Rs. 999 - Rs. 1999'/> */}
              {/* <Tag title='Sustainable Yarns'/> */}
            </div>
            {hasAnyFilters() && (
              <button className='bs-btn bs-btn__btn-icon-link' onClick={resetFilters}>
                <span className='bs-btn__btn-text'>Clear All</span>
              </button>
            )}
          </div>
        {/* } */}
      </div>
      <div className='bs-filter__body-wrap'>
        <div className='bs-filter__list'>
          <Accordion className='bs-filter__item'>
            <AccordionSummary
              expandIcon={<span className='icon icon-down'></span>}
              aria-controls="panel1-content"
              id="panel1-header"
              className=''
            >
              <h4 className='bs-filter__label'>
                PRICE
              </h4>
            </AccordionSummary>
            <AccordionDetails>
              {Object.keys(minMaxResult).length > 0 ? <PriceRange minMaxResult={minMaxResult} handlePriceChange={(param) => {handlePriceChange(param)}} priceVal={selectedFilters.priceRange} /> : null}
            </AccordionDetails>
          </Accordion>
        </div>
        <div className='bs-filter__list'>
          <Accordion className='bs-filter__item'>
            <AccordionSummary
              expandIcon={<span className='icon icon-down'></span>}
              aria-controls="panel1-content"
              id="panel1-header"
              className=''
            >
              <h4 className='bs-filter__label'>
                COLLECTIONS
              </h4>
            </AccordionSummary>
            <AccordionDetails>
              <CheckList
                data={collectionNameList}
                checkedItems={getCheckedItems('collectionName')}
                onCheckboxChange={(value) => handleCheckboxChange('collectionName', value)}
              />
            </AccordionDetails>
          </Accordion>
        </div>
        <div className='bs-filter__list'>
          <Accordion className='bs-filter__item'>
            <AccordionSummary
              expandIcon={<span className='icon icon-down'></span>}
              aria-controls="panel1-content"
              id="panel1-header"
              className=''
            >
              <h4 className='bs-filter__label'>
                TRENDING/CLASSIC
              </h4>
            </AccordionSummary>
            <AccordionDetails>
              {/* TRENDING */}
              <div className='lyt-check-list__item'>
                <div className='bs-checkbox'>
                  <input
                      type="checkbox"
                      id="trending"
                      name="trending"
                      onChange={() => handleCheckboxChange('trending', 'Trending')}
                      checked={selectedFilters?.trending.includes('Trending')}
                  />
                  <label className="bs-checkbox__label" htmlFor="trending">TRENDING</label>
                </div>

                <div className='bs-checkbox'>
                  <input
                      type="checkbox"
                      id="classic"
                      name="classic"
                      onChange={() => handleCheckboxChange('classic', 'Classic')}
                      checked={selectedFilters?.classic.includes('Classic')}
                  />
                  <label className="bs-checkbox__label" htmlFor="classic">CLASSIC</label>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className='bs-filter__list'>
          <Accordion className='bs-filter__item'>
            <AccordionSummary
              expandIcon={<span className='icon icon-down'></span>}
              aria-controls="panel1-content"
              id="panel1-header"
              className=''
            >
              <h4 className='bs-filter__label'>
                END USE
              </h4>
            </AccordionSummary>
            <AccordionDetails>
              <CheckList
                data={endUseList}
                checkedItems={getCheckedItems('endUse')}
                onCheckboxChange={(value) => handleCheckboxChange('endUse', value)}
              />
            </AccordionDetails>
          </Accordion>
        </div>
        <div className='bs-filter__list'>
          <Accordion className='bs-filter__item'>
            <AccordionSummary
              expandIcon={<span className='icon icon-down'></span>}
              aria-controls="panel1-content"
              id="panel1-header"
              className=''
            >
              <h4 className='bs-filter__label'>
                FABRIC TYPE
              </h4>
            </AccordionSummary>
            <AccordionDetails>
              <CheckList
                data={fabTypesList}
                checkedItems={getCheckedItems('fabType')}
                onCheckboxChange={(value) => handleCheckboxChange('fabType', value)}
              />
            </AccordionDetails>
          </Accordion>
        </div>

        <div className='bs-filter__list'>
          <Accordion className='bs-filter__item'>
            <AccordionSummary
              expandIcon={<span className='icon icon-down'></span>}
              aria-controls="panel1-content"
              id="panel1-header"
              className=''
            >
              <h4 className='bs-filter__label'>
                CATEGORY
              </h4>
            </AccordionSummary>
            <AccordionDetails>
              <CheckList
                data={catTypeList}
                checkedItems={getCheckedItems('category')}
                onCheckboxChange={(value) => handleCheckboxChange('category', value)}
              />
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className='bs-filter__bottom-wrap'>
        {/* <button className='bs-btn bs-btn__btn-icon-link cm-visible-flex-xs' onClick={() => {
          filterCloseHandleChange();
          setTimeout(() => {
            window.scroll({
              top: 0
            });
          }, 100)
        }}>
          <span className='bs-btn__btn-text'>APPLY</span>
        </button> */}
        <button className='bs-btn bs-btn__btn-icon-link' onClick={() => filterCloseHandleChange()}>
          <span className='bs-btn__btn-text'>CLOSE</span>
        </button>
      </div>
    </div>
  )
}

export default FilterPanel