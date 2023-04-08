const initialState = {
    navMenuOpen: false,
    showListBook: true,
}
  
export const listMenu = (state = initialState, action) => {
   
    switch (action.type){

        case 'NAV_MENU_OPEN': 
            return {
                ...state,
                navMenuOpen: !state.navMenuOpen 
            };
        case 'SHOW_LIST_MENU': 
            return {
                ...state,
                showListBook: !state.showListBook 
            };
        case 'HIDE_LIST_MENU': 
            return {
                ...state,
                showListBook: false
            };
        default : 
            return state;
    }
}
  