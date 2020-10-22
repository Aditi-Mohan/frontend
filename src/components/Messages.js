import React, { Component } from 'react';
import HorizontalScroll from 'react-scroll-horizontal';
import { ReactComponent as EditIcon } from '../svgs/icons/edit.svg'
import DrawableCanvas from './DrawableCanvas';

class Messages extends Component {
    state = {}

    constructor() {
        super();
        var remarks = [];
        this.state = {
            popup: false,
            remarks,
            width: window.innerWidth,
        }
        this.updateDimensions = this.updateDimensions.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.addRemark = this.addRemark.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions)
        this.getRemarks();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions)
    }

    updateDimensions() {
        let width = window.innerWidth;
        this.setState({
            width,
        })
    }

    togglePopup() {
        this.setState({
            popup: !this.state.popup,
        });
    }

    // getRemarks() {
    //     function importAll(r) {
    //         let images = {};
    //         r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); return null;});
    //         return images;
    //       }
          
    //       const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));
    //       var remarks = [];
    //       for(var i=0; i<2; i++){
    //         var j=1;
    //         var block = [];
    //         for(var keys in images) {
    //             if( j === 3) {
    //                 block.push(<div key={Math.random()}><img width='300px' height='200px' src={images[keys]} alt={keys}></img></div>);
    //                 remarks.push(block);
    //                 j=1;
    //                 block=[];
    //             }
    //             else {
    //                 block.push(<div key={Math.random()}><img width='300px' height='200px' src={images[keys]} alt={keys}></img></div>);
    //                 j++;
    //             }
    //         }
    //     }
    //     fetch('api/messages/').then(async res => await res.json()).then(res => console.log(res));
    //     return remarks;
    // }

    getRemarks() {
        var messages = [];
        var block = [];
        fetch("api/messages/").then(res => res.json()).then(res => {
            res.map((item, index) => {
                var msg = <div key={index} style={{width: '300px', height: '200px'}} dangerouslySetInnerHTML={{__html: item.msg}}></div>
                if(item.bg) {
                    msg.props.style.backgroundColor = item.bg;
                }
                if(block.length === 3) {
                    messages.push(block);
                    block = [];
                    block.push(msg);
                }
                else {
                    block.push(msg);
                }
            })
            if(block.length != 0) {
                messages.push(block);
            }
        }).then(res => this.setState({remarks: messages}));
    }

    addRemark(newRemark, color) {
        var len = this.state.remarks.length;
        var count = len != 0 ? ((len - 1) * 3) + this.state.remarks[len-1].length : 0;
        console.log(typeof len);
        fetch("api/messages/", {
            method: 'POST',
            body: JSON.stringify({
                id: count+1,
                msg: newRemark,
                bg: color,
            }),
            headers: { 
                "Content-type": "application/json;"
            }
        }).then(response => {console.log('posted'); return response.json()}).then(json => console.log(json));
        newRemark = <div key={Math.random()} style={{width: '300px', height: '200px'}} dangerouslySetInnerHTML={{__html: newRemark}}></div>
        if(color) {
            newRemark.props.style.backgroundColor = color;
        }
        if( len === 0 ) {
            this.setState({
                remarks: [[newRemark]],
            })
        }
        else if(this.state.remarks[len - 1].length < 3 ) {
            var block = this.state.remarks[len-1];
            block.push(newRemark);
            this.setState({
                remarks: [...(this.state.remarks.slice(0,len-1)), block],
            })
        }
        else {
            this.setState({
                remarks: [...this.state.remarks, [newRemark]],
            })
        }
    }

    showPopUp() {
        return(
            <div style={{ zIndex: 90, width: window.innerWidth, height: window.innerHeight, position: "fixed", top: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'center'}}>
                <div style={{ borderLeft: '20px #fae19b outset', paddingTop: 0, paddingLeft: 0, padding: '5%', backgroundColor: 'white', borderRadius: '20px'}}>
                    <h5>Write a Message</h5>
                    <DrawableCanvas brushColor='#000000' toggle={this.togglePopup} saveFunction={this.addRemark}/>
                </div>
            </div>
        )
    }

    render() {
        return(
            <div style={{height: '735px', marginLeft: 20, width: this.state.width - 47}}>
                <h1 style={{fontSize:60, whiteSpace: 'nowrap'}}>Leave a Message</h1>
                {!this.state.popup && <div onClick={this.togglePopup} className='add-remark-btn' style={{marginTop: window.innerHeight*0.9 - 45, marginRight: window.innerWidth*0.03 + 20,}}>
                    <EditIcon/>
                    <h5 style={{marginTop: 4}}>Add</h5>
                </div>}
                <div style={{height: '605px', width: this.state.remarks.length*305 >= this.state.width - 57 ? this.state.width - 57: this.state.remarks.length*305}}>
                    <HorizontalScroll reverseScroll={true}>
                        {this.state.remarks.map((item, index) => (
                            <div style={{width: '305px', height: '605px'}} key={index}>{item}</div>
                        ))}
                    </HorizontalScroll>
                </div>
                {this.state.popup && this.showPopUp()}
                <div dangerouslySetInnerHTML={{__html: ''}}></div>
            </div>
        )
    }
}

export default Messages;