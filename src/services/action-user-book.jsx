import {useDispatch , useSelector} from 'react-redux';
import { useParams } from 'react-router';

import { useHooks } from '../hooks/hooks';
import { setLoading ,setOpenModalChangeBookingData,setOpenModalReviewBook,setOpenModalSelectBookingData,setStatusChangeBookingData,setStatusSelectBookingData} from '../redux/actions/actions';

import {useBooksServices} from './books'
import axiosApi from './interceptors';

export const useActionUserBook = () => {
    const activeBookId = useSelector(state => state.modal.activeBookId);

    const dispatch = useDispatch();
    const {getBook,getBooksList} = useBooksServices();
    const {setCloseModal} = useHooks();
    const {bookId} = useParams();

    const BASE_LINK = 'https://strapi.cleverland.by';

    const submitBookReview =  (data) => {
        // dispatch( setLoading(true))

        // axiosApi.post(`${BASE_LINK}/api/comments`, data)
        //     .then (res => { 
        //         if(bookId){
        //             getBook(bookId);
        //         }
        
        //         return res;
        //     })
        //     .catch(err => {
        //         dispatch(setStatusSelectBookingData('errorBookReview'))

        //         return err;
        //     })
        //     .finally( () => {
        //         dispatch(setLoading(false));
        //         setCloseModal(setOpenModalReviewBook);
        //     });
        dispatch(setStatusSelectBookingData('successfulBookReview'))
        setCloseModal(setOpenModalReviewBook);
        setTimeout(()=> {
            dispatch(setStatusSelectBookingData(null))
        },4000)
    }

    const createBookBooking = (date) => {
        // const datas = {
        //     data:{
        //         order: true,
        //         customer: id,
        //         book: (activeBookId) && activeBookId.idBook,
        //         dateOrder: date
        //     }
        // }

        // dispatch( setLoading(true))

        // axiosApi.post(`${BASE_LINK}/api/bookings`, datas )
        //     .then (res => {
        //         dispatch(setStatusSelectBookingData('successfulBookBooking'))
        //         setTimeout(()=> {
        //             dispatch(setStatusSelectBookingData(null))
        //         },4000)
        //         if(bookId){
        //             getBook(bookId);
        //         }else {
        //             getBooksList()
        //         }
                
        //         return res;
        //     })
        //     .catch(err => {
        //         dispatch(setStatusSelectBookingData('errorBookBooking'))
                
        //         return err;
        //     })
        //     .finally( () => {
        //         dispatch(setLoading(false));
        //         setCloseModal(setOpenModalSelectBookingData);
               
        //     });

        dispatch(setStatusSelectBookingData('successfulBookBooking'))

        setTimeout(()=> {
             dispatch(setStatusSelectBookingData(null))
        },4000)

        setCloseModal(setOpenModalSelectBookingData);
    }

    const editBookBooking = (date) => {
        // const datas = {
        //     data:{
        //         order: true,
        //         customer: id,
        //         book: (activeBookId) && activeBookId.idBook,
        //         dateOrder: date
        //     }
        // }

        // dispatch( setLoading(true))

        // axiosApi.put(`${BASE_LINK}/api/bookings/${activeBookId.bookingId}`, datas )
        //     .then (res => {
        //         dispatch(setStatusChangeBookingData('successfulChangeOfBookingDate'))
        //         setTimeout(()=> {
        //             dispatch(setStatusChangeBookingData(null))
        //         },4000)

        //         if(bookId){
        //             getBook(bookId);
        //         }else {
        //             getBooksList()
        //         }
               
        //         return res;
        //     })
        //     .catch(err => {
        //         dispatch(setStatusChangeBookingData('errorChangeOfBookingDate'))
                
        //         return err;
        //     })
        //     .finally( () => {
        //         dispatch(setLoading(false));
        //         setCloseModal(setOpenModalChangeBookingData);
               
        //     });

        dispatch(setStatusChangeBookingData('successfulChangeOfBookingDate'))
        setTimeout(()=> {
            dispatch(setStatusChangeBookingData(null))
        },4000)
        setCloseModal(setOpenModalChangeBookingData);
    }

    const deleteBookBooking = () => {
        // dispatch( setLoading(true))

        // axiosApi.delete(`${BASE_LINK}/api/bookings/${activeBookId.bookingId}` )
        //     .then (res => {
        //         dispatch(setStatusChangeBookingData('successfulBookCancellation'))
        //         setTimeout(()=> {
        //             dispatch(setStatusChangeBookingData(null))
        //         }, 4000)

        //         if(bookId){
        //             getBook(bookId);
        //         }else {
        //             getBooksList()
        //         }
                
        //         return res;
        //     })
        //     .catch(err => {
        //         dispatch(setStatusChangeBookingData('errorBookCancellation'))

        //         return err;
        //     })
        //     .finally( () => {
        //         dispatch(setLoading(false));
        //         setCloseModal(setOpenModalChangeBookingData);
                
        //     });


        dispatch(setStatusChangeBookingData('successfulBookCancellation'));
        setTimeout(()=> {
            dispatch(setStatusChangeBookingData(null))
        }, 4000)
        setCloseModal(setOpenModalChangeBookingData);
        }

    return {submitBookReview,createBookBooking,editBookBooking,deleteBookBooking}
}