import React from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { Link, Redirect, useHistory } from "react-router-dom";
import { app, auth } from '../firebase';

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
        <div className="login-wrapper">

          {this.state.error && <article class="message is-danger">
                        <div class="message-body">
                            {this.state.error}
                        </div>
                    </article>}

          <form className="auth-form" onSubmit={this.loginUser}>

            <div id="email" className="field">
              <label className="label">Email</label>
              <input type="email" placeholder="Email"  className="input" 
                onChange={(event) => this.setState({...this.state, emailRef: event.target.value})} required />
            </div>

            <div id="password" className="field">
              <label className="label">Password</label>
              <input type="password" placeholder="Password" className="input password"
                onChange={(event) => this.setState({...this.state, passwordRef: event.target.value})} required />
            </div>

            <div class="control">
              <button class="button is-link">Submit</button>
            </div>

          </form>
        </div>
      </>
    );
  }
}

export default Login;

