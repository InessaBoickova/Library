import {configureStore} from '@reduxjs/toolkit';

import { bookListStyle } from '../slice/book-list-style-slice';
import { book } from '../slice/book-slice';
import { filters } from '../slice/filters-slice';
import { identification } from '../slice/identification-slice'
import { listMenu } from '../slice/list-menu-slice'
import { modal } from '../slice/modal-slice';

const stringMiddleware = () => (next)=> (action) => {
    if(typeof action === 'string') {
        return next({
            type: action
        })
    }

    return next(action);
}

export const store = configureStore ({
    reducer: {book,bookListStyle,filters,listMenu,identification,modal},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})