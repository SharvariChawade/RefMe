import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    referral_post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ReferralPost',
    },
    referrer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    skills: {type: String, required: true},
    resume: {type: String, required: true},
    experience: {type: String, required: true},
    short_description: {type: String},
    jobid: {type: String},
    joblink: {type: String},
    status: {
        type: String,
        enum: ['pending', 'accepted','rejected'],
        default: 'pending'
    },
}, {timestamps:true});

applicationSchema.pre("validate", function (next) {
  if (!this.referral_post && !this.referrer) {
      return next(new Error("Either referral post or referrer must be provided."));
  }
  next();
});

  
export const Application = mongoose.model('Application', applicationSchema);