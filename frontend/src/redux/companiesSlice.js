import { createSlice } from "@reduxjs/toolkit";

const companiesSlice = createSlice({
    name: "companies",
    initialState:{
        allCompanies:[],
        employeesByCompany:[]
    },reducers:{      
        setAllCompanies:(state,action) => {
            state.allCompanies = action.payload;
        },
        setEmployeesByCompany:(state,action) => {
            state.employeesByCompany = action.payload;
        },
        // setEmployeesByCompany: (state, action) => {
        //     const { companyName, employeeList } = action.payload;
        //     state.employeesByCompany[companyName] = employeeList; 
        // }
    }
});

export const {setAllCompanies,setEmployeesByCompany} = companiesSlice.actions;
export default companiesSlice.reducer;