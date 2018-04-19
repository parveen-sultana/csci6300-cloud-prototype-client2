import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import Auth from '../../modules/Auth';
import Navigation from '../Navigation';
import Server1 from '../Server1';
import Server2 from '../Server2';
import Login1 from '../Login1';
import Register1 from '../Register1';
import Login2 from '../Login2';
import Register2 from '../Register2';
import Logout from '../Logout';

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Component {...props} {...rest} />
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const LoggedOutRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    false ? (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    ) : (
      <Component {...props} {...rest} />
    )
  )}/>
)

const PropsRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <Component {...props} {...rest} />
  )}/>
)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
  };

  componentDidMount() {
    // check if user is logged in on refresh
    this.toggleAuthenticateStatus()
  }

  toggleAuthenticateStatus() {
    // check authenticated status and toggle state based on that
    this.setState({ authenticated: Auth.isUserAuthenticated() })
  }
  render() {
    return (
      <div>
        <Router>
          <div>
            <PropsRoute exact path="/" component={Navigation} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
            <PrivateRoute exact path="/server1" component={Server1} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
            <PrivateRoute exact path="/server2" component={Server2} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
            <LoggedOutRoute path="/server1/login" component={Login1} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
            <LoggedOutRoute path="/server1/register" component={Register1} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
            <LoggedOutRoute path="/server2/login" component={Login2} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
            <LoggedOutRoute path="/server2/register" component={Register2} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
            <Route path="/logout" component={Logout}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
