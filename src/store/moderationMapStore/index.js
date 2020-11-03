import { observable, action, computed, configure } from "mobx"
import { moderationMapService } from 'API'
import {createContext} from 'react'

configure({ enforceActions: 'observed'})

class ModerationMapStore {

    @observable isModerationMapLoaded = false
    @observable zoom = 13
    centerPositions = observable.object( {lat: 51.165145, lng: 71.419850});
    moderationMapPins = observable.array([]);

    @action async getModerationMapsPin(){
        const response = await moderationMapService.moderationMapPinsGet()
        console.log(response)
        const pins = response
        if(pins !== null){
            this.setIsModerationMapLoaded(pins.status)
            this.setPins(response.publicPins)
        }
    }

    @computed
    get isModerationMapNotLoaded(){
      return this.isModerationMapLoaded === false
    }   

    @action setPins(pins){
        this.moderationMapPins = pins
    }

    @action setIsModerationMapLoaded(status){
        this.isModerationMapLoaded = status
    }


};

export const ModerationMapStoreContext = createContext(new ModerationMapStore())