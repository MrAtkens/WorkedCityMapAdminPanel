import { authHeader, handleResponse } from 'tools';
import axios from 'axios'
axios.defaults.withCredentials = true

const URL='localhost:44318'

export const userService = {
    getAllAdmins,
    getAdminById
};

function getAllAdmins() {
    const requestOptions = { headers: authHeader() };
    return axios.get(`https://${URL}/api/AdminsCrud/GetAdmins`, requestOptions).then(handleResponse);
}

function getAdminById(id) {
    const requestOptions = { headers: authHeader() };
    return axios.get(`https://${URL}/api/AdminsCrud/GetAdminById/${id}`, requestOptions).then(handleResponse);
}