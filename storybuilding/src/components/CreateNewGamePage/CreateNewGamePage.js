import React from 'react';
import './create-new-game-page.css';
import {auth, database} from '../firebase';
import {Dropdown, DropdownButton, Form, Button, ToggleButton} from 'react-bootstrap';


const randomString = require('randomstring');

class CreateNewGamePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            storyIntro: "",
            gameCode: "",
            gamePublic: false
        }

        this.createGame = this.createGame.bind(this);
    }

    createGame() {
        let timestamp = new Date();
        let lengthOptions = document.getElementById("lengthOptions");
        let contentArr = this.state.storyIntro.split(" ");
        let contentStr = "["
        for (let i in contentArr) {
            if (i == contentArr.length - 1) {
                contentStr += `'${contentArr[i]}']`
            } else { contentStr += `'${contentArr[i]}', ` }
        }

        database.ref('games/' + this.state.gameCode).set({
            author: auth.currentUser.displayName,
            title: this.state.title,
            content: contentStr,
            dateStarted: `${timestamp.getMonth()}/${timestamp.getDate()}/${timestamp.getFullYear()}`,
            length: lengthOptions.options[lengthOptions.selectedIndex].text,
            open: true,
            public: this.state.gamePublic,
            gameCode: this.state.gameCode
        }).then(() => (alert(("Game Created!"))))
        .catch((error) => (alert(error)));
    }

    componentDidMount() {
        let generatedCode = randomString.generate({
            length: 12,
            charset: 'alphabetic'
        });
        this.setState({...this.state, gameCode: generatedCode});
    }

    render() {
        console.log(auth.currentUser)
        return(
            <div className="create-game-card">
                <Form >
                    <Form.Group id="storyTitle">
                        <Form.Control type="text" placeholder="Title your masterpiece..."
                            onChange={(event) => this.setState({...this.state, title: event.target.value})} required />
                    </Form.Group>
                    <Form.Group id="storyIntro">
                        <Form.Control type="text" placeholder="How do you want to start your story?"
                            onChange={(event) => this.setState({...this.state, storyIntro: event.target.value})} required />
                    </Form.Group>
                    <div style={{textAlign: "center"}}>
                        <Form.Group id="radioButtons">
                            <ToggleButton checked={this.state.gamePublic} type="checkbox" className="createGameOption"
                                onClick={() => this.setState({...this.state, gamePublic: !this.state.gamePublic})}>
                                Public
                            </ToggleButton>
                            <Form.Label>Max Contribution Length: </Form.Label>
                            <select id="lengthOptions" className="createGameOption">
                                <option value="one-word" selected>One Word</option> <br />
                                <option value="one-sentence" onClick={() => (console.log("one-sentence selected"))}>One Sentence</option> <br />
                                <option value="one-paragraph">One Paragraph</option> <br />
                                <option value="tweet-length">Tweet Length</option> <br />
                            </select>

                            <Form.Label className="createGameOption">Game Code: <span>{this.state.gameCode}</span></Form.Label>
                        </Form.Group>
                        <Button className="bubble-button submit-button" variant="secondary" type="submit" onClick={this.createGame}>
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default CreateNewGamePage;

