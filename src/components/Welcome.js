import React from 'react';
import { Link } from 'react-router-dom';


const Welcome = () => {
    return (
        <div className="welcome-page">
            <h1 className="welcome-title">Welcome to Organize</h1>
            <h2>Create a way to keep yourself organized.</h2>
            
            <p><Link to="/todo">Go Do!</Link></p>
        </div>
    );
}

export default Welcome;