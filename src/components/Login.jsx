import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const LoginBox = () => {
    return (
        
        <div className="card">
            <div className="card-header">Login</div>
            <div className="card-body">
                <h5 className="card-title">Welcome to Mixtape Club!</h5>
                <p className="card-text">You must be logged in to create and share mixtapes.</p>
                <a href="/auth/google" className="btn btn-primary">Sign In with Google</a>
            </div>
        </div>
    )
};

export default LoginBox;