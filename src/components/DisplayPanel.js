import React, { Component } from 'react';

class DisplayPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: this.props.width,
        }
    }

    componentDidUpdate(prevProps) {
        if( prevProps.width !== this.props.width) {
            this.setState({width: this.props.width});
        }
    }

    render() {
        return (
            <div style={{backgroundColor: 'red', width: this.state.width, height: window.innerHeight, float:"right"}}>
                DisplayPanel
            </div>
        )
    }
}

export default DisplayPanel;