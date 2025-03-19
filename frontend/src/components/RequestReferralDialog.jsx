import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import axios from 'axios'
import { toast } from 'sonner'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { APPLICATION_API_END_POINT } from '@/utils/constant'

const RequestReferralDialog = ({ open, setOpen, employee }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const [input, setInput] = useState({
        skills:"",
        short_description: "",
        resume:"",
        experience: "",
        applicant: user._id,
        referrer:employee._id
    });
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    console.log(input);
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            console.log("sending req");
            
            console.log(input);
            const res = await axios.post(`${APPLICATION_API_END_POINT}/requestref`, JSON.stringify(input), {
                headers: {
                    'Content-Type': "application/json"
                },
                withCredentials: true
            });
            console.log(res);
            if (res.data.success) {
                // const updatedPost = await axios.get(`${REFERRALPOST_API_END_POINT}/requestreferral/${postId}`, { withCredentials: true });
                // dispatch(setSingleReferralPost(updatedPost.data.post));
                setOpen(false);
                toast.success(res.data.message);
                
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
        
        console.log(input);
    }
    return (
        <div>
            <Dialog open={open}>
                <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Request Referral</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="resume" className="text-right">Resume</Label>
                                <Input
                                    id="resume"
                                    name="resume"
                                    value={input.resume}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="experience" className="text-right">Experience</Label>
                                <Input
                                    id="experience"
                                    name="experience"
                                    type="text"
                                    value={input.experience}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="short_description" className="text-right">Short Description</Label>
                                <Input
                                    id="short_description"
                                    name="short_description"
                                    value={input.short_description}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="skills" className="text-right">Skills</Label>
                                <Input
                                    id="skills"
                                    name="skills"
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Request Referral</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default RequestReferralDialog