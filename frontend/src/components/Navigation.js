// react
import React, { Component } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
// extensions
import axios from "axios";
import jwt_decode from "jwt-decode";
// import modals
import { LoginModal } from "./Login";
import { RegisterModal } from "./Register";
// import main css
import './css/main.css';

//navigation, includes login and register modal.

export class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn_Login: false,
      isToggleOn_Register: false,
      activeItem: {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        Home_address: "",
        City: "",
        Country: "",
      },
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick_Login = this.handleClick_Login.bind(this);
    this.handleClick_Register = this.handleClick_Register.bind(this);
  }

  // login modal
  handleClick_Login() {
    this.setState(prevState => ({
      isToggleOn_Login: !prevState.isToggleOn_Login,
    }));

  }
  // register modal
  handleClick_Register() {
    this.setState(prevState => ({
      isToggleOn_Register: !prevState.isToggleOn_Register,
    }));
  }


  // REGISTER
  handleSubmit_Register = (item) => {
    axios
      .post("/api/register/", item)
      .then((res) => this.handleSuccess_Register(res))
      .catch((err) => this.handleError_Register(err));
  };

  handleError_Register = (error) => {
    if (error.response.status === 500) {
      alert("Something went wrong, Please try again");
    }
    else {
      alert("Invalid Credentials, Please try again");
    }
    this.setState(prevState => ({
      isToggleOn_Register: prevState.isToggleOn_Register,
    }));
  };

  handleSuccess_Register = (response) => {
    this.setState(prevState => ({
      isToggleOn_Register: !prevState.isToggleOn_Register,
    }));
    alert("Successfully Registered. Welcome " + (response.data.first_name) + "! Please Login");
  };

  // LOGIN
  handleSubmit_Login = (item) => {
    axios
      .post("/api/token/", item)
      .then((response) => this.handleSuccess_Login(response))
      .catch((err) => this.handleError_Login(err));
  };

  handleError_Login = (error) => {
    if (error.response.status === 500) {
      alert("Something went wrong, Please try again");
    }
    else {
      alert("Invalid Credentials, Please try again");
    }
  };

  handleSuccess_Login = (response) => {
    const token = response.data.access;
    localStorage.setItem("access", token);
    this.setState(prevState => ({
      isToggleOn_Login: !prevState.isToggleOn_Login,
    }));
    alert("Successfully Logged in. Welcome !");
  };

  // LOGOUT
  handleSubmit_Logout = (response) => {
    //find https csrf cooike
    let crsf_token = document.cookie.replace(/(?:(?:^|.*;\s*)csrftoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");  // eslint-disable-line
    axios('/api/logout/', {
      method: 'POST',
      credentials: 'include',
      headers: { 'X-CSRFToken': crsf_token }
    })
      .then((response) => this.handleSuccess_Logout(response))
      .catch((err) => this.handleError_Login(err));
  };

  handleSuccess_Logout = (response) => {
    localStorage.removeItem("access");
    window.location.reload(); //refresh page
    console.log("Successfully Logged out");
  };

  handleError_Logout = (error) => {
    if (error.response.status === 500) {
      alert("Something went wrong, Please try again");
    }
    else {
      console.log(error.response.data);
      alert("Invalid Credentials, Please try again");
    }
  };

  render() {

    const isLoggedIn = (localStorage.getItem("access") !== null) ? true : false;
    const user = (localStorage.getItem("access") !== null) ? jwt_decode(localStorage.getItem("access")) : null;

    return (
      <Navbar collapseOnSelect expand="lg" className="color-navbar" variant="light" fixed="top">
        <Container>
          <Navbar.Brand href="/"> <span className="navlink-head">Food Order App</span> </Navbar.Brand>
          <Navbar.Toggle className="color-container" aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/"><span className="navlink-set">Home</span></Nav.Link>
              <Nav.Link href="/restaurants"><span className="navlink-set"> Restaurants </span> </Nav.Link>
            </Nav>
            <Nav>
              {isLoggedIn ? (
                <>
                  <Nav.Link href="/restaurants" ><span className="navlink-set"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 20">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                  </svg>{user.City}</span></Nav.Link>

                  <Nav.Link href="/orderhistory"><span className="navlink-set"> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 20">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                  </svg>Last Orders</span> </Nav.Link>

                  <Nav.Link href="/profile"><span className="navlink-set"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 20">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>{user.first_name}</span></Nav.Link>

                  <Nav.Link onClick={this.handleSubmit_Logout}> <span className="navlink-set"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="currentColor" class="bi bi-power" viewBox="0 0 16 20">
                    <path d="M7.5 1v7h1V1h-1z" /><path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
                  </svg>Logout</span></Nav.Link>


                </>
              ) : (
                <>
                  <Nav.Link ><span className="navlink-set"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 20">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                  </svg>Address </span></Nav.Link>

                  <Nav.Link href="/order"><span className="navlink-set"> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 20">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                  </svg>Order now </span> </Nav.Link>

                  <LoginModal show={this.state.isToggleOn_Login} onHide={this.handleClick_Login} onSave={this.handleSubmit_Login} onClose={this.handleClick_Login} loginitem={this.state.activeItem} />
                  <Nav.Link onClick={this.handleClick_Login}><span className="navlink-set"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 20">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>Login</span></Nav.Link>


                  <RegisterModal show={this.state.isToggleOn_Register} onHide={this.handleClick_Register} onSave={this.handleSubmit_Register} onClose={this.handleClick_Register} activeItem={this.state.activeItem} />
                  <Nav.Link onClick={this.handleClick_Register}><span className="navlink-set"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 20">
                    <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
                    <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                  </svg>Register</span></Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    );
  }
}

