import React from 'react'
import { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup,RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading} = useSelector(store=>store.auth)
    const [input, setInput] = useState({
            email: "",
            password: "",
            role: ""
        });
        const changeEventHandler = (e) => {
            setInput({ ...input, [e.target.name]: e.target.value });
        }
        const submitHandler = async (e) => {
            e.preventDefault();
            try{
                dispatch(setLoading(true));
                const res = await axios.post(`${USER_API_END_POINT}/login`,input,{
                    headers:{"Content-Type":"application/json"},
                    withCredentials: true,
                });
                if(res.data.success){
                    dispatch(setUser(res.data.user));
                    navigate("/");
                    toast.success(res.data.message);
                }
            }catch(error){
                console.log(error)
            }finally{
                dispatch(setLoading(false));
            }
        }
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
                    <h1 className='text-xl mb-5 font-bold'>Login</h1>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="JohnDoe@gmail.com"
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Password"
                        />
                    </div>
                    <div className='my-2'>
                        <RadioGroup className="flex items-center gap-6 my-2" defaultValue="professional">
                            <Label className="text-l font-bold">And, you are...</Label>
                            {/* <div className='flex items-center gap-6 my-2'></div> */}
                                <div className="flex items-center space-x-2">
                                    <Input
                                    type="radio"
                                    name="role"
                                    value="professional"
                                    checked={input.role === 'professional'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                    />
                                    <Label htmlFor="professional">Professional</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                    />
                                    <Label htmlFor="student">Student</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Input
                                    type="radio"
                                    name="role"
                                    value="admin"
                                    checked={input.role === 'admin'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                    />
                                    <Label htmlFor="admin">Admin</Label>
                                </div>
                            {/* </div> */}
                        </RadioGroup>
                    </div>
                    {
                        loading ? <Button><Loader2 className='w-full my-2 bg-[#F99002] animate-spin' />Please Wait</Button> : <Button className="w-full my-2 bg-[#F99002]" type="submit">Login</Button>
                    }
                    <div className='text-muted-foreground'>
                        <span>Don't have an account? <Link to="/signup" className='text-[#F99002]'>Sign Up here</Link></span>
                    </div>                    
                </form>
            </div>
        </div>
    )
}

export default Login