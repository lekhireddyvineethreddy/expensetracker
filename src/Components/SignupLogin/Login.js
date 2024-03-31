import React, { useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import classes from "./Signup.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../../Store/auth';
import { useDispatch } from 'react-redux';
import ForgetPassForm from './ForgetPassForm';

const Login = (props) => {

    const [showForgetpass, setShowForgetpass] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const emailRef = useRef();
    const passRef = useRef();
    const formRef = useRef();

    const forgetPassHandler = () => {
        setShowForgetpass(true)
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        const enteredEmail = emailRef.current.value;
        const enteredPass = passRef.current.value;

        try {
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBjPeLjDjZcvA3N5EH5-puj1643fExns2g", {
                method: "POST",
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPass,
                    returnSecureToken: true
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                dispatch(authActions.login({ tokenId: data.idToken, email: data.email }))

            } else {
                const data = await response.json();
                let errMsg = "Authentication Failed!!";

                if (data && data.error && data.error.message) {
                    errMsg = data.error.message
                }

                throw new Error(errMsg)
            }
            formRef.current.reset();
            navigate("/profile/welcome", { replace: true })
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div className={classes.body}>
            {showForgetpass ? <ForgetPassForm onReset={() => setShowForgetpass(false)} /> :
                <><h1>LogIn</h1>

                    <Form onSubmit={submitHandler} ref={formRef}>
                        <div className={classes.form}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    required
                                    ref={emailRef}
                                />
                                <Form.Text >
                                    <p className={classes.text}>We'll never share your email with anyone else.</p>
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    required
                                    ref={passRef}
                                />
                            </Form.Group>
                            <div className={classes.forgetPass}>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Link onClick={forgetPassHandler}>Forgot Password?</Link>
                                </Form.Group>
                            </div>
                        </div>
                        <Button variant="primary" type="submit">
                            Log In
                        </Button>
                    </Form></>}
            <div className={classes.toggle}>
                <span> You don't have account? </span><button onClick={props.showSignup}>Signup</button>
            </div>
        </div>
    )
}

export default Login