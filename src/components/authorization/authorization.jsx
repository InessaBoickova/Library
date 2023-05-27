import { useEffect, useState } from 'react';
import { useForm  } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';

import {authorizationUser,setRegistrationStep} from '../../redux/slice/identification-slice';
import eye_open from '../../resources/icon/eye_open.svg';
import eye_closed from '../../resources/icon/eye-closed.svg';

export const Authorization = () => {
    const dispatch = useDispatch();
    const authorizationResult = useSelector(state => state.identification.authorizationResult);
    const [activeInputOne , setActiveInputOne] = useState ('identification__form-wrapper');
    const [activeInputTwo , setActiveInputTwo] = useState ('identification__form-wrapper');
    const [inpurErrorOne,setInpurErrorOne] = useState(false);
    const [inpurErrorTwo,setInpurErrorTwo] = useState(false);
    const [showPassword , setShowPassword] = useState(false);

    const borderOneColor = (inpurErrorOne) ? '#F42C4F' : '#BFC4C9' ;
    const borderTwoColor = (inpurErrorTwo) ? '#F42C4F' : '#BFC4C9' ;
    
    const {register,handleSubmit,watch } = useForm({
        mode:'onBlur',
    });

    const data = watch();
    const identifier = register('identifier', { required: true});
    const password = register('password', { required: true});

    const onSubmit = (e) => {
        e.preventDefault();
        if(!inpurErrorOne || !inpurErrorTwo){
            dispatch(authorizationUser(data));
        }
    }

    const onBlurPassword = (e)=> {
        if(e.target.value.length < 1){
            setActiveInputTwo('identification__form-wrapper');
            setInpurErrorTwo(true);
        }else {
            setInpurErrorTwo(false);
        }
    }

    const onBlurIdentifier = (e)=> {
        if(e.target.value.length < 1){
            setActiveInputOne('identification__form-wrapper');
            setInpurErrorOne(true);
        }else {
            setInpurErrorOne(false);
        }
    }

    useEffect (()=> {
        if(authorizationResult === 'error400'){
            setInpurErrorOne(true);
            setInpurErrorTwo(true);
        }
    }, [authorizationResult])

    const errorStyle = (authorizationResult === 'error400') ? {color:' #363636', margin:'0 0 0 15px '}: {};

    return  (
        <div className="identification">
            <h3 className='identification__title'> Вход в личный кабинет </h3>
            
            <form className='identification__form'
                onSubmit= {(e)=> handleSubmit(onSubmit(e))} >
    
                <div className={activeInputOne} style={{borderBottom:`1px solid ${borderOneColor}`}}>
                    <label className='identification__form-label' 
                            htmlFor="identifier"> 
                            Логин 
                    </label>
                    <input className='identification__form-input' 
                        {...identifier} 
                        type="text"
                        id='identifier'
                        onFocus={()=> setActiveInputOne('identification__form-wrapper-active')} 
                        onBlur={(e)=> onBlurIdentifier(e)}
                        onChange={(e)=> {
                                identifier.onChange(e);
                                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                            (e.target.value.length > 0) && setInpurErrorOne(false)}}
                        name="identifier"/>
                        
                </div>
                {(inpurErrorOne && authorizationResult !== 'error400')  
                            && <p className='identification__form-help' 
                                style={{color:' #F42C4F'}}> Поле не может быть пустым</p> }
               
                <div className={activeInputTwo} style={{borderBottom:`1px solid ${borderTwoColor}`}}>
                    <label className='identification__form-label' htmlFor="password">Пароль</label>
                    <input type={showPassword ? 'text' : 'password'}
                        {...password} 
                        id='password'
                        className='identification__form-input'
                        onFocus={()=> setActiveInputTwo('identification__form-wrapper-active')}
                        onBlur={(e)=> onBlurPassword(e)}
                        onChange={(e)=>{
                            identifier.onChange(e);
                            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                            (e.target.value.length > 0) && setInpurErrorTwo(false)}}/>

                    {data.password &&   <button className='identification__form-button_show' 
                                                type='button' onClick={()=> setShowPassword(!showPassword)}>
                                            <img src={(showPassword)? eye_open :  eye_closed} alt="eye"/>
                                        </button>}
                </div>

                {(inpurErrorTwo && authorizationResult !== 'error400') && <p className='identification__form-help' 
                                                                style={{color:' #F42C4F'}}> Поле не может быть пустым </p>}

                {authorizationResult === 'error400' && <p className='identification__form-help' 
                                                         style={{color:' #F42C4F', margin: '20px 0 0 15px'}}> 
                                                            Неверный логин или пароль! </p>}

                <Link to='/forgot-pass' className="identification__form-link"  style={errorStyle} > 
                        {authorizationResult === 'error400'
                                ? 'Востоновить?'
                                : 'Забыли логин или пароль?'  } </Link> 
                <button type='submit' className={(inpurErrorTwo || inpurErrorOne)
                                                ? 'identification__form-submit-block'
                                                : 'identification__form-submit'}
                                                disabled= {(inpurErrorTwo || inpurErrorOne)? true : false} >
                        Вход
                </button>
            </form>
            <div className="identification__transition">
                <h4 className="identification__transition-title">Нет учётной записи?</h4>
                <Link to='/registration' onClick={()=> dispatch(setRegistrationStep(1))} 
                                        className="identification__transition-link">
                    Регистрация
                </Link>
            </div>
        </div>
    )
}