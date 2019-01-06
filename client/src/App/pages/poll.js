import React from 'react'

export default class Poll extends React.Component{

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

    componentDidMount(){
        this.postData('/api/poll', {object: 1})
            .then(data => {})
            .then(error => console.log(error))
    }

    render(){
        return(
            <div>

            </div>
        )
    }
}