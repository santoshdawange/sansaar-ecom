import React from 'react';
import TextField from '@mui/material/TextField';
import CustomSelect from '@common/components/CustomSelect';
import { Select, MenuItem, FormControl } from '@mui/material';
import TabMobileFilter from '../TabMobileFilter';

let portrait = window.matchMedia("(orientation: portrait)");

const sortByData = [
    { label: 'New to Old', value: 'nto' },
    { label: 'Old to New', value: 'otn' },
]

function TabContentFilter({variant, onTabClickEvent, tabActiveState, handleSelectTabChange, handleFilterData, sortBy, setSortBy, sortByYear, setSortByYear, sortByYearData}) {
    const [searchValue, setSearchValue] = React.useState('');

    const sortByHandleChange = (event) => {
        setSortBy(event.target.value);
        handleFilterData('sort', event.target.value)
    };


    const sortByYearHandleChange = (event) => {
        setSortByYear(event.target.value);
        handleFilterData('filterYear', event.target.value)
    };

    
    // console.log('sortByYearData', sortByYearData)

  return (
    <div className={`bs-content-filter ${variant === 'tab' ? 'bs-content-filter--typ-tab' : ''}`}>
        <div className='bs-content-filter__search-wrap'>
            {variant === 'tab' ? (
                <>
                    {/* <FormControl variant="outlined" className='bs-content-filter__select'>
                        <label className='bs-content-filter__label'>filter</label>
                        <Select
                            labelId="tab-select-label"
                            value={tabActiveState}
                            onChange={handleSelectTabChange}
                        >
                            <MenuItem value={'film'}>Film</MenuItem>
                            <MenuItem value={'print'}>Print</MenuItem>
                        </Select>
                    </FormControl> */}
                    <ul className='bs-content-filter__tabs-wrap'>
                        <li className='bs-content-filter__tab-item'>
                            <button className={`bs-content-filter__action-btn ${tabActiveState === 'film' ? 'bs-content-filter__action-btn--active' : ''}`} onClick={() => onTabClickEvent('film')}>film</button>
                        </li>
                        <li className='bs-content-filter__tab-item'>
                            <button className={`bs-content-filter__action-btn ${tabActiveState === 'print' ? 'bs-content-filter__action-btn--active' : ''}`} onClick={() => onTabClickEvent('print')}>print</button>
                        </li>
                    </ul>
                </>
            ) : (
                <div className='bs-content-filter__search'>
                    <label className='bs-content-filter__search-label'>Search</label>
                    <div className='bs-content-filter__input-group'>
                        <TextField 
                            placeholder='Type here' 
                            className='bs-content-filter__input-field'
                            value={searchValue}
                            onChange={(event) => {setSearchValue(event.target.value); handleFilterData('search', event.target.value)}}
                        />
                    </div>
                </div>
            )}
        </div>
        {window.innerWidth <= 1024 && portrait ? 
            <TabMobileFilter
                sortByValue={sortBy}
                sortByData={sortByData}
                sortByHandleChange={sortByHandleChange}
                sortByYearValue={sortByYear} 
                sortByYearData={sortByYearData}
                sortByYearHandleChange={sortByYearHandleChange}
                handleFilterData={handleFilterData}
            />
        : 
        <div className='bs-content-filter__sort-wrap'>
            <ul className='bs-content-filter__sort-wrap-list'>
                <li className='bs-content-filter__sort-wrap-list-item'>
                    <CustomSelect 
                        label="Sort by"
                        options={sortByData}
                        selectState={sortBy}
                        selectHandleChange={sortByHandleChange}
                    />
                </li>
                <li className='bs-content-filter__sort-wrap-list-item'>
                    <CustomSelect 
                        label="Year"
                        options={sortByYearData}
                        selectState={sortByYear}
                        selectHandleChange={sortByYearHandleChange}
                    />
                </li>
            </ul>
        </div>
        }
    </div>
  )
}

export default TabContentFilter    