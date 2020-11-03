import React, {useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { observer } from 'mobx-react'

import { PublicMapStoreContext } from 'store'
import { PublicMap, CreateDialogAccept } from 'containers'
import { Loader } from 'components'

const useStyles = makeStyles((theme) => ({
  table:{
    padding: theme.spacing(1)
  }
}));

const PublicMapView = observer(() => {
    const classes = useStyles();
    const mapStore = useContext(PublicMapStoreContext)
  
    useEffect(() => {
      if(mapStore.isMapNotLoaded)
        mapStore.getPublicMapsPin()
      }, [])
      
        return(
          <div>
          <Loader status={mapStore.isMapNotLoaded}/>
            {mapStore.isMapNotLoaded ? (null) : (
              <div>
                <PublicMap />
                <CreateDialogAccept/>
              </div>
            )}
          </div>
        )
  }
)

export default PublicMapView