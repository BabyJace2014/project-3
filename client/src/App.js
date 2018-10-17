import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Club from './pages/Club';
import Landing from './pages/Landing';
import Logout from './components/Logout';
import Profile from './pages/Profile';

class App extends Component {
    state = {
        isAuthorized: false,
        user: {},
        club: {}
    }
    
    appAuth = ( isAuth, authUser ) => {
        this.setState( {isAuthorized: isAuth, user: authUser} )
    }

    onUserUpdated = ( updatedUser ) => {
        this.setState({ user: updatedUser });
    }

    setClub = ( club ) => {
        this.setState({club: club});
    }

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route  exact path="/"
                                render={() => <Landing appAuth={this.appAuth} />}
                        />

                        <Route  path="/club"
                                render={() => this.state.isAuthorized?
                                        <Club user={this.state.user}
                                              club={this.state.club} />
                                    :
                                        <Redirect to="/" />}
                        />

                        <Route  exact path="/profile"
                                render={() => this.state.isAuthorized?
                                        <Profile user={this.state.user}
                                                 userUpdated={this.onUserUpdated}
                                                 setClub={this.setClub} />
                                    :
                                        <Redirect to="/" />}
                        />

                        <Route  exact path="/logout"
                                render={() => <Logout appAuth={this.appAuth} />}
                        />

                        <Route  path="*"
                                render={() => <Redirect to="/" />}
                        />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;