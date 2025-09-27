import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from '../redux/AuhSlice';
import CollectionReducer from '../redux/CollectionSlice';
import NotificationReducer from '../redux/NotificationSlice';
import PostReducer from '../redux/PostSlice';
import ThemeReducer from '../redux/ThemeSlice';

export const store = configureStore({
    reducer:{
        post: PostReducer,
        notification:NotificationReducer,
        auth:AuthReducer,
        collection: CollectionReducer,
        theme:ThemeReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type useAppDispatch = typeof store.dispatch;
