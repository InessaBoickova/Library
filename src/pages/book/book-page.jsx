import { useSelector } from 'react-redux';

import { Book } from '../../components/book/book';
import { BreadCrumbs } from '../../components/bread-cumbs/bread-cumbs';
import { ErrorMessage } from '../../components/error-message/error-message';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { ModalChangeBookingDate } from '../../components/modal/change-booking-date';
import {ModalReviewBook} from '../../components/modal/review-book'
import { ModalSelectBookingDate } from '../../components/modal/select-booking-date';
import { NavMenu } from '../../components/nav-menu/nav-menu';

export const BookPage = () => {
    const error = useSelector(state=> state.book.error);
    const openModalReviewBook = useSelector(state=> state.modal.openModalReviewBook);
    const statusBookReview = useSelector(state => state.modal.statusBookReview);
    const openModalChangeBookingData = useSelector(state=> state.modal.openModalChangeBookingData)
    const openModalSelectBookingData = useSelector (state => state.modal.openModalSelectBookingData)
    const statusSelectBookingData = useSelector (state => state.modal.statusSelectBookingData)
    const statusChangeBookingData = useSelector (state => state.modal.statusChangeBookingData)
   
    return (
        <section className='book-page'>
            <NavMenu/>
            <div className="book-page__headers">
                <Header/>
                <BreadCrumbs/>
            </div>
            {error ? <ErrorMessage status='erorrLoadingBooksList' /> :  <Book/>}
            {statusBookReview && <ErrorMessage status={statusBookReview} /> } 
            {statusSelectBookingData && <ErrorMessage status={statusSelectBookingData} /> }
            {statusChangeBookingData && <ErrorMessage status={statusChangeBookingData} /> }
            {openModalReviewBook && <ModalReviewBook />  }
            {openModalChangeBookingData && <ModalChangeBookingDate/>}
            {openModalSelectBookingData && <ModalSelectBookingDate/>}

            <Footer/>
        </section>
    )
};

