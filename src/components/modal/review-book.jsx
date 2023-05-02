import { useEffect,useRef,useState } from 'react';
import {useSelector } from 'react-redux'
import { useParams } from 'react-router';

import { useHooks } from '../../hooks/hooks';
import { setOpenModalReviewBook } from '../../redux/actions/actions';
import { useActionUserBook } from '../../services/action-user-book';

export const ModalReviewBook = () => {
    const [starActive, setStarAcive] = useState(0);
    const [valueReview, setValueReview] = useState('');
    const openModalReviewBook = useSelector((state => state.modal.openModalReviewBook))
    const ref = useRef(null);
    const refOverlay = useRef(null);
    const params = useParams();
    // const user = JSON.parse(localStorage.getItem('user'));
    // const {id} = user
    const {submitBookReview} = useActionUserBook();
    const {setCloseModal} = useHooks();

    console.log(openModalReviewBook)

    const setStar = (num) => {
        const star = [1,2,3,4,5];
        const starList = star.map((i,index)=>{
            const color = (index > Math.round(num) - 1  ) ? 'none' : '#FFBC1F';
    
            return ( 
               <span key= {i}>
                    <svg width="36" height="34" viewBox="0 0 36 34" fill={color}  onClick= {()=> setStarAcive(i)}>
                        <path d="M17.7046 1.1957C17.8135 0.934767 18.1865 0.934765 18.2954 1.1957L22.5496 11.388C22.7401 11.8443 23.1701 12.155 23.6625 12.1943L34.7049 13.0765C34.9909 13.0993 35.1005 13.4506 34.8878 13.6322L26.4747 20.8136C26.0986 21.1346 25.9338 21.6389 26.049 22.1201L28.6193 32.8576C28.6838 33.1271 28.3877 33.3508 28.141 33.2006L18.6872 27.4466C18.2652 27.1898 17.7348 27.1898 17.3128 27.4466L7.85899 33.2006C7.6123 33.3508 7.31615 33.1271 7.38067 32.8576L9.95101 22.1201C10.0662 21.6389 9.90136 21.1345 9.52531 20.8136L1.1122 13.6322C0.899474 13.4506 1.00913 13.0993 1.29514 13.0765L12.3375 12.1943C12.8299 12.155 13.2599 11.8443 13.4504 11.388L17.7046 1.1957Z" stroke="#FFBC1F"/>
                    </svg>
               </span>
            )
        })

        return starList;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        // const data = {
        //    data:{
        //     rating: starActive,
        //     text: valueReview,
        //     book: params.bookId,
        //     user: id 
        //    }
        // }

        submitBookReview();
    }

    useEffect(() => {
     
        const  handleClickOutside = (event)=> {
          if (openModalReviewBook && ref.current && !ref.current.contains(event.target)&& refOverlay.current.contains(event.target)) {
            setCloseModal(setOpenModalReviewBook);
          }
        }
      
        document.addEventListener('click', handleClickOutside);

        return () => {
         
          document.removeEventListener('click', handleClickOutside);
        };
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [openModalReviewBook,ref]);

    return (
        <div className="modal">
         
            <div className="modal_overlay" ref = {refOverlay} > 
                <div className="modal__wrapper" ref = {ref}>
                    <div className="modal__header" >
                        <h2 className="modal__header-title"> 
                            Оцените книгу
                        </h2>
                        <button type="button" 
                            className="modal__header-close" 
                            onClick={()=> setCloseModal(setOpenModalReviewBook)}> 
                            <span> </span>
                        </button>
                    </div>
                    <div className="modal__score">
                        <h4 className="modal__score-title"> Ваша оценка </h4>
                        <div className="modal__score-star">
                            {setStar(starActive)}   
                        </div>
                    </div>

                    <div className="modal__review">
                        <textarea name="text" placeholder='Оставить отзыв' className='modal__review-textarea' 
                                    value={valueReview}
                                    onChange={(e)=> setValueReview(e.target.value)  }/>
                    </div>
                    <button type="button"
                        className="modal__btn"  onClick={(e)=> onSubmit(e)}>
                        оценить
                    </button>
                </div>
            </div>
        </div>
    )
}