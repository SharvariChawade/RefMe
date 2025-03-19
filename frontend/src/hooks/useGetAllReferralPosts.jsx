import { setAllReferralPosts } from '@/redux/referralpostSlice'
import { REFERRALPOST_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const useGetAllReferralPosts = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllReferralPosts = async () => {
            try {
                const res = await axios.get(`${REFERRALPOST_API_END_POINT}/getallreferralpost`, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
                if (res.data.success) {
                    // console.log(res);
                    dispatch(setAllReferralPosts(res.data.posts));
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
        fetchAllReferralPosts();
    }, [])
}

export default useGetAllReferralPosts