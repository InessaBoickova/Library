import { Fragment } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {setRegistrationResult,setRegistrationStep,setRegistrationSuccess} from '../../redux/actions/actions'
import { useIdentificationServices } from '../../services/identification';

export const RegistrationNotify = () => {
    const dispatch = useDispatch();
    const status = useSelector(state => state.identification.registrationResult);
    const registrationData = useSelector(state=> state.identification.registrationData);
    const {registrationUser} = useIdentificationServices()
  
    const data = {
        success: {
           title: 'Регистрация успешна',
           descr: 'Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль',
           textBtn: 'вход',
           link: '/auth'
        },
        error400:{
            title: 'Данные не сохранились',
            descr: 'Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.',
            textBtn: 'назад к регистрации',
            link: '/registration'
        },
        error:{
            title: 'Данные не сохранились',
            descr: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз',
            textBtn: 'повторить',
            link: '/registration'
        }
    }

    const navigate = useNavigate();

    const onClean= (link)=> {
        // eslint-disable-next-line no-negated-condition
        if(status !== 'error'){
            dispatch(setRegistrationResult(''));
            dispatch(setRegistrationSuccess(false));
            dispatch(setRegistrationStep(1))
        }else {
            registrationUser(registrationData)
        }

        navigate(link)
    }

    const elem = () => {
       if(status !== ''){
        const {title,descr,textBtn,link} = data[status];

        return (
            <div className="identification-notify">
                <h2 className="identification-notify__title"> {title}</h2>
                <p className="identification-notify__descr"> {descr} </p>

                <button className="identification-notify__button" type='button' onClick={()=> onClean(link)}> 
                     {textBtn} 
                 </button>

            </div>
            )
        }

        return null;
    }
    
    return (
        <Fragment>
            {elem()}
        </Fragment>
    )
}