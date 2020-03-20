import React, { Component } from 'react';
import Auth from './src/screens/Auth';
import LoggedIn from './src/screens/LoggedIn';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      jwt: ''
    };
    this.newJWT = this.newJWT.bind(this);
  }

  newJWT(jwt) {
    this.setState({
      jwt: jwt
    });
  }

  render() {
    if (!this.state.jwt) {
      return <Auth newJWT={this.newJWT} />;
    } else if (this.state.jwt) {
      return <LoggedIn />;
    }
  }
}