import React, {useEffect, useState} from 'react';
import {Modal, Box, TextField} from '@mui/material';
import AddressCard from '../AddressCard';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
};

function OtherBillingAddress({data, selectedAddressId, handleChangeBillingAddress, open, setOpen}) {

    const handleBackdropClick = (event) => {
        // Prevent close when the backdrop is clicked
        event.stopPropagation();
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  const handleModalClose = (event, reason) => {
    // This is where you can handle close when clicking the modal button, etc.
    if (reason === 'backdropClick') {
      // Do nothing to prevent closing on backdrop click
      return;
    }
    handleChangeBillingAddress(selectedBillingAddId)
    handleClose();
  };

  const [selectedBillingAddId, setSelectedBillingAddId] = useState(selectedAddressId);
  useEffect(() => {
    setSelectedBillingAddId(selectedAddressId);
  }, [selectedAddressId]);

  return (
    <>
        <button className='bs-btn bs-btn__btn-icon-link bs-btn__btn-icon-link--decoration-underline bs-btn__btn-icon-link--clr-dark' onClick={handleOpen}>
            <span className='bs-btn__btn-text'>select other billing address</span>
        </button>

        <Modal
            open={open}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='bs-modal bs-modal--typ-select-address'
            
          >
            <Box className='bs-modal__wrapper' sx={style} onClick={handleBackdropClick}>
                <div className='bs-modal__head-wrap'>
                  <h2 className='bs-modal__title'>select billing address</h2>
                </div>
                <form className='bs-form bs-form--typ-column'>
                    <ul className='lyt-adress lyt-adress--typ-billing'>
                        {data.map((item, index) => {
                            return (
                                <li className='lyt-adress__item' key={index}>
                                    <AddressCard
                                        id={item?.id}
                                        name={`${item?.firstName} ${item?.lastName}` || ''}
                                        address={item?.address}
                                        type={item?.tag}
                                        groupName={"billingAddress"}
                                        index={index}
                                        isDefault={item?.isDefault}
                                        variant={'small'}
                                        isChecked={selectedBillingAddId === item?.id} // Check if this address is selected
                                        handleChangeAddress={(e) => setSelectedBillingAddId(item?.id)}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                    <div className={`bs-form__form-bottom-wrap`} onClick={handleModalClose}>
                        <button className='bs-btn bs-btn__btn-solid bs-btn__btn-solid--typ-xxl'>continue</button>
                    </div>
                </form>
            </Box>
        </Modal>
    
    </>
    
  )
}

export default OtherBillingAddress