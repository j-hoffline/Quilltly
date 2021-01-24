import React from 'react';
import {Redirect} from 'react-router-dom';
import "./home-page.css";
import { Modal, Button, ButtonGroup, Link } from "react-bootstrap";
import {auth} from '../firebase';


class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>  
                <div className="title text-center mb-4">
                    <h1>Story Builder App</h1>
                    <h2>Relax and play with friends at leisure</h2>
                    <p> put some fancy explanation to it </p>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                <ButtonGroup>
                    <Button variant="secondary" href = "/login">
                        Log In
                    </Button>

                    <Button variant="secondary" href = "/signup">
                        Sign Up
                    </Button>
                </ButtonGroup>
                </div>           
            </div>
        );
    }
}

export default HomePage;
