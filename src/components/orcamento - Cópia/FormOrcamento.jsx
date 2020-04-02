
import React ,{ useEffect, useState} from 'react'
import axios from 'axios'
import { Grid, Select, Typography,TextField, FormControl,InputLabel,MenuItem, TextareaAutosize,Button  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    divView: {
      padding:'30px'
    },
  });

export default function Orcamento(){   
    const classes = useStyles();
    // const baseUrl = 'http://localhost:3004/orcamentos'


    const initialFormValues = {
        cliente: "",
        processo: "",
        valor: "",
        taxa: "",
        status: "",
        email: "",
        detalhes: ""
      }
      
    const [state, setState] = useState(initialFormValues);

    const handleInputChange = event => {
        const { name, value } = event.target
        setState({ ...state, [name]: value })
    }

    const addOrcamento = event => {

        event.preventDefault()
       

            props.addUser(user)
            setUser(initialFormState)
 
        
        //setState([...state, event])
        
        //setState([...orcamento, state]);
        // const orcamento = setState //pegando a referência do usuario atual
        // const method = orcamento.id ? 'put' : 'post'; //se o ID for setado ele vai usar o method put
        // const url = orcamento.id ? `${baseUrl}/${orcamento.id}` : baseUrl;
        // axios[method](url,orcamento)
        //     .then(resp =>{
        //         this.setState(state.cliente) 
        //         alert("Inseriu")
        // })
    }   

    const clearState = () => {
        setState({
                cliente: "",
                processo: "",
                valor: "",
                taxa: "",
                status: "",
                email: "",
                detalhes: ""
                })
    }
    
    return (
    <React.Fragment>
    <Typography variant="h6" gutterBottom>Novo Orçamento</Typography>
    <form>
        <label>Name</label>
        <input type="text" name="name" value={user.name} onChange={handleInputChange} />
        <label>Username</label>
        <input type="text" name="username" value={user.username} onChange={handleInputChange} />
        <button>Add new user</button>
    </form>
      </React.Fragment>
    )
}
