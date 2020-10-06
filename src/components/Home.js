import React, {Component} from 'react';
import WorldMap from './WorldMap';
import DisplayPanel from './DisplayPanel';
import Messages from './Messages';
import moment from 'moment';
import TopNews from './TopNews';
import Top5 from './Top5';

class Home extends Component{
    state={}

    constructor() {
        super();
        this.state = {
            selected: null,
            countryName: null,
            startdate: '1/22/20',
            dateArray: [],
            data: null,
            width: null,
            height: null,
            displayWidth: null,
            displayHeight: null,
        }
        this.clickCallback = this.clickCallback.bind(this);
        this.fetchCallback = this.fetchCallback.bind(this);
        this.updateDimensionsCallback = this.updateDimensionsCallback.bind(this);
        this.getDate = this.getDate.bind(this);
    }

    componentDidMount() {
        this.getDate();
    }

    getDate() {
        var dateArray = [];
        var startdate = moment('22-01-2020', 'DD-MM-YYYY');
        var enddate = moment().subtract(1, 'days')
        var date = startdate;
        while(date <= enddate ) {
            dateArray.push(date.format('YYYY-MM-DD'));
            date = date.add(1, 'days');
        }
        this.setState({
            dateArray,
        })
    }

    clickCallback(selected, countryName, width, displayWidth) {
        this.setState({
            selected,
            countryName,
            width,
            displayWidth,
        })
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
        <DisplayPanel dates={this.state.dateArray} width={this.state.displayWidth} country={this.state.countryName} height={this.state.displayHeight} fetchCallback={this.fetchCallback}/>
        <Top5/>
        <TopNews getNews={this.props.getNews}/>
        <Messages/>
        </div>
    )
}
}

export default Home;