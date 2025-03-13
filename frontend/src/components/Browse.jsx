import React from 'react'
import Navbar from './shared/navbar'
import Footer from './shared/footer'
import ReferralPost from './ReferralPost';
const randomJobs = [1, 2,45];


const Browse = () => {
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({randomJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        randomJobs.map((item,index) => {
                            return (
                                <ReferralPost/>
                            )
                        })
                    }
                </div>

            </div>
        <Footer/>
    </div>
    
  )
}

export default Browse