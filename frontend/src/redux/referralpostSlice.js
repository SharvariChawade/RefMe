import { createSlice } from "@reduxjs/toolkit";

const referralpostSlice = createSlice({
    name: "referralpost",
    initialState:{
        allReferralPosts:[],
        singlePost:null
    },reducers:{      
        setAllReferralPosts:(state,action) => {
            state.allReferralPosts = action.payload;
        },
        setSingleReferralPost:(state,action) => {
            state.singlePost = action.payload;
        }
    }
});

export const {setAllReferralPosts, setSingleReferralPost} = referralpostSlice.actions;
export default referralpostSlice.reducer;