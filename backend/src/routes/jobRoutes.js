import express from "express";
import { authenticateToken, authorizeRoles } from "../middleware/auth.js";
import { postJob, getJob, getJobs, putJob, removeJob } from "../controller/jobController.js";

const router = express.Router();

router.get("/", getJobs);
router.get("/:id", getJob);

router.post("/", authenticateToken, authorizeRoles("employer"), postJob);
router.put("/:id", authenticateToken, authorizeRoles("employer"), putJob);
router.delete("/:id", authenticateToken, authorizeRoles("employer"), removeJob);


export default router;
