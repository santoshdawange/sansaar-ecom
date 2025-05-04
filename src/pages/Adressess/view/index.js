import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ProfileMenu from '@common/components/ProfileMenu';
import AddressCard from '@pages/Cart/view/components/AddressCard';
import {
    TextField, 
    Grid, 
    MenuItem, 
    Select, 
    FormControl, 
    InputLabel
} from '@mui/material';
import CustomRadio from '@common/components/CustomRadio';

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


function Addressess() {

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

    const [addNewAddress, setAddNewAddress] = useState(false);

    const addNewAddressHandleChange = () => {
        setAddNewAddress(true);
    }

    const saveNewAddressHandleChange = () => {
        setAddNewAddress(false);
    }

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
                    <div className='lyt-manage-address'>
                        <ul className='lyt-manage-address__wrap'>
                            {!addNewAddress ? (
                            <li className='lyt-manage-address__section-item'>
                                <div className='lyt-manage-address__title-wrap'>
                                    <h2 className='lyt-manage-address__title'>
                                        <span className='icon icon lyt-manage-address__title-icon'></span>
                                        <span className='lyt-manage-address__title-text'>manage address</span>
                                    </h2>
                                </div>
                                <div className='lyt-manage-address__cont-wrap'>
                                    <ul className='lyt-adress'>
                                        {shippingAddressListData.map((item, index) => {
                                            return (
                                                <li className='lyt-adress__item' key={index}>
                                                    <AddressCard
                                                        name={item.name}
                                                        address={item.address}
                                                        type={item.type}
                                                        groupName={item.groupName}
                                                        index={index}
                                                        variant={'no-radio'}
                                                    />
                                                </li>
                                            )
                                        })}
                                    </ul>
                                    <button className='bs-btn bs-btn__btn-border bs-btn__btn-border--typ-rounded-box bs-form__action-btn' onClick={addNewAddressHandleChange}>
                                        <span className='bs-btn__icon icon icon-increment'></span>
                                        <span className='bs-btn__btn-text'>add new address</span>
                                    </button>
                                </div>
                            </li>
                            ) : (
                            <li className='lyt-manage-address__section-item'>
                                <div className='lyt-manage-address__title-wrap'>
                                    <h2 className='lyt-manage-address__title'>
                                        <span className='icon icon-home lyt-manage-address__title-icon'></span>
                                        <span className='lyt-manage-address__title-text'>add new address</span>
                                    </h2>
                                </div>
                                <div className='lyt-manage-address__cont-wrap'>
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
                                                {/* <label className='bs-form__error-text'></label> */}
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
                                                    {/* <label className='bs-form__error-text'></label> */}
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
                                                    {/* <label className='bs-form__error-text'></label> */}
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
                                                    {/* <label className='bs-form__error-text'></label> */}
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
                                            <Grid item xs={12}>
                                                <buttonn className='bs-btn bs-btn__btn-solid bs-btn__btn-solid--typ-xxl' onClick={saveNewAddressHandleChange}>save</buttonn>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </div>
                            </li>
                            )}
                        </ul>    
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Addressess