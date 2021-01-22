import React from "react"
import Signup from "./AuthPages/Signup";
import Login from "./AuthPages/Login"
//import Home from "../../../hm/Home"
import HomePage from "./HomePage/HomePage.js"
import {AuthProvider} from "../contexts/AuthContext.js"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

function App() {
  return (
  <Router>
  <AuthProvider>
        <div>
            <Switch>
             <Route path="/" component={HomePage} exact/>
             <Route path="/signup" component={Signup}/>
             <Route path="/login" component={Login}/>
            <Route component={Error}/>
           </Switch>
        </div> 
  </AuthProvider>
  </Router>
  )
}

export default App;
