import './Main.css'
import React from 'react'
import Header from './Header'
import Nav from '../template/Nav'
import Footer from '../template/Footer'

export default props =>
    <React.Fragment>
        <Nav />
        <Header {...props} />
        <main className="content container-fluid">
            <div className="p-3 mt-3">
                {props.children}
            </div>
        </main>
        <Footer />
    </React.Fragment>