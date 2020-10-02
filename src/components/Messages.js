import React, { Component } from 'react';
import HorizontalScroll from 'react-scroll-horizontal';
import { ReactComponent as EditIcon } from '../svgs/icons/edit.svg'
import DrawableCanvas from './DrawableCanvas';

class Messages extends Component {
    state = {}

    constructor() {
        super();
        var remarks = this.getRemarks();
        this.state = {
            popup: false,
            remarks,
        }
        this.updateDimensions = this.updateDimensions.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions)
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

    getRemarks() {
        function importAll(r) {
            let images = {};
            r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); return null;});
            return images;
          }
          
          const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));
          var remarks = [];
          var i=0;
          var block = [];
          for(var keys in images) {
              if( i < 2 ) {
                  block.push(keys);
                  i++;
                  continue;
              }
              if( i === 2) {
                remarks.push(
                    <div key={Math.random()} style={{width: '305px', height: '405px'}} >
                        <img width='300px' height='200px' src={images[block[0]]} alt={block[0]}/>
                        <img width='300px' height='200px' src={images[block[1]]} alt={block[1]}/>
                        <img width='300px' height='200px' src={images[keys]} alt={keys}/>
                    </div>
                )
                i=0;
                block = [];
              }
          }
          i=0;
          block = [];
          for(var keys in images) {
            if( i < 2 ) {
                block.push(keys);
                i++;
                continue;
            }
            if( i === 2) {
              remarks.push(
                  <div key={Math.random()} style={{width: '305px', height: '405px'}} >
                    <img width='300px' height='200px' src={images[block[0]]} alt={block[0]}/>
                    <img width='300px' height='200px' src={images[block[1]]} alt={block[1]}/>
                    <img width='300px' height='200px' src={images[keys]} alt={keys}/>
                  </div>
              )
              i=0;
              block = [];
            }
        }
        i=0;
        block = [];
        for(var keys in images) {
            if( i < 2 ) {
                block.push(keys);
                i++;
                continue;
            }
            if( i === 2) {
              remarks.push(
                  <div key={Math.random()} style={{width: '305px', height: '405px'}} >
                    <img width='300px' height='200px' src={images[block[0]]} alt={block[0]}/>
                    <img width='300px' height='200px' src={images[block[1]]} alt={block[1]}/>
                    <img width='300px' height='200px' src={images[keys]} alt={keys}/>
                  </div>
              )
              i=0;
              block = [];
            }
        }
        return remarks;
    }

    structureRemarks() {
        for(var i=0; i< this.state.remarks.length; i+=3) {

        }
    }

    addRemark(newRemark) {
        console.log(newRemark);
        this.setState({
            remarks: [...this.state.remarks, newRemark],
        })
    }

    showPopUp() {
        return(
            <div style={{zIndex: 90, width: window.innerWidth, height: window.innerHeight, position: "fixed", top: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.3)'}}>
                <div style={{padding: '2%', width: window.innerWidth - 100, height: window.innerHeight - 100, position: "fixed", top: 50, left: 50, backgroundColor: 'white', borderRadius: '20px'}}>
                    <DrawableCanvas/>
                </div>
            </div>
        )
    }

    render() {
        return(
            <div style={{height: '735px', marginLeft: 20, width: this.state.width - 47}}>
                <h1 style={{fontSize:60}}>Leave a Message</h1>
                {!this.state.popup && <div onClick={this.togglePopup} className='add-remark-btn' style={{marginTop: window.innerHeight*0.9 - 45, marginRight: window.innerWidth*0.03 + 20,}}>
                    <EditIcon/>
                    <h5 style={{marginTop: 4}}>Add</h5>
                </div>}
                <div style={{height: '605px', width: this.state.width - 57}}>
                    <HorizontalScroll reverseScroll={true}>
                        {this.state.remarks}
                    </HorizontalScroll>
                </div>
                {this.state.popup && this.showPopUp()}
            </div>
        )
    }
}

export default Messages;