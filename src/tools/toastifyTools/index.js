import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const defaultSetings = {
    position:"bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
}

//Errors Toast
//Status 500 Iternal Server Error
export const toastServerError = () => {
    toast.error("На данный момент на стороне сервера ошибка, пожалуйста повторите попытку позже", defaultSetings);
}

//Status 409 Conflict(Login occuped)
export const toastLoginOccuped = () => {
    toast.error("Данный логин уже зарегистрирован", defaultSetings)
}


//Status 404 User Not Found or User uncorect information
export const toastUserNotFoundError = (message) => {
    toast.error(message, defaultSetings);
}

//Status 403 User unauthorized or token dont correct
export const toastUnauthorizedError = (message) => {
    toast.error(message, defaultSetings);
}



//Status 404 Marker not found
export const toastMarkerNotFoundError = () => {
    toast.error(`Ошибка запроса, данный маркер не был найден`, defaultSetings);
}

export const toastNotFoundError = () => {
    toast.error(`Ошибка запроса, адресс не найден`, defaultSetings);
}

export const toastValidationError = () => {
    toast.error(`Ошибка валидаций проверьте введённые данные на коректность`, defaultSetings);
}

// Toast for authorization on AccesGrid
export const toastAuthorizeValidationError = () => {
    toast.error(`Ошибка валидаций во время авторизаций, проверьте введённые данные на коректность`, defaultSetings);
}

export const toastAuthorizationError = () => {
    toast.error(`Данные авторизаций не совпадают`, defaultSetings);
}

// Succes toasts
export const toastThanksForAdd = () => {
    toast.success(`Предоставленная вами проблема отправленна успешна и на данный момент проходит модерацию, спасибо за вашу помощь городу`, defaultSetings);
}

export const toastModeratorAdded = (login) => {
    toast.success(`Вы успешно добавили модератора ${login}`)
}

export const toastModeratorEdit = (moderatorLogin) => {
    toast.success(`Выбранный вами модератор ${moderatorLogin} был изменён`, defaultSetings)
}

export const toastModeratorDeleted = (moderatorLogin) => {
    toast.success(`Выбранный вами модератор ${moderatorLogin} был удалён`, defaultSetings);
}


// Info toasts

export const toastImageRemoved = (imageName) => {
    toast.info(`Фотография была удалена ${imageName}`, defaultSetings)
}
