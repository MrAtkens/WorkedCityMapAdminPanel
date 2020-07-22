import React, { useContext, useEffect } from 'react';
import { Fab, Tooltip, Box } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import { observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import {Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { toastServerError } from '../../tools'

import { MapStoreContext, PinCreateContext, SystemStoreContext }  from '../../store'
import CreateDialogAccept from '../CreateDialogAccept'
import './style.scss'
import { Loader } from 'components';

const LoadingContainer = (props) => (
    <Loader/>
)

const MainMap = observer((props) => {
    const mapStore = useContext(MapStoreContext)
    const pinCreateStore = useContext(PinCreateContext)
    const systemStore = useContext(SystemStoreContext)

    useEffect(() => {
        mapStore.getMapsPin()
    }, [])

    const onMapClick = (mapProps, map, clickEvent) => {
        const geocoder = new mapProps.google.maps.Geocoder();
        const latLngStr = clickEvent.latLng.toString().split(',', 2)
        const latLng = {lat: parseFloat(latLngStr[0].replace('(','')), lng: parseFloat(latLngStr[1])};
        pinCreateStore.setLatLng(latLng)
        const buffer = {'location': latLng}
        geocoder.geocode(buffer, (results, status) => {
            if(status === 'OK') {
                pinCreateStore.setAddress(results[0].formatted_address)
                systemStore.setIsOpen(true)
            }
            else
                toastServerError()
        })
    }

     const handleMarkerOnClick = (id) => {
        mapStore.setPinId(id)
     }

     const renderRedirect = () => {
         if (mapStore.pinId !== null)
             return (<Redirect to={`/pin/${mapStore.pinId}`} push/>)
     }

        if (mapStore.isLoaded === false) {
            return (<Loader/>)
        }
        else {
            return(
                    <Box height="100%" width={1}>
                        {renderRedirect()}
                        <Map google={props.google} zoom={mapStore.zoom}
                             className="map"
                             initialCenter={mapStore.centerPositions}
                             streetViewControl={false}
                             fullscreenControl={false}
                             onClick={onMapClick}>
                            {mapStore.mapPins.map(value => {
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
                        <CreateDialogAccept/>
                    </Box>
            )
        }
})


export default GoogleApiWrapper({
    apiKey: ("AIzaSyAzF9M_VxXxFOQSZOWcHpiShoni_g6yi4E"),
    language: 'kz',
    LoadingContainer: LoadingContainer
})(MainMap)