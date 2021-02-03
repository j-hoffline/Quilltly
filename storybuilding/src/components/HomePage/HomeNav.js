import React from 'react';

class HomeNav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <nav>
            <a className="nav-link" href="#">About</a>
            <a className="nav-link" href="#">FAQ</a>
            <a className="nav-link" href="#">Developers</a>
        </nav>
        );
    }
}

export default HomeNav;