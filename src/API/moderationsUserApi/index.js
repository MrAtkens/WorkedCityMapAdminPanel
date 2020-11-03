import axios from 'axios'
axios.defaults.withCredentials = true

const URL='localhost:54968'

function getModerators() {
    return axios.get(`http://${URL}/api/ModeratorsCrud/GetModerators`, {headers:
    { Authorization: `Bearer ${localStorage.getItem('token')}` }}).then(response => {
        return response;
    }).catch(error => {
        console.log(error.response)
    return error.response
    })
}

function getModeratorById(id) {
    return axios.get(`http://${URL}/api/ModeratorsCrud/GetModeratorById/${id}`, {headers:
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
    return axios.post(`http://${URL}/api/ModeratorsCrud/AddModerator`, addModeratorDTO, {headers:
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
    return axios.patch(`http://${URL}/api/ModeratorsCrud/EditModerator/${moderatorId}`, moderatorEditDTO, {headers:
    { Authorization: `Bearer ${localStorage.getItem('token')}` }}).then(response => {
        return response
    }).catch(error => {
    return error.response
    })
}

function deleteModerator(id){
  return axios.delete(`http://${URL}/api/ModeratorsCrud/DeleteModerator/${id}`, {headers:
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
