import React from 'react'
import { Link } from 'react-router-dom'
import ProfileMenu from '@common/components/ProfileMenu';
import OrderCard from './components/OrderCard';


function MyOrders() {

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
                    <div className='lyt-order'>
                        <div className='lyt-order__header'>
                            <h2 className='lyt-order__title'>my orders</h2>
                        </div>
                        <div className='lyt-order__body'>
                            <ul className='lyt-order__list'>
                                <li className='lyt-order__list-item'>
                                    <OrderCard status={'pending'} />
                                </li>
                                <li className='lyt-order__list-item'>
                                    <OrderCard status={'delivered'} />
                                </li>
                                <li className='lyt-order__list-item'>
                                    <OrderCard status={'cancelled'} />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyOrders