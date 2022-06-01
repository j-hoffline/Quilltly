
import React from "react";
import { Container, Form, Button, Alert } from "react-bootstrap"
import { auth } from '../firebase';
import Signout from "./Signout";


class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: auth.currentUser,
            error: "",
            newEmail: "",
            password: "",
            msg:""
        }
        this.changeEmail = this.changeEmail.bind(this)
        this.resetPassword = this.resetPassword.bind(this)
    }

    componentDidMount() {
        //if (this.state.user == null){
        // window.location.replace('/login');
        //}
    }

    resetPassword(e) {
        
        e.preventDefault()
        this.setState({...this.state, error: ""})
        auth.sendPasswordResetEmail(auth.currentUser.email).then(() => {
            this.setState({...this.state, msg: "Check email for further instructions."})
        })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                this.setState({ ...this.state, error: `${errorCode}: ${errorMessage}` });
            });

    }

    changeEmail(e) {
        //reset previous error messages
        
        e.preventDefault()
        
        auth.signInWithEmailAndPassword(this.state.user.email, this.state.password)
        if (this.state.user.email !== this.state.newEmail){
        auth.currentUser.updateEmail(this.state.newEmail).then(() => {
            console.log(this.state.newEmail)
            console.log(auth.currentUser.email)
            this.setState({...this.state, msg: "Email set to " + this.state.newEmail })
            // Update successful.
        }).catch((error) => {
            // An error happened.
            var errorCode = error.code;
            var errorMessage = error.message;
            this.setState({ ...this.state, error: `${errorCode}: ${errorMessage}` });
        });}
        else{
            this.setState({...this.state, msg: "This email is already set to this account."})
        }
    }

    render() {
        return (
            <div>
            <div>
                {this.state.msg}
            </div>

                <form className="form" onSubmit={this.changeEmail}>
                    
                    <p className="is-size-5 block">Change Account Email</p>
        
                        <div className="field">
                            <label className="label">New Email:  </label>
                            <input className="input" type="newemail" onChange={(event) => this.setState({ ...this.state, newEmail: event.target.value })} required />
                        </div>

                    
                        <div className="field">
                            <label className="label">Password: </label>
                            <input className="input" type="password" onChange={(event) => this.setState({ ...this.state, password: event.target.value })} />
                        </div>

                        <div className="block">
                            <button className="button is-warning">
                                    Change Email
                            </button>
                        </div>

                    <div className="container columns is-gapless">
                        <div className="column has-text-left">
                            <p className="is-size-5">Send Password Reset Link</p>
                        </div>
                        <div className="column has-text-left">
                            <button className="button is-danger" onClick={this.resetPassword}>
                                Reset Password
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );

    }
}

export default Settings;