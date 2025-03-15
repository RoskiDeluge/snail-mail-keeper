const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

// @route     GET api/subscription
// @desc      Get subscription information
// @access    Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({
      subscriptionStatus: user.subscriptionStatus,
      message:
        user.subscriptionStatus === "paid"
          ? "You have unlimited contacts available."
          : "Free tier allows up to 10 contacts. Upgrade for unlimited contacts.",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     PUT api/subscription/upgrade
// @desc      Upgrade user subscription
// @access    Private
router.put("/upgrade", auth, async (req, res) => {
  try {
    // In a real app, you'd process payment here
    // For this simple version, we'll just update the status

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { subscriptionStatus: "paid" },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
