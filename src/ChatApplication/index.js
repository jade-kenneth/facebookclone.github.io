import React from 'react'
import {BrowserRouter as Route, Switch, Router} from 'react-router-dom';
import Auth from './client/components/Auth/Auth';
const RouterSetup = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Auth}/>
            </Switch>


        </Router>
    )
}

export default RouterSetup
