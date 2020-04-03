
// Criar multiplos arquivos para as funções

import React, { Component } from 'react'
import Header from '../template/Header'
import axios from 'axios'
import Main from '../template/Main'

//Estados Iniciais das constantes
const baseUrl = 'http://localhost:3002/users'
const initialState =  { 
    user: { name: "", email: ""  },
    list: []
}

export default class UserCrud extends Component 
{
    state = {...initialState} //atribuindo o state vazio ao iniciar

    componentWillMount(){ //Antes de exibir os componentes faça algo este nome é nativo não pode mudar
        //pegar a lista do banco de dados
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }
  
    clearState() {//Limpando o formulário
        this.setState({user: initialState.user}) 
    }

    insertOrUpdate(){ //Serve tanto para incluir como para alterar o usuario
        const user =  this.state.user //pegando a referência do usuario atual
        const method = user.id ? 'put' : 'post'; //se o ID for setado ele vai usar o method put
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl;

        axios[method](url,user)
            .then(resp =>{
                const list = this.getUpdatedList(resp.data) 
                /*resp.data é o retorno do json depois de alterar ou fazer o select ou seja  
                  após realizar a mudança precisa retornar o registro com os dados novos.*/
                  this.setState({ user: initialState.user, list }) //alterar o user e a lista
            })
    }

    getUpdatedList(user, add = true) {//retorna um novo array sem o id do usuario setado ou seja cria uma nova lista e remove o registro alterado
        const list = this.state.list.filter(u => u.id !== user.id) 
        if(add)  list.unshift(user) //coloca o elemento na primeira posição do array.
        return list;
    }

    atualizarCampo(event) { //Atualiza os campos do formulário setando os novos valores
        const user = { ...this.state.user } //clonando o usuario e criando uma nova variavel sem alterar a referência diretamente
        user[event.target.name] = event.target.value // O name do formulário precisa ser igual ao name do user, email , etc
        this.setState({ user })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.user.name}
                                onChange={e => this.atualizarCampo(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control"
                                name="email"
                                value={this.state.user.email}
                                onChange={e => this.atualizarCampo(e)}
                                placeholder="Digite o e-mail..." />
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

    load(user) {
        this.setState({ user })
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdatedList(user, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <div className="col-md-12 table-responsive">
                <table className="w-100 table table-sm table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>E-mail</th>
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
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-sm btn-warning"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-sm btn-danger ml-2"
                            onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }
    
    render() {
        return (
            <Main>
                <Header icon='users' title='Usuários' subtitle='Controle de Usuários' />
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}