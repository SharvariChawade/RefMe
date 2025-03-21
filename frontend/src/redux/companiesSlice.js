import { createSlice } from "@reduxjs/toolkit";

const companiesSlice = createSlice({
    name: "companies",
    initialState:{
        allCompanies:[],
        employeesByCompany:[],
        isRequested: {}
    },reducers:{      
        setAllCompanies:(state,action) => {
            state.allCompanies = action.payload;
        },
        setEmployeesByCompany:(state,action) => {
            state.employeesByCompany = action.payload;
        },
        // setRequested:(state,action) => {
        //     state.isRequested = action.payload
        // },
        setRequested: (state, action) => {
            const { employeeId, status } = action.payload;
            state.isRequested[employeeId] = status;  // ✅ Update request status per employee
        }
    }
});

export const {setAllCompanies,setEmployeesByCompany,setRequested} = companiesSlice.actions;
export default companiesSlice.reducer;