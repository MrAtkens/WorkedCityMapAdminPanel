import React, {useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router-dom"

import { observer } from 'mobx-react'

import { PinStoreContext } from 'store'
import { PinViewCard } from 'containers'
import { Loader } from 'components'

const useStyles = makeStyles((theme) => ({
  table:{
    padding: theme.spacing(1)
  }
}));

const PinView = observer(() => {
    const {id} = useParams();
    const classes = useStyles();
    const pinStore = useContext(PinStoreContext)

    useEffect(() => {
    if(pinStore.isPinNotLoaded){
        pinStore.setIsPinLoaded(false)
        pinStore.getMapPinById(id)
        pinStore.setPinId(null)
    }
    }, []);
      
        return(
          <div>
          <Loader status={pinStore.isPinNotLoaded}/>
            {pinStore.isPinNotLoaded ? (null) : (
              <div>
                <PinViewCard />
              </div>
            )}
          </div>
        )
  }
)

export default PinView