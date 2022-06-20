import { createSlice } from "@reduxjs/toolkit";


const getAllSites = createSlice({
    name :'getAllSites',
    initialState:{
        sites:[], 
        error:''
    },
    reducers:{
        setGetAllSites:(state, action)=>{
            state.sites = action.payload
            console.log("Sites in Redux", state.sites)
        }, 
        errorLoading : (state)=>{
            state.error =`It's not You ! It's we, working in Update, Try Again in few minutes`
        }
    }
})


export const { setGetAllSites , errorLoading } = getAllSites.actions;
export default getAllSites.reducer
