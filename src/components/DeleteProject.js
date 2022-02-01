import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const { REACT_APP_SERVER_URL } = process.env

class DeleteProject extends Component {

    deleteProject = (e) => {
        axios.post(`${REACT_APP_SERVER_URL}/project/delete/${this.props.location.pathname.split('/')[3]}`, this.props.location.pathname.split('/')[3])
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render() {
        return(
            <div className="delete-page">
                <h1>Deleted Project</h1>
                    <Link to="/todo"><button className="btn btn-primary" onSubmit={this.deleteProject()}>Yes</button></Link>
            </div>
        )
    }
}

export default DeleteProject;