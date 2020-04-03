
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes'
export default function App(props){
    return(
        <BrowserRouter>
            <Routes location={props.location} {...props}/>
        </BrowserRouter>
    )
}