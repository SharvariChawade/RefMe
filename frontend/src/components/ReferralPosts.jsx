import React, { useEffect, useState } from 'react'
import Navbar from './shared/navbar'
import Footer from './shared/footer'
import FilterCard from './FilterCard';
import ReferralPost from './ReferralPost';
import { useSelector } from 'react-redux';
import store from '@/redux/store';
import { Pen } from 'lucide-react';
import CreateReferralPost from './CreateReferralPost';
import { Button } from './ui/button';
import useGetAllReferralPosts from '@/hooks/useGetAllReferralPosts';
import { useNavigate } from 'react-router-dom';

function ReferralPosts() {
    
    const { allReferralPosts } = useSelector(store => store.referralpost);
    const [opencrf, setOpencrf] = useState(false);
    const navigate = useNavigate();
    useGetAllReferralPosts();
  
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5 pb-20'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                        {
                            allReferralPosts.length <= 0 ?
                                <div className=''>
                                    <p className='text-4xl'>Jobs not found!</p>
                                </div>
                                : (
                                    <div className='grid grid-cols-3 gap-4'>
                                        {
                                            allReferralPosts.map((post) => (
                                                <ReferralPost key={post._id} post={post} />
                                            ))
                                        }
                                    </div>
                                )
                        }</div>
                </div>
                <Button
                    onClick={() => navigate(`/referralposts/createpost`)}
                    className="fixed bottom-6 right-6 px-6 py-2 rounded-lg text-white font-semibold transition bg-[#F99002] hover:bg-gray-400"
                >
                    <Pen />
                    <span>Create Post</span>
                </Button>
            </div>
            <Footer />
        </div>
    )
}

export default ReferralPosts