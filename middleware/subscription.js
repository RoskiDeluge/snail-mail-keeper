const Contact = require("../models/Contact");

module.exports = async function (req, res, next) {
  try {
    // If user is on paid tier, let them proceed
    if (req.user.subscriptionStatus === "paid") {
      return next();
    }

    // For free tier users, check contact count
    const contactCount = await Contact.countDocuments({ user: req.user.id });

    if (contactCount >= 10) {
      return res.status(403).json({
        msg: "Free tier limit reached. Please upgrade to create more contacts.",
      });
    }

    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
