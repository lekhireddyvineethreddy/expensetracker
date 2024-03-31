import React from 'react';
import classes from "./Welcomepage.module.css";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Welcomepage = () => {

    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const verifyEmailHandler = async () => {
        try {
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBjPeLjDjZcvA3N5EH5-puj1643fExns2g", {
                method: "POST",
                body: JSON.stringify({
                    requestType: "VERIFY_EMAIL",
                    idToken: auth.token
                }),
                headers: {
                    "Content-Type": "appllication/json"
                }
            })
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                alert("Check your email , you might have recieved a verification link . Click on it to verify")
            } else {
                const data = await response.json();
                let errMsg = "Authentication Failed!!";

                if (data && data.error && data.error.message) {
                    errMsg = data.error.message;
                }

                throw new Error(errMsg)
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const showExpenseHandler = () => {
        navigate("/profile/expenses", { replace: true })
    }

    return (
        <div className={classes.body}>
            <button onClick={verifyEmailHandler}>Verify Email</button>
            <button onClick={showExpenseHandler}>Add Expenses</button>
        </div>
    )
}

export default Welcomepage