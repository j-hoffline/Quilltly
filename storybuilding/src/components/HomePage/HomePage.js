import React from 'react';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>  
                <div class="title">
                    <h1>Story Builder App</h1>
                    <h2>Relax and play with friends at leisure</h2>
                    <p> put some fancy explanation to it </p>
                </div>

                <section class = "homepage-main">
                    <div class = "new-game">
                    <button type = "submit"><a href = "public-stories-page.html"> Start New game </a></button>
                    <form action=".. fill it later .." method="get"> {//if we receive sensitive data, use post
    }
                        <h1> It all starts... with one word </h1>
                        <input name = "selection" id = "private" type = "radio" />
                        <label for = "private"> Private </label>
                        <input name = "selection" id = "public" type = "radio" />
                        <label for = "public"> Public </label>
                        <input name = "selection" id = "max-players" type = "radio" />
                        <label for = "max-players"> Max Players </label>
                    </form> <br />
                    <button type = "submit"><a href = "#" target = "_self"> Play with Friends </a></button>
                    <button type = "submit"><a href = "#" target = "_self"> Browse </a></button>
                    </div>
                </section>

          </div>
        );
    }
}

export default HomePage;