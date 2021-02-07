import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import {database, auth} from '../firebase';
import PublicStoryCard from './PublicStoryCard';
import GameCard from '../GameCard/GameCard';

class PublicStoriesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          publicGames: []
        };
    }

    componentDidMount() {
        //Pull public games stored in database and pass to state
          database.ref('/games/').once('value').then((snapshot) => {
            let results = snapshot.val()
            if (!results) {
              //Snapshot is empty and there are no public games
              return;
            } else {
              //Update state to hold games
              for (let i in results) {
                if (results[i].public) {
                  this.setState({...this.state, publicGames: [...this.state.publicGames, {id: i, gameInfo: results[i]}]});
                }
              }
            }
          });
        }

      componentWillUnmount() {
        sessionStorage.setItem("publicGames", JSON.stringify(this.state.publicGames));
      }

    render() {
      //Returns public games from database
        return(
          <div>
            <section class = "story-page">
              {this.state.publicGames.length > 0 ?
                this.state.publicGames.map((game) => {
                  return(<GameCard gameInfo={game}/>);
                }) : <h1>No public games found</h1> }
            </section>
          </div>
        );
    }
}

export default PublicStoriesPage;
