import express from "express";
import { getAllReferralPost, getReferralPostById, postReferral } from "../controllers/referralpost.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";

const router = express.Router()

router.route("/postreferral").post(isAuthenticated,authorizeRoles("professional"),postReferral);
router.route("/getallreferralpost").get(isAuthenticated,getAllReferralPost);
router.route("/getallreferralpost/:id").post(isAuthenticated,getReferralPostById);

export default router;