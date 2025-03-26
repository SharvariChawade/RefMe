import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import { REFERRALPOST_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleReferralPost } from '@/redux/referralpostSlice';
import { toast } from 'sonner';
import store from '@/redux/store';
import { Briefcase } from 'lucide-react';
import ApplyReferralPost from './ApplyReferralPost';

const PostDetails = () => {
    
    const [open, setOpen] = useState(false);
    const params = useParams();
    const postId = params.id;
    const { singlePost } = useSelector(store => store.referralpost)
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch();
    const isApplied = singlePost?.referral_requests?.some(referral_requests=>referral_requests.applicant === user?._id);
    useEffect(() => {
        const fetchSingleReferralPost = async () => {
            try {
                const res = await axios.get(`${REFERRALPOST_API_END_POINT}/getreferralpost/${postId}`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    dispatch(setSingleReferralPost(res.data.post));
                }
            } catch (error) {
                console.error("Full error response:", error);
                toast.error(error.response.data.message);
                if (error.response) {
                    console.error("Error Status:", error.response.status);
                    console.error("Error Data:", error.response.data);
                }
            }
        }
        fetchSingleReferralPost();
    }, [postId, dispatch, user?._id])

    return (
        <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
            {/* Header Section */}
            <div className="flex items-center justify-between border-b pb-4">
                <div>
                    <h1 className="font-bold text-2xl text-gray-900">{singlePost?.created_by?.fullname}</h1>
                    <div className="flex items-center mt-2">
                        <Briefcase className="w-5 h-5 text-gray-500 mr-2" />
                        <span className="font-medium text-lg">{singlePost?.company?.name}</span>
                    </div>
                </div>
                <Button
                    disabled={isApplied}
                    onClick={isApplied ? undefined : () => setOpen(true)}
                    className={`px-6 py-2 rounded-lg text-white font-semibold transition ${isApplied ? "bg-gray-400 cursor-not-allowed" : "bg-[#F99002] hover:bg-gray-400"
                        }`}>
                    {isApplied ? "Already Requested" : "Request Referral"}
                </Button>
            </div>
            <div className="mt-6 p-4 bg-gray-100 rounded-md">
                <p className="mt-2 text-lg text-gray-700 leading-relaxed">
                    {singlePost?.description || "No additional details provided for this job post."}
                </p>
            </div>
            {/* Job Details Section */}
            <div className="mt-6">
                <h1 className="text-xl font-bold text-gray-900 border-b-2 pb-2">Description</h1>
                <div className="mt-4 space-y-3 text-gray-800">
                    <p><span className="font-semibold">Location:</span> {singlePost?.location}</p>
                    <p><span className="font-semibold">Requirements:</span> {singlePost?.requirements}</p>
                    <p><span className="font-semibold">Posted Date:</span> {new Date(singlePost?.createdAt).toLocaleString("en-US",{day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true})}</p>
                    <p><span className="font-semibold">Total Requests:</span> {singlePost?.referral_requests.length} requests</p>
                </div>
            </div>
            <ApplyReferralPost open={open} setOpen={setOpen} />
        </div>
    )
}

export default PostDetails