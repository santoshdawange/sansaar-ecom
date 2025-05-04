import React from 'react'
import { Link } from 'react-router-dom'
import Details from './components/Details'
import ProfileMenu from '@common/components/ProfileMenu';


function Profile() {

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
                    <Details/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile