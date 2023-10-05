const mongoose = require("mongoose");
const Asset = require("./asset.model").schema;
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    login: {
      authToken: {
        type: String,
        required: false,
      },
    },
    register: {
      images: [
        {
          type: String,
          required: false,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual('assets', {
  ref: 'Asset',
  localField: 'assets',
  foreignField: '_id',
});

const User = mongoose.model("User", userSchema);

module.exports = User;
