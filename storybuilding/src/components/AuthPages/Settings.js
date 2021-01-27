
import React from "react";
import { Container, Form, Button, Alert } from "react-bootstrap"
import { app, auth } from '../firebase';


class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            user: auth.currentUser,
            error:"",
            newEmail: ""
        }
        this.changeEmail = this.changeEmail.bind(this)
    }

    componentDidMount(){
        if (this.state.user == null){
            window.location.replace('/login');
        }
    }

    resetPassword(){
        auth.sendPasswordResetEmail(auth.currentUser.email).then(() => {
            //send email
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            this.setState({...this.state, error: `${errorCode}: ${errorMessage}`});
        });

    }

    changeEmail(e) {
        e.preventDefault()
        auth.currentUser.updateEmail(this.newEmail).then(() => {
            // Update successful.
          }).catch((error) => {
            // An error happened.
            var errorCode = error.code;
            var errorMessage = error.message;
            this.setState({...this.state, error: `${errorCode}: ${errorMessage}`});
          });
    }




        render(){
            return(
                <>
                <Container className="d-flex align-items-center justify-content-center body">
                <div className="login align-items-center mt-5">
                    <h1 className="text-center mb-4 title">
                        Profile Settings
                    </h1>
                    <div>
                    {this.state.error && <Alert variant="danger">{this.state.error}</Alert>
                    }
                    </div>
                    <div>
                        Email:
                    </div>
                    <Form.Group>
                    <Form>
                        <Form.Label>New Email: </Form.Label>
                        <Form.Control type="newemail" onChange={(event) => this.setState({...this.state, emailRef: event.target.value})} required />
                    </Form>
                    <Form>
                        <Form.Label>Re-enter Password: </Form.Label>
                        <Form.Control type="password"/>
                    <Form>
                        <Button type="submit">
                            Change Email
                        </Button>
                    </Form>
                    </Form>

                    <Form>
                        <Form.Label>Password Reset: </Form.Label>
                        <Button onClick={this.resetPassword}>
                            Reset
                        </Button>
                    </Form>
                    </Form.Group>
                </div>
                </Container>
                </>
            );

        }
}

export default Settings;