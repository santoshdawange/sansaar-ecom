import React from 'react'
import { Link } from 'react-router-dom'
import Details from './components/Details'
import ProfileMenu from '@common/components/ProfileMenu';
import ProductTile from '@pages/ProductListing/view/components/ProductTile';


function MyWishlist() {

    const productData = [
        {
            id: 1,
            name: "Melange Single Bedsheet set",
            sp: 4500,
            discountPrice: 3500,
            productImgUrl: 'test-product',
            productColorVariants: [
                {
                    id:1,
                    colorCode: '#6C6159',
                },
                {
                    id:2,
                    colorCode: '#F0EBB8',
                },
                {
                    id:3,
                    colorCode: '#ff0000',
                },
                {
                    id:4,
                    colorCode: '#00ff00',
                },
                {
                    id:5,
                    colorCode: '#0000ff',
                }
            ],
            tag: "New Arrival",
        },
        {
            id: 2,
            name: "Melange Single Bedsheet set 2",
            sp: 4500,
            discountPrice: 3500,
            productImgUrl: 'test-product',
            productColorVariants: [
                {
                    id:1,
                    colorCode: '#6C6159',
                },
                {
                    id:2,
                    colorCode: '#F0EBB8',
                },
                {
                    id:3,
                    colorCode: '#ff0000',
                }
            ],
            tag: "sale",
        },
        {
            id: 3,
            name: "Melange Single Bedsheet set 3",
            sp: 4500,
            discountPrice: 3500,
            productImgUrl: 'test-product',
            productColorVariants: [
                {
                    id:1,
                    colorCode: '#6C6159',
                },
                {
                    id:2,
                    colorCode: '#F0EBB8',
                }
            ],
            tag: "",
        },
        {
            id: 4,
            name: "Melange Single Bedsheet set 4",
            sp: 4500,
            discountPrice: 3500,
            productImgUrl: 'test-product',
            productColorVariants: [
                {
                    id:1,
                    colorCode: '#6C6159',
                },
                {
                    id:2,
                    colorCode: '#F0EBB8',
                },
                {
                    id:3,
                    colorCode: '#ff0000',
                },
                {
                    id:4,
                    colorCode: '#0000ff',
                }
            ],
            tag: "",
        },
    
    ]

  return (
    <div className='bs-section'>
        <div className='lyt-profile'>
            <div className='lyt-profile__header'>
                <Link className='lyt-profile__title'>
                    <span className='icon icon-o-left lyt-profile__title-icon'></span>
                    <span className='lyt-profile__title-text'>your profile</span>
                </Link>
            </div>
            <div className='lyt-profile__body'>
                <ProfileMenu/>
                <div className='lyt-profile__cont-wrap'>
                    <div className='lyt-wishlist'>
                        <div className='lyt-wishlist__header'>
                            <h2 className='lyt-wishlist__title'>wishlist</h2>
                        </div>
                        <div className='lyt-wishlist__body'>
                            <ul className='lyt-wishlist__product-grid'>
                                {productData?.map((item, index) => {
                                    return(
                                        <li className='lyt-wishlist__product-item' key={index}>
                                            <ProductTile
                                                imageUrl={item.productImgUrl}
                                                tagTitle={item.tag}
                                                handleAction={() => {}}
                                                productTitle={item.name}
                                                priceValue={item.discountPrice}
                                                strikePriceValue={item.sp}
                                                colorVariants={item.productColorVariants}
                                                variant={'wishlist'}
                                            />
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyWishlist