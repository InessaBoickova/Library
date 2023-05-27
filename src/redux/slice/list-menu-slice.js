import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    navMenuOpen: false,
    showListBook: true,
}

const listMenuSlice = createSlice({
    name: 'listMenu',
    initialState,
    // eslint-disable-next-line no-param-reassign
    reducers: {
        // eslint-disable-next-line no-param-reassign
        openNavMenu: (state) => { state.navMenuOpen = !state.navMenuOpen },
        // eslint-disable-next-line no-param-reassign
        showListMenu: (state) => { state.showListBook = !state.showListBook },
        // eslint-disable-next-line no-param-reassign
        hideListMenu: (state) => { state.showListBook =  false },
        
    }
});

const {actions,reducer: listMenu} = listMenuSlice;
const {openNavMenu,showListMenu,hideListMenu} = actions;

export {openNavMenu,showListMenu,hideListMenu, listMenu};