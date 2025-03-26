
import React, { useState } from "react";
import { useParams } from "react-router-dom"; // To get company ID from URL
import EmployeeCard from "./EmployeeCard";
import Navbar from "./shared/Navbar";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import useGetEmployeesByCompany from "@/hooks/useGetEmployeesByCompany";

const CompanyPage = () => {
    const { id } = useParams(); 
    const { allCompanies } = useSelector(store => store.companies);
    const company = allCompanies.find((c) => c._id === id); 
    useGetEmployeesByCompany(company.name);
    const { employeesByCompany}= useSelector(store => store.companies);
    if (!company) {
        return (
            <div className="text-center text-red-500 font-bold text-xl mt-10">
                Company Not Found
            </div>
        );
    }
    return (
        <div>
        <Navbar/>
        <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
            {/* Company Info */}
            <h1 className="text-3xl font-bold">{company?.name}</h1>
            <p className="text-gray-600">{(company?.description)?(company?.description):" "}</p>

            {/* Employees List */}
            <h2 className="text-2xl font-semibold mt-6">Employees</h2>
            <div className="mt-4 space-y-4">
                {employeesByCompany.map((employee) => (
                    <EmployeeCard
                        key={employee.id}
                        employee={employee}
                    />
                ))}
            </div>
        </div>
        </div>
    );
};

export default CompanyPage;
