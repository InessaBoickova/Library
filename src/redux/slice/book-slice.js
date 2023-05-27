import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    booksList : [],
    book: [],
    listOfGenres: [],
    loading : false,
    error: false,
}

const bookSlice = createSlice({
    name: 'book',
    initialState,
    // eslint-disable-next-line no-param-reassign
    reducers: {
        // eslint-disable-next-line no-param-reassign
        setBooksList: (state,action) => { state.booksList =  action.payload},
        // eslint-disable-next-line no-param-reassign
        setBook: (state,action) => {  state.book = action.payload},
        // eslint-disable-next-line no-param-reassign
        setListOfGenres: (state,action) => { state.listOfGenres = action.payload},
        // eslint-disable-next-line no-param-reassign
        setLoading: (state,action) => { state.loading = action.payload},
        // eslint-disable-next-line no-param-reassign
        setError: (state,action) => { state.error = action.value},
    }
});

const {actions,reducer: book} = bookSlice;
const {setBooksList,setBook,setListOfGenres,setLoading,setError} = actions;

export {setBook,setBooksList,setError,setLoading,setListOfGenres, book};
