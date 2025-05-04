import ProductTag from '@pages/ProductListing/view/components/ProductTag'
import React, {useState} from 'react'
import { inrFormat } from '@common/utils/formatCurrency';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import { format } from '@cloudinary/url-gen/actions/delivery';
import ProgressTracker from '../ProgressTracker';
import {Modal, Box, TextField, 
    MenuItem, 
    Select, 
    FormControl, 
    InputLabel
} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
};

function OrderCard({status}) {

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
    


    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dci1aiukm'
        }
    });

    const myImage = cld.image('P0037-AMORIA-LIGHT_SILVER_-1').quality('auto').delivery(format('webp'));

     //state dropdown
     const [state, setState] = useState('');

     const stateHandleChange = (event) => {
         setState(event.target.value);
     };

  return (
    <>
        <div className='bs-order-card'>
            <div className='bs-order-card__head-wrap'>
            {status === 'pending' &&
                <div className='bs-order-card__title-wrap'>
                    <h2 className='bs-order-card__title'>
                        <span className='bs-order-card__title-text'>in progress</span>
                    </h2>
                    <ProgressTracker/>
                </div>
            }
            {status === 'delivered' &&
                <div className='bs-order-card__title-wrap'>
                    <h2 className='bs-order-card__title'>
                        <span className='icon icon-check-circle bs-order-card__icon'></span>
                        <span className='bs-order-card__title-text'>delivered</span>
                    </h2>
                </div>
            }
            {status === 'cancelled' &&
                <div className='bs-order-card__title-wrap'>
                    <h2 className='bs-order-card__title'>
                        <span className='icon icon-forbidden bs-order-card__icon'></span>
                        <span className='bs-order-card__title-text'>order cancelled</span>
                    </h2>
                </div>
            }
            {status === 'cancelled' ? null : 
                <div className='bs-order-card__action-wrap'>
                    <ul className='bs-order-card__action-list'>
                        {status === 'pending' && 
                        <li className='bs-order-card__action-item'>
                            <button className='bs-btn bs-btn__btn-icon-link bs-btn__btn-icon-link--decoration-underline bs-address-card__button' onClick={handleOpen}>
                                <span className='bs-btn__btn-text'>cancel order</span>
                            </button>
                        </li>
                        }
                        {status === 'delivered' &&
                        <li className='bs-order-card__action-item'>
                            <button className='bs-btn bs-btn__btn-icon-link bs-btn__btn-icon-link--decoration-underline bs-address-card__button'>
                                <span className='bs-btn__btn-text'>return/replace</span>
                            </button>
                        </li>
                        }
                        <li className='bs-order-card__action-item'>
                            <button className='bs-btn bs-btn__btn-icon-link bs-btn__btn-icon-link--decoration-underline bs-address-card__button'>
                                <span className='icon icon-invoice-download bs-btn__icon'></span>
                                <span className='bs-btn__btn-text'>download invoice</span>
                            </button>
                        </li>
                    </ul>
                </div>
                }
            </div>
            <div className='bs-order-card__info-wrap'>
                <div className='bs-order-card__order-info-wrap'>
                    <ul className='bs-order-card__order-info-data-wrap'>
                        <li className='bs-order-card__order-info-data-item'>
                            <label className='bs-order-card__order-info-data-label'>order id :</label>
                            <p className='bs-order-card__order-info-data-value'>121435195150135</p>
                        </li>
                        <li className='bs-order-card__order-info-data-item'>
                            <label className='bs-order-card__order-info-data-label'>placed on :</label>
                            <p className='bs-order-card__order-info-data-value'>12 Nov, 2025</p>
                        </li>
                        <li className='bs-order-card__order-info-data-item'>
                            <label className='bs-order-card__order-info-data-label'>order total :</label>
                            <p className='bs-order-card__order-info-data-value bs-order-card__order-info-data-value--bold'>{inrFormat(2200)}</p>
                        </li>
                    </ul>
                </div>
                <div className={`bs-order-card__product-info-wrap ${status === 'cancelled' ? 'bs-order-card__product-info-wrap--no-bottom-border' : ''}`}>
                    <ul className='bs-order-card__product-list'>
                        <li className='bs-order-card__product-item'>
                            <div className='bs-order-card__product'>
                                <div className='bs-order-card__product-media-wrap'>
                                    <AdvancedImage cldImg={myImage} loading="lazy" className='bs-order-card__product-image'/>
                                </div>
                                <div className='bs-order-card__product-detail-wrap'>
                                    <label className='bs-order-card__product-type'>bedsheet set</label>
                                    <h3 className='bs-order-card__product-title'>Melange luxe Pillow Covers</h3>
                                    <p className='bs-order-card__product-size-info'><span className='bs-order-card__product-size-info--bold'>size : </span>Single w 75 x L 100 in Inches</p>
                                </div>
                            </div>
                        </li>
                        <li className='bs-order-card__product-item'>
                            <div className='bs-order-card__product'>
                                <div className='bs-order-card__product-media-wrap'>
                                    <AdvancedImage cldImg={myImage} loading="lazy" className='bs-order-card__product-image'/>
                                </div>
                                <div className='bs-order-card__product-detail-wrap'>
                                    <label className='bs-order-card__product-type'>bedsheet set</label>
                                    <h3 className='bs-order-card__product-title'>Melange luxe Pillow Covers</h3>
                                    <p className='bs-order-card__product-size-info'><span className='bs-order-card__product-size-info--bold'>size : </span>Single w 75 x L 100 in Inches</p>
                                </div>
                            </div>
                        </li>
                        <li className='bs-order-card__product-item'>
                            <div className='bs-order-card__product'>
                                <div className='bs-order-card__product-media-wrap'>
                                    <AdvancedImage cldImg={myImage} loading="lazy" className='bs-order-card__product-image'/>
                                </div>
                                <div className='bs-order-card__product-detail-wrap'>
                                    <label className='bs-order-card__product-type'>bedsheet set</label>
                                    <h3 className='bs-order-card__product-title'>Melange luxe Pillow Covers</h3>
                                    <p className='bs-order-card__product-size-info'><span className='bs-order-card__product-size-info--bold'>size : </span>Single w 75 x L 100 in Inches</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            {status === 'cancelled' ? null : 
            <div className='bs-order-card__address-wrap'>
                <label className='bs-order-card__address-wrap-title'>delivering to</label>
                <div className='bs-order-card__cont-wrap'>
                    <div className='bs-order-card__address-title-wrap'>
                        <strong className='bs-order-card__address-title'>Shashank Yeole</strong>
                        <ProductTag title={'home'} classname="mod-product-tag--typ-border" />
                    </div>
                    <address className='bs-order-card__address-text'>Kanakia zen world , kanjurmarg west, near station road, Kanjurmarg, Mumbai - maharashtra - 400032</address>
                </div>
            </div>
            }
        </div>
        <Modal
            open={open}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='bs-modal bs-modal--typ-form bs-modal--typ-order-cancel'
            
        >
            <Box className='bs-modal__wrapper' sx={style} onClick={handleBackdropClick}>
                <div className='bs-modal__content'>
                    <div className='bs-cancel-order'>
                        <div className='bs-cancel-order__head-wrap'>
                            <span className='bs-cancel-order__icon icon icon-forbidden'></span>
                            <h3 className='bs-cancel-order__title'>Are you sure you want to cancel selected order ?</h3>
                            <label className='bs-cancel-order__order-info'><span className='bs-cancel-order__order-info--bold'>order id :</span>121435195150135</label>
                        </div>
                        <form className='bs-form bs-form--typ-column bs-cancel-order__cont-wrap'>
                            <div className={`bs-form__form-group`}>
                                <div className={`bs-form__form-group`}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label" required>select reason</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={state}
                                            label="select reason"
                                            onChange={stateHandleChange}
                                            // IconComponent={<span className='icon icon-expaand-more'></span>}
                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <div className={`bs-form__form-group`}>
                                <TextField 
                                    id="comments"
                                    name="comments"
                                    type="text"
                                    label="add comments" 
                                    className='bs-form__form-control bs-form__form-control--text-area' 
                                    multiline
                                    maxRows={5}
                                />
                            </div>
                            <div className={`bs-form__form-bottom-wrap`}>
                                <button className='bs-btn bs-btn__btn-solid bs-btn__btn-solid--typ-xxl' type='submit' >yes, cancel</button>
                                <button className='bs-btn bs-btn__btn-solid bs-btn__btn-solid--typ-xxl bs-btn__btn-solid--inverse-border'>go back</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Box>
        </Modal>
    </>
  )
}

export default OrderCard