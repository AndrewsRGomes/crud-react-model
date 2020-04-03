
import Main from '../template/Main'
import Header from '../template/Header'
import React, { useState, Fragment } from 'react'
import FormOrcamento from './FormOrcamento'
import Tabela from './Tabela'

const Orcamento = () => {

    const baseUrl = 'http://localhost:3004/orcamentos'
    
    const ths = [
         {thName:'Cliente'},
         {thName:'Processo'},
         {thName:'Valor'},
         {thName:'Taxa'},
         {thName:'Status'},
         {thName:'Opções'}
    ]

	const rowData = [

        { id: 1, cliente: 'Andrews', processo: 'Abertura de Empresa',valor: '1500,00',taxa: '123,00',status: 'Pendente',email: 'andrews.ribeiro.gomes@gmail.com',detalhes: 'taxa 1 e taxa 2'},
        { id: 2, cliente: 'Fengsoft Software House', processo: 'Alteração Contratual',valor: '1500,00',taxa: '',status: 'Pago',email: 'andrews@fengsoft.com.br',detalhes: ''},
        { id: 3, cliente: 'Fengsoft Software House', processo: 'Alteração Contratual',valor: '1500,00',taxa: '',status: 'Pago',email: 'andrews@fengsoft.com.br',detalhes: ''},
        { id: 4, cliente: 'Fengsoft Software House', processo: 'Alteração Contratual',valor: '1500,00',taxa: '',status: 'Pago',email: 'andrews@fengsoft.com.br',detalhes: ''},
        { id: 5, cliente: 'Fengsoft Software House', processo: 'Alteração Contratual',valor: '1500,00',taxa: '',status: 'Pago',email: 'andrews@fengsoft.com.br',detalhes: ''},
        { id: 6, cliente: 'Fengsoft Software House', processo: 'Alteração Contratual',valor: '1500,00',taxa: '',status: 'Pago',email: 'andrews@fengsoft.com.br',detalhes: ''},
	]

	const initialFormState = { id: null,  cliente: '', processo: '',valor: '',taxa: '',status: '',email: '',detalhes: ''}

	// Setting state
	const [ rows, setRow ] = useState(rowData)
	const [ currentRow, setCurrentRow ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)

	const addRow = row => {
		row.id = rows.length + 1
		setRow([ ...rows, row ])
	}

	const deleteRow = id => { //return a new list without de deleted row
		setRow(rows.filter(row => row.id !== id))
    }

    const updateRow = (id, updatedUser) => { //update the line in the table
        setRow(rows.map(row => (row.id === id ? updatedUser : row)))
    }

    const populateFormWithSelectedRow = row => {
        setEditing(true)
        setCurrentRow({ 
            id: row.id, 
            cliente: row.cliente, 
            processo: row.processo,
            valor: row.valor,
            taxa: row.taxa,
            status:row.status,
            email:row.email,
            detalhes:row.detalhes
            })
    }

	return (
        <Main >
            <Header icon='dollar-sign' title='Financeiro' subtitle='Controle de Orçamentos' />
            <FormOrcamento editing={editing} initialFormState={initialFormState} setEditing={setEditing} currentRow={currentRow} updateRow={updateRow} addRow={addRow} />
            <Tabela ths={ths} rows={rows} editRow={populateFormWithSelectedRow} deleteRow={deleteRow} />
        </Main>
	)
}

export default Orcamento


