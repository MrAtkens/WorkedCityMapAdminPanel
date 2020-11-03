import React, {useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { observer } from 'mobx-react'

import { AdminStoreContext } from 'store'
import { AdminsTable, AddAdminDialog, EditAdminDialog } from 'containers'
import { Loader } from 'components'

const useStyles = makeStyles((theme) => ({
  table:{
    padding: theme.spacing(3)
  }
}));

const AdminsView = observer(() => {
    const classes = useStyles();
    const adminsStore = useContext(AdminStoreContext)

    useEffect(() => {
       if(adminsStore.isAdminsNotGet)
       adminsStore.getAdmins()
      }, [adminsStore])
       
        return(
          <div>
          <Loader status={adminsStore.isAdminsNotGet}/>
            {adminsStore.isAdminsNotGet ? (null) : (
            <div className={classes.table}>
              <AdminsTable />
              <AddAdminDialog />
              <EditAdminDialog />
            </div>
            )}
          </div>
        )
  }
)

export default AdminsView