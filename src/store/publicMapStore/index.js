import { observable, action, computed, configure } from "mobx"
import { publicMapService } from 'API'
import {createContext} from 'react'

configure({ enforceActions: 'observed'})

class PublicMapStore {

    @observable isPublicMapLoaded = false
    @observable zoom = 13
    centerPositions = observable.object( {lat: 51.165145, lng: 71.419850});
    publicMapPins = observable.array([]);

    @action async getPublicMapsPin(){
        const response = await publicMapService.publicMapPinsGet()
        console.log(response)
        const pins = response
        if(pins !== null){
            this.setIsPublicMapLoaded(pins.status)
            this.setPins(response.publicPins)
        }
    }

    @computed
    get isPublicMapNotLoaded(){
      return this.isPublicMapLoaded === false
    }   

    @action setPins(pins){
        this.publicMapPins = pins
    }

    @action setIsPublicMapLoaded(status){
        this.isMapLoaded = status
    }


};

export const PublicMapStoreContext = createContext(new PublicMapStore())