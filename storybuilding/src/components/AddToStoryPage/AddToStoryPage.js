import React from 'react';

class AddToStoryPage extends React.Component {
    constructor(props) {
        super(props);
        //Props are passed from GameCard which is currently identical
        //to the component's state. Only necessary things are included
        //for this component's state.

        this.state = {
            id: this.props.location.state.id,
            title: this.props.location.state.title,
            contentArrStr: this.props.location.state.content,
            contentStr: this.props.location.state.contentStr,
            newContribution: ""

        }
        
        console.log(this.props.location.state);
    }

    render() {
        return(
            <div style={{textAlign: "center", fontFamily: "Poppins"}}>
                <h2>{this.state.title}</h2>
                <div className="add-to-story-div">
                    <textarea className="textarea" placeholder="Write here..." 
                        onChange={(event) => this.setState({...this.state, newContribution: event.target.value})}
                        rows="7" cols="80">
                    </textarea> <br/>
                    <textarea className="textarea" rows="7" cols="80">
                        {this.state.contentStr + `\n\t${this.state.newContribution}`}
                    </textarea> <br />
                    <button className="submit-button bubble-button">Add to story</button>
                </div>
            </div>
        );
    }
}

export default AddToStoryPage;