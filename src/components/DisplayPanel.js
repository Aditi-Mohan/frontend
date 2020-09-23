import React, { Component } from 'react';
import '../css/displayPanel.css';
import {ReactComponent as Tap} from '../svgs/icons/tap.svg';

class DisplayPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: this.props.width,
            country: null,
            data: null,
        }
    }

    componentDidUpdate(prevProps) {
        if( prevProps.width !== this.props.width ) {
            this.setState({width: this.props.width});
        }
        if( this.props.data !== null ) {
        if( prevProps.data !== this.props.data ) {
            Promise.all([
                fetch("http://127.0.0.1:8000/api/confirmed/"+this.props.data),
                fetch("http://127.0.0.1:8000/api/deaths/"+this.props.data),
                fetch("http://127.0.0.1:8000/api/recoveries/"+this.props.data)]).then( (responses) => {
                    
                    return Promise.all(responses.map(function (response) {
                        return response.json();
                    }));
                }).then((data) => {
                    
                    this.setState({
                        country: this.props.data,
                        data: {'conf': data[0], 'death': data[1], 'rec': data[2]},
                    });

                    console.log(this.state.data);
                }).catch(function (error) {
                    console.log(error);
                });
            }
    }
    }

    empty() {
        return(
            <div style={{display: 'block', textAlign: 'center', padding: '2%'}}>
                <h3 >Select a Country to see Details </h3>
                <Tap/>
            </div>
        );
    }

    display() {
        return(
            <div>
                <h4 style={{textAlign: 'center'}}>{this.state.country}</h4>
        <table className='display-table'>
            <tbody>
        <tr>
                <td>
                    <br/>
                    <label>
                        Rank: 
                    </label>
                    <br/><br/>
                </td>
                <td><br/><span> ??? </span><br/><br/></td>
            </tr>
            <tr>
                <td>
                    <label>
                        Total Confirmed: 
                    </label>
                    <br/><br/>
                </td>
                <td><span> {this.state.data == null? '': this.state.data.conf.total} </span><br/><br/></td>
            </tr>
            <tr>
                <td>
                    <label>
                        Total Deaths: 
                    </label>
                    <br/><br/>
                </td>
                <td><span> {this.state.data == null? '': this.state.data.death.total} </span><br/><br/></td>
            </tr>
            <tr>
                <td>
                    <label>
                        Total Recoveries: 
                    </label>
                    <br/><br/>
                </td>
                <td><span> {this.state.data == null? '': this.state.data.rec.total} </span><br/><br/></td>
            </tr>
            <tr>
                <td>
                    <label>
                        Total Active: 
                    </label>
                    <br/><br/>
                </td>
                <td><span> {this.state.data == null? '': this.state.data.conf.total- (this.state.data.rec.total+this.state.data.death.total)} </span><br/><br/></td>
            </tr>
            <tr>
                <td>
                    <label>
                        New Cases Today: 
                    </label>
                    <br/><br/>
                </td>
                <td><span> 45020389 </span><br/><br/></td>
            </tr>
            </tbody>
        </table>
    </div>
        );
    }

    render() {
        return (
            <div className='displayPanel' style={{width: this.state.width, height: window.innerHeight, float:"right", verticalAlign:'bottom'}}>
                {this.props.data == null? this.empty() : this.display()}
            </div>
        )
    }
}

export default DisplayPanel;