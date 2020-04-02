import React from 'react'

// import BInput from './BInput'

const FormInput = (props) => {
    return(
        <div className="form-group col-md-6">
            <label>{ props.label }</label>
            <input className="form-control" type={props.type} name={props.name}
            value={props.value} onChange={props.onChange} />
        </div>
    )
}
export default FormInput