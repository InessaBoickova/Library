import {Helmet} from 'react-helmet';

import { Registration } from '../../components/registration/registration'

export const RegistrationPage = () => (
    <div className="registration-page">
            <Helmet>
                <title>Registrations</title>
            </Helmet>
        <h2 className="registration-page__title"> Cleverland </h2>
        <Registration/>
    </div>
)