import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import C2S from '../libraries/C2S';

class DrawableCanvas extends React.Component {

  state = {}

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const node = ReactDOM.findDOMNode(this);
    const canvas = node.querySelector('.canvas');

    canvas.style.width = 400;
    canvas.style.height = 300;
    canvas.width = 400;
    canvas.height = 300;

    const context = canvas.getContext('2d');
    const serializable = C2S(300, 400);

    this.setState({
      serializable,
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
      brushColor: 'rgba(225, 255, 0, 1)',
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
    this.updateSvg(lX, lY, cX, cY);
  }

  updateSvg(lX, lY, cX, cY) {
    var serializable = this.state.serializable;
    // serializable.strokeStyle = this.state.brushColor;
    // serializable.lineWidth = this.state.lineWidth;
    serializable.moveTo(lX, lY);
    serializable.lineTo(cX, cY);
    serializable.stroke();
    serializable.save();
    this.setState({
      serializable,
    })
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
    var serializable = C2S(300, 400);
    this.setState({
      serializable,
    })
  }

  canvasStyle(){
    const defaults = DrawableCanvas.getDefaultStyle();
    const custom = this.props.canvasStyle;

    return assign({}, defaults, custom);
  }

  render() {
    return (
      <div>
        <div className='drawable-canvas' style={{marginTop: '5px', border: 'black solid'}}>
      <canvas className='canvas' style = {this.canvasStyle()}
        onMouseDown = {this.handleOnMouseDown.bind(this)}
        onTouchStart = {this.handleOnTouchStart.bind(this)}
        onMouseMove = {this.handleOnMouseMove.bind(this)}
        onTouchMove = {this.handleOnTouchMove.bind(this)}
        onMouseUp = {this.handleonMouseUp.bind(this)}
        onTouchEnd = {this.handleonMouseUp.bind(this)}
      >
      </canvas>
      </div>
      <div style={{display: 'flex'}}>
      <div className='popup-btn' onClick={() => {this.props.saveFunction(this.state.serializable.getSerializedSvg(true));}}><h6>Done</h6></div>
      <div className='popup-btn' onClick={this.resetCanvas}><h6>Clear</h6></div>
      <div className='popup-btn' onClick={() => {this.props.toggle();}}><h6>Cancel</h6></div>
      </div>
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
  // toggle: PropTypes.func,
};

export default DrawableCanvas;



// colorPalette = () => {
//   return(
//     <div className='color-palette' style={{backgroundColor: 'lightyellow'}}>
//       <ul>
//         <li style={{float: 'left',}}>
//           <ul typeof='None'>
//             <li><div style={{backgroundColor: 'red'}} onClick={this.setColor}></div></li>
//             <li><div style={{backgroundColor: 'yellow'}} onClick={this.setColor}></div></li>
//             <li><div style={{backgroundColor: 'black'}} onClick={this.setColor}></div></li>
//           </ul>
//         </li>
//         <br/>
//         <li style={{float: 'left',}}>
//           <ul typeof='None'>
//             <li><div style={{backgroundColor: 'blue'}} onClick={this.setColor}></div></li>
//             <li><div style={{backgroundColor: 'purple'}} onClick={this.setColor}></div></li>
//             <li><div style={{backgroundColor: 'grey'}} onClick={this.setColor}></div></li>
//           </ul>
//         </li>
//         <br/>
//         <li style={{float: 'left',}}>
//           <ul typeof='None'>
//             <li><div style={{backgroundColor: 'green'}} onClick={this.setColor}></div></li>
//             <li><div style={{backgroundColor: 'orange'}} onClick={this.setColor}></div></li>
//             <li><div style={{backgroundColor: 'brown'}} onClick={this.setColor}></div></li>
//           </ul>
//         </li>
//         <br/>
//         <li style={{float: 'left',}}>
//           <ul typeof='None'>
//             <li><div style={{backgroundColor: 'pink'}} onClick={this.setColor}></div></li>
//             <li><div style={{backgroundColor: 'lightgreen'}} onClick={this.setColor}></div></li>
//             <li><div style={{backgroundColor: 'magenta'}} onClick={this.setColor}></div></li>
//           </ul>
//         </li>
//         <br/>
//       </ul>
//     </div>
//   );
// }