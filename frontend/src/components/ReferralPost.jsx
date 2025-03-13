import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Bookmark } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ReferralPost =()=> {

const job_id="12345";
const navigate = useNavigate();
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>2 days ago</p>
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>TIAA</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>Analyst</h1>
                <p className='text-sm text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus officia aperiam eligendi nam, consequuntur aut maxime odit, amet harum doloremque, minima eos commodi consequatur corporis praesentium quisquam omnis aspernatur perferendis?</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-[#000000] font-bold'} variant="ghost">2 Positions</Badge>
                <Badge className={'text-[#000000] font-bold'} variant="ghost">Hybrid</Badge>
                <Badge className={'text-[#000000] font-bold'} variant="ghost">10 LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={()=> navigate(`/postdetails/${job_id}`)} variant="outline">Details</Button>
                <Button className="bg-[#F99002]">Save For Later</Button>
            </div>
        </div>
    )
}

export default ReferralPost