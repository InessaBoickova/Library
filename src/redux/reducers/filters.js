const initialState = {
    activeFilter: 'Все книги',
    filteredBookList: [],
    numOfListOfGenres: [],
    raiseFilter : false,
    valueInput : ''
}
  
export const filters = (state = initialState, action) => {

    switch (action.type){
        case 'SET_ACTIVE_FILTER': 
            return {
                ...state,
                activeFilter : action.value,
            };
        case 'SET_RAISE_FILTER': 
        return {
            ...state,
            raiseFilter : !state.raiseFilter,
        };
        case 'SET_VALUE_INPUT': 
        return {
            ...state,
            valueInput : action.value ,
        };
        default : 
            return state;
    }
}
  