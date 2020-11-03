import { toastServerError, toastUserNotFoundError, toastUnauthorizedError, toastNotFoundError, toastLoginOccuped } from 'tools'
const defautlTimeOutForReload = 5000

//Cr - create, read
//Ud - update, delete

function UnauthorizedAuth(message, time){
    toastUnauthorizedError(message)
    localStorage.removeItem('token');
    setTimeout(window.location.reload(false), time)
}

function UnauthorizedAnother(time){
    toastUnauthorizedError("Ваши верефикационные данные устарели или не верны, пожалуйста авторизуйтесь заново")
    localStorage.removeItem('token');
    setTimeout(window.location.reload(false), time)
}


export const authorizationStatusValidation = (status, message) => {
    if(status === 500)
        toastServerError(message)
    else if (status === 404)
        toastUserNotFoundError(message)
    else if (status === 401){
        UnauthorizedAuth(message, defautlTimeOutForReload)
    }
}


export const crudsCrStatusValidation= (status) => {
    if(status === 500)
        toastServerError()
    else if (status === 409)
        toastLoginOccuped()
    else if (status === 404)
        toastNotFoundError()
}

export const crudsUdStatusValidation = (status, message) => {
    if(status === 500)
        toastServerError(message)
    else if (status === 404)
        toastUserNotFoundError(message)
    else if (status === 401){
        UnauthorizedAnother(defautlTimeOutForReload)
    }
}