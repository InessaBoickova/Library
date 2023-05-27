import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'

import { ForgotPass } from '../../components/forgot-pass/forgot-pass'
import { UpdatePassword } from '../../components/forgot-pass/update-password'
import { Spinner } from '../../components/spinner/spinner'

export const ForgotPassPage = () => {
    const location = useLocation();
    const loadingIdentification = useSelector(state => state.identification.loadingIdentification);

    return (
        <div className="forgot-pass-page">
            <h2 className="forgot-pass-page__title"> Cleverland </h2>
            {loadingIdentification && <Spinner/>}
            {(!loadingIdentification && !location.search) && <ForgotPass/>}
            {(!loadingIdentification && location.search) && <UpdatePassword/>}
        </div>
    )
}