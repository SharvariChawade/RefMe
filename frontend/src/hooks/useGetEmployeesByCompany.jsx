
import { setEmployeesByCompany } from '@/redux/companiesSlice';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner';

const useGetEmployeesByCompany = (companyname) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!companyname) {
            return;
        }
        const fetchAllEmployees = async () => {
            try {
                const input = { companyName: companyname };
                const res = await axios.post(`${COMPANY_API_END_POINT}/employees`, input, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
                if (!res.data) {
                    return;
                }
                if (!res.data.success) {
                    return;
                }
                if (!Array.isArray(res.data.employeeList)) {
                    return;
                }
                dispatch(setEmployeesByCompany(res.data.employeeList));
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch employees.");
            }
        };

        fetchAllEmployees();
    }, [companyname]);
};

export default useGetEmployeesByCompany;
