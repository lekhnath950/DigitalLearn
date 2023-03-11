import express from "express"
import { addReview, deleteReview, getReview } from "../controllers/reviewController.js";
import { verifyToken } from "../verify.js";

const router = express.Router();

router.post("/", verifyToken, addReview )
router.delete("/:id", verifyToken, deleteReview)
router.get("/:postId", getReview)

export default router;