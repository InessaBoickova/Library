/*eslint-disable*/
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useBooksServices } from '../../services/books';

const initialState = {
    booksList : [],
    book: [],
    listOfGenres: [],
    loading : false,
    error: false,
    navMenuOpen: false,
    showListBook: true,
}

const booksRequest = useBooksServices();

const getBooksList = createAsyncThunk (
    'book/getBooksList',
    () =>  booksRequest('api/books')  
);

const getBook = createAsyncThunk (
    'book/getBook',
    (id) =>  booksRequest(`api/books/${id}`)  
);

const getListOfGenres = createAsyncThunk (
    'book/getListOfGenres',
    () =>  booksRequest('api/categories')  
);

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {     
        setBooksList: (state,action) => { state.booksList =  action.payload},    
        setLoading: (state,action) => { state.loading = action.payload},    
        setError: (state,action) => { state.error = action.value},
        openNavMenu: (state) => { state.navMenuOpen = !state.navMenuOpen },    
        showListMenu: (state) => { state.showListBook = !state.showListBook },   
        hideListMenu: (state) => { state.showListBook =  false },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getBooksList.pending, state => {state.loading === true})
            .addCase(getBooksList.fulfilled, (state, {payload}) => {
                state.loading === false;
                state.booksList =  payload
            })
            .addCase(getBooksList.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(getBook.pending, state => {state.loading === true})
            .addCase(getBook.fulfilled, (state,{payload}) => {
                state.book = payload;
                state.loading === false;
            })
            .addCase(getBook.rejected, (state) => {
                state.loading = false;
                state.error = true
            })
            .addCase(getListOfGenres.pending, state => {state.loading === true})
            .addCase(getListOfGenres.fulfilled, (state,{payload}) => {
                state.listOfGenres = payload;
                state.loading = false;
            })
            .addCase(getListOfGenres.rejected, state => {
                state.loading = false;
                state.error = true
            })
    }
});

const {actions,reducer: book} = bookSlice;
const {setLoading, setBooksList,setError, openNavMenu, showListMenu, hideListMenu} = actions;

export {setError,setBooksList, setLoading, openNavMenu, getBook, getListOfGenres , showListMenu, getBooksList ,hideListMenu, book};
