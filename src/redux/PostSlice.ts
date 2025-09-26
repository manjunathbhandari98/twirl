import { createSlice } from "@reduxjs/toolkit";

const PostSlice = createSlice({
    name:'post',
    initialState:{
        isModalOpen:false
    },
    reducers:{
        openModal : state =>{
            state.isModalOpen = true;
        },

        closeModal : state =>{
            state.isModalOpen = false
        }
    }
})

export const {openModal, closeModal} = PostSlice.actions;
export default PostSlice.reducer;