import {Helmet} from 'react-helmet';
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
            <Helmet>
                <title>Password recovery</title>
            </Helmet>
            <h2 className="forgot-pass-page__title"> Cleverland </h2>
            {loadingIdentification && <Spinner/>}
            {(!loadingIdentification && !location.search) && <ForgotPass/>}
            {(!loadingIdentification && location.search) && <UpdatePassword/>}
        </div>
    )
}