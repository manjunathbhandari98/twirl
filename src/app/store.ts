import { configureStore } from "@reduxjs/toolkit";
import NotificationReducer from '../redux/NotificationSlice';
import PostReducer from '../redux/PostSlice';

export const store = configureStore({
    reducer:{
        post: PostReducer,
        notification:NotificationReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type useAppDispatch = typeof store.dispatch;
