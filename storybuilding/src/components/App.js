import React from "react"
import Signup from "./Signup";
import Login from "./Login"
import Home from "./Home"
import {AuthProvider} from "../contexts/AuthContext.js"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

function App() {
  return (
  <Router>
  <AuthProvider>
        <div>
            <Switch>
             <Route path="/" component={Home} exact/>
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
