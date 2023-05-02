import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { useHooks } from '../../hooks/hooks'
import { setOpenModalChangeBookingData } from '../../redux/actions/actions'
import { useActionUserBook } from '../../services/action-user-book';

import { Calendar } from './calendar';

export const ModalChangeBookingDate = () => {
    const openModalChangeBookingData = useSelector(state=> state.modal.openModalChangeBookingData)
    const activeBookId = useSelector(state => state.modal.activeBookId)
    const selectBookingData = useSelector(state => state.modal.selectBookingData);

    const {setCloseModal} = useHooks();
    const ref = useRef(null);
    const refOverlay = useRef(null);
    const {editBookBooking,deleteBookBooking} = useActionUserBook();

    const disableButton = (selectBookingData) && new Date(activeBookId.dateOrder).getTime() === selectBookingData.getTime()

    const onSubmitEdit = () => {
        editBookBooking()
    }

    const onSubmitDelete = () => {
        deleteBookBooking()
     }

    useEffect(() => {
        const  handleClickOutside = (event)=> {
          if (openModalChangeBookingData && ref.current && !ref.current.contains(event.target)&& refOverlay.current.contains(event.target)) {
            setCloseModal(setOpenModalChangeBookingData);
          }
        }
      
        document.addEventListener('click', handleClickOutside);

        return () => {
          document.removeEventListener('click', handleClickOutside);
        };

      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [openModalChangeBookingData,ref]);

    return (
        <div className="modal">
            <div className="modal_overlay" ref = {refOverlay}>
                <div className="modal__wrapper" ref = {ref}>
                    <div className="modal__header">
                        <h2 className="modal__header-title"> Изменение даты бронирования </h2>
                        <button type="button"
                                        className="modal__header-close" 
                                        onClick={()=> setCloseModal(setOpenModalChangeBookingData)}> 
                                        <span> </span>
                        </button>
                    </div>
                    
                    <div className="modal__calendar">
                        <Calendar/>
                    </div>

                    <button type="button" disabled = {(disableButton) ? true   :  false} 
                                className={(disableButton) ? 'modal__btn-disabled'  :  'modal__btn'} onClick={(e)=> onSubmitEdit(e)}>
                                забронировать
                    </button>

                    <button type="button"
                                className='modal__btn-a' onClick={(e)=> onSubmitDelete(e)}>
                                отменить бронь
                    </button>
                    
                </div>
            </div>
        </div>
    )
}