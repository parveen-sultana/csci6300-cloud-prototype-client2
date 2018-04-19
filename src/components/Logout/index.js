import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Auth from '../../modules/Auth';
import axios from 'axios';
import { S1_URL_LOGOUT, S2_URL_LOGOUT, BEARER_HEADER } from '../../constants';


class Logout extends Component {

  componentDidMount() {
    // deauthenticate user
    Auth.deauthenticateUser();
    // change the current URL to / after logout
    
    axios.get(S1_URL_LOGOUT,{
      BEARER_HEADER
    })
    .then((response) => {
    })
    .catch((error) => {
      console.log(error);
    });
    axios.get(S2_URL_LOGOUT,{
      BEARER_HEADER
    })
    .then((response) => {
    })
    .catch((error) => {
      console.log(error);
    });
    this.props.history.push('/');
  }

  render() {
    
    return (
      <div>
        <p>Logging out...</p>
      </div>
    )
  }
}

Logout.contextTypes = {
  router: PropTypes.object.isRequired
};

export default Logout;
