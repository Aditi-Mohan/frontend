import React, {Component} from 'react';
import WorldMap from './WorldMap';
import DisplayPanel from './DisplayPanel';
import Messages from './Messages';

class Home extends Component{
    state={}

    constructor() {
        super();
        this.state = {
            selected: null,
            countryName: null,
            data: null,
            width: null,
            height: null,
            displayWidth: null,
            displayHeight: null,
        }
        this.clickCallback = this.clickCallback.bind(this);
        this.fetchCallback = this.fetchCallback.bind(this);
        this.updateDimensionsCallback = this.updateDimensionsCallback.bind(this);
    }

    clickCallback(selected, countryName, width, displayWidth) {
        this.setState({
            selected,
            countryName,
            width,
            displayWidth,
        })
        console.log(selected, countryName);
    }

    fetchCallback(data) {
        this.setState({
            data,
        })
    }

    updateDimensionsCallback( width, height, displayWidth, displayHeight) {
        this.setState({
            width,
            height,
            displayWidth,
            displayHeight,
        });
    }

    render() {
    return(
        <div>
        <WorldMap selected={this.state.selected}
            updateDimensionsCallback={this.updateDimensionsCallback}
            clickCallback={this.clickCallback}/>
        <DisplayPanel width={this.state.displayWidth} data={this.state.data} height={this.state.displayHeight}/>
        <Messages/>
        </div>
    )
}
}

export default Home;