const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    companyName: {
      type: String,
      required: true
    },
    role: {
      type: String
    },
    status: {
      type: String,
      enum: ["Saved", "Applied", "OA", "Interview", "Offer", "Rejected"],
      default: "Saved"
    },
    salary: {
      type: String
    },
    location: {
      type: String
    },
    appliedDate: {
      type: Date
    },
    interviewDate: {
      type: Date
    },
    jobLink: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
