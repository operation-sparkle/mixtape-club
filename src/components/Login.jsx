import React from 'react';

const LoginBox = () => {
    return (
        <div className="login-box">
        <h3>Login to create and share mixtapes.</h3>
            <a href="/auth/google"><button>Sign In with Google</button></a>
        </div>
    )
};

export default LoginBox;