import React from 'react';
import './create-new-game-page.css';
import {auth, database} from '../firebase';
import {Dropdown, DropdownButton, Form, Button, ToggleButton, Alert} from 'react-bootstrap';


const randomString = require('randomstring');

class CreateNewGamePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: "",
            title: "",
            storyIntro: "",
            gameCode: "",
            gamePublic: false,
            maxLength: "1",
            currLength: "0"
        }

        this.createGame = this.createGame.bind(this);
        this.toggleStoryLength = this.toggleStoryLength.bind(this);
    }

    createGame() {
        let timestamp = new Date(); //Initialize date for timestamp
        let lengthOptions = document.getElementById("lengthOptions"); //select tag for length
        let splitStr = ""; //String to determine splitting of string
        let maxLength = "" //String to pass along max length of selected length
        //Check that intro is compliant with selected length
        switch(lengthOptions.options[lengthOptions.selectedIndex].text.trim()) {
            case 'One Word':
                if (this.state.storyIntro.trim().split(" ").length !== 1) {return this.setState({...this.state, error: "Story introduction does not match set max length."})}
                splitStr = " "; //Split by space
                maxLength = "1" //1 word limit
            case 'One Sentence':
                if (this.state.storyIntro.trim().length > 150) {return this.setState({...this.state, error: "Story introduction does not match set max length. (Max: 150 characters)"})}
                splitStr = "."; //Split by sentence
                maxLength = "150" //150 character limit
            case 'One Paragraph':
                if (this.state.storyIntro.trim().split(" ").length > 120) {return this.setState({...this.state, error: "Story introduction does not match set max length. (Max: 120 words)"})}
                splitStr = "\n"; //Split by paragraph
                maxLength = "120" //120 word limit
            case 'Tweet Length':
                if (this.state.storyIntro.trim().length > 280) {return this.setState({...this.state, error: "Story introduction does not match set max length. (Max: 280 words)"})}
                //No split str, split by padding spaces??
                maxLength = "280" //Character limit
        }

        let contentArr = this.state.storyIntro.split(splitStr); //Split story intro into list based on splitStr
        let contentStr = "[" //Begin string concatenation
        for (let i in contentArr) {
            if (i == contentArr.length - 1) {
                contentStr += `'${contentArr[i]}']`
            } else { contentStr += `'${contentArr[i]}', ` }
        }

        database.ref('games/' + this.state.gameCode).set({
            author: auth.currentUser.uid,
            title: this.state.title,
            content: contentStr,
            dateStarted: `${timestamp.getMonth()}/${timestamp.getDate()}/${timestamp.getFullYear()}`,
            length: maxLength,
            open: true,
            public: this.state.gamePublic,
            gameCode: this.state.gameCode
        }).then(() => {
            //Reset state
            this.setState({
                error: "",
                title: "",
                storyIntro: "",
                gameCode: "",
                gamePublic: false,
                maxLength: "1",
                currLength: "0"});
            //Reset form
            document.getElementById("createGameForm").reset();
        })
        .catch((error) => (this.setState({...this.state, error: error})));
    }

    //Function to switch character/word counter below intro (triggered when length option selected)
    toggleStoryLength(e) {
        switch (e.target.value) {
            case 'one-word':
                return this.setState({...this.state, maxLength: "1", currLength: this.state.storyIntro.trim().split(" ").length});
            case 'one-sentence':
                return this.setState({...this.state, maxLength: "150", currLength: this.state.storyIntro.trim().length});
            case 'one-paragraph':
                return this.setState({...this.state, maxLength: "120", currLength: this.state.storyIntro.trim().split(" ").length});
            case 'tweet-length':
                return this.setState({...this.state, maxLength: "280", currLength: this.state.storyIntro.trim().length});
        }
    }

    //Updates storyIntro length counter
    getCurrLength() { 
        let currCountElement = document.getElementById("counter"); //Counter element on page

        //Update element on page
        if(this.state.maxLength === '1' || this.state.maxLength === '150') { //Count by words
            currCountElement.innerHTML = this.state.storyIntro.trim().split(" ").length;
        }
        if(this.state.maxLength === '120' || this.state.maxLength === '280') { //Count by characters
            currCountElement = this.state.storyIntro.trim().length;
        }
    }

    componentDidMount() {
        let generatedCode = randomString.generate({
            length: 12,
            charset: 'alphabetic'
        });
        this.setState({...this.state, gameCode: generatedCode});
    }

    render() {
        return(
            <div className="create-game-card">
                <Form id="createGameForm">
                    {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
                    <Form.Group id="storyTitle">
                        <Form.Control type="text" placeholder="Title your masterpiece..."
                            onChange={(event) => this.setState({...this.state, title: event.target.value})} required />
                    </Form.Group>
                    <Form.Group id="storyIntro">
                        <Form.Control type="text" placeholder="How do you want to start your story?"
                            onChange={(event) => {
                                //Updates state and calls getCurrLength to update word/character count
                                this.setState({...this.state, storyIntro: event.target.value})
                                this.getCurrLength()}} required />
                    </Form.Group>
                    <div id ="counter-div"> Submission Length:  
                        <span id="counter">{`\t${this.state.currLength}`}</span> / <span id="maxCounter">{this.state.maxLength}</span>
                    </div>
                    <div style={{textAlign: "center"}}>
                        <Form.Group id="radioButtons">
                            <ToggleButton checked={this.state.gamePublic} type="checkbox" className="createGameOption"
                                onClick={() => this.setState({...this.state, gamePublic: !this.state.gamePublic})}>
                                Public
                            </ToggleButton>
                            <Form.Label>Max Contribution Length: </Form.Label>
                            <select id="lengthOptions" className="createGameOption">
                                <option value="one-word" onClick={this.toggleStoryLength} selected>One Word</option> <br />
                                <option value="one-sentence" onClick={this.toggleStoryLength}>
                                        One Sentence</option> <br />
                                <option value="one-paragraph" onClick={this.toggleStoryLength}>One Paragraph</option> <br />
                                <option value="tweet-length" onClick={this.toggleStoryLength}>Tweet Length</option> <br />
                            </select>

                            <Form.Label className="createGameOption">Game Code: <span>{this.state.gameCode}</span></Form.Label>
                        </Form.Group>
                        <Button className="bubble-button submit-button" variant="secondary" onClick={this.createGame}>
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default CreateNewGamePage;

