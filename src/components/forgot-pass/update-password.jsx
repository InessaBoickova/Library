import {Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'

import eye_open from '../../resources/icon/eye_open.svg'
import eye_closed from '../../resources/icon/eye-closed.svg'
import successful_сheck from '../../resources/icon/successful-сheck.svg'
import { useIdentificationServices } from '../../services/identification'

import { ForgotPassNotify } from './forgot-pass-notify'

// eslint-disable-next-line complexity
const UpdatePasswordForm = () => {
    const location = useLocation();
    const {UpdatePasswordUser} = useIdentificationServices()
   
    const [activeInputOne , setActiveInputOne] = useState ('identification__form-wrapper');
    const [activeInputTwo , setActiveInputTwo] = useState ('identification__form-wrapper');

    const [inpurErrorOne,setInpurErrorOne] = useState(false);
    const [inpurErrorTwo,setInpurErrorTwo] = useState(false);
    const [showPasswordOne , setShowPasswordOne] = useState(false);
    const [showPasswordTwo , setShowPasswordTwo] = useState(false);

    const borderOneColor = (inpurErrorOne) ? '#F42C4F' : '#BFC4C9' ;
    const borderTwoColor = (inpurErrorTwo) ? '#F42C4F' : '#BFC4C9' ;

    const {register,handleSubmit,formState: { errors } ,watch} = useForm({
        criteriaMode: 'all',
        mode:'onChange',
        defaultValues: { password: '', passwordConfirmation: ''},
    });
    const data = watch();

    const passwordConfirmation = register('passwordConfirmation', { required: true})

    const password = register('password', { required: true, 
                            validate: {
                                onLength  : (value) => /(?=^.{8,}$)/.test(value) || 'не менее 8 символов,',
                                onlyUppercase: (value) => /(?=.*?[A-Z])/.test(value) || 'с заглавной буквой',
                                onlyNumber: (value) => /(?=.*?[0-9])/.test(value) || 'и цифрой',
                                }
                            }
                        )
  
    const onSubmit = (e) => {
        e.preventDefault();
        if (data.password === data.passwordConfirmation){
            UpdatePasswordUser({...data,  'code': location.search.substring(6)})
        }
    }
 
    const onBlurPasswordConfirmation = (e) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            ((errors.passwordConfirmation || e.target.value === '') || (e.target.value !== data.password) )
                    ? setInpurErrorTwo(true)
                    : setInpurErrorTwo(false);

            // eslint-disable-next-line @typescript-eslint/no-unused-expressions, no-negated-condition
            (e.target.value !== '') ? setActiveInputTwo('identification__form-wrapper-active')
                            : setActiveInputTwo('identification__form-wrapper')
    }

    const onBlurPassword = (e) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (errors.password || e.target.value === '')
                            ? setInpurErrorOne(true)
                            : setInpurErrorOne(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions, no-negated-condition
        (e.target.value !== '') ? setActiveInputOne('identification__form-wrapper-active')
                                : setActiveInputOne('identification__form-wrapper')
    }

    const setErrorText= (string,type) => {
        let str = string;
        const {types} = (type)? type : {types: ''};
        const arr = [];

        // eslint-disable-next-line no-restricted-syntax, guard-for-in, no-unreachable-loop
        for ( const [,value] of Object.entries(types)) {
            if(value !== true){
                arr.push(value)
                str = str.replace(value, 'errors');
            }
        }

        return {str,arr};
    }
    // eslint-disable-next-line consistent-return
    const onChangePassword = (()=>setErrorText('Пароль,не менее 8 символов,, с заглавной буквой, и цифрой', errors.password) )

    const passwordErorr = onChangePassword();

    const {str: strPassword , arr: arrPassword} = passwordErorr;

    let countPassword = 0;

    return  (
        <div className="identification">
            <h3 className='identification__title'> Восстановление пароля </h3>
         
                <form className='identification__form'
                    onSubmit={(e) => handleSubmit(onSubmit(e))}>

                    <div className={activeInputOne} style={{borderBottom:`1px solid ${borderOneColor}`}}>
                        <label className='identification__form-label' 
                             htmlFor="password"> 
                             Пароль
                        </label>
                        <input type={showPasswordOne ? 'text' : 'password'}
                            className='identification__form-input' 
                                {...password} id='password'
                                onClick={() => setInpurErrorOne(false)}
                                onFocus={()=> setActiveInputOne('identification__form-wrapper-active')}
                                onBlur={(e)=> onBlurPassword(e)}
                                onChange={(e)=> {
                                    password.onChange(e);
                                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                                      e.target.value < 0 ? setInpurErrorOne(true): onChangePassword(e)}}/>

                            {(!errors.password && data.password.length !== 0)
                                    && <img className='identification__form-successful_сheck'src={successful_сheck} alt="successful сheck" /> }
                            
                            {data.password.length >= 1 
                                    &&  <button className='identification__form-button_show' 
                                                type='button' 
                                                onClick={()=> setShowPasswordOne(!showPasswordOne)}>
                                            <img src={(showPasswordOne)? eye_open :  eye_closed} alt="eye"/>
                                        </button>}
                    </div>

                    <div className='identification__form-help' > 
                        {inpurErrorOne 
                            ? <span  style={{color:' #F42C4F'}}> 
                                        {(data.password && errors.password) 
                                                    ?  'Пароль не менее 8 символов , с заглавной буквой и цифрой'
                                                    : 'Поле не может быть пустым'}
                                </span>
                            : (errors.password && errors.password.type !== 'required' )
                                            ? <span>
                                            {strPassword.split(',').map((i,index) => {
                                                const key = Math.random()+ index;

                                                // eslint-disable-next-line no-return-assign
                                                return (i.includes('errors')) 
                                                    ? (countPassword = 1 + countPassword, <span key ={key} style={{color:' #F42C4F'}}> {arrPassword[countPassword -1]} </span>)
                                                    : <span>{`${i} `}</span>
                                            })}
                                            </span>
                                            : (!data.password && inpurErrorOne) ? null : <span> Пароль не менее 8 символов, с заглавной буквой и цифрой</span>}
                    </div>

                    <div className={activeInputTwo} style={{borderBottom:`1px solid ${borderTwoColor}`}} >
                        <label className='identification__form-label'
                                htmlFor="passwordConfirmation">
                                Повторите пароль
                        </label>
                        <input type={showPasswordTwo ? 'text' : 'password'}
                                {...passwordConfirmation}
                                id='passwordConfirmation'
                                className='identification__form-input' 
                                onFocus={()=> setActiveInputTwo('identification__form-wrapper-active')}
                                onBlur={(e)=> onBlurPasswordConfirmation(e)}
                                onClick={()=> setInpurErrorTwo(false)}
                                onChange={(e)=> passwordConfirmation.onChange(e)}/>

                        {data.passwordConfirmation.length >= 1 
                                &&  <button className='identification__form-button_show' type='button' 
                                            onClick={()=> setShowPasswordTwo(!showPasswordTwo)}>
                                        <img src={(showPasswordTwo)? eye_open :  eye_closed} alt="eye"/>
                                    </button>}
                    </div>

                    {(inpurErrorTwo) && 
                            <span className='identification__form-help' style={{color:' #F42C4F'}}> 
                                    {(data.password !== data.passwordConfirmation && data.passwordConfirmation.length > 0) 
                                                        ? 'Пароли не совпадают' 
                                                        :'Поле не может быть пустым '} 
                            </span> }
                    
                    <input className={(errors.password || inpurErrorTwo)
                                ? 'identification__form-submit-block' 
                                : 'identification__form-submit'} 
                        type="submit" value="сохранить изменения"
                        disabled= {(inpurErrorTwo || inpurErrorOne) ? true : false }/>
                </form>
                <div className="identification__transition">
                    <h4 className="identification__transition-title" style={{textAlign:'start'}}> 
                        После сохранения войдите в библиотеку, используя новый пароль
                    </h4>
                </div>
        </div>
    )
}

export const UpdatePassword = () => {
    const location = useLocation();
    const forgotPassResult = useSelector(state => state.identification.forgotPassResult)

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <Fragment>
            {(location.search && (forgotPassResult === 'successSaveNewData' ||forgotPassResult === 'errorSaveData'  ) )
                ? <ForgotPassNotify/> 
                : <UpdatePasswordForm/>}
        </Fragment>
    )
}