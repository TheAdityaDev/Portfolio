const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    hrName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    jobRole: {
      type: String,
      required: true,
      trim: true,
    },

    opportunityType: {
      type: String,
      required: true,
      enum: [
        "Interview",
        "Internship",
        "Freelance Project",
        "Full-Time Job",
        "Part-Time Job",
      ],
    },

    interviewDate: {
      type: Date,
    },

    interviewTime: {
      type: String,
    },

    interviewMode: {
      type: String,
      enum: ["Online", "Offline", "Hybrid"],
    },

    meetingLink: {
      type: String,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);