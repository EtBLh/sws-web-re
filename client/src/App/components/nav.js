import React from 'react';
import './nav.css'
import Spacing from './spacing'
import {Link } from 'react-router-dom'

export default class nav extends React.Component{

    linkStyle={
        color: 'black'
    }

    render(){
        return(
            <nav id='nav'>
                <a href="https://www.instagram.com/spssaofficial/" style={this.linkStyle}>
                    <i className="fab fa-instagram" ></i>
                </a>
                <Spacing width="20px"/>
                <a href="https://www.facebook.com/spssamacau/" style={this.linkStyle}>
                    <i className="fab fa-facebook-square"></i>
                </a>
            </nav>
        )
    }
}