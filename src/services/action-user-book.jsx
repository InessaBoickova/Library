import {useDispatch , useSelector} from 'react-redux';
import { useParams } from 'react-router';

import { useHooks } from '../hooks/hooks';
import { setLoading ,setOpenModalChangeBookingData,setOpenModalReviewBook,setOpenModalSelectBookingData,setStatusChangeBookingData,setStatusSelectBookingData} from '../redux/actions/actions';

import {useBooksServices} from './books'
import axiosApi from './interceptors';

export const useActionUserBook = () => {
    const activeBookId = useSelector(state => state.modal.activeBookId);

    const user = JSON.parse(localStorage.getItem('user'));
    const {id} =  user;
    const dispatch = useDispatch();
    const {getBook,getBooksList} = useBooksServices();
    const {setCloseModal,closeHintModal} = useHooks();
    const {bookId} = useParams();

    const BASE_LINK = 'https://library-cleverland-2jfze.ondigitalocean.app';

    const submitBookReview =  (data) => {
        dispatch(setLoading(true))

        axiosApi.post(`${BASE_LINK}/api/comments`, data)
            .then (res => { 
                dispatch(setStatusSelectBookingData('successfulBookReview'));

                if(bookId){
                    getBook(bookId);
                }
        
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
                if(bookId){
                    getBook(bookId);
                }else {
                    getBooksList();
                }

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
                customer: id,
                book: (activeBookId) && activeBookId.idBook,
                dateOrder: date
            }
        }

        dispatch(setLoading(true));

        axiosApi.put(`${BASE_LINK}/bookings/${activeBookId.bookingId}`, datas )
        .then (res => {
            dispatch(setStatusChangeBookingData('successfulChangeOfBookingDate'));
            
            if(bookId){
                getBook(bookId);
            }else {
                getBooksList();
            }

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
        dispatch( setLoading(true));

        axiosApi.delete(`${BASE_LINK}/bookings/${activeBookId.bookingId}` )
            .then (res => {
                dispatch(setStatusChangeBookingData('successfulBookCancellation'));

                if(bookId){
                    getBook(bookId);
                }else {
                    getBooksList();
                }
                
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