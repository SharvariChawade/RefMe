import { setAllReferralPosts, setSingleReferralPost } from '@/redux/referralpostSlice'
import { REFERRALPOST_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const useGetSingleReferralPost = (postId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSingleReferralPost = async () => {
            try {
                const res = await axios.get(`${REFERRALPOST_API_END_POINT}/get/${postId}`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    // console.log(res);
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
    }, [])
}

export default useGetSingleReferralPost