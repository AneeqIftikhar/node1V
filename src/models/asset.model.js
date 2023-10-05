const mongoose = require("mongoose");
const assetsSchema = new mongoose.Schema(
  {
    identifier: {
      type: String,
      required: false
    },
    device_token: {
      type: String,
      required: false
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Asset = mongoose.model("Asset", assetsSchema);

module.exports = Asset;
