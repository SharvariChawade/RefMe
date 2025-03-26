import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import referralpostSlice from "./referralpostSlice";
import companiesSlice from "./companiesSlice";

const store = configureStore({
    reducer:{
        auth: authSlice,
        referralpost: referralpostSlice,
        companies: companiesSlice,   
    }
},window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;