import React, { useContext } from 'react';
import { observer } from 'mobx-react'
import {Map, Marker, GoogleApiWrapper } from 'google-maps-react';

import { ModerationMapStoreContext, PinStoreContext }  from 'store'
import './style.scss'
import { Loader } from 'components';

const LoadingContainer = (props) => (
    <Loader status={true}/>
)

const ModerationMap = observer((props) => {
    const moderationMapStore = useContext(ModerationMapStoreContext)
    const pinStore = useContext(PinStoreContext)
    console.log(moderationMapStore.moderationMapPins)
    const handleMarkerOnClick = (id) => {
        pinStore.setPinId(id)
    }
    return(
        <div>
            <Map google={props.google} zoom={moderationMapStore.zoom}
                containerStyle={{position: 'relative', width: '100%', height: '93vh'}}
                initialCenter={moderationMapStore.centerPositions}
                 streetViewControl={false}
                 fullscreenControl={false}>
                {moderationMapStore.moderationMapPins.map(value => {
                    return (
                        <Marker key={value.id} name={value.name} position={{ lat: value.lat, lng: value.lng }}
                                onClick={(event) => handleMarkerOnClick(value.id)}/>
                    )
                })}
            </Map>
        </div>
    )
 }
)


export default GoogleApiWrapper({
    apiKey: ("AIzaSyAzF9M_VxXxFOQSZOWcHpiShoni_g6yi4E"),
    language: 'kz',
    LoadingContainer: LoadingContainer
})(ModerationMap)