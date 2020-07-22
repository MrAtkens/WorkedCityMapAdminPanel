import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react'
import { Route, Router, Switch, BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history';

import AdministrationView from './AdministrationView'
import { SystemStoreContext } from 'store'
import { AccesGrid } from 'containers'

const hist = createBrowserHistory();

const App = observer(() => {

  const systemStore = useContext(SystemStoreContext)

  useEffect(() => {
    if(systemStore.showIsUserDontExist){
      systemStore.getUserData()
      }
    }, [])
  if(systemStore.showAuthorize){
    return(
      <AccesGrid />
    )
  }
  else{
    return (
        <BrowserRouter >
          <Router history={hist} >
            <Switch >
              <Route path="/" component={AdministrationView} />
            </Switch>
          </Router>
        </BrowserRouter>
      );  
    }
  })

export default App;