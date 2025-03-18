const express = require("express");
const multer = require("multer");
const router = express.Router();
const { createPageWebLove } = require("../controllers/pageController");
const { getPageInfo } = require("../controllers/getInfoPageWeb");
const valid_resquest_body = require('../middlewares/valid_resquest_body')
const schema = require("../validations/joiSchema")

const storage = multer.memoryStorage(); 
const upload = multer({ storage });


router.get("/page/:uuid", getPageInfo);

router.post("/create-page", upload.array("files", 15), createPageWebLove);
router.get('/' , (req, res) => {
res.send("API WEB LOVE")
})
module.exports = router;
