import express from "express"
import { addPost, addView, deletePost, getByTag, getPost, getProfilePost, getTags, getTagsPost, random, search, sub, test, trend, updatePost } from "../controllers/postController.js";
import { verifyToken } from "../verify.js";

const router = express.Router()

router.get("/test", test)

router.post("/", verifyToken, addPost)
router.put("/:id", verifyToken, updatePost)
router.delete("/:id", verifyToken, deletePost)
router.get("/find/:id", getPost)
router.get("/profile/:id", getProfilePost)
router.get("/view/:id", addView)
router.get("/trend", trend)
router.get("/random", random)
router.get("/tags", getByTag)
router.get("/tag", getTags)
router.get("/search", search)
router.get("/sub", verifyToken, sub) 
router.get("/tags/:id", getTagsPost);

export default router;