import express from "express"
import { allUser, deleteUser, getUser, love, subscribe, test, unsubscribe, update, updateByAdmin, userLikes } from "../controllers/userController.js";
import { verifyToken } from "../verify.js";

const router = express.Router()

router.get("/test", test)

router.put("/:id", verifyToken, update)
router.delete("/:id",verifyToken, deleteUser)
router.get("/finds/:id", getUser)
router.post("/find/:id",verifyToken, updateByAdmin)
router.put("/sub/:id",verifyToken, subscribe)
router.put("/unsub/:id",verifyToken, unsubscribe)
// router.put("/like/:postId",verifyToken, like )
router.put("/love/:postId", verifyToken, love )
router.get('/likes/:userId', userLikes);
router.get('/allusers', allUser);



export default router;