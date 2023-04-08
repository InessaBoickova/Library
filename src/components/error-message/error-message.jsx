import { useDispatch } from 'react-redux';

import { setError,setStatusBookReview,setStatusChangeBookingData,setStatusSelectBookingData } from '../../redux/actions/actions';
import CheckCircle from '../../resources/icon/CheckCircle.svg'
import WarningCircle from '../../resources/icon/WarningCircle.svg'

export const ErrorMessage = (props) => {
    const {status} = props;
    const dispatch = useDispatch();

    const data = {
        erorrLoadingBooksList: {
            img: WarningCircle,
            title: 'Что-то пошло не так. Обновите страницу через некоторое время.',
            className: 'message error'
        },
        successfulBookReview: {
            img: CheckCircle,
            title: 'Спасибо, что нашли время оценить книгу!',
            className: 'message'

        },
        errorBookReview: {
            img: WarningCircle,
            title: 'Оценка не была отправлена. Попробуйте позже!',
            className: 'message error'
        },
        successfulBookBooking: {
            img: CheckCircle,
            title: 'Книга забронирована.',
            className: 'message'
        },
        errorBookBooking: {
            img: WarningCircle,
            title: 'Что-то пошло не так, книга не забронирована. Попробуйте позже!',
            className: 'message error'
        },
        successfulChangeOfBookingDate: {
            img: CheckCircle,
            title: 'Бронирование новой даты успешно изменено.',
            className: 'message'
        },
        errorChangeOfBookingDate: {
            img: WarningCircle,
            title: 'Что-то пошло не так, дату бронирования не удалось изменить. Попробуйте позже!',
            className: 'message error'
        },
        successfulBookCancellation: {
            img: CheckCircle,
            title: 'Бронирование книги успешно отменено!',
            className: 'message'
        },
        errorBookCancellation: {
            img: WarningCircle,
            title: 'Не удалось снять бронирование книги. Попробуйте позже!',
            className: 'message error'
        }
    }

    const {img,title,className} = data[status];

    const onClose = () => {
        dispatch(setStatusBookReview(null));
        dispatch(setStatusSelectBookingData(null));
        dispatch(setStatusChangeBookingData(null));
        dispatch(setError(false));
    }

    return (
        <div className={className}>
            <div className="message__wrapper">
                <div className="message__sign">
                    <img src={img} alt="icon" />
                </div>
                <h2 className="message__message">{title}</h2>
            </div>
            <button type="button" className="message__close" onClick={()=> onClose()}>
                <span> </span>
                <span> </span>
            </button>
        </div>
    )
}