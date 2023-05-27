/*eslint-disable*/
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    style: 'book-column',
}

const bookListStyleSlice = createSlice({
    name: 'styleBookList',
    initialState,
    reducers: {   
        bookListStyleChangeColumn: state => { state.style = 'book-column'},  
        bookListStyleChangeRow: state => { state.style= 'book-row'}
    }
});

const {actions,reducer: bookListStyle} = bookListStyleSlice;
const {bookListStyleChangeColumn,bookListStyleChangeRow} = actions;

export {bookListStyleChangeColumn,bookListStyleChangeRow,bookListStyle};
