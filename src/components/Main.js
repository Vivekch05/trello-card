import React, { Component } from 'react'
import {Route, Switch} from 'react-router-dom';
import LandingPage from './LandingPage';


export default class Main extends Component {
    render() {
        return (
           <Switch>
               <Route exact path="/" component={LandingPage} />
           </Switch>
        )
    }
}
