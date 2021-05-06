import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from '../OnlineAccSelling/Navbar';
export const ReactRouterSetup = () => {
    return (
        <Router>
            <Navbar/>
            <Switch>
                <Route exact path ="/">

                </Route>
                
            </Switch>
        </Router>
    )
}