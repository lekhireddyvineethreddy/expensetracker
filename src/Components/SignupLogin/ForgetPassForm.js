import React, { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';


const ForgetPassForm = (props) => {
    const emailInputRef = useRef();

    const submitHandler = async (event) => {
        event.preventDefault()

        const enteredEmail = emailInputRef.current.value

        try {
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDL8noeCp6M8xxaaGThaZU-M-fs5-MP0Ok",{
                method : "POST",
                body : JSON.stringify({
                    requestType	: "PASSWORD_RESET",
                    email : enteredEmail 
                }),
                headers : {
                    "Content-Type" : "application/json"
                }
            })
            if(response.ok){
                alert("Reset Link sent To your email.")
            }else{
                const data = await response.json();
                let errMsg = "Authentication Failed!"

                if(data && data.error && data.error.message){
                    errMsg = data.error.message
                }
                throw new Error(errMsg)
            }
        } catch (error) {
            alert(error.message)
        }
        props.onReset();
    }

    return (
        <div>
            <h1>Forgot Password</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        ref={emailInputRef}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Reset
                </Button>
            </Form>
        </div>
    )
}

export default ForgetPassForm