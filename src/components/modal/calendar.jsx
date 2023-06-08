import {useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';

import { setSelectBookingData } from '../../redux/slice/modal-slice';

export const Calendar = () => {
    const dispatch = useDispatch();
    const selectBookingData = useSelector(state => state.modal.selectBookingData);

    const [dateActive,setDateActive] = useState(new Date());

    const weekDayNames = ['Пн', 'Вт' , 'Ср' , 'Чт', 'Пт' , 'Сб' , 'Вс'];

    const createData = (data) => {
        const date = (data) ? data : new Date();
        const dayNumber = date.getDate();
        const dayNumberInWeek = (date.getDay()) - 1;
        const year = date.getFullYear();
        const month = date.toLocaleDateString('ru-RU',{month:'long'});
        const monthNumber = date.getMonth() + 1;
        const timestamp = date.getTime();
    
        return {date,dayNumber,dayNumberInWeek,year,month,monthNumber,timestamp}
    }

    const getMonthNumOfDays = (monthNumber,year) => new Date(year,monthNumber ,0).getDate();

    const createMonth = (data = dateActive) => {
        const dates = createData(data);

        const {month, year, monthNumber} = dates;

        const getDay = (dayNumber)  => createData(new Date(year,monthNumber - 1,dayNumber));

        const createMonthDays = () => {
            const days = [];

            for (let i = 0 ; i <= getMonthNumOfDays(monthNumber,year) - 1; i++ ) {
                days[i] = getDay(i + 1);
            }

            return days;
        }

        return {
            getDay,
            createMonthDays,
            month,
            monthNumber
        }
    }

    const setArrDates = () => {
        const data = new Date();
        const yearsMonthNames = [];
        const options = {
            year: 'numeric',
            month: 'long',
        };
    
        for(let i = -4; i < 3; i++){
            const newData = (new Date(data.getFullYear(), data.getMonth() - i)).toLocaleDateString('ru-RU', options);
            const result = newData.charAt(0).toUpperCase() + newData.slice(1,newData.length - 2);
    
            yearsMonthNames.unshift(result);
        }
    
        return yearsMonthNames;
    }

    const yearsMonthNames = setArrDates(); 

    const createElem = (arr) => {
        const lastDay = createData(new Date(dateActive.getFullYear(),dateActive.getMonth() + 1 ,0,0));
        const firstDay = createData(new Date(dateActive.getFullYear(),dateActive.getMonth(),1,0));
     
        const count = firstDay.dayNumberInWeek === -1 ? 6 : firstDay.dayNumberInWeek ;
        const countNext = (lastDay.dayNumberInWeek === -1 ) ? 0 : 6 - lastDay.dayNumberInWeek;

        for (let i = 0 ; i < count; i++){
            arr.unshift(createData(new Date(dateActive.getFullYear(),dateActive.getMonth(),0 - i,0)));
        }

        for(let i = 1 ; i < countNext + 1 ; i++){
            arr.push(createData(new Date(dateActive.getFullYear(),dateActive.getMonth() + 1,i,0)));
        }
        
        return arr;
    }   

    const dateNow = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate(),0); 

    // eslint-disable-next-line consistent-return
    const activeToBookingDay = () => {
        const date = createData(dateNow);

        if(date.dayNumberInWeek === 5){
            return createData(new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate() +2 ,0));
            
        } if(date.dayNumberInWeek === -1){
            return createData(new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate() + 1,0));
            
        }if (date.dayNumberInWeek === 4){
           return createData( new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate() + 3,0));
            
        }if(date.dayNumberInWeek !== 4 && date.dayNumberInWeek !== -1 && date.dayNumberInWeek !== 5) {
            return createData( new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate() + 1,0));
        }
    }

    const bookingDay = activeToBookingDay();

    const onSubmit = (data) => {
        dispatch(setSelectBookingData(data));
    }

    return (
        <div className="calendar">
            <div className="calendar__header">
                <select defaultValue={2} className='calendar__header-select'
                        onChange={(e)=> {
                            setDateActive(new Date(2023,e.target.value))
                        }}> 
                            {yearsMonthNames.map((item,index) => <option key={item} value={index}>{item}</option>)}
                </select>
 
            </div>

            <div className='calendar__body' >
                <div className='calendar__body-name'> 
                    {weekDayNames.map((i) => <span key={i}> {i} </span>)}
                </div> 
              
                 <div className='calendar__body-days' >
                    
                    {
                    // eslint-disable-next-line array-callback-return, consistent-return
                        createElem(createMonth().createMonthDays()).map((i) => {
                        
                            if (createData(selectBookingData).timestamp === i.timestamp  + 10800000){
                                return <button
                                        onClick={()=> onSubmit(new Date(i.timestamp + 10800000))}
                                         className='calendar__body-days-day calendar__body-days-select'
                                          type='button' > 
                                            {i.dayNumber} 
                                </button>
                            }
                            
                            if (i && (i.timestamp !== bookingDay.timestamp + 10800000 ) && (i.dayNumberInWeek === - 1 || i.dayNumberInWeek === 5 )){
                                return (i.date.getTime() === dateNow.getTime()) 
                                        ? <span className='calendar__body-days-day calendar__body-days-today '>
                                            {i.dayNumber}
                                         </span>
                                        : <span className='calendar__body-days-day calendar__body-days-disabled'>
                                            {i.dayNumber}
                                        </span>
                            }
                            if(i && (i.timestamp !== bookingDay.timestamp) 
                                && (i.dayNumberInWeek !== - 1 || i.dayNumberInWeek !== 5 )){
                                return (i.date.getTime() === dateNow.getTime()) 
                                        ? (createData(dateNow).dayNumberInWeek !== - 1 
                                                && createData(dateNow).dayNumberInWeek !== 5 ) 
                                                &&  <button onClick={()=> onSubmit(new Date(i.timestamp + 10800000))}     
                                                      className='calendar__body-days-day calendar__body-days-active' type='button'> 
                                                    {i.dayNumber} 
                                                </button>
                                                
                                        : <span className='calendar__body-days-day'>{i.dayNumber}</span>
                            }
                            if((i.timestamp === bookingDay.timestamp)){
                                return <button 
                                        onClick={()=> onSubmit(new Date(i.timestamp + 10800000))}
                                        className='calendar__body-days-day calendar__body-days-active'
                                        type='button' > 
                                    {i.dayNumber} 
                                </button>
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}