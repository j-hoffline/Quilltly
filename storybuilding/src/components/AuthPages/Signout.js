import React from 'react';
import { Container, Alert } from 'react-bootstrap'
import { auth } from '../firebase';

class Signout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: auth.currentUser,
            error:""
        }
    }

    signOutUser(e) {
        e.preventDefault()
        auth.signOut().then(() => {
            // Sign-out successful.
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
                <Container className="align-items-center justify-content">
                    <div>
                    {this.state.error && <Alert variant="danger">{this.state.error}</Alert>
                    }
                    </div>

                    <div className="mb-3">
                        Email: {this.state.user.email}
                    </div>

                    <div className="bubble-button"
                        onClick={this.signOutUser}>
                        Sign Out
                    </div>
                </Container>
            </>
        )
    }


    
}

export default Signout;