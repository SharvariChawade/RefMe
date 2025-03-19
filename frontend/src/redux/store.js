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
});

export default store;