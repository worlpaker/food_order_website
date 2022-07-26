import React, { Component } from 'react';
import './css/main.css';
import { Button, Modal, Form } from 'react-bootstrap';

//login modal for navigation 

export class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginitem: this.props.loginitem,
    };
  }
  handleChange = (e) => {
    let { name, value } = e.target;

    const loginitem = { ...this.state.loginitem, [name]: value };

    this.setState({ loginitem });
  };
  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={this.props.onHide} centered>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="Login_email">
                <Form.Label >Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  name="email"
                  value={this.state.loginitem.email}
                  onChange={this.handleChange}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="Login_password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.loginitem.password}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.onClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => this.props.onSave(this.state.loginitem)}>
              Login
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

// Check Modal-this part is not necessary.
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOnLogin: false,
      isToggleOnRegister: false
    };
    // This binding is necessary to make `this` work in the callback
    this.handleClickLogin = this.handleClickLogin.bind(this);
    this.handleClickRegister = this.handleClickRegister.bind(this);

  }
  handleClickLogin() {
    this.setState(prevState => ({
      isToggleOnLogin: !prevState.isToggleOnLogin,
    }));
  }

  handleClickRegister() {
    this.setState(prevState => ({
      isToggleOnRegister: !prevState.isToggleOnRegister,
    }));
  }

  render() {
    return (
      <> <div className='under-nav'> This is Login Page.</div>
        <LoginModal show={this.state.isToggleOnLogin} onHide={this.handleClickLogin} />
        <Button onClick={this.handleClickLogin} > Login Button</Button>

      </>
    );
  }
}