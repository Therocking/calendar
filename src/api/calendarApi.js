import axios from 'axios';
import { getEviroments } from '../helper/getEnviroments';

const { VITE_API_URL } = getEviroments();


const calendarApi = axios.create({
    baseURL: VITE_API_URL,

});

// Todo: configurar los inreseptores
calendarApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
});

export default calendarApi 