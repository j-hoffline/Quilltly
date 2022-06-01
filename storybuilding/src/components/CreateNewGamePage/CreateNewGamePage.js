import React from 'react';
// import './create-new-game-page.css';
import {auth, database} from '../firebase';
import {Dropdown, DropdownButton, Form, Button, ToggleButton, Alert} from 'react-bootstrap';


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
            currLength: "0",
            dropdownToggle: false
        }

        this.createGame = this.createGame.bind(this);
        this.toggleStoryLength = this.toggleStoryLength.bind(this);
        this.makeid = this.makeid.bind(this);
    }

      
    makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
    charactersLength));
    }
    return result;
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
                break;
            case 'One Sentence':
                if (this.state.storyIntro.trim().length > 150) {return this.setState({...this.state, error: "Story introduction does not match set max length. (Max: 150 characters)"})}
                splitStr = "."; //Split by sentence
                maxLength = "150" //150 character limit
                break;
            case 'One Paragraph':
                if (this.state.storyIntro.trim().split(" ").length > 120) {return this.setState({...this.state, error: "Story introduction does not match set max length. (Max: 120 words)"})}
                splitStr = "\n"; //Split by paragraph
                maxLength = "120" //120 word limit
                break;
            case 'Tweet Length':
                if (this.state.storyIntro.trim().length > 280) {return this.setState({...this.state, error: "Story introduction does not match set max length. (Max: 280 words)"})}
                //No split str, split by padding spaces??
                maxLength = "280" //Character limit
                break;
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
        let generatedCode = this.makeid(6);
        this.setState({...this.state, gameCode: generatedCode});
    }

    render() {
        return(
            <section className='container is-fluid'>
            <div className="box">
                
                <form id="createGameForm">
                <div className='block'>
                    {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
                    <div className="block" id="storyTitle">
                        <label className='label'>Title</label>
                        <input className="input" type="text" placeholder="Title your masterpiece..."
                            onChange={(event) => this.setState({...this.state, title: event.target.value})} required />
                    </div>
                    <div className="block" id="storyIntro">
                        <label className='label'>Intro</label>
                        <textarea class="textarea is-link" placeholder="How do you want to start your story?"
                            onChange={(event) => {
                                //Updates state and calls getCurrLength to update word/character count
                                this.setState({...this.state, storyIntro: event.target.value})
                                this.getCurrLength()}} required></textarea>
                        
                    </div>
                    <div id ="counter-div"> Submission Length:  
                        <span id="counter">{`\t${this.state.currLength}`}</span> / <span id="maxCounter">{this.state.maxLength}</span>
                    </div>
                    </div>

                    <div className='block'>
                        <div className='columns'>
                            <div className='column'>
                                <label className="label">Public</label>
                                <input checked={this.state.gamePublic} type="checkbox" className="checkbox"
                                    onClick={() => this.setState({...this.state, gamePublic: !this.state.gamePublic})} style={{marginRight: "8px"}}></input>
                        
                                {this.state.gamePublic && <button className='button is-small is-primary' type="button">Public Game</button>}
                                {!this.state.gamePublic && <button className='button is-small is-dark' type="button">Private Game</button>}
                            </div>

                            <div className='column'>
                                {/* Dropdown menu */}
                                <label className='label'>Max Contribution Length: </label>
                                <div class={this.state.dropdownToggle ? "dropdown is-active" : "dropdown"}>
                                    <div class="dropdown-trigger">
                                        <button class="button" type="button" aria-haspopup="true" aria-controls="dropdown-menu3" onClick={() => {this.state.dropdownToggle = this.setState({...this.state, dropdownToggle: !this.state.dropdownToggle})}}>
                                            {this.state.maxLength == "1" && <span>One Word</span>}
                                            {this.state.maxLength == "120" && <span>One Paragraph</span>}
                                            {this.state.maxLength == "150" && <span>One Sentence</span>}
                                            {this.state.maxLength == "280" && <span>One Tweet</span>}
                                            <span class="icon is-small">
                                                <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"/></svg>
                                            </span>
                                        </button>
                                    </div>
                                    <div class="dropdown-menu" id="dropdown-menu3" role="menu">
                                        <div class="dropdown-content">
                                            <option className={this.state.maxLength === "1" ? "dropdown-item is-active" : "dropdown-item"} value="one-word" onClick={this.toggleStoryLength} selected>One Word</option>
                                            <option className={this.state.maxLength === "150" ? "dropdown-item is-active" : "dropdown-item"}  value="one-sentence" onClick={this.toggleStoryLength}>One Sentence</option>
                                            <option className={this.state.maxLength === "120" ? "dropdown-item is-active" : "dropdown-item"}  value="one-paragraph" onClick={this.toggleStoryLength}>One Paragraph</option>
                                            <option className={this.state.maxLength === "280" ? "dropdown-item is-active" : "dropdown-item"}  value="tweet-length" onClick={this.toggleStoryLength}>Tweet Length</option>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='column'>
                                <label className="label">Game Code: </label>
                                <input className="input" type="text" readOnly value={this.state.gameCode}/>
                            </div>

                            
                        </div>

                        <div className='column'>
                            <button className="button is-info" onClick={this.createGame}>
                                Create Story
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            </section>
        );
    }
}

export default CreateNewGamePage;

