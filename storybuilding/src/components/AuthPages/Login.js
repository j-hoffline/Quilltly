import React from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { Link, Redirect, useHistory } from "react-router-dom";
import { app, auth } from '../firebase';
import "./AuthStyles.css";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      emailRef: "",
      passwordRef: ""
    }

    this.loginUser = this.loginUser.bind(this);
  }

  loginUser(e) {
    e.preventDefault()
    //Set's authentication persistence to SESSION before authenticating user (should be changed to LOCAL before production)
    auth.setPersistence(app.auth.Auth.Persistence.SESSION).then(() => {
      return auth.signInWithEmailAndPassword(this.state.emailRef, this.state.passwordRef)
    }).then(() => {console.log('User successfully signed in');})
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        this.setState({...this.state, error: `${errorCode}: ${errorMessage}`});
      });
  }

  render() {
    return(
      <>
      <Container>
        <div className="login-wrapper">

          {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}

          <Form className="auth-form" onSubmit={this.loginUser}>
            <Form.Group id="email" className="form-group">
              <Form.Control type="email" placeholder="Email"  className="form-control" 
                onChange={(event) => this.setState({...this.state, emailRef: event.target.value})} required />
            </Form.Group>

            <Form.Group id="password" className="form-group">
              <Form.Control type="password" placeholder="Password" className="form-control"
                onChange={(event) => this.setState({...this.state, passwordRef: event.target.value})} required />
            </Form.Group>

            <Button className="bubble-button submit-button" variant="secondary" type="submit">
              Submit
            </Button>

          </Form>
        </div>
      </Container>
      </>
    );
  }
}

export default Login;

