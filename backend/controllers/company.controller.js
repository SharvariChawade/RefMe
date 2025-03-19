import {Company} from "../models/company.model.js"
import {User} from "../models/user.model.js";


export const registerCompany = async (req,res) => {
    try {
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json({
                message: "Company name is missing",
                success: false 
            });
        }
        let company = await Company.findOne({name:companyName});
        if(company){
            return res.status(400).json({
                message: `${company} already exists!`,
                success:false
            });
        };
        company = await Company.create({
            name:companyName,
            employees:null
        });
        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true
        })
    }catch(error){
        console.log(error);
    }
}


export const getCompany = async (req,res) => {
    try{
        const userId = req.id;
        const companies = await Company.find();
        if(companies.length === 0){
            return res.status(404).json({
                message: "Companies not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Getting companies",
            companies,
            success: true
        })
    }catch(error){
        console.log(error);
    }
}


export const getCompanyById = async (req,res) => {
    try{
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            res.status(404).json({
                message: "Company not found",
                success: false
            })
        }
        return res.status(201).json({
            company,
            success: true
        })
    }catch (error){
        console.log(error);
    }
}


export const updateCompany = async (req,res) => {
    try{
        const {name, description, website, location} = req.body;
        const file = req.file;
        const updateData = {name, description, website, location};
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new:true});
        if(!company){
            res.status(404).json({
                message: "Company not found",
                success: false
            })
        }
        return res.status(201).json({
            message: "company updated",
            success: true
        })
    }catch(error){
        console.log(error);
    }
}

export const getEmployeeByCompany = async (req,res) => {
    try {
        const {companyName}= req.body;
        const companyObj = await Company.findOne({name:companyName});
        if(!companyObj) {
            return res.status(400).json({
                    message: "Company not found",
                    success: false
            })
        }
        const employeeList = await User.find({"profile.company":companyObj});
        return res.status(201).json({
            message: "List of employees",
            employeeList,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const deleteCompany = async (req,res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            res.status(404).json({
                message: "Company not found",
                success: false
            })
        }
        await Company.findByIdAndDelete(companyId);
        res.status(200).json({
            message: "Company deleted successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}