import React from 'react';
import './game-card.css';

class PublicStoryCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.info.title,
            content: this.props.info.content,
            dateStarted: this.props.info.dateStarted,
            length: this.props.info.length,
            open: this.props.info.open,
            players: this.props.info.players,
            public: this.props.info.public
        }

        this.navigateToGame = this.navigateToGame.bind(this);
    }

    navigateToGame() {
        
    }

    render() {
        return(
            <div class="game-card" onClick={this.navigateToGame}>
                <h1 class="title">{this.state.title}</h1>
                <p class="preview">
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout....
                </p>
                <div class="story-details">
                    <div class="story-setting">Length: {this.state.length}</div>
                    <div class="story-setting">{this.state.open ? 'Open' : 'Closed'}</div>
                    <div class="story-setting">Word Count: {this.state.content.length}</div>
                </div>
            </div>
        );
    }
}

export default PublicStoryCard;