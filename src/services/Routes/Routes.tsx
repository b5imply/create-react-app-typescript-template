import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import routes from './routesPaths';
import App from '../../App';

const Routes: React.FC = () => {
  return (
    <Router basename={process.env.REACT_APP_BASENAME}>
      <Switch>
        <Route exact path={routes.home} component={App} />
      </Switch>
    </Router>
  );
};

export default Routes;
