import React from 'react'
import {Route, Switch, Redirect, useLocation } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Nav from '../components/template/Nav'
import Login from '../components/login/Login';
import Home from '../components/home/Home';
import UserCrud from '../components/user/UserCrud';
import ProcessosCrud from '../components/processos/ProcessosCrud';
import EtapasProcesso from '../components/processos/EtapasProcesso';
import Orcamento from '../components/orcamento/Orcamento';
import './App.css'

import isAuthenticated from './auth'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route { ...rest } render={props => (

        isAuthenticated() ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{pathname: '/', 
                           state: {from:props.location}}} />
        )
    )} />
)

const Routes = (props) => {
    const location = useLocation();
    return(

    <React.Fragment>
    <Nav />
    <TransitionGroup>
        <CSSTransition key={location.key} classNames="page" timeout={1000}>
            <Switch location={location}>
                <Route exact path='/' component={Login} />
                <PrivateRoute path='/users' component={UserCrud} />
                <PrivateRoute path='/processos' component={ProcessosCrud} />
                <PrivateRoute exact path='/etapas-do-processo/:id'  component={EtapasProcesso} />
                <PrivateRoute exact path='/orcamento' component={Orcamento} />
                <PrivateRoute exact path='/login' component={Login} />
                <PrivateRoute path="/home" component={Home}/>
                <Redirect from='*' to="/login" />
            </Switch>
        </CSSTransition>
    </TransitionGroup>
    </React.Fragment>
    )

}

export default Routes;