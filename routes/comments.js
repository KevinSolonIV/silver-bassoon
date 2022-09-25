const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Comment Routes
router.post("/addComment/:id", ensureAuth, commentController.addComment);
router.put("/likeComment/:postId", ensureAuth, commentController.likeComment);

module.exports = router;