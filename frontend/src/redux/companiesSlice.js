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
        setRequested: (state, action) => {
            const { employeeId, status } = action.payload;
            if(state.isRequested[employeeId]!=true){
                state.isRequested[employeeId] = status; 
            }
        }
    }
});

export const {setAllCompanies,setEmployeesByCompany,setRequested} = companiesSlice.actions;
export default companiesSlice.reducer;