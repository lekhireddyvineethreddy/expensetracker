import React, {  useEffect, useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import classes from "./Updateprofile.module.css";
import { useNavigate } from 'react-router-dom';

const Updateprofile = () => {
  
  const nameInputRef = useRef();
  const contactInputRef = useRef();
  const locationInputRef = useRef();

  const navigate = useNavigate();

  const [displayName , setDisplayName] = useState("");

  useEffect(() => {
    // Check if user profile data is available when the component mounts
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDL8noeCp6M8xxaaGThaZU-M-fs5-MP0Ok`,
          {
            method: 'POST',
            body: JSON.stringify({
              idToken: localStorage["token"],
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (response.ok) {
          const userData = await response.json();
          if (userData.users && userData.users.length > 0) {
            const user = userData.users[0];
            if (user.displayName) {
              setDisplayName(user.displayName);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user profile data:', error);
      }
    };

    fetchUserProfile();
  }, []);
  
   
  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredContact = contactInputRef.current.value;
    const enteredLocation = locationInputRef.current.value;

    try {
      const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDL8noeCp6M8xxaaGThaZU-M-fs5-MP0Ok", {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage["token"],
          displayName: enteredName,
          contact: enteredContact,
          location: enteredLocation,
          returnSecureToken: true
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (response.ok) {
        alert("Your Profie Updated"); 
        navigate("/profile/expenses" , {replace : true})
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

  const hideUpdate = () => {
    navigate("/profile/welcome" , {replace : true})
  }

  return (
    <div className={classes.updateForm}>
      <h1>Update profile</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className={classes["mb-3"]}>
          <Form.Label className={classes.label}>Full Name:</Form.Label>
          <Form.Control placeholder="Full Name" ref={nameInputRef} defaultValue={displayName}/>
        </Form.Group>
        <Form.Group className={classes["mb-3"]}>
          <Form.Label className={classes.label}>Contact No.:</Form.Label>
          <Form.Control placeholder="Contact No." ref={contactInputRef} />
        </Form.Group>
        <Form.Group className={classes["mb-3"]}>
          <Form.Label className={classes.label}>Location: </Form.Label>
          <Form.Control placeholder="Location" ref={locationInputRef} />
        </Form.Group>
        <Button type="submit" className='mx-3'>
          Update
        </Button>
        <Button variant='danger' onClick={hideUpdate}>
          Cancel
        </Button>
      </Form>
    </div>
  )
}

export default Updateprofile