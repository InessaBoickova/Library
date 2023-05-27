import axios from 'axios';

export const useIdentificationServices = () => {
    const BASE_LINK = 'https://library-cleverland-2jfze.ondigitalocean.app';
    const identificationRequest = (url,data) => axios.post(`${BASE_LINK}${url}`,data);

    return identificationRequest;
}