import { useSelector } from 'react-redux'

export const EmptyBookList = () => {
    const valueInput = useSelector((state)=> state.filters.valueInput);

    return (
        <div className="empty">
            <h2 className='empty__title'> 
                { valueInput.length === 0 ?  'В этой категории книг ещё нет' :  'По запросу ничего не найдено' }
            </h2>
        </div>
    )
}