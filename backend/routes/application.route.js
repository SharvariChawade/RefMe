import express from "express";
import {applyReferralPost,getAppliedReferrals,getApplicants,updateStatus, requestReferral} from "../controllers/application.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";

const router = express.Router()

router.route("/applyreferralpost/:id").post(isAuthenticated,applyReferralPost);
router.route("/requestref").post(isAuthenticated,requestReferral);
router.route("/getappliedreferrals").get(isAuthenticated,getAppliedReferrals);
router.route("/:id/applicants").get(isAuthenticated,getApplicants);
router.route("/status/:id/update").post(isAuthenticated,updateStatus);

export default router;