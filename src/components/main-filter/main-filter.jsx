/* eslint-disable jsx-a11y/no-autofocus */
import { useState } from 'react'
import { useDispatch , useSelector} from 'react-redux';
import classNames from 'classnames';

import { bookListStyleChangeColumn,bookListStyleChangeRow } from '../../redux/slice/book-list-style-slice'
import { setRaiseFilter , setValueInput} from '../../redux/slice/filters-slice'
import  close_input  from '../../resources/icon/close_input.svg';

export const MainFilter = () => {
    const valueInput = useSelector((state)=> state.filters.valueInput);
    const [oneBtn,setOneBtn] = useState('filter__btn-button active');
    const [twoBtn,setTwoBtn] = useState('filter__btn-button');
    const [sortAscending, setSortAscending] = useState(true);
    const [inputShow , setInputShow] = useState(false);
    const dispatch = useDispatch();

    const setClassName = () => {
       if(oneBtn.includes('active') >= 1 ){
            setOneBtn('filter__btn-button');
            setTwoBtn('filter__btn-button active');
            dispatch(bookListStyleChangeRow());
       }else if (twoBtn.includes('active') >= 1){
            setOneBtn('filter__btn-button active');
            setTwoBtn('filter__btn-button');
            dispatch(bookListStyleChangeColumn());
       }
    }

    const setFilterAscending = () => {
        setSortAscending(!sortAscending);
        dispatch(setRaiseFilter());
    }

    const setFilterDescending = () =>{
        setSortAscending(!sortAscending);
        dispatch(setRaiseFilter())
    }

    const showInput = () => {
        setInputShow(true); 
    }

    const hideInput = () => {
        setInputShow(false);
    }

    return (
        <div className="filter">
            <div className="filter__wrapper-input">
                
                <div className="filter__input">
                   
                        {inputShow 
                            ? null
                            :   <button type='button' className='filter__input-search-btn' onClick={()=> showInput()}>
                                    <svg>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className='filter__input-search-input-icon'>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M7.3335 2.66671C4.75617 2.66671 2.66683 4.75605 2.66683 7.33337C2.66683 9.9107 4.75617 12 7.3335 12C9.91083 12 12.0002 9.9107 12.0002 7.33337C12.0002 4.75605 9.91083 2.66671 7.3335 2.66671ZM1.3335 7.33337C1.3335 4.01967 4.01979 1.33337 7.3335 1.33337C10.6472 1.33337 13.3335 4.01967 13.3335 7.33337C13.3335 10.6471 10.6472 13.3334 7.3335 13.3334C4.01979 13.3334 1.3335 10.6471 1.3335 7.33337Z" fill="#A7A7A7"/>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.6284 10.6286C10.8887 10.3683 11.3108 10.3683 11.5712 10.6286L14.4712 13.5286C14.7315 13.789 14.7315 14.2111 14.4712 14.4714C14.2108 14.7318 13.7887 14.7318 13.5284 14.4714L10.6284 11.5714C10.368 11.3111 10.368 10.889 10.6284 10.6286Z" fill="#A7A7A7"/>
                                        </svg>  
                                    </svg>
                                </button>}

                                <label  htmlFor="search">
                                    
                                    <input  name='search' 
                                            placeholder='Поиск книги или автора…' 
                                            type="text"
                                            value = {valueInput}
                                            className={classNames('filter__input-search-mobile',
                                                     {filter__search_visible : inputShow })}
                                            onChange = {(e)=> dispatch(setValueInput(e.target.value))}/>

                                { inputShow
                                    ? <button type='button' className='filter__input-search-button-close' onClick={()=> hideInput()}>
                                            <img src={close_input} alt="close_input" />
                                        </button> 
                                    : null }
                        </label>

                        <label htmlFor="search" className='filter__input-search'>
                            <input name='search' placeholder='Поиск книги или автора…'
                             type="text" value = {valueInput}
                            className={classNames('filter__input-search-input',
                                     {filter__search_visible : inputShow })}
                                     onChange = {(e)=> dispatch(setValueInput(e.target.value))}/>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className='filter__input-search-input-icon'>
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.3335 2.66671C4.75617 2.66671 2.66683 4.75605 2.66683 7.33337C2.66683 9.9107 4.75617 12 7.3335 12C9.91083 12 12.0002 9.9107 12.0002 7.33337C12.0002 4.75605 9.91083 2.66671 7.3335 2.66671ZM1.3335 7.33337C1.3335 4.01967 4.01979 1.33337 7.3335 1.33337C10.6472 1.33337 13.3335 4.01967 13.3335 7.33337C13.3335 10.6471 10.6472 13.3334 7.3335 13.3334C4.01979 13.3334 1.3335 10.6471 1.3335 7.33337Z" fill="#A7A7A7"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M10.6284 10.6286C10.8887 10.3683 11.3108 10.3683 11.5712 10.6286L14.4712 13.5286C14.7315 13.789 14.7315 14.2111 14.4712 14.4714C14.2108 14.7318 13.7887 14.7318 13.5284 14.4714L10.6284 11.5714C10.368 11.3111 10.368 10.889 10.6284 10.6286Z" fill="#A7A7A7"/>
                            </svg>
                        </label>
                        
                        {inputShow 
                            ? null 
                            : (sortAscending)
                                ?    <button  type='button' className='filter__input-rating filter__input-rating-ascending' onClick={()=> setFilterAscending()}>
                                         По рейтингу 
                                    </button>                
                                :  <button type='button' className='filter__input-rating filter__input-rating-descending' onClick={()=> setFilterDescending()}>
                                        По рейтингу
                                    </button>}
                </div>
                
            </div>
            {inputShow 
                ? null
                : <div className="filter__btn">
                    <button className={oneBtn} type="button" onClick={()=> setClassName()}>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                            <path  d="M1.52273 0.875C1.165 0.875 0.875 1.165 0.875 1.52273V6.70455C0.875 7.06228 1.165 7.35227 1.52273 7.35227H6.70455C7.06228 7.35227 7.35227 7.06228 7.35227 6.70455V1.52273C7.35227 1.165 7.06228 0.875 6.70455 0.875H1.52273ZM2.17045 6.05682V2.17045H6.05682V6.05682H2.17045ZM9.29545 0.875C8.93773 0.875 8.64773 1.165 8.64773 1.52273V6.70455C8.64773 7.06228 8.93773 7.35227 9.29545 7.35227H14.4773C14.835 7.35227 15.125 7.06228 15.125 6.70455V1.52273C15.125 1.165 14.835 0.875 14.4773 0.875H9.29545ZM9.94318 6.05682V2.17045H13.8295V6.05682H9.94318ZM0.875 9.29545C0.875 8.93773 1.165 8.64773 1.52273 8.64773H6.70455C7.06228 8.64773 7.35227 8.93773 7.35227 9.29545V14.4773C7.35227 14.835 7.06228 15.125 6.70455 15.125H1.52273C1.165 15.125 0.875 14.835 0.875 14.4773V9.29545ZM2.17045 9.94318V13.8295H6.05682V9.94318H2.17045ZM9.29545 8.64773C8.93773 8.64773 8.64773 8.93773 8.64773 9.29545V14.4773C8.64773 14.835 8.93773 15.125 9.29545 15.125H14.4773C14.835 15.125 15.125 14.835 15.125 14.4773V9.29545C15.125 8.93773 14.835 8.64773 14.4773 8.64773H9.29545ZM9.94318 13.8295V9.94318H13.8295V13.8295H9.94318Z" fill="#A7A7A7"/>
                        </svg>
                    </button>
                    <button className={twoBtn} type="button" onClick={()=> setClassName()}>
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                            <path d="M2.0835 10C2.0835 9.56282 2.43794 9.20837 2.87516 9.20837H17.1252C17.5624 9.20837 17.9168 9.56282 17.9168 10C17.9168 10.4373 17.5624 10.7917 17.1252 10.7917H2.87516C2.43794 10.7917 2.0835 10.4373 2.0835 10Z" fill="#A7A7A7"/>
                            <path  d="M2.0835 5.25004C2.0835 4.81282 2.43794 4.45837 2.87516 4.45837H17.1252C17.5624 4.45837 17.9168 4.81282 17.9168 5.25004C17.9168 5.68727 17.5624 6.04171 17.1252 6.04171H2.87516C2.43794 6.04171 2.0835 5.68727 2.0835 5.25004Z" fill="#A7A7A7"/>
                            <path  d="M2.0835 14.75C2.0835 14.3128 2.43794 13.9584 2.87516 13.9584H17.1252C17.5624 13.9584 17.9168 14.3128 17.9168 14.75C17.9168 15.1873 17.5624 15.5417 17.1252 15.5417H2.87516C2.43794 15.5417 2.0835 15.1873 2.0835 14.75Z" fill="#A7A7A7"/>
                        </svg>
                    </button>
                </div> }
         </div>
    )
}

