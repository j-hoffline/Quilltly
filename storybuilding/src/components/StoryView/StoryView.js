import React from 'react';
import {useLocation} from 'react-router-dom';

function StoryView(props) {
    const location = useLocation();
    console.log(location.state);

    
    return(
        <section className="container is-fluid" style={{backgroundColor: "#f0f0f0", minHeight: "100vh"}}>
            <button className='button' style={{margin: "1%"}}
                            onClick={() => {window.location.replace("/dashboard")}}>
                    ᐊ
                    <div style={{width: "8px"}}></div>
                    Back
                </button>
                <div className='has-text-centered block'>
            <h1 className='is-size-1'>{location.state.title}</h1>
            <small>{location.state.dateStarted}</small>
            </div>
            
            <div className='columns'>
                <div className='column'>
                
                <label className="label">Game Code: </label>
                    <input className="input" type="text" readOnly value={location.state.id}/>

                </div>

                <div className='column'></div>
                
                <div className='column has-text-centered'>
                {location.state.open ? 
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

                {location.state.public ? 
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
            </div>

            </div>
            {location.state.contentArr.map((word) => {
                return(<div className='box'>{word}</div>)
            })}
        </section>
    );
}

export default StoryView;