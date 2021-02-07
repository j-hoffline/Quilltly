import React from 'react';
import {Link} from 'react-router-dom';
import './game-card.css';
import BackArrowOutline from './images/iconmonstr-angel-left-circle-thin.svg';
import QuillCircle from './images/quill-circle.png';
import TimelineBlip from './images/iconmonstr-circle-2.svg';

class GameCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.gameInfo.id,
            content: this.props.gameInfo.gameInfo.content,
            contentArr: [],
            contentStr: "",
            preview: "",
            dateStarted: this.props.gameInfo.gameInfo.dateStarted,
            length: this.props.gameInfo.gameInfo.length,
            open: this.props.gameInfo.gameInfo.open,
            players: this.props.gameInfo.gameInfo.players,
            public: this.props.gameInfo.gameInfo.public,
            title: this.props.gameInfo.gameInfo.title,
            focused: false,
            synopsisToggle: true,
            wordByWordToggle: false,
            addToStoryToggle: false,
        }

        this.focusGame = this.focusGame.bind(this);
        this.parseContent = this.parseContent.bind(this);
        this.hoverButton = this.hoverButton.bind(this);
        this.leaveButton = this.leaveButton.bind(this);
    }

    componentDidMount() {
        //Parse content into list
        //Convert content string into list
        this.parseContent()
    }

    parseContent() {
        let listContentStr = this.state.content.substring(1, this.state.content.length - 1);
        let contentArr = listContentStr.split(",");
        let newContentArr = []
        let newContentStr = "";

        for (let i in contentArr) {
            //Convert content string into list
            let currStr = contentArr[i];
            if (i == 0) { //'01'
                newContentStr += currStr.substring(1, currStr.length);
                newContentArr.push(currStr.substring(1, currStr.length));
                console.log("1");
            } else if (i == contentArr.length - 1) { //_'03'
                newContentStr += currStr.substring(0, currStr.length - 1);
                newContentArr.push(currStr.substring(0, currStr.length - 1));
                console.log("2");
            } else { //_'02'
                newContentStr += currStr.substring(0, currStr.length);
                newContentArr.push(currStr.substring(0, currStr.length));
                console.log("3");
            }
            console.log("New content String: " + newContentStr);
            console.log("NewContentArr: " + newContentArr);     
        }

        this.setState({...this.state, 
            contentStr: newContentStr, 
            preview: `${newContentStr.substring(0, 180)}...`,
            contentArr: contentArr
        });
    }

    focusGame() {
        let gameCard = document.getElementById(this.state.id);
        let title = document.getElementById(`${this.state.id}-title`);
        let paragraphText = document.getElementById(`${this.state.id}-paragraph`);
        let wrapper = document.getElementById(`${this.state.id}-wrapper`);
        let storynav = document.getElementById(`${this.state.id}-nav`); 
        let addToButton = document.getElementById(`${this.state.id}-add-button`);

        //Close game card
        if (this.state.focused) {
            wrapper.style.position = "static";
            wrapper.style.top = "initial";
            wrapper.style.minHeight = "auto";
            wrapper.style.zIndex = "0";
            wrapper.style.width = "initial";            
            gameCard.style.height = "140px";
            title.style.width = "0";
            addToButton.style.opacity = "0";
            
            paragraphText.innerHTML = this.state.preview;
            storynav.style.height = "0";
            storynav.style.top = "initial";
        }
        else { //Open game card
            wrapper.style.position = "absolute";
            wrapper.style.top = "64px";
            wrapper.style.minHeight = "100vw";
            wrapper.style.width = "100%";
            wrapper.style.zIndex = "100";
            gameCard.style.height = "300px";
            title.style.width = "100%";
            paragraphText.innerHTML = this.state.contentStr;
            storynav.style.height = "64px";
            storynav.style.top = "-64px";
            addToButton.style.opacity = "100";
        }
        this.setState({...this.state, focused: !this.state.focused});
    }

    hoverButton() {
        let hiddenDiv = document.getElementById(`${this.state.id}-hidden-button-div`);
        hiddenDiv.style.width = "170px";
        hiddenDiv.style.right = "120px";
    }

    leaveButton() {
        let hiddenDiv = document.getElementById(`${this.state.id}-hidden-button-div`);
        hiddenDiv.style.width = "0px";
        hiddenDiv.style.right = "130px";
    }

    render() {
        return(
            <div id={`${this.state.id}-wrapper`} className="story-wrapper">
                <div id={`${this.state.id}-nav`} className="story-nav">
                    <img className="back-arrow" 
                        onClick={() => { 
                            this.setState({...this.state, synopsisToggle: true, wordByWordToggle: false});
                            this.focusGame();}} src={BackArrowOutline} />
                    <h3 className="story-nav-tag" name="synopsis" 
                        onClick={() => this.setState({...this.state, synopsisToggle: true, wordByWordToggle: false})}>Synopsis</h3>
                    <h3 className="story-nav-tag" name="word-by-word" 
                        onClick={() => this.setState({...this.state, synopsisToggle: false, wordByWordToggle: true})}>Word-By-Word</h3>
                </div>

                {this.state.synopsisToggle && 
                <div id="synopsis-div">
                    <div key={this.state.id} id={this.state.id} className="story-div">
                        <div className="game-card" onClick={this.focusGame}>
                            <div id={`${this.state.id}-title`} className="card-title">
                                <h1 className="title">{this.state.title}</h1>
                            </div>
                            <p className="preview" id={`${this.state.id}-paragraph`}>
                                {this.state.preview}
                            </p>
                            <div className="story-details">
                                <div className="story-setting">Public: {this.state.public ? "Yes" : "No"}</div>
                                <div className="story-setting">Open: {this.state.open ? "Yes" : "No"}</div>
                                <div className="story-setting">Created On: {this.state.dateStarted}</div>
                            </div>
                        </div>
                    </div>
                </div>}

                {this.state.wordByWordToggle && 
                    this.state.contentArr.map((entry) => (
                    <div className="game-card">
                        {entry}
                    </div>))}
                    
                    <Link to={{
                        pathname: "/add-to-story",
                        state: this.state
                    }}>
                    <div id={`${this.state.id}-hidden-button-div`} className="add-to-story-button hidden-button-div">Add to story</div>
                    <img id={`${this.state.id}-add-button`} className="add-to-story-button" onMouseEnter={this.hoverButton} onMouseLeave={this.leaveButton} 
                           src={QuillCircle}/>
                    </Link>                    
            </div>
        );
    }
}

export default GameCard;