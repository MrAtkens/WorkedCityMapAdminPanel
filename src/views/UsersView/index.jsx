import React, {useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { observer } from 'mobx-react'

import { UsersStoreContext } from 'store'
import { UsersTable } from 'containers'
import { Loader } from 'components'

const useStyles = makeStyles((theme) => ({
  table:{
    padding: theme.spacing(3)
  }
}));

const UsersView = observer(() => {
    const classes = useStyles();
    const usersStore = useContext(UsersStoreContext)

    useEffect(() => {
       if(usersStore.isUsersNotGet)
       usersStore.getUsers()
      }, [])
      
      return(
        <div>
        <Loader status={usersStore.isUsersNotGet}/>
          {usersStore.isUsersNotGet ? (null) : (
            <div className={classes.table}>
              <UsersTable />
            </div>
          )}
        </div>
      )
  }
)

export default UsersView