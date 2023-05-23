import { Fragment } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useLocation,useNavigate } from 'react-router-dom';

import {setForgotPassResult } from '../../redux/actions/actions';

export const ForgotPassNotify = () => {
    const status = useSelector(state => state.identification.forgotPassResult);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const data = {
        successSendEmail: {
           title: 'Письмо выслано',
           descr: 'Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля',
           textBtn: null,
        },
        successSaveNewData:{
            title: 'Новые данные сохранены',
            descr: 'Зайдите в личный кабинет, используя свои логин и новый пароль',
            textBtn: 'вход',
            link: '/auth'
        },
        errorSaveData:{
            title: 'Данные не сохранились',
            descr: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз',
            textBtn: 'повторить',
            link: `/forgot-pass${location.search}`
        }
    }
    const goBack = (link)=> {
        if(status === 'errorSaveData'){
            dispatch(setForgotPassResult(''));
        }
        navigate(link);
    }

    const elem = () => {
        if(status !== 'error'){
            const {title,descr,textBtn,link} = data[status];

            return (
                <div className="identification-notify">
                    <h2 className="identification-notify__title"> {title}</h2>
                    <p className="identification-notify__descr"> {descr} </p>
                    {textBtn && <button to={link} type='button' className="identification-notify__button" onClick={()=> goBack(link)}> {textBtn} </button>}
                </div>
            )
        }
 
        return null;
     }

    return (
         // eslint-disable-next-line react/jsx-no-useless-fragment
         <Fragment>
            {elem()}
         </Fragment>
    )
}