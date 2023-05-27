import { Fragment } from 'react'
import { useSelector } from 'react-redux'

import { Spinner } from '../spinner/spinner'

import { RegistrationNotify } from './registration-notify'
import { StepOne } from './step-one'
import { StepThree } from './step-three'
import { StepTwo } from './step-two'

export const Registration = () => {
    const step = useSelector(state => state.identification.registrationStep);
    const registrationSuccess = useSelector(state => state.identification.registrationSuccess);
    const loadingIdentification = useSelector(state => state.identification.loadingIdentification);
  
    const stepRegistration = ((step === 1) && <StepOne/>) || ((step === 2) && <StepTwo/>) || ((step === 3) && <StepThree/>);
 
    return (
      
        <Fragment>
            {loadingIdentification && <Spinner/>}
            {(registrationSuccess)  && <RegistrationNotify/>}
            {(!registrationSuccess) &&  stepRegistration}
        </Fragment>
    )
}