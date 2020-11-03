import { observable, configure, action, computed } from "mobx"
import {createContext} from 'react'


configure({ enforceActions: 'observed'})

class CRUDModeratorStore {

    @observable isAddModeratorOpen = false
    @observable isEditModeratorOpen = false
    @observable isPasswordPosible = false
    @observable loginError = false
    @observable passwordError = false
    @observable firstNameError = false
    @observable lastNameError = false
    @observable passwordStrength = 0
    @observable password = ""

    moderatorEdit = observable.object({ id: null, login: null, firstName: "", lastName: "",
        moderatedPinsCount: 0, acceptedWorksCount: 0, moderatorAddedDate: "" });


    @computed
    get validateAddModerator(){
        return this.loginError ||
        this.passwordError ||
        this.firstNameError ||
        this.lastNameError
    }

    @computed
    get validateEditModerator(){
        return this.passwordError ||
        this.firstNameError ||
        this.lastNameError
    }

    @computed
    get isEditModeratorOpenTrue(){
        return this.isEditModeratorOpen === true
    }

    @computed
    get passwordStrengthLess(){
        return this.passwordStrength <= 40
    }
    
    @computed
    get isPasswordPosibleTrue(){
        return this.isPasswordPosible === true
    }



    @action setPassword(password){
        this.password = password
    }

    @action setModeratorEdit(moderator){
        this.moderatorEdit = moderator
    }
 
    @action setPasswordStrength(count){
        this.passwordStrength = count
    }

    @action setIsPasswordPosible(status){
        this.isPasswordPosible = status
    }
    
    @action setIsAddModeratorOpen(status){
        this.isAddModeratorOpen = status
    }

    @action setIsEditModeratorOpen(status){
        this.isEditModeratorOpen = status
    }

    @action setLoginError(status){
        this.loginError = status
    }
    
    @action setPasswordError(status){
        this.passwordError = status
    }

    @action setFirstNameError(status){
        this.firstNameError = status
    }

    @action setLastNameError(status){
        this.lastNameError = status
    }
    
};

export const CRUDModeratorStoreContext = createContext(new CRUDModeratorStore())