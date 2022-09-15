import { createSlice } from "@reduxjs/toolkit";


const getAllSites = createSlice({
    name :'getAllSites',
    initialState:{
        sites:[], 
        sitesLoading:true,
        error:'', 
    },
    reducers:{
        setGetAllSites:(state, action)=>{
            state.sitesLoading = false
            state.sites = action.payload
        }, 
        errorLoading : (state)=>{
            state.error =`It's not You ! It's we, working in Update, Try Again in few minutes`
        }
    }
})


export const { setGetAllSites , errorLoading } = getAllSites.actions;
export default getAllSites.reducer
