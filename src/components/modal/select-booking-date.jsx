import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { useHooks } from '../../hooks/hooks'
import { setOpenModalSelectBookingData,setSelectBookingData } from '../../redux/slice/modal-slice'
import { useActionUserBook } from '../../services/action-user-book';

import { Calendar } from './calendar';

export const ModalSelectBookingDate = () => {
    const {setCloseModal} = useHooks();
    const ref = useRef(null);
    const refOverlay = useRef(null);
    const {createBookBooking} = useActionUserBook();
    const openModalSelectBookingData = useSelector(state=> state.modal.openModalSelectBookingData)
    const selectBookingData = useSelector(state => state.modal.selectBookingData)

    const onSubmit = () => {
        createBookBooking(selectBookingData)
    }

    useEffect(() => {
        const  handleClickOutside = (event)=> {
          if (openModalSelectBookingData && ref.current && !ref.current.contains(event.target)&& refOverlay.current.contains(event.target)) {
            setCloseModal(setOpenModalSelectBookingData);
          }
        }

        document.addEventListener('click', handleClickOutside);

        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [openModalSelectBookingData,ref]);

    return (
        <div className="modal">
           <div className="modal_overlay" ref = {refOverlay}>
                <div className="modal__wrapper"  ref = {ref}>
                    <div className="modal__header">
                        <h2 className="modal__header-title"> Выбор даты <br/> бронирования </h2>
                        <button type="button" 
                                        className="modal__header-close" 
                                        onClick={()=> setCloseModal(setOpenModalSelectBookingData)}> 
                                        <span> </span>
                        </button>
                     </div>
            
                    <div className="modal__calendar">
                       <Calendar action = {setSelectBookingData}/>
                    </div>

                    <button type="button" disabled={(selectBookingData)? false : true }
                                className={(selectBookingData)? 'modal__btn' :'modal__btn-disabled'  } onClick={(e)=> onSubmit(e)}>
                                забронировать
                    </button>
                </div>
            </div>
        </div>
    )
}