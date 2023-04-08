const initialState = {
    booksList : [],
    book: [],
    listOfGenres: [],
    loading : false,
    error: false,
}
  
export const book = (state = initialState, action) => {

    switch (action.type){
        case 'SET_BOOKS_LIST': 
            return {
                ...state,
                booksList :  action.value,
            };
        case 'SET_BOOK': 
            return {
                ...state,
                book : action.value
            };
        case 'SET_LIST_OF_GENRES': 
            return {
                ...state,
                listOfGenres : action.value
            };
        case 'SET_LOADING': 
            return {
                ...state,
                loading : action.value
            };
        case 'SET_ERROR': 
            return {
                ...state,
                error : action.value
            };
        default : 
            return state;
    }
}
  