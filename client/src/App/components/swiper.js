import React from 'react';
import './swiper.css'
import Swiper from 'react-id-swiper'
import testImage from '../resource/singer3.JPG'

export default class swiper extends React.Component{

  frame = (number) => (
    <div>
      {/* <img src={require(`../resource/singer${number}.JPG`)} alt={`singer${number}`} className='slider-image slider'/> */}
    </div>
  )

  render(){
    const params = {
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: {
              delay: 2500,
                  disableOnInteraction: false
          }
      }
    }
  
    let body = "";

    for (let i = 1; i <=9; i++){
      body += this.frame(i)
    }

    return(
        <Swiper {...params}>
          <div>
            <img src={testImage} alt="test"/>
          </div>
        </Swiper>
    )
  }
}