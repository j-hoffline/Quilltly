// import './App.css';
import './bulma/css/bulma.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {auth} from './components/firebase';
import HomePage from './components/HomePage/HomePage';
import AboutPage from './components/AboutPage/AboutPage';
import Login from './components/AuthPages/Login';
import SignUp from './components/AuthPages/Signup';
import PublicStoriesPage from './components/PublicStoriesPage/PublicStoriesPage';
import AddToStoryPage from './components/AddToStoryPage/AddToStoryPage';
import SearchGame from './components/SearchGame/SearchGame';
import Dashboard from './components/Dashboard/Dashboard';
import Settings from './components/AuthPages/Settings';
import CreateNewGamePage from './components/CreateNewGamePage/CreateNewGamePage';
import StoryView from './components/StoryView/StoryView';


function App() {

  // auth.onAuthStateChanged(function(user) {
  //   //Using setTimeout to delay the redirection of the user after login or signup.
  //   //This fixed the database entry being interrupted by the redirect while maintaining a global auth state
  //   //setTimeout(() => {}, 1000)
  //     if (user) {
  //       // User is signed in and if not already on the dashboard, should be redirected there
  //       if (window.location.href !== "http://localhost:3000/dashboard") {
  //         window.location.replace("/dashboard");
  //         return;
  //       }
  //     } else {
  //       //User is not signed in and should only be directed towards homepage
  //       if (window.location.href !== "http://localhost:3000/") {
  //         window.location.replace("/");
  //       }
  //     }    
  // });

   const history = createBrowserHistory();

    return (
      <div>
        <Router history={history}>
          <Route path="/" exact component={HomePage} />
          <Route path="/about" exact component={AboutPage} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/public" exact component={PublicStoriesPage}/>
          <Route path="/create-new-game" exact component={CreateNewGamePage}/>
          <Route path="/settings" exact component={Settings}/>
          <Route path="/add-to-story" exact component={AddToStoryPage}/>
          <Route path="/search-success" exact component={SearchGame} />
          <Route path="/story-view" exact component={StoryView} />
        </Router>
      </div>
    );
  }


export default App;
