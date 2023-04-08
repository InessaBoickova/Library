import { useCallback } from 'react';
import {useDispatch,useSelector } from 'react-redux';

import { openNavMenu,setBook,setBooksList,setError,setListOfGenres,setLoading } from '../redux/actions/actions';

import axiosApi from './interceptors';

export const useBooksServices = () => {
    const navMenuOpen = useSelector(state => state.listMenu.navMenuOpen);
    const dispatch = useDispatch();

    const onRequest = useCallback (
       
        (action,ref) => {
            dispatch(setLoading(true));
            axiosApi.get(ref)
            .then((response) =>  {
                  if(navMenuOpen){
                    dispatch(openNavMenu())
                }
                dispatch(action(response.data))
            })
            .catch(()=> {
                dispatch(setError(true));
            })
            .finally( () => {
                
                dispatch(setLoading(false));
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [] ,
    );

    const getBooksList = () => {
       onRequest(setBooksList,'api/books');
    }

    const getBook = (id) => {
        onRequest(setBook,`api/books/${id}`)
    }
    const getListOfGenres = () => {
        onRequest(setListOfGenres,'api/categories')
    }

    return {getBooksList,getListOfGenres,getBook}
}