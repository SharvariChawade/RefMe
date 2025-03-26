import React, { useEffect, useState } from 'react'
import Navbar from './shared/navbar'
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { UpdateProfileDialog } from './UpdateProfileDialog';
import { Label } from './ui/label';
import { Briefcase, Building, Building2, Contact, GraduationCap, Mail, Pen } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './ui/button';
import Footer from './shared/footer';
import RequestedReferrals from './RequestedReferrals';
import ReferralRequests from './ReferralRequests';
import { setReferralRequested, setReferralRequests } from '@/redux/referralpostSlice';

export const Profile = () => {
    const { user } = useSelector(store => store.auth);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    
    // const isResume=user.profile.resume;
    useEffect(()=>{
        if(user?.referralRequested){
            dispatch(setReferralRequested(user?.referralRequested));
        }
        
    },[user,dispatch])
    const referralRequested = useSelector(store => store.referralpost?.referralRequested)
    useEffect(()=>{
        if(user?.referralRequests){
            dispatch(setReferralRequests(user?.referralRequests));
        }
        
    },[user,dispatch])
    const referralRequests = useSelector(store => store.referralpost?.referralRequests)
    return (
        <div>
            <Navbar />
            {
            user ?(
            <div>
                <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                    <div className='flex justify-between'>
                        <div className='flex items-center gap-4'>
                            <Avatar className="h-24 w-24">
                                <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
                            </Avatar>
                            <div>
                                <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                                <p>{user?.profile?.bio}</p>
                            </div>
                        </div>
                        <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
                    </div>
                    <div className='my-5'>
                        <div className='flex items-center gap-3 my-2'>
                            <Mail />
                            <span>{user?.email}</span>
                        </div>
                        <div className='flex items-center gap-3 my-2'>
                            <Contact />
                            <span>{user?.phoneNumber}</span>
                        </div>
                        {
                            (user?.profile?.company) ? (
                                <div className='flex items-center gap-3 my-2'>
                                    <Briefcase />
                                    <span>{user?.profile?.company?.name}</span>
                                </div>
                            ) : (
                                <div className='flex items-center gap-3 my-2'>
                                    <GraduationCap />
                                    <span>{user?.profile?.university}</span>
                                </div>
                            )
                        }
                    </div>
                    <div className='my-5'>
                        <h1>Skills</h1>
                        <div className='flex items-center gap-1 my-3'>
                            {
                                user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                            }
                        </div>
                    </div>
                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                        {/* <Label className="text-md font-bold">Resume</Label>
                    {
                        
                        isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    } */}
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <div className='max-w-4xl shadow-xl mx-4 my-4 bg-white rounded-2xl'>
                        <div className='flex justify-center'>
                            <h1 className='font-bold text-lg my-5'>Requested Referrals</h1>
                        </div>
                        {/* Applied Job Table   */}
                        <RequestedReferrals allReferralRequested={referralRequested} />
                        

                    </div>
                    <div className='max-w-4xl shadow-xl mx-4 my-4 bg-white rounded-2xl'>
                        <div className='flex justify-center'>
                            <h1 className='font-bold text-lg my-5'>Referral Requests</h1>
                        </div>
                        <ReferralRequests allReferralRequests={referralRequests}/>
                    </div>
                </div>

                <UpdateProfileDialog open={open} setOpen={setOpen} />
            </div>
            ):(
            <div className='max-w-4xl mx-auto my-5 p-8 flex justify-center'>
                <div className='shadow-xl mx-auto my-4 p-12 bg-white rounded-2xl flex justify-center'>
                    <h1 className='font-bold text-xl'>User Not Logged In!</h1>
                </div>
            </div>
        )
        } 
            <Footer />
        </div>
    )
}
