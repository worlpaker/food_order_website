import React, { useEffect, useState, useRef } from "react";
import jwt_decode from "jwt-decode";
import { CheckToken } from "./Checktoken";
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import './css/main.css';

//basic user profile page and reset password

export function Profile() {

  useEffect(() => {

    CheckToken();

  }, []);


  const user_details = jwt_decode(localStorage.getItem("access"));

  const reset_email = useRef();
  const old_password = useRef();
  const new_password = useRef();


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const modalSubmit = () => {
    let data = {
      email: reset_email.current.value,
      old_password: old_password.current.value,
      new_password: new_password.current.value,
    };

    const Submitdata = async () => {
      let crsf_token = document.cookie.replace(/(?:(?:^|.*;\s*)csrftoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");  // eslint-disable-line     
      await axios('/api/resetpassword/', {
        method: 'POST',
        credentials: 'include',
        headers: { 'X-CSRFToken': crsf_token },
        data: data
      })

        .then(res => handleSuccess(res))
        .catch(err => handleError(err));
    };

    Submitdata();

    const handleSuccess = (res) => {
      localStorage.removeItem('access');
      handleClose();
      alert("Your password successfully changed. Please Login.");
      console.log(res);
      window.location.href = "/";
    };
    const handleError = (err) => {
      alert("Invalid password.");
      console.log(err);
    };
  };


  return (
    <>
      <div className="under-nav">
        <br></br>
        <h1 align="center">Hello {user_details.first_name}</h1>
        <br></br>
        <h1 align="center">Profile Details</h1>
        <h3 align="center">Email: {user_details.email}</h3>
        <h3 align="center">Home Address: {user_details.Home_address}</h3>
        <h3 align="center">City/State: {user_details.City}</h3>
        <h3 align="center">Country: {user_details.Country}   <br></br> <br></br><br></br>

          <Button onClick={handleShow}>Change Password</Button></h3>



        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Change Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="reset_email">
                <Form.Label >Email</Form.Label>
                <Form.Control
                  ref={reset_email}
                  type="email"
                  placeholder="name@example.com"
                  name="reset_email"
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="old_password">
                <Form.Label>Old Password</Form.Label>
                <Form.Control
                  ref={old_password}
                  type="password"
                  placeholder="Password"
                  name="old_password"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="new_password">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  ref={new_password}
                  type="password"
                  placeholder="Password"
                  name="new_password"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => modalSubmit()}>
              Change
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );


}

