import React, { Component } from 'react';
import DrawableCanvas from './DrawableCanvas';
import C2S from '../libraries/C2S';

class Settings extends Component {
    state = {}

    constructor() {
        super();
        this.state = {
            remarks: [],
        }
        this.saveRemark = this.saveRemark.bind(this);
        console.log(typeof (() => {}));
    }

    componentDidMount() {
        this.state = {
            remarks: [],
        }
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