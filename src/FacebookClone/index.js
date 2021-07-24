import React, { lazy, Suspense } from 'react';
// react router

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserContextProvider } from './contexts/UserContext';


const Login = lazy(() => import('./Login'));
const Profile = lazy(() => import('./Profile'));

const ReactRouterSetup = React.memo(() => {


    
    return (
    <Router>
        
        
        <UserContextProvider>
            <Switch>
                <Suspense fallback={<div>LOADING...</div>}>
                    <Route exact path='/facebook.com' component={Login}/>
                    <Route path='/facebook.com/:email/' component={Profile} />
                </Suspense>
            </Switch>
        </UserContextProvider>
        
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
       
    </Router>
    );
});

export default ReactRouterSetup;