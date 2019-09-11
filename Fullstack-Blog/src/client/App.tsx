import * as React from 'react';
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home';

class App extends React.Component {
    render() {
        return (
            <Router>
            <div className="nav-container router">
                <nav className="navbar navbar-expand-sm navbar-light bg-warning font-weight-bold">
                <ul className="navbar-nav mr-auto">
                    <li><Link to={'/'} className="nav-link"> Blog </Link></li>             
                </ul>
                <ul className="navbar-nav navbar-right">
                    <li><Link to={'/'} className="nav-link"> Blogs </Link></li>
                    <li><Link to={'/blog/add'} className="nav-link"> Post Blog </Link></li> 
                </ul>
                </nav>

                <Switch>
                    <Route exact path='/' component={Home} />
                </Switch>
            </div>        
            </Router>   
        )
    }
}

export default App;