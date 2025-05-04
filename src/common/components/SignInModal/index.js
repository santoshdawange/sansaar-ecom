import React, { useState } from 'react';
import {Modal, Box, TextField} from '@mui/material';
import companyLogo from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import apiUrl from '@common/utils/apiURL';
import { toast } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  };

function SignInModal() {
  const [userState, setUserState] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    mobileNumber: '',
    emailId: ''
  });


  const handleBackdropClick = (event) => {
    // Prevent close when the backdrop is clicked
    event.stopPropagation();
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleModalClose = (event, reason) => {
    // This is where you can handle close when clicking the modal button, etc.
    if (reason === 'backdropClick') {
      // Do nothing to prevent closing on backdrop click
      return;
    }
    handleClose();
  };

  const [showSignUp, setShowSignUp] = useState(false);

  const showSignUpModalHandle = () => {
    setShowSignUp(true);
  }

  const showSignInModalHandle = () => {
    setShowSignUp(false);
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    // Handle sign in logic here
    const response = {
      "email": userState.username,
      "password": userState.password,
    }
    console.log('Sign In:', userState);
    const signInURL = apiUrl.auth.login;
    await axios.post(signInURL, response)  
    .then((response) => {
        if(response.status === 200) {
          document.cookie = `access_token=${response.data.accessToken}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`;
          toast.success('Logged In Successfully!');
          handleClose();
        }
    })
    .catch((error) => {
        toast.error('sign in request failed, please try again');
        console.log('sign in form request failed', error);
    })
  }

  return (
    <>
        <button className='bs-btn bs-btn__btn-icon bs-header__action cm-hidden-flex-xs' onClick={handleOpen}>
          <span className='icon icon-user'></span>
        </button>
        <Modal
            open={open}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='bs-modal bs-modal--typ-form'
            
          >
            <Box className='bs-modal__wrapper' sx={style} onClick={handleBackdropClick}>
                <div className='bs-modal__head-wrap'>
                  <Link to="/" className='bs-modal__logo'>
                    <img width="100%" height="100%" src={companyLogo} alt="Company logo" />
                  </Link>
                  <h2 className='bs-modal__title'>{!showSignUp ? 'signin' : 'signup'}</h2>
                </div>
                {/* <button className='bs-btn bs-btn__btn-icon bs-modal__close' onClick={handleClose}>
                  <span className='icon icon-close'></span>
                </button> */}
                {!showSignUp ? (
                  <>
                  <div className='bs-modal__content'>
                      <form className='bs-form bs-form--typ-column'>
                        <div className={`bs-form__form-group`}>
                          <TextField 
                            id="username"
                            name="username"
                            value={userState.username}
                            onChange={(e) => setUserState({ ...userState, username: e.target.value })}
                            type="text"
                            label="email / mobile number" 
                            className='bs-form__form-control' 
                          />
                        </div>
                        <div className={`bs-form__form-group`}>
                          <TextField 
                            id="password"
                            name="password"
                            value={userState.password}
                            onChange={(e) => setUserState({ ...userState, password: e.target.value })}
                            type="text"
                            label="password" 
                            className='bs-form__form-control' 
                          />
                          {/* <label className='bs-form__error-text'></label> */}
                        </div>
                        {/* <div className={`bs-form__form-group`}>
                          <TextField 
                            id="firstName"
                            name="password"
                            type="password"
                            label="password" 
                            className='bs-form__form-control' 
                          />
                        </div> */}
                        <div className={`bs-form__form-bottom-wrap`}>
                          <button className='bs-btn bs-btn__btn-solid bs-btn__btn-solid--typ-xxl' onClick={handleSignIn}>continue</button>
                          <label className='bs-form__action-separator'>or</label>
                          <button className='bs-btn bs-btn__btn-border bs-btn__btn-icon-text' type='submit'>
                            <span className='bs-btn__icon icon-google'></span>
                            <span className='bs-btn__btn-text'>sign in with google</span>
                          </button>
                        </div>
                      </form>
                  </div>
                  <div className='bs-modal__footer-wrap'>
                    <button className='bs-btn bs-btn__btn-solid bs-btn__btn-solid--typ-xxl bs-btn__btn-solid--inverse-border'>continue as a guest</button>
                    <button class="bs-btn bs-btn__btn-icon-solid bs-btn__btn-icon-solid--typ-xxl" onClick={showSignUpModalHandle}><span class="bs-btn__btn-text">sign up</span></button>
                  </div>
                </>
                ) : (
                  <>
                    <div className='bs-modal__content'>
                      <form className='bs-form bs-form--typ-column'>
                        <div className={`bs-form__form-group`}>
                          <TextField 
                            id="firstName"
                            name="firstName"
                            type="text"
                            label="first name" 
                            className='bs-form__form-control' 
                          />
                          {/* <label className='bs-form__error-text'></label> */}
                        </div>
                        <div className={`bs-form__form-group`}>
                          <TextField 
                            id="firstName"
                            name="firstName"
                            type="text"
                            label="last name" 
                            className='bs-form__form-control' 
                          />
                          {/* <label className='bs-form__error-text'></label> */}
                        </div>
                        <div className={`bs-form__form-group`}>
                          <TextField 
                            id="firstName"
                            name="firstName"
                            type="text"
                            label="mobile number" 
                            className='bs-form__form-control' 
                          />
                          {/* <label className='bs-form__error-text'></label> */}
                        </div>
                        <div className={`bs-form__form-group`}>
                          <TextField 
                            id="firstName"
                            name="firstName"
                            type="text"
                            label="email id" 
                            className='bs-form__form-control' 
                          />
                          {/* <label className='bs-form__error-text'></label> */}
                        </div>
                        <div className={`bs-form__form-bottom-wrap`}>
                          <button className='bs-btn bs-btn__btn-solid bs-btn__btn-solid--typ-xxl' type='submit' >continue</button>
                        </div>
                      </form>
                  </div>
                  <div className='bs-modal__footer-wrap'>
                    <button className='bs-btn bs-btn__btn-solid bs-btn__btn-solid--typ-xxl bs-btn__btn-solid--inverse-border' onClick={showSignInModalHandle}>sign in</button>
                  </div>
                </>
                )}
            </Box>
        </Modal>
        
    </>
  )
}

export default SignInModal