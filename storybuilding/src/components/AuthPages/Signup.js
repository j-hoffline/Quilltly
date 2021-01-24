import React, {useRef, useState} from "react"
import {Form, Button, Alert, Container} from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import {auth, app} from '../firebase';
import "./AuthStyles.css"

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: "",
            passwordRef: "",
            passwordCheckRef: "",
            emailRef: ""
        }

        this.createAccount = this.createAccount.bind(this);
    }

    createAccount(e) {
        e.preventDefault()
        console.log(e);
        if (this.state.passwordRef !== this.state.passwordCheckRef) {
            return this.setState({...this.state, error: "Passwords do not match."});
          }
        
        auth.setPersistence(app.auth.Auth.Persistence.SESSION).then(() => {
            return auth.createUserWithEmailAndPassword(this.state.emailRef, this.state.passwordRef);
        }).then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                console.log("User account successfully created");
                window.location.replace("/public");
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
                <Container className="d-flex align-items-center justify-content-center">
                <div className="login align-items-center mt-5">
                    
                    <h1 className="text-center mb-4 title">Sign Up</h1> 

                    {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}

                    <Form onSubmit={this.createAccount}>
                        <Form.Group id="email">
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

                        <Button className="w-100" variant="secondary" type="submit">
                            Sign Up
                        </Button>

                        <div className="w-100 text-center mt-2">
                            Already have an account? 
                            <Link to="/login">Log In</Link>
                        </div>
                    </Form>   
                </div>
                
            </Container>
        </>
        );
    }
}

export default SignUp;

