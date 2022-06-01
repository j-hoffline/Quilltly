import React from 'react';
import {Redirect} from 'react-router-dom';
import Logo from './images/quill-n-ink 2.png';
import TimelineBlip from './images/iconmonstr-circle-2.svg';
import SearchIcon from './images/iconmonstr-magnifier-5.svg';
import SettingsGear from './images/iconmonstr-gear-10.svg';
import ProfileIcon from './images/iconmonstr-user-20.svg';
import {database} from '../firebase';
import PublicStoriesPage from '../PublicStoriesPage/PublicStoriesPage';
import RecentGamesPage from '../RecentGamesPage/RecentGamesPage';
import CreateNewGamePage from '../CreateNewGamePage/CreateNewGamePage';
import { Modal, Button, Form } from 'react-bootstrap';
import Signout from "../AuthPages/Signout.js"
import Settings from "../AuthPages/Settings.js";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recentGamesFocus: true,
            publicGamesFocus: false,
            createNewGameFocus: false,
            modalOpen:false,
            settingsToggle: false,
            profileToggle:false,
            searchedGameCode: "",
            searchSuccess: false,
            gameData: {}
        }

        this.focusTag = this.focusTag.bind(this);
        this.searchGame = this.searchGame.bind(this);
    }

    searchGame() {
        let searchCode = document.getElementById("search-bar").value;
        if (searchCode) {
            database.ref('games/' + searchCode).once('value').then((snapshot) => {
                let results = snapshot.val();
                if (!results) {
                    alert("No games found with that code");
                } else {
                    this.setState({...this.state, searchSuccess: true, gameData: results});
                }
            }).then(() => (this.render()))
            .catch((error) => alert(error))
        }
    }

    //Passed in string is given by selected nav-tag
    focusTag(selectedTag) {
        let unselectedTags = []
        switch(selectedTag) {
            case 'recentGamesTag':
                this.setState({...this.state, 
                    recentGamesFocus: true,
                    publicGamesFocus: false,
                    createNewGameFocus: false
                });
                unselectedTags = ['publicGamesTag', 'createNewGameTag']
                break;
            case 'publicGamesTag':
                this.setState({...this.state, 
                    recentGamesFocus: false,
                    publicGamesFocus: true,
                    createNewGameFocus: false
                });
                unselectedTags = ['recentGamesTag', 'createNewGameTag']
                break;
            case 'createNewGameTag':
                this.setState({...this.state, 
                    recentGamesFocus: false,
                    publicGamesFocus: false,
                    createNewGameFocus: true
                });
                unselectedTags = ['publicGamesTag', 'recentGamesTag']
                break;
        }
    }

    componentDidMount() {
        this.focusTag();
    }

    render() {
        if (this.state.searchSuccess) {
            return(<Redirect to={{
                pathname: "/search-success",
                state: this.state.gameData
            }}/>);
        }
        return(
        <>
            {/* Nav bar */}
            <div className="navbar is-info">
                <a className='navbar-item'>
                    {/* <img id="home-nav" className="img-icon" src={Logo} alt="Home" /> */}
                    <p className='is-size-4' style={{color: "white"}} 
                        onMouseEnter={(e) => {e.target.style.color = "black";}}
                        onMouseLeave={(e) => {e.target.style.color = "white";}}>
                            Quilltly
                    </p>
                </a>

                <div className="navbar-end">
                
                    <div class="navbar-item field">
                        <p class="control">
                            <form onSubmit={(e) => {
                                    e.preventDefault();
                                    console.log("SUBMITTED");
                                    // window.location.replace('/search');
                                    //this.searchGame()
                                }}>
                            <input type="text" placeholder="Search game" className="input is-rounded" id="search-bar"
                                onChange={(event) => this.setState({...this.state, searchedGameCode: event.target.value})}
                                    />
                            </form>
                        </p>
                    </div>

                    <div className="navbar-item field" style={{marginBottom: "0.75rem"}}>
                        <button class="button is-info"
                            onClick={() => (this.setState({...this.state, modalOpen: true, settingsToggle: true, profileToggle:false}))}>

                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 9c.552 0 1 .449 1 1s-.448 1-1 1-1-.449-1-1 .448-1 1-1zm0-2c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm-9 4c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm18 0c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm-9-6c.343 0 .677.035 1 .101v-3.101c0-.552-.447-1-1-1s-1 .448-1 1v3.101c.323-.066.657-.101 1-.101zm9 4c.343 0 .677.035 1 .101v-7.101c0-.552-.447-1-1-1s-1 .448-1 1v7.101c.323-.066.657-.101 1-.101zm0 10c-.343 0-.677-.035-1-.101v3.101c0 .552.447 1 1 1s1-.448 1-1v-3.101c-.323.066-.657.101-1 .101zm-18-10c.343 0 .677.035 1 .101v-7.101c0-.552-.447-1-1-1s-1 .448-1 1v7.101c.323-.066.657-.101 1-.101zm9 6c-.343 0-.677-.035-1-.101v7.101c0 .552.447 1 1 1s1-.448 1-1v-7.101c-.323.066-.657.101-1 .101zm-9 4c-.343 0-.677-.035-1-.101v3.101c0 .552.447 1 1 1s1-.448 1-1v-3.101c-.323.066-.657.101-1 .101z" fill="white"/></svg>
                        </button>
                    </div>
                    {/* <div className="navbar-item field" style={{marginBottom: "0.75rem"}}>
                    <button class="button is-dark"
                        onClick={() => {this.setState({...this.state, modalOpen: true, profileToggle: true, settingsToggle:false})}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 9c.552 0 1 .449 1 1s-.448 1-1 1-1-.449-1-1 .448-1 1-1zm0-2c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm-9 4c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm18 0c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm-9-6c.343 0 .677.035 1 .101v-3.101c0-.552-.447-1-1-1s-1 .448-1 1v3.101c.323-.066.657-.101 1-.101zm9 4c.343 0 .677.035 1 .101v-7.101c0-.552-.447-1-1-1s-1 .448-1 1v7.101c.323-.066.657-.101 1-.101zm0 10c-.343 0-.677-.035-1-.101v3.101c0 .552.447 1 1 1s1-.448 1-1v-3.101c-.323.066-.657.101-1 .101zm-18-10c.343 0 .677.035 1 .101v-7.101c0-.552-.447-1-1-1s-1 .448-1 1v7.101c.323-.066.657-.101 1-.101zm9 6c-.343 0-.677-.035-1-.101v7.101c0 .552.447 1 1 1s1-.448 1-1v-7.101c-.323.066-.657.101-1 .101zm-9 4c-.343 0-.677-.035-1-.101v3.101c0 .552.447 1 1 1s1-.448 1-1v-3.101c-.323.066-.657.101-1 .101z"/></svg>
                    </button>
                    </div> */}
                </div>
            </div>


            <section className="container is-fluid" style={{backgroundColor: "#f0f0f0", minHeight: "93vh"}}>
            <div class="tabs is-centered">
                        <ul>
                            <li class={this.state.recentGamesFocus ? "is-active" : ""} onClick={() => this.focusTag('recentGamesTag')}>
                                <a>
                                    <span className="icon is-small">
                                        <svg fill={this.state.recentGamesFocus ? "blue" : "black"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 12c0 6.627-5.373 12-12 12s-12-5.373-12-12h2c0 5.514 4.486 10 10 10s10-4.486 10-10-4.486-10-10-10c-2.777 0-5.287 1.141-7.099 2.977l2.061 2.061-6.962 1.354 1.305-7.013 2.179 2.18c2.172-2.196 5.182-3.559 8.516-3.559 6.627 0 12 5.373 12 12zm-13-6v8h7v-2h-5v-6h-2z"/></svg>
                                    </span>
                                    <span>Recent</span>
                                </a>
                            </li>
                            <li class={this.state.publicGamesFocus ? "is-active" : ""} onClick={() => this.focusTag('publicGamesTag')}>
                                <a>
                                    <span className="icon is-small">
                                        <svg fill={this.state.publicGamesFocus ? "blue" : "black"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.997 18h-11.995l-.002-.623c0-1.259.1-1.986 1.588-2.33 1.684-.389 3.344-.736 2.545-2.209-2.366-4.363-.674-6.838 1.866-6.838 2.491 0 4.226 2.383 1.866 6.839-.775 1.464.826 1.812 2.545 2.209 1.49.344 1.589 1.072 1.589 2.333l-.002.619zm4.811-2.214c-1.29-.298-2.49-.559-1.909-1.657 1.769-3.342.469-5.129-1.4-5.129-1.265 0-2.248.817-2.248 2.324 0 3.903 2.268 1.77 2.246 6.676h4.501l.002-.463c0-.946-.074-1.493-1.192-1.751zm-22.806 2.214h4.501c-.021-4.906 2.246-2.772 2.246-6.676 0-1.507-.983-2.324-2.248-2.324-1.869 0-3.169 1.787-1.399 5.129.581 1.099-.619 1.359-1.909 1.657-1.119.258-1.193.805-1.193 1.751l.002.463z"/></svg>
                                    </span>
                                    <span>Public</span>
                                </a>
                            </li>
                            <li class={this.state.createNewGameFocus ? "is-active" : ""} onClick={() => this.focusTag('createNewGameTag')}>
                                <a>
                                    <span className="icon is-small">
                                        <svg fill={this.state.createNewGameFocus ? "blue" : "black"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 14.45v6.55h-16v-12h6.743l1.978-2h-10.721v16h20v-10.573l-2 2.023zm1.473-10.615l1.707 1.707-9.281 9.378-2.23.472.512-2.169 9.292-9.388zm-.008-2.835l-11.104 11.216-1.361 5.784 5.898-1.248 11.103-11.218-4.536-4.534z"/></svg>
                                    </span>
                                    <span>Create New Game</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {this.state.publicGamesFocus && <PublicStoriesPage />}

                    {this.state.recentGamesFocus && <RecentGamesPage focusTag={this.focusTag}/>}

                    {this.state.createNewGameFocus && <CreateNewGamePage />}
            </section>
            {this.state.modalOpen &&
            <>
            <div class="modal-background"></div>
                <div class="modal-card" style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                    <header class="modal-card-head">
                    <p class="modal-card-title">
                        Settings
                    </p>
                    <button class="delete" aria-label="close" onClick={() => (this.setState({...this.state, modalOpen: false}))}>X</button>
                    </header>

                <div className="modal-card-body">
                    <div>
                        {this.state.error && <article class="message is-danger">
                            <div class="message-body">
                                {this.state.error}
                            </div>
                        </article>}
                    </div>

                    <Settings />
                </div>
                <footer class="modal-card-foot">
                    <Signout></Signout>
                </footer> 
            </div>
            </>}
        </>
        );
    }
}

export default Dashboard;