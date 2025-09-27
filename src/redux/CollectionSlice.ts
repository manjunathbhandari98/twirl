import { createSlice } from "@reduxjs/toolkit";


const CollectionSlice = createSlice({
    name:'collection',
    initialState:{
        selectedCollection:null
    },
    reducers:{
        setSelectedCollection : (state, action) =>{
            state.selectedCollection = action.payload;
        }
    }
})

export const {setSelectedCollection} = CollectionSlice.actions;
export default CollectionSlice.reducer;