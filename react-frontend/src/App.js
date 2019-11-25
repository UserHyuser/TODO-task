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
        fetch("http://localhost:3000/tasks")
            .then(response => response.json())
            .then(responseJson => {
                    this.setState({tasks: responseJson.data});
                },
            )
    }

    showCard=id=> {
        fetch(`http://localhost:3000/tasks/${id}`)
            .then(response => response.json())
            .then(
                responseJson=> {this.setState({ player:responseJson.data })},
            );
        this.setState({
            allTasks:false,
            oneTask:true
        });
    };


}


