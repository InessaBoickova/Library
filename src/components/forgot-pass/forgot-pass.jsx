import { Fragment,useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { setRegistrationStep } from '../../redux/actions/actions'
import arrow from '../../resources/icon/arrow.svg'
import arraw_back from '../../resources/icon/arrow-back.svg'
import { useIdentificationServices } from '../../services/identification'

import { ForgotPassNotify } from './forgot-pass-notify'

const ForgotPassForm = () => {
    const dispatch = useDispatch()
    const forgotPassResult = useSelector(state => state.identification.forgotPassResult);
   
    const [activeInputOne , setActiveInputOne] = useState ('forgot-pass__form-wrapper');
    const [inpurErrorOne,setInpurErrorOne] = useState(false);
    const {forgotPasswordUser} = useIdentificationServices()
    const borderOneColor = (inpurErrorOne || (forgotPassResult === 'errorSendEmail')) ? '#F42C4F' : '#BFC4C9' ;

    const {register,handleSubmit,formState: { errors} ,watch } = useForm({
        criteriaMode: 'all',
        mode:'onChange',
        defaultValues: { email: ''},
    });

    const email = register('email', { required: true, pattern: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9.])+\.([A-Za-z]{2,4})$/});
    const data = watch();

    const onSubmit = (e)  => {
        e.preventDefault();
        if(!inpurErrorOne && data.email){
            forgotPasswordUser(watch())
        }else {
            setInpurErrorOne(true)
        }
    }

    const OnBlurInputEmail = (e) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (e.target.value.length < 1) && (setActiveInputOne('forgot-pass__form-wrapper'), setInpurErrorOne(true));
    }

    return  (
        <div className="forgot-pass">
             <Link to='/auth' className="forgot-pass__link"> 
                <img src={arraw_back}  className="forgot-pass__link-icon" alt="arraw" />
                вход в личный кабинет
            </Link>
            <h3 className='forgot-pass__title'> Восстановление пароля </h3>
            
            <form className='forgot-pass__form' onSubmit={(e)=> handleSubmit(onSubmit(e))}>
    
                <div className={activeInputOne} style={{borderBottom:`1px solid ${borderOneColor}`}}>
                    <label className='forgot-pass__form-label' htmlFor="email"> Email </label>
                    <input type="email" {...email}
                        id='email'
                        className='forgot-pass__form-input' 
                        onClick={() => setInpurErrorOne(false)}
                        onFocus={()=> setActiveInputOne('forgot-pass__form-wrapper-active')}
                        onBlur={(e)=> { OnBlurInputEmail(e)}}
                        onChange={(e)=> {   
                            email.onChange(e);
                        }} />
                </div>
                {(forgotPassResult === 'errorSendEmail') 
                    && <p style={{color:' #F42C4F', marginLeft:'10px'}} className='forgot-pass__form-help' > error </p>}

                {(errors.email || inpurErrorOne) 
                                && <p style={{color:' #F42C4F'}} className='forgot-pass__form-help' > {data.email 
                                ? 'Введите корректный e-mail'  : 'Поле не может быть пустым' } </p>}

                <h5 className='forgot-pass__info'> 
                    На это email будет отправлено письмо с инструкциями <br/> по восстановлению пароля
                </h5>
               
                <input className={inpurErrorOne || (errors.email) 
                                ? 'forgot-pass__form-submit-block'
                                : 'forgot-pass__form-submit'}  
                        disabled= {( inpurErrorOne) ? true : false }
                        value="восстановить" type='submit'/>
            </form>

            <div className="forgot-pass__transition">
                <h4 className="forgot-pass__transition-title">Нет учётной записи?</h4>
                <Link to='/registration' onClick={()=> dispatch(setRegistrationStep(1))} className="forgot-pass__transition-link"> 
                    Регистрация
                    <img src={arrow}  className="forgot-pass__transition-icon" alt="arrow" />
                </Link>
            </div>
        </div>
    )
}

export const ForgotPass = () => {
    const forgotPassSuccess = useSelector(state => state.identification.forgotPassSuccess);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <Fragment>
            {forgotPassSuccess ? <ForgotPassNotify/> : <ForgotPassForm/>}
        </Fragment>
    )
}