import React from 'react';
import {Link} from 'react-router-dom';
import BackArrowOutline from './images/iconmonstr-angel-left-circle-thin.svg';
import QuillCircle from './images/quill-circle.png';
import TimelineBlip from './images/iconmonstr-circle-2.svg';

class GameCard extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.gameInfo.focused);
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
            focused: this.props.gameInfo.focused || false,
            synopsisToggle: true,
            wordByWordToggle: false,
            addToStoryToggle: false,
        }

        if (this.props.gameInfo.focused) {
            setTimeout(() => this.focusGame, 500);
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
        return(<>

<div class="card" style={{margin: "2%"}}>
  <header class="card-header">
    <p class="card-header-title">
        {this.state.title}
    </p>
    <button class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </header>
  <div class="card-content">
    <div class="content">
        {this.state.preview}
      <div className="columns">
        <div className='column'>
        <div style={{height: "50%"}}></div>
        {this.state.public ? 
            <button className='button is-primary' style={{margin: "1%"}}>
                <svg fill="white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1 17l-5-5.299 1.399-1.43 3.574 3.736 6.572-7.007 1.455 1.403-8 8.597z"/></svg>
                <div style={{width:"8px"}}></div>
                Public Game
            </button> : 
            <button className='button is-danger' style={{margin: "1%"}}>
                <svg fill="white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.971 0h-9.942l-7.029 7.029v9.941l7.029 7.03h9.941l7.03-7.029v-9.942l-7.029-7.029zm.932 11.667c-.127.328-1.695 3.888-2.096 4.786-.42.941-1.239 1.881-2.751 1.881h-2.627c-1.592-.001-2.429-.945-2.429-2.597v-7.208c0-.956 1.317-.908 1.317-.044v3.16c0 .26.477.259.477 0v-5.078c0-.982 1.472-.957 1.472 0v4.795c0 .264.442.252.442-.005v-5.628c0-.957 1.458-.984 1.458 0l.001 5.692c0 .254.459.261.459 0v-4.78c0-.905 1.596-.933 1.596 0v5.417c0 .331.327.384.45.131.118-.24.605-1.315.613-1.327.489-1.029 2.127-.404 1.618.805z"/></svg>
                <div style={{width:"8px"}}></div>
                Invite Only
            </button>}
            {this.state.open ? 
                <button className='button is-primary' style={{margin: "1%"}}>
                    <svg fill="white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1 17l-5-5.299 1.399-1.43 3.574 3.736 6.572-7.007 1.455 1.403-8 8.597z"/></svg>
                    <div style={{width:"8px"}}></div>
                    Story is Open
                </button> : 
                <button className='button is-danger' style={{margin: "1%"}}>
                    <svg fill="white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.971 0h-9.942l-7.029 7.029v9.941l7.029 7.03h9.941l7.03-7.029v-9.942l-7.029-7.029zm.932 11.667c-.127.328-1.695 3.888-2.096 4.786-.42.941-1.239 1.881-2.751 1.881h-2.627c-1.592-.001-2.429-.945-2.429-2.597v-7.208c0-.956 1.317-.908 1.317-.044v3.16c0 .26.477.259.477 0v-5.078c0-.982 1.472-.957 1.472 0v4.795c0 .264.442.252.442-.005v-5.628c0-.957 1.458-.984 1.458 0l.001 5.692c0 .254.459.261.459 0v-4.78c0-.905 1.596-.933 1.596 0v5.417c0 .331.327.384.45.131.118-.24.605-1.315.613-1.327.489-1.029 2.127-.404 1.618.805z"/></svg>
                    <div style={{width:"8px"}}></div>
                    Story is Closed
                </button>}
        </div>

                <div className='column'></div>

                <div className='column'>
                    <label className="label">Game Code: </label>
                    <input className="input" type="text" readOnly value={this.state.id}/>
                </div>
            </div>
    </div>
</div>
  <footer class="card-footer">
    <a class="card-footer-item">
        <p>Created: {this.state.dateStarted}</p>
    </a>

    <Link to={{
            pathname: "/story-view",
            state: this.state
        }} className="card-footer-item">
            <svg fill="blue" className="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.282 4.494c-.481-.957-1.242-1.558-2.19-1.489-1.006.082-1.843.869-2.08 1.958-.06.27.111.537.381.595.271.057.537-.112.596-.381.166-.759.715-1.137 1.186-1.175.518-.051.91.287 1.179.86.795 1.694 3.319 6.902 4.259 9.186 0 0-1.212-3.049-4.616-3.049-2.366 0-4.338 1.648-4.856 3.857-.36-.261-.779-.393-1.169-.393-.381 0-.776.121-1.118.36-.534-2.191-2.495-3.823-4.849-3.823-3.404 0-4.616 3.049-4.616 3.049.939-2.284 3.464-7.492 4.259-9.186.269-.573.661-.911 1.179-.86.471.038 1.02.417 1.186 1.175.057.269.323.438.594.381.27-.059.44-.325.381-.595-.237-1.089-1.074-1.876-2.08-1.958-.948-.069-1.709.531-2.19 1.488-.989 1.964-4.718 9.585-4.718 10.485 0 .513.4 1.021 1.005 1.021 0 2.762 2.238 5 5 5 2.047 0 3.792-1.235 4.56-2.999.514-1.183.311-2.537 1.405-2.537 1.124 0 .968 1.39 1.469 2.54.767 1.762 2.51 2.996 4.556 2.996 2.762 0 5-2.238 5-5 .605 0 1.005-.508 1.005-1.021 0-.9-3.729-8.521-4.718-10.485zm-13.277 15.506c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm11.99 0c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm-.995-6.939c.198-.036.401-.061.609-.061 1.872 0 3.391 1.518 3.391 3.39l-.028.283c-.762-1.692-2.201-3.01-3.972-3.612zm-13.972 3.612l-.028-.283c0-1.872 1.519-3.39 3.391-3.39.208 0 .411.025.609.061-1.771.602-3.21 1.92-3.972 3.612z"/></svg>
            <div style={{width:"8px"}}></div>
            View Story
    </Link>

    {this.state.open ? 
        <Link to={{
            pathname: "/add-to-story",
            state: this.state
        }} className="card-footer-item">+ Add to Story</Link>
    :
        <p class="card-footer-item">Story is Closed</p>
    }
  </footer>
</div>
            </>
        );
    }
}

export default GameCard;