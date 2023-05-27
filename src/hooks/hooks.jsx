import { useDispatch,useSelector } from 'react-redux';

import { setSelectBookingData } from '../redux/slice/modal-slice';

export const useHooks = () => {
    const dispatch = useDispatch();
    const activeBookId = useSelector(state => state.modal.activeBookId)
    const {id} =  JSON.parse(localStorage.getItem('user'));
   
    const setStar = (num) => {
        const star = [1,2,3,4,5];
        const starList = star.map((i,index)=>{
            const color = (index > Math.round(num) - 1  ) ? 'none' : '#FFBC1F';
    
            return ( 
                <span key= {i}>
                    <svg width="21" height="21" viewBox="0 0 21 19" fill={color}>
                        <path d="M8.09798 6.30426L10.5 0.549456L12.902 6.30426C13.0419 6.63938 13.3576 6.86723 13.7187 6.89608L19.9493 7.39383L15.2036 11.4448C14.9276 11.6804 14.8064 12.0508 14.891 12.4042L16.3415 18.4636L11.0041 15.215C10.6945 15.0266 10.3055 15.0266 9.9959 15.215L4.65848 18.4636L6.10898 12.4042C6.19359 12.0508 6.07245 11.6804 5.79644 11.4448L1.05067 7.39383L7.28134 6.89608C7.64244 6.86723 7.9581 6.63938 8.09798 6.30426Z" stroke="#FFBC1F"/>
                    </svg>
               </span>
            )
        })

        return starList
    }

    const closeHintModal = (action) => {
        setTimeout(()=> {
            dispatch(action(null))
        },4000)
    }

    const setCloseModal = (action) => {
        dispatch(action(false));
        document.body.style.width = '100%';
        document.body.style.position = 'relative';
        dispatch(setSelectBookingData(null))
    }

    const setOpenModal = (action) => {
        dispatch(action(true))
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = '';
        if(activeBookId && activeBookId.dateOrder) {
            dispatch(setSelectBookingData(new Date(activeBookId.dateOrder)))
        }
    }

    const setBookingButtonStyles = (delivery,booking , start) => {
        let btnTitle = '';
        let classBtn = ''; 
    
        if (delivery){
            btnTitle = `занята до ${new Date(delivery.dateHandedTo).toLocaleDateString().substring(0,5)}`
            classBtn = `${start}__button-booked`
        }if(booking){
            btnTitle = 'Забронирована'
            classBtn = (booking.customerId === id ? `${start}__button-busy`: `${start}__button-booked`)
        }if(!delivery && !booking) {
            btnTitle = 'Забронировать'
            classBtn = `${start}__button`
        }

        return {btnTitle,classBtn}
    }
    
    return {setStar, setCloseModal, setOpenModal , setBookingButtonStyles, closeHintModal}
}