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
            r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
            return images;
          }
          
          const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));
          var remarks = [];
          var i=0;
          var block = [];
          for(var key in images) {
              if( i === 0 ) {
                  block.push(key);
                  i++;
                  continue;
              }
              if( i === 1) {
                remarks.push(
                    <div key={Math.random()} style={{width: '305px', height: '405px'}} >
                        <img width='300px' height='200px' src={images[block[0]]} alt={block[0]}/>
                        <img width='300px' height='200px' src={images[key]} alt={block[1]}/>
                    </div>
                )
                i=0;
                block = [];
              }
          }
          for(var key in images) {
            if( i === 0 ) {
                block.push(key);
                i++;
                continue;
            }
            if( i === 1) {
              remarks.push(
                  <div key={Math.random()} style={{width: '305px', height: '405px'}} >
                      <img width='300px' height='200px' src={images[block[0]]} alt={block[0]}/>
                      <img width='300px' height='200px' src={images[key]} alt={block[1]}/>
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
            <div style={{width: this.state.width, position: 'relative', height: '405px',paddingBottom: '3rem', border:'black solid'}}>
                    <h1 style={{float: 'left'}}>Leave a Message</h1>
                    <div className='add-remark-btn'>
                        <EditIcon/>
                    </div>
                <HorizontalScroll reverseScroll={true}>
                    {this.state.remarks}
                </HorizontalScroll>
                {/* <EditIcon/> */}
            </div>
        )
    }
}

export default Messages;