import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../types";

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading:boolean;
    error:string | null;
}

const initialState:AuthState = {
    user:null,
    token:null,
    isAuthenticated:true,
    loading:false,
    error:null
}

const AuthSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser: (state, action) =>{
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null
        },

        clearUser: (state) =>{
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },

        setToken: (state, action) => {
            state.token = action.payload
        },

        setError: (state, action) => {
            state.error = action.payload
        },

        setLoading: (state, action) => {
            state.loading = action.payload
        },
    }
})

export const {setUser, clearUser, setToken, setError, setLoading} = AuthSlice.actions;
export default AuthSlice.reducer;