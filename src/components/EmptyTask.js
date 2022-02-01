import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EmptyTask extends Component {
    
    render() {
        return(
            <tr>
                <td width="5%"></td>
                <td>Add a task!</td>
                <td></td>
                <td className="level-right hug-right"><Link to="/editTask"><i class="fas fa-tools"></i></Link></td>
            </tr>
        )
    }
}

export default EmptyTask;