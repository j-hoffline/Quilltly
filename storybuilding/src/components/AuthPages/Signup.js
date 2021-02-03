import React, {useRef, useState} from "react"
import {Form, Button, Alert, Container} from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import {auth, app, database} from '../firebase';
import "./AuthStyles.css"

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
                if (userCredential.additionalUserInfo.isNewUser) {
                    var userID = userCredential.user.uid;
                    console.log(userCredential);
                    database.ref('users/' + userID).set({
                        username: this.state.usernameRef,
                        email: this.state.emailRef,
                        startedGames: "[]"
                    }).then(console.log("User entry established"));
                }
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
                <Container>
                <div className="login-wrapper">

                    {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}

                    <Form className="auth-form" onSubmit={this.createAccount}>
                        <Form.Group id="username" className="form-group">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" pattern="[a-zA-Z0-9]+"
                                onChange={(event) => this.setState({...this.state, usernameRef: event.target.value})} required />
                        </Form.Group>
                        
                        <Form.Group id="email" className="form-group">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" onChange={(event) => this.setState({...this.state, emailRef: event.target.value})} required />
                        </Form.Group>

                        <Form.Group id="password">
                            <Form.Label>Password (6+ characters)</Form.Label>
                            <Form.Control type="password" onChange={(event) => this.setState({...this.state, passwordRef: event.target.value})} required />
                        </Form.Group>

                        <Form.Group id="password-confirm">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" onChange={(event) => this.setState({...this.state, passwordCheckRef: event.target.value})} required />
                        </Form.Group>

                        <Button className="bubble-button submit-button" variant="secondary" type="submit">
                            Create Account
                        </Button>
                    </Form>   
                </div>
                
            </Container>
        </>
        );
    }
}

export default SignUp;

