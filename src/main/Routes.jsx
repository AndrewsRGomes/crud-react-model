import React from 'react'
import {Route, Switch, Redirect } from 'react-router-dom'

import Login from '../components/login/Login';
import Home from '../components/home/Home';
import UserCrud from '../components/user/UserCrud';
import ProcessosCrud from '../components/processos/ProcessosCrud';
import EtapasProcesso from '../components/processos/EtapasProcesso';
import Orcamento from '../components/orcamento/Orcamento';

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

const Routes = () => {
    return(
        <Switch>
            <Route exact path='/' component={Login} />
            <PrivateRoute path='/users' component={UserCrud} />
            <PrivateRoute path='/processos' component={ProcessosCrud} />
            <PrivateRoute exact path='/etapas-do-processo/:id'  component={EtapasProcesso} />
            <PrivateRoute exact path='/orcamento' component={Orcamento} />
            <PrivateRoute exact path='/login' component={Login} />
            <PrivateRoute path="/home" component={Home}/>
            <Redirect from='*' to="/login" />
        </Switch>
    )

}

export default Routes;