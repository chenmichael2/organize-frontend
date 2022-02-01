import React, { Component } from 'react';
import axios from 'axios';

const { REACT_APP_SERVER_URL } = process.env

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
        projectName: "",
        user: this.props.user.id
    }
    
  }

  handleProject = (e) => {
    e.preventDefault();
    let projectValue = e.target.value;
    
    this.setState({
      projectName: projectValue,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${REACT_APP_SERVER_URL}/project/new`, this.state)
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
              <h1 className="task-title">Project</h1>
              <label for="project"><b>Title</b></label>
              <input type="text" placeholder="Title" name="project" onChange={this.handleProject} required />
              <br />
              <button type="submit" className="btn">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Project;