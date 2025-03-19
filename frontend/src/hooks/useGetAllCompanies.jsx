import { setAllCompanies } from '@/redux/companiesSlice';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllCompanies = async () => {
        try {
            const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            if (res.data.success) {
                // console.log(res);
                dispatch(setAllCompanies(res.data.companies));
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    fetchAllCompanies();
  },[])
}

export default useGetAllCompanies