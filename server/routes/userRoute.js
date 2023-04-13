import express from "express"
import { deleteUser, getUser, like, subscribe, test, unsubscribe, update } from "../controllers/userController.js";
import { verifyToken } from "../verify.js";

const router = express.Router()

router.get("/test", test)

router.put("/:id", verifyToken, update)
router.delete("/:id",verifyToken, deleteUser)
router.get("/find/:id", getUser)
router.put("/sub/:id",verifyToken, subscribe)
router.put("/unsub/:id",verifyToken, unsubscribe)
router.put("/like/:postId",verifyToken, like )


export default router;