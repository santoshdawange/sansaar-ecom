import React, { useEffect, useState } from 'react'

function CheckList({ data, checkedItems, onCheckboxChange }) {
    // const [checkedItems, setCheckedItems] = useState({});
  
    // useEffect(() => {
    //   // Initialize checkedItems state based on data
    //   const initialCheckedState = data.reduce((acc, item) => {
    //     acc[item] = selectedFilters.includes(item);
    //     return acc;
    //   }, {});
    //   setCheckedItems(initialCheckedState);
    // }, [data, selectedFilters]);
  
    // const handleCheckboxChange = (item) => {
    //   setCheckedItems((prev) => {
    //     const updatedCheckedItems = {
    //       ...prev,
    //       [item]: !prev[item],
    //     };
    //     onChange(item); // Notify parent about the change
    //     return updatedCheckedItems;
    //   });
    // };
  
    return (
      <div>
        <ul className='lyt-check-list'>
          <li className='lyt-check-list__item'>
            {data.map((item, index) => (
              <div className='bs-checkbox' key={index}>
                <input
                  type="checkbox"
                  id={item}
                  name={item}
                  value={item}
                  checked={checkedItems[item] || false}
                  onChange={() => onCheckboxChange(item)}
                />
                <label className="bs-checkbox__label" htmlFor={item}>{item}</label>
              </div>
            ))}
          </li>
        </ul>
      </div>
    );
}

export default CheckList