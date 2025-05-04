import React from 'react';
import Marquee from "react-fast-marquee";


const listItemData = [
    {
      id: 1,
      label: 'curtains',
    },
    {
      id: 2,
      label: 'single bedsheet',
    },
    {
      id: 3,
      label: 'quilts',
    },
    {
      id: 4,
      label: 'dohar',
    },
    {
      id: 5,
      label: 'double bedsheet',
    },
    {
      id: 6,
      label: 'earthy collection',
    },
    {
      id: 7,
      label: 'cushions',
    },
    {
      id: 8,
      label: 'pillow covers',
    },
  ]

function ItemsMarquee() {
  return (
    <Marquee className='mod-marquee' speed={40} autoFill={true} >
        {listItemData?.map((item, index) => {
            return (
                <div className='mod-marquee__item' key={index}>
                    <span className='mod-marquee__seperator'></span>
                    <label className='mod-marquee__label' key={index}>{item.label}</label>
                </div>
            )
        })}
    </Marquee>
  )
}

export default ItemsMarquee