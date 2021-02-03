import React from 'react';
import './game-card.css';
import TimelineBlip from './images/iconmonstr-circle-2.svg';

class GameCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.gameInfo.id,
            content: this.props.gameInfo.gameInfo.content,
            dateStarted: this.props.gameInfo.gameInfo.dateStarted,
            length: this.props.gameInfo.gameInfo.length,
            open: this.props.gameInfo.gameInfo.open,
            players: this.props.gameInfo.gameInfo.players,
            public: this.props.gameInfo.gameInfo.public,
            title: this.props.gameInfo.gameInfo.title,
            focused: false,
        }

        this.focusGame = this.focusGame.bind(this);
        this.scrollTimeline = this.scrollTimeline.bind(this);
    }

    componentDidMount() {
        //Parse content into list
        document.addEventListener("scroll", this.scrollTimeline);
    }

    scrollTimeline() {
        if (this.state.focused) {
            let timeline = document.getElementById(`${this.state.id}-timeline`);
            let blip = document.getElementById(`${this.state.id}-timeline-blip`);
            let storyDiv = document.getElementById(this.state.id);

            let calcHeight = window.scrollY / (storyDiv.clientHeight + timeline.clientHeight) * timeline.clientHeight + 96;

            blip.style.top = `${calcHeight}px`;
        }
    }

    focusGame() {
        let gameCard = document.getElementById(this.state.id);
        let title = document.getElementById(`${this.state.id}-title`);
        let paragraphText = document.getElementById(`${this.state.id}-paragraph`);
        let wrapper = document.getElementById(`${this.state.id}-wrapper`);
        let storynav = document.getElementById(`${this.state.id}-nav`);
        let timeline = document.getElementById(`${this.state.id}-timeline`);
        let blip = document.getElementById(`${this.state.id}-timeline-blip`);
        

        //Close game card
        if (this.state.focused) {
            wrapper.style.position = "static";
            wrapper.style.top = "initial";
            wrapper.style.height = "auto";
            wrapper.style.zIndex = "0";
            wrapper.style.width = "initial";
            gameCard.style.height = "140px";
            title.style.width = "0";
            gameCard.style.marginRight = "initial";
            paragraphText.innerHTML = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout....";
            storynav.style.height = "0";
            storynav.style.top = "initial";
            timeline.style.opacity = "0";
            blip.style.opacity = "0";
        }
        else { //Open game card
            wrapper.style.position = "absolute";
            wrapper.style.top = "64px";
            wrapper.style.height = "100vh";
            wrapper.style.width = "100%";
            wrapper.style.zIndex = "100";
            gameCard.style.height = "300px";
            gameCard.style.marginRight = "48px";
            title.style.width = "100%";
            paragraphText.innerHTML = this.state.content;
            storynav.style.height = "64px";
            storynav.style.top = "-64px";
            timeline.style.opacity = "100";
            blip.style.opacity = "100";
        }
        this.setState({...this.state, focused: !this.state.focused});
    }

    render() {
        return(
            <div id={`${this.state.id}-wrapper`} className="story-wrapper">
                <div id={`${this.state.id}-nav`} className="story-nav">
                    <h3 className="story-nav-tag">Synopsis</h3>
                    <h3 className="story-nav-tag">Word-By-Word</h3>
                </div>
                <div key={this.state.id} id={this.state.id} className="story-div">
                    <div className="game-card" onClick={this.focusGame}>
                        <div id={`${this.state.id}-title`} className="card-title">
                            <h1 className="title">{this.state.title}</h1>
                        </div>
                        <p className="preview" id={`${this.state.id}-paragraph`}>
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout....
                        </p>
                        <div className="story-details">
                            <div className="story-setting">Public: {this.state.public ? "Yes" : "No"}</div>
                            <div className="story-setting">Open: {this.state.open ? "Yes" : "No"}</div>
                            <div className="story-setting">Word Count: {this.state.content.length}</div>
                        </div>
                    </div>
                </div>
                <div id={`${this.state.id}-timeline`} className="timeline"></div>

                <img id={`${this.state.id}-timeline-blip`} className="timeline-blip" src={TimelineBlip} alt="timeline-blip"/>
            </div>
        );
    }
}

export default GameCard;