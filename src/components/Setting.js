import React, { Component } from 'react';
import DrawableCanvas from './DrawableCanvas';

class Settings extends Component {
    state = {}

    constructor() {
        super();
        this.state = {
            remarks: [],
        }
        this.saveRemark = this.saveRemark.bind(this);
    }

    componentDidMount() {
        this.setState({
            remarks: [],
        })
    }

    saveRemark(newRemark) {
        console.log(newRemark);
        this.setState({
            remarks: [...this.state.remarks, newRemark],
        })
    }

    render() {
        return(
            <div>
                <DrawableCanvas saveFunction={this.saveRemark}/>
                <div>
                    {this.state.remarks.map((item, index) => (
                        <div key={index} 
                        dangerouslySetInnerHTML={{__html: item}}
                        ></div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Settings;