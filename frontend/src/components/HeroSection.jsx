import { Search } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

function HeroSection() {
  return (
    <div className='text-center'>
        <div className='flex flex-col gap-5 my-10'>
            <h1 className='text-5xl font-bold'>Get Referred & <br /> Get Your <span className='text-[#F99002]'>Dream Job</span></h1>
            <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                <input
                type="text"
                placeholder='Find your dream jobs'
                className='outline-none border-none w-full'
                />
                <Button className="rounded-r-full bg-[#F99002]">
                    <Search className='h-5 w-5' />
                </Button>
            </div>
        </div>
    </div>
  )
}

export default HeroSection