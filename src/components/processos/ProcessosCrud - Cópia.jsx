
// Criar multiplos arquivos para as funções

import './ProcessosCrud.css'
import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'
import { Switch, Route, Redirect } from 'react-router'

const headerProps = {
    icon: '',
    title: 'Processos',
    subtitle: 'Controle de Processos'
}

//Estados Iniciais das constantes
const baseUrl = 'http://localhost:3002/processos'
const initialState =  { 
    processo: { cliente: "", processo: ""  },
    list: []
}

export default class ProcessosCrud extends Component 
{
    state = {...initialState} //atribuindo o state vazio ao iniciar

    componentWillMount(){ //Antes de exibir os componentes faça algo este nome é nativo não pode mudar
        //pegar a lista do banco de dados
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }
  
    clearState() {//Limpando o formulário
        this.setState({processo: initialState.processo}) 
    }

    insertOrUpdate(){ //Serve tanto para incluir como para alterar o usuario
        const processo =  this.state.processo //pegando a referência do usuario atual
        const method = processo.id ? 'put' : 'post'; //se o ID for setado ele vai usar o method put
        const url = processo.id ? `${baseUrl}/${processo.id}` : baseUrl;

        axios[method](url,processo)
            .then(resp =>{
                const list = this.getUpdatedList(resp.data) 
                /*resp.data é o retorno do json depois de alterar ou fazer o select ou seja  
                  após realizar a mudança precisa retornar o registro com os dados novos.*/
                  this.setState({ processo: initialState.processo, list }) //alterar o processo e a lista
            })
    }

    getUpdatedList(processo, add = true) {//retorna um novo array sem o id do usuario setado ou seja cria uma nova lista e remove o registro alterado
        const list = this.state.list.filter(u => u.id !== processo.id) 
        if(add)  list.unshift(processo) //coloca o elemento na primeira posição do array.
        return list;
    }

    atualizarCampo(event) { //Atualiza os campos do formulário setando os novos valores
        const processo = { ...this.state.processo } //clonando o usuario e criando uma nova variavel sem alterar a referência diretamente
        processo[event.target.name] = event.target.value // O name do formulário precisa ser igual ao name do processo, email , etc
        this.setState({ processo })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Cliente</label>
                            <input type="text" className="form-control"
                                name="cliente"
                                value={this.state.processo.cliente}
                                onChange={e => this.atualizarCampo(e)}/>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Processos</label>
                            <input type="text" className="form-control"
                                name="processo"
                                value={this.state.processo.processo}
                                onChange={e => this.atualizarCampo(e)}/>
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row mb-2">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.insertOrUpdate(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clearState(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

   

    load(processo) {
        this.setState({ processo })
    }

    remove(processo) {
        axios.delete(`${baseUrl}/${processo.id}`).then(resp => {
            const list = this.getUpdatedList(processo, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <div className="col-md-12 table-responsive tabela-processos">
                <table className="w-100 table table-sm table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Processo</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        )
    }

    renderRows() {
        return this.state.list.map(processo => {
            return (
                <tr key={processo.id}>
                    <td>{processo.id}</td>
                    <td>{processo.cliente}</td>
                    <td>{processo.processo}</td>
                    <td>
                        <button className="btn btn-sm btn-info ml-2"
                            onClick={() => this.verProcesso(processo)}>
                            <i className="fa fa-eye"></i>
                        </button>
                        <button className="btn btn-sm btn-warning ml-2"
                            onClick={() => this.load(processo)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-sm btn-danger ml-2"
                            onClick={() => this.remove(processo)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }
   
    
    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }

    verProcesso(e) {
        document.querySelector('.tabela-processos').classList.add("d-none")
    }

}


