import { createSlice } from "@reduxjs/toolkit";

const referralpostSlice = createSlice({
    name: "referralpost",
    initialState:{
        allReferralPosts:[],
        singlePost:null,
        referralRequested:[],
        referralRequests:[],
    },reducers:{      
        setAllReferralPosts:(state,action) => {
            state.allReferralPosts = action.payload;
        },
        setSingleReferralPost:(state,action) => {
            state.singlePost = action.payload;
        },
        setReferralRequested:(state,action) =>{
            state.referralRequested = action.payload;
        },
        setReferralRequests:(state,action) =>{
            state.referralRequests = action.payload;
        }
    }
});

export const {setAllReferralPosts, setSingleReferralPost, setReferralRequested,setReferralRequests} = referralpostSlice.actions;
export default referralpostSlice.reducer;