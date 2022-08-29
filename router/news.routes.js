const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/auth");
const { postNews, getNews, getNewsByTitle } = require("../controllers/news.controller");
const { updateExistingNews } = require("../controllers/news.controller");
const {deleteNews} = require("../controllers/news.controller");
// const { updateNews } = require("../controllers/user.controller");

router.post("/create", authenticate, postNews);
router.put("/update/:id", authenticate, updateExistingNews);
router.get("/all", getNews);
router.get("/:title", getNewsByTitle);
router.delete("/:id", authenticate, deleteNews);

module.exports = router;
