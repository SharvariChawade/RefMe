import { ReferralPost } from "../models/referralpost.model.js";
import { User } from "../models/user.model.js";

export const postReferral = async (req,res) => {
    try {
        const {description, requirements, location} = req.body;
        const userId = req.id;
        if(!userId){
            return res.status(400).json({
                message: "User no authenticated",
                success: false
            })
        };
        if(!description ){
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        };
        const user = await User.findById(userId);
        if(!user.profile.company){
            return res.status(400).json({
                message: "You need to be part of a company to post referrals",
                success: false
            })
        };
        const referralpost = await ReferralPost.create({
            company: user.profile.company,
            description, 
            requirements, 
            location, 
            created_by: userId 
        });
        user.referralPost.push(referralpost);
        user.save();
        return res.status(201).json({
            message: "Referral Post posted succesfully",
            referralpost,
            user,
            success: true 
        })
    }
    catch (error){
        console.log(error);
    }
}

export const getAllReferralPost = async (req,res) => {
    try{
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { description: { $regex: keyword, $options:"i"}},
            ]
        };
        const posts = await ReferralPost.find(query).populate({
            path: "company"
        }).sort({createdAt: -1});
        if(!posts){
            return res.status(404).json({
                message: `No Referral Post found ${query} ${jobs}`,
                success: false
            })
        };
        return res.status(200).json({
            posts,
            success:true
        })
    } catch(error){
        console.log(error);
    }
}

export const getReferralPostById = async (req,res) => {
    try {
        const postId = req.params.id;
        const post = await ReferralPost.findById(postId);
        if(!post){
            return res.status(404).json({
                message: "No Referral Post found",
                success: false,
            });
        }
        return res.status(200).json({
            post,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
