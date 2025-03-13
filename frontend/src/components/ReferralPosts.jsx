import React from 'react'
import Navbar from './shared/navbar'
import Footer from './shared/footer'
import FilterCard from './FilterCard';
import ReferralPost from './ReferralPost';

const jobsArray = [1];

function ReferralPosts() {
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    {
                        jobsArray.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        jobsArray.map((job) => (
                                                <ReferralPost/>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        <Footer/>
    </div>
  )
}

export default ReferralPosts