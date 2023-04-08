const initialState = {
    style: 'book-column',
}
  
export const bookListStyle = (state = initialState, action) => {
   
    switch (action.type){
        case 'COLUMN': 
            return {
                ...state,
                style: 'book-column'
            };
        case 'ROW':
            return {
                ...state,
                style: 'book-row'
            };
        default : 
            return state;
    }
}
  