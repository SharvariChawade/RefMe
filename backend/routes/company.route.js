import express from "express";
import {registerCompany, updateCompany, getCompany, getCompanyById, getEmployeeByCompany, deleteCompany} from "../controllers/company.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";

const router = express.Router()

router.route("/register").post(isAuthenticated,authorizeRoles("admin"),registerCompany);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById);
router.route("/update/:id").post(isAuthenticated,authorizeRoles("admin"),updateCompany);
router.route("/delete/:id").delete(isAuthenticated,authorizeRoles("admin"),deleteCompany);
router.route("/employees").post(isAuthenticated,getEmployeeByCompany);

export default router;