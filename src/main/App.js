import React, { useEffect, useContext } from 'react';
import { Route, Router, Switch, BrowserRouter, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history';

import AdminView from './AdminView/AdminView'
import ModeratorView from './ModeratorView/ModeratorView'
import { SystemStoreContext } from 'store'
import { AccesGrid } from 'containers'
import { Role } from 'tools'

const hist = createBrowserHistory();


function App(){

  const systemStore = useContext(SystemStoreContext)

  useEffect(() => {
    if(systemStore.moderator.id === "" && systemStore.admin.id === "" && localStorage.getItem('token') !== null)
      systemStore.getUserData()
    }, [])

  if(systemStore.isAuthorize === false && localStorage.getItem('token') === null){
    return(
      <AccesGrid />
    )
  }
  return (
      <BrowserRouter >
        <Router history={hist} >
          <Switch >
            {systemStore.userRole === Role.Admin ? (<Route path="/" component={AdminView}/>) : (<Route path="/" component={ModeratorView}/>)}
            <Redirect from="/"
              to="/dashboard"/>
          </Switch>
        </Router>

      </BrowserRouter>
    );
  }

export default App;