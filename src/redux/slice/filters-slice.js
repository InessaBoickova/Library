import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeFilter: 'Все книги',
    filteredBookList: [],
    numOfListOfGenres: [],
    raiseFilter : false,
    valueInput : ''
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    // eslint-disable-next-line no-param-reassign
    reducers: {
        // eslint-disable-next-line no-param-reassign
        setActiveFilter: (state,action) => {  state.activeFilter = action.payload},
        // eslint-disable-next-line no-param-reassign
        setRaiseFilter: (state) => { state.raiseFilter = !state.raiseFilter},
        // eslint-disable-next-line no-param-reassign
        setValueInput: (state,action) => {  state.valueInput = action.payload }, 
    }
});

const {actions,reducer: filters} = filtersSlice;
const {setActiveFilter,setRaiseFilter,setValueInput} = actions;

export {setActiveFilter,setRaiseFilter,setValueInput, filters};