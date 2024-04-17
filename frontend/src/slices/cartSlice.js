import { createSlice } from "@reduxjs/toolkit";
import { Toaster } from "react-hot-toast";

const initialState={
    totalItems:localStorage.getItem("totalItems")? JSON.parse(localStorage.getItem("totalItems")):0
}
const cartSlice=createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        addToCart:(state,action)=>{
            state.push(action.payload)


        },
        removeCart:(state,action)=>{
            return state.filter((item)=>item.id!=action.payload)

        },
        resetCart:(state)=>{
            state.totalItems=0
        }
    }

})

export const {addToCart,removeCart,resetCart} =cartSlice.actions
export default cartSlice.reducer