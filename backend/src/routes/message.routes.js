import express from "express";
import { getUsersForSidebar, sendMessage } from "../controllers/message.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getConversationsForSidebar } from "../controllers/message.controllers.js";
import { getMessages } from "../controllers/message.controllers.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();
router.use(protectRoute);

router.get("/users", protectRoute, getUsersForSidebar)
router.get("/conversations", protectRoute, getConversationsForSidebar)
router.get("/:id", protectRoute, getMessages)
router.post("/id", upload.single("media"), sendMessage)

export default router;