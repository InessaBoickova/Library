import { createSlice } from '@reduxjs/toolkit';

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

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    // eslint-disable-next-line no-param-reassign
    reducers: {
        // eslint-disable-next-line no-param-reassign
        setOpenModalReviewBook: (state, action) => { state.openModalReviewBook = action.payload},
        // eslint-disable-next-line no-param-reassign
        setOpenModalChangeBookingData: (state,action) => { state.openModalChangeBookingData =  action.payload },
        // eslint-disable-next-line no-param-reassign
        setOpenModalSelectBookingData: (state, action) => { state.openModalSelectBookingData =  action.payload },
        // eslint-disable-next-line no-param-reassign
        setSelectBookingData: (state,action) => { state.selectBookingData =  action.payload },
        // eslint-disable-next-line no-param-reassign
        setActiveBookId: (state,action) => { state.activeBookId =  action.payload },
        // eslint-disable-next-line no-param-reassign
        setStatusSelectBookingData: (state,action) => { state.statusSelectBookingData =  action.payload },
        // eslint-disable-next-line no-param-reassign
        setStatusBookReview: (state,action) => { state.statusBookReview =  action.payload },
        // eslint-disable-next-line no-param-reassign
        setStatusChangeBookingData: (state,action) => { state.statusChangeBookingData =  action.payload },
    }
});

const {actions,reducer: modal} = modalSlice;
const {setOpenModalReviewBook,setOpenModalChangeBookingData,setOpenModalSelectBookingData,setSelectBookingData,setActiveBookId,
    setStatusSelectBookingData,setStatusBookReview,setStatusChangeBookingData} = actions;

export {setOpenModalReviewBook,setOpenModalChangeBookingData,setOpenModalSelectBookingData,setSelectBookingData,setActiveBookId,
        setStatusSelectBookingData,setStatusBookReview,setStatusChangeBookingData, modal};