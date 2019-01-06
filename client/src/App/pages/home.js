import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import Logo from '../components/logo';
import Swiper from '../components/swiper'
import Spacing from '../components/spacing'
import Nav from '../components/nav'
import Singer from '../components/singer'

export default class Home extends Component {
  render() {
    return(
      <div className="container">
        <Logo className="placement1"/>
        <Nav/>
        <Spacing height="35px"/>
        <Swiper/>
        <div id='singers'>
           <Singer/> 
           <Singer reverse='1'/> 
           <Singer/> 
           <Singer reverse='1'/> 
           <Singer/> 
           <Singer reverse='1'/> 
        </div>
      </div>
    )
  }
}