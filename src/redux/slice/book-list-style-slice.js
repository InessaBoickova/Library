import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    style: 'book-column',
}

const bookListStyleSlice = createSlice({
    name: 'styleBookList',
    initialState,
    // eslint-disable-next-line no-param-reassign
    reducers: {
        // eslint-disable-next-line no-param-reassign
        bookListStyleChangeColumn: state => { state.style = 'book-column'},
    // eslint-disable-next-line no-param-reassign
        bookListStyleChangeRow: state => { state.style= 'book-row'}
    }
});


const {actions,reducer: bookListStyle} = bookListStyleSlice;
const {bookListStyleChangeColumn,bookListStyleChangeRow} = actions;

export {bookListStyleChangeColumn,bookListStyleChangeRow,bookListStyle};
