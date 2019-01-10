import React from 'react';
import './swiper.css'
import Swiper from 'react-id-swiper'
import singerData from '../data/singers'

export default class swiper extends React.Component{

  render(){
    const params = {
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
          delay: 2500,
          disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      key: 11,
      loop: true,
      direction: 'horizontal'
    }
  
    return(
        <Swiper {...params}>
            {
              singerData.individual.map(value =>
                <img src={value.image} alt={`${value.name}`} className='slider-image slider' key={value.id}/>
              )
            }
            {
              singerData.cooperate.map(value =>
                <img src={value.image} alt={`${value.name}`} className='slider-image slider' key={value.id}/>
              )
            }
        </Swiper>
    )
  }
}