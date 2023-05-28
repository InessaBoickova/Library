/*eslint-disable*/
import {useEffect, useRef } from 'react';
import {useDispatch,useSelector } from 'react-redux';
import { NavLink , useLocation,useParams } from 'react-router-dom';
import classNames from 'classnames';
import { createSelector } from '@reduxjs/toolkit';


import { setActiveFilter } from '../../redux/slice/filters-slice'
import {setAuthorizationResult} from '../../redux/slice/identification-slice';
import {hideListMenu,openNavMenu,showListMenu,getListOfGenres} from '../../redux/slice/book-slice';
import close_vector from '../../resources/icon/close_vector.svg'
import raise_vector from '../../resources/icon/raise_vector.svg'

export const NavMenu = () => {
    const location = useLocation();
    const params = useParams();
    const dispatch = useDispatch();
    const navMenuOpen = useSelector(state => state.book.navMenuOpen);
    const showListBook = useSelector(state => state.book.showListBook);
    const loading = useSelector(state => state.book.loading);
    const error = useSelector(state => state.book.error);
    const ref = useRef();


    const listSelector = createSelector(
        (state) => state.book.booksList,
        (state) => state.book.listOfGenres,
        (booksList , listOfGenres) => {
            const arr = booksList.map((item) => item.categories)
        
            const list = arr.flat(3).reduce((cnt, cur) => (cnt[cur] = cnt[cur] + 1 || 1, cnt), {});
       
            const result = listOfGenres.map((i)=> ({
                    ...i,
                    number: list[i.name],
                }))

            return result; 
        }
      )

    useEffect (()=> {
        dispatch(getListOfGenres());

    },[])
    
    const listOfGenres = useSelector(listSelector);

    useEffect (()=> {
        if ( location.pathname !== '/books/all' && window.innerWidth < 769 && !error && !params.bookId && params.pathname !== 'terms'  && params.pathname !== 'contract'){
            dispatch(hideListMenu());
            dispatch(hideListMenu());
            dispatch(openNavMenu());
        }

    },[dispatch, loading, location])

    const onExit = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch(setAuthorizationResult(''))
    }
   
    const list = listOfGenres.map((i)=>{
        const {name,path,number} = i;
        
        return  (
            <li key={name}>
                <NavLink  className={({isActive}) => isActive ? 'active__link': 'menu__link '} onClick={()=> dispatch(setActiveFilter(name))}
                to={`/books/${path}`}>
                    <p> <span className='menu__name'>{name}</span> 
                        <span>{number ? number : 0}</span>
                    </p>  
                </NavLink>
            </li>
        )
    })
   
    return (
        <section className={classNames('menu', {visible : navMenuOpen})} ref={ref}>
            <ul className='menu__list'> 
                   
                <div className='menu__list-wrap'>
                    <NavLink to='/books' className={({isActive}) => isActive ? 'active_link' : 'menu__link-main'}>
                        Витрина книг
                    </NavLink> 
                    <button type='button'  className = 'menu__btn' onClick={()=> dispatch(showListMenu())}>
                        <img  src={showListBook ? close_vector :  raise_vector} alt="vector" 
                            className='menu__vector'/>
                    </button>
                </div>

                <div className={classNames('menu_list_hide', {menu_list_hide_visible : showListBook})}>
                
                    {list.length > 3 ? [<li key= {list.length + 1}>
                        <NavLink  className={({isActive}) => isActive ? 'active__link': 'menu__link '} 
                            to="/books/all" onClick={()=> dispatch(setActiveFilter('Все книги'))}>
                            <p> <span className='menu__name'>{'Все книги'.trim()}</span></p>
                        </NavLink>
                    </li>, ...list]
                      : null}

                </div>         
            
                <li className='menu__link-mt menu__link-main' >
                    <NavLink  to='/terms'
                    className={({isActive}) => isActive ? 'active_link': 'menu__link-main' }>
                        Правила пользования
                    </NavLink>
                </li>
                <li className='menu__link-main'>
                    <NavLink to='/contract'
                    className={({isActive}) => isActive ? 'active_link' : 'menu__link-main'}>
                       Договор оферты
                    </NavLink>
                </li>

               <div className="menu__hide">
                    
                    <li className='menu__hide_link'>
                        <NavLink to='/auth' onClick={()=> onExit()} 
                            className={({isActive}) => isActive ? 'menu__link-main' : 'menu__link-main'}>
                                Выход
                        </NavLink>
                    </li>
               </div>

            </ul>
        </section>
    )
}