import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { Redirect } from 'react-router-dom';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Login = (props) => {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    let handleEmail = (e) => {
        setEmail(e.target.value);
    }

    let handlePassword = (e) => {
        setPassword(e.target.value);
    }

    let handleSubmit = (e) => {
        e.preventDefault();

        const userData = { email, password };

        axios.post(`${REACT_APP_SERVER_URL}/api/users/login`, userData)
        .then(response => {
            const { token } = response.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            props.nowCurrentUser(decoded);
        })
        .catch(error => console.log(`Login error`, error));
    }
    console.log(props.user.id);

    if (props.user) return <Redirect to="/todo/"  />;//user={props.user}

    return (
        <div className="row mt-4 entire-login">
            <div className="col-md-7 offset-md-3">
                <div className="card card-body card-login">
                    <h2 className="py-2">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" value={email} onChange={handleEmail} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" value={password} onChange={handlePassword} className="form-control" required />
                        </div>
                        <button type="submit" className="btn btn-primary float-right">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;   