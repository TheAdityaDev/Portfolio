const Contact = require("../models/Contact");
const { isDatabaseReady } = require("../config/db");

const submitContact = async (req, res) => {
  try {
    if (!isDatabaseReady()) {
      return res.status(503).json({
        message: "Contact submissions are unavailable until the database is configured.",
      });
    }

    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    return res.status(201).json({
      message: "Contact submitted successfully",
      contact: savedContact,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  submitContact,
};
