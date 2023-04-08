import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { setRegistrationData,setRegistrationStep } from '../../redux/actions/actions'
import arrow from '../../resources/icon/arrow.svg'

export const StepTwo = () => {
    const dispatch = useDispatch();
    const [activeInputOne , setActiveInputOne] = useState ('identification__form-wrapper');
    const [activeInputTwo , setActiveInputTwo] = useState ('identification__form-wrapper');

    const [inpurErrorOne,setInpurErrorOne] = useState(false);
    const [inpurErrorTwo,setInpurErrorTwo] = useState(false);

    const borderOneColor = (inpurErrorOne) ? '#F42C4F' : '#BFC4C9' ;
    const borderTwoColor = (inpurErrorTwo) ? '#F42C4F' : '#BFC4C9' ;

    const {register, handleSubmit ,watch} = useForm({
        mode:'onChange',
        shouldUseNativeValidation: false ,
        defaultValues: { firstName: '', lastName: ''},
    });
    const data = watch();

    const onSubmit = (e) => {
        e.preventDefault();
         // eslint-disable-next-line @typescript-eslint/no-unused-expressions
         (!data.firstName) && setInpurErrorOne(true);
         // eslint-disable-next-line @typescript-eslint/no-unused-expressions
         (!data.lastName) && setInpurErrorTwo(true);
        // dispatch(setRegistrationStep(3))

        if(data.firstName && data.lastName){
            dispatch(setRegistrationStep(3));
            dispatch(setRegistrationData(data))
        }
    }

    return  (
        <div className="identification"  onSubmit={(e) => onSubmit(e)}>
            <h3 className='identification__title'> Регистрация </h3>
            <h4 className="identification__subtitle"> 2 шаг из 3 </h4>
            
            <form className='identification__form'  onSubmit={(e) => handleSubmit(onSubmit(e))}>
    
                <div className={activeInputOne} style={{borderBottom:`1px solid ${borderOneColor}`}}>
                    <label className='identification__form-label' htmlFor="firstName"> Имя </label>
                    <input type="text" className='identification__form-input' 
                        id='firstName'
                        {...register('firstName', { required: true, minLength: 1, 
                            pattern: /^(?=.*[a-zA-Z])(?=.*[0-9])/})} 
                            onClick={() => setInpurErrorOne(false)}
                        onFocus={()=> setActiveInputOne('identification__form-wrapper-active')}
                        onBlur={(e)=> (e.target.value.length < 1) && (setActiveInputOne('identification__form-wrapper'),setInpurErrorOne(true))}/> 
                </div>
                {inpurErrorOne && <p className='identification__form-help' style={{color:' #F42C4F'}}> Поле не может быть пустым</p>}
               
                <div className={activeInputTwo} style={{borderBottom:`1px solid ${borderTwoColor}`}}>
                    <label className='identification__form-label' htmlFor="lastName"> Фамилия</label>
                    <input type="text" className='identification__form-input' id='lastName'
                        {...register('lastName', { required: true})} 
                        onClick={() => setInpurErrorTwo(false)}
                        onFocus={()=> setActiveInputTwo('identification__form-wrapper-active')}
                        onBlur={(e)=> (e.target.value.length < 1) && (setActiveInputTwo('identification__form-wrapper'), setInpurErrorTwo(true))}/>
                </div>
                {inpurErrorTwo && <p className='identification__form-help' style={{color:' #F42C4F'}}> Поле не может быть пустым</p>}
              
                <input className={(inpurErrorTwo || inpurErrorOne) ? 'identification__form-submit-block' : 'identification__form-submit'}
                    type="submit" value="последний шаг" 
                    disabled= {(inpurErrorTwo || inpurErrorOne) ? true : false }/>
            </form>
            <div className="identification__transition" >
                <h4 className="identification__transition-title">Есть учётная запись?</h4>
                <Link to='/auth' className="identification__transition-link"> войти 
                    <img src={arrow}  className="identification__transition-icon" alt="arrow" />
                </Link>
            </div>
        </div>
    )
}