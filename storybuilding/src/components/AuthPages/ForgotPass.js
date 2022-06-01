import React from 'react';
import { Container, Form, Button} from "react-bootstrap"
import { auth } from '../firebase';

class ForgotPass extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            error:"",
            email: "",
            emailSent: false
        }
    }

    resetPassword(email){
        auth.sendPasswordResetEmail(email).then(() => {
            //send email
            this.setState({...this.state, emailSent: true});
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            this.setState({...this.state, error: `${errorCode}: ${errorMessage}`});
        });
    }

    render(){
        return(
            <div>
                {this.state.error && 
                    <article class="message is-danger">
                        <div class="message-body">
                            {this.state.error}
                        </div>
                    </article>}

                    {!this.state.emailSent && 
                        <form onSubmit={(e) => {e.preventDefault(); this.resetPassword(this.state.email);}}>
                            <label className='label'>Password Reset</label>
                            <input type="email" className='input field' placeholder="Email" required
                                onChange={(e) => this.setState({...this.state, email: e.target.value})} />
                            <button role="button" type="submit" className="button is-info">
                                Reset
                            </button>
                        </form>}

                    {this.state.emailSent && 
                        <div className='container has-text-centered' style={{color: "black"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24"><path d="M23 0l-4.5 16.5-6.097-5.43 5.852-6.175-7.844 5.421-5.411-1.316 18-9zm-11 12.501v5.499l2.193-3.323-2.193-2.176zm-8.698 6.825l-1.439-.507 5.701-5.215 1.436.396-5.698 5.326zm3.262 4.287l-1.323-.565 4.439-4.503 1.32.455-4.436 4.613zm-4.083.387l-1.481-.507 8-7.89 1.437.397-7.956 8z" fill="green"/></svg>
                        <h3 className="is-size-3">Sent!</h3>
                            <p>A link for your to reset your password has been sent to your inbox. This process may take a few minutes.</p>
                            <br/>
                            <p>You can close this window now.</p>
                        </div>
                    }
            </div>
        );
    }
}

export default ForgotPass;
