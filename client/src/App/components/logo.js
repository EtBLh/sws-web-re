import './logo.css'
import React from 'react';

export default class logo extends React.Component {

    render() {
        return (
            <div id="logo" className={this.props.className}>
            <span id="big">SING</span>
            <br />
            <span id="small">WITH SOUL...</span>
            </div>
        )
    }
}