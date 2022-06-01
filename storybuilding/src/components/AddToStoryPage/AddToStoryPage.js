import React from 'react';
import {auth, database} from '../firebase';
import {Alert} from 'react-bootstrap';

class AddToStoryPage extends React.Component {
    constructor(props) {
        super(props);
        //Props are passed from GameCard which is currently identical
        //to the component's state. Only necessary things are included
        //for this component's state.

        this.state = {
            id: this.props.location.state.id,
            authorID: this.props.location.state.author,
            title: this.props.location.state.title,
            contentArr: this.props.location.state.contentArr,
            contentArrStr: this.props.location.state.content,
            contentStr: this.props.location.state.contentStr,
            gameCode: this.props.location.state.id,
            dateStarted: this.props.location.state.dateStarted,
            maxLength: this.props.location.state.length,
            open: this.props.location.state.open,
            public: this.props.location.state.public,
            newContribution: "",
            error: ""
        }
        
        this.addToStory = this.addToStory.bind(this);
        this.getCurrLength = this.getCurrLength.bind(this);
    }

    addToStory() {
        //Assert contribution matches story length
        let splitStr = ""; //String to determine splitting of string
        let maxLength = "" //String to pass along max length 
        switch(this.state.maxLength) {
            case '1': //one Word - word limit
                if (this.state.newContribution.trim().split(" ").length !== 1) {return this.setState({...this.state, error: "Story introduction does not match set max length."})}
                splitStr = " "; //Split by space
                maxLength = "1" //1 word limit
            case '150': //one sentence - char limit
                if (this.state.newContribution.trim().length > 150) {return this.setState({...this.state, error: "Story introduction does not match set max length. (Max: 150 characters)"})}
                splitStr = "."; //Split by sentence
                maxLength = "150" //150 character limit
            case '120': //One paragraph - word limit
                if (this.state.newContribution.trim().split(" ").length > 120) {return this.setState({...this.state, error: "Story introduction does not match set max length. (Max: 120 words)"})}
                splitStr = "\n"; //Split by paragraph
                maxLength = "120" //120 word limit
            case '280': //tweet length - char limit
                if (this.state.newContribution.trim().length > 280) {return this.setState({...this.state, error: "Story introduction does not match set max length. (Max: 280 words)"})}
                //No split str, split by padding spaces??
                maxLength = "280" //Character limit
        }

        let newContentArr = []
        if (splitStr) {
            newContentArr = this.state.newContribution.split(splitStr); //Split story intro into list based on splitStr
        } else {
            newContentArr = [this.state.newContribution];
        }
        
        let contentStr = `${this.state.contentArrStr.substring(0, this.state.contentArrStr.length - 1)}, `; //Begin string concatenation
        
        for (let i in newContentArr) {
            if (i == newContentArr.length - 1) {
                contentStr += `'${newContentArr[i]}']`;
            } else { contentStr += `'${newContentArr[i]}', ` }
        }
        console.log(contentStr);

        database.ref('games/' + this.state.gameCode).set(JSON.parse(
            JSON.stringify({
            author: this.state.authorID,
            id: this.state.id,
            title: this.state.title,
            content: contentStr,
            dateStarted: this.state.dateStarted,
            gameCode: this.state.gameCode,
            length: this.state.maxLength,
            open: this.state.open,
            public: this.state.public,
        }))).then(() => {
            console.log("Game successfully updated!");
            window.location.replace('/dashboard');
        })
        .catch((error) => this.setState({...this.state, error: error}));
    }

    //Updates storyIntro length counter
    getCurrLength() { 
        let currCountElement = document.getElementById("counter"); //Counter element on page

        //Update element on page
        if(this.state.maxLength === '1' || this.state.maxLength === '150') { //Count by words
            currCountElement.innerHTML = this.state.newContribution.trim().split(" ").length;
        }
        if(this.state.maxLength === '120' || this.state.maxLength === '280') { //Count by characters
            currCountElement = this.state.newContribution.trim().length;
        }
    }

    render() {
        return(
            <section className="container is-fluid" style={{backgroundColor: "#f0f0f0", minHeight: "100vh"}}>
            <div style={{textAlign: "center", fontFamily: "Poppins"}}>
                <h1 className='is-size-1'>{this.state.title}</h1>
                {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
                <div className="add-to-story-div">
                    <textarea className="textarea" placeholder="Write here..." 
                        onChange={(event) => this.setState({...this.state, newContribution: event.target.value})}
                        rows="7" cols="80">
                    </textarea> <br/>
                    <textarea key="preview" id="preview-text" className="textarea" rows="7" cols="80" value={this.state.contentStr}>
                    </textarea> <br />
                    <div id ="counter-div"> Submission Length:  
                        <span id="counter">{`\t${this.state.newContribution.length}`}</span> / <span id="maxCounter">{this.state.maxLength}</span>
                    </div>
                    <button className='button' style={{margin: "1%"}}
                        onClick={() => {window.location.replace("/dashboard")}}>Back</button>
                    <button className="button is-warning" onClick={() => {
                        document.getElementById("preview-text").value = `${this.state.contentStr} \t${this.state.newContribution}`
                    }} style={{margin: "1%"}}>Preview</button>
                    <button className="button is-link" onClick={this.addToStory} style={{margin: "1%"}}>Add to story</button>
                </div>
            </div>
            </section>
        );
    }
}

export default AddToStoryPage;