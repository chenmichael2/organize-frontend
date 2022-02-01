import React, { Component } from 'react';
import axios from 'axios';

const { REACT_APP_SERVER_URL } = process.env

class EditTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: "",
            date: "", 
            taskId: this.props.location.pathname.split('/')[2],
            currentTask: "",
            currentDate: "",
        }
    }

    componentDidMount() {
        axios.post(`${REACT_APP_SERVER_URL}/task/currentTask/${this.state.taskId}`)
            .then(res => {
              console.log(res);
                this.setState({
                    currentTask: res.data.task[0].task,
                    currentDate: res.data.task[0].dateDue,
                })
            })
            .catch(err => {
                console.log(err);
            })
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
        };
        axios.post(`${REACT_APP_SERVER_URL}/task/update/${this.state.taskId}`, newTask)
          .then(response => {
              console.log(response.data);
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
                        <input type="text" placeholder={this.state.currentTask} name="task" onChange={this.handleTask} required />
                        <br />
                        <label for="date"><b>Due Date</b></label>
                        <input type="date" placeholder={this.state.currentDate} name="dateDue" onChange={this.handleDate} required />
                        <br />
                        <button type="submit" className="btn">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default EditTask;