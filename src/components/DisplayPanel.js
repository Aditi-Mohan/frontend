import React, { Component } from 'react';
import '../css/displayPanel.css';
import {ReactComponent as Tap} from '../svgs/icons/tap.svg';
import Charts from './Charts';

class DisplayPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: this.props.width,
            height: this.props.height,
            data: null,
        }
    }

    componentDidUpdate(prevProps) {
        if( (prevProps.width !== this.props.width) || (prevProps.height !== this.props.height)) {
            this.setState({width: this.props.width, height: this.props.height});
        }
        if( this.props.country !== null ) {
            if( prevProps.country !== this.props.country ) {
                console.log("/api/data/"+this.props.country);
                fetch("/api/data/"+this.props.country).then(res => {
                    return res.json()
                }).then(data => {
                    // console.log(data.confirmed[data.confirmed.length - 1]);
                    // console.log(data.confirmed[data.confirmed.length - 2]);
                    this.updateData(data);
                    // this.props.fetchCallback(data);
                }).catch(err => {
                    console.log(err);
                })
                }
    }
    }

    updateData = (data) => {
        console.log(data);
        this.setState({data: data});
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
            <div>
            <div style={{display: 'flex'}}>
            <div id='display-div'>
        <table className='display-table'>
            <tbody>
                <tr>
                    <td>
                    <h4 style={{textAlign: 'center', float: 'top'}}>{this.props.country}</h4>
                    </td>
                </tr>
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
        </div>
        <Charts height={this.state.height*0.89} data={this.state.data} dates={this.props.dates}/>
    </div>
    </div>
        );
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
            <div id='displayPanel' style={{top: 80, right: 0, width: this.state.width, height: this.state.height}}>
                {this.props.country == null? this.empty() : this.state.data == null? this.display(false): this.state.data.detail === 'Not found.'? this.noData() : this.display(true)}
            </div>
        )
    }
}

export default DisplayPanel;