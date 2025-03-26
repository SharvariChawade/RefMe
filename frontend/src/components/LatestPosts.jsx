import React from 'react'
import LatestPostCards from './LatestPostCards';
import { useSelector } from 'react-redux';
import store from '@/redux/store';
import useGetAllReferralPosts from '@/hooks/useGetAllReferralPosts';

function LatestPosts() {
  const {allReferralPosts} = useSelector(store=>store.referralpost);
  useGetAllReferralPosts();
  return (
    <div className='max-w-7xl mx-auto my-5'>
      <div className='flex justify-center'>
      <h1 className='text-4xl font-bold'><span className='text-[#F99002]'>Latest</span> Referral Post</h1>
      </div>
      
      {
        (allReferralPosts.length <= 0) ?(
          <div className='my-10'>
            <span className='text-4xl font-bold'>No Posts Available</span>
           </div> 
          
        ):(
          <div className='grid grid-cols-3 gap-4 my-5'>
        {
          allReferralPosts?.slice(0, 6).map((post) => <LatestPostCards key={post._id} post={post} />)
        }
          </div>
        )
      }
      
    </div>
  )
}

export default LatestPosts