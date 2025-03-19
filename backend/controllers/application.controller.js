import { Application } from "../models/application.model.js";
import { ReferralPost } from "../models/referralpost.model.js";
import { User } from "../models/user.model.js"


export const requestReferral = async (req,res) => {
    try {
        const userId = req.id;
        const { skills, resume, experience, short_description, referrer } = req.body;
        if(!referrer){
            return res.status(400).json({
                message: "No referrer found!",
                success: false
            })
        };
        const alreadyRequested = await Application.findOne({referrer:referrer, applicant:userId});
        if(alreadyRequested){
            return res.status(400).json({
                message: "Already requested user for referral",
                success: false
            })
        }
        const newReferralRequest = await Application.create({
            referrer: referrer,
            applicant: userId,
            skills: skills,
            resume: resume,
            experience: experience,
            short_description:short_description,
        })
        // updating profile of referrer
        const referrerProfile = await User.findById(referrer);
        referrerProfile.referralRequests.push(newReferralRequest); 
        await referrerProfile.save();
        // updating profile of referral requester
        const referralReqProfile = await User.findById(userId);
        referralReqProfile.referralRequested.push(newReferralRequest); 
        await referralReqProfile.save();
        return res.status(201).json({
            message: "Referral request is Successful!",
            newReferralRequest,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


export const applyReferralPost = async (req,res) => {
    try {
        const userId = req.id;
        const postId = req.params.id;
        const { skills, resume, experience, short_description } = req.body;
        if(!postId){
            return res.status(400).json({
                message: "Referral Post is required",
                success: false
            })
        };
        const existingApplication = await Application.findOne({referral_post:postId, applicant:userId});
        if(existingApplication){
            return res.status(400).json({
                message: "Already applied for this referral",
                success: false
            })
        }
        const post = await ReferralPost.findById(postId);
        if(!post){
            return res.status(404).json({
                message: "Referral Post not found",
                success: false
            })
        }
        const newApplication = await Application.create({
            referral_post: postId,
            applicant: userId,
            skills: skills,
            resume: resume,
            experience: experience,
            short_description:short_description,
        }) 
        post.referral_requests.push(newApplication);  
        await post.save();

        return res.status(201).json({
            message: "Application Successful!",
            newApplication,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getAppliedReferrals = async (req,res) => {
    try {
        const userId = req.id;
        if(!userId){
            res.status(404).json({
                message: "User not found",
                success: false
            })
        }
        const appliedReferralsByUser = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'referral_post',
            options:{sort:{createdAt:-1}},
            populate:{
                path: 'company',
                options:{sort:{createdAt:-1}}
            }
        });
        if(!appliedReferralsByUser){
            res.status(404).json({
                message: "No jobs applied",
                success: false
            })
        };
        return res.status(201).json({
            message: "Referrals requested by user",
            appliedReferralsByUser,
            success: false
        })
    } catch (error) {
        console.log(error);
    }
}

export const getApplicants = async (req,res) => {
    try {
        const postId = req.params.id;

        const postapplicants = await ReferralPost.findById(postId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
        if(!postapplicants){
            return res.status(400).json({
                message: "No applicants",
                success: false
            })
        }
        return res.status(200).json({
            postapplicants,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateStatus = async (req,res) => {
    try {
        const applicationId = req.params.id;
        const userId = req.id;
        const {status} = req.body;
        const application = await Application.findOne({_id:applicationId});
        if(application.referral_post){
            const post = await ReferralPost.findOne({_id:application.referral_post});
            if(post.created_by._id != userId){
                return res.status(404).json({
                    message: "User is not authenticated to update",
                    success: false
                })
            }
            if(!status){
                return res.status(404).json({
                    message: "status is required",
                    success: false
                })
            }
            if(!application){
                return res.status(404).json({
                    message: "Application not found",
                    success: false
                })
            }
            application.status = status.toLowerCase();
            await application.save()

            return res.status(200).json({
                message: "Status updated successfully",
                success: true
            })
        }
        if(application.referrer){
            if(application.referrer != userId){
                return res.status(404).json({
                    message: "User is not authenticated to update",
                    success: false
                })
            }
            
            if(!status){
                return res.status(404).json({
                    message: "status is required",
                    success: false
                })
            }
            if(!application){
                return res.status(404).json({
                    message: "Application not found",
                    success: false
                })
            }
            application.status = status.toLowerCase();
            await application.save()
            return res.status(200).json({
                message: "Status updated successfully",
                success: true
            })
        }
    } catch (error) {
        console.log(error);
    }
}