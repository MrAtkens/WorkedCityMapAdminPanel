
import axios from 'axios'
import { toastServerError, toastMarkerNotFoundError } from '../../tools'
import { SystemStoreContext } from 'store'
axios.defaults.withCredentials = true

const URL='localhost:44318'

export const authenticationService = {
    userSingInApi,
    userGetData
};

const userSingInApi = async (login, password) => {
  return await axios.post(`https://${URL}/api/AdministrationAuth/AdministartionAuthenticate`, { 
    login: login,
    password: password
  }).then(response => {
    if(response.status === 500)
        toastServerError()
    else if (response.status === 404)
        toastMarkerNotFoundError()
    return response.data
})
}


const userGetData = async () => {
  return await axios.get(`https://${URL}/api/AdministartionAuth/`,{
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  }).then(response => {
    if(response.status === 500)
        toastServerError()
    else if (response.status === 404)
        toastMarkerNotFoundError()
    else if (response.status === 403)
      localStorage.removeItem('token');
    return response.data
  })
}
