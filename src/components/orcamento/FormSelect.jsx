import React from 'react'

// import BInput from './BInput'

const FormSelect = (props) => 
{
    console.log(props)
    return(
        <div className="form-group col-md-6">
            <label>{ props.label }</label>
            <select className="form-control" id={props.id} name={props.name}
            value={props.value} onChange={props.onChange}>
                <option key="" value=""></option>
                {props.options.length > 0 ? (
                    props.options.map(option => (
                        <option key={option.id} value={ option.optionValue }>{ option.optionValue }</option>
                        ))
                ) : (
                    <option key="empty"></option>
                )}
            </select>
        </div>
    )
}
export default FormSelect