import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getBooksList,setBooksList  } from '../../redux/slice/book-slice';

export const BreadCrumbs = () => {
    const dispatch = useDispatch();
    const activeFilter = useSelector(state=> state.filters.activeFilter);
    const book = useSelector(state=> state.book.book);
    const error = useSelector(state=> state.book.error);
    const navigate = useNavigate();
    const setBack = () => {
        navigate(-1);
        dispatch(setBooksList([]))
        dispatch(getBooksList());
    }

    return (
        <div className='bread-cumbs'>
            <div className="container">
                <div className="bread-cumbs__wrapper">
                    <div className='bread-cumbs__text'> 
                    <button type='button' className='bread-cumbs__button' onClick={()=> setBack()}> 
                        {activeFilter.trim()}
                    </button>
                        <span>
                            <svg width="11" height="16" viewBox="0 0 11 20" fill="none">
                                <path d="M1 19L10 1" stroke="#BFC4C9" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </span>
                        <span > 
                        {(error)?  ' ' :  book.title}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}