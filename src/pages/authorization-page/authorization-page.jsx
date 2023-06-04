import { useEffect } from 'react'
import {Helmet} from 'react-helmet';
import { useSelector } from 'react-redux'
import {useNavigate } from 'react-router-dom';

import { Authorization } from '../../components/authorization/authorization'
import { AuthorizationNotify } from '../../components/authorization/authorization-notify'
import { Spinner } from '../../components/spinner/spinner'

export const AuthorizationPage = () => {
    const navigate = useNavigate();
    const loadingIdentification = useSelector(state => state.identification.loadingIdentification);
    const authorizationResult = useSelector(state => state.identification.authorizationResult)

    useEffect (()=> {
        if(authorizationResult === 'fulfilled'){
            navigate('/books')
        }
    },[authorizationResult, navigate])

    return (
        <div className="authorization-page">
            <Helmet>
                <title>Authorization</title>
            </Helmet>
            <h2 className="authorization-page__title"> Cleverland </h2>
            {loadingIdentification && <Spinner/> }
            {(authorizationResult !== 'error') && <Authorization/> }
            {(authorizationResult === 'error' ) && <AuthorizationNotify/> }
        </div>
    )
}