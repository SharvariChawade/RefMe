import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Badge } from './ui/badge';
import { Briefcase } from 'lucide-react';

function LatestPostCards({ post }) {
    // console.log(post);
    const navigate = useNavigate();
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
            <div className='flex justify-between py-2'>
                <h1 className='font-medium text-lg'>{post?.created_by?.fullname}</h1>
                <div className='flex justify-center '>
                    <Badge className='font-bold' variant="ghost" style={{ padding: '0.5rem' }}><Briefcase className='mx-2' />{post?.company?.name}</Badge>
                </div>
            </div>
            <div >
                <p className='text-gray-600'>{post?.description}</p>
            </div>
            <div className='my-2 flex'>
                <span className='font-bold'>Requirements:</span><p className='text-gray-600'> {post?.requirements}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'font-bold'} variant="ghost" style={{fontSize: 16}}>{post?.location}</Badge>
            </div>

        </div>
    )
}

export default LatestPostCards