import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/imgs/logo.png'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

const Nav = () => {
    return (
        <AppBar position="static">
            <Toolbar>
            <Link to="/home">
                <img className="logo" src={Logo} alt="logo" />
            </Link>
            <Link to="/home">
                <i className="fa fa-home"></i> Início
            </Link>
            <Link to="/users">
                <i className="fa fa-users"></i> Usuários
            </Link>
            <Link to="/processos">
                <i className="fa fa-book"></i> Processos
            </Link>
            <Link to="/orcamento">
                <i className="fa fa-dollar-sign"></i> Orcamento
            </Link>
            <Link to="/">
                <i class="fas fa-sign-out-alt"></i> Sair
            </Link>
            </Toolbar>
        </AppBar>
            

    )
}
export default Nav
   