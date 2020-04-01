
// Criar multiplos arquivos para as funções

import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'book',
    title: 'Financeiro',
    subtitle: 'Controle de Orçamentos'
}

//Estados Iniciais das constantes
const baseUrl = 'http://localhost:3004/orcamentos'
const initialState =  { 
    orcamento: { cliente: "", processo: "" ,valor:"", taxa:"", status:"",email:"",detalhes:"" },
    list: []
}

export default class ProcessosCrud extends Component  {   
    constructor(props){
        super(props);
        this.state = {
            ...initialState, //atribuindo o state vazio ao iniciar
            redirect: false
        }
    }

    componentWillMount(){ //Antes de exibir os componentes faça algo este nome é nativo não pode mudar
        //pegar a lista do banco de dados
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }
  
    clearState() {//Limpando o formulário
        this.setState({orcamento: initialState.orcamento}) 
    }

    insertOrUpdate(){ //Serve tanto para incluir como para alterar o usuario
        const orcamento =  this.state.orcamento //pegando a referência do usuario atual
        const method = orcamento.id ? 'put' : 'post'; //se o ID for setado ele vai usar o method put
        const url = orcamento.id ? `${baseUrl}/${orcamento.id}` : baseUrl;

        axios[method](url,orcamento)
            .then(resp =>{
                const list = this.getUpdatedList(resp.data) 
                /*resp.data é o retorno do json depois de alterar ou fazer o select ou seja  
                  após realizar a mudança precisa retornar o registro com os dados novos.*/
                  this.setState({ orcamento: initialState.orcamento, list }) //alterar o orcamento e a lista
            })
    }

    getUpdatedList(orcamento, add = true) {//retorna um novo array sem o id do usuario setado ou seja cria uma nova lista e remove o registro alterado
        const list = this.state.list.filter(u => u.id !== orcamento.id) 
        if(add)  list.unshift(orcamento) //coloca o elemento na primeira posição do array.
        return list;
    }

    atualizarCampo(event) { //Atualiza os campos do formulário setando os novos valores
        const orcamento = { ...this.state.orcamento } //clonando o usuario e criando uma nova variavel sem alterar a referência diretamente
        orcamento[event.target.name] = event.target.value // O name do formulário precisa ser igual ao name do orcamento, email , etc
        this.setState({ orcamento })
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
                                value={this.state.orcamento.cliente}
                                onChange={e => this.atualizarCampo(e)}/>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Processos</label>
                            <select 
                            className="form-control"
                            name="processo"
                            value={this.state.orcamento.processo}
                            onChange={e => this.atualizarCampo(e)}>
                                <option value=""></option>
                                <option value="pendente">abertura de empresa</option>
                                <option value="alteração contratual">alteração contratual</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Valor do Processo</label>
                            <input type="text" className="form-control"
                                name="valor"
                                value={this.state.orcamento.valor}
                                onChange={e => this.atualizarCampo(e)}/>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Taxas</label>
                            <input type="text" className="form-control"
                                name="taxa"
                                value={this.state.orcamento.taxa}
                                onChange={e => this.atualizarCampo(e)}/>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Status</label>
                            <select 
                            className="form-control"
                            name="status"
                            value={this.state.orcamento.status}
                            onChange={e => this.atualizarCampo(e)}>
                                <option value=""></option>
                                <option value="pendente">pendente</option>
                                <option value="pago">pago</option>
                                <option value="cancelado">cancelado</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail do cliente</label>
                            <input type="text" className="form-control"
                                name="email"
                                value={this.state.orcamento.email}
                                onChange={e => this.atualizarCampo(e)}/>
                        </div>
                    </div>

                    <div className="col-12 col-md-12">
                        <div className="form-group">
                            <label>Detalhes</label>
                            <textarea type="text" className="form-control"
                                name="status"
                                value={this.state.orcamento.detalhes}
                                onChange={e => this.atualizarCampo(e)}></textarea>
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

    load(orcamento) {
        this.setState({ orcamento })
    }

    remove(orcamento) {
        axios.delete(`${baseUrl}/${orcamento.id}`).then(resp => {
            const list = this.getUpdatedList(orcamento, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <div className="col-md-12 table-responsive tabela-orcamentos">
                <table className="w-100 table table-sm table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Processo</th>
                            <th>Valor</th>
                            <th>Taxas</th>
                            <th>Status</th>
                            <th>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.renderRows() }
                    </tbody>
                </table>
            </div>
        )
    }

    verOrcamento(id) {
        this.props.history.push(
            {
             pathname: `/ViewOrcamento/${id}`
            }
        )
    }

    renderRows() {
        return this.state.list.map(orcamento => {
            return (
                <tr key={orcamento.id}>
                    <td>{orcamento.id}</td>
                    <td>{orcamento.cliente}</td>
                    <td>{orcamento.processo}</td>
                    <td>{orcamento.valor}</td>
                    <td>{orcamento.taxas}</td>
                    <td>{orcamento.status}</td>
                    <td>
                        <button className="btn btn-sm btn-info ml-2"
                            onClick={() => this.verOrcamento(orcamento.id) }>
                            <i className="fa fa-eye"></i>
                        </button>
                        <button className="btn btn-sm btn-warning ml-2"
                            onClick={() => this.load(orcamento)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-sm btn-danger ml-2"
                            onClick={() => this.remove(orcamento)}>
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

    handleClick(e) {
        this.router.transitionTo('index');
    }

}




