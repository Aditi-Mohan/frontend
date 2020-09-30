import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import assign from 'object-assign'

class DrawableCanvas extends React.Component {

  state = {}

  componentDidMount(){
    const node = ReactDOM.findDOMNode(this);
    const canvas = node.querySelector('.canvas');

    canvas.style.width = '100%';
    canvas.style.height = '500px';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const context = canvas.getContext('2d');

    this.setState({
      canvas,
      context,
      lineWidth: this.props.lineWidth,
      brushColor: this.props.brushColor,
    });
    this.resetCanvas = this.resetCanvas.bind(this);
    this.setColor = this.setColor.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.clear){
      this.resetCanvas();
    }
  }
  static getDefaultStyle() {
    return {
      brushColor: '#FFFF00',
      lineWidth: 4,
      cursor: 'pointer',
      canvasStyle: {
        backgroundColor: '#00FFDC'
      },
      clear: false
    };
  }

  handleOnTouchStart (e) {
    onmouseleave.log('started');
    const rect = this.state.canvas.getBoundingClientRect();
    this.state.context.beginPath();
    this.setState({
      lastX: e.targetTouches[0].pageX - rect.left,
      lastY: e.targetTouches[0].pageY - rect.top,
      drawing: true
    });
  }

  handleOnMouseDown(e){
    const rect = this.state.canvas.getBoundingClientRect();
    this.state.context.beginPath();

    this.setState({
      lastX: e.clientX - rect.left,
      lastY: e.clientY - rect.top,
      drawing: true
    });
  }

  handleOnTouchMove (e) {
    if (this.state.drawing) {
      const rect = this.state.canvas.getBoundingClientRect();
      const lastX = this.state.lastX;
      const lastY = this.state.lastY;
      let currentX = e.targetTouches[0].pageX - rect.left;
      let currentY = e.targetTouches[0].pageY - rect.top;
      this.draw(lastX, lastY, currentX, currentY);
      this.setState({
        lastX: currentX,
        lastY: currentY
      });
    }
  }

  handleOnMouseMove(e){
    if(this.state.drawing){
      const rect = this.state.canvas.getBoundingClientRect();
      const lastX = this.state.lastX;
      const lastY = this.state.lastY;
      let currentX = e.clientX - rect.left;
      let currentY = e.clientY - rect.top;

      this.draw(lastX, lastY, currentX, currentY);
      this.setState({
        lastX: currentX,
        lastY: currentY
      });
    }
  }

  handleonMouseUp() {
    this.setState({
      drawing: false
    });
  }

  draw(lX, lY, cX, cY) {
    const newContext = this.state.context;
    newContext.strokeStyle = this.state.brushColor;
    newContext.lineWidth = this.state.lineWidth;
    this.setState({
      context: newContext
    });
    this.state.context.moveTo(lX, lY);
    this.state.context.lineTo(cX, cY);
    this.state.context.stroke();
  }

  setColor(e) {
    this.setState({
      brushColor: e.target.style.backgroundColor,
    })
  }

  resetCanvas(){
    const width = this.state.context.canvas.width;
    const height = this.state.context.canvas.height;
    this.state.context.clearRect(0, 0, width, height);
  }

  canvasStyle(){
    const defaults = DrawableCanvas.getDefaultStyle();
    const custom = this.props.canvasStyle;

    return assign({}, defaults, custom);
  }

  colorPalette = () => {
    return(
      <div className='color-palette' style={{backgroundColor: 'lightyellow'}}>
        <ul>
          <li style={{float: 'left',}}>
            <ul typeof='None'>
              <li><div style={{backgroundColor: 'red'}} onClick={this.setColor}></div></li>
              <li><div style={{backgroundColor: 'yellow'}} onClick={this.setColor}></div></li>
              <li><div style={{backgroundColor: 'black'}} onClick={this.setColor}></div></li>
            </ul>
          </li>
          <br/>
          <li style={{float: 'left',}}>
            <ul typeof='None'>
              <li><div style={{backgroundColor: 'blue'}} onClick={this.setColor}></div></li>
              <li><div style={{backgroundColor: 'purple'}} onClick={this.setColor}></div></li>
              <li><div style={{backgroundColor: 'grey'}} onClick={this.setColor}></div></li>
            </ul>
          </li>
          <br/>
          <li style={{float: 'left',}}>
            <ul typeof='None'>
              <li><div style={{backgroundColor: 'green'}} onClick={this.setColor}></div></li>
              <li><div style={{backgroundColor: 'orange'}} onClick={this.setColor}></div></li>
              <li><div style={{backgroundColor: 'brown'}} onClick={this.setColor}></div></li>
            </ul>
          </li>
          <br/>
          <li style={{float: 'left',}}>
            <ul typeof='None'>
              <li><div style={{backgroundColor: 'pink'}} onClick={this.setColor}></div></li>
              <li><div style={{backgroundColor: 'lightgreen'}} onClick={this.setColor}></div></li>
              <li><div style={{backgroundColor: 'magenta'}} onClick={this.setColor}></div></li>
            </ul>
          </li>
          <br/>
        </ul>
      </div>
    );
  }

  render() {
    return (
        <div className='drawable-canvas'>
          {this.colorPalette()}
      <canvas className='canvas' style = {this.canvasStyle()}
        onMouseDown = {this.handleOnMouseDown.bind(this)}
        onTouchStart = {this.handleOnTouchStart.bind(this)}
        onMouseMove = {this.handleOnMouseMove.bind(this)}
        onTouchMove = {this.handleOnTouchMove.bind(this)}
        onMouseUp = {this.handleonMouseUp.bind(this)}
        onTouchEnd = {this.handleonMouseUp.bind(this)}
      >
      </canvas>
      <button onClick={() => {this.props.saveFunction(this.state.context); this.props.toggle()}}>Done</button>
      <button onClick={this.resetCanvas}>Clear</button>
      <button onClick={() => {this.props.toggle()}}>Cancel</button>
      </div>
    );
  }

}

DrawableCanvas.propTypes = {
  brushColor: PropTypes.string,
  lineWidth: PropTypes.number,
  cursor: PropTypes.string,
  canvasStyle: PropTypes.shape({
    backgroundColor: PropTypes.string
  }),
  clear: PropTypes.bool,
  remarks: PropTypes.array,
  saveFunction: PropTypes.func,
  toggle: PropTypes.func,
};

export default DrawableCanvas;