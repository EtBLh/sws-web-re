import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.css'
import Logo from '../components/logo';
import Swiper from '../components/swiper'
import Spacing from '../components/spacing'
import Nav from '../components/nav'
import SingerCell from '../components/singerCell'
import singerData from '../data/singers'

export default class Home extends Component {
  render() {
    return(
     <div>
      <div className="container">
        <Logo className="placement1"/>
        <Nav/>
        <Spacing height="35px"/>
        <Swiper/>
        <Spacing height="35px"/>
        <div id="pollPortal">
          <h3>Vote for your favorite singer!</h3> <br/>
          <Link to={'/poll'}>Vote</Link>
        </div>
        <div id='singers'>
          <Spacing height="35px"/>
          <div className='sub-title' >
            <span >
              獨唱組
            </span>
          </div>
          <Spacing height="35px"/>
          {
            singerData.individual.map(
              (value) => <SingerCell img={value.image} name={value.name} content={value.text} key={value.id}/>
            )
          }
          <Spacing height="35px"/>
          <div className='sub-title' >
            <span >
              合唱組
            </span>
          </div>
          <Spacing height="35px"/>   
          {
                singerData.cooperate.map(
                  (value) => <SingerCell img={value.image} name={value.name.join('\n')} content={value.text} key={value.id}/>
                )
          } 
          <Spacing height="45px"/>
        </div>
      </div>
     </div> 
    )
  }
}