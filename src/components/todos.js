import React, {Component} from 'react';

class Todos extends Component {

    refreshList() {
        fetch("/api/confirmed/"+this.props.country).then(res => res.json()).then((res) => {console.log(res);}).catch(err => {console.log(err);})
    }
    componentDidMount() {
        this.refreshList();
    }

    render() {
        return(
            <div>
                Todos
            </div>
        )
    }
}

export default Todos;