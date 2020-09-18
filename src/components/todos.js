import React, {Component} from 'react';
import axios from "axios";

class Todos extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         activeItem: this.props.activeItem,
    //     };
    //     console.log(this.props.activeItem.id);
    //     console.log(this.props.activeItem.title);
    //     console.log(this.props.activeItem.descripiton);
    //     console.log(this.props.activeItem.completed);
    // }

    refreshList() {
        axios.get("/api/todos").then(res => console.log(res.data)).catch(err => console.log(err));
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