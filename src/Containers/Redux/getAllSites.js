import { createSlice } from "@reduxjs/toolkit";


const getAllSites = createSlice({
    name :'getAllSites',
    initialState:{
        sites:[], 
        error:'', 
        events:[]
    },
    reducers:{
        setGetAllSites:(state, action)=>{
            state.sites = action.payload
        }, 
        setEvents: (state, action)=>{
            state.events = action.payload
            console.log("dispatched", state.events)
        },
        errorLoading : (state)=>{
            state.error =`It's not You ! It's we, working in Update, Try Again in few minutes`
        }
    }
})


export const { setGetAllSites , errorLoading , setEvents} = getAllSites.actions;
export default getAllSites.reducer
