
// Criar multiplos arquivos para as funções


import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'
import Swal from 'sweetalert2'

const headerProps = {
    icon: 'eye',
    title: 'Etapas',
    subtitle: 'Acomanhamento do processo'
}

//Estados Iniciais das constantes

const baseUrl = 'http://localhost:3003/etapas'
const initialState =  { 
    etapa: { etapa: "", status: "",dt_inicio:"",dt_fim:"", detalhes: ""  },
    list: []
}

export default class EtapasProcesso extends Component 
{   
   
    state = {...initialState} //atribuindo o state vazio ao iniciar

    componentWillMount(){ //Antes de exibir os componentes faça algo este nome é nativo não pode mudar
        //pegar a lista do banco de dados
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }
  
    clearState() {//Limpando o formulário
        this.setState({etapa: initialState.etapa}) 
    }

    insertOrUpdate(){ //Serve tanto para incluir como para alterar o usuario
        const etapa =  this.state.etapa //pegando a referência do usuario atual

        if(etapa.etapa === "")
            return Swal.fire({
                icon: 'warning', title: 'Oops...', text: 'Informe a etapa antes de prosseguir!'
              })

         if(etapa.status === "")
            return Swal.fire({
                icon: 'warning', title: 'Oops...', text: 'Informe a status!'
        })

        if(etapa.status === "em andamento" && etapa.dt_inicio === "")
            return Swal.fire({
                icon: 'warning', title: 'Oops...', text: 'Para colocar a tarefa em andamento é preciso informar a data de inicio !'
              })
       
        if(etapa.status === "concluido" && etapa.dt_fim === "")
            return Swal.fire({
                icon: 'warning', title: 'Oops...', text: 'Para concluir a tarefa é preciso informar a data de finalização da etapa!'
        })

        if(etapa.status === "pendente" && etapa.dt_fim !== "")
            return Swal.fire({
                icon: 'warning', title: 'Oops...', text: 'Não pode marcar uma atividade como pendente, e informar uma data de finalização ao mesmo tempo'
        })

       
        
        const method = etapa.id ? 'put' : 'post'; //se o ID for setado ele vai usar o method put
        const url = etapa.id ? `${baseUrl}/${etapa.id}` : baseUrl;

        axios[method](url,etapa)
            .then(resp =>{
                const list = this.getUpdatedList(resp.data) 
                /*resp.data é o retorno do json depois de alterar ou fazer o select ou seja  
                  após realizar a mudança precisa retornar o registro com os dados novos.*/
                  this.setState({ etapa: initialState.etapa, list }) //alterar o etapa e a lista
            })

            return Swal.fire({
                icon: 'success', title: 'Registrado com sucesso :)'
              })
    }

    getUpdatedList(etapa, add = true) {//retorna um novo array sem o id do usuario setado ou seja cria uma nova lista e remove o registro alterado
        const list = this.state.list.filter(u => u.id !== etapa.id) 
        if(add)  list.unshift(etapa) //coloca o elemento na primeira posição do array.
        return list;
    }

    atualizarCampo(event) { //Atualiza os campos do formulário setando os novos valores
        const etapa = { ...this.state.etapa } //clonando o usuario e criando uma nova variavel sem alterar a referência diretamente
        etapa[event.target.name] = event.target.value // O name do formulário precisa ser igual ao name do etapa, email , etc
        this.setState({ etapa })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Etapa</label>
                            <input type="text" className="form-control"
                                name="etapa"
                                required
                                value={this.state.etapa.etapa}
                                onChange={e => this.atualizarCampo(e)}/>
                        </div>
                    </div>


                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Inicio</label>
                            <input type="date" className="form-control"
                                name="dt_inicio"
                                value={this.state.etapa.dt_inicio}
                                onChange={e => this.atualizarCampo(e)}/>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Fim</label>
                            <input type="date" className="form-control"
                                name="dt_fim"
                                value={this.state.etapa.dt_fim}
                                onChange={e => this.atualizarCampo(e)}/>
                        </div>
                    </div>
                    
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Status</label>
                            <select 
                            className="form-control"
                            name="status"
                            value={this.state.etapa.status}
                            onChange={e => this.atualizarCampo(e)}>
                                <option value=""></option>
                                <option value="pendente">pendente</option>
                                <option value="em andamento">em andamento</option>
                                <option value="concluido">concluido</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-12 col-md-12">
                        <div className="form-group">
                            <label>Detalhes</label>
                            <textarea type="text" className="form-control"
                                name="detalhes"
                                value={this.state.etapa.detalhes}
                                onChange={e => this.atualizarCampo(e)} />
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

   

    load(etapa) {
        this.setState({ etapa })
    }

    remove(etapa) {

        Swal.fire({
            title: 'Você tem certeza ?',
            text: "A remoção desta etapa é irreversível!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, deletar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
              Swal.fire(
                'Deletado!',
                'Etapa excluida com sucesso.',
                'success'
              )

              axios.delete(`${baseUrl}/${etapa.id}`).then(resp => {
                const list = this.getUpdatedList(etapa, false)
                this.setState({ list })
            })

            } 
               
            
          })

       
    }

    renderTable() {
        return (
            <div className="col-md-12 table-responsive">
                <table className="w-100 table table-sm table-hover">
                    <thead>
                        <tr>
                            <th>Etapa</th>
                            <th>Inicio</th>
                            <th>Fim</th>
                            <th>Status</th>
                            <th>Opções</th>
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
        return this.state.list.map(etapa => {
            return (
                <tr key={etapa.id}>
                    <td>{etapa.etapa}</td>
                    
                    <td>{etapa.dt_inicio}</td>
                    <td>{etapa.dt_fim}</td>
                    <td>{etapa.status}</td>
                    <td>
                        <button className="btn btn-sm btn-warning ml-2"
                            onClick={() => this.load(etapa)}>
                            <i className="fa fa-eye"></i>
                        </button>
                        <button className="btn btn-sm btn-danger ml-2"
                            onClick={() => this.remove(etapa)}>
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
}
