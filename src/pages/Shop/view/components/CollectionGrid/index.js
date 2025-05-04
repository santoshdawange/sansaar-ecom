import CollectionTile from '@common/components/CollectionTile';
import React from 'react';

function CollectionGrid({ data }) {
//   console.log('data', data);
  return (
    <div className='lyt-collection-grid'>
        <ul className='lyt-collection-grid__wrap'>
            {data.map((item, index) => {
                return (
                    <li className='lyt-collection-grid__item' key={index}>
                        <CollectionTile
                            imageUrl={item?.imageUrl}
                            title={item?.name}
                            subTitle={item?.subTitle || 'View Collection'}
                            link={item?.link || '/products'}
                        />
                    </li>
                )
            })}
        </ul>
        
    </div>
  )
}

export default CollectionGrid