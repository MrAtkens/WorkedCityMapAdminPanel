import axios from 'axios'
axios.defaults.withCredentials = true

const URL='localhost:54968'

function getAdmins() {
    return axios.get(`http://${URL}/api/AdminsCrud/GetAdmins`, {headers:
    { Authorization: `Bearer ${localStorage.getItem('token')}` }}).then(response => {
        return response;
    }).catch(error => {
        console.log(error.response)
    return error.response
    })
}

function getAdminById(id) {
    return axios.get(`http://${URL}/api/AdminsCrud/GetAdminById/${id}`, {headers:
    { Authorization: `Bearer ${localStorage.getItem('token')}` }}).then(response => {
        return response
    }).catch(error => {
    return error.response
    })
}

function addAdmin(login, password, firstName, lastName){
    const addAdminDTO = {
        login: login,
        password: password,
        firstName: firstName,
        lastName: lastName,
    }
    console.log(addAdminDTO)
    return axios.post(`http://${URL}/api/AdminsCrud/AddAdmin`, addAdminDTO, {headers:
    { Authorization: `Bearer ${localStorage.getItem('token')}` }}).then(response => {
        console.log(response)
        return response
    }).catch(error => {
    return error.response
    })
}

function editAdmin(AdminId, firstName, lastName, password){
    const AdminEditDTO = {
        firstName: firstName,
        lastName: lastName,
        password: password,
    }
    console.log(AdminEditDTO)
    return axios.patch(`http://${URL}/api/AdminsCrud/EditAdmin/${AdminId}`, AdminEditDTO, {headers:
    { Authorization: `Bearer ${localStorage.getItem('token')}` }}).then(response => {
        return response
    }).catch(error => {
    return error.response
    })
}

function deleteAdmin(id){
  return axios.delete(`http://${URL}/api/AdminsCrud/DeleteAdmin/${id}`, {headers:
  { Authorization: `Bearer ${localStorage.getItem('token')}` }}).then(response => {
    return response
  }).catch(error => {
  return error.response
  })
}

export const adminsService = {
    getAdmins,
    getAdminById,
    addAdmin,
    editAdmin,
    deleteAdmin
};
