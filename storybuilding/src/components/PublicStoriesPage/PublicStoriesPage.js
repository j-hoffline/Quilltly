import React from 'react';
import {Redirect} from 'react-router-dom';
import {database, auth} from '../firebase';

class PublicStoriesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          publicGames: ""
        };
    }

    componentDidMount() {
      //Pull public games stored in database and pass to state
        let gameArr = []
        database.ref('/games/').once('value').then((snapshot) => {
          let results = snapshot.val()
          if (!results) {
            //Snapshot is empty and there are no public games
            return;
          } else {
            //
            for (let i in results) {
              let contentArr = results[i].content.substring(1, results[i].content.length - 1);
              results[i].content = contentArr.split(",");
              gameArr.unshift(results[i]);
            }
            this.setState({...this.state, publicGames: gameArr});
          }
        });
    }

    render() {
        return(
            <div>
              <section class = "story-page">
                {this.state.publicGames ?
                  this.state.publicGames.map((game) => {
                    return(
                      <div class = "new-story-1">
                        <form action=".. fill it later .." method="get">
                          <h1> {game.content[0]} </h1>
                        </form> <br />
                        <button type = "submit"> Join game </button>
                      </div>
                    );
                  }) : <h1>No public games found</h1> }

                      <div class = "new-story-2">
                        <form action=".. fill it later .." method="get">
                          <h1> Caraousel </h1>
                        </form> <br />
                       <button type = "submit"> Join game </button>
                      </div>

                      <div class = "new-story-3">
                        <form action=".. fill it later .." method="get">
                          <h1> Caraousel </h1>

                        </form><br />
                        <button type = "submit"> Join game </button>
                      </div>
      </section>

          </div>
        );
    }
}

export default PublicStoriesPage;
