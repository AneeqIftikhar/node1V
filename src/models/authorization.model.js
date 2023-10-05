const mongoose = require("mongoose");
const authorizationSchema = new mongoose.Schema(
  {
    authorizedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    authorizedTo: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["sent", "accepted", "rejected", "expired"],
      default: "sent",
    },
    assets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Asset",
      },
    ],

    // access: {
    //   groups: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       required: false,
    //       ref: "Group",
    //     },
    //   ],
    //   assets: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       required: false,
    //       ref: "Asset",
    //     },
    //   ],
    // },
    expiryDate: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Authorization = mongoose.model("Authorization", authorizationSchema);

module.exports = Authorization;
