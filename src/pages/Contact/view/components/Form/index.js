import React, { useEffect, useRef, useState } from 'react'
import {TextField, MenuItem, FormControl, Select, InputLabel} from '@mui/material';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import apiUrl from '@common/utils/apiURL';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

const businessOptions = [
    {
        value: 'customer',
        label: 'Customer'
    },
    {
        value: 'trade',
        label: 'Trade'
    },
    {
        value: 'architect',
        label: 'Architect'
    },
    {
        value: 'interior_designer',
        label: 'Interior Designer'
    },
    {
        value: 'media',
        label: 'Media'
    },
    {
        value: 'others',
        label: 'Others'
    }
];

const subjectOptions = [
    {
        value: 'stock_availability',
        label: 'Stock Availability'
    },
    {
        value: 'trade_enquiry',
        label: 'Trade Enquiry'
    },
    {
        value: 'franchise_enquiry',
        label: 'Franchise Enquiry'
    },
    {
        value: 'project_enquiry',
        label: 'Project Enquiry'
    },
    {
        value: 'media_enquiry',
        label: 'Media Enquiry'
    },
    {
        value: 'others',
        label: 'Others'
    }
]


function Form() {
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const recaptchaRef = useRef(null);
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            business: '',
            subject: '',
            city: '',
            message: '',
            terms: false,
            recaptcha: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            phone: Yup.string().matches(/^[0-9]{10}$/, 'Must be a valid phone number').required('Required'),
            business: Yup.string().required('Required'),
            subject: Yup.string().required('Required'),
            city: Yup.string().required('Required'),
            message: Yup.string().max(500, 'Must be 500 characters or less').required('Required'),
            terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions').required('Required'),
            recaptcha: Yup.string().required('reCAPTCHA is required'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            const response = {
                first_name: values.firstName,
                last_name: values.lastName,
                email: values.email,
                phone: values.phone,
                business: values.business,
                subject: values.subject,
                city: values.city,
                message: values.message,
            };

            
            const contactUsURL = apiUrl.contactUs;
            await axios.post(contactUsURL, response)  

            .then((response) => {
                if(response.status === 200) {
                    formik.resetForm();
                    setOpenConfirmationModal(true);
                    recaptchaRef.current.reset();

                    setTimeout(() => {
                        setOpenConfirmationModal(false);
                    }, 1500)
                }
            })
            .catch((error) => {
                console.log('contact us form request failed', error);
            })
        },
    });
    
    const handleOpenConfirmationModal = () => {
        setOpenConfirmationModal(true);
    }
    
    const handleCloseConfirmationModal = () => {
        setOpenConfirmationModal(false);
    }

    return (
        <>
            <div className='bs-section'>
                <div className='bs-section__section-head'>
                    <h2 className='bs-section__title'>CONTACT US</h2>
                </div>
                <div className='bs-section__section-cont'>
                    <p className='bs-section__desc'>Our team will connect with you as soon as possible!</p>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='bs-form'>
                            <div className={`bs-form__form-group ${formik.touched.firstName && formik.errors.firstName ? 'bs-form__error' : ''}`}>
                                <TextField 
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.firstName}
                                    label="First Name" 
                                    className='bs-form__form-control' 
                                />
                                {formik.touched.firstName && formik.errors.firstName ? (
                                    <div className='bs-form__error-text'>{formik.errors.firstName}</div>
                                ) : null}
                                {/* <label className='bs-form__error-text'>Enter first name</label> */}
                            </div>
                            <div className={`bs-form__form-group ${formik.touched.lastName && formik.errors.lastName ? 'bs-form__error' : ''}`}>
                                <TextField 
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.lastName}
                                    label="Last Name" 
                                    className='bs-form__form-control' 
                                />
                                {formik.touched.lastName && formik.errors.lastName ? (
                                    <div className='bs-form__error-text'>{formik.errors.lastName}</div>
                                ) : null}
                            </div>
                            <div className={`bs-form__form-group ${formik.touched.email && formik.errors.email ? 'bs-form__error' : ''}`}>
                                <TextField 
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    label="E-mail" 
                                    className='bs-form__form-control' 
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className='bs-form__error-text'>{formik.errors.email}</div>
                                ) : null}
                            </div>
                            <div className={`bs-form__form-group ${formik.touched.phone && formik.errors.phone ? 'bs-form__error' : ''}`}>
                                <TextField
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.phone}
                                    label="Phone" 
                                    className='bs-form__form-control' 
                                />
                                {formik.touched.phone && formik.errors.phone ? (
                                    <div className='bs-form__error-text'>{formik.errors.phone}</div>
                                ) : null}
                            </div>
                            <div className={`bs-form__form-group ${formik.touched.business && formik.errors.business ? 'bs-form__error' : ''}`}>
                                <FormControl fullWidth>
                                    <InputLabel id="business">Business</InputLabel>
                                    <Select
                                        labelId="business"
                                        id="business"
                                        name="business"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.business}
                                        label="Business"
                                        IconComponent={(props) => (
                                            <span
                                                {...props}
                                                className={`icon icon-angle-down ${props.className}`}
                                            ></span>
                                        )}
                                        MenuProps={{
                                            classes: {
                                                paper: "bs-menu-dropdown",
                                            },
                                        }}
                                    >
                                        {businessOptions.map((item, index) => {
                                            return <MenuItem value={item.value} key={index}>{item.label}</MenuItem>
                                        })}
                                    </Select>
                                    {formik.touched.business && formik.errors.business ? (
                                        <div className='bs-form__error-text'>{formik.errors.business}</div>
                                    ) : null}
                                </FormControl>
                            </div>
                            <div className={`bs-form__form-group ${formik.touched.subject && formik.errors.subject ? 'bs-form__error' : ''}`}>
                                <FormControl fullWidth>
                                    <InputLabel id="subject">Subject</InputLabel>
                                    <Select
                                        labelId="subject"
                                        id="subject"
                                        name="subject"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.subject}
                                        label="Subject"
                                        IconComponent={(props) => (
                                            <span
                                                {...props}
                                                className={`icon icon-angle-down ${props.className}`}
                                            ></span>
                                        )}
                                        MenuProps={{
                                            classes: {
                                                paper: "bs-menu-dropdown",
                                            },
                                        }}
                                    >
                                        {subjectOptions.map((item, index) => {
                                            return <MenuItem value={item.value} key={index}>{item.label}</MenuItem>
                                        })}
                                    </Select>
                                    {formik.touched.subject && formik.errors.subject ? (
                                        <div className='bs-form__error-text'>{formik.errors.subject}</div>
                                    ) : null}
                                </FormControl>
                            </div>
                            <div className={`bs-form__form-group ${formik.touched.city && formik.errors.city ? 'bs-form__error' : ''}`}>
                                <TextField 
                                    id="city"
                                    name="city"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.city}
                                    label="City" 
                                    className='bs-form__form-control' 
                                />
                                {formik.touched.city && formik.errors.city ? (
                                    <div className='bs-form__error-text'>{formik.errors.city}</div>
                                ) : null}
                                {/* <label className='bs-form__error-text'>Enter first name</label> */}
                            </div>
                            <div className={`bs-form__form-group bs-form__form-group--full-width textarea ${formik.touched.message && formik.errors.message ? 'bs-form__error' : ''}`}>
                                <TextField 
                                    id="message"
                                    name="message"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.message}
                                    label="Message" 
                                    className='bs-form__form-control bs-form__form-control--text-area' 
                                    multiline 
                                />
                                {formik.touched.message && formik.errors.message ? (
                                    <div className='bs-form__error-text'>{formik.errors.message}</div>
                                ) : null}
                            </div>
                            <div className={`bs-form__form-bottom-wrap ${formik.touched.terms && formik.errors.terms ? 'bs-form__error' : ''}`}>
                                <div className='bs-checkbox'>
                                    <input 
                                        type="checkbox" 
                                        id="terms"
                                        name="terms"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        checked={formik.values.terms}
                                    />
                                    <label className="bs-checkbox__label" htmlFor="terms">I agree to <Link to="/tnc" className='bs-checkbox__link'>terms & Conditions</Link></label>
                                    {formik.touched.terms && formik.errors.terms ? (
                                        <div className='bs-form__error-text'>{formik.errors.terms}</div>
                                    ) : null}
                                </div>
                                <div className={`${formik.touched.recaptcha && formik.errors.recaptcha ? 'bs-form__error' : ''}`}>
                                    <ReCAPTCHA
                                        ref={recaptchaRef}
                                        sitekey="6LcSFQsqAAAAAJPkl0Nyx8wH7UMvWVxMTK9O50yd"
                                        onChange={(value) => formik.setFieldValue('recaptcha', value)}
                                    />
                                    {formik.touched.recaptcha && formik.errors.recaptcha ? (
                                        <div className='bs-form__error-text'>{formik.errors.recaptcha}</div>
                                    ) : null}
                                </div>
                                <button className='bs-btn bs-btn__btn-solid' type='submit' disabled={formik.isSubmitting}>Send</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Modal
                open={openConfirmationModal}
                onClose={handleCloseConfirmationModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='bs-modal bs-modal--typ-sm'
            >
                <Box className='bs-modal__wrapper' sx={style}>
                    <div className='bs-modal__content'>
                        <div className='mod-message'>
                            <span className='icon icon-check-circle mod-message__icon'></span>
                            <p className='mod-message__title'>Thank you for contacting us</p>
                            <p className='mod-message__desc'>We will get back to you shortly</p>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default Form