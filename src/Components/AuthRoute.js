import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import UserContext from '../UserContext';

export default class AuthRoute extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);

    const { children, ...rest } = props;
    this.state = {
      component: children,
      restProps: { ...rest },
    }
  }

  render() {
    const { isAuthenticated } = this.context;
    console.log(this.state.component);
    console.log(this.state.restProps);
    const { pathname, search } = this.state.restProps.location;
    const component = this.state.component;

    return (
      <Route {...this.state.restProps}>
        {isAuthenticated ? component :
          (<Redirect to={
            `/login?redirect=${pathname}${search}`
          } />)}
      </Route>
    );
  }
}


