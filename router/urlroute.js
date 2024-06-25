const express = require("express");
const { handleGenerateNewShortUrl,handleGetAnalytics,handleredirect} = require("../controllers/urlControllers");

const router = express.Router();

router.post("/", handleGenerateNewShortUrl);

router.get("/:shortId",handleredirect);
router.get("/analytics/:shortId",handleGetAnalytics);
module.exports = router;
