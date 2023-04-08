import { useSelector } from 'react-redux'

import { Authorization } from '../../components/authorization/authorization'
import { AuthorizationNotify } from '../../components/authorization/authorization-notify'
import { Spinner } from '../../components/spinner/spinner'

export const AuthorizationPage = () => {
    const loading = useSelector(state => state.book.loading);
    const authorizationResult = useSelector(state => state.identification.authorizationResult)

    return (
        <div className="authorization-page">
            <h2 className="authorization-page__title"> Cleverland </h2>
            {loading && <Spinner/> }
            {(authorizationResult !== 'error') && <Authorization/> }
            {(authorizationResult === 'error' ) && <AuthorizationNotify/> }
        </div>
    )
}