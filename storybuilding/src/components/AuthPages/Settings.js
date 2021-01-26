
import React from "react";
import { Container } from "react-bootstrap"
import { app, auth } from '../firebase';


class Settings extends React.Component {
    constructor(props) {
        super(props);

    }



    componentDidMount(){
        if (auth.currentUser == null){
            window.location.replace('/login');
        }
    }

        render(){
            return(
                <>
                    <Container className="d-flex align-items-center justify-content-center body">
                    <h1 className="text-center mb-4 title">
                        Profile Settings {auth.currentUser.email}
                    </h1>
                        
                    </Container>
                </>
            );

        }
}

export default Settings;