import React from 'react';
import Drawer from '@mui/material/Drawer';
import CustomSelect from '@common/components/CustomSelect';

function TabMobileFilter({sortByValue, sortByData, sortByHandleChange, sortByYearValue, sortByYearData, sortByYearHandleChange, handleFilterData}) {
  const [sortByMobile, setSortByMobile] = React.useState('nto');
  const [sortByYearMobile, setSortByYearMobile] = React.useState('2024');
  
  const sortByMobileHandleChange = (event) => {
    setSortByMobile(event.target.value);
    // handleFilterData('sort', event.target.value)
  };

  const sortByYearMobileHandleChange = (event) => {
    setSortByYearMobile(event.target.value);
    // handleFilterData('filterYear', event.target.value)
  };


    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });
    
      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        if(!open) {
          handleFilterData('both', sortByMobile, sortByYearMobile);
        }
        setState({ ...state, [anchor]: open });
      };

  // console.log('sortByData', sortByData)
  return (
    <div className='bs-mobile-filter'>
      {['bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
            <button className='bs-btn bs-btn__btn-icon-solid bs-mobile-filter__action' onClick={toggleDrawer(anchor, true)}>
                <span className='bs-btn__icon icon icon-filter-2'></span>
            </button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            className='bs-mobile-filter__body'
          >
            <div className='bs-content-filter__sort-wrap'>
                <ul className='bs-content-filter__sort-wrap-list'>
                    <li className='bs-content-filter__sort-wrap-list-item'>
                        <CustomSelect 
                            label="Sort by"
                            options={sortByData}
                            selectState={sortByMobile}
                            selectHandleChange={sortByMobileHandleChange}
                        />
                    </li>
                    <li className='bs-content-filter__sort-wrap-list-item'>
                        <CustomSelect 
                            label="Year"
                            options={sortByYearData}
                            selectState={sortByYearMobile}
                            selectHandleChange={sortByYearMobileHandleChange}
                        />
                    </li>
                </ul>
                <div className='bs-mobile-filter__body__action-wrap'>
                    <button className='bs-btn bs-btn__btn-solid' onClick={toggleDrawer(anchor, false)}>Apply</button>
                </div>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  )
}

export default TabMobileFilter