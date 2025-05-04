import React from 'react'

function CustomCheckStatement({name, id, label, onChange, classname, value}) {
  return (
    <div className={`bs-checkbox bs-checkbox--typ-sm-icon ${classname}`}>
        <input 
            type="checkbox" 
            id={id}
            name={name}
            onChange={onChange}
            value={value}
        />
        <label className="bs-checkbox__label" htmlFor={id}>{label}</label>
    </div>
  )
}

export default CustomCheckStatement