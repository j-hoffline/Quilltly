import React, {useRef, useState} from "react"
import {Form, Button, Alert, Container} from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import {auth, app, database} from '../firebase';

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: "",
            usernameRef: "",
            passwordRef: "",
            passwordCheckRef: "",
            emailRef: ""
        }

        this.createAccount = this.createAccount.bind(this);
    }

    createAccount(e) {
        e.preventDefault()
        //Checks if passwords match before displaying error
        if (this.state.passwordRef !== this.state.passwordCheckRef) {
            return this.setState({...this.state, error: "Passwords do not match."});
          }
        
        //Sets auth persistence for app to session (should be changed to LOCAL before production)
        auth.setPersistence(app.auth.Auth.Persistence.SESSION).then(() => {
            return auth.createUserWithEmailAndPassword(this.state.emailRef, this.state.passwordRef);
        }).then((userCredential) => {
                // Signed in 
                console.log("User account successfully created");
                //Creates database entry for new user
            })
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

                    {this.state.error && 
                    <article class="message is-danger">
                        <div class="message-body">
                            {this.state.error}
                        </div>
                    </article>}

                    <form className="auth-form" onSubmit={this.createAccount}>
                        <div id="username" className="field">
                            <label className="label">Username</label>
                            <input type="text" pattern="[a-zA-Z0-9]+" className="control input"
                                onChange={(event) => this.setState({...this.state, usernameRef: event.target.value})} required />
                        </div>

                        <div id="email" className="field">
                            <label className="label">Email</label>
                            <input type="email" className="control input" onChange={(event) => this.setState({...this.state, emailRef: event.target.value})} required />
                        </div>

                        <div id="password" className="field">
                            <label className="label">Password (6+ characters)</label>
                            <input type="password" className="control input" onChange={(event) => this.setState({...this.state, passwordRef: event.target.value})} required />
                        </div>

                        <div id="password-confirm" className="field">
                            <label className="label">Confirm Password</label>
                            <input type="password" className="control input" onChange={(event) => this.setState({...this.state, passwordCheckRef: event.target.value})} required />
                        </div>

                        <div className="control">
                            <button className="button is-link" variant="secondary" type="submit">
                                Create Account
                            </button>
                        </div>
                    </form>   
                </div>
        </>
        );
    }
}

export default SignUp;

