import React from 'react';
import {
    BrowserRouter as Router, //alias (nickname)
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Login from '../views/Login';
import Home from '../views/home';
import AddCompany from '../views/addCompany';
import CompanyDetails from '../views/CompanyDetails';
import ShowCompanyDetails from '../views/ShowCompanyDetails';
import Token from '../views/Token';
import NormalUser from '../views/NormalUser';


export default function MainRouter ({ isLoggedIn, isLoading }) {
    if (isLoading) return <img width="150" style={{marginLeft:'45%',marginTop:'15%'}} src='https://cdn.lowgif.com/small/ee5eaba393614b5e-pehliseedhi-suitable-candidate-suitable-job.gif' /> 
    console.log('window.location.pathname***', window.location.pathname)
    const currentPath = window.location.pathname.   length === 1 ? 'Home' : window.location.pathname

    return (
        <Router>
            <div>
                {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/" exact>
                        {isLoggedIn ? <Redirect to={currentPath} /> : <Login />}
                    </Route>
                    <Route path="/home">
                        {AuthChecker(isLoggedIn, <Home />)}
                    </Route>
                    <Route path="/CompanyDetails">
                        {AuthChecker(isLoggedIn, <CompanyDetails />)}
                    </Route>
                    <Route path="/addCompany">
                        {AuthChecker(isLoggedIn, <AddCompany />)}
                    </Route>
                    <Route path="/ShowCompanyDetails/:companyId">
                       {AuthChecker(isLoggedIn, <ShowCompanyDetails />)}
                    </Route>
                    <Route path="/Token">
                       {AuthChecker(isLoggedIn, <Token />)}
                    </Route>
                    <Route path="/NormalUser">
                       {AuthChecker(isLoggedIn, <NormalUser />)}
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

function AuthChecker(isLoggedIn, component) {
    return isLoggedIn ? component : <Redirect to='/' />
}