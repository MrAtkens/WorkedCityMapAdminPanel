import { observable, action, computed, configure } from "mobx"
import { publicMapService } from 'API'
import {createContext} from 'react'

configure({ enforceActions: 'observed'})

class PinStore {

    @observable isPinLoaded = false
    @observable pinId = null
    mapPin = observable.object({name: "", problemDescription: "", address: "", images: [], creationDate: ""});

    @action async getMapPinById(id){
        const pin = await publicMapService.publicMapPinGetById(id)
        this.setPin(pin.problemPin)
        console.log(pin)
        this.setIsPinLoaded(pin.status)
    }


    @computed
    get isPinNotLoaded(){
        return this.isPinNotLoaded === false
    }

    @computed
    get isPinIdSet(){
        return this.pinId !== null
    }

    @action setPin(pin){
        this.mapPin = pin
    }

    @action setPinId(pinId){
        this.pinId = pinId
    }

    @action setIsPinLoaded(status){
        this.isPinLoaded = status
    }


};

export const PinStoreContext = createContext(new PinStore())