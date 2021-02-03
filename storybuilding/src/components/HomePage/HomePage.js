import React from 'react';
import {Link} from 'react-router-dom';
import {auth} from '../firebase';
//import "./home-page.css";
import VidBackground from './media/quilltly-background.mp4';
import Logo from './media/quill-n-ink-white.png';
import "./home-page-concept.css";
import { Modal, Button, ButtonGroup, Dropdown, DropdownButton, DropdownMenu, DropdownItem } from "react-bootstrap";
import Login from "../AuthPages/Login.js";
import Signup from "../AuthPages/Signup";
import ForgotPassword from '../AuthPages/ForgotPass';
import NavBar from "./HomeNav";


class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.taglineLibrary = ["Get Serious. Get Stories", "The Wonder Has A Name: Stories.",
            "You're In Good Hands With Stories.", "Stories, Couldn't Ask For More.",
            "Have You Had Your Stories Today?", "Stories Built To Perfection.",
            "Stories - Now!", "Don't Live A Little, Live A Story.",
            "Today's Stories, Since 1903.", "Great Stories. Great Times.",
            "Let The Stories Begin.", "Pure Stories.", "Stories, Try It You'll Like It!",
            "Get Your Daily Dose Of Stories.", "Stories For Me!", "You Wouldn't Want To Miss Stories.",
            "Stories For Your Life.", "Say It With A Story.", "Stories. See More. Do More.",
            "Stories New And Improved.", "Building A Better Tomorrow With Stories.",
            "For the joy of stories.", "Stories, What Else?", "The More Stories The Better.",
            "Red Hot Stories.", "The Future Of Stories.", "Stories Born And Bred.",
            "Stories - A Safe Place In An Unsafe World!", "We Build Stories.",
            "Have Stories Your Way.", "Stories: The Best Service Around.",
            "The Stories of Champions.", "Stories, You Know You Want It.", "When The Going Gets Tough, the Tough Get Stories."
        ];

        this.state = {
            modalOpen: false,
            loginToggle: false,
            signupToggle: false,
        };

        this.footerToggle = this.footerToggle.bind(this);
    }

    componentDidMount() {
        let randomTaglineIndx = Math.floor(Math.random() * this.taglineLibrary.length);
        let taglineElement = document.getElementById("tagline");
        if (taglineElement) {
            taglineElement.innerHTML = this.taglineLibrary[randomTaglineIndx];
        }

        setTimeout(() => {
            if (auth.currentUser) {window.location.replace("/dashboard")}
        }, 1000);
    }

    footerToggle() {

    }

    render() {
        return(
            <div>
                <div>
                    <video src={VidBackground} autoPlay muted loop />
                    <div>
                        <NavBar id="nav" />
                    </div>

                    <div class="welcome-card">
                        <div class="tagline-div">
                            <div>
                                <img id="logo" src={Logo} alt="Quill" />
                                <h1>Quilltly</h1>
                            </div>
                            <h4 id="tagline">{this.tagline}</h4>
                        </div>

                        <div class="button-div">
                            <Button className="bubble-button" id="log-in-button" variant="primary"
                                onClick={() => (this.setState({...this.state, modalOpen: true, loginToggle: true}))}>
                                Log In
                            </Button> <br />

                            <Button className="bubble-button" id="sign-up-button" variant="primary"
                                onClick={() => (this.setState({...this.state, modalOpen: true, signupToggle: true}))}>
                                Sign Up
                            </Button>
                        </div>
                    </div>

                    {this.state.modalOpen && <div className="blur-div"></div>}

                    <Modal className="modal" show={this.state.modalOpen}>
                        <Modal.Header>
                            <Modal.Title className="modal-header">
                                {this.state.loginToggle && "Log in"}
                                {this.state.signupToggle && "Sign Up"}
                                {this.state.forgotPasswordToggle && "Forgot Password"}
                            </Modal.Title>
                            <button id="closeButton" type="button"
                                onClick={() => (this.setState({...this.state, modalOpen: false, loginToggle: false, signupToggle: false, forgotPasswordToggle: false}))}>
                                    X
                            </button>
                        </Modal.Header>

                        <Modal.Body>
                            {this.state.loginToggle && <Login />}
                            {this.state.signupToggle && <Signup />}
                            {this.state.forgotPasswordToggle && <ForgotPassword />}
                        </Modal.Body>

                        <Modal.Footer>
                            {this.state.loginToggle &&
                                <div>
                                    <div>
                                        <Link onClick={() => (this.setState({...this.state, signupToggle: false, loginToggle: false, forgotPasswordToggle: true}))}>
                                            Forgot Password?
                                        </Link>
                                    </div>

                                    <div>
                                        Need an account? <Link onClick={() => (this.setState({...this.state, signupToggle: true, loginToggle: false}))}>
                                            Sign Up
                                        </Link>
                                    </div>
                                </div>}

                            {this.state.signupToggle &&
                                <div className="w-100 text-center mt-2">
                                    Already have an account? <Link onClick={() => (this.setState({...this.state, signupToggle: false, loginToggle: true}))}>Log In</Link>
                                </div>}
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default HomePage;
