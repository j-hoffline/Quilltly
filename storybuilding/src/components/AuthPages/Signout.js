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
            <div className='block'>
                {this.state.error && 
                    <article class="message is-danger">
                        <div class="message-body">
                            {this.state.error}
                        </div>
                    </article>}
            </div>

            <div className='columns container'>

                <div class="column is-two-thirds">
                    <input class="input" type="text" placeholder={`Account: ${this.state.user.email}`} readOnly />
                </div>

                <div className='column has-text-right'>
                    <button className="button is-light is-danger"
                            onClick={this.signOutUser}>
                            Sign Out
                    </button>
                </div>

            </div>
            </>
        )
    }


    
}

export default Signout;