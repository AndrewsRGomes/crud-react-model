
import React ,{ useEffect, useState} from 'react'
import axios from 'axios'
import { Grid, Select, Typography,TextField, FormControl,InputLabel,MenuItem, TextareaAutosize,Button  } from '@material-ui/core';

export default function FormOrcamento(){   

    const baseUrl = 'http://localhost:3004/orcamentos'

    const [cliente, setCliente] = useState("");
    const [processo, setProcesso] = useState("");
    const [valor, setValor] = useState("");
    const [taxa, setTaxa] = useState("");
    const [status, setStatus] = useState("");
    const [email, setEmail] = useState("");
    const [detalhes, setDetalhes] = useState("");

    const insertOrUpdate = (props) => {
        const handleSubmit = (event) => {
            event.preventDefault();
            alert('Enviou o formulário')
        }

        const orcamento =  setStateOrcamento //pegando a referência do usuario atual
        const method = orcamento.id ? 'put' : 'post'; //se o ID for setado ele vai usar o method put
        const url = orcamento.id ? `${baseUrl}/${orcamento.id}` : baseUrl;

        axios[method](url,orcamento)
            .then(resp =>{
                const newList = this.getUpdatedList(resp.data) 
                this.setState(iniStateOrcamento, newList) 
        })
    }   

    const atualizarCampo = (event) => { //Atualiza os campos do formulário setando os novos valores
        const cloneOrcamento = {iniStateOrcamento}  //clonando o usuario e criando uma nova variavel sem alterar a referência diretamente
       console.log(cloneOrcamento.[event.target.name])
        //cloneOrcamento.[event.target.name] = event.target.value // O name do formulário precisa ser igual ao name do orcamento, email , etc
        //this.setState({ cloneOrcamento })
    }

    const clearState = () => {
        this.setState({iniStateOrcamento}) 
    }
    
    return (
    <Grid container spacing={3}>
       <Typography variant="h6" gutterBottom>Novo Orçamento</Typography>
      
        <Grid item xs={12} sm={6}>
          <TextField required id="cliente" name="cliente" label="Cliente" fullWidth
            value={setStateOrcamento.cliente}
            onChange={e => atualizarCampo(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
                <InputLabel  id="select-processo">Processos</InputLabel>
                <Select labelId="select-processo" id="select-processo"
                    value={setStateOrcamento.processo}
                    onChange={e => atualizarCampo(e)}
                >   
                    <MenuItem value=""> </MenuItem>
                    <MenuItem value={10}>Abertura de Empresa</MenuItem>
                    <MenuItem value={20}>Alteração Contratual</MenuItem>
                    <MenuItem value={30}>Alvará</MenuItem>
                </Select>
            </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField required className="row"  id="valor" name="valor"  label="Valor" fullWidth
            value={setValor}
            onChange={e => atualizarCampo(e)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField required id="taxa" name="taxa" label="Taxa" fullWidth
            value={setStateOrcamento.taxa}
            onChange={e => atualizarCampo(e)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
                <InputLabel  id="status">Status</InputLabel>
                <Select labelId="status" id="status"
                    value={setStateOrcamento.status}
                    onChange={e => atualizarCampo(e)}
                >   
                    <MenuItem value=""> </MenuItem>
                    <MenuItem value={10}>pendente</MenuItem>
                    <MenuItem value={20}>pago</MenuItem>
                    <MenuItem value={30}>cancelado</MenuItem>
                </Select>
            </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField required id="email" name="email" label="E-mail cliente" fullWidth
            value={setStateOrcamento.email}
            onChange={e => atualizarCampo(e)}
          />
        </Grid>

        <Grid item xs={12}>
            <InputLabel  htmlFor="detalhes" value="Detalhes">Detalhes</InputLabel>
            <FormControl fullWidth>
            <TextareaAutosize  rowsMin={4}  required id="detalhes" name="detalhes" label="Detalhes"
            value={setStateOrcamento.detalhes}
            onChange={e => atualizarCampo(e)}
            />
           </FormControl>
        </Grid>
        
        <Grid item xs={12} align="right">
            <Button variant="contained" onClick={e => insertOrUpdate(e)}>Criar</Button>
            <Button variant="contained" onClick={e => clearState(e)}>Cancelar</Button>
        </Grid>

      </Grid>
    )
}
