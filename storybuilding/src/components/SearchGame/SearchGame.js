import React from 'react';
import GameCard from '../GameCard/GameCard';

class SearchGame extends React.Component {
    constructor(props) {
        super(props);
        //props come from game data in dashboard
        this.state = {
            id: this.props.location.state.id,
            gameInfo: {
                author: this.props.location.state.author,
                content: this.props.location.state.content,
                dateStarted: this.props.location.state.dateStarted,
                gameCode: this.props.location.state.gameCode,
                length: this.props.location.state.length,
                open: this.props.location.state.open,
                public: this.props.location.state.public,
                title: this.props.location.state.title
            },
            focused: true
        }
    }

    render() {
        console.log(this.state);
        return(
            <div>
                <GameCard gameInfo={this.state}/>
            </div>
        );
    }
}

export default SearchGame;