import React, { useState } from 'react'
import CompanyCard from './CompanyCard';
import Navbar from './shared/Navbar';
import SearchBar from './ui/searchbar';
import { useSelector } from 'react-redux';
import store from '@/redux/store';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';

const Companies = () => {
    const [search, setSearch] = useState("");
    const { allCompanies } = useSelector(store => store.companies);
    useGetAllCompanies();
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5 '>
                <div className='my-4'>
                    <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                    <div className='grid grid-cols-3 gap-4'>
                        {
                            allCompanies.length <= 0 ? <h1 className='font-bold'>No Companies found!</h1> :
                                (allCompanies.map((company) => (
                                    <CompanyCard key={company.id} company={company} />
                                ))
                                )

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Companies