import React, { Component } from 'react';
import '../css/displayPanel.css';
import {ReactComponent as Tap} from '../svgs/icons/tap.svg';

class DisplayPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: this.props.width,
            height: this.props.height,
            country: null,
            data: null,
        }
    }

    componentDidUpdate(prevProps) {
        if( (prevProps.width !== this.props.width) || (prevProps.height !== this.props.height)) {
            this.setState({width: this.props.width, height: this.props.height});
        }
        if( this.props.data !== null ) {
        if( prevProps.data !== this.props.data ) {
            fetch("/api/data/"+this.props.data).then(res => {
                return res.json()
            }).then(data => {
                // console.log(data.confirmed[data.confirmed.length - 1]);
                // console.log(data.confirmed[data.confirmed.length - 2]);
                this.setState({
                    country: this.props.data,
                    data,
                });
                console.log(this.state.data);
            }).catch(err => {
                console.log(err);
            })
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

    display( loaded ) {
        return(
            <div id='display-div' style={{overflow: 'hidden'}}>
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
                <td><br/><span> {loaded && this.state.data.rank} </span><br/><br/></td>
            </tr>
            <tr>
                <td>
                    <label>
                        Total Confirmed: 
                    </label>
                    <br/><br/>
                </td>
                <td><span> {loaded && this.state.data.currconfirmed} </span><br/><br/></td>
            </tr>
            <tr>
                <td>
                    <label>
                        Total Deaths: 
                    </label>
                    <br/><br/>
                </td>
                <td><span> {loaded && this.state.data.currdeath} </span><br/><br/></td>
            </tr>
            <tr>
                <td>
                    <label>
                        Total Recoveries: 
                    </label>
                    <br/><br/>
                </td>
                <td><span> {loaded && this.state.data.currrecovery} </span><br/><br/></td>
            </tr>
            <tr>
                <td>
                    <label>
                        Total Active: 
                    </label>
                    <br/><br/>
                </td>
                <td><span> {loaded && this.state.data.curractive} </span><br/><br/></td>
            </tr>
            <tr>
                <td>
                    <label>
                        New Cases Today: 
                    </label>
                    <br/><br/>
                </td>
                <td><span> {loaded && 
                this.state.data.confirmed[this.state.data.confirmed.length-1]
                - this.state.data.confirmed[this.state.data.confirmed.length-2]
                } </span><br/><br/></td>
            </tr>
            </tbody>
        </table>
        <div onClick={this.chartsPage} style={{marginLeft: (this.state.width - 150)/2, width: 150}} className='popup-btn'><h6>View Charts</h6></div>
    </div>
        );
    }

    chartsPage() {
        var disp = document.getElementById('displayPanel');
        disp.classList.toggle('charts-active');
        console.log(disp);
    }

    noData() {
        return(
            <div style={{display: 'block', textAlign: 'center', padding: '2%'}}>
                <h3 >No Details are Available</h3>
            </div>
        );
    }

    render() {
        return (
            <div id='displayPanel' style={{width: this.state.width, height: this.state.height, verticalAlign:'bottom', position: 'absolute', top: 80, right: 0}}>
                {this.props.data == null? this.empty() : this.state.data == null? this.display(false): this.state.data.detail === 'Not found.'? this.noData() : this.display(true)}
            </div>
        )
    }
}

export default DisplayPanel;