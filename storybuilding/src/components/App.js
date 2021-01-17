import React from "react"
import Signup from "./Signup";
import {AuthProvider} from "../contexts/AuthContext.js"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

function App() {
  return (
  <Router>
  <AuthProvider>
    <Signup />
  </AuthProvider>
  </Router>
  )
}

export default App;
