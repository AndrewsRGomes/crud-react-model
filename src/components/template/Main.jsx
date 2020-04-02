import './Main.css'
import React from 'react'
import Header from './Header'
import Nav from '../template/Nav'
import Footer from '../template/Footer'

export default function App(props){


return(
    <React.Fragment>
        <Nav />
        <Header {...props} />
            <main>
                <div className="col-md-8 offset-md-2 p-4">
                    {props.children}
                </div>
            </main>
        <Footer />
    </React.Fragment>
)

}