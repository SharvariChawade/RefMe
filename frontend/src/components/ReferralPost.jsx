import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Bookmark, Briefcase } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ReferralPost = ({ post }) => {
    const navigate = useNavigate();
    const timeago = (new Date()) - (new Date(post?.createdAt).getTime());
    const days = 1000 * 60 * 60 * 24;
    const hours = 1000 * 60 * 60 ;
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                {
                    (Math.floor(timeago/days)==0)?(<p className='text-sm text-gray-500'>{Math.floor(timeago/hours)} Hours Ago</p>):(<p className='text-sm text-gray-500'>{Math.floor(timeago/days)} Days Ago</p>)
                }
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>
                </Button>
                <div className='flex justify-between py-2'>
                    <h1 className='font-medium text-lg'>{post?.created_by?.fullname}</h1>
                    <div className='flex justify-center '>
                        <Badge className='font-bold' variant="ghost" style={{ padding: '0.5rem' }}><Briefcase className='mx-2' />{post?.company?.name}</Badge>
                    </div>
                </div>
            </div>
            <div>
                <p className='text-gray-600'>{post?.description}</p>
            </div>
            <div className='my-2 flex'>
                <p><span className='font-bold'>Requirements:</span><span className='text-gray-600'>{post?.requirements}</span></p>
                {/* <span className='font-bold'>Requirements:</span><p className='text-gray-600'> {post?.requirements}</p> */}
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-[#000000] font-bold'} variant="ghost">{post?.location}</Badge>
                <Badge className={'text-[#000000] font-bold'} variant="ghost">{post?.referral_requests.length} requests</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={() => navigate(`/postdetails/${post?._id}`)} variant="outline">Details</Button>
                <Button className="bg-[#F99002]">Save For Later</Button>
            </div>
        </div>
    )
}

export default ReferralPost