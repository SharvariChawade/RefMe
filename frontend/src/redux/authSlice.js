import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",

    initialState:{
        loading:false,
        user:null
    },reducers:{
        setLoading:(state,action) => {
            state.loading = action.payload;
        },
        setUser:(state,action) => {
            state.user = action.payload;
        },
        setRefRequested : (state , action) => {
            state.user.referralRequested = action.payload;
        }
    }
});

export const {setLoading,setUser , setRefRequested} = authSlice.actions;
export default authSlice.reducer;