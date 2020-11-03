import React, { useContext } from 'react';
import { Fab, Tooltip } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import { observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import {Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { toastServerError, Role } from 'tools'

import { PublicMapStoreContext, PinCreateContext, SystemStoreContext, PinStoreContext }  from 'store'
import './style.scss'
import { Loader } from 'components';

const LoadingContainer = (props) => (
    <Loader status={true}/>
)

const PublicMap = observer((props) => {
    const publicMapStore = useContext(PublicMapStoreContext)
    const pinCreateStore = useContext(PinCreateContext)
    const systemStore = useContext(SystemStoreContext)
    const pinStore = useContext(PinStoreContext)

    const onMapClick = (mapProps, map, clickEvent) => {
        const geocoder = new mapProps.google.maps.Geocoder();
        const latLngStr = clickEvent.latLng.toString().split(',', 2)
        const latLng = {lat: parseFloat(latLngStr[0].replace('(','')), lng: parseFloat(latLngStr[1])};
        pinCreateStore.setLatLng(latLng)
        const buffer = {'location': latLng}
        geocoder.geocode(buffer, (results, status) => {
            if(status === 'OK') {
                pinCreateStore.setAddress(results[0].formatted_address)
                pinCreateStore.setIsOpen(true)
            }
            else
                toastServerError()
        })
    }

     const handleMarkerOnClick = (id) => {
        pinStore.setPinId(id)
     }

     const renderRedirect = () => {
         if (pinStore.isPinIdSet)
             return (<Redirect to={`/pin/${pinStore.pinId}`} push/>)
     }

            return(
                    <div>
                        {renderRedirect()}
                        <Map google={props.google} zoom={publicMapStore.zoom}
                            containerStyle={{position: 'relative', width: '100%', height: '93vh'}}
                            initialCenter={publicMapStore.centerPositions}
                             streetViewControl={false}
                             fullscreenControl={false}
                             onClick={systemStore.userRole === Role.SuperAdmin ? (onMapClick) : (null)}>
                            {publicMapStore.publicMapPins.map(value => {
                                return (
                                    <Marker key={value.id} name={value.name} position={{ lat: value.lat, lng: value.lng }}
                                            onClick={(event) => handleMarkerOnClick(value.id)}/>
                                )
                            })}
                        </Map>
                        <Tooltip className="fab" placement={"left"} title="Напишите ваши отзывы" arrow>
                            <Fab className="fab" color="secondary" aria-label="send">
                                <SendIcon/>
                            </Fab>
                        </Tooltip>
                    </div>
            )
 }
)


export default GoogleApiWrapper({
    apiKey: ("AIzaSyAzF9M_VxXxFOQSZOWcHpiShoni_g6yi4E"),
    language: 'kz',
    LoadingContainer: LoadingContainer
})(PublicMap)