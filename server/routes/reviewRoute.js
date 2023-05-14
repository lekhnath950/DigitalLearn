import express from "express"
import { addReply, addReview, createDisc, deleteDisc, deleteRep, deleteReview, getDisc, getDiscLimit, getReview, getUserDisc } from "../controllers/reviewController.js";
import { verifyToken } from "../verify.js";

const router = express.Router();

router.post("/", verifyToken, addReview )
router.delete("/:id", verifyToken, deleteReview)
router.get("/:postId", getReview)


//  Discussion

router.post("/add", verifyToken, createDisc)
router.post("/getdisc", getDisc)
router.post("/discussion", getDiscLimit)
router.post("/disc/:id", getUserDisc)
router.post("/addReply/:id",verifyToken, addReply)
router.delete("/Disc/:id",verifyToken, deleteDisc)
// router.delete("/rep/:id",verifyToken, deleteRep)
router.delete("/:id/replies/:replyId",verifyToken, deleteRep)

export default router;