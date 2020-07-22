import axios from 'axios'
axios.defaults.withCredentials = true

const URL='localhost:44318'

function getModerators() {
    console.log(localStorage.getItem('token'))
    return axios.get(`https://${URL}/api/ModeratorsCrud/GetModerators`, {headers:
    { Authorization: `Bearer ${localStorage.getItem('token')}` }}).then(response => {
        return response;
    }).catch(error => {
        console.log(error.response)
    return error.response
    })
}

function getModeratorById(id) {
    return axios.get(`https://${URL}/api/ModeratorsCrud/GetModeratorById/${id}`, {headers:
    { Authorization: `Bearer ${localStorage.getItem('token')}` }}).then(response => {
        return response
    }).catch(error => {
    return error.response
    })
}

function addModerator(login, password, firstName, lastName, adminId){
    const addModeratorDTO = {
        login: login,
        password: password,
        firstName: firstName,
        lastName: lastName,
        adminId: adminId
    }
    console.log(addModeratorDTO)
    return axios.post(`https://${URL}/api/ModeratorsCrud/AddModerator`, addModeratorDTO, {headers:
    { Authorization: `Bearer ${localStorage.getItem('token')}` }}).then(response => {
        console.log(response)
        return response
    }).catch(error => {
    return error.response
    })
}

function editModerator(moderatorId, firstName, lastName, password, adminId, adminLogin){
    const moderatorEditDTO = {
        firstName: firstName,
        lastName: lastName,
        password: password,
        adminId: adminId,
        adminLogin: adminLogin
    }
    console.log(moderatorEditDTO)
    return axios.patch(`https://${URL}/api/ModeratorsCrud/EditModerator/${moderatorId}`, moderatorEditDTO, {headers:
    { Authorization: `Bearer ${localStorage.getItem('token')}` }}).then(response => {
        return response
    }).catch(error => {
    return error.response
    })
}

function deleteModerator(id){
  return axios.delete(`https://${URL}/api/ModeratorsCrud/DeleteModerator/${id}`, {headers:
  { Authorization: `Bearer ${localStorage.getItem('token')}` }}).then(response => {
    return response
  }).catch(error => {
  return error.response
  })
}

export const moderationsService = {
    getModerators,
    getModeratorById,
    addModerator,
    editModerator,
    deleteModerator
};
