import { toastServerError, toastMarkerNotFoundError, toastThanksForAdd } from '../../tools'
import axios from 'axios'
axios.defaults.withCredentials = true

const URL='localhost:54968'

const publicMapPinsGet = async () => {
    return await axios.get(`http://${URL}/api/Public/GetPublicMapPins`).then(response => {
        if(response.status === 500)
            toastServerError()
        else if (response.status === 403){
            localStorage.removeItem('token');
            window.location.reload(false);
        }
        return response.data
    })
}

const publicMapPinGetById = async (id) => {
    return await axios.get(`http://${URL}/api/Public/GetPublicMapPinById/${id}`).then(response => {
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


const mapMarkerAdd = async (problemPinDTO) => {
    console.log(problemPinDTO)
    return await axios.post(`http://${URL}/api/Public/CreateProblemPin`, problemPinDTO, { headers:
    { Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'multipart/form-data' }
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


export const publicMapService = {
    publicMapPinsGet,
    publicMapPinGetById,
    mapMarkerAdd
}  
