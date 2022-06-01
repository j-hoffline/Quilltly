import React from 'react';
import {Link} from 'react-router-dom';
import {auth} from '../firebase';
//import "./home-page.css";
import VidBackground from './media/quilltly-background.mp4';
import Logo from './media/quill-n-ink-white.png';
// import "./home-page-concept.css";
import { Modal, Button, ButtonGroup, Dropdown, DropdownButton, DropdownMenu, DropdownItem } from "react-bootstrap";
import Login from "../AuthPages/Login.js";
import Signup from "../AuthPages/Signup";
import ForgotPassword from '../AuthPages/ForgotPass';
import NavBar from "./HomeNav";
import Nav from '../Nav';


class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.heroImg = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80";
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
            showNav: false,
            loginToggle: false,
            signupToggle: false,
            tagline: ""
        };

        this.footerToggle = this.footerToggle.bind(this);
    }

    componentDidMount() {
        console.log(window.screen.availWidth);
        //Choose random tagline to display from array
        let randomTaglineIndx = Math.floor(Math.random() * this.taglineLibrary.length);
        //let taglineElement = document.getElementById("tagline");

        this.setState({...this.state, tagline: this.taglineLibrary[randomTaglineIndx]}); 

        setTimeout(() => {
            if (auth.currentUser) {window.location.replace("/dashboard")}
        }, 1000);
    }

    footerToggle() {

    }

    render() {
        return(
            <section class="hero is-fullheight is-info" style={{height: "100%", backgroundImage: `url(${this.heroImg})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "right"}}>
            {/* <video src={VidBackground} autoPlay muted loop style={{position:"absolute", height: "100%", width: "100%"}}/> */}
            <Nav/>
  {/* <!-- Hero content: will be in the middle --> */}
  <div class="hero-content has-text-centered" > {/*columns container is-fluid*/}
  {/* <div className='container columns'> */}
      <h1 className="title is-size-1">
        Quilltly
      </h1>
      <p className="subtitle" id="tagline">
        {this.state.tagline}
      </p>


  
  {/* </div> */}
  </div>

  {/* <!-- Hero footer: will stick at the bottom --> */}
  <div class="hero-foot">
    <nav class="tabs is-boxed is-fullwidth">
      <div class="container">
        <ul>
          <li class="is-active"><a>Home</a></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>
    </nav>
  </div>
</section>
        );
    }
}

export default HomePage;
