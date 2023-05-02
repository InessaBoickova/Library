/* eslint-disable @typescript-eslint/no-unused-expressions */
import {useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {setAuthorizationResult,setForgotPassResult,
        setForgotPassSuccess,setLoading,setRegistrationResult} from '../redux/actions/actions';

export const useIdentificationServices = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const BASE_LINK = 'https://strapi.cleverland.by';

    // eslint-disable-next-line arrow-body-style
    const registrationUser =  (data) => {
        dispatch( setLoading(true))
         axios.post(`${BASE_LINK}/api/auth/local/register`, data)
            .then (res => {
                dispatch(setRegistrationResult('success'));

                return res;
            })
            .catch(err => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                (err.response.status === 400) 
                    ? dispatch(setRegistrationResult('error400'))  
                    : dispatch(setRegistrationResult('error'))

                return err;
            })
            .finally( () => {
                dispatch(setLoading(false));
            });
    }

    const forgotPasswordUser = (data) => {
        dispatch( setLoading(true))
        
        axios.post(`${BASE_LINK}/api/auth/forgot-password`, data)
        
            .then (res => {
                dispatch(setForgotPassSuccess(true))
                dispatch(setForgotPassResult('successSendEmail')); 

                return res;
            })
            .catch(err => {
                dispatch(setForgotPassResult('errorSendEmail'))

                return err;
            })
            .finally( () => {
                dispatch(setLoading(false));
            });
    }

    const UpdatePasswordUser = (data) => {
        dispatch(setLoading(true))
        
        axios.post(`${BASE_LINK}/api/auth/reset-password`, data)
            .then (res => {
                dispatch(setForgotPassResult('successSaveNewData'));

            })
            .catch(err => {
                dispatch(setForgotPassResult('errorSaveData')); 
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    }

    const authorizationUser =  (data) => {
        dispatch(setLoading(true)) 
        
        axios.post(`${BASE_LINK}/api/auth/local`, data)
        
            .then (res => {
                localStorage.setItem('token', res.data.jwt);
                localStorage.setItem('user', JSON.stringify(res.data.user)); 
                        
                navigate('/books');
            })
            .catch(err => {
                (err.response.status === 400) 
                    ? dispatch(setAuthorizationResult('error400'))  
                    : dispatch(setAuthorizationResult('error'))
            })
            .finally( () => {
                dispatch(setLoading(false));
            });
    }

    return {registrationUser,authorizationUser,forgotPasswordUser,UpdatePasswordUser}
}