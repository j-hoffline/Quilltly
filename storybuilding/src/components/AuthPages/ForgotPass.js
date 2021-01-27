import React from 'react';
import { Container, Form, Button} from "react-bootstrap"
import { auth } from '../firebase';

class ForgotPass extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            error:""
        }
    }

    resetPassword(email){
        auth.sendPasswordResetEmail(email).then(() => {
            //send email
        })
        .catch((error) => {
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
                        Forgot Password?
                    </h1>
                    <Form>
                        <Form.Label>Password Reset</Form.Label>
                        <Button onClick={this.resetPassword}>
                            Reset
                        </Button>
                    </Form>
           
                </div>
                </Container>
            </>
        )
    }


}