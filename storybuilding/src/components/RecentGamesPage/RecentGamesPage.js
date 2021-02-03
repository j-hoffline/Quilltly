import React from 'react';
import { auth, database } from '../firebase';
import './dashboard-game-card.css';
import GameCard from '../GameCard/GameCard';

class RecentGamesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: "",
            profile: 0,
            gameArr: []
        }

        this.toggleNav = this.toggleNav.bind(this);
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => this.getUserGames(user));
    }

    toggleNav() {
        document.getElementById("nav-bar").style.visibility = "hidden";
        console.log("click");
    }

    getUserGames(user) {
        database.ref('/users/' + auth.currentUser.uid).once('value').then((snapshot) => {
            let results = snapshot.val();
            if (!results) {
            //Error fetching recent games
            this.setState({...this.state, error: "There was an error fetching your profile."});
            return;
            } else {
            //Update state to hold user profile
            this.setState({...this.state, profile: {name: results.name}})
            //Update state to hold user's games
            let userGameIDs = results.startedGames.split(",");
            let newArr = []
            if (userGameIDs.length == 0) {return;}
            for (let i in userGameIDs) {
                //Convert content string into list
                let currID = userGameIDs[i];
                if (i == 0) { //['01'
                    newArr.push(currID.substring(2, currID.length - 1));
                } else if (i == userGameIDs.length - 1) { //_'03']
                    newArr.push(currID.substring(2, currID.length - 2));
                } else { //_'02'
                    newArr.push(currID.substring(2, currID.length - 1));
                }       
            }
            this.setState({...this.state, profile: {...this.state.profile, startedGames: newArr}}); //startedGames list from user's profile

            //Pull games
            if (this.state.profile.startedGames.length !== 1) { //Making sure user has at least 1 started game
                    database.ref('games/').once('value').then((snapshot) => {
                        let results = snapshot.val();
                        for (let i in results) {
                            this.setState({...this.state, gameArr: [...this.state.gameArr, {id: i, gameInfo: results[i]}]});
                        }
                    }).catch((error) => (this.setState({...this.state, error: error})));
                    console.log(this.state.gameArr);
            }
        }
        })
    }

    render() {
        if (this.state.error) {
            return(<div style={{marginTop: "30px"}}>
                We're sorry, an error has occurred. Please try logging in again. <br/>
                {this.state.error}
                </div>);
        }
        else if (this.state.gameArr.length == 0) {
            return(<div style={{marginTop: "30px"}}>You haven't made any games.</div>)
        } else {
        return(
            <div>
                {this.state.gameArr.map((game) => {
                    return <GameCard gameInfo={game} />
                })}
            </div>
        );
                }
    }
}

export default RecentGamesPage;