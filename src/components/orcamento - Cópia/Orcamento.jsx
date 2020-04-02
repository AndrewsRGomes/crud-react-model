
// Criar multiplos arquivos para as funções

import React from 'react'
//import axios from 'axios'
import Main from '../template/Main'
import FormOrcamento from './FormOrcamento'
import TabelaOrcamento from './TabelaOrcamento'

const headerProps = {
    icon: 'dollar-sign',
    title: 'Financeiro',
    subtitle: 'Controle de Orçamentos'
}

//Estados Iniciais das constantes
const baseUrl = 'http://localhost:3004/orcamentos'
const initialState =  { 
    orcamento: { cliente: "", processo: "" ,valor:"", taxa:"", status:"",email:"",detalhes:"" },
    list: []
}

const Orcamento = () => {
    
    return (
        
        <Main {...headerProps}>
           <FormOrcamento />
           <TabelaOrcamento/>
           
        </Main>
    )

}
export default Orcamento



