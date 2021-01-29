
import React from "react";
import { Container, Form, Button, Alert } from "react-bootstrap"
import { auth } from '../firebase';


class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: auth.currentUser,
            error: "",
            newEmail: "",
            password: ""
        }
        this.changeEmail = this.changeEmail.bind(this)
    }

    componentDidMount() {
        //if (this.state.user == null){
        // window.location.replace('/login');
        //}
    }

    resetPassword() {
        auth.sendPasswordResetEmail(auth.currentUser.email).then(() => {
            //send email
        })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                this.setState({ ...this.state, error: `${errorCode}: ${errorMessage}` });
            });

    }

    changeEmail(e) {
        e.preventDefault()
        auth.signInWithEmailAndPassword(this.state.user.email, this.state.password)
        auth.currentUser.updateEmail(this.state.newEmail).then(() => {
            console.log(this.state.newEmail)
            console.log(auth.currentUser.email)
            // Update successful.
        }).catch((error) => {
            // An error happened.
            var errorCode = error.code;
            var errorMessage = error.message;
            this.setState({ ...this.state, error: `${errorCode}: ${errorMessage}` });
        });
    }




    render() {
        return (
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
                            Email: {this.state.user.email}
                    </div>

                        <Form className="form" onSubmit={this.changeEmail}>

                            <Form.Group>
                                <Form.Label>New Email:  </Form.Label>
                                <Form.Control type="newemail" onChange={(event) => this.setState({ ...this.state, newEmail: event.target.value })} required />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Re-enter Password: </Form.Label>
                                <Form.Control type="password" onChange={(event) => this.setState({ ...this.state, password: event.target.value })} />
                            </Form.Group>


                        <Button type="submit">
                                Change Email
                        </Button>


                        </Form>

                        <Form>
                            <Form.Label>Password Reset: </Form.Label>
                            <Button onClick={this.resetPassword}>
                                Reset
                        </Button>
                        </Form>

                    </div>
                </Container>
            </>
        );

    }
}

export default Settings;