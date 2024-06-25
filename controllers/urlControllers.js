const shortid = require("shortid");
const URL = require("../models/userModel");

async function handleGenerateNewShortUrl(req, res) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      message: "Please provide a valid URL",
    });
  }

  const shortID = shortid.generate();
  await URL.create({
    shortId: shortID,
    redirectUrl: url,
    visitHistory: [],
  });

  return res.status(201).json({
    message: "URL created successfully",
    shortID: shortID,
  });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.status(200).json({
    totalclicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

async function handleredirect(req, res) {
  try {
    const { shortId } = req.params;

    // Find URL by shortId and update visit history
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
            ipAddress: req.ip,
          },
        },
      }
    );

    if (entry) {
      // Redirect to the original URL
      res.redirect(entry.redirectUrl);
    } else {
      // URL not found
      res.status(404).json({ message: "URL not found" });
    }
  } catch (error) {
    // Handle errors
    console.error("Error fetching URL:", error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  handleGenerateNewShortUrl,
  handleGetAnalytics,
  handleredirect,
};
