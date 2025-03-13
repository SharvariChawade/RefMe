import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    website: {
        type: String,
    },
    email: {
        type: String,
    },
    logo: {
        type: String,
    },
    // employees: { 
    //     type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true,sparse:true }], 
    //     default: [] 
    // },
}, {timestamps:true});

export const Company = mongoose.model('Company', companySchema);