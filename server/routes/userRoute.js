import express from "express"
import { deleteUser, dislike, getUser, like, subscribe, test, unsubscribe, update } from "../controllers/userController.js";
import { verifyToken } from "../verify.js";

const router = express.Router()

router.get("/test", test)

router.put("/:id", verifyToken, update)
router.delete("/:id",verifyToken, deleteUser)
router.get("/find/:id",verifyToken, getUser)
router.put("/sub/:id",verifyToken, subscribe)
router.put("/unsub/:id",verifyToken, unsubscribe)
router.put("/like/:videoId",verifyToken, like )
router.put("/dislike/:id",verifyToken, dislike)


export default router;