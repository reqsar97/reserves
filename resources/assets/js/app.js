require("./bootstrap");
import React from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

//Custom components
import Master from "./Master";

render(
    <Router>
        <Route path='/' component={Master}/>
    </Router>
    ,
    document.getElementById("root")
);
