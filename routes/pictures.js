const express = require("express");
const router = express.Router();
const pictureController = require("../controllers/pictures");
const {ensureAuth} = require("../middleware/auth");

// Comment Routes
router.post("/addPicture/:id", ensureAuth, pictureController.addPicture);
router.put("/likePicture/:postId", ensureAuth, pictureController.likePicture);

module.exports = router;