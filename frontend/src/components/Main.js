import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import JobPost from './JobPost/JobPost';
const Main = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path = '/' component={LandingPage}/>
            <Route exact path="/jobpost" component={JobPost}/>

        </Switch>
    </BrowserRouter>
)

export default Main;