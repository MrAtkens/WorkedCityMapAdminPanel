import React, {useContext} from 'react'
import { observer } from "mobx-react";
import { Route, Switch, Redirect } from 'react-router-dom'
import adminRoutes from './routes/switchRoutesAdmin'
import moderatorRoutes from './routes/switchRoutesModerator'
import { SystemStoreContext } from 'store'
import { Role } from 'tools'

const SwitchRoutes = observer(() =>{
  const systemStore = useContext(SystemStoreContext);
    if(systemStore.userRole === Role.Admin){
      return(
      <Switch>
          {adminRoutes.map((prop, key) => {
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
          <Redirect from="/" to="/dashboard" />
      </Switch>
      )
    }
    else{
      return(
        <Switch>
          {moderatorRoutes.map((prop, key) => {
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
          <Redirect from="/" to="/dashboard" />
      </Switch>
      )
    }
  });

export default SwitchRoutes 