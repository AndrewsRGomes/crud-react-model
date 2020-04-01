import React from 'react';
import Main from '../template/Main'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
  } from "react-router-dom";

export default props =>
    <Main icon="home" title="Gep"
        subtitle ="Sistema de Controle de Processos de Legalização">
        <div className="display-4">Bem vindo!</div>
        <hr/>
        <p>Sistema de controle de processo de legalização</p>
        <OldSchoolMenuLink to="/login" label="Login" />
    </Main>

function OldSchoolMenuLink({ label, to, activeOnlyWhenExact }) {
    let match = useRouteMatch({
      path: to,
      exact: activeOnlyWhenExact
    });
  
    return (
      <div className={match ? "active" : ""}>
        {match && "> "}
        <Link to={to}>{label}</Link>
      </div>
    );
  }