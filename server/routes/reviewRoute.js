import express from "express"
import { addReply, addReview, createDisc, deleteReview, getDisc, getReview, getUserDisc } from "../controllers/reviewController.js";
import { verifyToken } from "../verify.js";

const router = express.Router();

router.post("/", verifyToken, addReview )
router.delete("/:id", verifyToken, deleteReview)
router.get("/:postId", getReview)


//  Discussion

router.post("/add", verifyToken, createDisc)
router.post("/getdisc", getDisc)
router.post("/disc/:id", getUserDisc)
router.post("/addReply/:id",verifyToken, addReply)

export default router;