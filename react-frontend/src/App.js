import React, { Component } from "react";
import "./App.css"

export default class App extends Component {
    constructor(props) {
        super();
        this.state = {
            allTasks: true,
            oneTask: false,
            tasks: [],
            task: {}
        };
    }

    componentDidMount() {
        fetch("http://localhost:3001/tasks")
            .then(response => response.json())
            .then(responseJson => {
                this.setState({ tasks: responseJson });
                console.log(this)
            });
    }

    showOneTask = id => {
        fetch(`http://localhost:3001/tasks/${id}`)
            .then(response => response.json())
            .then(
                responseJson => {
                    this.setState({task: responseJson})
                },
            );
        this.setState({
            allTasks: false,
            oneTask: true
        });
        console.log(this)
    };
    showAllTasks = () => {
        this.setState({
            allTasks: true,
            oneTask: false
        });
    };

    /*getNiceDate = () =>{
        console.log(this.state.task.createdDate)
        const date = this.state.task.createdDate;
        return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
    };*/

    render() {
        return (
            <div className="container">
                {this.state.allTasks ? (
                    <div className="list-group">
                        {this.state.tasks.map(task => (
                            <li
                                onClick={() => this.showOneTask(task._id)}
                                className="list-group-item list-group-item-action"
                            >
                                {task.name}
                            </li>
                        ))}
                    </div>
                ) : null}
                {this.state.oneTask ? (
                    <div class="task" style={{ width: "18rem" }}>
                        <div class="task-body">
                            <h5 class="task-title">{this.state.task.name}</h5>
                            <p class="task-text">Created: {this.state.task.createdDate}</p>
                            <p className="task-text">Priority: {this.state.task.priority}</p>
                            <div onClick={() => this.showAllTasks()} class="btn btn-primary">
                                Back
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        )
    }

}


