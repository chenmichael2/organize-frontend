import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Task from './Task';

const { REACT_APP_SERVER_URL } = process.env


class Project extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: "",
      date: "",
      arrTask: [],
    }
  }
  componentDidMount() {
    axios.get(`${REACT_APP_SERVER_URL}/task/projectTasks/${this.props.projectId}`)
      .then(res => {
        console.log(res);
        this.setState({
          arrTask: res.data.projectTasks
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
    axios.post(`${REACT_APP_SERVER_URL}/project`, this.state)
      .then(response => {
        console.log(response)
      })
      .catch(error => 
        console.log(error));
  }

  displayTasks() {
    const display = this.state.arrTask.map((c, idx) => {
      let splitDate = c.dateDue.split('T')[0].split('-'); //['2022', '01', '27']
      let date = splitDate[1] + '/' + splitDate[2] + '/' + splitDate[0];
      return <Task key={idx} task={c.task} dueDate={date} check={c.checked} id={c._id}/>
    });

    return display;
  }

  render() {
    return (
      <div>
        <div className="table-container">
          <table className="table is-fullwidth is-striped">
            <tbody>
              <tr>
                <td width="5%"></td>
                <td className="table-header">{this.props.name}</td>
                <td width="7%"><Link to={{
                  pathname: `/newToDo/${this.props.projectId}`}}><div className="level-right hug-right plus-header"><i class="fas fa-plus"></i></div></ Link></td>
                <td width="7%"><Link to={{pathname: `/confirm/delete/${this.props.projectId}`}} ><i class="fas fa-minus"></i></Link></td>
              </tr>
              {this.displayTasks()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Project;