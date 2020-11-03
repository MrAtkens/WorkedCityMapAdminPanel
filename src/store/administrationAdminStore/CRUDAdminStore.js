import { observable, configure, action, computed } from "mobx"
import {createContext} from 'react'


configure({ enforceActions: 'observed'})

class CRUDAdminStore {

    @observable isAddAdminOpen = false
    @observable isEditAdminOpen = false
    @observable isPasswordPosible = false
    @observable loginError = false
    @observable passwordError = false
    @observable firstNameError = false
    @observable lastNameError = false
    @observable passwordStrength = 0
    @observable password = ""

    adminEdit = observable.object({ id: null, login: null, firstName: "", lastName: "",
        addedModerators: [], addedTeams: [], creationDate: "" });


    @computed
    get validateAddAdmin(){
        return this.loginError ||
        this.passwordError ||
        this.firstNameError ||
        this.lastNameError
    }

    @computed
    get validateEditAdmin(){
        return this.passwordError ||
        this.firstNameError ||
        this.lastNameError
    }

    @computed
    get isEditAdminOpenTrue(){
        return this.isEditAdminOpen === true
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

    @action setAdminEdit(Admin){
        this.AdminEdit = Admin
    }
 
    @action setPasswordStrength(count){
        this.passwordStrength = count
    }

    @action setIsPasswordPosible(status){
        this.isPasswordPosible = status
    }
    
    @action setIsAddAdminOpen(status){
        this.isAddAdminOpen = status
    }

    @action setIsEditAdminOpen(status){
        this.isEditAdminOpen = status
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

export const CRUDAdminStoreContext = createContext(new CRUDAdminStore())