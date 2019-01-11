import React from 'react'
import './poll.css'
import Spacing from '../components/spacing'
import {
    Link
} from 'react-router-dom'

export default class verifyDone extends React.Component {

    constructor(props) {
        super(props);

        let id = this.props.match.params.id

        this.state = {
            pollAvailability: false,
            status: false
        }

        // get poll status
        fetch('/api/pollStatus')
            .then(res => res.json())
            .then((data) => { this.setState({pollAvailability: data.status})})

        // post verify request
        this.postData(`/api/Verify/${id}`, {id: id})
            .then((data) => ( this.setState({status: data.status})))
    }

    async postData(url = ``, data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrer: "no-referrer",
            body: JSON.stringify(data),
        });
        return await response.json(); // parses response to JSON
    }

    render() {
        return (
            <div>
            <Link to='/'>
                <div className='home_link'>
                <i className="fas fa-home"></i> 
                </div>
            </Link>
            <div className='container' ref='success' 
                style={{
                    display:this.state.pollAvailability&&
                        this.state.status? 'block':'none',
                    textAlign: 'center'}}
                >

                <Spacing height='40px'/>
                <i className="fas fa-check big-sign"></i>
                <p style={{fontSize: '1.3rem'}}>
                    Verification is done.<br/>
                    Thank you for supporting Sing with Soul.
                </p>
                <Spacing height='40px'/>
                <div className='sub-title' >
                    <span >
                        Sing with Soul Polling Sys
                    </span>
                </div>
                <Spacing height='140px'/>
            </div>
            <div className='container' ref='unavailable' style={{display: !this.state.pollAvailability||!this.state.status? 'block': 'none', textAlign: 'center'}}>
                <Spacing height='40px'/>
                <i className="fas fa-times-circle big-sign"></i>
                <p style={{fontSize: '1.3rem'}}>
                    Something wrong here :(
                </p>
                <Spacing height='40px'/>
                <div className='sub-title' >
                    <span >
                        Sing with Soul Polling Sys
                    </span>
                </div>
                <Spacing height='140px'/>
            </div>
        </div>
        )
    }
}