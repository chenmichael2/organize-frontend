import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const { REACT_APP_SERVER_URL } = process.env


class Project extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }
  render() {
    return (
        <li className="title">- {this.props.name}</li>
    )
  }
}

export default Project;