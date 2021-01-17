import React from 'react';

class LoginPage extends React.Component {
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

        <section class = "login">
        <form action=".. fill it later .." method="get"> {//<!-- if we receive sensitive data, use post -->
    }
          <label for = "username"> Username:
            <input name = "login-data" id = "username" type = "text" required />
          </label>
          <label for = "password"> Password:
            <input name = "login-data" id = "password" type = "password" required />
          </label>
          <button type = "submit"> Sign Up </button>
        </form>
      </section>

          </div>
        );
    }
}

export default LoginPage;