/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect,useState } from 'react'
import {useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useHooks } from '../../hooks/hooks';
import {getBook} from '../../redux/slice/book-slice'
import { setActiveBookId,setOpenModalChangeBookingData,setOpenModalReviewBook,setOpenModalSelectBookingData ,setSelectBookingData } from '../../redux/slice/modal-slice';
import close_vector from '../../resources/icon/close_vector.svg'
import raise_vector from '../../resources/icon/raise_vector.svg';
import userDefalt from '../../resources/icon/user_reviews.png'
import cat from '../../resources/img/cat_image.png'
import { SwiperSlider } from '../slider/slider';
import { Spinner } from '../spinner/spinner';

export const Book = () => {
    const dispatch = useDispatch();
    const {id : idUser} = JSON.parse(localStorage.getItem('user'));
    const {setStar,setBookingButtonStyles} = useHooks ();
    
    const {bookId} = useParams();
 
    const [showReviewsList , setshowReviewsList] = useState(true);
    const {setOpenModal} = useHooks();

    const loading = useSelector(state => state.book.loading);
    const book = useSelector(state => state.book.book);

    useEffect (()=> {
       dispatch(getBook(bookId))
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[bookId])

    const optionDate = {
        day: '2-digit',month:'long',year:'numeric'
    }
     
    const view = () => {
        const {id,images,authors,delivery,title,description,format,issueYear,pages,producer,publish,cover,categories,weight,ISBN,booking,rating ,comments} = book;
        const {btnTitle,classBtn} = setBookingButtonStyles(delivery,booking,'book');
       
        const reviewsList = (comments) 
                            ? comments.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt) ).map((item) => {
            const {user,text,createdAt} = item;

            return (
                <div className="book__reviews-card" key={user.commentUserId}> 
                    <div className="book__reviews-card__wrapper">
                        <img src={(user.avatarUrl)? ' ' : userDefalt} alt="user" />
                        <div className="book__reviews-card__user">
                            <h4>{`${user.firstName} ${user.lastName}`}</h4>
                            <h4 className='book__reviews-card-data'>{new Date(createdAt).toLocaleDateString('ru-RU', optionDate)}</h4>
                        </div>
                    </div>
                    <div className="book__reviews-card__star">{setStar(item.rating)}</div>
                    <p className="book__reviews-card__descr"> {text} </p>
                </div>
            )
        }) : null

        const repeatComment =  reviewsList && reviewsList.find(i => +i.key === idUser )
        const actionParamsBtn = (booking) ?  setOpenModalChangeBookingData : setOpenModalSelectBookingData ;
        const activeBookData = {idBook:id ,bookingId: (booking)? booking.id : null , dateOrder: (booking)? booking.dateOrder : null}

        const onButtonClick = ()=> {
            dispatch(setActiveBookId(activeBookData))
            setOpenModal(actionParamsBtn) 
            if(booking && booking.dateOrder){
                dispatch(setSelectBookingData(new Date(booking.dateOrder)))
            }
        }
    
        return (
            <section className="book">
            <div className="container">
                 <div className="book__main-block">
                     <div className="book__main-block-img">
                       {images ?  <SwiperSlider images={images}/> : <img src={cat} alt='img'/> }
                     </div>
                     <div className="book__main-block-descr">
                         <h2>{title}</h2>
                         <h3>{authors}</h3>
                         <button className={classBtn} type='button'
                                onClick={()=>onButtonClick()}
                                disabled = {((delivery && booking) || (booking && booking.customerId !== idUser) || (delivery && delivery.recipientId !== idUser)) ? true : false}>
                                {btnTitle}
                        </button>
                         <div className="book__main-block-descr-about">
                             <h4>О книге</h4>
                             <p>{description}</p>
                         </div>
                     </div>
                 </div>
                 <div className="book__score">
                     <h2> Рейтинг </h2>
                     <div className="devider"> </div>
                     <div className="book__score-star">
                        {(rating)? setStar(rating) : <h2>ещё нет оценок</h2>}
                         <span>{rating}</span> 
                     </div>
                 </div>
                 <div className="book__detail">
                     <h2>Подробная информация</h2>
                     <div className="devider"> </div>
                     <div className="book__detail-wrapper">
                         <div className="book__detail-small__block">
                             <p>Издательство</p>
                             <span>{producer}</span>
                             <p>Год издания</p>
                             <span>{issueYear} </span>
                             <p>Страниц</p>
                             <span>{pages}</span>
                             <p>Переплёт</p>
                             <span>{cover}</span>
                            
                             <p>Формат</p>
                             <span>{format} </span>
                         </div>
                         <div className="book__detail-big__block">
                             <p>Жанр</p>
                             <span>{categories} </span>
                             <p>Вес</p>
                             <span>{weight} </span>
                             <p>ISBN</p>
                             <span>{ISBN}</span>
                             <p>Изготовитель</p>
                             <span>{publish} </span>
                         </div>
                     </div>
                 </div>
                 
                 <div className='book__reviews'>
                     
                     <div className="book__reviews-title" role="button"  tabIndex="0"
                          onClick={()=> setshowReviewsList(!showReviewsList)}>
                         <h2 className='book__reviews-title'>Отзывы </h2>
                         <span>{comments ? comments.length : 0}</span>
                         <img src={showReviewsList ?  close_vector :  raise_vector} alt="vector"
                                 className='book__reviews-vector'/>
                     </div>
                    
                     <div className="devider"> </div>

                    <div>
                        {showReviewsList && comments ?  reviewsList : null}

                        <button disabled={repeatComment? true : false}
                            type='button' className={repeatComment? 'book__reviews-button-disabled' : 'book__reviews-button' }
                            onClick={()=> setOpenModal(setOpenModalReviewBook)}> 
                            оценить книгу 
                        </button>
                    </div>
                 </div>   
            </div>
         </section>
        )
    }

    return (
        (loading ? <Spinner/> : view())
    )
}