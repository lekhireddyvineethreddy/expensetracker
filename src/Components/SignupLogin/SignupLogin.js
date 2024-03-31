import React, { useState } from 'react'
import Signup from './Signup'
import Login from './Login';
// import Login from './Login'


const SignupLogin = () => {
    const [loginVis, setLoginVis] = useState(true);

    const showLoginHandler = () => {
        setLoginVis(true);
    }

    const showSignupHandler = () => {
        setLoginVis(false);
    }

    return (
        <div>
            <h1>Welcome To Expense Tracker</h1>
            {loginVis && <Login showSignup={showSignupHandler} />}
            {!loginVis && <Signup showLogin={showLoginHandler} />}
        </div>
    )
}

export default SignupLogin