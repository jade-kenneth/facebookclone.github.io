import React from 'react';
// react router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Profile from './Profile';

const ReactRouterSetup = () => {
    return (
    <Router>
        
        <Switch>
        <Route exact path='/'>
            <Login />
        </Route>
        <Route path='/user/:id' children={<Profile/>}/>
        
        {/* <Route path='/about'>
            <About />
        </Route>
        <Route path='/people'>
            <People />
        </Route>
        <Route path='/person/:id' children={<Person />}></Route>
        <Route path='*'>
            <Error />
        </Route> */}
        </Switch>
    </Router>
    );
};

export default ReactRouterSetup;