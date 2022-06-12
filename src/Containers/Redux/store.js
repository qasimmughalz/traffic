import { configureStore } from '@reduxjs/toolkit'
import CounterReducer from './Counter'
import NavbarToggle from './NavbarToggle'
import UserAuth from './UserAuth'

export const Store = configureStore({
    reducer: {
        counter : CounterReducer, 
        navbarToggle : NavbarToggle , 
        UserAuth : UserAuth
    }
})