import React from 'react';
import './nav.css'
import Spacing from './spacing'

export default class nav extends React.Component{
    render(){
        return(
            <nav id='nav'>
                <i className="fab fa-instagram" ></i>
                <Spacing width="20px"/>
                <i className="fab fa-facebook-square"></i>
            </nav>
        )
    }
}