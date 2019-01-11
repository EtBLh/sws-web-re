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
            selectedFavID: -1,
            selectedTUID: -1,
            email: '',
            submitted:{
                email: '',
                object: -1,
                status: false
            },
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

        if(this.state.selectedFavID === -1 || this.state.selectedTUID === -1){
            alert('Please select a singer')
        } else if(!re.test(this.state.email)){
            alert(`Your email address "${this.state.email}" is not validated.`)
        } else {
            this.postData('/api/poll', {email: this.state.email, favObject: this.state.selectedFavID, TUObject: this.state.selectedTUID })
            .then(data => {
                if(data.isVerified){
                    alert('Sorry, each email can only vote once.')
                    return;
                } 
                this.setState({submitted: {
                    email: data.email,
                    object: data.object,
                    status: true
                }})
            })
        }
    }

    select(id, type){
        this.setState({
            selectedFavID: type=="fav"?id:this.state.selectedFavID,
            selectedTUID: type=="TU"?id:this.state.selectedTUID
        })
        if (type == 'TU'){
            for (let i = 7; i <= 11; i++){
                this.refs['SPS'+type+i].select(false)
            }
            this.refs['SPS'+type+id].select(true)
        } else if(type == 'fav'){
            for (let i = 1; i <= 11; i++){
                this.refs['SPS'+type+i].select(false)
            }
            this.refs['SPS'+type+id].select(true)
        }
    }

    render(){
        return(
            <div>
                <Link to='/'>
                    <div className='home_link'>
                        <i className="fas fa-home"></i> 
                    </div>
                </Link>


                {/* 
                  * success view
                  */}
                <div className='container' ref='success' 
                style={{
                    display:this.state.pollAvailability&&
                        this.state.submitted.status? 'block':'none',
                    textAlign: 'center'}}
                >

                    <Spacing height='40px'/>
                    <i className="fas fa-envelope big-sign"></i>
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


                {/* 
                  * error view
                  */}
                <div className='container' ref='unavailable' style={{display: this.state.pollAvailability? 'none': 'block', textAlign: 'center'}}>
                    <Spacing height='40px'/>
                    <i className="fas fa-times-circle big-sign"></i>
                    <p style={{fontSize: '1.3rem'}}>
                        Sorry, it's not able to poll for now :(
                    </p>
                    <Spacing height='40px'/>
                    <div className='sub-title' >
                        <span >
                            Sing with Soul Polling Sys
                        </span>
                    </div>
                    <Spacing height='140px'/>
                </div>

                {/* 
                  * main view
                  */}
                <div className='container'
                 ref='main' 
                 style={{display: this.state.pollAvailability&&
                    !this.state.submitted.status? 'block':'none'}}
                >
                    <div className='sub-title' >
                        <span >
                            最佳人氣獎 
                        </span>
                    </div>
                    <div style={{textAlign: 'center'}}>
                    {
                        singersData.individual.map(value => 
                            <SingersPollSelector 
                            name={value.name} 
                            image={value.image}
                            id={value.id}
                            res={(param) => this.select(param, 'fav')}
                            key={value.id}
                            ref={'SPSfav'+value.id}
                            />
                        )
                    }
                    {
                        singersData.cooperate.map(value => 
                            <SingersPollSelector 
                            name={value.name.join("\n")} 
                            image={value.image}
                            id={value.id}
                            res={(param) => this.select(param, 'fav')}
                            key={value.id}
                            ref={'SPSfav'+value.id}
                            />
                        )
                    }
                    </div>
                    <Spacing height='35px'/>
                    <div className='sub-title' >
                        <span >
                            最佳默契獎 
                        </span>
                    </div>
                    <div style={{textAlign: 'center'}}>
                    {
                        singersData.cooperate.map(value => 
                            <SingersPollSelector 
                            name={value.name.join("\n")} 
                            image={value.image}
                            id={value.id}
                            res={(param) => this.select(param,'TU')}
                            key={value.id}
                            ref={'SPSTU'+value.id}
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