import React, { Component } from 'react';
import HorizontalScroll from 'react-scroll-horizontal';
import { ReactComponent as EditIcon } from '../svgs/icons/edit.svg'

class Messages extends Component {
    state = {}

    constructor() {
        super();
        var remarks = this.getRemarks();
        this.state = {
            remarks,
        }
        this.updateDimensions = this.updateDimensions.bind(this);
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

    render() {
        return(
            <div style={{height: '735px', marginLeft: 20, width: this.state.width - 47}}>
                <h1 style={{fontSize:60}}>Leave a Message</h1>
                <div className='add-remark-btn' style={{marginTop: window.innerHeight*0.9 - 45, marginRight: window.innerWidth*0.03 + 20,}}>
                    <EditIcon/>
                </div>
                <div style={{height: '605px', width: this.state.width - 57}}>
                    <HorizontalScroll reverseScroll={true}>
                        {this.state.remarks}
                    </HorizontalScroll>
                </div>
            </div>
        )
    }
}

export default Messages;