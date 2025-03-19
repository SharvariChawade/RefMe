import React, { useMemo } from 'react'
import { Button } from './ui/button'
import useGetEmployeesByCompany from '@/hooks/useGetEmployeesByCompany'
import store from '@/redux/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompanyCard = ({company}) => {

  // const { employeesByCompany } = useSelector(store => store.companies);
  const navigate = useNavigate();
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
        <div className='gap-2 my-4'>
            <h1 className='font-medium text-lg'>{company?.name}</h1>
            <p className='text-gray-600'>{company?.description ? company?.description : ""}</p>  
            <div className='my-2'>
            <Button onClick={() => navigate(`/company/${company?._id}`)} variant="companydetails">Details</Button>
            </div>
                               
        </div>
    </div>
  )
}

export default CompanyCard