import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import classes from "./Signup.module.css";

const Signup = (props) => {
    const formRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();
    const conPassRef = useRef();

    const submitHandler = async (event) => {
        event.preventDefault();

        const enteredEmail = emailRef.current.value;
        const enteredPass = passRef.current.value;
        const enteredConPass = conPassRef.current.value;

        if (enteredPass !== enteredConPass) {
            alert("Confirm Password Not Matched!!");
        } else {
            try {
                const response = await fetch(
                    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBjPeLjDjZcvA3N5EH5-puj1643fExns2g",
                    {
                        method: "POST",
                        body: JSON.stringify({
                            email: enteredEmail,
                            password: enteredPass,
                            returnSecureToken: true
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                } else {
                    const data = await response.json();
                    let errMsg = "Authentication Failed!!";

                    if (data && data.error && data.error.message) {
                        errMsg = data.error.message;
                    }

                    throw new Error(errMsg);
                }
                console.log("User succesfully signup");
                formRef.current.reset();
                props.showLogin();
            } catch (error) {
                alert(error.message);
            }
        }
    };

    return (
        <div className={classes.body}>
            <h1>SignUp</h1>

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

                    <Form.Group className="mb-3" controlId='formConfirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            required
                            ref={conPassRef}
                        />
                    </Form.Group>
                </div>
                <Button variant="primary" type="submit">
                    Sign Up
                </Button>
            </Form>
            <div className={classes.toggle}>
                <span> Alredy have an account? </span><button onClick={props.showLogin}>Login</button>
            </div>
        </div>
    );
}

export default Signup