/* eslint-disable array-callback-return */
import {useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { setRegistrationData,setRegistrationStep} from '../../redux/slice/identification-slice'
import arrow from '../../resources/icon/arrow.svg'
import eye_open from '../../resources/icon/eye_open.svg'
import eye_closed from '../../resources/icon/eye-closed.svg'
import successful_сheck from '../../resources/icon/successful-сheck.svg'

// eslint-disable-next-line complexity
export const StepOne = () => {
    const dispatch = useDispatch()
   
    const [activeInputOne , setActiveInputOne] = useState ('identification__form-wrapper');
    const [activeInputTwo , setActiveInputTwo] = useState ('identification__form-wrapper');

    const [inpurErrorOne,setInpurErrorOne] = useState(false);
    const [inpurErrorTwo,setInpurErrorTwo] = useState(false);
    const [showPassword , setShowPassword] = useState(false);

    const borderOneColor = (inpurErrorOne) ? '#F42C4F' : '#BFC4C9' ;
    const borderTwoColor = (inpurErrorTwo) ? '#F42C4F' : '#BFC4C9' ;

    const {register,handleSubmit,formState: { errors } ,watch} = useForm({
        criteriaMode: 'all',
        mode:'onChange',
        defaultValues: { username: '', password: ''},
    });
    const data = watch();

    const username = register('username', { required: true,
                    validate:{
                        onlyString: (value) => /(?=.*?[A-Za-z])/.test(value) || 'латинский алфавит',
                        onlyNumber: (value) => /(?=.*?[0-9])/.test(value) || 'и цифры',
                        }
                    }
                )

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
        if(!errors.password && !errors.username && data.password && data.username){
            dispatch(setRegistrationStep(2));
            dispatch(setRegistrationData(data))
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (!data.password) && setInpurErrorTwo(true);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (!data.username) && setInpurErrorOne(true);
    }
 
    const onBlurUserName = (e) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (errors.username || e.target.value === '' )
                            ? setInpurErrorOne(true)
                            : setInpurErrorOne(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions, no-negated-condition
        (e.target.value !== '') ? setActiveInputOne('identification__form-wrapper-active')
                                : setActiveInputOne('identification__form-wrapper-active')
    }

    const onBlurPassword = (e) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (inpurErrorTwo || e.target.value === '' )
                            ? setInpurErrorTwo(true)
                            : setInpurErrorTwo(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions, no-negated-condition
        (e.target.value !== '') ? setActiveInputTwo('identification__form-wrapper-active')
                                : setActiveInputTwo('identification__form-wrapper')
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

    const onChangeUserName= (()=> setErrorText('Используйте для логина латинский алфавит и цифры', errors.username))

    const onChangePassword = (()=> setErrorText('Пароль,не менее 8 символов,, с заглавной буквой, и цифрой', errors.password))

    const userNameErorr = onChangeUserName();
    const passwordErorr = onChangePassword();

    const {str: strUser , arr: arrUser} = userNameErorr;
    const {str: strPassword , arr: arrPassword} = passwordErorr;

    let countUser = 0;
    let countPassword = 0;

    return  (
        <div className="identification">
            <h3 className='identification__title'> Регистрация </h3>
            <h4 className="identification__subtitle"> 1 шаг из 3 </h4>
             
            <form className='identification__form '
                onSubmit={(e) => handleSubmit(onSubmit(e))}>
    
                <div className={activeInputOne} style={{borderBottom:`1px solid ${borderOneColor}`}} >
                    <label className='identification__form-label'
                            htmlFor="username">
                         Придумайте логин для входа 
                    </label>

                    <input type="text" {...username}
                            id='username'
                            className='identification__form-input' 
                            onClick={() => setInpurErrorOne(false)}
                            onFocus={()=> setActiveInputOne('identification__form-wrapper-active')}
                            onBlur={(e)=> onBlurUserName(e)}
                            onChange={(e)=> {
                                username.onChange(e)
                                onChangeUserName(e)
                        }}/>
                
                </div>
                    
                    <div className='identification__form-help' > 
                        {inpurErrorOne 
                            ? <span style={{color:' #F42C4F'}}> {(data.username) ?  'Используйте для логина латинский алфавит и цифры'
                                                                                                    : 'Поле не может быть пустым'}
                                </span>
                            : (errors.username && errors.username.type !== 'required' )
                                            ? <span>
                                            { strUser.split(' ').map((i,index) => {
                                                const key = Math.random()+ index;
            
                                                // eslint-disable-next-line no-return-assign
                                                return (i === 'errors') 
                                                    ? (countUser = 1 + countUser, <span key ={key} style={{color:' #F42C4F'}}> {arrUser[countUser -1]} </span>)
                                                    : <span>{`${i} `}</span>
                                            })}
                                            </span>
                                            : <span> Используйте для логина латинский алфавит и цифры</span>
                        }
                    </div>
                    
                <div className={activeInputTwo} style={{borderBottom:`1px solid ${borderTwoColor}`}}>
                    <label className='identification__form-label' 
                    htmlFor="password"> Пароль</label>
                    <input type={showPassword ? 'text' : 'password'}
                        className='identification__form-input' 
                            {...password} 
                            id='password'
                        onClick={() => setInpurErrorTwo(false)}
                        onFocus={()=> setActiveInputTwo('identification__form-wrapper-active')}
                        onBlur={(e)=> onBlurPassword(e)}
                        onChange={(e)=> {
                            password.onChange(e);
                            onChangePassword()
                        }}/>

                       {
                        (!errors.password && data.password.length !== 0)
                            && <img className='identification__form-successful_сheck' src={successful_сheck} alt="successful сheck" /> 
                       }
                        
                        <button className='identification__form-button_show' type='button'
                            onClick={()=> setShowPassword(!showPassword)}>
                            <img src={(showPassword)? eye_open :  eye_closed} alt="eye"/>
                        </button>
                </div>

                <div className='identification__form-help' > 
                        {inpurErrorTwo
                            ? <span style={{color:' #F42C4F'}}> {(data.password && errors.password) ?  'Пароль не менее 8 символов , с заглавной буквой и цифрой'
                            : 'Поле не может быть пустым'}
                                </span>
                            : (errors.password && errors.password.type !== 'required' )
                                            ? <span>
                                            { strPassword.split(',').map((i,index) => {
                                                const key = Math.random()+ index;

                                                // eslint-disable-next-line no-return-assign
                                                return (i.includes('errors')) 
                                                    ? (countPassword = 1 + countPassword, <span key ={key} style={{color:' #F42C4F'}}> {arrPassword[countPassword -1]} </span>)
                                                    : <span>{`${i} `}</span>
                                            })}
                                            </span>
                                            : (!data.password && inpurErrorTwo) ? null : <span> Пароль не менее 8 символов, с заглавной буквой и цифрой</span>
                            }
                    </div>
               
                <input 
                    className={(errors.password || errors.username)? 'identification__form-submit-block' : 'identification__form-submit'} 
                    type="submit" value="следующий шаг"
                    disabled= {(inpurErrorTwo || inpurErrorOne) ? true : false }
                    />
            </form>
            <div className="identification__transition">
                <h4 className="identification__transition-title">Есть учётная запись?</h4>
                <Link to='/auth' className="identification__transition-link"> войти 
                    <img src={arrow}  className="identification__transition-icon" alt="arrow" />
                </Link>
            </div>
        </div>
    )
}