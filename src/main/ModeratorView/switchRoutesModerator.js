import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import routes from './routes'

const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        if (prop.layout === "/") {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
        }
        return null;
      })}
        <Redirect from="/" to="/map" />
    </Switch>
  );

export default switchRoutes 