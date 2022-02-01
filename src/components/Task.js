import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const { REACT_APP_SERVER_URL } = process.env

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check: this.props.check,


        }
    }
    componentDidMount() {
        console.log('line 15', this.props)
    }

    deleteTask = (e) => {
        axios.post(`${REACT_APP_SERVER_URL}/task/deletetask/${this.props.id}`)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    clickCheck = (e) => {
        e.preventDefault();
        let button = document.getElementById(`${this.props.id}`);
        if (this.state.check === false) {
            this.state.check = true;
            button.classList.remove('far');
            button.classList.add('fas');
            console.log(this.state.check)
            // button.toggleClass("far fa-circle", "fas fa-circle")
            // this.state.checkClass = 'far fa-circle'
            axios.post(`${REACT_APP_SERVER_URL}/task/taskchangetrue/${this.props.id}`)
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
            // console.log(this.state.check);
        } else {
            this.state.check = false;
            console.log(this.state.check)
            button.classList.remove('fas');
            button.classList.add('far');
            // button.toggleClass("fas fa-circle", "far fa-circle")
            // this.state.checkClass = 'fas fa-circle'
            axios.post(`${REACT_APP_SERVER_URL}/task/taskchangefalse/${this.props.id}`)
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
            
            // console.log(this.state.check);
            //className={this.state.check ? "far fa-circle" : "fas fa-circle"} 
        }
    }
    render() {
        return(
            <tr className="tasks-item">
                <td className="task-check" width="5%"><i onClick={this.clickCheck} className={this.state.check ? "fas fa-circle" : "far fa-circle" } id={this.props.id} ></i> </td>
                <td>{this.props.task}</td>
                <td>{this.props.dueDate}</td>
                <td className="level-right hug-right"><Link to={{pathname:`/editTask/${this.props.id}`}}><i class="fas fa-tools"></i></Link><Link to='/delete/task'><i onClick={this.deleteTask} class="fas fa-minus"></i></Link></td>
            </tr>
        )
    }
}

export default Task;