import React, { useState } from 'react'
import Navbar from '../shared/navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'


function Signup() {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: ""
    });
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post(`${USER_API_END_POINT}/register`,input,{
                headers:{"Content-Type":"application/json"},
                withCredentials: true,
            });
            if(res.data.success){
                navigate("/login");
                toast.success(res.data.message);
            }
        }catch(error){
            console.log(error)
        }        
    }
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
                    <h1 className='text-xl mb-5 font-bold'>Sign Up!</h1>
                    <div className='my-2'>
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="John Doe"
                        />
                    </div>
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
                        <Label>Phone Number</Label>
                        <Input
                            type="number"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="9898989898"
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
                    <div >
                        <RadioGroup className="flex items-center gap-6 my-2" defaultValue="professional">
                            <Label className="text-l font-bold">And, you are...</Label>
                            <div className='flex items-center gap-6 my-2'>
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
                            </div>

                        </RadioGroup>
                    </div>
                    <Button className="w-full bg-[#F99002]" type="submit">Sign Up!</Button>
                    <div className='text-muted-foreground my-2'>
                        <span>Already have an account? <Link to="/login" className='text-[#F99002]'>Login here</Link></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup