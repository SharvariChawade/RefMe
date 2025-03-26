
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import axios from 'axios'
import { toast } from 'sonner'
import { Button } from './ui/button'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import useGetEmployeesByCompany from '@/hooks/useGetEmployeesByCompany'
import CompanyPage from './CompanyPage'
import { setRequested } from '@/redux/companiesSlice'
import { setRefRequested, setUser } from '@/redux/authSlice'

const RequestReferralDialog = ({ open, setOpen, employee }) => {
    const { user } = useSelector(store => store.auth);
    const {isRequested} = useSelector(store => store.companies)
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        skills:"",
        short_description: "",
        resume:"",
        experience: "",
        referrer:employee,
        jobid:"",
        joblink:""
    });
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${APPLICATION_API_END_POINT}/requestref`, JSON.stringify(input), {
                headers: {
                    'Content-Type': "application/json"
                },
                withCredentials: true
            });
            if (res.data.success) {
                setOpen(false);
                let arr = user.referralRequested.slice();
                arr.push(res.data.newReferralRequest._id);
                // user.referralRequested = arr;
                toast.success(res.data.message);
                dispatch(setRefRequested(arr));
                dispatch(setRequested({ employeeId: employee._id, status: true }));
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    
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
                                <Label htmlFor="jobid" className="text-right">Job ID</Label>
                                <Input
                                    id="jobid"
                                    name="jobid"
                                    type="text"
                                    value={input.jobid}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="joblink" className="text-right">Job Link</Label>
                                <Input
                                    id="joblink"
                                    name="joblink"
                                    type="text"
                                    value={input.joblink}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
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
