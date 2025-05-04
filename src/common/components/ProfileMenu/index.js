import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function ProfileMenu() {

    const location = useLocation();

  return (
    <div className='bs-profile-menu lyt-profile__menu-wrap'>
        <h3 className='bs-profile-menu__profile-title'>Hi Shashank,</h3>
        <ul className='bs-profile-menu__menu-list'>
            <li className='bs-profile-menu__menu-item'>
                <Link to='/profile' className={`mod-menu ${location.pathname.includes('profile') ? 'mod-menu--active' : ''}`}>
                    <span className='icon icon-user-circle mod-menu__icon'></span>
                    <span className='mod-menu__text'>details</span>
                </Link>
            </li>
            <li className='bs-profile-menu__menu-item'>
                <Link to='/my-addresses' className={`mod-menu ${location.pathname.includes('my-addresses') ? 'mod-menu--active' : ''}`}>
                    <span className='icon icon-home mod-menu__icon'></span>
                    <span className='mod-menu__text'>addresses</span>
                </Link>
            </li>
            <li className='bs-profile-menu__menu-item'>
                <Link to='/my-orders' className={`mod-menu ${location.pathname.includes('my-orders') ? 'mod-menu--active' : ''}`}>
                    <span className='icon icon-cart-line mod-menu__icon'></span>
                    <span className='mod-menu__text'>orders</span>
                </Link>
            </li>
            <li className='bs-profile-menu__menu-item'>
                <Link to='/my-wishlist' className={`mod-menu ${location.pathname.includes('my-wishlist') ? 'mod-menu--active' : ''}`}>
                    <span className='icon icon-like mod-menu__icon'></span>
                    <span className='mod-menu__text'>wishlist</span>
                </Link>
            </li>
        </ul>
    </div>
  )
}

export default ProfileMenu