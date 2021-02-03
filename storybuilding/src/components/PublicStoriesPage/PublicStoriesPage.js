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
        console.log("firebase call made");
        //Pull public games stored in database and pass to state
          let gameArr = []
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
                } else {continue;}
                //Convert content string into list
                /* let contentArr = results[i].content.substring(1, results[i].content.length - 1);
                results[i].content = contentArr.split(",");
                gameArr.unshift(results[i]); */
              }
              /* sessionStorage.setItem("pulledGames", gameArr);
              this.setState({...this.state, publicGames: gameArr}); */
            }
          });
      }

    render() {
      //Returns public games from database
        return(
          <div>
            <section class = "story-page">
              {!this.state.publicGames.length == 0 ?
                this.state.publicGames.map((game) => {
                  return(<GameCard gameInfo={game}/>);
                }) : <h1>No public games found</h1> }
            </section>
          </div>
        );
}
}

export default PublicStoriesPage;
