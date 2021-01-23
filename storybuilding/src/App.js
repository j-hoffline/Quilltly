
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import firebase from 'firebase/app';
import 'firebase/auth';

import 'firebase/firestore';
import Homepage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import PublicStoriesPage from './components/PublicStoriesPage/PublicStoriesPage';


function App() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: "storybuilding-app.firebaseapp.com",
      projectId: "storybuilding-app",
      storageBucket: "storybuilding-app.appspot.com",
      messagingSenderId: "80034550315",
      appId: process.env.REACT_APP_FIREBASE_APP_ID
    }

    if (!firebase.apps.length) {
      //Initialize Firebase
      firebase.initializeApp(firebaseConfig);
   } else {
      firebase.app(); // if already initialized, use that one
   }

   const history = createBrowserHistory();

    return (

      <Router history={history}>
        <div className="App">
          <header className="App-header">
            <Route path="/" exact component={Homepage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/public" exact component={PublicStoriesPage}/>
          </header>
        </div>
      </Router>
    );
  }

export default App;
