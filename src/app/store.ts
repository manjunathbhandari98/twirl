import { configureStore } from "@reduxjs/toolkit";
import PostReducer from '../redux/PostSlice'

export const store = configureStore({
    reducer:{
        post: PostReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type useAppDispatch = typeof store.dispatch;
