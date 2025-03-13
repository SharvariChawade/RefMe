import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const Navbar =() => {
    const {user} = useSelector(store=>store.auth)
    return (
        <div className='bg-white'>
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
                <div>
                    <h1 className='text-2xl font-bold'>Ref<span className='text-[#F99002]'>Me!</span></h1>
                </div>
                <div className="flex items-center gap-12">
                    <ul className="flex font-medium items-center gap-5">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/referralposts">Referral Post</Link></li>
                        <li><Link to="/browse">Browse</Link></li>
                    </ul>
                    {
                        !user ?(
                            <div className="flex items-center gap-2">
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#F99002]">SignUp</Button></Link>
                            </div>                            
                        ):(
                            <Popover>
                        <PopoverTrigger>
                            <Avatar className="cursor-pointer">
                                <AvatarImage src="https://github.com/shadcn.png"></AvatarImage>
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="flex gap-6">
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src="https://github.com/shadcn.png"></AvatarImage>
                                </Avatar>
                                <div>
                                    <h1 className="font-medium">{user.fullname}</h1>
                                    <p className="text-sm text-muted-foreground">{user.profile.bio}</p>
                                </div>
                            </div>
                            <div className="flex flex-col text-gray-600">
                                <div className="flex w-fit items-center gap-2 cursor-pointer">
                                    <User2/>
                                    <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                </div>
                                <div className="flex w-fit items-center gap-2 cursor-pointer">
                                    <LogOut/>
                                    <Button variant="link">Logout</Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                        )
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default Navbar;