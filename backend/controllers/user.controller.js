import {User} from "../models/user.model.js";
import { Company } from "../models/company.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req,res) => {
    try {
        const {fullname, email, phoneNumber, password, role} = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message: "User already exists",
                status: false
            });
        }
        const hashedPassword = await bcrypt.hash(password,10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password:hashedPassword,
            role
        });
        return res.status(201).json({
            message:"Account created successfully",
            success:true
        })
    }catch(error){
        console.log(error);
    }
}


export const login = async (req,res) => {
    try {
        const {email, password, role} = req.body;
        if (!email || !password || !role){
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({email})
        .populate("profile.company")
        .populate({
            path: "referralRequests",
            select: "status referrer applicant createdAt",
            populate: [
                { path: "referrer", select: "fullname email role profile.company", populate: { path: "profile.company", select: "name industry location" } },
                { path: "applicant", select: "fullname email role profile.company", populate: { path: "profile.company", select: "name industry location" } }
            ]
        })
        .populate({
            path: "referralRequested",
            select: "status referrer applicant createdAt",
            populate: [
                { path: "referrer", select: "fullname email role profile.company", populate: { path: "profile.company", select: "name industry location" } },
                { path: "applicant", select: "fullname email role profile.company", populate: { path: "profile.company", select: "name industry location" } }
            ]
        })
        .populate("referralPost");
        if(!user){
            return res.status(400).json({
                message: "Incorrect email",
                success: false
            })
        };
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect password",
                success: false
            })
        };
        if(role != user.role){
            return res.status(400).json({
                message: "Incorrect role",
                success: false
            })
        };

        const tokenData = {
            userId:user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn:'1d'});
        
        // // user = {
        // //     _id:user._id,
        // //     fullname:user.fullname,
        // //     email:user.email,
        // //     phoneNumber:user.phoneNumber,
        // //     role:user.role,
        // //     profile:user.profile
        // // }
        // user = await User.findById(userId).populate("profile.company");
        return res.status(200).cookie("token",token, {maxAge:1*24*60*60*1000, httpsOnly: true, sameSite: 'strict'}).json({
            message:`Welcome back ${user.fullname}`,
            user,
            success:true
        })
    }catch(error){
        console.log(error);
    }
}


export const logout = async (req,res) => {
    try {
        const user = await User.findById(req.id);
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged out successfully",
            success:true
        })
    }catch(error){
        console.log(error);
    }
}


export const updateProfile = async (req,res) => {
    try {
        const {fullname,email,phoneNumber,bio,skills,company,university} = req.body;
        const file = req.file;
        // if (!fullname || !email || !phoneNumber || !bio || !skills){
        //     return res.status(400).json({
        //         message: "Something is missing",
        //         success: false
        //     });
        // };

        // cloudinary
        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        const userId = req.id;
        let user = await User.findById(userId).populate("profile.company");
        if(!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }
        
        let companyObj;
        if(company){
            companyObj = await Company.findOne({name:company});
            if(!companyObj) {
                return res.status(400).json({
                    message: "Company not found",
                    success: false
                })
            }
            // if(companyObj.employees.includes(userId)){
            //     return res.status(400).json({
            //         message: "Cannot update company, user already an employee of this company",
            //         success: false
            //     })
            // }
            // companyObj.employees.push(user);  
            // companyObj.save();
        }
        
        if(fullname) user.fullname = fullname;
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(bio) user.profile.bio = bio;
        if(skills) user.profile.skills = skillsArray;
        if(company && user.role=="professional") user.profile.company = companyObj;
        if(university && user.role=="student") user.profile.university = university;
        
        await user.save();
    
        user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }

        // user = await User.findById(userId).populate("profile.company");
        console.log(user);
        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true
        })
    }catch(error){
        console.log(error);
    }
}

