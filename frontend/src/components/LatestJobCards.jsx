import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Badge } from './ui/badge';

function LatestJobCards() {
    const navigate = useNavigate();
    return (
        <div  className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
            <div>
                <h1 className='font-medium text-lg'>TIAA</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>Analyst</h1>
                <p className='text-sm text-gray-600'>Entry level</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'font-bold'} variant="ghost">Positions</Badge>
                <Badge className={'font-bold'} variant="ghost"></Badge>
                <Badge className={'font-bold'} variant="ghost">10LPA</Badge>
            </div>

        </div>
    )
}

export default LatestJobCards