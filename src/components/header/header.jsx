/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import {openNavMenu,setAuthorizationResult} from '../../redux/actions/actions'
import userImg from '../../resources/icon/avatar.png';
import logo from '../../resources/icon/logo.png';

export const Header = () => {
        const [showPanel, setShowPanel] = useState(false)
        const dispatch = useDispatch();
        const navMenuOpen = useSelector(state=> state.listMenu.navMenuOpen);

        // const user = JSON.parse(localStorage.getItem('user'));
        // const {username} = user

        const disableScrolling = ()=> {
                const x = window.scrollX;
                const y = window.scrollY;
        
                window.onscroll=() =>{window.scrollTo(x, y);};
        }
        
        const enableScrolling = () => {
                window.onscroll= () => {};
        }
     
        if (navMenuOpen){
                disableScrolling();
        }else {
                enableScrolling();
        }

        const showNavMenu = () => {
                dispatch(openNavMenu()); 
        }

        const onExit = () => {
                localStorage.removeItem('token');
                // localStorage.removeItem('user');
                // dispatch(setAuthorizationResult(''))
        }
        
        return (
                <header className='header'>
                        <div className="container">

                                <div className="header__wrapper" >
                                        <div className={classNames('header__hamburger', {header__hamburger_visible : navMenuOpen})} tabIndex="0" role="button" onClick={(e)=> showNavMenu(e)}>
                                                <span> </span>
                                                <span> </span>
                                                <span> </span>
                                        </div>

                                        <div className='header__logo' >
                                                <Link to='/books/all'>
                                                        <img src={logo} alt="logo" className='header__logo-img' />
                                                </Link>
                                        </div>

                                        <div className="header__title">
                                                <h1>Библиотека</h1>
                                        </div>

                                        <button className="header__user" type='button' onClick={()=> setShowPanel(!showPanel)}>
                                                <h3>Привет, Иван</h3>
                                                <img src={userImg} alt="user" />
                                        </button>

                                        <div className={showPanel ? 'header__user-panel-show' : 'header__user-panel'}> 
                                                              
                                                <Link to='/auth'onClick={()=> onExit()} 
                                                        className='header__user-panel_link'>
                                                        Выход
                                                </Link>
                                     
                                        </div>
                                </div>
                        </div>
                </header>
        )
};


