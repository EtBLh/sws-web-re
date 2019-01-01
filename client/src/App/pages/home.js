import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import Logo from '../components/logo';
import Swiper from '../components/swiper'
import Spacing from '../components/spacing'
import Nav from '../components/nav'

export default class Home extends Component {
  render() {
    return(
      <div className="container">
        <Logo className="placement1"/>
        <Nav/>
        <Spacing height="35px"/>
        <Swiper/>

        {/* link */}
        {/*
        <Link to={'./list'}>
        <button variant="raised">
            My List
        </button>
        </Link>
        */}
      </div>
    )
  }
}