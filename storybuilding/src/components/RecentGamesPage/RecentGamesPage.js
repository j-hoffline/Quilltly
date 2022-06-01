import { createBrowserHistory } from 'history';
import React from 'react';
import { auth, database } from '../firebase';
import GameCard from '../GameCard/GameCard';

class RecentGamesPage extends React.Component {
    constructor(props) {
        super(props);
        const history = createBrowserHistory();

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
            return(
                <article class="message is-danger">
                    <div class="message-body">
                        We're sorry, an error has occurred. Please try logging in again. <br/>
                        {this.state.error}
                    </div>
                </article>);
        }
        else if (this.state.gameArr.length == 0) {
            return(
                <>
                    <article class="message is-dark">
                        <div class="message-body">
                            You haven't made any games yet. 
                        </div>
                    </article>
                    <div className='container has-text-centered'>
                        <button class="button is-info" style={{margin: "1%"}} onClick={() => this.props.focusTag('createNewGameTag')}>Create New Game</button>
                        <button class="button" style={{margin: "1%"}} onClick={() => {this.props.focusTag('publicGamesTag')}}>View Public Games</button>
                    </div>
              </>
            )
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