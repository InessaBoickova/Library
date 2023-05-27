/*eslint-disable*/
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
    reducers: {     
        setActiveFilter: (state,action) => {  state.activeFilter = action.payload},    
        setRaiseFilter: (state) => { state.raiseFilter = !state.raiseFilter},     
        setValueInput: (state,action) => {  state.valueInput = action.payload }, 
    }
});

const {actions,reducer: filters} = filtersSlice;
const {setActiveFilter,setRaiseFilter,setValueInput} = actions;

export {setActiveFilter,setRaiseFilter,setValueInput, filters};