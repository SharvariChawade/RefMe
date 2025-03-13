import React from 'react'
import LatestJobCards from './LatestJobCards';

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

function LatestPosts() {
  return (
    <div className='max-w-7xl mx-auto my-20'>
      <h1 className='text-4xl font-bold'><span className='text-[#F99002]'>Latest</span> Referral Post</h1>
      <div className='grid grid-cols-3 gap-4 my-5'>
        {
          randomJobs.length <= 0 ? <span>No Posts Available</span> : randomJobs?.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
        }
      </div>
    </div>
  )
}

export default LatestPosts