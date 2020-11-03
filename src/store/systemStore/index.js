import { observable, configure, action, computed } from "mobx"
import {createContext} from 'react'

import { authenticationService } from 'API'
import { authorizationStatusValidation, toastServerError } from 'tools'
import { Role } from 'tools' 


configure({ enforceActions: 'observed'})

class SystemStore {

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
        const user = response.data
        if(user.moderator !== undefined){
            this.setModerator(user.moderator)
            this.setUserRole(Role.Moderator)
            localStorage.setItem('token', user.moderator.token)
            if(this.moderator.id !== null)
                this.setIsAuthorize(true)
        }
        if(user.admin !== undefined){
            this.setAdmin(user.admin)
            if(user.admin.role === Role.SuperAdmin)
                this.setUserRole(Role.SuperAdmin)
            else if(user.admin.role === Role.Admin)
                this.setUserRole(Role.Admin)
            localStorage.setItem('token', user.admin.token)
            if(this.admin.id !== null)
                this.setIsAuthorize(true)
        }
    }

    @action async getUserData(){
        try{
            const response = await authenticationService.userGetData()
            authorizationStatusValidation(response.status, response.data.message)
            const user = response.data
            console.log(user)
            if(user.existingModerator !== undefined){
                this.setModerator(user.moderator)
                this.setUserRole(Role.Moderator)
                if(this.moderator.id !== null)
                    this.setIsAuthorize(true)
            }
            if(user.existingAdmin !== undefined){
                this.setAdmin(user.existingAdmin)
                if(user.existingAdmin.role === Role.SuperAdmin)
                    this.setUserRole(Role.SuperAdmin)
                else if(user.existingAdmin.role === Role.Admin)
                    this.setUserRole(Role.Admin)
                console.log(user)
                if(this.admin.id !== null)
                    this.setIsAuthorize(true)
                console.log(this.isAuthorize)
            }
        }
        catch(Exception){
            toastServerError()
        }
    }

    @action logout(){
        localStorage.removeItem('token');
        if(this.userRole === Role.Moderator){
            this.setModerator(null)
        }
        else if(this.userRole === Role.Admin || this.userRole === Role.SuperAdmin){
            this.setAdmin(null)
        }
        this.setIsAuthorize(false)
    }

    @computed
    get showAuthorize() {
        return this.isAuthorize === false && localStorage.getItem('token') === null
    }
    
    @computed
    get showIsUserDontExist(){
        return this.moderator.id === null && this.admin.id === null && localStorage.getItem('token') !== null
    }

    @computed
    get showUserFullName(){
        if(this.userRole === Role.Admin || this.userRole === Role.SuperAdmin)
            return `${this.admin.lastName} ${this.admin.firstName}`
        else if(this.userRole === Role.Moderator)
            return `${this.moderator.lastName} ${this.moderator.firstName}`
        return ". . ."
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