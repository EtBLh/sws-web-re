import React from 'react'
import './singersPollSelector.css'

export default class SingersPollSelector extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            isSelected: ''
        }
    }

    select(status){
        this.setState({
            isSelected: status? 'selected': ''
        })
    }

    render(){
        return(
            <div
             className={'selector '+this.state.isSelected} 
             onClick={() => this.props.res(this.props.id)}
             style={this.state.isSelected?{border: '#894EE8 solid 2px'}:{}}>
                <img src={this.props.image} className='singerImage' alt='test' />
                <span className='name'>{this.props.name}</span>
            </div>
        )
    }
} 