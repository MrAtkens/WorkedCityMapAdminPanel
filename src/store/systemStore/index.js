import { observable, configure, action, computed } from "mobx"
import {createContext} from 'react'

import { authenticationService } from 'API'
import { authorizationStatusValidation } from 'tools'
import { Role } from 'tools' 


configure({ enforceActions: 'observed'})

class SystemStore {

    @observable isOpen = false
    @observable isPasswordShow = false
    @observable isRedirect = true
    @observable isAuthorize = false
    @observable loginError = false
    @observable passwordError = false
    @observable userRole = ""
    
    moderator = observable.object({ id: null, login: null, firstName: null, lastName: null,
    moderatedPinsCount: null, acceptedWorksCount: null, moderatorAddedDate: null });

    admin = observable.object({ id: null, login: null, firstName: null, lastName: null,
    addedTeams: null,addedModerators: null, adminAddedDate: null})

    @action async singIn(userLogin, userPassword){
        const response = await authenticationService.userSingInApi(userLogin, userPassword)
        authorizationStatusValidation(response.status, response.data.message)
        console.log("NO")
        const user = response.data
        if(user.moderator !== undefined){
            this.setModerator(user.moderator)
            this.setUserRole(Role.Moderator)
            localStorage.setItem('token', user.moderator.token)
        }
        if(user.admin !== undefined){
            this.setAdmin(user.admin)
            this.setUserRole(Role.Admin)
            localStorage.setItem('token', user.admin.token)
        }
        if(this.showIsUserExist)
            this.setIsAuthorize(true)
    }

    @action async getUserData(){
        const response = await authenticationService.userGetData()
        console.log(response.status)
        authorizationStatusValidation(response.status, response.data.message)
        const user = response.data
        console.log(user)
        if(user.existingModerator !== undefined){
            this.setModerator(user.existingModerator)
            this.setUserRole(Role.Moderator)
        }
        else if(user.existingAdmin !== undefined){
            this.setAdmin(user.existingAdmin)
            this.setUserRole(Role.Admin)
        }
        
        if(this.showIsUserExist)
            this.setIsAuthorize(true)
        
    }

    @action logout(){
        localStorage.removeItem('token');
        if(this.userRole === Role.Moderator){
            this.setModerator(null)
        }
        else if(this.userRole === Role.Admin){
            this.setAdmin(null)
        }
        this.setIsAuthorize(false)
    }

    @computed
    get showAuthorize() {
        return this.isAuthorize === false && localStorage.getItem('token') === null
    }

    @computed
    get showIsUserExist(){
        return this.admin.id !== null || this.moderator.id !== null
    }
    
    @computed
    get showIsUserDontExist(){
        return this.moderator.id === null && this.admin.id === null && localStorage.getItem('token') !== null
    }

    @computed
    get showUserFullName(){
        if(this.userRole === Role.Admin)
            return `${this.admin.lastName} ${this.admin.firstName}`
        else if(this.userRole === Role.Moderator)
            return `${this.moderator.lastName} ${this.moderator.firstName}`
        return "TEST"
    }


    @action setModerator(moderator){
        this.moderator = moderator
    }

    @action setAdmin(admin){
        this.admin = admin
    }

    @action setUserRole(role){
        this.userRole = role
    }

    @action setIsOpen(status){
        this.isOpen = status
    }

    @action setJwtToken(token){
        this.jwtToken = token
    }

    @action setIsRedirect(status){
        this.isRedirect = status
    }

    @action setIsPasswordShow(status){
        this.isPasswordShow = status
    }

    @action setIsAuthorize(status){
        this.isAuthorize = status
    }

    @action setLoginError(status){
        this.loginError = status
    }

    @action setPasswordError(status){
        this.passwordError = status
    }

};

export const SystemStoreContext = createContext(new SystemStore())