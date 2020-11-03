import { observable, configure, action, computed } from "mobx"
import { toastModeratorDeleted, toastModeratorAdded, toastModeratorEdit } from 'tools'
import { crudsCrStatusValidation, crudsUdStatusValidation } from 'tools'
import {createContext} from 'react'

import { moderationsService } from 'API'
import { findDeletedData, editModeratorsArray } from 'tools'

configure({ enforceActions: 'observed'})

class ModeratorsStore {

    @observable isModeratorAdded = false
    @observable isModeratorEdited = false
    @observable isModeratorGet = false
    @observable.ref moderators = []
    moderator = observable.object({ id: null, login: null, firstName: null, lastName: null,
      moderatedPinsCount: null, acceptedWorksCount: null, moderatorAddedDate: null });

    @action async getModerators(){
        const response = await moderationsService.getModerators()
        crudsCrStatusValidation(response.status, response.message)
        const moderators = response.data.moderators
        if(moderators !== null){
          this.setIsModeratorGet(true)
          this.setModerators(moderators)
        }
    }

    @action async getModeratorById(id){
      const response = await moderationsService.getModeratorById(id)
      crudsUdStatusValidation(response.status, response.data.message)
      this.setModerator()
    }

    @action async addModerator(login, password, firstName, lastName, adminId){
      const response = await moderationsService.addModerator(login, password, firstName, lastName, adminId)
      crudsCrStatusValidation(response.status, response.message)
      if(response.status === 200){
        toastModeratorAdded(login)
        this.setIsModeratorAdded(true)
        let moderators = this.moderators
        moderators.push(response.data.moderator)
        this.setModerators(moderators)
      }
    }

    @action async editModerator(moderatorId, login, firstName, lastName, password, adminId, adminLogin){
      const response = await moderationsService.editModerator(moderatorId, firstName, lastName, password, adminId, adminLogin)
      crudsUdStatusValidation(response.status, response.data.message)
      if(response.status === 200){
        toastModeratorEdit(login)
        this.setIsModeratorEdited(true)
        this.setModerators(editModeratorsArray(firstName, lastName, moderatorId, this.moderators))
      }
    }

    @action async deleteModerator(oldData){
      const response = await moderationsService.deleteModerator(oldData.id)
      crudsUdStatusValidation(response.status, response.data.message)
      if(response.status === 200){
        toastModeratorDeleted(oldData.login)
        this.setModerators(findDeletedData(this.moderators, oldData))
      }
    }

    @computed
    get isModeratorsNotGet(){
      return this.isModeratorGet === false
    }

    @computed
    get isModeratorsGet(){
      return this.isModeratorGet === true
    }

    @computed
    get isModeratorAddedTrue(){
      return this.isModeratorAdded === true
    }

    @computed
    get isModeratorEditedTrue(){
      return this.isModeratorEdited === true
    }

    @action setModerator(moderator){
      this.moderator = moderator
    }

    @action setModerators(moderators){
      this.moderators = moderators
    }

    @action setIsModeratorGet(status){
      this.isModeratorGet = status
    }
    
    @action setIsModeratorEdited(status){
      this.isModeratorEdited = status
    }

    @action setIsModeratorAdded(status){
      this.isModeratorAdded = status
    }
    
};

export const ModeratorStoreContext = createContext(new ModeratorsStore())