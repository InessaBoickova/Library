import {useDispatch , useSelector} from 'react-redux';
import { useParams } from 'react-router';

import { useHooks } from '../hooks/hooks';
import {getBook , getBooksList,setLoading } from '../redux/slice/book-slice'
import {setOpenModalChangeBookingData,setOpenModalReviewBook,setOpenModalSelectBookingData,setStatusChangeBookingData,setStatusSelectBookingData} from '../redux/slice/modal-slice'

import axiosApi from './interceptors';

export const useActionUserBook = () => {
    const activeBookId = useSelector(state => state.modal.activeBookId);

    const user = JSON.parse(localStorage.getItem('user'));
    const {id} =  user;
    const dispatch = useDispatch();
    const {setCloseModal,closeHintModal} = useHooks();
    const {bookId} = useParams();

    const BASE_LINK = 'https://library-cleverland-2jfze.ondigitalocean.app';

    const updateData = () => {

        if(bookId){
            dispatch(getBook(bookId));
        }else {
             dispatch(getBooksList());
        }
    }

    const submitBookReview =  (data) => {
        dispatch(setLoading(true));

        axiosApi.post(`${BASE_LINK}/api/comments`, data)
            .then (res => { 
                dispatch(setStatusSelectBookingData('successfulBookReview'));
                updateData();
        
                return res;
            })
            .catch(err => {
                dispatch(setStatusSelectBookingData('errorBookReview'));
                
                return err;
            })
            .finally( () => {
                dispatch(setLoading(false));
                setCloseModal(setOpenModalReviewBook);
                closeHintModal(setStatusSelectBookingData);
            });
    }

    const createBookBooking = (date) => {
        const datas = {
            data:{
                order: true,
                customer: id,
                book: (activeBookId) && activeBookId.idBook,
                dateOrder: date
            }
        }

        dispatch( setLoading(true));

        axiosApi.post(`${BASE_LINK}/api/bookings`, datas )
            .then (res => {
                dispatch(setStatusSelectBookingData('successfulBookBooking'));
                updateData();

                return res;
            })
            .catch(err => {
                dispatch(setStatusSelectBookingData('errorBookBooking'));
         
                return err;
            })
            .finally(() => {
                dispatch(setLoading(false));
                setCloseModal(setOpenModalSelectBookingData);
                closeHintModal(setStatusSelectBookingData);
            });
    }

    const editBookBooking = (date) => {
        const datas = {
            data:{
                order: true,
                book: (activeBookId) && activeBookId.idBook,
                dateOrder: date
            }
        }

        dispatch(setLoading(true));

        axiosApi.put(`${BASE_LINK}/bookings/${activeBookId.bookingId}`, datas )
        .then (res => {
            dispatch(setStatusChangeBookingData('successfulChangeOfBookingDate'));
            updateData();

            return res;
        })
        .catch(err => {
            dispatch(setStatusChangeBookingData('errorChangeOfBookingDate'));

            return err;
        })
        .finally( () => {
            dispatch(setLoading(false));
            setCloseModal(setOpenModalChangeBookingData);
            closeHintModal(setStatusChangeBookingData);
         });
    }

    const deleteBookBooking = () => {
        dispatch(setLoading(true));

        axiosApi.delete(`${BASE_LINK}/bookings/${activeBookId.bookingId}` )
            .then (res => {
                dispatch(setStatusChangeBookingData('successfulBookCancellation'));
                updateData();
                 
                return res;
            })
            .catch(err => {
                dispatch(setStatusChangeBookingData('errorBookCancellation'));

                return err;
            })
            .finally( () => {
                dispatch(setLoading(false));
                setCloseModal(setOpenModalChangeBookingData);
                closeHintModal(setStatusChangeBookingData);
            });
        }

    return {submitBookReview,createBookBooking,editBookBooking,deleteBookBooking}
}