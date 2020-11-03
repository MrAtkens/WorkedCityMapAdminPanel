import React, {useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { observer } from 'mobx-react'

import { ModeratorStoreContext } from 'store'
import { ModeratorsTable, AddModeratorDialog, EditModeratorDialog } from 'containers'
import { Loader } from 'components'

const useStyles = makeStyles((theme) => ({
  table:{
    padding: theme.spacing(3)
  }
}));

const ModeratorsView = observer(() => {
    const classes = useStyles();
    const moderatorsStore = useContext(ModeratorStoreContext)

    useEffect(() => {
       if(moderatorsStore.isModeratorsNotGet)
        moderatorsStore.getModerators()
      }, [moderatorsStore])
      
        return(
          <div>
          <Loader status={moderatorsStore.isModeratorsNotGet}/>
            {moderatorsStore.isModeratorsNotGet ? (null) : (
            <div className={classes.table}>
              <ModeratorsTable />
              <AddModeratorDialog />
              <EditModeratorDialog />
            </div>
            )}
          </div>
        )
  }
)

export default ModeratorsView