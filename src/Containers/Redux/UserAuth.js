import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch } from "react-redux";


const UserAuth = createSlice({
    name:'userAuth', 
    initialState:  {
        token:'', 
        isLoggedIn:false, 
        expireTime:'', 
        Useremail:''
    }, 
    reducers:{
        settingInitialValues:(state , action)=>{
            const { userToken , userLoggedIn } = action.payload;
            state.token = userToken;
            state.isLoggedIn = userLoggedIn
        },
        logoutHandler: (state)=>{
            console.log("Log out called")
            state.token = '';
            state.isLoggedIn = false
            state.expireTime = '';
            localStorage.removeItem('token')
            localStorage.removeItem('newDomain')
            localStorage.removeItem('email')
            localStorage.removeItem('expire')
        },
        loginHandler: (state, action)=>{
            const {idToken, expiresIn } = action.payload
            state.token = idToken;
            state.Useremail = localStorage.getItem('email')
            state.isLoggedIn = true
            state.expireTime = expiresIn;
            localStorage.setItem('token', idToken )
            // Token Expire Time 
            const totalTime = new Date( new Date().getTime() + (+expiresIn * 1000))
            const currTime = new Date().getTime();
            const finalTime = totalTime - currTime;
            // setTimeout(()=> logoutHandler  , 3000); 
        }
    }
})

export const {settingInitialValues , loginHandler, logoutHandler} = UserAuth.actions
export default UserAuth.reducer