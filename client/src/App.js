import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Club from './pages/Club';
import Landing from './pages/Landing';
import Logout from './components/Logout';
import Profile from './pages/Profile';

class App extends Component {
    state = {
        isAuthorized: false,
        user: {}
    }
    
    appAuth = ( isAuth, authUser ) => {
        this.setState( {isAuthorized: isAuth, user: authUser} )
    }

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/club" render={()=>this.state.isAuthorized? <Club user={this.state.user} /> : <Landing/>} />
                        <Route exact path="/profile" render={()=>this.state.isAuthorized? <Profile user={this.state.user} /> : <Landing/>} />
                        <Route exact path="/logout" render={() => <Logout appAuth={this.appAuth} />} />
                        <Route path="*" render={() => <Landing appAuth={this.appAuth} />} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;