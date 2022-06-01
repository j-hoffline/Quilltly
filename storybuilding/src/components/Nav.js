import React from 'react';
import {Link} from 'react-router-dom';
import Login from './AuthPages/Login';
import SignUp from './AuthPages/Signup';
import ForgotPassword from './AuthPages/ForgotPass';


class Nav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showNav: false,
            loginToggle: false,
            signupToggle: false,
        }
    }

    render() {
        return(
            <>
  <div class="hero-head">
  <header class="navbar is-info">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item">
        {/* <img id="logo" src={Logo} alt="Quill" style={{width: "32px", height: "32px"}}/> */}

        <p className='is-size-4'>Quilltly</p>
        </a>
        <a role="button" className={this.state.showNav ? 'navbar-burger is-active' : 'navbar-burger'} aria-label="menu" aria-expanded={this.state.showNav} onClick={() => {this.setState({...this.state, showNav: !this.state.showNav}); }}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarMenuHeroC" className={this.state.showNav ? 'navbar-menu is-active' : 'navbar-menu'}>
        <div class="navbar-end">
          <span className="navbar-item">
            <button class="button is-light is-outlined" data-target="modal-example" onClick={() => (this.setState({...this.state, modalOpen: true, loginToggle: true}))}>Log In</button>
          </span>
          <span className="navbar-item">
          <button class="button is-danger" onClick={() => (this.setState({...this.state, modalOpen: true, signupToggle: true}))}>Sign Up</button>
          </span>
          <span class="navbar-item">
            <a href="https://github.com/j-hoffline/Storybuilding" class="button is-inverted">
              <span class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" fill="black"/></svg>
              </span>
              <span>Visit Repo</span>
            </a>
          </span>
        </div>
      </div>
    </div>
  </header>
</div>

{this.state.modalOpen && <div className="blur-div"></div>}

  <div className={this.state.modalOpen ? "modal is-active" : "modal"} id="modal-test">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">
        {this.state.loginToggle && "Log in"}
        {this.state.signupToggle && "Sign Up"}
        {this.state.forgotPasswordToggle && "Forgot Password"}
      </p>
      <button class="delete" aria-label="close" onClick={() => this.setState({...this.state, modalOpen: !this.state.modalOpen, signupToggle: false, loginToggle: false, forgotPasswordToggle: false})}>X</button>
    </header>
    <section class="modal-card-body">
      {this.state.loginToggle && <Login />}
      {this.state.signupToggle && <SignUp />}
      {this.state.forgotPasswordToggle && <ForgotPassword />}
    </section>
    <footer class="modal-card-foot column is-full">
    {this.state.loginToggle &&
      <div className="columns is-full" style={{color: "black"}}>
          <div className='column has-text-centered'>
              <Link onClick={() => (this.setState({...this.state, signupToggle: false, loginToggle: false, forgotPasswordToggle: true}))}>
                  Forgot Password?
              </Link>
          </div>

          <div className='column has-text-centered'>
              Need an account? <Link onClick={() => (this.setState({...this.state, signupToggle: true, loginToggle: false}))}>
                  <u>Sign Up</u>
              </Link>
          </div>
      </div>}

  {this.state.signupToggle &&
      <div className="column has-text-centered" style={{color: "black"}}>
          Already have an account? <Link onClick={() => (this.setState({...this.state, signupToggle: false, loginToggle: true}))}><u>Log In</u></Link>
      </div>}
    </footer>
  </div>
</div>
</>
        );
    }
}

export default Nav;