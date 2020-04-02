import React from 'react'
const FormButton = (props) => {
return(
    <div className="mt-1 mb-1 col-md-12 text-right">
        <React.Fragment>
            <button className="btn btn-primary border border-primary mr-2" 
                    onClick={props.onSubmit}>
                    { props.text }
            </button>
            <button className="btn btn-secondary border border-secondary"
                    onClick={() => { props.setEditing(false) } }>
                    Cancelar
            </button>
        </React.Fragment>
    </div>
)}
export default FormButton