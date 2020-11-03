
import axios from 'axios'
axios.defaults.withCredentials = true

const URL='localhost:54968'

const userSingInApi = async (login, password) => {
  return await axios.post(`http://${URL}/api/AdministrationAuth/AdministartionAuthenticate`, { 
    login: login,
    password: password
  }).then(response => {
    console.log(response)
    return response
}).catch(error => {
  return error.response
 })
}


const userGetData = async () => {
  console.log(localStorage.getItem('token'))
    return await axios.get(`http://${URL}/api/AdministrationAuth/GetAdministartionData`, {headers:
    { Authorization: `Bearer ${localStorage.getItem('token')}` }}).then(response => {
      return response
    }).catch(error => { 
      return error.response
    })
}


export const authenticationService = {
  userSingInApi,
  userGetData
};
