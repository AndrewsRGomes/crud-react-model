import React from 'react'

// import BInput from './BInput'

const FormTextArea = (props) => {
    return(
        <div className="form-group col-md-12">
            <label>{ props.label }</label>
            <textarea className="form-control" type={props.type} name={props.name}
            value={props.value} onChange={props.onChange} />
        </div>
    )
}
export default FormTextArea