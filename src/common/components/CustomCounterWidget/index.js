import React, {useState} from 'react'
import { toast } from 'react-toastify';

function CustomCounterWidget({count, setCount, stock, flowRef}) {

    // const [count, setCount] = useState(productCartQty ? productCartQty : 0);

    const handleIncrement = (e) => {
        e.preventDefault();
        console.log('count', count, stock);
        if((count + 1) <= stock)
            setCount(prevCount => prevCount + 1)
        else
            toast.error('Stock limit reached');
    };
    const handleDecrement = (e) => {
        e.preventDefault();
        if (count > 0) setCount(prevCount => prevCount - 1);
    };

  return (
    <div className='bs-counter-widget'>
        <div className='bs-counter-widget__wrapper'>
            <button 
                className='bs-counter-widget__action-button bs-counter-widget__decrement-btn'
                onClick={handleDecrement}
                disabled={count === (flowRef === 'pdp' ? 1 : 0)}
            >
                <span className='icon icon-decrement bs-counter-widget__icon'></span>
            </button>
            <div className='bs-counter-widget__input-wrap'>
                <input 
                    type="number" 
                    className='bs-counter-widget__input' 
                    value={count} 
                    readOnly
                />
            </div>
            <button 
                className='bs-counter-widget__action-button bs-counter-widget__increment-btn'
                onClick={handleIncrement}
            >
                <span className='icon icon-increment bs-counter-widget__icon'></span>
            </button>
        </div>
    </div>
  )
}

export default CustomCounterWidget