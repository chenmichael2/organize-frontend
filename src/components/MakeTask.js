import React, { Component } from 'react';
import axios from 'axios';

const { REACT_APP_SERVER_URL } = process.env

class MakeTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "",
      date: "", 
      projectId: this.props.location.pathname.split('/')[2],
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleTask = this.handleTask.bind(this);
  }

  handleTask = (e) => {
    e.preventDefault();
    let taskValue = e.target.value;
    
    this.setState({
      task: taskValue,
    })
  }

  handleDate = (e) => {
    e.preventDefault();
    let dateValue = e.target.value;
    this.setState({
      date: dateValue,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      task: this.state.task,
      date: this.state.date,
      user: this.props.user.id,
      projects: this.state.projectId
    };
    axios.post(`${REACT_APP_SERVER_URL}/task`, newTask)
      .then(response => {
          console.log(response);
      })
      .catch(error => console.log(error));
    window.location.href="/todo"
  }

  render() {
    return (
      <div className="task-form-container">
        <div className="task-form">
          <form onSubmit={this.handleSubmit}>
              <h1 className="task-title">Task</h1>
              <label for="task"><b>Title</b></label>
              <input type="text" placeholder="Title" name="task" onChange={this.handleTask} required />
              <br />
              <label for="date"><b>Due Date</b></label>
              <input type="date" placeholder="Date" name="dateDue" onChange={this.handleDate} required />
              <br />
              <button type="submit" className="btn">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default MakeTask;