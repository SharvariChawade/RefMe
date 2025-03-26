// // import { DialogClose, DialogContent } from '@radix-ui/react-dialog'
// import React, { useState } from 'react'
// import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
// import { Label } from './ui/label';
// import { Input } from './ui/input';
// import { Button } from './ui/button';
// import { Loader2 } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { REFERRALPOST_API_END_POINT } from '@/utils/constant';
// import useGetAllReferralPosts from '@/hooks/useGetAllReferralPosts';
// import axios from 'axios';
// import { toast } from 'sonner';
// import { setAllReferralPosts } from '@/redux/referralpostSlice';
// import { useNavigate } from 'react-router-dom';

// const CreateReferralPost = ({ opencrf, setOpencrf }) => {
//     const [loading, setLoading] = useState(false);
//     const { user } = useSelector(store => store.auth);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { allReferralPosts } = useSelector(store => store.referralpost);
//     const [input, setInput] = useState({
//         description: "",
//         location: "",
//         requirements: "",
//         company: user.profile.company || ""
//     });
//     const changeEventHandler = (e) => {
//         setInput({ ...input, [e.target.name]: e.target.value });
//     };
//     const createReferralPost = async (e) => {
//         e.preventDefault();
//         try {
//             setLoading(true);
//             const res = await axios.post(`${REFERRALPOST_API_END_POINT}/postreferral`, input, {
//                 headers: {
//                     'Content-Type': "application/json"
//                 },
//                 withCredentials: true
//             });
//             if (res.data.success) {
//                 toast.success(res.data.message);
//                 let arr = allReferralPosts.slice();
//                 arr.push(res.data.post);
//                 dispatch(setAllReferralPosts(arr));
//                 navigate(`/referralposts`)
//             }
//         } catch (error) {
//             toast.error(error.response.data.message);
//         } finally {
//             setLoading(false);
//         }

//     }
//     return (
//         <div className="sm:max-w-[600px] bg-white border border-black z-50">

//             <h1>Create Referral Post</h1>

//             <form onSubmit={createReferralPost}>
//                 <div className='grid gap-4 py-4'>
//                     <div className='grid grid-cols-4 items-center gap-4'>
//                         <Label htmlFor="description" className="text-right">Description</Label>
//                         <Input
//                             id="description"
//                             name="description"
//                             type="text"
//                             value={input.description}
//                             onChange={changeEventHandler}
//                             className="col-span-3"
//                         />
//                     </div>
//                     <div className='grid grid-cols-4 items-center gap-4'>
//                         <Label htmlFor="requirements" className="text-right">Requirements</Label>
//                         <Input
//                             id="requirements"
//                             name="requirements"
//                             type="text"
//                             value={input.requirements}
//                             onChange={changeEventHandler}
//                             className="col-span-3"
//                         />
//                     </div>
//                     <div className='grid grid-cols-4 items-center gap-4'>
//                         <Label htmlFor="location" className="text-right">Location</Label>
//                         <Input
//                             id="location"
//                             name="location"
//                             type="text"
//                             value={input.location}
//                             onChange={changeEventHandler}
//                             className="col-span-3"
//                         />
//                     </div>
//                 </div>

//                 {
//                     loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Create Post</Button>
//                 }

//             </form>

//         </div>
//     )
// }

// export default CreateReferralPost

import React, { useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { REFERRALPOST_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { toast } from 'sonner';
import { setAllReferralPosts } from '@/redux/referralpostSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const CreateReferralPost = () => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const { allReferralPosts } = useSelector(store => store.referralpost);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        description: '',
        location: '',
        requirements: '',
        company: user?.profile?.company || '',
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const createReferralPost = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${REFERRALPOST_API_END_POINT}/postreferral`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message);
                dispatch(setAllReferralPosts([...allReferralPosts, res.data.post]));
                navigate(`/referralposts`);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10 px-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl border border-gray-300">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Create Referral Post</h2>
                
                <form onSubmit={createReferralPost} className="space-y-4">
                    {/* Description */}
                    <div>
                        <Label htmlFor="description" className="text-gray-700 font-medium">
                            Job Description
                        </Label>
                        <Input
                            id="description"
                            name="description"
                            type="text"
                            placeholder="Enter job description"
                            value={input.description}
                            onChange={changeEventHandler}
                            className="mt-1"
                        />
                    </div>

                    {/* Requirements */}
                    <div>
                        <Label htmlFor="requirements" className="text-gray-700 font-medium">
                            Requirements
                        </Label>
                        <Input
                            id="requirements"
                            name="requirements"
                            type="text"
                            placeholder="Enter job requirements"
                            value={input.requirements}
                            onChange={changeEventHandler}
                            className="mt-1"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <Label htmlFor="location" className="text-gray-700 font-medium">
                            Location
                        </Label>
                        <Input
                            id="location"
                            name="location"
                            type="text"
                            placeholder="Enter job location"
                            value={input.location}
                            onChange={changeEventHandler}
                            className="mt-1"
                        />
                    </div>


                    {/* Submit Button */}
                    <div className="flex justify-end mt-6">
                        <Button
                            type="submit"
                            className="px-6 py-2 text-white bg-[#F99002] hover:bg-[#e68000] rounded-md flex items-center"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                    Creating...
                                </>
                            ) : (
                                'Create Post'
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateReferralPost;
