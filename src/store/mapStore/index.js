import { observable, configure, action } from "mobx"
import { mapMarkersGetApi, mapMarkerGetByIdApi } from '../../API'
import {createContext} from 'react'

configure({ enforceActions: 'observed'})

class MapStore {

    @observable isLoaded = false
    @observable isPinLoaded = false
    @observable pinId = null
    @observable zoom = 13
    centerPositions = observable.object( {lat: 51.165145, lng: 71.419850});
    mapPins = observable.array([]);
    mapPin = observable.object({name: "", problemDescription: "", address: "", images: [], creationDate: ""});

    @action async getMapsPin(){
        const pins = await mapMarkersGetApi()
        this.setPins(pins.publicPins)
        this.setIsLoaded(pins.status)
    }

    @action async getMapPinById(id){
        const pin = await mapMarkerGetByIdApi(id)
        this.setPin(pin.problemPin)
        this.setIsPinLoaded(pin.status)
    }

    @action setPins(pins){
        this.mapPins = pins
    }

    @action setPin(pin){
        this.mapPin = pin
    }

    @action setPinId(pinId){
        this.pinId = pinId
    }

    @action setIsLoaded(status){
        this.isLoaded = status
    }

    @action setIsPinLoaded(status){
        this.isPinLoaded = status
    }


};

export const MapStoreContext = createContext(new MapStore())