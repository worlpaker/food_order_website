import React, { Component } from 'react';
import './css/main.css';
import { Button, Modal, Form, Col, Row } from 'react-bootstrap';

//user register
export class RegisterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }
  handleChange = (e) => {
    let { name, value } = e.target;

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };
  render() {

    return (
      <>
        <Modal size="lg" show={this.props.show} onHide={this.props.onHide} centered>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group as={Row} className="mb-3" controlId="Register_email">
                <Form.Label column sm="2">Email:</Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    name="email"
                    value={this.state.activeItem.email}
                    onChange={this.handleChange}
                    autoFocus />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="Login_password">
                <Form.Label column sm="2" >Password:</Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={this.state.activeItem.password}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="First_name">
                <Form.Label column sm="2">First Name:</Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    name="first_name"
                    value={this.state.activeItem.first_name}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="Last_name">
                <Form.Label column sm="2">Last Name:</Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    name="last_name"
                    value={this.state.activeItem.last_name}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="Address">
                <Form.Label column sm="2">Address:</Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Adress"
                    name="Home_address"
                    value={this.state.activeItem.Home_address}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="City_State">
                <Form.Label column sm="2">City/State</Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="City/State"
                    name="City"
                    value={this.state.activeItem.City}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="Country">
                <Form.Label column sm="2">Country</Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Country"
                    name="Country"
                    value={this.state.activeItem.Country}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.onClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => this.props.onSave(this.state.activeItem)}>
              Register
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
export class Register extends Component {
  render() {
    return (
      <div className='under-nav'> This is Register Page.</div>
    );
  }
}