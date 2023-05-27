/*eslint-disable*/
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
    reducers: {
        setOpenModalReviewBook: (state, action) => { state.openModalReviewBook = action.payload},
        setOpenModalChangeBookingData: (state,action) => { state.openModalChangeBookingData =  action.payload },
        setOpenModalSelectBookingData: (state, action) => { state.openModalSelectBookingData =  action.payload },
        setSelectBookingData: (state,action) => { state.selectBookingData =  action.payload },
        setActiveBookId: (state,action) => { state.activeBookId =  action.payload },
        setStatusSelectBookingData: (state,action) => { state.statusSelectBookingData =  action.payload },
        setStatusBookReview: (state,action) => { state.statusBookReview =  action.payload },
        setStatusChangeBookingData: (state,action) => { state.statusChangeBookingData =  action.payload },
    }
});

const {actions,reducer: modal} = modalSlice;
const {setOpenModalReviewBook,setOpenModalChangeBookingData,setOpenModalSelectBookingData,setSelectBookingData,setActiveBookId,
    setStatusSelectBookingData,setStatusBookReview,setStatusChangeBookingData} = actions;

export {setOpenModalReviewBook,setOpenModalChangeBookingData,setOpenModalSelectBookingData,setSelectBookingData,setActiveBookId,
        setStatusSelectBookingData,setStatusBookReview,setStatusChangeBookingData, modal};