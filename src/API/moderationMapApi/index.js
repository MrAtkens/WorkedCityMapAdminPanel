import { toastServerError, toastMarkerNotFoundError, toastThanksForAdd } from '../../tools'
import axios from 'axios'
axios.defaults.withCredentials = true

const URL='localhost:54968'

const moderationMapPinsGet = async () => {
    return await axios.get(`http://${URL}/api/Moderation/GetModerationPins`).then(response => {
        if(response.status === 500)
            toastServerError()
        else if (response.status === 403){
            localStorage.removeItem('token');
            window.location.reload(false);
        }
        console.log(response.data)
        return response.data
    })
}

const moderationMapPinGetById = async (id) => {
    return await axios.get(`http://${URL}/api/Moderation/GetModerationPinById/${id}`).then(response => {
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


const acceptPin = async (acceptDTO) => {
    console.log(acceptDTO)
    return await axios.post(`http://${URL}/api/Moderation/AcceptPublicPin`, acceptDTO, { headers:
    { Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'multipart/form-data' }
    }).then(response => {
            console.log(response)
        if(response.status === 500)
            toastServerError()
        else if (response.status === 403){
            localStorage.removeItem('token');
            window.location.reload(false);
        }
        else if(response.status === 200) 
            toastThanksForAdd()
        return response.data
    })
}


export const moderationMapService = {
    moderationMapPinsGet,
    moderationMapPinGetById,
    acceptPin
}  
