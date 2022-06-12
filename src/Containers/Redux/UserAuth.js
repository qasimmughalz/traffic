import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

const UserAuth = createSlice({
    name:'userAuth', 
    initialState:{
        token:'', 
        isLoggedIn:false, 
        expireTime:''
    }, 
    reducers:{
        settingInitialValues:(state , action)=>{
            state.token = action.payload;
            (state.token && (state.isLoggedIn=true))
        },
        loginHandler: (state, action)=>{
            state.token = action.payload.idToken;
            state.isLoggedIn = true
            state.expireTime = action.payload.expiresIn;
            localStorage.setItem('token',action.payload.idToken )
        }, 
        logoutHandler: (state)=>{
            console.log("Log out called")
            state.token = '';
            state.isLoggedIn = false
            state.expireTime = '';
            localStorage.removeItem('token')
        }
    }
})

export const {settingInitialValues , loginHandler, logoutHandler} = UserAuth.actions
export default UserAuth.reducer