import React from 'react';

class PublicStoriesPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>  
                    <section class = "story-page">
        <div class = "new-story-1">
          <form action=".. fill it later .." method="get"> 
            <h1> Popcorn </h1>

          </form><br />
          <button type = "submit"> Join game </button>
        </div>
        
        <div class = "new-story-2">
          <form action=".. fill it later .." method="get">
            <h1> Caraousel </h1>
            
          </form><br />
          <button type = "submit"> Join game </button>
        </div>
        
        <div class = "new-story-3">
          <form action=".. fill it later .." method="get">
            <h1> Caraousel </h1>
            
          </form><br />
          <button type = "submit"> Join game </button>
        </div>
      </section>

          </div>
        );
    }
}

export default PublicStoriesPage;