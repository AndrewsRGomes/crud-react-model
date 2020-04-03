import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'
// import Logo from '../../assets/imgs/logo.png'

const Nav = () => {
    return (
        <navbar className="row navbar bg-primary">
            {/* <Link to="/home">
                <img className="logo" src={Logo} alt="logo" />
            </Link> */}
            <Link to="/home">
                <i className="fa fa-home"></i>
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
            
      </navbar>
            

    )
}
export default Nav
   