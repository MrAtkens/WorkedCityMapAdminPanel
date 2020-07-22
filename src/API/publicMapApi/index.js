import { toastServerError, toastMarkerNotFoundError, toastThanksForAdd } from '../../tools'
import { SystemStoreContext } from 'store'
import axios from 'axios'
axios.defaults.withCredentials = true

const URL='localhost:44318'

export const mapMarkersGetApi = async () => {
    return await axios.get(`https://${URL}/api/Public/GetPublicMapPins`).then(response => {
        if(response.status === 500)
            toastServerError()
        else if (response.status === 403){
            localStorage.removeItem('token');
            window.location.reload(false);
        }
        return response.data
    })
}

export const mapMarkerGetByIdApi = async (id) => {
    return await axios.get(`https://${URL}/api/Public/GetPublicMapPinById/${id}`).then(response => {
        if(response.status === 500)
            toastServerError()
        else if (response.status === 404)
            toastMarkerNotFoundError()
        else if (response.status === 403){
            localStorage.removeItem('token');
            window.location.reload(false);
        }
        return response.data
    })
}


export const mapMarkerAdd = async (problemPinDTO) => {
    console.log(problemPinDTO)
    return await axios.post(`https://${URL}/api/Public/CreateProblemPin`, problemPinDTO, {
        headers: {'Content-Type': 'multipart/form-data' }
    }).then(response => {
            console.log(response)
        if(response.status === 500)
            toastServerError()
        else if (response.status === 403){
            localStorage.removeItem('token');
            window.location.reload(false);
        }
        else if(response.status === 200) {
            toastThanksForAdd()
        }
        return response.data
    })
}
