import React from 'react'
import singersData from '../data/singers'
import SingersPollSelector from '../components/singersPollSelector'
import './poll.css'
import Spacing from '../components/spacing'
import {Link} from 'react-router-dom'

export default class Poll extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            selectedID: -1,
            email: '',
            submitted:{
                email: '',
                object: -1,
                status: 'unsubmitted'
            }
        }
    }

    async postData(url=``, data = {}) {
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

    submit(){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(this.state.selectedID === -1){
            alert('Please select a singer')
        } else if(!re.test(this.state.email)){
            alert(`Your email address "${this.state.email}" is not validated.`)
        } else {
            console.log({email: this.state.email, object: this.state.selectedID });
            this.postData('/api/poll', {email: this.state.email, object: this.state.selectedID })
            .then(data => {
                this.setState({submitted: data})
                this.refs['main'].style.display = 'none';
                this.refs['success'].style.display = 'block';
            })
            .then(error => console.log(error))
        }
    }

    select(id){
        this.setState({
            selectedID: id
        })
        for (let i = 1; i <= 11; i++){
            this.refs['SPS'+i].select(false)
        }
        this.refs['SPS'+id].select(true)
    }

    render(){
        return(
            <div>
                <Link to='/'>
                    <div className='home_link'>
                    <i className="fas fa-home"></i> 
                    </div>
                </Link>
                <div className='container' ref='success' style={{display:'none', textAlign: 'center'}}>
                    <Spacing height='40px'/>
                    <i className="fas fa-check-circle success-sign"></i>
                    <p style={{fontSize: '1.3rem'}}>
                        A verification email was sent to <br/> 
                        <b>{this.state.submitted.email} </b><br/>
                        Please check your email.
                    </p>
                    <Spacing height='40px'/>
                    <div className='sub-title' >
                        <span >
                            Sing with Soul Polling Sys
                        </span>
                    </div>
                    <Spacing height='140px'/>
                </div>
                <div className='container' ref='main'>
                    <div className='sub-title' >
                        <span >
                            Select Your Fav Singer
                        </span>
                    </div>
                    <div style={{textAlign: 'center'}}>
                    {
                        singersData.individual.map(value => 
                            <SingersPollSelector 
                            name={value.name} 
                            image={value.image}
                            id={value.id}
                            res={(param) => this.select(param)}
                            key={value.id}
                            ref={'SPS'+value.id}
                            />
                        )
                    }
                    {
                        singersData.cooperate.map(value => 
                            <SingersPollSelector 
                            name={value.name.join("\n")} 
                            image={value.image}
                            id={value.id}
                            res={(param) => this.select(param)}
                            key={value.id}
                            ref={'SPS'+value.id}
                            />
                        )
                    }
                    </div>

                    <Spacing height='35px'/>

                    <div className='sub-title' >
                        <span >
                        Verification
                        </span>
                    </div>               

                    <Spacing height='35px'/>

                    <div id="verification">
                        <span>
                            <span>Enter your email address: </span>
                            <Spacing height='10px'/>
                           <input id='email' value={this.state.email} onChange={(evt)=>{this.setState({email: evt.target.value})}}/>
                        </span>
                        <Spacing height='35px'/>
                        <button onClick={() => this.submit()} 
                        id='pollButton'>Poll</button>
                        <br/>
                        <p style={{color: '#BABABA', textAlign: 'left'}}>
                            After that, you will receive a verification email,
                            Please check it on anywhere including your spam,
                            open it and finish the verification
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}