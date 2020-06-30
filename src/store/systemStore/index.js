import { observable, configure, action } from "mobx"
import {createContext} from 'react'

import { authenticationService } from 'API'
import { Role } from 'tools'

configure({ enforceActions: 'observed'})

class SystemStore {

    @observable isOpen = false
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
        const user = await authenticationService.userSingInApi(userLogin, userPassword)
        console.log(user)
        if(user.moderatorAddedDate !== null){
            this.setModerator(user)
            this.setUserRole(Role.Moderator)
        }
        else if(user.adminAddedDate !== null){
            this.setAdmin(user)
            this.setUserRole(Role.Admin)
        }
        localStorage.setItem('token', user.token)
        if(this.admin.id !== null || this.moderator.id !== null)
            this.setIsAuthorize(true)
    }

    @action async getUserData(){
        const user = await authenticationService.userGetData()
        if(user.moderatorAddedDate !== null){
            this.setModerator(user)
            this.setUserRole(Role.Moderator)
        }
        else if(user.adminAddedDate !== null){
            this.setAdmin(user)
            this.setUserRole(Role.Admin)
        }
        
        if(this.admin.id !== null || this.moderator.id !== null)
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