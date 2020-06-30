import { observable, configure, action } from "mobx"
import { createContext } from 'react'
import { mapMarkerAdd } from '../../API'

configure({ enforceActions: 'observed'})

class PinCreateStore {

    @observable isGeolocationOn = false
    @observable isCreated = false
    @observable nameError = false
    @observable descriptionError = false
    @observable imagesError = false
    @observable address = ""
    images = observable.array([])
    latLng = observable.object({lat: 0, lng: 0});

    @action async addProblemPin(name, problemDescription){

        var problemPinDTO = new FormData();
        problemPinDTO.set('name', name)
        problemPinDTO.set('ProblemDescription', problemDescription)
        problemPinDTO.set('Address', this.address)
        problemPinDTO.set('Lat', this.latLng.lat.toString().replace('.',','))
        problemPinDTO.set('Lng', this.latLng.lng.toString().replace('.',','))
        this.images.map(image => {
            problemPinDTO.append('Files', image)
        })
        const answer = await mapMarkerAdd(problemPinDTO)
        this.setIsCreated(answer)
    }

    @action setImages(images){
        this.images = images
    }

    @action setNameError(nameError){
        this.nameError = nameError
    }

    @action setDescriptionError(descriptionError){
        this.descriptionError = descriptionError
    }

    @action setImagesError(imagesError){
        this.imagesError = imagesError
    }

    @action setIsCreated(status){
        this.isCreated = status
    }

    @action setLatLng(latLng){
        this.latLng = latLng
    }

    @action setAddress(address){
        this.address = address
    }

    @action setIsGeolocationOn(isGeolocationOn){
        this.isGeolocationOn = isGeolocationOn
    }

};

export const PinCreateContext = createContext(new PinCreateStore())