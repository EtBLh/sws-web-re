import React from 'react'
import './singer.css'
import testImage from '../resource/IMG_3044.png'

export default class Singer extends React.Component{
    render() {
        return(
                <div className="singer">
                    <img src={testImage} alt='test' className='singerIcon'/>
                    <p className='content'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ligula dolor, tempus id lorem rutrum, eleifend molestie sem. Nulla vestibulum, eros vel iaculis fermentum, odio turpis suscipit lectus, vitae scelerisque velit risus quis nibh. Donec suscipit vestibulum mi, in luctus neque. Mauris consequat vitae dolor a porttitor. Proin mauris mauris, consectetur eget viverra quis, rhoncus quis arcu. Integer id placerat nisl. Morbi ipsum turpis, faucibus non urna a, feugiat aliquet nulla. Nunc at cursus justo. Aenean non rhoncus elit, nec finibus erat. Proin gravida sapien quis ante placerat pharetra. Ut tempor tincidunt lacus at viverra. Etiam iaculis lorem in mauris suscipit imperdiet. Donec sed felis non tellus ultrices hendrerit vestibulum non quam. Mauris eu enim euismod, scelerisque eros vel, vulputate augue.
                    </p>
                    <button class='moreInfo'> More Information...</button>
                </div>
        )
    }
}