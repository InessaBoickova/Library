/*eslint-disable*/
import axios from 'axios';

const BASE_LINK = 'https://library-cleverland-2jfze.ondigitalocean.app';

const axiosApi = axios.create({ baseURL: BASE_LINK });

axiosApi.interceptors.request.use((config)=> { 
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

    return config;
})

export default axiosApi;