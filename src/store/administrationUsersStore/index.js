import { observable, configure, action, computed } from "mobx"
import { toastModeratorDeleted } from 'tools'
import { crudsCrStatusValidation, crudsUdStatusValidation, findDeletedData } from 'tools'
import {createContext} from 'react'

import { usersService } from 'API'

configure({ enforceActions: 'observed'})

class UsersStore {

  @observable isUsersGet = false
  @observable.ref users = []
   
    @action async getUsers(){
        const response = await usersService.getUsers()
        crudsCrStatusValidation(response.status, response.message)
        const users = response.data.users
        if(users !== null){
          this.setIsUsersGet(true)
          this.setUsers(users)
        }
    }

    @action async deleteUser(oldData){
      const response = await usersService.deleteUser(oldData.id)
      crudsUdStatusValidation(response.status, response.data.message)
      if(response.status === 200){
        toastModeratorDeleted(oldData.login)
        this.setUsers(findDeletedData(this.users, oldData))
      }
    }

    @computed
    get isUsersNotGet(){
      return this.isUsersGet === false
    }

    @action setUsers(users){
      this.users = users
    }

    @action setIsUsersGet(status){
      this.isUsersGet = status
    }
    
};

export const UsersStoreContext = createContext(new UsersStore())