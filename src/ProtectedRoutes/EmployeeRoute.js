import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { OPERATIONS, HR, IT, SALES } from '../constants/Roles';
import { RootContext } from '../contextApi/index';

export default ({ children, ...routeProps }) => {

  const { user } = useContext(RootContext);

  return (
    <Route
      {...routeProps}
      render={() => (user?.role === OPERATIONS || HR || IT || SALES ?
        (
          children
        ) :
        <Redirect to='/login' />)
      }
    />
  );
};