import { observable, configure, action, computed } from "mobx"
import { toastAdminDeleted, toastAdminAdded, toastAdminEdit } from 'tools'
import { crudsCrStatusValidation, crudsUdStatusValidation } from 'tools'
import {createContext} from 'react'

import { adminsService } from 'API'
import { findDeletedData, editModeratorsArray } from 'tools'

configure({ enforceActions: 'observed'})

class AdminsStore {

    @observable isAdminAdded = false
    @observable isAdminEdited = false
    @observable isAdminGet = false
    @observable.ref admins = []
    admin = observable.object({ id: null, login: null, firstName: null, lastName: null,
      moderatedPinsCount: null, acceptedWorksCount: null, AdminAddedDate: null });

    @action async getAdmins(){
        const response = await adminsService.getAdmins()
        console.log(response.data)
        crudsCrStatusValidation(response.status, response.message)
        const admins = response.data.admins
        if(admins !== null){
          this.setIsAdminGet(true)
          this.setAdmins(admins)
        }
    }

    @action async getAdminById(id){
      const response = await adminsService.getAdminById(id)
      console.log(response)
      crudsUdStatusValidation(response.status, response.data.message)
      this.setAdmin(response.data)
    }

    @action async addAdmin(login, password, firstName, lastName){
      const response = await adminsService.addAdmin(login, password, firstName, lastName)
      crudsCrStatusValidation(response.status, response.message)
      if(response.status === 200){
        toastAdminAdded(login)
        this.setIsAdminAdded(true)
        let admins = this.admins
        admins.push(response.data.admins)
        this.setAdmins(admins)
      }
    }

    @action async editAdmin(AdminId, login, firstName, lastName, password){
      const response = await adminsService.editAdmin(AdminId, firstName, lastName, password)
      crudsUdStatusValidation(response.status, response.data.message)
      if(response.status === 200){
        toastAdminEdit(login)
        this.setIsAdminEdited(true)
        this.setAdmins(editModeratorsArray(firstName, lastName, AdminId, this.admins))
      }
    }

    @action async deleteAdmin(oldData){
      const response = await adminsService.deleteAdmin(oldData.id)
      crudsUdStatusValidation(response.status, response.data.message)
      if(response.status === 200){
        toastAdminDeleted(oldData.login)
        this.setAdmins(findDeletedData(this.admins, oldData))
      }
    }

    @computed
    get isAdminsNotGet(){
      return this.isAdminGet === false
    }

    @computed
    get isAdminsGet(){
      return this.isAdminGet === true
    }

    @computed
    get isAdminAddedTrue(){
      return this.isAdminAdded === true
    }

    @computed
    get isAdminEditedTrue(){
      return this.isAdminEdited === true
    }

    @action setAdmin(admin){
      this.admin = admin
    }

    @action setAdmins(admins){
      this.admins = admins
    }

    @action setIsAdminGet(status){
      this.isAdminGet = status
    }
    
    @action setIsAdminEdited(status){
      this.isAdminEdited = status
    }

    @action setIsAdminAdded(status){
      this.isAdminAdded = status
    }
    
};

export const AdminStoreContext = createContext(new AdminsStore())