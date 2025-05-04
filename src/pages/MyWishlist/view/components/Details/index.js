import React, { useState } from 'react';
import {
    TextField, 
    Grid, 
} from '@mui/material';

function Details() {

    const [editable, setEditable] = useState(false);

    const editableHandleChange = () => {
        if(editable){
            setEditable(false);
        }else{
            setEditable(true);
        }
    }

  return (
    <div className='bs-details'>
        <div className='bs-details__header'>
            <h2 className='bs-details__title'>personal details</h2>
            <button className='bs-btn bs-btn__btn-icon-link bs-btn__btn-icon-link--decoration-underline' onClick={editableHandleChange}>
                <span className='bs-btn__icon icon icon-edit'></span>
                <span className='bs-btn__btn-text'>edit details</span>
            </button>
        </div>
        <div className='bs-details__body'>
            {!editable ? (
            <div className='bs-details__info-wrap'>
                <Grid container columnSpacing={4.8} rowSpacing={3.2}>
                    <Grid item xs={6}>
                        <label className='bs-details__info-label'>first name</label>
                        <p className='bs-details__info-value'>shashank</p>
                    </Grid>
                    <Grid item xs={6}>
                        <label className='bs-details__info-label'>last name</label>
                        <p className='bs-details__info-value'>patil</p>  
                    </Grid>
                    <Grid item xs={6}>
                        <label className='bs-details__info-label'>mobile number</label>
                        <p className='bs-details__info-value'>+91 9898989898</p>
                    </Grid>
                    <Grid item xs={6}>
                        <label className='bs-details__info-label'>email id</label>
                        <p className='bs-details__info-value bs-details__info-value--text-initail'>abc@pqr.xyz</p>
                    </Grid>
                </Grid>
            </div>
            ) : (
            <div className='bs-details__form-wrap'>
                <form className='bs-form bs-form--typ-column'>
                    <Grid container columnSpacing={4.8} rowSpacing={3.2}>
                        <Grid item xs={6}>
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
                        </Grid>
                        <Grid item xs={6}>
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
                        </Grid>
                        <Grid item xs={6}>
                            <div className={`bs-form__form-group`}>
                                <TextField 
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    label="mobile number *" 
                                    className='bs-form__form-control' 
                                />
                                {/* <label className='bs-form__error-text'></label> */}
                            </div>
                        </Grid>
                        <Grid item xs={6}>
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
                        </Grid>
                    </Grid>
                </form>
            </div>
            )}
        </div>
    </div>
  )
}

export default Details