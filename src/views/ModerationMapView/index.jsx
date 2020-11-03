import React, {useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { observer } from 'mobx-react'

import { ModerationMapStoreContext } from 'store'
import { ModerationMap } from 'containers'
import { Loader } from 'components'

const useStyles = makeStyles((theme) => ({
  table:{
    padding: theme.spacing(1)
  }
}));

const ModerationMapView = observer(() => {
    const classes = useStyles();
    const mapStore = useContext(ModerationMapStoreContext)
    useEffect(() => {
      if(mapStore.isModerationMapNotLoaded)
        mapStore.getModerationMapsPin()
      }, [])
      
        return(
          <div>
          <Loader status={mapStore.isModerationMapNotLoaded}/>
            {mapStore.isModerationMapNotLoaded ? (null) : (
              <div>
                <ModerationMap />
              </div>
            )}
          </div>
        )
  }
)

export default ModerationMapView