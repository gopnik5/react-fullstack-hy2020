import { createSlice } from '@reduxjs/toolkit'

const initialState = 'Hello World!'



const notifictionSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action){
        return action.payload? action.payload: initialState 
    },
    removeNotification(state, action){
        return ''
    },   
  }
})


export const {setNotification, removeNotification} = notifictionSlice.actions
export default notifictionSlice.reducer