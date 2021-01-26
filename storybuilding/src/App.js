import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import HomePage from './components/HomePage/HomePage';
import Login from './components/AuthPages/Login';
import SignUp from './components/AuthPages/Signup';
import PublicStoriesPage from './components/PublicStoriesPage/PublicStoriesPage';
import Settings from './components/AuthPages/Settings';


function App() {
  console.log(process.env.REACT_APP_FIREBASE_APP_KEY);
   const history = createBrowserHistory();

    return (
      <div>
        <Router history={history}>
                <Route path="/" exact component={HomePage} />
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={SignUp} />
                <Route path="/public" exact component={PublicStoriesPage}/>
                <Route path="/settings" exact component={Settings}/>
        </Router>
      </div>
    );
  }
  

export default App;
