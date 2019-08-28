import * as React from 'react';
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import AddChirp from './components/AddChirp';
import Admin from './components/Admin';
import Mentions from './components/Mentions';

class App extends React.Component {
    render() {
        return (
        <Router>
            <div className="nav-container router">
                <nav className="navbar navbar-expand-sm navbar-light bg-deep-teal font-weight-bold">
                <ul className="navbar-nav mr-auto">
                    <li><Link to={'/'} className="nav-link"> Chirper </Link></li>             
                </ul>
                <ul className="navbar-nav navbar-right">
                    <li><Link to={'/'} className="nav-link"> Chirps </Link></li>
                    <li><Link to={'/chirp/add'} className="nav-link"> Add Chirp </Link></li> 
                    {this.showLogout()}
                   </ul>
                </nav>

                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/chirp/add' component={AddChirp} />
                    <Route path='/admin/:id' component={Admin} />
                    <Route path='/mentions/:username' component={Mentions} />
                </Switch>
            </div>        
        </Router>   
        )
    }

    // don't show logout button if logged in
    showLogout() {
        if (localStorage.getItem('username')) { 
            // if clicked remove all local data and reload page to show logout button
            return (<li><Link to={'/'} className="nav-link" onClick={() => {localStorage.removeItem('username'); localStorage.removeItem('id'); window.location.reload();}}> Logout </Link></li>);
        } else return <></>
    }
}

export default App;