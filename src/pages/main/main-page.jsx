import { useSelector } from 'react-redux';

import { BookList } from '../../components/book-list/book-list';
import { ErrorMessage } from '../../components/error-message/error-message';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { MainFilter } from '../../components/main-filter/main-filter';
import { ModalChangeBookingDate } from '../../components/modal/change-booking-date';
import { ModalSelectBookingDate } from '../../components/modal/select-booking-date';
import { NavMenu } from '../../components/nav-menu/nav-menu';


export const MainPage = () => {
    const error = useSelector(state=> state.book.error);
    const loading = useSelector(state=> state.book.loading);
    const openModalChangeBookingData = useSelector(state=> state.modal.openModalChangeBookingData)
    const openModalSelectBookingData = useSelector (state => state.modal.openModalSelectBookingData)
    const statusSelectBookingData = useSelector (state => state.modal.statusSelectBookingData)
    const statusChangeBookingData = useSelector ( state => state.modal.statusChangeBookingData)

    return (
        <div className='main-page'>
            <Header/>
            {error ? <ErrorMessage status='erorrLoadingBooksList'/> : null}
            {statusSelectBookingData && <ErrorMessage status={statusSelectBookingData} /> }
            {statusChangeBookingData && <ErrorMessage status={statusChangeBookingData} /> }
            <div className="main-page__content">
                <div className="container">
                    <NavMenu/>
                    <div className="main-page__content-block">
                                {(error || loading ? null :  <MainFilter/>)}
                        <BookList/>
                        {openModalChangeBookingData && <ModalChangeBookingDate/>}
                        {openModalSelectBookingData && <ModalSelectBookingDate/>}
                    </div> 
                </div>
            </div>
            <Footer/>
        </div>
    )
};
