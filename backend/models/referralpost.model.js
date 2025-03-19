import mongoose from "mongoose";

const referralPost = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    created_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: {
        type: String,
        required: true
    },
    location: [{
        type: String
    }],
    referral_requests:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    }]
}, {timestamps:true});

export const ReferralPost = mongoose.model('ReferralPost', referralPost);