import './Main.css'
import React from 'react'

import Footer from '../template/Footer'

export default function App(props){


return(
    <React.Fragment>
            <main className="mt-5 mb-5">
                <div className="col-md-8 offset-md-2 p-4 mb-5">
                    {props.children}
                </div>
            </main>
        <Footer />
    </React.Fragment>
)

}