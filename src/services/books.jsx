import axiosApi from './interceptors';

export const useBooksServices = () => {
    const booksRequest = (url) =>  axiosApi.get(url).then(response => response.data);

    return booksRequest;
}