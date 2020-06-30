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

export const toastServerError = () => {
    toast.error(`Ошибка сервера пожалуйста попробуйте позже, Код: 500`, defaultSetings);
}

export const toastMarkerNotFoundError = () => {
    toast.error(`Ошибка запроса, данный маркер не был найден, Код: 404`, defaultSetings);
}

export const toastValidationError = () => {
    toast.error(`Ошибка валидаций проверьте введённые данные на коректность`, defaultSetings);
}

export const toastAuthorizeValidationError = () => {
    toast.error(`Ошибка валидаций во время авторизаций, проверьте введённые данные на коректность`, defaultSetings);
}

export const toastImageRemoved = (imageName) => {
    toast.info(`Фотография была удалена ${imageName}`, defaultSetings)
}

export const toastThanksForAdd = () => {
    toast.success(`Предоставленная вами проблема отправленна успешна и на данный момент проходит модерацию, спасибо за вашу помощь городу`, defaultSetings);
}