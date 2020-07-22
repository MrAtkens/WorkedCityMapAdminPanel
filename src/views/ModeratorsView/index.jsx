import React, {useEffect, useContext} from 'react';
import { observer } from 'mobx-react'

import { ModeratorStoreContext } from 'store'
import { ModeratorsTable, AddModeratorDialog, EditModeratorDialog } from 'containers'
import { Loader } from 'components'

import './style.scss'

const ModeratorsView = observer(() => {

    const moderatorsStore = useContext(ModeratorStoreContext)

    useEffect(() => {
       if(moderatorsStore.isModeratorsNotGet)
        moderatorsStore.getModerators()
      }, [moderatorsStore])
      
    if(moderatorsStore.showModeratorNot){
      return(<Loader/>)
    }
    else{
        return(
          <div className="table">
            <ModeratorsTable />
            <AddModeratorDialog />
            <EditModeratorDialog />
          </div>
        )
    }
  }
)

export default ModeratorsView