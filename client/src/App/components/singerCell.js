import React from 'react'
import './singerCell.css'

export default class Singer extends React.Component{
    render() {
        return(
                <div className="singer">
                    <img src={this.props.img} alt='singer cell including the description of a singer' className='singerIcon'/>
                    <div className='content'>
                        <h3>{this.props.name}</h3>
                        <p>{this.props.content}</p>
                    </div>
                </div>
        )
    }
}