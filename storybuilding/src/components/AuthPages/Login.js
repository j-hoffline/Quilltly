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

    auth.setPersistence(app.auth.Auth.Persistence.SESSION).then(() => {
      return auth.signInWithEmailAndPassword(this.state.emailRef, this.state.passwordRef)
    }).then(() => {console.log('User successfully signed in');
                    window.location.replace('/public');})
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        this.setState({...this.state, error: `${errorCode}: ${errorMessage}`});
      });
  }

  componentDidMount() {
    if (auth.currentUser) {
      window.location.replace('/public');
    }
  }

  render() {

    return(
      <>
        <Container className="d-flex align-items-center justify-content-center body">
          <div className="login align-items-center mt-5">
  
              <h1 className="text-center mb-4 title">
                Log In
              </h1>

              {this.state.error && <Alert variant="danger">{this.state.error}</Alert>
              }

              <Form className="form" onSubmit={this.loginUser}>
                <div id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" onChange={(event) => this.setState({...this.state, emailRef: event.target.value})} required />
                </div>

                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" onChange={(event) => this.setState({...this.state, passwordRef: event.target.value})} required />
                </Form.Group>

                <Button className="w-100" variant="secondary" type="submit">
                  Log In
                </Button>

              </Form>

              <div className="w-100 text-center mt-3">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
              
              <div className="w-100 text-center">
                Need an account? <Link to="/signup">Sign Up</Link>
              </div>

          </div>
        </Container>
      </>
    );
  }
}

export default Login;

