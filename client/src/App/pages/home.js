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

  constructor(props){
    super(props);
    this.state = {
      pollAvailability: false
    }
    fetch('/api/pollStatus')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({pollAvailability: data.status});
      })
  }

  render() {
    return(
     <div>
      <div className="container">
        <Logo className="placement1"/>
        <Nav/>
        <Spacing height="35px"/>
        <Swiper/>
        <Spacing height="35px"/>
        <div id="pollPortal" style={{display: this.state.pollAvailability? 'block': 'none'}}>
          <h3>Poll for your favorite singer!</h3> <br/>
          <Link to={'/poll'}>Poll</Link>
        </div>
        <div id='singers'>
          <Spacing height="35px"/>
          <div className='sub-title' >
            <span >
              評審
            </span>
          </div>
          <Spacing height="35px"/>
          {
            singerData.bigBoss.map(
              (value, index) => <SingerCell img={value.image} name={value.name} content={value.text} key={index}/>
            )
          }
          <Spacing height="35px"/>
          <div className='sub-title' >
            <span >
              獨唱組
            </span>
          </div>
          <Spacing height="35px"/>
          {
            singerData.individual.map(
              (value) => <SingerCell img={value.image} name={value.number+'. '+value.name} content={value.text} key={value.id}/>
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
              (value) => <SingerCell img={value.image} name={value.number+'. '+value.name.join('\n')} content={value.text} key={value.id}/>
            )
          } 
          <Spacing height="45px"/>
        </div>
      </div>
     </div> 
    )
  }
}