import React from 'react';

class spacing extends React.Component {
    render (){
        if (this.props.height && this.props.width){
            console.error('Spacing definition error: height and width can\'t exist in a instance.')
            return undefined;
        }
        return(
            this.props.height?
            <div style={{height: this.props.height}}></div>:
            <div style={{width: this.props.width, display: 'inline-block'}}></div>
        )
    }
}

export default spacing;