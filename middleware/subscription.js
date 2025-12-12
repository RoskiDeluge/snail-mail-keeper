const Contact = require("../models/Contact");
const User = require("../models/User");

module.exports = async function (req, res, next) {
  try {
    const user = await User.findById(req.user.id).select("subscriptionStatus");

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    // If user is on paid tier, let them proceed
    if (user.subscriptionStatus === "paid") {
      req.user.subscriptionStatus = "paid";
      return next();
    }

    // For free tier users, check contact count
    const contactCount = await Contact.countDocuments({ user: req.user.id });

    if (contactCount >= 10) {
      return res.status(403).json({
        msg: "Free tier limit reached. Please upgrade to create more contacts.",
        limit: 10,
      });
    }

    req.user.subscriptionStatus = user.subscriptionStatus;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
