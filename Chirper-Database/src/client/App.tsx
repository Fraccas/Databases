import * as React from 'react';
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import AddChirp from './components/AddChirp';
import Admin from './components/Admin';

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
                </Switch>
            </div>        
        </Router>   
        )
    }

    showLogout() {
        if (localStorage.getItem('username')) { 
            return (<li><Link to={'/'} className="nav-link" onClick={() => {localStorage.removeItem('username')}}> Logout </Link></li>);
        } else return <></>
    }
}

export default App;