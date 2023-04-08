export const setColumn = () => ({type:'COLUMN'});
export const setRow = () => ({type:'ROW'});
export const openNavMenu = ()=> ({type:'NAV_MENU_OPEN'});
export const showListMenu = ()=> ({type:'SHOW_LIST_MENU'});
export const hideListMenu = ()=> ({type:'HIDE_LIST_MENU'});
export const setBooksList = (value)=> ({type:'SET_BOOKS_LIST' , value});
export const setBook = (value)=> ({type:'SET_BOOK' , value});
export const setListOfGenres = (value)=> ({type:'SET_LIST_OF_GENRES' , value});
export const setLoading = (value)=> ({type:'SET_LOADING' , value});
export const setError = (value)=> ({type:'SET_ERROR' , value});
export const setActiveFilter = (value)=> ({type:'SET_ACTIVE_FILTER' , value});
export const setRaiseFilter = (value)=> ({type:'SET_RAISE_FILTER' , value});
export const setValueInput = (value)=> ({type:'SET_VALUE_INPUT' , value});

export const setRegistrationStep = (value)=> ({type:'SET_REGISTRATION_STEP' , value});
export const setRegistrationData = (value) => ({type:'SET_REGISTRATION_DATA', value});
export const setRegistrationResult = (value) => ({type: 'SET_REGISTRATION_RESULT', value})
export const setRegistrationSuccess = (value) => ({type: 'SET_REGISTRATION_SUCCESS',value})
export const setForgotPassResult = (value) => ({type: 'SET_FORGOT_PASS_RESULT', value})
export const setForgotPassSuccess = (value) => ({type: 'SET_FORGOT_PASS_SUCCESS',value})
export const setAuthorizationSuccess = (value) => ({type: 'SET_AUTHORIZATION_SUCCESS',value})
export const setAuthorizationResult = (value) => ({type: 'SET_AUTHORIZATION_RESULT',value})

export const setOpenModalReviewBook = (value) => ({type: 'SET_OPEN_MODAL_REVIEW_BOOK',value})
export const setStatusBookReview = (value) => ({type: 'SET_STATUS_BOOK_REVIEW',value})

export const setOpenModalChangeBookingData = (value) => ({type: 'SET_OPEN_CHANGE_DATE_MODAL',value})
export const setOpenModalSelectBookingData = (value) => ({type: 'SET_OPEN_SELECT_DATE_MODAL',value})

export const setActiveBookId = (value) => ({type: 'SET_ACTIVE_BOOK_ID',value})
export const setSelectBookingData = (value) => ({type: 'SET_SELECT_BOOKING_DATA',value})
export const setStatusSelectBookingData = (value) => ({type:'SET_STATUS_SELECT_BOOKING_DATA',value})
export const setStatusChangeBookingData = (value) => ({type:'SET_STATUS_CHANGE_BOOKING_DATA',value})


