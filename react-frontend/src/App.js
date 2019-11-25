import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super();
    this.state = {
      allTasks: true,
      oneTask: false,
      tasks: [],
      task: {},
    };
  }

    componentDidMount = (refresh) => {
      fetch('http://localhost:3001/tasks')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({ tasks: responseJson });
          if (refresh) {
            this.showAllTasks();
          }
        });
    }

    showOneTask = (id) => {
      fetch(`http://localhost:3001/tasks/${id}`)
        .then((response) => response.json())
        .then(
          (responseJson) => {
            this.setState({ task: responseJson });
          },
        );
      this.setState({
        allTasks: false,
        oneTask: true,
      });
      console.log(this);
    };

    showAllTasks = () => {
      this.setState({
        allTasks: true,
        oneTask: false,
      });
    };

    handleChangeTitle = (e) => {
      this.setState({ title: e.target.value });
    };

    handleChangePriority = (e) => {
      this.setState({ priority: e.target.value });
    };

    handleSubmit = (e) => {
      e.preventDefault();
      const task = {
        name: this.state.title,
        priority: this.state.priority,
      };
      this.addTask(task);
      this.setState({ title: '' });
      this.setState({ priority: '' });
    };

    addTask = (task) => {
      try {
        fetch('http://localhost:3001/tasks', {
          method: 'POST',
          body: JSON.stringify(task),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (e) {
        console.error(e);
      }
      this.componentDidMount('refresh');
    }

    updateTask = (id) => {
      fetch(`http://localhost:3001/tasks/${id}`, {
        method: 'POST',
        body: {

        }, // TODO: add logic for update
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.message === 'Task was successfully updated') {
            this.componentDidMount();
            this.showAllTasks();
          } else {
            throw console.error();
          }
        });
    }

    removeTask = (id) => {
      fetch(`http://localhost:3001/tasks/${id}/remove`)
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.message === 'Task was successfully deleted') {
            this.componentDidMount();
            this.showAllTasks();
          } else {
            throw console.error();
          }
        });
    }

    /* getNiceDate = () =>{
        console.log(this.state.task.createdDate)
        const date = this.state.task.createdDate;
        var today = new Date();
        document.getElementById('today').innerHTML=today.toLocaleDateString();
        return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
    }; */

    render() {
      return (
        <div className="container">
          {this.state.allTasks ? (
            <div className="list-group">
              {this.state.tasks.map((task) => (
                <li
                  onClick={() => this.showOneTask(task._id)}
                  className="list-group-item list-group-item-action"
                >
                  {task.name}
                </li>
              ))}
              <br />

              <form onSubmit={this.handleSubmit}>
                <input
                  className="input"
                  type="text"
                  value={this.state.title}
                  name="Title"
                  onChange={this.handleChangeTitle}
                />
                <input
                  className="input"
                  type="text"
                  value={this.state.priority}
                  name="Priority"
                  onChange={this.handleChangePriority}
                />
                <button type="submit">Add</button>
              </form>
            </div>
          ) : null}
          {this.state.oneTask ? (
            <div className="task" style={{ width: '18rem' }}>
              <div className="task-body">
                <h5 className="task-title">{this.state.task.name}</h5>
                <p className="task-text">
Created:
                  {this.state.task.createdDate}
                </p>
                <p className="task-text">
Priority:
                  {this.state.task.priority}
                </p>
                <div onClick={() => this.showAllTasks()} className="btn btn-primary">
                                Back
                </div>
                <div
                  onClick={() => {
                    this.updateTask(this.state.task._id);
                  }}
                  className="btn btn-primary"
                >
                                Update
                </div>
                <div onClick={() => this.removeTask(this.state.task._id)} className="btn btn-primary">
                                Remove
                </div>
              </div>
            </div>
          ) : null}
        </div>
      );
    }
}
