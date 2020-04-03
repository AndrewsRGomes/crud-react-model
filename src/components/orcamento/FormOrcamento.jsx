import React, { useState, useEffect } from 'react'
import FormInput from './FormInput'
import FormButton from './FormButton'
import FormSelect from './FormSelect'
import FormTextArea from './FormTextArea'
const AddRegisterForm = props => {

    const initialState = { id: null,  cliente: '', processo: '',valor: '',taxa: '',status: '',email: '',detalhes: '' }
    const [ state, setState ] = useState(initialState)
    
    useEffect(//veio do editar
        () => {
            setState(props.currentRow)
        },
        [ props ]
    )

	const onChange = event => { //Do not change
        //the name and state of the value must be the same
		const { name, value } = event.target
        setState({ ...state, [name]: value })
    }
    
function onSubmit(e){//activated when the user clicks the button on the form
    e.preventDefault();
    if(props.setEditing){
        props.updateRow(props.currentRow.id, state)
    } else{
        props.addRow(state)
    }
    setState(initialState)
}

    const selectStatus = [
        { optionValue : 'Pago'},
        { optionValue : 'Pendente'},
        { optionValue : 'Cancelado'}
    ]

    const selectProcessos = [ 
        { optionValue : 'Alteração Contratual'},
        { optionValue : 'Abertura de Empresa'},
        { optionValue : 'Consulta Prévia'}
    ]

	return (
		<form className="row pb-2">   
            <FormInput label="Nome" name="cliente" type="text" value={state.cliente} onChange={onChange} />
            <FormSelect label="Processos" name="processo" options={selectProcessos} value={state.processo} onChange={onChange} />
            <FormInput label="Valor" name="valor" type="text" value={state.valor} onChange={onChange} />
            <FormInput label="Taxa" name="taxa" type="text" value={state.taxa} onChange={onChange} />
           
            <FormSelect label="Status" name="status" options={selectStatus} value={state.status} onChange={onChange} />
           
           
            <FormInput label="Email" name="email" type="email" value={state.email} onChange={onChange} />
            <FormTextArea label="Detalhes" name="detalhes" type="text" value={state.detalhes} onChange={onChange} />
            <FormButton btnCancel text="Salvar" onSubmit={onSubmit}/>
		</form>
	)
}

export default AddRegisterForm