import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Tab = "all" | "follows" | "mentions";

interface NotificationState {
    activeTab: Tab,
    notificationModalOpen:boolean
}

const initialState:NotificationState = {
    activeTab:"all",
    notificationModalOpen:false
}

const NotificationSlice = createSlice({
    name:'notification',
    initialState,
    reducers:{
        setNotificationModalOpen : state =>{
            state.notificationModalOpen = true;
        },

        setNotificationModalClose: state =>{
            state.notificationModalOpen = false;
        },
        toggleNotificationModal: state =>{
            state.notificationModalOpen = !state.notificationModalOpen
        },
        setActiveTab : (state, action:PayloadAction<Tab>) => {
            state.activeTab = action.payload;
        }
    }
})

export const {setNotificationModalClose, setNotificationModalOpen, 
    toggleNotificationModal, setActiveTab} = NotificationSlice.actions;
export default NotificationSlice.reducer;