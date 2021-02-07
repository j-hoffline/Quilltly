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
        database.ref('games/').once('value').then((snapshot) => {
            let results = snapshot.val();
            if (!results) {
                this.setState({...this.state, error: "There was an error fetching your games."});
            } else {
                for (let i in results) {
                    if (results[i].author === auth.currentUser.uid) {
                        //Game was created by current user, add to gameArr
                        this.setState({...this.state, gameArr: [...this.state.gameArr, {id: i, gameInfo: results[i]}]});
                    }
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