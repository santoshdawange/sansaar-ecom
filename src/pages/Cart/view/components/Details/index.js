import React, {useEffect, useState} from 'react';
import {
        Accordion, 
        AccordionSummary, 
        AccordionDetails, 
        TextField, 
        Grid, 
        MenuItem, 
        Select, 
        FormControl, 
        InputLabel
    } from '@mui/material';
import CustomRadio from '@common/components/CustomRadio';
import AddressCard from '../AddressCard';
import OtherBillingAddress from '../OtherBillingAddress';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addAddress, makeAddDefault, updateAddress } from '@common/utils/cart';

const CustomIcon = () => <span className="icon icon-expand-more"></span>;

const shippingAddressListData = [
    {
        id: 1,
        name: 'Shashank Yeole',
        type: 'home',
        address:  'Kanakia zen world , kanjurmarg west, near station road, Kanjurmarg, Mumbai - maharashtra - 400032',
        groupName: 'shippingAddress',
        defaultAddress: true,
    },
    {
        id: 2,
        name: 'Rakesh',
        type: 'other',
        address:  'Kanakia zen world , kanjurmarg west, near station road, Kanjurmarg, Mumbai - maharashtra - 400032',
        groupName: 'shippingAddress',
        defaultAddress: false,
    }
]

function Details({ data, setShippingAddress, setBillingAddress, shippingAddress, billingAddress, fetchAddresses }) {
    console.log('data', data);


    //city dropdown
    const [city, setCity] = useState('');

    const cityHandleChange = (event) => {
        setCity(event.target.value);
    };

    //state dropdown
    const [state, setState] = useState('');

    const stateHandleChange = (event) => {
        setState(event.target.value);
    };

    const addressData = [
        {
            id:1,
            title: 'home'
        },
        {
            id:2,
            title: 'work'
        },
        {
            id:3,
            title: 'other'
        }
    ]

    const [editState, setEditState] = useState(false);
    const [addressType, setAddressType] = useState("");
    const [addressId, setAddressId] = useState(null);
    const [sameAddress, setSameAddress] = useState(true);
    const [selectedAddressId, setSelectedAddressId] = useState(null); // State to track selected address
    const [completeBillingAdd, setCompleteBillingAdd] = useState(null); // State to track selected address

    // Initialize selectedAddressId based on isDefault
    useEffect(() => {
        const defaultAddress = data.find((address) => address.isDefault);
        if (defaultAddress) {
            setSelectedAddressId(defaultAddress.id);
            setShippingAddress(defaultAddress.id);
            if (sameAddress) {
                setBillingAddress(defaultAddress.id);
            }
        }
    }, [data]);

    useEffect(() => {
        if(sameAddress) {
            setBillingAddress(shippingAddress); // Update the billing address if "same as shipping" is checked
        } else {
            setOpen(true);
        }
    }, [sameAddress])

    const handleAddressSelection = (id) => {
        setSelectedAddressId(id); // Update the selected address ID
        setShippingAddress(id); // Update the shipping address
        if (sameAddress) {
            setBillingAddress(id); // Update the billing address if "same as shipping" is checked
        }
    };

    const editHandleChange = (id, type="new") => {
        const storedAddresses = JSON.parse(localStorage.getItem('addresses')) || [];
        const addressToEdit = storedAddresses.find((address) => address.id === id);
        setAddressType(type);
        if (addressToEdit) {
            setAddressId(id);
            formik.setValues({
                firstName: addressToEdit.firstName || '',
                lastName: addressToEdit.lastName || '',
                phone: addressToEdit.phone || '',
                email: addressToEdit.email || '',
                address: addressToEdit.address || '',
                landmark: addressToEdit.landmark || '',
                city: addressToEdit.city || '',
                state: addressToEdit.state || '',
                pincode: addressToEdit.pincode || '',
                tag: addressToEdit.tag || 'home',
                isDefault: addressToEdit.isDefault || false,
            });
        } else {
            console.error('Address not found for the given ID');
        }
        setEditState(true);
    };

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            address: '',
            landmark: '',
            city: '',
            state: '',
            pincode: '',
            tag: 'home', // Default value for "Save Address As"
            isDefault: false,
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('First name is required'),
            lastName: Yup.string().required('Last name is required'),
            phone: Yup.string()
                .required('Mobile number is required')
                .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),
            email: Yup.string().email('Invalid email address'),
            address: Yup.string().required('Full address is required'),
            landmark: Yup.string().required('Locality is required'),
            city: Yup.string().required('City is required'),
            state: Yup.string().required('State is required'),
            pincode: Yup.string()
                .required('Pincode is required')
                .matches(/^[0-9]{6}$/, 'Pincode must be 6 digits'),
            tag: Yup.string().required('Address type is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                // console.log('Form Values:', values);
                let response;
                if(addressType === "update") {
                    response = await updateAddress(values, addressId); // Call the API to add the address
                } else {
                    response = await addAddress(values); // Call the API to add the address
                }
                // console.log('Address added successfully:', response);
                if(response) {
                    fetchAddresses(); // Fetch updated addresses after successful submission
                    resetForm(); // Reset the form after successful submission
                    setEditState(false); // Close the form
                }
            } catch (error) {
                console.error('Error adding address:', error);
            }
        },
    });

    const handleBillingAddressSelection = (id) => {
        console.log('billing address', id)
        // setSameAddress(false);
        setBillingAddress(id); // Update the billing address'
        const storedAddresses = JSON.parse(localStorage.getItem('addresses')) || [];
        setCompleteBillingAdd(storedAddresses.filter((address) => address.id === id));
    }

    const handleChangeDefaultAddress = async (id) => {
        const response = await makeAddDefault(id);
        if(response) {
            fetchAddresses(); // Fetch updated addresses after successful submission
        }
    }
    const [open, setOpen] = useState(false);
    const handleSameAddress = (e) => {  
        setSameAddress(!sameAddress);
    }

  return (
    <div className='bs-user-details'>
        <ul className='bs-user-details__wrap'>
            {editState ? (
                <>
                    <li className='bs-user-details__item'>
                        <Accordion defaultExpanded className='bs-user-details__panel'>
                            <AccordionSummary
                            expandIcon={<span className='icon icon-expand-more'></span>}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            className='bs-user-details__panel-head'
                            >
                                <h4 className='bs-user-details__panel-title'>
                                    <span className='icon icon-user-circle bs-user-details__icon'></span>
                                    <span className='bs-user-details__text'>personal details</span>
                                </h4>
                            </AccordionSummary>
                            <AccordionDetails className='bs-user-details__panel-cont'>
                                <form className="bs-form bs-form--typ-column" onSubmit={formik.handleSubmit}>
                                    <Grid container columnSpacing={4.8} rowSpacing={3.2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                id="firstName"
                                                name="firstName"
                                                label="First Name"
                                                value={formik.values.firstName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                                helperText={formik.touched.firstName && formik.errors.firstName}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                id="lastName"
                                                name="lastName"
                                                label="Last Name"
                                                value={formik.values.lastName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                                helperText={formik.touched.lastName && formik.errors.lastName}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                id="phone"
                                                name="phone"
                                                label="Mobile Number"
                                                value={formik.values.phone}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.phone && Boolean(formik.errors.phone)}
                                                helperText={formik.touched.phone && formik.errors.phone}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                id="email"
                                                name="email"
                                                label="Email ID"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.email && Boolean(formik.errors.email)}
                                                helperText={formik.touched.email && formik.errors.email}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="address"
                                                name="address"
                                                label="Full Address"
                                                value={formik.values.address}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.address && Boolean(formik.errors.address)}
                                                helperText={formik.touched.address && formik.errors.address}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                id="landmark"
                                                name="landmark"
                                                label="Locality / Town"
                                                value={formik.values.landmark}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.landmark && Boolean(formik.errors.landmark)}
                                                helperText={formik.touched.landmark && formik.errors.landmark}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                id="city"
                                                name="city"
                                                label="City"
                                                value={formik.values.city}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.city && Boolean(formik.errors.city)}
                                                helperText={formik.touched.city && formik.errors.city}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                id="state"
                                                name="state"
                                                label="State"
                                                value={formik.values.state}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.state && Boolean(formik.errors.state)}
                                                helperText={formik.touched.state && formik.errors.state}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                id="pincode"
                                                name="pincode"
                                                label="Pincode"
                                                value={formik.values.pincode}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                                                helperText={formik.touched.pincode && formik.errors.pincode}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12} container className="bs-form__selection-action-wrap">
                                            <Grid item xs={6}>
                                                <div className="bs-form__form-group">
                                                    <label className="bs-form__field-label">Save Address As</label>
                                                    <ul className="lyt-radio-list">
                                                        {['home', 'work', 'other'].map((type, index) => (
                                                            <li className="lyt-radio-list__item" key={index}>
                                                                <CustomRadio
                                                                    title={type}
                                                                    groupName="tag"
                                                                    itemId={`tag__${type}`}
                                                                    variant="capsule"
                                                                    defaultValue={formik.values.tag}
                                                                    onChange={() => formik.setFieldValue('tag', type)}
                                                                />
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </Grid>
                                            <Grid item xs={6} className="cm-align-bottom-end">
                                                <div className="bs-checkbox bs-detail-info__accept-coupon">
                                                    <input
                                                        type="checkbox"
                                                        id="isDefault"
                                                        name="isDefault"
                                                        checked={formik.values.isDefault}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <label
                                                        className="bs-checkbox__label bs-detail-info__accept-coupon-label"
                                                        htmlFor="isDefault"
                                                    >
                                                        Make this as Default Address
                                                    </label>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <button type="submit" className="bs-btn bs-btn__btn-solid bs-btn__btn-solid--typ-l">
                                                Submit
                                            </button>
                                            <button type="button" className="bs-btn bs-btn__btn-solid bs-btn__btn-solid--typ-l" onClick={() => setEditState(false)} style={{ marginLeft: '10px' }}>
                                                Back
                                            </button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </AccordionDetails>
                        </Accordion>
                    </li>
                    {/* <li className='bs-user-details__item'>
                        <Accordion defaultExpanded className='bs-user-details__panel'>
                            <AccordionSummary
                            expandIcon={<span className='icon icon-expand-more'></span>}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            className='bs-user-details__panel-head'
                            >
                                <h4 className='bs-user-details__panel-title'>
                                    <span className='icon icon-home bs-user-details__icon'></span>
                                    <span className='bs-user-details__text'>shipping details</span>
                                </h4>
                            </AccordionSummary>
                            <AccordionDetails className='bs-user-details__panel-cont'>
                                
                                <form className='bs-form bs-form--typ-column'>
                                    <Grid container columnSpacing={4.8} rowSpacing={3.2}>
                                        <Grid item xs={12}>
                                            <div className={`bs-form__form-group`}>
                                                <TextField 
                                                    id="firstName"
                                                    name="firstName"
                                                    type="text"
                                                    label="full address" 
                                                    className='bs-form__form-control' 
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div className={`bs-form__form-group`}>
                                                <TextField 
                                                    id="firstName"
                                                    name="firstName"
                                                    type="text"
                                                    label="locality / town" 
                                                    className='bs-form__form-control' 
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className={`bs-form__form-group`}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">City</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={city}
                                                        label="city"
                                                        onChange={cityHandleChange}
                                                        // IconComponent={CustomIcon}
                                                    >
                                                        <MenuItem value={10}>Ten</MenuItem>
                                                        <MenuItem value={20}>Twenty</MenuItem>
                                                        <MenuItem value={30}>Thirty</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className={`bs-form__form-group`}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">state</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={state}
                                                        label="state"
                                                        onChange={stateHandleChange}
                                                        // IconComponent={<span className='icon icon-expaand-more'></span>}
                                                    >
                                                        <MenuItem value={10}>Ten</MenuItem>
                                                        <MenuItem value={20}>Twenty</MenuItem>
                                                        <MenuItem value={30}>Thirty</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className={`bs-form__form-group`}>
                                                <TextField 
                                                    id="firstName"
                                                    name="firstName"
                                                    type="text"
                                                    label="pincode *" 
                                                    className='bs-form__form-control' 
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} container className='bs-form__selection-action-wrap'>
                                            <Grid item xs={6}>
                                                <div className={`bs-form__form-group`}>
                                                    <label className='bs-form__field-label'>save address as</label>
                                                    <ul className='lyt-radio-list'>
                                                        {addressData.map((item, index) => {
                                                            return (
                                                                <li className='lyt-radio-list__item' key={index}>
                                                                    <CustomRadio
                                                                        title={item.title}
                                                                        groupName='address'
                                                                        itemId={`${item.title}__${index}`}
                                                                        variant={'capsule'}
                                                                    />
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                </div>
                                            </Grid>
                                            <Grid item xs={6} className='cm-align-bottom-end'>
                                                <div className='bs-checkbox bs-detail-info__accept-coupon' >
                                                    <input 
                                                        type="checkbox" 
                                                        id="defaultAddress"
                                                        name="defaultAddress"
                                                    />
                                                    <label className="bs-checkbox__label bs-detail-info__accept-coupon-label" htmlFor="defaultAddress">Make this as Default Address</label>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </form>

                            </AccordionDetails>
                        </Accordion>
                    </li> */}
                </>
            ) : (<>
                <li className='bs-user-details__item'>
                    <Accordion defaultExpanded className='bs-user-details__panel'>
                        <AccordionSummary
                        expandIcon={<span className='icon icon-expand-more'></span>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        className='bs-user-details__panel-head'
                        >
                            <h4 className='bs-user-details__panel-title'>
                                <span className='icon icon-home bs-user-details__icon'></span>
                                <span className='bs-user-details__text'>shipping address</span>
                            </h4>
                        </AccordionSummary>
                        <AccordionDetails className='bs-user-details__panel-cont'>
                            <ul className='lyt-adress'>
                                {data.map((item, index) => {
                                    return (
                                        <li className='lyt-adress__item' key={index}>
                                            <AddressCard
                                                id={item?.id}
                                                name={`${item?.firstName} ${item?.lastName}` || ''}
                                                address={item?.address}
                                                type={item?.tag}
                                                groupName={"shippingAddress"}
                                                index={index}
                                                isDefault={item?.isDefault}
                                                isChecked={selectedAddressId === item?.id} // Check if this address is selected
                                                onClick={() => editHandleChange(item?.id, "update")}
                                                handleChangeAddress={() => handleAddressSelection(item?.id)} // Handle address selection
                                                handleChangeDefaultAddress={handleChangeDefaultAddress}
                                            />
                                        </li>
                                    )
                                })}
                            </ul>
                            {!editState &&
                                <button className='bs-btn bs-btn__btn-border bs-btn__btn-border--typ-rounded-box bs-form__action-btn' onClick={editHandleChange}>
                                    <span className='bs-btn__icon icon icon-increment'></span>
                                    <span className='bs-btn__btn-text'>add new address</span>
                                </button>
                            }
                        </AccordionDetails>
                    </Accordion>
                </li>
                <li className='bs-user-details__item'>
                    <div className='bs-user-details__panel bs-user-details__panel--typ-simple'>
                        <div className='bs-user-details__panel-head'>
                            <h4 className='bs-user-details__panel-title'>
                                <span className='bs-user-details__text'>billing address</span>
                            </h4>
                        </div>
                        <div className='bs-user-details__panel-cont'>
                            <div className='bs-form__action-wrap'>
                                <ul className='bs-form__action-wrap__list'>
                                    <li className='bs-form__action-wrap__item'>
                                        <div className='bs-checkbox bs-detail-info__accept-coupon' >
                                            <input 
                                                type="checkbox" 
                                                id="billingAddress"
                                                name="billingAddress"
                                                checked={sameAddress}
                                                onChange={handleSameAddress} // Handle checkbox change
                                            />
                                            <label className="bs-checkbox__label bs-checkbox__label--regular-uppercase bs-detail-info__accept-coupon-label" htmlFor="billingAddress">use same for billing address</label>
                                        </div>
                                    </li>
                                    <li className='bs-form__action-wrap__item'>
                                        <OtherBillingAddress 
                                            data={data}
                                            selectedAddressId={selectedAddressId}
                                            handleChangeBillingAddress={handleBillingAddressSelection} // Handle address selection
                                            open={open}
                                            setOpen={setOpen}
                                        />
                                    </li>
                                </ul>
                            </div>
                            <div className='bs-form__action-wrap'>
                                {!sameAddress && completeBillingAdd?.length > 0 &&
                                    <ul className='lyt-adress'>
                                        {completeBillingAdd.map((item, index) => {
                                            return (
                                                <li className='lyt-adress__item' key={index}>
                                                    <AddressCard
                                                        id={item?.id}
                                                        name={`${item?.firstName} ${item?.lastName}` || ''}
                                                        address={item?.address}
                                                        type={item?.tag}
                                                        groupName={"showBillingAddress"}
                                                        index={index}
                                                        isDefault={item?.isDefault}
                                                        isChecked={selectedAddressId === item?.id} // Check if this address is selected
                                                        onClick={() => editHandleChange(item?.id, "update")}
                                                        handleChangeAddress={() => handleAddressSelection(item?.id)} // Handle address selection
                                                        handleChangeDefaultAddress={handleChangeDefaultAddress}
                                                    />
                                                </li>
                                            )
                                        })}
                                    </ul>
                                }
                            </div>
                        </div>
                    </div>
                </li>
            </>)}
        </ul>
    </div>
  )
}

export default Details