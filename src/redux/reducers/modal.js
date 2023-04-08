const initialState = {
   openModalReviewBook: false,
   openModalChangeBookingData : false,
   openModalSelectBookingData : false,
   selectBookingData: null,
   activeBookId: null,
   statusSelectBookingData: null,
   statusBookReview: null,
   statusChangeBookingData: null,
}
  
export const modal = (state = initialState, action) => {
   
    switch (action.type){
        case 'SET_OPEN_MODAL_REVIEW_BOOK': 
            return {
                ...state,
                openModalReviewBook: action.value
            };
        case 'SET_OPEN_CHANGE_DATE_MODAL': 
            return {
                ...state,
                openModalChangeBookingData: action.value
            };
        case 'SET_OPEN_SELECT_DATE_MODAL': 
            return {
                ...state,
                openModalSelectBookingData: action.value
            };
        case 'SET_SELECT_BOOKING_DATA': 
            return {
                ...state,
                selectBookingData: action.value
            };
        case 'SET_ACTIVE_BOOK_ID': 
            return {
                ...state,
                activeBookId: action.value
            };
        case 'SET_STATUS_SELECT_BOOKING_DATA': 
            return {
                ...state,
                statusSelectBookingData: action.value
            };
        case 'SET_STATUS_BOOK_REVIEW': 
            return {
                ...state,
                statusBookReview: action.value
            };
        case 'SET_STATUS_CHANGE_BOOKING_DATA': 
            return {
                ...state,
                statusChangeBookingData: action.value
            };
        default : 
            return state;
    }
    
}