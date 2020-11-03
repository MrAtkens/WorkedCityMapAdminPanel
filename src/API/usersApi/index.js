import axios from 'axios'
axios.defaults.withCredentials = true

const URL='localhost:54968'

function getUsers() {
    console.log(localStorage.getItem('token'))
    return axios.get(`http://${URL}/api/UsersCrud/GetUsers`, {headers:
    { Authorization: `Bearer ${localStorage.getItem('token')}` }}).then(response => {
      console.log(response)
        return response;
    }).catch(error => {
    return error.response
    })
}

function deleteUser(id){
  return axios.delete(`http://${URL}/api/UsersCrud/DeleteUser/${id}`, {headers:
  { Authorization: `Bearer ${localStorage.getItem('token')}` }}).then(response => {
    return response
  }).catch(error => {
  return error.response
  })
}

export const usersService = {
    getUsers,
    deleteUser
};
