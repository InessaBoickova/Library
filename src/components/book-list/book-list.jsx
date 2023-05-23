/* eslint-disable eqeqeq */
import { useEffect } from 'react';
import {useDispatch,useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { createSelector } from 'reselect';

import { useHooks } from '../../hooks/hooks';
import { setActiveBookId,setOpenModalChangeBookingData , setOpenModalSelectBookingData,setSelectBookingData} from '../../redux/actions/actions';
import cat from '../../resources/img/cat.png'
import { useBooksServices } from '../../services/books';
import { EmptyBookList } from '../empty-book-list/empty-book-list';
import { Spinner } from '../spinner/spinner';

export const BookList = () => {
  const dispatch = useDispatch()
    const raiseFilter = useSelector(state => state.filters.raiseFilter);
    const valueInput = useSelector((state)=> state.filters.valueInput);
    const {id : idUser} = JSON.parse(localStorage.getItem('user'));

    const filteredBookListSelector = createSelector(
      (state) => state.filters.activeFilter,
      (state) => state.book.booksList,
      (state)=> state.filters.valueInput,
      (filter , booksList) => {

        if (filter === 'Все книги'){ 
          return booksList.filter((item)=> {
            const title = item.title.toLowerCase();

            return title.toLowerCase().indexOf(valueInput.toLowerCase()) !== -1
          })
        }
        // eslint-disable-next-line array-callback-return, consistent-return
        const result =  booksList.filter((item) => {
            if (item.categories.length <= 1){
                return item.categories[0] === filter
            }
        
            for (let i = 0; i <= item.categories.length ; i++){
                if (item.categories[i] === filter){
                    return item.categories[i] === filter
                }
            }
        });
      
        return result.filter((item)=> item.title.toLowerCase().indexOf(valueInput.toLowerCase()) !== -1);
      }
    )

    const filteredBookList = useSelector(filteredBookListSelector);

    const styleCard = useSelector(state=> state.bookListStyle.style);
    const loading = useSelector(state=> state.book.loading);
    const error = useSelector(state=> state.book.error);
    const {getBooksList} = useBooksServices();
    const {setStar,setBookingButtonStyles,setOpenModal} = useHooks ();
    const {category} = useParams();

    useEffect (()=> {
      getBooksList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const list = ((raiseFilter)
        ? filteredBookList.sort((a,b)=> a.rating - b.rating)
        : filteredBookList.sort((a,b)=> b.rating - a.rating) ).map((item) => {

        const {rating,booking,delivery,image,title,id,authors,issueYear} = item;    
    
        const img = image ? image.url : cat;
        const titleCard = title.length <= 55? title : `${title.substring(0, 55)}...`;
        const {btnTitle,classBtn} = setBookingButtonStyles(delivery,booking,'card');
        const index = titleCard.toLowerCase().indexOf(valueInput.toLowerCase());
        const before = titleCard.substring(0, index);
        const extractLen = index + valueInput.length;
        const extractedVal = titleCard.substring(index, extractLen);
        const after = titleCard.substring(extractLen, titleCard.length);

        const actionParamsBtn = (booking) ?  setOpenModalChangeBookingData : setOpenModalSelectBookingData ;
        const activeBookData = {idBook:id ,bookingId: (booking)? booking.id : null, dateOrder: (booking)? booking.dateOrder : null}

        const onButtonClick =()=> {
            dispatch(setActiveBookId(activeBookData));
            setOpenModal(actionParamsBtn);
            if(booking && booking.dateOrder){
              dispatch(setSelectBookingData(new Date(booking.dateOrder)))
          }
        }

        return (
                <div className="card" key={id} >
                   <NavLink to={`/books/${category}/${id}`}  >
                    <img src={img} alt="img" className='card__img' />
                    <div className="card__wrapper">
                        <div className="card__score"> {(rating) 
                                              ? setStar(rating) 
                                              : <h2>ещё нет оценок</h2>}
                         </div>
                        <div className='card__title'>
                          <h3> {before}<span
                            style={{color:'rgb(255, 82, 83)'}}>
                                {extractedVal}</span>{after} 
                          </h3>
                        </div>
                        <h4 className='card__subtitle'>{authors[0]},{issueYear} </h4>
                        
                  </div>
                  </NavLink>
                  <button className={classBtn}
                        type='button' 
                        onClick={()=>onButtonClick()}
                        disabled = {((booking && booking.customerId === idUser) || (!delivery && !booking))
                                      ? false : true}> 
                        {btnTitle}
                  </button>
                </div>
          )
        })

    return (
      <div className={styleCard} >
          {loading ? <Spinner/> : ((list.length === 0 && !error) ? <EmptyBookList/> : list )} 
      </div>
    )
}