import axios from 'axios';

const BASE_LINK = 'https://library-cleverland-2jfze.ondigitalocean.app';

const axiosApi = axios.create({ baseURL: BASE_LINK });

axiosApi.interceptors.request.use((config)=> { 
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

    return config;
})

// eslint-disable-next-line import/no-default-export
export default axiosApi;