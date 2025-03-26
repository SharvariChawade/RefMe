import { ReferralPost } from "../models/referralpost.model.js";
import { User } from "../models/user.model.js";

export const postReferral = async (req,res) => {
    try {
        const {description, requirements, location, company} = req.body;
        const userId = req.id;
        console.log(req.body);
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
        if(!company){
            return res.status(400).json({
                message: "You need to be part of a company to post referrals",
                success: false
            })
        };
        const user = await User.findById(userId);
        
        
        const referralpost = await ReferralPost.create({
            company: company,
            description, 
            requirements, 
            location, 
            created_by: userId
        });
        const post = await ReferralPost.findOne({_id:referralpost._id});
        if (!user.referralPost) {
            user.referralPost = [];
        }
        user.referralPost.push(post);
        await user.save();
        return res.status(201).json({
            message: "Referral Post posted succesfully",
            post,
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
        }).
        populate("created_by").sort({createdAt: -1});
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
        const post = await ReferralPost.findById(postId).populate("created_by").populate("company").populate("referral_requests");
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
