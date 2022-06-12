import { createSlice } from "@reduxjs/toolkit";


const Counter = createSlice({
    name :'counter',
    initialState:{
        value:0
    },
    reducers:{
        increment:(state)=>{
            state.value+=1
        },
        decrement:(state)=>{
            state.value-=1
        },
        addByValue:(state , action)=>{
            state.value = state.value + action.payload
        }
    }
})


export const { increment, decrement, addByValue } = Counter.actions;
export default Counter.reducer
