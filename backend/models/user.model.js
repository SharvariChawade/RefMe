import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student','professional','admin'],
        required: true
    },
    profile: {
        bio: {type:String},
        skills: [{type:String}],
        resume: {type:String},
        resumeOriginalName: {type:String},
        university: { 
            type: String, 
            validate: {
                validator: function (value) {
                  // If role is 'student', university should be provided
                  return this.role !== "student" || !!value;
                },
                message: "University is required for students.",
              },
        },
        company: {
            type:mongoose.Schema.Types.ObjectId, 
            ref:'Company', 
            validate: {
                validator: function (value) {
                  // If role is 'professional', company should be provided
                  return this.role !== "professional" || !!value;
                },
                message: "Company is required for professionals.",
              },
        },
        profilePhoto: {
            type: String,
            default: ""
        }
    },
    referralCount: {
        type: Number
    },
    referralAllowed: {
        type: Number
    },
    referralRequests: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Application',
    }],
    referralRequested:[{
        type: mongoose.Schema.Types.ObjectId, ref: 'Application',
    }],
    referralPost:[{
        type: mongoose.Schema.Types.ObjectId, ref: 'ReferrralPost',
    }]
}, {timestamps:true});


export const User = mongoose.model('User', userSchema);