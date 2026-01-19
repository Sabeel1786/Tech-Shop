import { configureStore } from "@reduxjs/toolkit";
import cartDetails from "./CartSlice";

const store = configureStore({
    reducer:{
        cart:cartDetails
    }
})
export default store