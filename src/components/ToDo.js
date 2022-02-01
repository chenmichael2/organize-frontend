import axios from 'axios';
import React, { Component } from 'react';
import Project from './Project';
import SideBarList from './SideBarList'
import { Link } from 'react-router-dom';

const { REACT_APP_SERVER_URL } = process.env

class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    }
    
  }
  componentDidMount() {
    console.log('Stand out', this.props.user)
    axios.post(`${REACT_APP_SERVER_URL}/project/${this.props.user.id}`, )
      .then((response) => {
          // console.log(response.data);
          this.setState({
            projects: response.data.data
          })
          console.log(this.state.projects)
      })
      .catch((error) => {
          console.log('ERROR', error);
      })
  }

  displayProjects() {
    const display = this.state.projects.map((p, idx) => {
      return <Project key={idx} projectId={p._id} name={p.projectName} userId={this.props.user.id} />
    });
    return display;
  }

  displayProjectList() {
    const display = this.state.projects.map((p, idx) => {
      return <SideBarList key={idx} name={p.projectName} userId={this.props.user.id}/>
    });
    return display;
  }

  render() {
    return (
      <div>
        <div className="side-bar">
          <div className="side-header">
            <h2><span className="side-title">Tasks</span><span className='make-project'><Link to="/project" userId={this.props.user.id}><i class="fas fa-plus"></i></Link></span></h2> 
          </div>
          <div className="side-list">
            <ul>
              {this.displayProjectList()}
            </ul>
          </div>
        </div>
        <div className="todo-list">
          <div className="card-table">
            <div className="content">
              {this.displayProjects()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ToDo;