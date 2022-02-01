import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DeleteTask extends Component {
    
    render() {
        return(
            <div className="delete-page">
                <h1>Deleted Task</h1>
                    <Link to="/todo"><button className="btn btn-primary">Go Back</button></Link>
            </div>
        )
    }
}

export default DeleteTask;