import React from 'react';
import {Redirect} from 'react-router-dom';
import Logo from './images/quill-n-ink 2.png';
import TimelineBlip from './images/iconmonstr-circle-2.svg';
import SearchIcon from './images/iconmonstr-magnifier-5.svg';
import SettingsGear from './images/iconmonstr-gear-10.svg';
import ProfileIcon from './images/iconmonstr-user-20.svg';
import './dashboard-style.css';
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

        for (let i in unselectedTags) {
            let navTag = document.getElementById(unselectedTags[i]);
            navTag.style.fontSize = "24px";
            navTag.style.textDecoration = "none";
        }

        let navTag = document.getElementById(selectedTag);
        if (navTag) {
            navTag.style.fontSize = "36px";
            navTag.style.textDecoration = "underline";
            navTag.style.textDecorationColor = "#E75A7C";
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
            <div className="dashboard">
                <div className="nav-bar" id="nav-bar">
                    <img id="home-nav" className="img-icon" src={Logo} alt="Home" />

                <div className="nav-tags">
                    <h1 id="recentGamesTag" className="nav-tag" onClick={() => this.focusTag('recentGamesTag')}>Recent Games</h1>
                    <h1 id="publicGamesTag" className="nav-tag" onClick={() => this.focusTag('publicGamesTag')}>Public Games</h1>
                    <h1 id="createNewGameTag" className="nav-tag" onClick={() => this.focusTag('createNewGameTag')}>Create New Game</h1>
                </div>

                <div className="user-actions">
                    <Form.Control type="text" placeholder="Search game" className="search-bar user-action" id="search-bar"
                        onChange={(event) => this.setState({...this.state, searchedGameCode: event.target.value})}
                        onSubmit={() => window.location.replace('/search')}></Form.Control>
                        <img src={SearchIcon} className="user-action" onClick={this.searchGame}/>
                    <div className="user-action" 
                        onClick={() => (this.setState({...this.state, modalOpen: true, settingsToggle: true, profileToggle:false}))}>
                        <img className="user-action" src={SettingsGear} alt="Settings" />
                    </div>
                    <div className="user-action"
                        onClick={() => {this.setState({...this.state, modalOpen: true, profileToggle: true, settingsToggle:false})}}>
                        <img className="user-action" src={ProfileIcon} alt="Profile" />
                    </div>
                </div>
            </div>

            {this.state.modalOpen && <div className="blur-div"></div>}

            <Modal className="modal" show={this.state.modalOpen}>
                <Modal.Header>
                    <Modal.Title className="modal-header">
                        {this.state.settingsToggle && "Settings"}
                        {this.state.profileToggle && "Profile"}
                    </Modal.Title>
                    <button id ="closeButton" type="button"
                        onClick={() => (this.setState({...this.state, modalOpen: false, settingsToggle:false, profileToggle:false}))}>
                            X
                    </button>
                </Modal.Header>
                <Modal.Body>
                    {this.state.profileToggle && <Signout />}
                    {this.state.settingsToggle && <Settings />}
                </Modal.Body> 
            </Modal>

            {//End of nav-bar
                this.state.publicGamesFocus && <PublicStoriesPage />}

            {this.state.recentGamesFocus && <RecentGamesPage />}

            {this.state.createNewGameFocus && <CreateNewGamePage />}

            {false && 
                <div id="story-div" className="nav-tag-divs">
                    <div className="game-card">
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                    </div>


                    <div className="game-card">
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                    </div>


                    <div className="game-card">
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                    </div>

                    <div id="timeline" className="timeline"></div>

                    <img id="timeline-blip" className="timeline-blip" src={TimelineBlip} alt="timeline-blip"/>

                    </div>
            }

            </div>
        );
    }
}

export default Dashboard;